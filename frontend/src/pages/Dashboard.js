import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (err) {
      setError('Failed to load user information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="status-display">
          <div className="status-icon">
            <span className="loading">[_]</span>
          </div>
          <p className="status-text">LOADING<span className="loading">...</span></p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-container">
        <div className="error-message text-center">⚠️ {error}</div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '3px'}}>DASHBOARD</h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px', fontSize: '12px'}}>
        // USER CONTROL PANEL
      </p>

      <div className="stats-grid">
        <div className="stat-card" style={{textAlign: 'left', gridColumn: 'span 2'}}>
          <h3 style={{marginBottom: '20px', color: 'var(--text-primary)'}}>// ACCOUNT INFORMATION</h3>
          <div style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '2'}}>
            <p><strong style={{color: 'var(--text-primary)'}}>Username:</strong> {user?.username}</p>
            <p><strong style={{color: 'var(--text-primary)'}}>Email:</strong> {user?.email}</p>
            <p><strong style={{color: 'var(--text-primary)'}}>Full Name:</strong> {user?.full_name}</p>
            <p><strong style={{color: 'var(--text-primary)'}}>Email Verified:</strong> {user?.is_email_verified ? '✓ Yes' : '✗ No'}</p>
            <p><strong style={{color: 'var(--text-primary)'}}>Member Since:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div style={{marginTop: '40px', padding: '30px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)'}}>
        <h3 style={{marginBottom: '20px', color: 'var(--text-primary)'}}>// QUICK ACTIONS</h3>
        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <button className="btn btn-primary" onClick={() => navigate('/verify')}>
            START VERIFICATION
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/stats')}>
            VIEW STATISTICS
          </button>
        </div>
      </div>

      <div style={{marginTop: '40px', padding: '20px', backgroundColor: 'rgba(0, 255, 0, 0.05)', border: '1px solid var(--border-color)'}}>
        <h3 style={{marginBottom: '15px', color: 'var(--text-primary)'}}>// FEATURES COMING SOON</h3>
        <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8'}}>
          • Personal verification history<br />
          • Custom verification templates<br />
          • API access for automated verification<br />
          • Advanced analytics and reporting
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
