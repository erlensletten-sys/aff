import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isAuthenticated, isAdmin, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo glow-pulse">
          NOTOGREED
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/verify" className="nav-link">VERIFY</Link>
          <Link to="/tools" className="nav-link">TOOLS</Link>
          <Link to="/trusted-providers" className="nav-link">PROVIDERS</Link>
          <Link to="/offers" className="nav-link">OFFERS</Link>
          <Link to="/stats" className="nav-link">STATS</Link>
          {isAuthenticated ? (
            <>
              <Link to="/promotions" className="nav-link">PROMOTIONS</Link>
              <Link to="/dashboard" className="nav-link">DASHBOARD</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link" style={{color: 'var(--accent-warning)', textShadow: '0 0 5px #ffff00'}}>ADMIN</Link>
              )}
              <button onClick={handleLogout} className="btn btn-secondary" style={{padding: '8px 16px', fontSize: '12px'}}>
                &gt; LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">LOGIN</Link>
              <Link to="/register" className="btn btn-primary" style={{padding: '8px 16px', fontSize: '12px'}}>
                &gt; REGISTER
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
