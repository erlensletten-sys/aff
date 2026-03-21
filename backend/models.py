from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class User(BaseModel):
    """User model"""
    username: str
    email: EmailStr
    full_name: str
    hashed_password: str
    is_email_verified: bool = False
    is_admin: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class EmailVerificationToken(BaseModel):
    """Email verification token model"""
    user_email: str
    token: str
    created_at: datetime
    expires_at: datetime
    is_used: bool = False
    verified_at: Optional[datetime] = None

class VerificationLog(BaseModel):
    """Log of verification attempts"""
    game_type: str
    result: str  # success, fail
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    duration_ms: Optional[int] = None
    module_used: Optional[str] = None

class Promotion(BaseModel):
    """Promotion card model"""
    title: str
    description: str
    code: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    expires_at: Optional[datetime] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserRegisterRequest(BaseModel):
    """Registration request"""
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    full_name: str
    password: str = Field(min_length=8)

class UserLoginRequest(BaseModel):
    """Login request"""
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"

class VerifyEmailRequest(BaseModel):
    """Email verification request"""
    token: str

class PromotionCreateRequest(BaseModel):
    """Create promotion request"""
    title: str = Field(min_length=3, max_length=100)
    description: str = Field(min_length=10, max_length=500)
    code: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    expires_at: Optional[datetime] = None

class PromotionUpdateRequest(BaseModel):
    """Update promotion request"""
    title: Optional[str] = None
    description: Optional[str] = None
    code: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    expires_at: Optional[datetime] = None
    is_active: Optional[bool] = None
