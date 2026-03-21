# Provably Fair Verification - Integration Guide

## Overview

The NoToGreed verification system is built with an extensible framework that allows you to plug in provider-specific verification algorithms without modifying the core API or UI.

## Architecture

```
/app/backend/
├── verification_engine.py    # Core verification framework
├── server.py                  # FastAPI endpoints
└── providers/                 # Provider-specific modules (to be created)
    ├── stake/
    │   ├── limbo.py
    │   ├── dice.py
    │   └── ...
    ├── shuffle/
    │   └── ...
    └── bcgame/
        └── ...
```

## How to Add a Provider Algorithm

### Step 1: Create a Verification Module

Create a new file for your provider/game combination, e.g., `/app/backend/providers/stake/limbo.py`:

```python
from verification_engine import VerificationModule, VerificationResult
from typing import Dict, Any, List
import hashlib
import hmac

class StakeLimboVerifier(VerificationModule):
    """Stake.com Limbo game verifier"""
    
    def get_required_fields(self) -> List[str]:
        """Define required fields in the export data"""
        return ["server_seed", "client_seed", "nonce", "result"]
    
    def verify(self, payload: Dict[str, Any]) -> VerificationResult:
        """
        Verify Stake.com Limbo result using their documented algorithm
        
        Reference: [Link to Stake's provably fair documentation]
        """
        # Validate payload first
        is_valid, error = self.validate_payload(payload)
        if not is_valid:
            return VerificationResult(
                status="error",
                game_type="limbo",
                provider="stake",
                message=error,
                details={"error_type": "validation_error"}
            )
        
        try:
            # Extract fields
            server_seed = str(payload["server_seed"])
            client_seed = str(payload["client_seed"])
            nonce = int(payload["nonce"])
            claimed_result = float(payload["result"])
            
            # Step 1: Create combined seed (example - use actual Stake algorithm)
            combined = f"{server_seed}:{client_seed}:{nonce}"
            
            # Step 2: Calculate hash
            hash_result = hashlib.sha256(combined.encode()).hexdigest()
            
            # Step 3: Convert hash to game outcome (this is provider-specific)
            # Example: First 8 characters of hash converted to decimal
            hex_value = hash_result[:8]
            decimal_value = int(hex_value, 16)
            calculated_result = (decimal_value / 0xFFFFFFFF) * 100  # Example formula
            
            # Step 4: Compare results
            tolerance = 0.01  # Allow small floating point differences
            is_match = abs(calculated_result - claimed_result) < tolerance
            
            intermediate_steps = [
                f"1. Server Seed: {server_seed[:20]}...",
                f"2. Client Seed: {client_seed}",
                f"3. Nonce: {nonce}",
                f"4. Combined: {combined[:50]}...",
                f"5. SHA256 Hash: {hash_result}",
                f"6. Hex Value: {hex_value}",
                f"7. Calculated Result: {calculated_result:.2f}",
                f"8. Claimed Result: {claimed_result:.2f}",
                f"9. Match: {'YES ✓' if is_match else 'NO ✗'}"
            ]
            
            return VerificationResult(
                status="success" if is_match else "fail",
                game_type="limbo",
                provider="stake",
                message="Verification complete" if is_match else "Result mismatch detected",
                details={
                    "calculated_result": calculated_result,
                    "claimed_result": claimed_result,
                    "hash": hash_result,
                    "match": is_match
                },
                intermediate_steps=intermediate_steps,
                safe_log={
                    "game_type": "limbo",
                    "provider": "stake",
                    "nonce": nonce,
                    "match": is_match
                }
            )
            
        except Exception as e:
            return VerificationResult(
                status="error",
                game_type="limbo",
                provider="stake",
                message=f"Verification error: {str(e)}",
                details={"error": str(e)}
            )
```

### Step 2: Register the Module

In `/app/backend/verification_engine.py`, update the `_initialize_default_modules` method or create a registration function:

```python
# Import your new module
from providers.stake.limbo import StakeLimboVerifier

# In ProviderRegistry._initialize_default_modules or a new method:
def register_stake_modules(self):
    self.register_module("stake", "limbo", StakeLimboVerifier())
    # Add more Stake games...
```

Or dynamically in `server.py` startup:

```python
@app.on_event("startup")
async def startup_db_client():
    # ... existing code ...
    
    # Register custom verification modules
    from providers.stake.limbo import StakeLimboVerifier
    verification_engine.register_custom_module("stake", "limbo", StakeLimboVerifier())
```

### Step 3: Test the Module

Create test vectors in a test file:

```python
# test_stake_limbo.py
from providers.stake.limbo import StakeLimboVerifier

def test_stake_limbo_verification():
    verifier = StakeLimboVerifier()
    
    # Test vector from Stake's documentation
    test_payload = {
        "server_seed": "actual_server_seed_from_stake",
        "client_seed": "actual_client_seed",
        "nonce": 1,
        "result": 1.98
    }
    
    result = verifier.verify(test_payload)
    
    assert result.status == "success"
    assert result.details["match"] == True
    print("✓ Stake Limbo verification test passed")

if __name__ == "__main__":
    test_stake_limbo_verification()
```

## Current Status

### ✅ Implemented
- Core verification engine framework
- Provider registry system
- API endpoint `/api/verify/provably-fair`
- Generic HMAC-SHA256 placeholder for all provider/game combinations
- Supported providers: Stake, Shuffle, BC.Game, Rollbit, Roobet
- Supported games: Limbo, Dice, Blackjack, Keno, Mines, Plinko

### ⏳ Pending
- Provider-specific verification algorithms (awaiting documentation/codes)
- Test vectors for each provider/game combination
- Provider-specific parsing logic for different export formats

## API Endpoint

### POST `/api/verify/provably-fair`

**Request:**
```json
{
  "provider": "stake",
  "game_type": "limbo",
  "payload": {
    "server_seed": "...",
    "client_seed": "...",
    "nonce": 1,
    "result": "..."
  },
  "options": {
    "include_steps": true
  }
}
```

**Response:**
```json
{
  "status": "success|fail|error|pending",
  "game_type": "limbo",
  "provider": "stake",
  "message": "Verification complete",
  "details": {
    "calculated_result": "...",
    "claimed_result": "...",
    "match": true
  },
  "intermediate_steps": [
    "1. Combined server seed + client seed + nonce",
    "2. Server Seed: ...",
    "..."
  ],
  "safe_log": {
    "game_type": "limbo",
    "provider": "stake",
    "has_server_seed": true,
    "has_client_seed": true,
    "nonce": 1
  },
  "timestamp": "2026-03-21T16:00:00.000000+00:00"
}
```

## Common Patterns

### Pattern 1: SHA256-based
Many providers use SHA256 hashing:
```python
hash_result = hashlib.sha256(combined_seed.encode()).hexdigest()
```

### Pattern 2: HMAC-SHA256-based
Some use HMAC with server seed as key:
```python
hash_result = hmac.new(
    server_seed.encode(),
    f"{client_seed}:{nonce}".encode(),
    hashlib.sha256
).hexdigest()
```

### Pattern 3: Hash to Game Result
Convert hash to game outcome (provider-specific):
```python
# Example: First N bytes to decimal
hex_slice = hash_result[:8]
decimal = int(hex_slice, 16)
game_result = (decimal / 0xFFFFFFFF) * multiplier
```

## Testing Checklist

Before deploying a new provider module:

- [ ] Validate with at least 3 test vectors from provider's documentation
- [ ] Test edge cases (minimum bet, maximum multiplier, etc.)
- [ ] Verify intermediate steps match provider's algorithm documentation
- [ ] Ensure error handling for malformed payloads
- [ ] Add logging for debugging without exposing sensitive data
- [ ] Test via API endpoint with curl
- [ ] Test via UI on /verify page

## Next Steps

When you receive provider verification codes:

1. **Parse the algorithm**: Understand the exact steps
2. **Create the module**: Follow the pattern above
3. **Add test vectors**: Get examples from provider docs
4. **Register the module**: Add to the registry
5. **Test thoroughly**: Use the checklist above
6. **Deploy**: Restart backend service

The framework is ready - just plug in the algorithms!
