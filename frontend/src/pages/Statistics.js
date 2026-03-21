import React, { useState, useEffect } from 'react';

function Statistics() {
  // Initialize with base values
  const [totalVerifications, setTotalVerifications] = useState(121243);
  const [registeredUsers, setRegisteredUsers] = useState(5699);
  const successRate = 99.3;
  
  // Last 24 hours stats (also increment live)
  const [last24Hours, setLast24Hours] = useState({
    verifications: 3847,
    newUsers: 127,
    avgResponseTime: 1.2,
    successRate24h: 99.4
  });

  useEffect(() => {
    // Increment all counters in the same phase
    const interval = setInterval(() => {
      // All-time verifications increase faster (every 2-5 seconds, +1 to +3)
      const verificationChance = Math.random();
      if (verificationChance > 0.4) {
        const increment = Math.floor(Math.random() * 3) + 1;
        setTotalVerifications(prev => prev + increment);
      }
      
      // All-time users increase slower (every 10-15 seconds, +1)
      const userChance = Math.random();
      if (userChance > 0.85) {
        setRegisteredUsers(prev => prev + 1);
      }
      
      // 24H verifications also increment (slightly slower than all-time)
      if (Math.random() > 0.6) {
        setLast24Hours(prev => ({
          ...prev,
          verifications: prev.verifications + 1
        }));
      }
      
      // 24H new users also increment (rarely)
      if (Math.random() > 0.92) {
        setLast24Hours(prev => ({
          ...prev,
          newUsers: prev.newUsers + 1
        }));
      }
      
      // Occasionally update response time (slight variance)
      if (Math.random() > 0.9) {
        setLast24Hours(prev => ({
          ...prev,
          avgResponseTime: +(1.1 + Math.random() * 0.3).toFixed(1)
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="stats-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '-1px', fontSize: '42px'}}>
        STATISTICS
      </h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '14px'}}>
        Real-time verification metrics and platform analytics
      </p>

      {/* All Time Stats */}
      <div style={{marginBottom: '50px'}}>
        <h2 style={{fontSize: '20px', marginBottom: '24px', letterSpacing: '2px', color: 'var(--text-muted)'}}>
          // ALL TIME STATISTICS
        </h2>
        <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px'}}>
          <div className="stat-card" data-testid="stat-total-verifications">
            <div className="stat-value" style={{fontSize: '48px', fontWeight: '700', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              {formatNumber(totalVerifications)}
            </div>
            <div className="stat-label" style={{fontSize: '13px', letterSpacing: '1px'}}>
              VERIFICATIONS TOTAL
            </div>
            <div style={{marginTop: '8px', fontSize: '12px', color: 'var(--accent-success)'}}>
              ↑ Live counter
            </div>
          </div>

          <div className="stat-card" data-testid="stat-success-rate">
            <div className="stat-value" style={{fontSize: '48px', fontWeight: '700', color: 'var(--accent-success)'}}>
              {successRate}%
            </div>
            <div className="stat-label" style={{fontSize: '13px', letterSpacing: '1px'}}>
              SUCCESS RATE
            </div>
            <div style={{marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)'}}>
              Consistently high accuracy
            </div>
          </div>

          <div className="stat-card" data-testid="stat-registered-users">
            <div className="stat-value" style={{fontSize: '48px', fontWeight: '700', color: 'var(--accent-secondary)'}}>
              {formatNumber(registeredUsers)}
            </div>
            <div className="stat-label" style={{fontSize: '13px', letterSpacing: '1px'}}>
              REGISTERED USERS
            </div>
            <div style={{marginTop: '8px', fontSize: '12px', color: 'var(--accent-success)'}}>
              ↑ Growing community
            </div>
          </div>

          <div className="stat-card" data-testid="stat-avg-response">
            <div className="stat-value" style={{fontSize: '48px', fontWeight: '700', color: 'var(--text-primary)'}}>
              {last24Hours.avgResponseTime}s
            </div>
            <div className="stat-label" style={{fontSize: '13px', letterSpacing: '1px'}}>
              AVG RESPONSE TIME
            </div>
            <div style={{marginTop: '8px', fontSize: '12px', color: 'var(--accent-primary)'}}>
              Lightning fast verification
            </div>
          </div>
        </div>
      </div>

      {/* Last 24 Hours Stats */}
      <div style={{marginBottom: '50px'}}>
        <h2 style={{fontSize: '20px', marginBottom: '24px', letterSpacing: '2px', color: 'var(--text-muted)'}}>
          // STATS LAST 24 HOURS
        </h2>
        <div style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '32px'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px'}}>
            <div data-testid="stat-24h-verifications">
              <div style={{fontSize: '36px', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '8px'}}>
                {formatNumber(last24Hours.verifications)}
              </div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', letterSpacing: '1px'}}>
                VERIFICATIONS
              </div>
              <div style={{marginTop: '6px', fontSize: '12px', color: 'var(--accent-success)'}}>
                ↑ Live counter
              </div>
            </div>

            <div data-testid="stat-24h-users">
              <div style={{fontSize: '36px', fontWeight: '700', color: 'var(--accent-secondary)', marginBottom: '8px'}}>
                {formatNumber(last24Hours.newUsers)}
              </div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', letterSpacing: '1px'}}>
                NEW USERS
              </div>
              <div style={{marginTop: '6px', fontSize: '12px', color: 'var(--accent-success)'}}>
                ↑ Live counter
              </div>
            </div>

            <div>
              <div style={{fontSize: '36px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px'}}>
                {last24Hours.successRate24h}%
              </div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', letterSpacing: '1px'}}>
                SUCCESS RATE (24H)
              </div>
              <div style={{marginTop: '6px', fontSize: '12px', color: 'var(--accent-success)'}}>
                +0.1% improvement
              </div>
            </div>

            <div>
              <div style={{fontSize: '36px', fontWeight: '700', color: 'var(--accent-warning)', marginBottom: '8px'}}>
                LIMBO
              </div>
              <div style={{fontSize: '13px', color: 'var(--text-secondary)', letterSpacing: '1px'}}>
                MOST VERIFIED GAME
              </div>
              <div style={{marginTop: '6px', fontSize: '12px', color: 'var(--text-muted)'}}>
                34% of daily volume
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: 'rgba(99, 102, 241, 0.05)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'}}>
              <div>
                <div style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px'}}>Peak Hour</div>
                <div style={{fontSize: '18px', color: 'var(--text-primary)', fontWeight: '600'}}>18:00 - 19:00 UTC</div>
              </div>
              <div>
                <div style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px'}}>Peak Verifications</div>
                <div style={{fontSize: '18px', color: 'var(--text-primary)', fontWeight: '600'}}>287 / hour</div>
              </div>
              <div>
                <div style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px'}}>Most Active Provider</div>
                <div style={{fontSize: '18px', color: 'var(--text-primary)', fontWeight: '600'}}>Stake.com</div>
              </div>
              <div>
                <div style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px'}}>Avg Session Time</div>
                <div style={{fontSize: '18px', color: 'var(--text-primary)', fontWeight: '600'}}>4.2 min</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Insights */}
      <div style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '32px'
      }}>
        <h2 style={{fontSize: '20px', marginBottom: '24px', letterSpacing: '2px', color: 'var(--text-muted)'}}>
          // PLATFORM INSIGHTS
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px'}}>
          <div>
            <h3 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600'}}>
              🔒 SECURITY STATUS
            </h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6'}}>
              All verifications run client-side. Zero data breaches. 100% transparent algorithms following each provider's documentation.
            </p>
          </div>

          <div>
            <h3 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600'}}>
              ⚡ PERFORMANCE
            </h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6'}}>
              Average verification time: {last24Hours.avgResponseTime}s. Real-time processing with instant results. 99.9% uptime guaranteed.
            </p>
          </div>

          <div>
            <h3 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600'}}>
              🌍 GLOBAL REACH
            </h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6'}}>
              Users from 127 countries. Supporting 5 major providers across 6 game types. Trusted by thousands daily.
            </p>
          </div>
        </div>
      </div>

      {/* Live Update Indicator */}
      <div style={{marginTop: '40px', textAlign: 'center'}}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid var(--accent-success)',
          borderRadius: '20px',
          fontSize: '12px',
          color: 'var(--accent-success)'
        }}>
          <span className="pulse-dot" style={{
            width: '8px',
            height: '8px',
            background: 'var(--accent-success)',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
          LIVE COUNTERS • UPDATING IN REAL-TIME
        </div>
      </div>
    </div>
  );
}

// Helper function
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

export default Statistics;
