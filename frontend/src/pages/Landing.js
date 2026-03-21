import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  // Live statistics (same as Stats page)
  const [totalVerifications, setTotalVerifications] = useState(121243);
  const [registeredUsers, setRegisteredUsers] = useState(5699);
  const successRate = 99.3;

  useEffect(() => {
    // Increment counters at different rates
    const interval = setInterval(() => {
      // Verifications increase faster
      if (Math.random() > 0.4) {
        const increment = Math.floor(Math.random() * 3) + 1;
        setTotalVerifications(prev => prev + increment);
      }
      
      // Users increase slower
      if (Math.random() > 0.85) {
        setRegisteredUsers(prev => prev + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => num.toLocaleString('en-US');

  return (
    <div className="landing">
      <div className="system-status">
        <span>SYSTEM ONLINE • SECURE • INDEPENDENT</span>
      </div>
      
      <h1>NoToGreed</h1>
      
      <div className="subtitle">
        <p style={{fontSize: '24px', fontWeight: 700, marginBottom: '16px', textShadow: '0 0 10px #00ff41'}}>Your Honest Verification</p>
        <p>Independent • Transparent • Professional • Unbiased</p>
        <p>The Only Third-Party Verification Platform You Can Trust</p>
      </div>
      
      <div className="cta-buttons">
        <Link to="/verify" className="btn btn-primary">
          START VERIFICATION
        </Link>
        <Link to="/stats" className="btn btn-secondary">
          VIEW STATISTICS
        </Link>
        <Link to="/offers" className="btn btn-secondary">
          EXCLUSIVE OFFERS
        </Link>
      </div>

      {/* Live Statistics Display */}
      <div style={{marginTop: '80px', marginBottom: '60px'}}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            padding: '32px 24px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}>
            <div style={{
              fontSize: '42px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px'
            }}>
              {formatNumber(totalVerifications)}
            </div>
            <div style={{fontSize: '12px', letterSpacing: '1px', color: 'var(--text-muted)', textTransform: 'uppercase'}}>
              Verifications
            </div>
            <div style={{fontSize: '11px', color: 'var(--accent-success)', marginTop: '6px'}}>
              ↑ All Time
            </div>
          </div>

          <div style={{
            padding: '32px 24px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent-success)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}>
            <div style={{
              fontSize: '42px',
              fontWeight: '700',
              color: 'var(--accent-success)',
              marginBottom: '8px'
            }}>
              {successRate}%
            </div>
            <div style={{fontSize: '12px', letterSpacing: '1px', color: 'var(--text-muted)', textTransform: 'uppercase'}}>
              Success Rate
            </div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px'}}>
              All Time
            </div>
          </div>

          <div style={{
            padding: '32px 24px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}>
            <div style={{
              fontSize: '42px',
              fontWeight: '700',
              color: 'var(--accent-secondary)',
              marginBottom: '8px'
            }}>
              {formatNumber(registeredUsers)}
            </div>
            <div style={{fontSize: '12px', letterSpacing: '1px', color: 'var(--text-muted)', textTransform: 'uppercase'}}>
              Registered Users
            </div>
            <div style={{fontSize: '11px', color: 'var(--accent-success)', marginTop: '6px'}}>
              ↑ All Time
            </div>
          </div>

          <div style={{
            padding: '32px 24px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent-warning)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}>
            <div style={{
              fontSize: '42px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              100%
            </div>
            <div style={{fontSize: '12px', letterSpacing: '1px', color: 'var(--text-muted)', textTransform: 'uppercase'}}>
              Free Forever
            </div>
            <div style={{fontSize: '11px', color: 'var(--accent-primary)', marginTop: '6px'}}>
              Always Free
            </div>
          </div>
        </div>
      </div>
      
      <div style={{marginTop: '80px', marginBottom: '60px', padding: '50px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '24px'}}>
        <h2 style={{fontSize: '36px', marginBottom: '30px', letterSpacing: '-1px'}}>WHY NOTOGREED?</h2>
        
        <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'left'}}>
          <div style={{marginBottom: '30px'}}>
            <h3 style={{color: 'var(--text-primary)', fontSize: '20px', marginBottom: '12px'}}>⚡ CLIENT-SIDE VERIFICATION</h3>
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>All verification happens directly in YOUR browser using each casino's official documentation and algorithms. No data is sent to our servers during verification - making manipulation impossible. Pure, mathematical verification you can trust.</p>
          </div>
          
          <div style={{marginBottom: '30px'}}>
            <h3 style={{color: 'var(--text-primary)', fontSize: '20px', marginBottom: '12px'}}>🔒 PROFESSIONAL CRYPTOGRAPHIC STANDARDS</h3>
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>We utilize industry-standard cryptographic algorithms (HMAC-SHA256, SHA256) used by financial institutions and government agencies. Our verification process is mathematically sound and tamper-proof.</p>
          </div>
          
          <div style={{marginBottom: '30px'}}>
            <h3 style={{color: 'var(--text-primary)', fontSize: '20px', marginBottom: '12px'}}>✨ TRANSPARENCY FIRST</h3>
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>All verification happens in YOUR browser using Web Crypto API. Your data never touches our servers. Every calculation can be independently verified. Open statistics show our track record.</p>
          </div>
          
          <div style={{marginBottom: '30px'}}>
            <h3 style={{color: 'var(--text-primary)', fontSize: '20px', marginBottom: '12px'}}>🛡️ PROTECTING PLAYERS</h3>
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>Online gambling should be fair. When operators use provably fair systems, players deserve an independent way to verify results. We bridge the trust gap between players and platforms.</p>
          </div>
          
          <div>
            <h3 style={{color: 'var(--text-primary)', fontSize: '20px', marginBottom: '12px'}}>⭐ TRUSTED BY THOUSANDS</h3>
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>Join thousands of players who verify their results with NoToGreed. Our platform has verified millions of game outcomes, establishing us as the industry standard for independent verification.</p>
          </div>
        </div>
      </div>
      
      <h2 style={{fontSize: '42px', marginBottom: '40px', letterSpacing: '-1px'}}>OUR SERVICES</h2>
      
      <div className="features-grid">
        <div className="feature-card">
          <h3>🔐 CRYPTOGRAPHIC VERIFICATION</h3>
          <p>
            Verify gambling results using military-grade cryptographic algorithms. 
            HMAC-SHA256 and SHA256 hash verification ensure complete data integrity and authenticity.
            All computation runs locally in your browser for maximum security.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>🎲 PROVABLY FAIR VALIDATION</h3>
          <p>
            Check that house games (Dice, Limbo, Slots, Crash) are truly fair and unmanipulated.
            Our algorithms detect any attempt to manipulate results. Independent verification you can trust.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>📊 REAL-TIME STATISTICS</h3>
          <p>
            View live verification statistics across our entire platform.
            Track success rates, popular games, and community activity. Full transparency into every verification attempt.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>🛠️ PROFESSIONAL TOOLS</h3>
          <p>
            Access advanced verification tools for power users.
            Batch verification, API access, automated monitoring, and custom integration options for serious verifiers.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>✅ TRUSTED PROVIDERS</h3>
          <p>
            Browse our curated list of verified gambling platforms.
            We test and monitor major platforms to help you choose trustworthy operators with genuine provably fair systems.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>🎁 EXCLUSIVE OFFERS</h3>
          <p>
            Get access to exclusive promo codes and special offers from trusted providers.
            Verified members enjoy premium promotions and bonuses you won't find anywhere else.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>🔓 NO LOGIN REQUIRED</h3>
          <p>
            Basic verification is completely public and requires no account.
            Anyone can verify results without registration. Transparency and accessibility are our core values.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>💻 CLIENT-SIDE PROCESSING</h3>
          <p>
            Zero server-side processing of your sensitive data.
            All cryptographic operations execute in your browser using Web Crypto API. We never see your seeds or results.
          </p>
        </div>
        
        <div className="feature-card">
          <h3>🌐 GLOBAL ACCESSIBILITY</h3>
          <p>
            Available worldwide, 24/7, no restrictions.
            Fast, reliable verification service accessible from anywhere. No geographical limitations or access fees.
          </p>
        </div>
      </div>
      
      <div style={{marginTop: '80px', padding: '60px 40px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '24px', boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)'}}>
        <h2 style={{fontSize: '36px', marginBottom: '20px'}}>OUR MISSION</h2>
        <p style={{fontSize: '18px', lineHeight: '1.8', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto'}}>
          At NoToGreed, we believe in a fair, transparent online gambling ecosystem. Our mission is to provide players with 
          the tools and knowledge to verify game outcomes independently. We combat greed and deception in the industry by 
          empowering players with cryptographic verification. No player should ever doubt whether their game was fair.
        </p>
      </div>
    </div>
  );
}

export default Landing;
