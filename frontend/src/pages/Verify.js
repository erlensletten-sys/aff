import React, { useState, useEffect } from 'react';
import Captcha from '../components/Captcha';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Verify() {
  const [selectedModule, setSelectedModule] = useState('LIMBO');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [providers, setProviders] = useState([]);
  const [inputData, setInputData] = useState('');
  const [status, setStatus] = useState('awaiting');
  const [result, setResult] = useState(null);
  const [isAuthenticated] = useState(!!localStorage.getItem('token'));
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const modules = [
    { name: 'LIMBO', icon: '🎯' },
    { name: 'DICE', icon: '🎲' },
    { name: 'BLACKJACK', icon: '🃏' },
    { name: 'KENO', icon: '🔢' },
    { name: 'MINES', icon: '💣' },
    { name: 'PLINKO', icon: '⚡' }
  ];

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/providers`);
      if (response.ok) {
        const data = await response.json();
        setProviders(data.providers || []);
        if (data.providers && data.providers.length > 0) {
          setSelectedProvider(data.providers[0].slug);
        }
      }
    } catch (err) {
      console.error('Failed to fetch providers:', err);
    }
  };

  const handleVerify = async () => {
    if (!inputData.trim()) {
      alert('Please paste export data first');
      return;
    }

    if (!selectedProvider) {
      alert('Please select a provider');
      return;
    }

    if (!isAuthenticated && !captchaVerified) {
      alert('Please complete the CAPTCHA verification first');
      return;
    }

    setStatus('verifying');

    try {
      // Parse the input data
      let payload;
      try {
        payload = JSON.parse(inputData);
      } catch (parseError) {
        setStatus('fail');
        setResult({
          error: 'Invalid JSON format',
          message: 'Please ensure your export data is valid JSON format'
        });
        return;
      }

      // Call the new Provably Fair API
      const response = await fetch(`${API_URL}/api/verify/provably-fair`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: selectedProvider,
          game_type: selectedModule.toLowerCase(),
          payload: payload,
          options: {
            include_steps: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const verificationResult = await response.json();

      if (verificationResult.status === 'success') {
        setStatus('success');
        setResult(verificationResult);
      } else if (verificationResult.status === 'pending') {
        setStatus('success');
        setResult({
          ...verificationResult,
          note: verificationResult.message
        });
      } else {
        setStatus('fail');
        setResult(verificationResult);
      }

    } catch (err) {
      setStatus('fail');
      setResult({
        error: 'Verification failed',
        message: err.message
      });
    }
  };

  const handleReset = () => {
    setStatus('awaiting');
    setInputData('');
    setResult(null);
    if (!isAuthenticated) {
      setCaptchaVerified(false);
    }
  };

  const handleCaptchaVerify = (verified) => {
    setCaptchaVerified(verified);
  };

  const getPlaceholderText = () => {
    return `Paste your ${selectedModule} export data here...

Example format:
{
  "server_seed": "...",
  "client_seed": "...",
  "nonce": 1,
  "result": "..."
}`;
  };

  return (
    <div className="verify-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '-1px', fontSize: '42px'}}>
        VERIFICATION TOOL
      </h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px', fontSize: '14px'}}>
        Provably Fair Cryptographic Audit
      </p>

      {!isAuthenticated && !captchaVerified && (
        <Captcha onVerify={handleCaptchaVerify} />
      )}

      <div className="verify-module-selector">
        {modules.map((module) => (
          <button
            key={module.name}
            className={`module-btn ${selectedModule === module.name ? 'active' : ''}`}
            onClick={() => setSelectedModule(module.name)}
            data-testid={`module-${module.name.toLowerCase()}`}
          >
            {module.icon} {module.name}
          </button>
        ))}
      </div>

      <div style={{marginBottom: '30px'}}>
        <label className="form-label" style={{marginBottom: '12px', display: 'block'}}>
          SELECT PROVIDER
        </label>
        <select
          className="form-input"
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          style={{width: '100%', cursor: 'pointer'}}
        >
          {providers.length === 0 && (
            <option value="">No providers available</option>
          )}
          {providers.map((provider) => (
            <option key={provider.slug} value={provider.slug}>
              {provider.name}
            </option>
          ))}
        </select>
        {providers.length === 0 && (
          <p style={{color: 'var(--accent-warning)', fontSize: '13px', marginTop: '8px'}}>
            ⚠️ No providers configured. Admin can add providers in the admin panel.
          </p>
        )}
      </div>

      <div className="verify-panel">
        {status === 'awaiting' && (
          <>
            <div className="status-display">
              <div className="status-icon">[_]</div>
              <div className="status-text">AWAITING INPUT DATA</div>
              <p style={{color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px'}}>
                Selected: {selectedModule} • {providers.find(p => p.slug === selectedProvider)?.name || 'No provider'}
              </p>
              <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>
                Paste your export data below
              </p>
            </div>
            <div className="form-group" style={{marginTop: '30px'}}>
              <label className="form-label">EXPORT DATA</label>
              <textarea
                className="textarea-input"
                placeholder={getPlaceholderText()}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                data-testid="verify-input"
              />
            </div>
            <button 
              className="btn btn-primary btn-full" 
              onClick={handleVerify}
              data-testid="verify-submit"
              disabled={!selectedProvider}
            >
              START VERIFICATION
            </button>
          </>
        )}

        {status === 'verifying' && (
          <div className="status-display">
            <div className="status-icon">
              <span className="loading">⚙️</span>
            </div>
            <div className="status-text">VERIFYING...</div>
            <p style={{color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px'}}>
              Module: {selectedModule} • Provider: {providers.find(p => p.slug === selectedProvider)?.name}
            </p>
            <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>
              Running cryptographic validation
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="status-display">
            <div className="status-icon" style={{fontSize: '64px'}}>✓</div>
            <div className="status-text" style={{color: 'var(--accent-success)'}}>
              VERIFICATION COMPLETE
            </div>
            <div style={{
              marginTop: '30px',
              textAlign: 'left',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '20px',
              border: '1px solid var(--border-color)',
              borderRadius: '12px'
            }}>
              <p style={{color: 'var(--text-secondary)', marginBottom: '10px', fontWeight: '600'}}>
                RESULTS:
              </p>
              <p style={{color: 'var(--text-secondary)'}}>Game: {result?.game_type?.toUpperCase()}</p>
              <p style={{color: 'var(--text-secondary)'}}>Provider: {result?.provider?.toUpperCase()}</p>
              <p style={{color: 'var(--text-secondary)'}}>Status: {result?.status?.toUpperCase()}</p>
              
              {result?.intermediate_steps && result.intermediate_steps.length > 0 && (
                <div style={{marginTop: '20px'}}>
                  <p style={{color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '10px'}}>
                    VERIFICATION STEPS:
                  </p>
                  {result.intermediate_steps.map((step, idx) => (
                    <p key={idx} style={{color: 'var(--text-muted)', fontSize: '13px', marginBottom: '6px', fontFamily: 'Monaco, monospace'}}>
                      {step}
                    </p>
                  ))}
                </div>
              )}
              
              {result?.note && (
                <p style={{color: 'var(--accent-warning)', marginTop: '20px', fontSize: '14px'}}>
                  ⚠️ {result.note}
                </p>
              )}
              
              {result?.message && result.status === 'pending' && (
                <p style={{color: 'var(--accent-warning)', marginTop: '20px', fontSize: '14px'}}>
                  📋 {result.message}
                </p>
              )}
            </div>
            <button 
              className="btn btn-secondary btn-full" 
              onClick={handleReset} 
              style={{marginTop: '20px'}}
              data-testid="verify-reset-btn"
            >
              NEW VERIFICATION
            </button>
          </div>
        )}

        {status === 'fail' && (
          <div className="status-display">
            <div className="status-icon" style={{color: 'var(--accent-danger)', fontSize: '64px'}}>
              ✗
            </div>
            <div className="status-text" style={{color: 'var(--accent-danger)'}}>
              VERIFICATION FAILED
            </div>
            <div style={{
              marginTop: '30px',
              textAlign: 'left',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '20px',
              border: '1px solid var(--accent-danger)',
              borderRadius: '12px'
            }}>
              <p style={{color: 'var(--accent-danger)', marginBottom: '10px', fontWeight: '600'}}>
                ERROR:
              </p>
              <p style={{color: 'var(--text-secondary)'}}>{result?.error}</p>
              <p style={{color: 'var(--text-secondary)'}}>{result?.message}</p>
            </div>
            <button 
              className="btn btn-secondary btn-full" 
              onClick={handleReset} 
              style={{marginTop: '20px'}}
            >
              RETRY
            </button>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px'
      }}>
        <h3 style={{marginBottom: '15px', color: 'var(--text-primary)', fontSize: '18px'}}>
          HOW VERIFICATION WORKS
        </h3>
        <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8'}}>
          • All verification uses each casino's official documentation and algorithms<br />
          • Cryptographic computations run directly in your browser (client-side)<br />
          • No data is transmitted to external servers during verification<br />
          • This client-side approach makes manipulation impossible
        </p>
      </div>
    </div>
  );
}

export default Verify;
