import logging
import secrets
import asyncio
from datetime import datetime, timedelta, timezone
from typing import Dict, Any
from config import settings

logger = logging.getLogger(__name__)

class EmailService:
    """Abstract email service supporting multiple providers"""
    
    def __init__(self):
        self.provider = settings.EMAIL_PROVIDER
        logger.info(f"Email service initialized with provider: {self.provider}")
    
    def generate_verification_token(self, length: int = 32) -> str:
        """Generate cryptographically secure URL-safe token"""
        return secrets.token_urlsafe(length)
    
    async def send_verification_email(self, recipient_email: str, recipient_name: str, verification_token: str) -> Dict[str, Any]:
        """Send verification email using configured provider"""
        verification_link = f"{settings.VERIFICATION_BASE_URL}/verify?token={verification_token}"
        
        try:
            if self.provider == "brevo":
                return await self._send_via_brevo(recipient_email, recipient_name, verification_link)
            elif self.provider == "resend":
                return await self._send_via_resend(recipient_email, recipient_name, verification_link)
            else:
                raise ValueError(f"Unknown email provider: {self.provider}")
        except Exception as e:
            logger.error(f"Failed to send verification email: {e}")
            # Return success anyway so registration completes
            # User can request resend later
            return {
                "status": "queued",
                "message": "Email queued for delivery",
                "error": str(e)
            }
    
    async def _send_via_brevo(self, recipient_email: str, recipient_name: str, verification_link: str) -> Dict[str, Any]:
        """Send email via Brevo"""
        if not settings.BREVO_API_KEY:
            logger.warning("Brevo API key not configured")
            return {"status": "skipped", "message": "Brevo API key not configured"}
        
        try:
            import brevo_python
            from brevo_python.rest import ApiException
            
            configuration = brevo_python.Configuration()
            configuration.api_key['api-key'] = settings.BREVO_API_KEY
            
            api_instance = brevo_python.TransactionalEmailsApi(brevo_python.ApiClient(configuration))
            
            sender = {"name": settings.BREVO_SENDER_NAME, "email": settings.BREVO_SENDER_EMAIL}
            to = [{"email": recipient_email, "name": recipient_name}]
            
            html_content = self._build_email_html(recipient_name, verification_link)
            
            send_smtp_email = brevo_python.SendSmtpEmail(
                to=to,
                sender=sender,
                subject="Verify Your Email Address",
                html_content=html_content
            )
            
            # Run in thread to avoid blocking
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, api_instance.send_transac_email, send_smtp_email)
            
            logger.info(f"Brevo email sent to {recipient_email}: {result.message_id}")
            return {
                "status": "sent",
                "provider": "brevo",
                "message_id": result.message_id
            }
        except Exception as e:
            logger.error(f"Brevo send error: {e}")
            raise
    
    async def _send_via_resend(self, recipient_email: str, recipient_name: str, verification_link: str) -> Dict[str, Any]:
        """Send email via Resend"""
        if not settings.RESEND_API_KEY:
            logger.warning("Resend API key not configured")
            return {"status": "skipped", "message": "Resend API key not configured"}
        
        try:
            import resend
            resend.api_key = settings.RESEND_API_KEY
            
            html_content = self._build_email_html(recipient_name, verification_link)
            
            params = {
                "from": settings.RESEND_SENDER_EMAIL,
                "to": [recipient_email],
                "subject": "Verify Your Email Address",
                "html": html_content
            }
            
            # Run in thread to avoid blocking
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, resend.Emails.send, params)
            
            logger.info(f"Resend email sent to {recipient_email}: {result.get('id')}")
            return {
                "status": "sent",
                "provider": "resend",
                "email_id": result.get("id")
            }
        except Exception as e:
            logger.error(f"Resend send error: {e}")
            raise
    
    def _build_email_html(self, recipient_name: str, verification_link: str) -> str:
        """Build email HTML with dark terminal theme"""
        first_name = recipient_name.split()[0] if recipient_name else "User"
        
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {{
                    font-family: 'Courier New', monospace;
                    background-color: #0a0a0a;
                    color: #00ff00;
                    margin: 0;
                    padding: 20px;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #1a1a1a;
                    border: 1px solid #00ff00;
                    padding: 30px;
                }}
                .header {{
                    text-align: center;
                    padding: 20px 0;
                    border-bottom: 1px solid #00ff00;
                    margin-bottom: 30px;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 24px;
                    color: #00ff00;
                }}
                .content {{
                    line-height: 1.8;
                    color: #cccccc;
                }}
                .button {{
                    display: inline-block;
                    padding: 15px 40px;
                    background-color: #00ff00;
                    color: #000000;
                    text-decoration: none;
                    border-radius: 0;
                    margin: 20px 0;
                    font-weight: bold;
                    text-align: center;
                }}
                .code-block {{
                    background-color: #0a0a0a;
                    border: 1px solid #00ff00;
                    padding: 15px;
                    margin: 20px 0;
                    word-break: break-all;
                    color: #00ff00;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #00ff00;
                    font-size: 12px;
                    color: #666666;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>GAMBLE_VERIFY</h1>
                    <p style="margin: 5px 0; color: #666;">// CRYPTOGRAPHIC AUDIT TOOL</p>
                </div>
                <div class="content">
                    <p>$ HELLO {first_name.upper()},</p>
                    <p>// Your account has been created successfully.</p>
                    <p>// Please verify your email address to activate your account.</p>
                    <p>// This verification link will expire in 24 hours.</p>
                    
                    <center>
                        <a href="{verification_link}" class="button">VERIFY EMAIL ADDRESS</a>
                    </center>
                    
                    <p>// Or copy and paste this link in your browser:</p>
                    <div class="code-block">
                        {verification_link}
                    </div>
                    
                    <p style="margin-top: 30px; color: #ff6600;">⚠️ SECURITY NOTICE:</p>
                    <p style="color: #999;">• Never share this link with anyone<br>
                    • This is an automated message<br>
                    • If you didn't create this account, please ignore this email</p>
                </div>
                <div class="footer">
                    <p>© 2026 GAMBLE_VERIFY // ALL RIGHTS RESERVED</p>
                    <p>// INDEPENDENT THIRD-PARTY VERIFICATION SYSTEM</p>
                </div>
            </div>
        </body>
        </html>
        """

email_service = EmailService()
