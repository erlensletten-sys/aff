"""
Provably Fair Verification Engine

This module provides an extensible framework for verifying provably fair gambling results.
Each provider/game combination can have its own verification algorithm plugged in.

Architecture:
- VerificationEngine: Main interface for running verifications
- ProviderRegistry: Manages provider-specific verification modules
- VerificationModule: Base class for individual game verifiers
"""

import hashlib
import hmac
import json
from typing import Dict, Any, Optional, List
from datetime import datetime, timezone
from abc import ABC, abstractmethod
import logging

logger = logging.getLogger(__name__)


class VerificationResult:
    """Standardized verification result"""
    def __init__(
        self,
        status: str,  # 'success', 'fail', 'error', 'pending'
        game_type: str,
        provider: str,
        message: str,
        details: Optional[Dict[str, Any]] = None,
        intermediate_steps: Optional[List[str]] = None,
        safe_log: Optional[Dict[str, Any]] = None
    ):
        self.status = status
        self.game_type = game_type
        self.provider = provider
        self.message = message
        self.details = details or {}
        self.intermediate_steps = intermediate_steps or []
        self.safe_log = safe_log or {}
        self.timestamp = datetime.now(timezone.utc).isoformat()
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "status": self.status,
            "game_type": self.game_type,
            "provider": self.provider,
            "message": self.message,
            "details": self.details,
            "intermediate_steps": self.intermediate_steps,
            "safe_log": self.safe_log,
            "timestamp": self.timestamp
        }


class VerificationModule(ABC):
    """Base class for all verification modules"""
    
    @abstractmethod
    def verify(self, payload: Dict[str, Any]) -> VerificationResult:
        """
        Verify a game result using provider-specific algorithm
        
        Args:
            payload: Raw export data from the casino
            
        Returns:
            VerificationResult with status and details
        """
        pass
    
    @abstractmethod
    def get_required_fields(self) -> List[str]:
        """Return list of required fields in the payload"""
        pass
    
    def validate_payload(self, payload: Dict[str, Any]) -> tuple[bool, Optional[str]]:
        """Validate that payload contains all required fields"""
        required = self.get_required_fields()
        missing = [field for field in required if field not in payload]
        
        if missing:
            return False, f"Missing required fields: {', '.join(missing)}"
        
        return True, None


class GenericHashVerifier(VerificationModule):
    """Generic HMAC-SHA256 verification for provably fair games"""
    
    def __init__(self, game_type: str, provider: str):
        self.game_type = game_type
        self.provider = provider
    
    def get_required_fields(self) -> List[str]:
        return ["server_seed", "client_seed", "nonce", "result"]
    
    def verify(self, payload: Dict[str, Any]) -> VerificationResult:
        """
        Generic verification using HMAC-SHA256
        This is a template - actual provider algorithms will replace this
        """
        try:
            # Validate payload
            is_valid, error = self.validate_payload(payload)
            if not is_valid:
                return VerificationResult(
                    status="error",
                    game_type=self.game_type,
                    provider=self.provider,
                    message=error,
                    details={"error_type": "validation_error"}
                )
            
            server_seed = str(payload.get("server_seed", ""))
            client_seed = str(payload.get("client_seed", ""))
            nonce = payload.get("nonce", 0)
            claimed_result = payload.get("result")
            
            # Generic HMAC calculation (provider-specific logic will replace this)
            calculated_hash = hmac.new(
                server_seed.encode(),
                f"{client_seed}:{nonce}".encode(),
                hashlib.sha256
            ).hexdigest()
            
            intermediate_steps = [
                "1. Combined server seed + client seed + nonce",
                f"2. Server Seed: {server_seed[:20]}...",
                f"3. Client Seed: {client_seed}",
                f"4. Nonce: {nonce}",
                f"5. Calculated HMAC-SHA256: {calculated_hash[:32]}...",
                "6. Provider-specific algorithm pending integration"
            ]
            
            return VerificationResult(
                status="pending",
                game_type=self.game_type,
                provider=self.provider,
                message=f"Generic verification framework in place. Provider-specific {self.provider} algorithm for {self.game_type} needs to be integrated.",
                details={
                    "calculated_hash": calculated_hash,
                    "claimed_result": claimed_result,
                    "note": "This is a placeholder. Actual verification will use provider's documented algorithm."
                },
                intermediate_steps=intermediate_steps,
                safe_log={
                    "game_type": self.game_type,
                    "provider": self.provider,
                    "has_server_seed": bool(server_seed),
                    "has_client_seed": bool(client_seed),
                    "nonce": nonce
                }
            )
            
        except Exception as e:
            logger.error(f"Verification error: {e}")
            return VerificationResult(
                status="error",
                game_type=self.game_type,
                provider=self.provider,
                message=f"Verification failed: {str(e)}",
                details={"error": str(e), "error_type": "exception"}
            )


class ProviderRegistry:
    """Registry for provider-specific verification modules"""
    
    def __init__(self):
        self._modules: Dict[str, Dict[str, VerificationModule]] = {}
        self._initialize_default_modules()
    
    def _initialize_default_modules(self):
        """Initialize default generic modules for all game types"""
        providers = ["stake", "shuffle", "bcgame", "rollbit", "roobet"]
        games = ["limbo", "dice", "blackjack", "keno", "mines", "plinko"]
        
        for provider in providers:
            self._modules[provider] = {}
            for game in games:
                # Create generic verifier as placeholder
                self._modules[provider][game] = GenericHashVerifier(game, provider)
    
    def register_module(self, provider: str, game_type: str, module: VerificationModule):
        """Register a specific verification module for a provider/game combination"""
        if provider not in self._modules:
            self._modules[provider] = {}
        
        self._modules[provider][game_type] = module
        logger.info(f"Registered verification module: {provider}/{game_type}")
    
    def get_module(self, provider: str, game_type: str) -> Optional[VerificationModule]:
        """Get verification module for provider/game combination"""
        return self._modules.get(provider, {}).get(game_type)
    
    def list_supported(self) -> Dict[str, List[str]]:
        """List all supported provider/game combinations"""
        return {
            provider: list(games.keys())
            for provider, games in self._modules.items()
        }


class VerificationEngine:
    """Main verification engine that coordinates verification requests"""
    
    def __init__(self):
        self.registry = ProviderRegistry()
    
    def verify(
        self,
        provider: str,
        game_type: str,
        payload: Dict[str, Any],
        options: Optional[Dict[str, Any]] = None
    ) -> VerificationResult:
        """
        Execute verification for a specific provider/game combination
        
        Args:
            provider: Provider slug (e.g., 'stake', 'shuffle')
            game_type: Game type (e.g., 'limbo', 'dice', 'blackjack')
            payload: Raw export data from the casino
            options: Additional options (strict_mode, include_steps, etc.)
            
        Returns:
            VerificationResult with status and details
        """
        try:
            # Normalize inputs
            provider = provider.lower().strip()
            game_type = game_type.lower().strip()
            
            # Get verification module
            module = self.registry.get_module(provider, game_type)
            
            if not module:
                return VerificationResult(
                    status="error",
                    game_type=game_type,
                    provider=provider,
                    message=f"Unsupported combination: {provider}/{game_type}",
                    details={
                        "error_type": "unsupported",
                        "supported": self.registry.list_supported()
                    }
                )
            
            # Execute verification
            result = module.verify(payload)
            
            return result
            
        except Exception as e:
            logger.error(f"Engine verification error: {e}")
            return VerificationResult(
                status="error",
                game_type=game_type,
                provider=provider,
                message=f"Verification engine error: {str(e)}",
                details={"error": str(e)}
            )
    
    def get_supported_combinations(self) -> Dict[str, List[str]]:
        """Get all supported provider/game combinations"""
        return self.registry.list_supported()
    
    def register_custom_module(self, provider: str, game_type: str, module: VerificationModule):
        """Register a custom verification module"""
        self.registry.register_module(provider, game_type, module)


# Global engine instance
verification_engine = VerificationEngine()
