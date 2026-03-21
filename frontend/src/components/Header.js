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
        <Link to="/" className="logo">
          NoToGreed
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/verify" className="nav-link">VERIFY</Link>
          <Link to="/calculators" className="nav-link">CALCULATORS</Link>
          <Link to="/tools" className="nav-link">TOOLS</Link>
          <Link to="/trusted-providers" className="nav-link">TRUSTED</Link>
          <Link to="/guide" className="nav-link">GUIDE</Link>
          <Link to="/offers" className="nav-link">OFFERS</Link>
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
