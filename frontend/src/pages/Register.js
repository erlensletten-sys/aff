import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          full_name: formData.full_name,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Registration successful! Check your email (${formData.email}) to verify your account.`);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>REGISTER</h2>
      <p className="auth-subtitle">// CREATE NEW ACCOUNT</p>

      {error && <div className="error-message">⚠️ {error}</div>}
      {success && <div className="success-message">✓ {success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">$ USERNAME</label>
          <input
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
            data-testid="register-username"
          />
        </div>

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
            data-testid="register-email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">$ FULL_NAME</label>
          <input
            type="text"
            name="full_name"
            className="form-input"
            placeholder="Enter full name"
            value={formData.full_name}
            onChange={handleChange}
            required
            data-testid="register-fullname"
          />
        </div>

        <div className="form-group">
          <label className="form-label">$ PASSWORD</label>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter password (min 8 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            data-testid="register-password"
          />
        </div>

        <div className="form-group">
          <label className="form-label">$ CONFIRM_PASSWORD</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-input"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            data-testid="register-confirm-password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full" disabled={loading} data-testid="register-submit">
          {loading ? '[ PROCESSING<span className="loading">_</span> ]' : '[ REGISTER ]'}
        </button>
      </form>

      <div className="auth-link">
        // Already have an account? <Link to="/login">LOGIN HERE</Link>
      </div>
    </div>
  );
}

export default Register;
