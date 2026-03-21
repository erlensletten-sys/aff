import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('No verification token provided');
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Email verified successfully!');
      } else {
        setStatus('error');
        setMessage(data.detail || 'Verification failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>EMAIL VERIFICATION</h2>
      <p className="auth-subtitle">// ACCOUNT ACTIVATION</p>

      {status === 'verifying' && (
        <div className="status-display">
          <div className="status-icon">
            <span className="loading">[_]</span>
          </div>
          <p className="status-text">VERIFYING EMAIL<span className="loading">...</span></p>
          <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>// Please wait while we verify your email address</p>
        </div>
      )}

      {status === 'success' && (
        <div className="success-message">
          ✓ {message}
          <div className="mt-20 text-center">
            <Link to="/login" className="btn btn-primary">
              PROCEED TO LOGIN
            </Link>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="error-message">
          ⚠️ {message}
          <div className="mt-20 text-center">
            <Link to="/register" className="btn btn-secondary">
              BACK TO REGISTER
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
