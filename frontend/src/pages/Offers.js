import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Offers() {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(!!localStorage.getItem('token'));

  if (!isAuthenticated) {
    return (
      <div className="stats-container">
        <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '3px', fontSize: '42px', textShadow: 'var(--glow-green)'}}>EXCLUSIVE OFFERS</h1>
        <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '16px'}}>
          Premium promotions for verified members
        </p>

        <div style={{maxWidth: '700px', margin: '0 auto', padding: '60px 40px', background: 'rgba(0, 26, 0, 0.5)', border: '2px solid var(--border-color)', textAlign: 'center', boxShadow: 'var(--glow-green)'}}>
          <div style={{fontSize: '64px', marginBottom: '30px', textShadow: 'var(--glow-green)'}}>🔒</div>
          <h2 style={{fontSize: '32px', marginBottom: '20px', textShadow: '0 0 10px #00ff41'}}>MEMBERS ONLY</h2>
          <p style={{fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '30px'}}>
            Exclusive promo codes and special offers are available to verified members only. 
            Register now to unlock premium promotions from trusted gambling providers.
          </p>
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button onClick={() => navigate('/register')} className="btn btn-primary">
              &gt; CREATE ACCOUNT
            </button>
            <button onClick={() => navigate('/login')} className="btn btn-secondary">
              &gt; LOGIN
            </button>
          </div>
        </div>

        <div className="features-grid" style={{marginTop: '60px'}}>
          <div className="feature-card">
            <h3>🎁 Exclusive Promo Codes</h3>
            <p>Access member-only promo codes with enhanced bonuses not available to the public.</p>
          </div>
          <div className="feature-card">
            <h3>💰 Special Offers</h3>
            <p>Premium offers from trusted providers, curated specifically for NoToGreed members.</p>
          </div>
          <div className="feature-card">
            <h3>⏰ Limited Time Deals</h3>
            <p>Time-sensitive promotions and flash deals available exclusively to registered users.</p>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, redirect to promotions page
  navigate('/promotions');
  return null;
}

export default Offers;
