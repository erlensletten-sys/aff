import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function AdminPanel() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    link: '',
    image_url: '',
    expires_at: ''
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/admin/check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.is_admin);
        if (data.is_admin) {
          fetchPromotions();
        }
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchPromotions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/promotions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPromotions(data.promotions || []);
      }
    } catch (err) {
      console.error('Failed to fetch promotions:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/promotions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null
        })
      });

      if (response.ok) {
        alert('Promotion created successfully!');
        setFormData({
          title: '',
          description: '',
          code: '',
          link: '',
          image_url: '',
          expires_at: ''
        });
        setShowForm(false);
        fetchPromotions();
      } else {
        const data = await response.json();
        alert(data.detail || 'Failed to create promotion');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const handleDelete = async (promotionId) => {
    if (!window.confirm('Are you sure you want to delete this promotion?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/promotions/${promotionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Promotion deleted successfully!');
        fetchPromotions();
      } else {
        alert('Failed to delete promotion');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="status-display">
          <div className="status-icon">
            <span className="loading">[_]</span>
          </div>
          <p className="status-text">CHECKING ACCESS<span className="loading">...</span></p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="stats-container">
        <div className="error-message text-center">⚠️ Admin access required</div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
        <div>
          <h1 style={{marginBottom: '5px', letterSpacing: '-1px'}}>Admin Panel</h1>
          <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>Manage promotions and offers</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'CANCEL' : '+ NEW PROMOTION'}
        </button>
      </div>

      {showForm && (
        <div className="auth-container" style={{maxWidth: '600px', marginBottom: '40px'}}>
          <h2 style={{fontSize: '24px', marginBottom: '30px'}}>Create Promotion</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className="textarea-input"
                style={{minHeight: '100px', fontFamily: 'inherit'}}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Promo Code</label>
              <input
                type="text"
                className="form-input"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                placeholder="e.g., WELCOME100"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Link URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Expires At</label>
              <input
                type="datetime-local"
                className="form-input"
                value={formData.expires_at}
                onChange={(e) => setFormData({...formData, expires_at: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              CREATE PROMOTION
            </button>
          </form>
        </div>
      )}

      <h2 style={{marginBottom: '20px', fontSize: '24px'}}>Current Promotions</h2>
      
      {promotions.length === 0 ? (
        <div style={{textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: '16px'}}>
          <p style={{color: 'var(--text-secondary)'}}>No promotions yet. Create your first one!</p>
        </div>
      ) : (
        <div className="features-grid">
          {promotions.map((promo, index) => (
            <div key={index} className="feature-card">
              <h3 style={{marginBottom: '10px'}}>{promo.title}</h3>
              <p style={{marginBottom: '16px', fontSize: '14px'}}>{promo.description}</p>
              
              {promo.code && (
                <p style={{marginBottom: '8px', fontSize: '14px'}}>
                  <strong>Code:</strong> <code style={{color: 'var(--accent-primary)'}}>{promo.code}</code>
                </p>
              )}
              
              {promo.link && (
                <p style={{marginBottom: '8px', fontSize: '14px', wordBreak: 'break-all'}}>
                  <strong>Link:</strong> <a href={promo.link} target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-secondary)'}}>{promo.link}</a>
                </p>
              )}
              
              {promo.expires_at && (
                <p style={{marginBottom: '16px', fontSize: '13px', color: 'var(--text-muted)'}}>
                  Expires: {new Date(promo.expires_at).toLocaleDateString()}
                </p>
              )}
              
              <button
                onClick={() => handleDelete(promo.title)}
                className="btn btn-secondary"
                style={{width: '100%', borderColor: 'var(--accent-danger)', color: 'var(--accent-danger)'}}
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
