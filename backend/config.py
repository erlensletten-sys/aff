import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Application settings"""
    
    # MongoDB
    MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "notogreed")
    
    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
    JWT_ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours
    
    # Email Providers
    EMAIL_PROVIDER = os.getenv("EMAIL_PROVIDER", "resend")  # brevo or resend
    
    # Brevo
    BREVO_API_KEY = os.getenv("BREVO_API_KEY", "")
    BREVO_SENDER_EMAIL = os.getenv("BREVO_SENDER_EMAIL", "noreply@notogreed.com")
    BREVO_SENDER_NAME = os.getenv("BREVO_SENDER_NAME", "NoToGreed")
    
    # Resend
    RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
    RESEND_SENDER_EMAIL = os.getenv("RESEND_SENDER_EMAIL", "onboarding@resend.dev")
    
    # Email Verification
    VERIFICATION_TOKEN_EXPIRY_HOURS = 24
    VERIFICATION_BASE_URL = os.getenv("VERIFICATION_BASE_URL", "http://localhost:3000")
    
    # Admin
    ADMIN_EMAILS = os.getenv("ADMIN_EMAILS", "admin@notogreed.com").split(",")
    
    # CORS
    CORS_ORIGINS = ["http://localhost:3000", "https://gamble-verify.preview.emergentagent.com"]

settings = Settings()
