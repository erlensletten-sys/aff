import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Statistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats`);
      const data = await response.json();

      if (response.ok) {
        setStats(data);
      } else {
        setError('Failed to load statistics');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        <h1 style={{textAlign: 'center', marginBottom: '40px'}}>STATISTICS</h1>
        <div className="status-display">
          <div className="status-icon">
            <span className="loading">[_]</span>
          </div>
          <p className="status-text">LOADING STATISTICS<span className="loading">...</span></p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-container">
        <h1 style={{textAlign: 'center', marginBottom: '40px'}}>STATISTICS</h1>
        <div className="error-message text-center">⚠️ {error}</div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '3px'}}>STATISTICS</h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px', fontSize: '12px'}}>
        // PUBLIC VERIFICATION METRICS
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats?.total_verifications || 0}</div>
          <div className="stat-label">TOTAL VERIFICATIONS</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats?.success_rate || 0}%</div>
          <div className="stat-label">SUCCESS RATE</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats?.recent_activity_7days || 0}</div>
          <div className="stat-label">LAST 7 DAYS</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats?.total_users || 0}</div>
          <div className="stat-label">REGISTERED USERS</div>
        </div>
      </div>

      <h2 style={{marginTop: '60px', marginBottom: '20px', letterSpacing: '2px'}}>// VERIFICATIONS BY GAME TYPE</h2>
      
      {stats?.by_game_type && stats.by_game_type.length > 0 ? (
        <table className="stat-table">
          <thead>
            <tr>
              <th>GAME TYPE</th>
              <th>VERIFICATION COUNT</th>
            </tr>
          </thead>
          <tbody>
            {stats.by_game_type.map((item, index) => (
              <tr key={index}>
                <td>{item._id || 'Unknown'}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
          <p>// No verification data available yet</p>
          <p>// Start verifying to see statistics</p>
        </div>
      )}

      <div style={{marginTop: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px'}}>
        <p>// LAST UPDATED: {stats?.last_updated ? new Date(stats.last_updated).toLocaleString() : 'N/A'}</p>
      </div>
    </div>
  );
}

export default Statistics;
