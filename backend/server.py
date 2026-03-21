from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta, timezone
from typing import Optional, List
import logging

from config import settings
from models import (
    User, EmailVerificationToken, VerificationLog, Promotion,
    UserRegisterRequest, UserLoginRequest, TokenResponse, VerifyEmailRequest,
    PromotionCreateRequest, PromotionUpdateRequest
)
from auth import hash_password, verify_password, create_access_token, decode_access_token
from email_service import email_service

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title="NoToGreed API",
    description="Your Honest Verification - Independent third-party provably fair verification platform",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB client
mongo_client: Optional[AsyncIOMotorClient] = None
db = None

@app.on_event("startup")
async def startup_db_client():
    """Initialize MongoDB connection"""
    global mongo_client, db
    mongo_client = AsyncIOMotorClient(settings.MONGO_URL)
    db = mongo_client[settings.DATABASE_NAME]
    logger.info(f"Connected to MongoDB: {settings.DATABASE_NAME}")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close MongoDB connection"""
    if mongo_client:
        mongo_client.close()
        logger.info("MongoDB connection closed")

# Helper function to get current user from token
async def get_current_user(authorization: Optional[str] = Header(None)) -> Optional[dict]:
    """Extract and verify JWT token from Authorization header"""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    
    token = authorization.replace("Bearer ", "")
    payload = decode_access_token(token)
    if not payload:
        return None
    
    email = payload.get("sub")
    if not email:
        return None
    
    user = await db.users.find_one({"email": email}, {"_id": 0})
    return user

# Health check
@app.get("/api/health")
async def health_check():
    """System health check"""
    return {
        "status": "SYSTEM_ONLINE",
        "timestamp": datetime.utcnow().isoformat(),
        "email_provider": settings.EMAIL_PROVIDER
    }

# Authentication Endpoints
@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
async def register(request: UserRegisterRequest, background_tasks: BackgroundTasks):
    """Register new user and send verification email"""
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"$or": [{"email": request.email}, {"username": request.username}]})
        if existing_user:
            if existing_user.get("email") == request.email:
                raise HTTPException(status_code=400, detail="Email already registered")
            else:
                raise HTTPException(status_code=400, detail="Username already taken")
        
        # Create user
        user_data = User(
            username=request.username,
            email=request.email,
            full_name=request.full_name,
            hashed_password=hash_password(request.password),
            is_email_verified=False,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        await db.users.insert_one(user_data.model_dump())
        
        # Generate verification token
        token = email_service.generate_verification_token()
        expiry = datetime.now(timezone.utc) + timedelta(hours=settings.VERIFICATION_TOKEN_EXPIRY_HOURS)
        
        token_data = EmailVerificationToken(
            user_email=request.email,
            token=token,
            created_at=datetime.now(timezone.utc),
            expires_at=expiry,
            is_used=False
        )
        
        await db.verification_tokens.insert_one(token_data.model_dump())
        
        # Send verification email in background
        background_tasks.add_task(
            email_service.send_verification_email,
            request.email,
            request.full_name,
            token
        )
        
        logger.info(f"User registered: {request.email}")
        
        return {
            "message": "User registered successfully. Please check your email to verify your account.",
            "email": request.email,
            "username": request.username
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail="Registration failed")

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(request: UserLoginRequest):
    """Login user and return JWT token"""
    try:
        # Find user
        user = await db.users.find_one({"email": request.email}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Verify password
        if not verify_password(request.password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Check email verification
        if not user.get("is_email_verified", False):
            raise HTTPException(status_code=403, detail="Email not verified. Please check your email.")
        
        # Create access token
        access_token = create_access_token(data={"sub": user["email"]})
        
        # Update last login
        await db.users.update_one(
            {"email": request.email},
            {"$set": {"updated_at": datetime.utcnow()}}
        )
        
        logger.info(f"User logged in: {request.email}")
        
        return TokenResponse(access_token=access_token)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Login failed")

@app.post("/api/auth/verify-email")
async def verify_email(request: VerifyEmailRequest):
    """Verify user email with token"""
    try:
        # Find token
        token_record = await db.verification_tokens.find_one({"token": request.token}, {"_id": 0})
        if not token_record:
            raise HTTPException(status_code=400, detail="Invalid verification token")
        
        # Check if already used
        if token_record.get("is_used", False):
            raise HTTPException(status_code=400, detail="Verification token already used")
        
        # Check expiry
        if datetime.now(timezone.utc) > token_record["expires_at"].replace(tzinfo=timezone.utc):
            raise HTTPException(status_code=400, detail="Verification token expired")
        
        # Mark user as verified
        await db.users.update_one(
            {"email": token_record["user_email"]},
            {"$set": {"is_email_verified": True, "updated_at": datetime.utcnow()}}
        )
        
        # Mark token as used
        await db.verification_tokens.update_one(
            {"token": request.token},
            {"$set": {"is_used": True, "verified_at": datetime.now(timezone.utc)}}
        )
        
        logger.info(f"Email verified: {token_record['user_email']}")
        
        return {
            "message": "Email verified successfully!",
            "email": token_record["user_email"]
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email verification error: {e}")
        raise HTTPException(status_code=500, detail="Email verification failed")

@app.post("/api/auth/resend-verification")
async def resend_verification(email: str, background_tasks: BackgroundTasks):
    """Resend verification email"""
    try:
        # Find user
        user = await db.users.find_one({"email": email}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user.get("is_email_verified", False):
            raise HTTPException(status_code=400, detail="Email already verified")
        
        # Generate new token
        token = email_service.generate_verification_token()
        expiry = datetime.now(timezone.utc) + timedelta(hours=settings.VERIFICATION_TOKEN_EXPIRY_HOURS)
        
        token_data = EmailVerificationToken(
            user_email=email,
            token=token,
            created_at=datetime.now(timezone.utc),
            expires_at=expiry,
            is_used=False
        )
        
        await db.verification_tokens.insert_one(token_data.model_dump())
        
        # Send email in background
        background_tasks.add_task(
            email_service.send_verification_email,
            email,
            user["full_name"],
            token
        )
        
        logger.info(f"Verification email resent: {email}")
        
        return {"message": "Verification email sent. Please check your inbox."}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Resend verification error: {e}")
        raise HTTPException(status_code=500, detail="Failed to resend verification email")

@app.get("/api/auth/me")
async def get_current_user_info(authorization: Optional[str] = Header(None)):
    """Get current user information"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    return {
        "email": user["email"],
        "username": user["username"],
        "full_name": user["full_name"],
        "is_email_verified": user.get("is_email_verified", False),
        "created_at": user["created_at"]
    }

# Verification Endpoints
@app.post("/api/verify/log")
async def log_verification(
    game_type: str,
    result: str,
    duration_ms: Optional[int] = None,
    module_used: Optional[str] = None
):
    """Log a verification attempt (public endpoint)"""
    try:
        log_data = VerificationLog(
            game_type=game_type,
            result=result,
            timestamp=datetime.utcnow(),
            duration_ms=duration_ms,
            module_used=module_used
        )
        
        await db.verification_logs.insert_one(log_data.model_dump())
        
        return {"status": "logged", "timestamp": log_data.timestamp}
    
    except Exception as e:
        logger.error(f"Verification logging error: {e}")
        raise HTTPException(status_code=500, detail="Failed to log verification")

@app.get("/api/stats")
async def get_statistics():
    """Get public verification statistics"""
    try:
        # Total verifications
        total = await db.verification_logs.count_documents({})
        
        # Success rate
        success_count = await db.verification_logs.count_documents({"result": "success"})
        success_rate = (success_count / total * 100) if total > 0 else 0
        
        # By game type
        pipeline = [
            {"$group": {"_id": "$game_type", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        by_game_type = await db.verification_logs.aggregate(pipeline).to_list(length=100)
        
        # Recent activity (last 7 days)
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        recent_count = await db.verification_logs.count_documents(
            {"timestamp": {"$gte": seven_days_ago}}
        )
        
        # Total users
        total_users = await db.users.count_documents({})
        
        return {
            "total_verifications": total,
            "success_rate": round(success_rate, 2),
            "by_game_type": by_game_type,
            "recent_activity_7days": recent_count,
            "total_users": total_users,
            "last_updated": datetime.utcnow().isoformat()
        }
    
    except Exception as e:
        logger.error(f"Statistics error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve statistics")

# Verification tool endpoints (placeholder for user's tool)
@app.post("/api/verify/hmac-sha256")
async def verify_hmac_sha256(data: dict):
    """HMAC-SHA256 verification (placeholder)"""
    # This will be integrated with user's tool later
    return {
        "status": "pending",
        "message": "Verification tool will be integrated here",
        "module": "HMAC-SHA256"
    }

@app.post("/api/verify/provably-fair")
async def verify_provably_fair(data: dict):
    """Provably fair verification (placeholder)"""
    # This will be integrated with user's tool later
    return {
        "status": "pending",
        "message": "Verification tool will be integrated here",
        "module": "Provably Fair"
    }

# Promotions Endpoints
@app.get("/api/promotions")
async def get_promotions(authorization: Optional[str] = Header(None)):
    """Get all active promotions (requires login)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        promotions = await db.promotions.find(
            {"is_active": True},
            {"_id": 0}
        ).sort("created_at", -1).to_list(length=100)
        
        return {"promotions": promotions}
    
    except Exception as e:
        logger.error(f"Get promotions error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve promotions")

@app.post("/api/admin/promotions")
async def create_promotion(
    request: PromotionCreateRequest,
    authorization: Optional[str] = Header(None)
):
    """Create new promotion (admin only)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Check if user is admin
    if user.get("email") not in settings.ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        promotion_data = Promotion(
            title=request.title,
            description=request.description,
            code=request.code,
            link=request.link,
            image_url=request.image_url,
            expires_at=request.expires_at,
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        result = await db.promotions.insert_one(promotion_data.model_dump())
        
        logger.info(f"Promotion created by {user['email']}: {request.title}")
        
        return {
            "message": "Promotion created successfully",
            "promotion": promotion_data.model_dump()
        }
    
    except Exception as e:
        logger.error(f"Create promotion error: {e}")
        raise HTTPException(status_code=500, detail="Failed to create promotion")

@app.put("/api/admin/promotions/{promotion_id}")
async def update_promotion(
    promotion_id: str,
    request: PromotionUpdateRequest,
    authorization: Optional[str] = Header(None)
):
    """Update promotion (admin only)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if user.get("email") not in settings.ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        update_data = {k: v for k, v in request.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.promotions.update_one(
            {"title": promotion_id},  # Using title as ID for simplicity
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Promotion not found")
        
        return {"message": "Promotion updated successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update promotion error: {e}")
        raise HTTPException(status_code=500, detail="Failed to update promotion")

@app.delete("/api/admin/promotions/{promotion_id}")
async def delete_promotion(
    promotion_id: str,
    authorization: Optional[str] = Header(None)
):
    """Delete promotion (admin only)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if user.get("email") not in settings.ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        result = await db.promotions.delete_one({"title": promotion_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Promotion not found")
        
        logger.info(f"Promotion deleted by {user['email']}: {promotion_id}")
        
        return {"message": "Promotion deleted successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete promotion error: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete promotion")

@app.get("/api/admin/check")
async def check_admin(authorization: Optional[str] = Header(None)):
    """Check if current user is admin"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    is_admin = user.get("email") in settings.ADMIN_EMAILS
    
    return {
        "is_admin": is_admin,
        "email": user.get("email")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
