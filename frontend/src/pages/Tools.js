import React, { useState } from 'react';
import { HashCalculator, SeedAnalyzer, MonitorModal } from '../components/ToolComponents';

function Tools() {
  const [showMonitorModal, setShowMonitorModal] = useState(false);

  return (
    <div className="stats-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '-1px', fontSize: '42px'}}>
        VERIFICATION TOOLS
      </h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '16px'}}>
        Professional-grade tools for advanced verification
      </p>

      {/* Hash Calculator */}
      <HashCalculator />

      {/* Seed Analyzer */}
      <SeedAnalyzer />

      {/* Other Tools */}
      <h2 style={{fontSize: '28px', marginBottom: '20px'}}>Additional Tools</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>📦 Batch Verifier</h3>
          <p style={{marginBottom: '20px'}}>Verify multiple game results at once. Upload CSV files containing hundreds of outcomes for bulk verification.</p>
          <button className="btn btn-primary" style={{width: '100%'}}>COMING SOON</button>
        </div>

        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>📊 Result Tracker</h3>
          <p style={{marginBottom: '20px'}}>Track your verification history. Export reports, analyze patterns, and monitor your gaming sessions.</p>
          <button className="btn btn-primary" style={{width: '100%'}}>COMING SOON</button>
        </div>

        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>🔌 API Access</h3>
          <p style={{marginBottom: '20px'}}>Integrate NoToGreed verification into your own applications. RESTful API with comprehensive documentation.</p>
          <a href="/api-docs" className="btn btn-primary" style={{width: '100%', textDecoration: 'none', display: 'block', textAlign: 'center'}}>
            VIEW API DOCS
          </a>
        </div>

        <div className="feature-card">
          <h3 style={{fontSize: '24px', marginBottom: '16px'}}>⚡ Real-Time Monitor</h3>
          <p style={{marginBottom: '20px'}}>Monitor live games and verify results in real-time. Get instant notifications for suspicious patterns.</p>
          <button 
            onClick={() => setShowMonitorModal(true)} 
            className="btn btn-primary" 
            style={{width: '100%'}}
            data-testid="realtime-monitor-btn"
          >
            SETUP MONITOR
          </button>
        </div>
      </div>

      <div style={{marginTop: '60px', padding: '40px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '16px'}}>
        <h2 style={{fontSize: '28px', marginBottom: '20px'}}>Professional Features</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px'}}>
          <div>
            <h3 style={{color: 'var(--text-primary)', marginBottom: '10px'}}>⚡ AUTOMATED VERIFICATION</h3>
            <p style={{color: 'var(--text-secondary)'}}>Set up automated verification workflows for continuous monitoring of your gaming sessions.</p>
          </div>
          <div>
            <h3 style={{color: 'var(--text-primary)', marginBottom: '10px'}}>🔧 CUSTOM INTEGRATIONS</h3>
            <p style={{color: 'var(--text-secondary)'}}>Build custom integrations with our API. Perfect for streamers, communities, and power users.</p>
          </div>
          <div>
            <h3 style={{color: 'var(--text-primary)', marginBottom: '10px'}}>📈 ADVANCED ANALYTICS</h3>
            <p style={{color: 'var(--text-secondary)'}}>Deep analytics and statistical analysis tools for professional verification auditing.</p>
          </div>
        </div>
      </div>

      {/* Monitor Modal */}
      <MonitorModal isOpen={showMonitorModal} onClose={() => setShowMonitorModal(false)} />
    </div>
  );
}

export default Tools;
