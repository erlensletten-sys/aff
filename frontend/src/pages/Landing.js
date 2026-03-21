import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="system-status">
        <span>[ SYSTEM_ONLINE ]</span>
      </div>
      
      <h1>GAMBLE_VERIFY</h1>
      
      <div className="subtitle">
        <p>// PROVABLY FAIR CRYPTOGRAPHIC AUDIT TOOL</p>
        <p>// INDEPENDENT THIRD-PARTY VERIFICATION SYSTEM</p>
        <p>// ALL COMPUTATION RUNS IN YOUR BROWSER</p>
      </div>
      
      <div className="cta-buttons">
        <Link to="/verify" className="btn btn-primary">
          START VERIFICATION
        </Link>
        <Link to="/stats" className="btn btn-secondary">
          VIEW STATISTICS
        </Link>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <h3>$ HMAC-SHA256</h3>
          <p>
            // Cryptographic hash verification for ensuring data integrity and authenticity.
            Browser-based computation ensures your data never leaves your device.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>$ PROVABLY_FAIR</h3>
          <p>
            // Verify gambling game results using cryptographic proofs.
            Check that house games (Dice, Limbo, Slots) are truly fair and unmanipulated.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>$ SHA256_HASH</h3>
          <p>
            // Standard SHA256 hash verification for data validation.
            Confirm the integrity of server seeds and game outcomes.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>$ CLIENT_SIDE</h3>
          <p>
            // Zero server-side processing of sensitive data.
            All cryptographic operations execute in your browser using Web Crypto API.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>$ OPEN_VERIFICATION</h3>
          <p>
            // No account required for basic verification.
            Public access ensures transparency and builds trust in the verification process.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>$ REAL_TIME_STATS</h3>
          <p>
            // View live statistics of verification attempts.
            Track success rates, popular games, and community verification activity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
