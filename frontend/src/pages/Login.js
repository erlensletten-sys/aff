import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        onLogin(data.access_token);
        navigate('/dashboard');
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>LOGIN</h2>
      <p className="auth-subtitle">// ACCESS YOUR ACCOUNT</p>

      {error && <div className="error-message">⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">$ EMAIL</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
            data-testid="login-email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">$ PASSWORD</label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            data-testid="login-password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full" disabled={loading} data-testid="login-submit">
          {loading ? '[ AUTHENTICATING<span className="loading">_</span> ]' : '[ LOGIN ]'}
        </button>
      </form>

      <div className="auth-link">
        // Don't have an account? <Link to="/register">REGISTER HERE</Link>
      </div>
    </div>
  );
}

export default Login;
