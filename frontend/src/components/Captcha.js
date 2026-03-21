import React, { useState, useEffect } from 'react';

function Captcha({ onVerify }) {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserInput('');
    setError('');
  };

  const handleVerify = () => {
    if (userInput.toUpperCase() === captchaCode) {
      onVerify(true);
      setError('');
    } else {
      setError('INCORRECT CAPTCHA CODE');
      generateCaptcha();
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="captcha-container">
      <div style={{textAlign: 'center'}}>
        <p style={{color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '14px', letterSpacing: '1px'}}>
          &gt; GUEST VERIFICATION REQUIRED
        </p>
        <p style={{color: 'var(--text-muted)', marginBottom: '20px', fontSize: '13px'}}>
          Enter the code below to verify you're human
        </p>
        
        <div style={{
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '20px',
          marginBottom: '20px',
          border: '2px solid var(--border-color)',
          position: 'relative'
        }}>
          <div className="captcha-code glow-pulse">
            {captchaCode}
          </div>
          <button
            onClick={generateCaptcha}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: '1px solid var(--text-muted)',
              color: 'var(--text-secondary)',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'Courier New, monospace'
            }}
          >
            ↻
          </button>
        </div>
        
        <input
          type="text"
          className="form-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          placeholder="ENTER CODE"
          maxLength={6}
          style={{textAlign: 'center', letterSpacing: '4px', fontSize: '18px', marginBottom: '16px'}}
          onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
        />
        
        {error && (
          <div style={{
            color: 'var(--accent-danger)',
            marginBottom: '16px',
            fontSize: '14px',
            padding: '10px',
            border: '1px solid var(--accent-danger)',
            background: 'rgba(255, 0, 0, 0.1)'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        <button onClick={handleVerify} className="btn btn-primary" style={{width: '100%'}}>
          &gt; VERIFY
        </button>
      </div>
    </div>
  );
}

export default Captcha;
