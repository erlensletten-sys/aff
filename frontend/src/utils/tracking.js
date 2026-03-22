// Affiliate tracking utility
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Generate or get session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('rakestake-session');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('rakestake-session', sessionId);
  }
  return sessionId;
};

// Track affiliate click
export const trackAffiliateClick = async (casinoSlug, casinoName) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    await fetch(`${API_URL}/api/tracking/click`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        casino_slug: casinoSlug,
        casino_name: casinoName,
        session_id: getSessionId(),
        referrer: document.referrer || null
      })
    });
    
    console.log(`Tracked click: ${casinoSlug}`);
  } catch (error) {
    console.error('Failed to track click:', error);
    // Don't block the user if tracking fails
  }
};

// Open affiliate link with tracking
export const openAffiliateLink = (url, casinoSlug, casinoName) => {
  trackAffiliateClick(casinoSlug, casinoName);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default { trackAffiliateClick, openAffiliateLink };
