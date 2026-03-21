import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Promotions() {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/promotions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPromotions(data.promotions || []);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to load promotions');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="stats-container">
        <h1 style={{textAlign: 'center', marginBottom: '40px'}}>PROMOTIONS</h1>
        <div className="status-display">
          <div className="status-icon">
            <span className="loading">[_]</span>
          </div>
          <p className="status-text">LOADING PROMOTIONS<span className="loading">...</span></p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-container">
        <h1 style={{textAlign: 'center', marginBottom: '40px'}}>PROMOTIONS</h1>
        <div className="error-message text-center">⚠️ {error}</div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '-1px', fontSize: '42px'}}>Exclusive Promotions</h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '16px'}}>
        Special offers and codes for verified members
      </p>

      {promotions.length === 0 ? (
        <div style={{textAlign: 'center', padding: '80px 20px'}}>
          <div style={{fontSize: '64px', marginBottom: '20px', opacity: 0.3}}>🎁</div>
          <p style={{color: 'var(--text-secondary)', fontSize: '18px'}}>No active promotions at the moment</p>
          <p style={{color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px'}}>Check back later for exclusive offers!</p>
        </div>
      ) : (
        <div className="features-grid">
          {promotions.map((promo, index) => (
            <div key={index} className="feature-card" style={{position: 'relative'}}>
              {promo.image_url && (
                <img 
                  src={promo.image_url} 
                  alt={promo.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '20px'
                  }}
                />
              )}
              <h3 style={{marginBottom: '12px', fontSize: '22px'}}>{promo.title}</h3>
              <p style={{marginBottom: '20px', lineHeight: '1.7'}}>{promo.description}</p>
              
              {promo.code && (
                <div style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--accent-primary)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <p style={{color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Promo Code</p>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <code style={{
                      fontFamily: 'Monaco, monospace',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: 'var(--accent-primary)',
                      flex: 1
                    }}>{promo.code}</code>
                    <button 
                      onClick={() => copyToClipboard(promo.code)}
                      className="btn btn-secondary"
                      style={{padding: '8px 16px', fontSize: '13px'}}
                    >
                      COPY
                    </button>
                  </div>
                </div>
              )}
              
              {promo.link && (
                <a 
                  href={promo.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{width: '100%', textAlign: 'center', display: 'block'}}
                >
                  CLAIM OFFER
                </a>
              )}
              
              {promo.expires_at && (
                <p style={{
                  marginTop: '16px',
                  fontSize: '13px',
                  color: 'var(--accent-warning)',
                  textAlign: 'center'
                }}>
                  ⏰ Expires: {new Date(promo.expires_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Promotions;
