import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <div className="system-status">
        <span>[ SYSTEM ONLINE ]</span>
      </div>
      
      <h1>NoToGreed</h1>
      
      <div className="subtitle">
        <p style={{fontSize: '22px', fontWeight: 600, marginBottom: '16px'}}>Your Honest Verification</p>
        <p>Independent third-party cryptographic verification</p>
        <p>Ensuring fairness and transparency in online gambling</p>
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
          <h3>🔒 Cryptographic Verification</h3>
          <p>
            Verify gambling results using industry-standard cryptographic algorithms. 
            HMAC-SHA256 and SHA256 hash verification for complete data integrity.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>🎲 Provably Fair</h3>
          <p>
            Check that house games (Dice, Limbo, Slots) are truly fair and unmanipulated.
            Independent verification you can trust.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>📊 Real-Time Statistics</h3>
          <p>
            View live statistics of verification attempts across the platform.
            Track success rates and community verification activity.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>🔓 No Login Required</h3>
          <p>
            Public access for basic verification ensures transparency.
            Anyone can verify results without creating an account.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>💻 Client-Side Processing</h3>
          <p>
            All cryptographic operations execute in your browser.
            Your data never leaves your device. Zero server-side processing.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>🎁 Exclusive Promotions</h3>
          <p>
            Get access to exclusive promo codes and special offers.
            Register to unlock member-only promotions and deals.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
