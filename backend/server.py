from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta, timezone
from typing import Optional, List
import logging

from config import settings
from models import (
    User, EmailVerificationToken, VerificationLog, Promotion, Provider,
    UserRegisterRequest, UserLoginRequest, TokenResponse, VerifyEmailRequest,
    PromotionCreateRequest, PromotionUpdateRequest,
    ProviderCreateRequest, ProviderUpdateRequest,
    ProvablyFairVerifyRequest, ProvablyFairVerifyResponse,
    VIPCampaign, VIPCampaignCreateRequest, VIPCampaignUpdateRequest,
    AffiliateClick, AffiliateClickRequest
)
from auth import hash_password, verify_password, create_access_token, decode_access_token
from email_service import email_service
from verification_engine import verification_engine

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
    """Initialize MongoDB connection and seed default data"""
    global mongo_client, db
    mongo_client = AsyncIOMotorClient(settings.MONGO_URL)
    db = mongo_client[settings.DATABASE_NAME]
    logger.info(f"Connected to MongoDB: {settings.DATABASE_NAME}")
    
    # Seed default providers if none exist
    provider_count = await db.providers.count_documents({})
    if provider_count == 0:
        logger.info("Seeding default providers...")
        default_providers = [
            {
                "name": "Stake.com",
                "slug": "stake",
                "logo_url": None,
                "supported_games": ["limbo", "dice", "blackjack", "keno", "mines", "plinko"],
                "verification_code": None,
                "is_active": True,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            },
            {
                "name": "Shuffle.com",
                "slug": "shuffle",
                "logo_url": None,
                "supported_games": ["limbo", "dice", "blackjack", "keno", "mines", "plinko"],
                "verification_code": None,
                "is_active": True,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            },
            {
                "name": "BC.Game",
                "slug": "bcgame",
                "logo_url": None,
                "supported_games": ["limbo", "dice", "blackjack", "keno", "mines", "plinko"],
                "verification_code": None,
                "is_active": True,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            },
            {
                "name": "Rollbit",
                "slug": "rollbit",
                "logo_url": None,
                "supported_games": ["limbo", "dice", "blackjack", "keno", "mines", "plinko"],
                "verification_code": None,
                "is_active": True,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            },
            {
                "name": "Roobet",
                "slug": "roobet",
                "logo_url": None,
                "supported_games": ["limbo", "dice", "blackjack", "keno", "mines", "plinko"],
                "verification_code": None,
                "is_active": True,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }
        ]
        await db.providers.insert_many(default_providers)
        logger.info(f"Seeded {len(default_providers)} default providers")
    
    # Seed default VIP campaigns if none exist
    vip_count = await db.vip_campaigns.count_documents({})
    if vip_count == 0:
        logger.info("Seeding default VIP campaigns...")
        default_campaigns = [
            {
                "casino_name": "Stake.com",
                "casino_slug": "stake",
                "logo_url": None,
                "bonus_title": "200% Deposit Bonus",
                "bonus_value": "Up to $3,000",
                "description": "Get a massive 200% bonus on your first deposit at Stake.com. One of the most trusted crypto casinos with instant withdrawals and thousands of games.",
                "referral_link": "https://stake.com/?c=notogreed",
                "bonus_code": "NOTOGREED",
                "exclusive_extra": "+$25 Free Bet on signup through Rakestake",
                "terms": "18+ | New players only | Min deposit $20",
                "min_deposit": "$20",
                "wagering_requirement": "40x bonus",
                "is_featured": True,
                "is_active": True,
                "sort_order": 1,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            },
            {
                "casino_name": "BC.Game",
                "casino_slug": "bcgame",
                "logo_url": None,
                "bonus_title": "300% Welcome Package",
                "bonus_value": "Up to $20,000 + Lucky Spin",
                "description": "BC.Game offers one of the biggest welcome packages in crypto gaming. Spin the lucky wheel daily for free crypto rewards.",
                "referral_link": "https://bc.game/?ref=notogreed",
                "bonus_code": None,
                "exclusive_extra": "VIP Fast-Track + Daily Rakeback Boost",
                "terms": "18+ | New players only",
                "min_deposit": "$10",
                "wagering_requirement": "35x bonus",
                "is_featured": True,
                "is_active": True,
                "sort_order": 2,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            },
            {
                "casino_name": "Shuffle.com",
                "casino_slug": "shuffle",
                "logo_url": None,
                "bonus_title": "150% Crypto Bonus",
                "bonus_value": "Up to $1,500 + 100 Free Spins",
                "description": "Shuffle combines the best of sports betting and casino gaming. Lightning-fast payouts and provably fair games.",
                "referral_link": "https://shuffle.com/?r=notogreed",
                "bonus_code": "GREED150",
                "exclusive_extra": "+50 Extra Free Spins (Rakestake Exclusive)",
                "terms": "18+ | Crypto deposits only",
                "min_deposit": "$25",
                "wagering_requirement": "30x bonus",
                "is_featured": False,
                "is_active": True,
                "sort_order": 3,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            },
            {
                "casino_name": "Roobet",
                "casino_slug": "roobet",
                "logo_url": None,
                "bonus_title": "Free $20 on Signup",
                "bonus_value": "$20 No Deposit Bonus",
                "description": "Start playing instantly with $20 free - no deposit required! Roobet is known for its original games and generous rewards.",
                "referral_link": "https://roobet.com/?ref=notogreed",
                "bonus_code": "NOTOGREED20",
                "exclusive_extra": "Weekly Cashback Boost (Rakestake Members)",
                "terms": "18+ | KYC required | Geo-restricted",
                "min_deposit": "No deposit needed",
                "wagering_requirement": "25x bonus",
                "is_featured": False,
                "is_active": True,
                "sort_order": 4,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            },
            {
                "casino_name": "Rollbit",
                "casino_slug": "rollbit",
                "logo_url": None,
                "bonus_title": "100% Sports Bonus",
                "bonus_value": "Up to $1,000 + NFT Rewards",
                "description": "Rollbit pioneered NFT integration in gambling. Trade, stake, and earn with your NFTs while enjoying premium casino games.",
                "referral_link": "https://rollbit.com/?r=notogreed",
                "bonus_code": None,
                "exclusive_extra": "Exclusive NFT Airdrop Entry",
                "terms": "18+ | NFT holders get extra benefits",
                "min_deposit": "$10",
                "wagering_requirement": "20x bonus",
                "is_featured": False,
                "is_active": True,
                "sort_order": 5,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }
        ]
        await db.vip_campaigns.insert_many(default_campaigns)
        logger.info(f"Seeded {len(default_campaigns)} default VIP campaigns")

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
        
        # Create access token (allow login without email verification)
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

# Verification tool endpoints
@app.post("/api/verify/provably-fair", response_model=ProvablyFairVerifyResponse)
async def verify_provably_fair(request: ProvablyFairVerifyRequest):
    """
    Provably fair verification endpoint
    
    Uses provider-specific algorithms to verify game results.
    All verification logic follows each casino's official documentation.
    """
    try:
        # Execute verification using the engine
        result = verification_engine.verify(
            provider=request.provider,
            game_type=request.game_type,
            payload=request.payload,
            options=request.options
        )
        
        # Log the verification attempt (safe metadata only)
        await db.verification_logs.insert_one({
            "game_type": request.game_type,
            "provider": request.provider,
            "result": result.status,
            "timestamp": datetime.now(timezone.utc),
            "duration_ms": 0,
            "module_used": f"{request.provider}_{request.game_type}"
        })
        
        return result.to_dict()
        
    except Exception as e:
        logger.error(f"Provably fair verification error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Verification failed: {str(e)}"
        )

@app.get("/api/verify/supported")
async def get_supported_verifications():
    """Get list of all supported provider/game combinations"""
    try:
        supported = verification_engine.get_supported_combinations()
        return {
            "supported": supported,
            "total_providers": len(supported),
            "total_combinations": sum(len(games) for games in supported.values())
        }
    except Exception as e:
        logger.error(f"Get supported combinations error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/verify/hmac-sha256")
async def verify_hmac_sha256(data: dict):
    """HMAC-SHA256 verification (legacy endpoint, redirects to main endpoint)"""
    # Redirect to main provably-fair endpoint
    request = ProvablyFairVerifyRequest(
        provider=data.get("provider", "generic"),
        game_type=data.get("game_type", "generic"),
        payload=data
    )
    return await verify_provably_fair(request)

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

# Provider Endpoints
@app.get("/api/providers")
async def get_providers():
    """Get all active providers (public endpoint)"""
    try:
        providers = await db.providers.find(
            {"is_active": True},
            {"_id": 0, "verification_code": 0}  # Don't expose verification code
        ).sort("name", 1).to_list(length=100)
        
        return {"providers": providers}
    
    except Exception as e:
        logger.error(f"Get providers error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve providers")

@app.post("/api/admin/providers")
async def create_provider(
    request: ProviderCreateRequest,
    authorization: Optional[str] = Header(None)
):
    """Create new provider (admin only)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if user.get("email") not in settings.ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        # Check if slug already exists
        existing = await db.providers.find_one({"slug": request.slug})
        if existing:
            raise HTTPException(status_code=400, detail="Provider slug already exists")
        
        provider_data = Provider(
            name=request.name,
            slug=request.slug,
            logo_url=request.logo_url,
            supported_games=request.supported_games,
            verification_code=request.verification_code,
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        await db.providers.insert_one(provider_data.model_dump())
        
        logger.info(f"Provider created by {user['email']}: {request.name}")
        
        return {
            "message": "Provider created successfully",
            "provider": {
                "name": provider_data.name,
                "slug": provider_data.slug,
                "supported_games": provider_data.supported_games
            }
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Create provider error: {e}")
        raise HTTPException(status_code=500, detail="Failed to create provider")

@app.put("/api/admin/providers/{slug}")
async def update_provider(
    slug: str,
    request: ProviderUpdateRequest,
    authorization: Optional[str] = Header(None)
):
    """Update provider (admin only)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if user.get("email") not in settings.ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        update_data = {k: v for k, v in request.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.providers.update_one(
            {"slug": slug},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Provider not found")
        
        return {"message": "Provider updated successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update provider error: {e}")
        raise HTTPException(status_code=500, detail="Failed to update provider")

@app.delete("/api/admin/providers/{slug}")
async def delete_provider(
    slug: str,
    authorization: Optional[str] = Header(None)
):
    """Delete provider (admin only)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if user.get("email") not in settings.ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        result = await db.providers.delete_one({"slug": slug})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Provider not found")
        
        logger.info(f"Provider deleted by {user['email']}: {slug}")
        
        return {"message": "Provider deleted successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete provider error: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete provider")

# VIP Campaign Endpoints (Public)
@app.get("/api/vip/campaigns")
async def get_vip_campaigns():
    """Get all active VIP campaigns (public endpoint)"""
    try:
        campaigns = await db.vip_campaigns.find(
            {"is_active": True},
            {"_id": 0}
        ).sort("sort_order", 1).to_list(100)
        
        return {"campaigns": campaigns}
    
    except Exception as e:
        logger.error(f"Get VIP campaigns error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve VIP campaigns")

@app.get("/api/vip/campaigns/featured")
async def get_featured_campaigns():
    """Get featured VIP campaigns (public endpoint)"""
    try:
        campaigns = await db.vip_campaigns.find(
            {"is_active": True, "is_featured": True},
            {"_id": 0}
        ).sort("sort_order", 1).to_list(10)
        
        return {"campaigns": campaigns}
    
    except Exception as e:
        logger.error(f"Get featured campaigns error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve featured campaigns")

# VIP Campaign Admin Endpoints
@app.post("/api/admin/vip/campaigns")
async def create_vip_campaign(request: VIPCampaignCreateRequest, user: dict = Depends(get_current_user)):
    """Create a new VIP campaign (admin only)"""
    try:
        if not user or not user.get("is_admin"):
            raise HTTPException(status_code=403, detail="Admin access required")
        
        # Check if campaign with same slug exists
        existing = await db.vip_campaigns.find_one({"casino_slug": request.casino_slug})
        if existing:
            raise HTTPException(status_code=400, detail="Campaign for this casino already exists")
        
        campaign_data = VIPCampaign(
            casino_name=request.casino_name,
            casino_slug=request.casino_slug,
            logo_url=request.logo_url,
            bonus_title=request.bonus_title,
            bonus_value=request.bonus_value,
            description=request.description,
            referral_link=request.referral_link,
            bonus_code=request.bonus_code,
            exclusive_extra=request.exclusive_extra,
            terms=request.terms,
            min_deposit=request.min_deposit,
            wagering_requirement=request.wagering_requirement,
            is_featured=request.is_featured,
            is_active=True,
            sort_order=request.sort_order,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        
        await db.vip_campaigns.insert_one(campaign_data.model_dump())
        
        logger.info(f"VIP campaign created by {user['email']}: {request.casino_name}")
        
        return {
            "message": "VIP campaign created successfully",
            "campaign": {
                "casino_name": request.casino_name,
                "casino_slug": request.casino_slug
            }
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Create VIP campaign error: {e}")
        raise HTTPException(status_code=500, detail="Failed to create VIP campaign")

@app.put("/api/admin/vip/campaigns/{slug}")
async def update_vip_campaign(slug: str, request: VIPCampaignUpdateRequest, user: dict = Depends(get_current_user)):
    """Update a VIP campaign (admin only)"""
    try:
        if not user or not user.get("is_admin"):
            raise HTTPException(status_code=403, detail="Admin access required")
        
        update_data = {k: v for k, v in request.model_dump().items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        update_data["updated_at"] = datetime.now(timezone.utc)
        
        result = await db.vip_campaigns.update_one(
            {"casino_slug": slug},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="VIP campaign not found")
        
        logger.info(f"VIP campaign updated by {user['email']}: {slug}")
        
        return {"message": "VIP campaign updated successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update VIP campaign error: {e}")
        raise HTTPException(status_code=500, detail="Failed to update VIP campaign")

@app.delete("/api/admin/vip/campaigns/{slug}")
async def delete_vip_campaign(slug: str, user: dict = Depends(get_current_user)):
    """Delete a VIP campaign (admin only)"""
    try:
        if not user or not user.get("is_admin"):
            raise HTTPException(status_code=403, detail="Admin access required")
        
        result = await db.vip_campaigns.delete_one({"casino_slug": slug})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="VIP campaign not found")
        
        logger.info(f"VIP campaign deleted by {user['email']}: {slug}")
        
        return {"message": "VIP campaign deleted successfully"}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Delete VIP campaign error: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete VIP campaign")

# Affiliate Click Tracking Endpoints
@app.post("/api/tracking/click")
async def track_affiliate_click(
    request: AffiliateClickRequest,
    authorization: Optional[str] = Header(None),
    user_agent: Optional[str] = Header(None, alias="User-Agent"),
    x_forwarded_for: Optional[str] = Header(None, alias="X-Forwarded-For")
):
    """Track affiliate link clicks"""
    try:
        # Get user if logged in
        user = await get_current_user(authorization)
        user_id = user.get("email") if user else None
        
        # Hash IP for privacy
        import hashlib
        ip_raw = x_forwarded_for.split(",")[0].strip() if x_forwarded_for else "unknown"
        ip_hash = hashlib.sha256(ip_raw.encode()).hexdigest()[:16]
        
        click_data = AffiliateClick(
            casino_slug=request.casino_slug,
            casino_name=request.casino_name,
            user_id=user_id,
            session_id=request.session_id,
            referrer=request.referrer,
            user_agent=user_agent,
            ip_hash=ip_hash,
            created_at=datetime.now(timezone.utc)
        )
        
        await db.affiliate_clicks.insert_one(click_data.model_dump())
        
        logger.info(f"Affiliate click tracked: {request.casino_slug} by {user_id or 'anonymous'}")
        
        return {"status": "tracked", "casino": request.casino_slug}
    
    except Exception as e:
        logger.error(f"Click tracking error: {e}")
        # Don't fail the request, just log the error
        return {"status": "error", "message": "Failed to track click"}

@app.get("/api/tracking/stats")
async def get_tracking_stats(authorization: Optional[str] = Header(None)):
    """Get affiliate click statistics (admin only)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if user.get("email") not in settings.ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        # Total clicks
        total_clicks = await db.affiliate_clicks.count_documents({})
        
        # Clicks by casino
        pipeline = [
            {"$group": {"_id": "$casino_slug", "count": {"$sum": 1}, "name": {"$first": "$casino_name"}}},
            {"$sort": {"count": -1}}
        ]
        by_casino = await db.affiliate_clicks.aggregate(pipeline).to_list(length=50)
        
        # Clicks in last 24 hours
        yesterday = datetime.now(timezone.utc) - timedelta(hours=24)
        clicks_24h = await db.affiliate_clicks.count_documents({"created_at": {"$gte": yesterday}})
        
        # Clicks in last 7 days
        week_ago = datetime.now(timezone.utc) - timedelta(days=7)
        clicks_7d = await db.affiliate_clicks.count_documents({"created_at": {"$gte": week_ago}})
        
        # Unique sessions
        unique_sessions = len(await db.affiliate_clicks.distinct("session_id"))
        
        # Logged in vs anonymous
        logged_in_clicks = await db.affiliate_clicks.count_documents({"user_id": {"$ne": None}})
        
        return {
            "total_clicks": total_clicks,
            "clicks_24h": clicks_24h,
            "clicks_7d": clicks_7d,
            "unique_sessions": unique_sessions,
            "logged_in_clicks": logged_in_clicks,
            "anonymous_clicks": total_clicks - logged_in_clicks,
            "by_casino": by_casino,
            "last_updated": datetime.now(timezone.utc).isoformat()
        }
    
    except Exception as e:
        logger.error(f"Tracking stats error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve tracking stats")

@app.get("/api/tracking/recent")
async def get_recent_clicks(
    authorization: Optional[str] = Header(None),
    limit: int = 50
):
    """Get recent affiliate clicks (admin only)"""
    user = await get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    if user.get("email") not in settings.ADMIN_EMAILS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        clicks = await db.affiliate_clicks.find(
            {},
            {"_id": 0, "ip_hash": 0}  # Don't expose IP hashes
        ).sort("created_at", -1).to_list(length=limit)
        
        return {"clicks": clicks, "count": len(clicks)}
    
    except Exception as e:
        logger.error(f"Recent clicks error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve recent clicks")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
