import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isAuthenticated, isAdmin, onLogout }) {
  const navigate = require('react-router-dom').useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" style={{
          fontWeight: '900',
          letterSpacing: '-1px',
          fontSize: '24px'
        }}>
          Rakestake
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/vip" className="nav-link" style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1))',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            borderRadius: '8px',
            color: '#ffd700',
            fontWeight: '600'
          }}>VIP CLUB</Link>
          <Link to="/verifiers" className="nav-link">VERIFIERS</Link>
          <Link to="/calculators" className="nav-link">CALCULATORS</Link>
          <Link to="/trusted-providers" className="nav-link">TRUSTED</Link>
          <Link to="/stats" className="nav-link">STATS</Link>
          {isAuthenticated ? (
            <>
              <Link to="/promotions" className="nav-link">PROMOTIONS</Link>
              <Link to="/dashboard" className="nav-link">DASHBOARD</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link" style={{color: 'var(--accent-warning)'}}>ADMIN</Link>
              )}
              <button onClick={handleLogout} className="btn btn-secondary" style={{padding: '10px 20px', fontSize: '13px'}}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">LOGIN</Link>
              <Link to="/register" className="btn btn-primary" style={{padding: '10px 20px', fontSize: '13px'}}>
                REGISTER
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
