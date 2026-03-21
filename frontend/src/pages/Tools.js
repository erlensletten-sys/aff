import React from 'react';

function Tools() {
  return (
    <div className="stats-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '3px', fontSize: '42px', textShadow: 'var(--glow-green)'}}>VERIFICATION TOOLS</h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '16px'}}>
        Professional-grade tools for advanced verification
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>🔐 HASH CALCULATOR</h3>
          <p style={{marginBottom: '20px'}}>Calculate SHA256 and HMAC-SHA256 hashes for any input. Verify server seeds, client seeds, and game outcomes independently.</p>
          <button className="btn btn-primary" style={{width: '100%'}}>COMING SOON</button>
        </div>

        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>📦 BATCH VERIFIER</h3>
          <p style={{marginBottom: '20px'}}>Verify multiple game results at once. Upload CSV files containing hundreds of outcomes for bulk verification.</p>
          <button className="btn btn-primary" style={{width: '100%'}}>COMING SOON</button>
        </div>

        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>🔍 SEED ANALYZER</h3>
          <p style={{marginBottom: '20px'}}>Analyze seed patterns and randomness. Detect potential issues with server seed generation and rotation.</p>
          <button className="btn btn-primary" style={{width: '100%'}}>COMING SOON</button>
        </div>

        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>📊 RESULT TRACKER</h3>
          <p style={{marginBottom: '20px'}}>Track your verification history. Export reports, analyze patterns, and monitor your gaming sessions.</p>
          <button className="btn btn-primary" style={{width: '100%'}}>COMING SOON</button>
        </div>

        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>🔌 API ACCESS</h3>
          <p style={{marginBottom: '20px'}}>Integrate NoToGreed verification into your own applications. RESTful API with comprehensive documentation.</p>
          <button className="btn btn-primary" style={{width: '100%'}}>COMING SOON</button>
        </div>

        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>⚡ REAL-TIME MONITOR</h3>
          <p style={{marginBottom: '20px'}}>Monitor live games and verify results in real-time. Get instant notifications for suspicious patterns.</p>
          <button className="btn btn-primary" style={{width: '100%'}}>COMING SOON</button>
        </div>
      </div>

      <div style={{marginTop: '60px', padding: '40px', background: 'rgba(0, 255, 65, 0.05)', border: '2px solid var(--border-color)'}}>
        <h2 style={{fontSize: '28px', marginBottom: '20px', textShadow: '0 0 5px #00ff41'}}>PROFESSIONAL FEATURES</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px'}}>
          <div>
            <h3 style={{color: 'var(--text-primary)', marginBottom: '10px'}}>&gt; AUTOMATED VERIFICATION</h3>
            <p style={{color: 'var(--text-secondary)'}}>Set up automated verification workflows for continuous monitoring of your gaming sessions.</p>
          </div>
          <div>
            <h3 style={{color: 'var(--text-primary)', marginBottom: '10px'}}>&gt; CUSTOM INTEGRATIONS</h3>
            <p style={{color: 'var(--text-secondary)'}}>Build custom integrations with our API. Perfect for streamers, communities, and power users.</p>
          </div>
          <div>
            <h3 style={{color: 'var(--text-primary)', marginBottom: '10px'}}>&gt; ADVANCED ANALYTICS</h3>
            <p style={{color: 'var(--text-secondary)'}}>Deep analytics and statistical analysis tools for professional verification auditing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tools;
