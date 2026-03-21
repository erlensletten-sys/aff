import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import Statistics from './pages/Statistics';
import Verify from './pages/Verify';
import Dashboard from './pages/Dashboard';
import Promotions from './pages/Promotions';
import AdminPanel from './pages/AdminPanel';
import Tools from './pages/Tools';
import TrustedProviders from './pages/TrustedProviders';
import Offers from './pages/Offers';
import Guide from './pages/Guide';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    if (token) {
      checkAdminStatus(token);
    }
  }, []);

  const checkAdminStatus = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.is_admin);
      }
    } catch (err) {
      console.error('Failed to check admin status:', err);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    checkAdminStatus(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/stats" element={<Statistics />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/trusted-providers" element={<TrustedProviders />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/offers" element={<Offers />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/promotions" 
              element={
                <ProtectedRoute>
                  <Promotions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
