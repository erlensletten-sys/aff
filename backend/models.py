from datetime import datetime
from typing import Optional, List
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
    provider: Optional[str] = None
    result: str  # success, fail
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    duration_ms: Optional[int] = None
    module_used: Optional[str] = None

class Provider(BaseModel):
    """Casino provider model"""
    name: str
    slug: str
    logo_url: Optional[str] = None
    supported_games: List[str] = []
    verification_code: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

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

class ProviderCreateRequest(BaseModel):
    """Create provider request"""
    name: str = Field(min_length=2, max_length=100)
    slug: str = Field(min_length=2, max_length=100)
    logo_url: Optional[str] = None
    supported_games: List[str] = []
    verification_code: Optional[str] = None

class ProviderUpdateRequest(BaseModel):
    """Update provider request"""
    name: Optional[str] = None
    logo_url: Optional[str] = None
    supported_games: Optional[List[str]] = None
    verification_code: Optional[str] = None
    is_active: Optional[bool] = None


class VIPCampaign(BaseModel):
    """VIP referral campaign model"""
    casino_name: str
    casino_slug: str
    logo_url: Optional[str] = None
    bonus_title: str  # e.g., "200% Welcome Bonus"
    bonus_value: str  # e.g., "Up to $3,000 + 50 Free Spins"
    description: str
    referral_link: str
    bonus_code: Optional[str] = None
    exclusive_extra: Optional[str] = None  # NoToGreed exclusive bonus
    terms: Optional[str] = None
    min_deposit: Optional[str] = None
    wagering_requirement: Optional[str] = None
    is_featured: bool = False
    is_active: bool = True
    sort_order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class VIPCampaignCreateRequest(BaseModel):
    """Create VIP campaign request"""
    casino_name: str = Field(min_length=2, max_length=100)
    casino_slug: str = Field(min_length=2, max_length=100)
    logo_url: Optional[str] = None
    bonus_title: str = Field(min_length=3, max_length=200)
    bonus_value: str = Field(min_length=3, max_length=200)
    description: str = Field(min_length=10, max_length=1000)
    referral_link: str
    bonus_code: Optional[str] = None
    exclusive_extra: Optional[str] = None
    terms: Optional[str] = None
    min_deposit: Optional[str] = None
    wagering_requirement: Optional[str] = None
    is_featured: bool = False
    sort_order: int = 0

class VIPCampaignUpdateRequest(BaseModel):
    """Update VIP campaign request"""
    casino_name: Optional[str] = None
    logo_url: Optional[str] = None
    bonus_title: Optional[str] = None
    bonus_value: Optional[str] = None
    description: Optional[str] = None
    referral_link: Optional[str] = None
    bonus_code: Optional[str] = None
    exclusive_extra: Optional[str] = None
    terms: Optional[str] = None
    min_deposit: Optional[str] = None
    wagering_requirement: Optional[str] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None

class ProvablyFairVerifyRequest(BaseModel):
    """Provably fair verification request"""
    provider: str = Field(min_length=2, max_length=100)
    game_type: str = Field(min_length=2, max_length=50)
    payload: dict  # Raw export data from casino
    options: Optional[dict] = None  # Additional options (strict_mode, include_steps, etc.)

class ProvablyFairVerifyResponse(BaseModel):
    """Provably fair verification response"""
    status: str  # 'success', 'fail', 'error', 'pending'
    game_type: str
    provider: str
    message: str
    details: dict = {}
    intermediate_steps: List[str] = []
    safe_log: dict = {}
    timestamp: str
