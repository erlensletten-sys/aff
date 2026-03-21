import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function AdminPanel() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Promotions State
  const [promotions, setPromotions] = useState([]);
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [promoFormData, setPromoFormData] = useState({
    title: '',
    description: '',
    code: '',
    link: '',
    image_url: '',
    expires_at: ''
  });

  // Providers State
  const [providers, setProviders] = useState([]);
  const [showProviderForm, setShowProviderForm] = useState(false);
  const [providerFormData, setProviderFormData] = useState({
    name: '',
    slug: '',
    logo_url: '',
    supported_games: [],
    verification_code: ''
  });

  // Stats State
  const [stats, setStats] = useState(null);

  const games = ['LIMBO', 'DICE', 'BLACKJACK', 'KENO', 'MINES', 'PLINKO'];

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'promotions') fetchPromotions();
      if (activeTab === 'providers') fetchProviders();
      if (activeTab === 'overview') fetchStats();
    }
  }, [isAdmin, activeTab]);

  const checkAdminAccess = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/admin/check`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.is_admin);
        if (!data.is_admin) navigate('/dashboard');
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
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPromotions(data.promotions || []);
      }
    } catch (err) {
      console.error('Failed to fetch promotions:', err);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/providers`);
      if (response.ok) {
        const data = await response.json();
        setProviders(data.providers || []);
      }
    } catch (err) {
      console.error('Failed to fetch providers:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Promotion Handlers
  const handleCreatePromotion = async (e) => {
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
          ...promoFormData,
          expires_at: promoFormData.expires_at ? new Date(promoFormData.expires_at).toISOString() : null
        })
      });

      if (response.ok) {
        alert('Promotion created successfully!');
        setPromoFormData({ title: '', description: '', code: '', link: '', image_url: '', expires_at: '' });
        setShowPromoForm(false);
        fetchPromotions();
      } else {
        const data = await response.json();
        alert(data.detail || 'Failed to create promotion');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const handleDeletePromotion = async (title) => {
    if (!window.confirm('Are you sure you want to delete this promotion?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/promotions/${title}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
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

  // Provider Handlers
  const handleCreateProvider = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/providers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(providerFormData)
      });

      if (response.ok) {
        alert('Provider created successfully!');
        setProviderFormData({ name: '', slug: '', logo_url: '', supported_games: [], verification_code: '' });
        setShowProviderForm(false);
        fetchProviders();
      } else {
        const data = await response.json();
        alert(data.detail || 'Failed to create provider');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const handleDeleteProvider = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this provider?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/providers/${slug}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Provider deleted successfully!');
        fetchProviders();
      } else {
        alert('Failed to delete provider');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const toggleGame = (game) => {
    setProviderFormData(prev => ({
      ...prev,
      supported_games: prev.supported_games.includes(game)
        ? prev.supported_games.filter(g => g !== game)
        : [...prev.supported_games, game]
    }));
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="status-display">
          <div className="status-icon"><span className="loading">⚙️</span></div>
          <p className="status-text">CHECKING ACCESS...</p>
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
      <div style={{marginBottom: '40px'}}>
        <h1 style={{marginBottom: '5px', letterSpacing: '-1px', fontSize: '42px'}}>Admin Panel</h1>
        <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>Complete platform management</p>
      </div>

      {/* Tabs */}
      <div style={{display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px'}}>
        {[
          {id: 'overview', label: '📊 Overview', icon: '📊'},
          {id: 'promotions', label: '🎁 Promotions'},
          {id: 'providers', label: '🏢 Providers'},
          {id: 'settings', label: '⚙️ Settings'}
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="module-btn"
            style={{
              background: activeTab === tab.id ? 'var(--gradient-tech)' : 'rgba(99, 102, 241, 0.05)',
              borderColor: activeTab === tab.id ? 'transparent' : 'var(--border-color)',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <h2 style={{fontSize: '28px', marginBottom: '30px'}}>Platform Overview</h2>
          
          {stats && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.total_verifications || 0}</div>
                <div className="stat-label">TOTAL VERIFICATIONS</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.total_users || 0}</div>
                <div className="stat-label">REGISTERED USERS</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{promotions.length}</div>
                <div className="stat-label">ACTIVE PROMOTIONS</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{providers.length}</div>
                <div className="stat-label">ACTIVE PROVIDERS</div>
              </div>
            </div>
          )}

          <div style={{marginTop: '40px', padding: '30px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '16px'}}>
            <h3 style={{marginBottom: '20px', fontSize: '20px'}}>Quick Actions</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
              <button onClick={() => setActiveTab('promotions')} className="btn btn-primary" style={{width: '100%'}}>
                Add Promotion
              </button>
              <button onClick={() => setActiveTab('providers')} className="btn btn-primary" style={{width: '100%'}}>
                Add Provider
              </button>
              <button onClick={() => window.location.href='/stats'} className="btn btn-secondary" style={{width: '100%'}}>
                View Statistics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promotions Tab */}
      {activeTab === 'promotions' && (
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <h2 style={{fontSize: '28px'}}>Manage Promotions</h2>
            <button onClick={() => setShowPromoForm(!showPromoForm)} className="btn btn-primary">
              {showPromoForm ? 'CANCEL' : '+ NEW PROMOTION'}
            </button>
          </div>

          {showPromoForm && (
            <div className="auth-container" style={{maxWidth: '600px', marginBottom: '40px'}}>
              <h3 style={{fontSize: '24px', marginBottom: '30px', textAlign: 'left'}}>Create Promotion</h3>
              <form onSubmit={handleCreatePromotion}>
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input type="text" className="form-input" value={promoFormData.title} onChange={(e) => setPromoFormData({...promoFormData, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea className="textarea-input" style={{minHeight: '100px', fontFamily: 'inherit'}} value={promoFormData.description} onChange={(e) => setPromoFormData({...promoFormData, description: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Promo Code</label>
                  <input type="text" className="form-input" value={promoFormData.code} onChange={(e) => setPromoFormData({...promoFormData, code: e.target.value})} placeholder="e.g., WELCOME100" />
                </div>
                <div className="form-group">
                  <label className="form-label">Link URL</label>
                  <input type="url" className="form-input" value={promoFormData.link} onChange={(e) => setPromoFormData({...promoFormData, link: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input type="url" className="form-input" value={promoFormData.image_url} onChange={(e) => setPromoFormData({...promoFormData, image_url: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Expires At</label>
                  <input type="datetime-local" className="form-input" value={promoFormData.expires_at} onChange={(e) => setPromoFormData({...promoFormData, expires_at: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary btn-full">CREATE PROMOTION</button>
              </form>
            </div>
          )}

          <div className="features-grid">
            {promotions.length === 0 && (
              <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: '16px'}}>
                <p style={{color: 'var(--text-secondary)'}}>No promotions yet. Create your first one!</p>
              </div>
            )}
            {promotions.map((promo, index) => (
              <div key={index} className="feature-card">
                <h3 style={{marginBottom: '10px'}}>{promo.title}</h3>
                <p style={{marginBottom: '16px', fontSize: '14px'}}>{promo.description}</p>
                {promo.code && <p style={{marginBottom: '8px', fontSize: '14px'}}><strong>Code:</strong> <code style={{color: 'var(--accent-primary)'}}>{promo.code}</code></p>}
                {promo.link && <p style={{marginBottom: '8px', fontSize: '14px', wordBreak: 'break-all'}}><strong>Link:</strong> <a href={promo.link} target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-secondary)'}}>{promo.link}</a></p>}
                {promo.expires_at && <p style={{marginBottom: '16px', fontSize: '13px', color: 'var(--text-muted)'}}>Expires: {new Date(promo.expires_at).toLocaleDateString()}</p>}
                <button onClick={() => handleDeletePromotion(promo.title)} className="btn btn-secondary" style={{width: '100%', borderColor: 'var(--accent-danger)', color: 'var(--accent-danger)'}}>DELETE</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Providers Tab */}
      {activeTab === 'providers' && (
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <h2 style={{fontSize: '28px'}}>Manage Providers</h2>
            <button onClick={() => setShowProviderForm(!showProviderForm)} className="btn btn-primary">
              {showProviderForm ? 'CANCEL' : '+ NEW PROVIDER'}
            </button>
          </div>

          {showProviderForm && (
            <div className="auth-container" style={{maxWidth: '700px', marginBottom: '40px'}}>
              <h3 style={{fontSize: '24px', marginBottom: '30px', textAlign: 'left'}}>Create Provider</h3>
              <form onSubmit={handleCreateProvider}>
                <div className="form-group">
                  <label className="form-label">Provider Name *</label>
                  <input type="text" className="form-input" value={providerFormData.name} onChange={(e) => setProviderFormData({...providerFormData, name: e.target.value})} placeholder="e.g., Stake.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug * (URL-friendly, lowercase)</label>
                  <input type="text" className="form-input" value={providerFormData.slug} onChange={(e) => setProviderFormData({...providerFormData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} placeholder="e.g., stake" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Logo URL</label>
                  <input type="url" className="form-input" value={providerFormData.logo_url} onChange={(e) => setProviderFormData({...providerFormData, logo_url: e.target.value})} placeholder="https://..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Supported Games *</label>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px'}}>
                    {games.map(game => (
                      <button
                        key={game}
                        type="button"
                        onClick={() => toggleGame(game)}
                        className="module-btn"
                        style={{
                          background: providerFormData.supported_games.includes(game) ? 'var(--gradient-tech)' : 'rgba(99, 102, 241, 0.05)',
                          borderColor: providerFormData.supported_games.includes(game) ? 'transparent' : 'var(--border-color)'
                        }}
                      >
                        {game}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Verification Code (JavaScript)</label>
                  <textarea className="textarea-input" style={{minHeight: '150px', fontFamily: 'Monaco, monospace', fontSize: '13px'}} value={providerFormData.verification_code} onChange={(e) => setProviderFormData({...providerFormData, verification_code: e.target.value})} placeholder="// Paste the verification code here\nfunction verify(data) {\n  // Your verification logic\n}" />
                  <small style={{color: 'var(--text-muted)', fontSize: '12px', marginTop: '8px', display: 'block'}}>Leave empty if you'll add it later</small>
                </div>
                <button type="submit" className="btn btn-primary btn-full">CREATE PROVIDER</button>
              </form>
            </div>
          )}

          <div className="features-grid">
            {providers.length === 0 && (
              <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: '16px'}}>
                <p style={{color: 'var(--text-secondary)'}}>No providers yet. Create your first one!</p>
              </div>
            )}
            {providers.map((provider, index) => (
              <div key={index} className="feature-card">
                <h3 style={{marginBottom: '10px'}}>{provider.name}</h3>
                <p style={{marginBottom: '8px', fontSize: '14px'}}><strong>Slug:</strong> {provider.slug}</p>
                <p style={{marginBottom: '16px', fontSize: '14px'}}><strong>Games:</strong> {provider.supported_games.join(', ') || 'None'}</p>
                <p style={{marginBottom: '16px', fontSize: '13px', color: provider.verification_code ? 'var(--accent-success)' : 'var(--accent-warning)'}}>{provider.verification_code ? '✓ Code Uploaded' : '⚠️ No Code'}</p>
                <button onClick={() => handleDeleteProvider(provider.slug)} className="btn btn-secondary" style={{width: '100%', borderColor: 'var(--accent-danger)', color: 'var(--accent-danger)'}}>DELETE</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <h2 style={{fontSize: '28px', marginBottom: '30px'}}>Platform Settings</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3 style={{marginBottom: '12px'}}>📧 Email Provider</h3>
              <p style={{fontSize: '14px', marginBottom: '16px'}}>Current: {process.env.REACT_APP_EMAIL_PROVIDER || 'Resend'}</p>
              <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>Configure in backend .env file</p>
            </div>

            <div className="feature-card">
              <h3 style={{marginBottom: '12px'}}>🗄️ Database</h3>
              <p style={{fontSize: '14px', marginBottom: '16px'}}>MongoDB: notogreed</p>
              <p style={{fontSize: '13px', color: 'var(--accent-success)'}}>✓ Connected</p>
            </div>

            <div className="feature-card">
              <h3 style={{marginBottom: '12px'}}>👥 Admin Users</h3>
              <p style={{fontSize: '14px', marginBottom: '16px'}}>Manage in ADMIN_EMAILS</p>
              <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>Configure in backend .env file</p>
            </div>

            <div className="feature-card">
              <h3 style={{marginBottom: '12px'}}>🔐 Security</h3>
              <p style={{fontSize: '14px', marginBottom: '16px'}}>JWT Token: 24h expiry</p>
              <p style={{fontSize: '13px', color: 'var(--accent-success)'}}>✓ bcrypt encryption</p>
            </div>
          </div>

          <div style={{marginTop: '40px', padding: '30px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid var(--border-color)', borderRadius: '16px'}}>
            <h3 style={{marginBottom: '20px', fontSize: '20px'}}>Environment Configuration</h3>
            <p style={{color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.8'}}>
              To configure advanced settings, edit <code style={{color: 'var(--accent-primary)', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '4px'}}>/app/backend/.env</code>:
            </p>
            <ul style={{color: 'var(--text-secondary)', lineHeight: '2', marginLeft: '20px'}}>
              <li>EMAIL_PROVIDER - Choose between 'brevo' or 'resend'</li>
              <li>BREVO_API_KEY / RESEND_API_KEY - Email service credentials</li>
              <li>ADMIN_EMAILS - Comma-separated admin email addresses</li>
              <li>JWT_SECRET_KEY - Secret for token generation</li>
              <li>VERIFICATION_BASE_URL - Base URL for email links</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
