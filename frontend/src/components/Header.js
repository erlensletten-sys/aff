import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Crown, Home, Shield, Code, BarChart3, LogIn, UserPlus, LogOut, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

function Header({ isAuthenticated, isAdmin, onLogout }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 14, 39, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '12px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontWeight: '900',
          letterSpacing: '-1px',
          fontSize: '24px',
          color: '#ffffff',
          textDecoration: 'none'
        }}>
          Rakestake
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }} className="desktop-nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/vip" className="nav-link" style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1))',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            borderRadius: '8px',
            color: '#ffd700',
            fontWeight: '600'
          }}>VIP CLUB</Link>
          <Link to="/verifiers" className="nav-link">VERIFIERS</Link>
          <Link to="/slots-api" className="nav-link">SLOTS API</Link>
          <Link to="/stats" className="nav-link">STATS</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">DASHBOARD</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link" style={{color: 'var(--accent-warning)'}}>ADMIN</Link>
              )}
              <ThemeToggle />
              <button onClick={handleLogout} className="btn btn-secondary" style={{padding: '10px 20px', fontSize: '13px'}}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link to="/login" className="nav-link">LOGIN</Link>
              <Link to="/register" className="btn btn-primary" style={{padding: '10px 20px', fontSize: '13px'}}>
                REGISTER
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="mobile-nav">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '10px',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(10, 14, 39, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <Link to="/" onClick={closeMenu} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            color: '#ffffff',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            <Home size={20} />
            Home
          </Link>
          
          <Link to="/vip" onClick={closeMenu} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1))',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '12px',
            color: '#ffd700',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '15px'
          }}>
            <Crown size={20} />
            VIP Club
          </Link>
          
          <Link to="/verifiers" onClick={closeMenu} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            color: '#ffffff',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            <Shield size={20} />
            Verifiers
          </Link>
          
          <Link to="/slots-api" onClick={closeMenu} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            color: '#ffffff',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            <Code size={20} />
            Slots & Sportsbook API
          </Link>
          
          <Link to="/stats" onClick={closeMenu} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            color: '#ffffff',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            <BarChart3 size={20} />
            Stats
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px'
              }}>
                <Settings size={20} />
                Dashboard
              </Link>
              
              <button onClick={handleLogout} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                color: '#ef4444',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer',
                width: '100%'
              }}>
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }} />
              
              <Link to="/login" onClick={closeMenu} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px'
              }}>
                <LogIn size={20} />
                Login
              </Link>
              
              <Link to="/register" onClick={closeMenu} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '14px 16px',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                borderRadius: '12px',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '15px'
              }}>
                <UserPlus size={20} />
                Create Account
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        .desktop-nav {
          display: flex !important;
        }
        .mobile-nav {
          display: none !important;
        }
        
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
