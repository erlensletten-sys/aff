import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          GAMBLE_VERIFY
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/verify" className="nav-link">VERIFY</Link>
          <Link to="/stats" className="nav-link">STATISTICS</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">DASHBOARD</Link>
              <button onClick={handleLogout} className="btn btn-secondary" style={{padding: '8px 16px', fontSize: '12px'}}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">LOGIN</Link>
              <Link to="/register" className="btn btn-primary" style={{padding: '8px 16px', fontSize: '12px'}}>
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
