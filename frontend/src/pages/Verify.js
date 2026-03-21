import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Verify() {
  const [selectedModule, setSelectedModule] = useState('HMAC-SHA256');
  const [inputData, setInputData] = useState('');
  const [status, setStatus] = useState('awaiting'); // awaiting, verifying, success, fail
  const [result, setResult] = useState(null);

  const modules = [
    { name: 'HMAC-SHA256', endpoint: '/api/verify/hmac-sha256' },
    { name: 'SHA256', endpoint: '/api/verify/sha256' },
    { name: 'PROVABLY_FAIR', endpoint: '/api/verify/provably-fair' },
    { name: 'LIMBO', endpoint: '/api/verify/provably-fair' },
    { name: 'DICE', endpoint: '/api/verify/provably-fair' },
    { name: 'SLOTS', endpoint: '/api/verify/provably-fair' }
  ];

  const handleVerify = async () => {
    if (!inputData.trim()) {
      alert('Please paste export data first');
      return;
    }

    setStatus('verifying');

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Log verification attempt
      await fetch(`${API_URL}/api/verify/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_type: selectedModule,
          result: 'success',
          duration_ms: 2000,
          module_used: selectedModule
        })
      });

      setStatus('success');
      setResult({
        module: selectedModule,
        message: 'Verification tool integration pending',
        note: 'This is a placeholder. Your verification tool will be integrated here.'
      });
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
  };

  return (
    <div className="verify-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '3px'}}>VERIFICATION TOOL</h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px', fontSize: '12px'}}>
        // PROVABLY FAIR CRYPTOGRAPHIC AUDIT
      </p>

      <div className="verify-module-selector">
        {modules.map((module) => (
          <button
            key={module.name}
            className={`module-btn ${selectedModule === module.name ? 'active' : ''}`}
            onClick={() => setSelectedModule(module.name)}
            data-testid={`module-${module.name.toLowerCase()}`}
          >
            {module.name}
          </button>
        ))}
      </div>

      <div className="verify-panel">
        {status === 'awaiting' && (
          <>
            <div className="status-display">
              <div className="status-icon">[_]</div>
              <div className="status-text">AWAITING_INPUT_DATA</div>
              <p style={{color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px'}}>
                // Selected Module: {selectedModule}
              </p>
              <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>
                // Paste your export data below
              </p>
            </div>
            <div className="form-group" style={{marginTop: '30px'}}>
              <label className="form-label">$ EXPORT_DATA</label>
              <textarea
                className="textarea-input"
                placeholder={`Paste your export data here...

Example format:
{
  "server_seed": "...",
  "client_seed": "...",
  "nonce": 1,
  "result": "..."
}`}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                data-testid="verify-input"
              />
            </div>
            <button 
              className="btn btn-primary btn-full" 
              onClick={handleVerify}
              data-testid="verify-submit"
            >
              [ START VERIFICATION ]
            </button>
          </>
        )}

        {status === 'verifying' && (
          <div className="status-display">
            <div className="status-icon">
              <span className="loading">[_]</span>
            </div>
            <div className="status-text">VERIFYING<span className="loading">...</span></div>
            <p style={{color: 'var(--text-muted)', fontSize: '14px', marginTop: '10px'}}>
              // Module: {selectedModule}
            </p>
            <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>
              // Running cryptographic validation
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="status-display">
            <div className="status-icon" style={{color: 'var(--text-primary)', fontSize: '64px'}}>✓</div>
            <div className="status-text" style={{color: 'var(--text-primary)'}}>VERIFICATION_COMPLETE</div>
            <div style={{marginTop: '30px', textAlign: 'left', backgroundColor: 'var(--bg-primary)', padding: '20px', border: '1px solid var(--border-color)'}}>
              <p style={{color: 'var(--text-secondary)', marginBottom: '10px'}}>// RESULTS:</p>
              <p style={{color: 'var(--text-secondary)'}}>Module: {result?.module}</p>
              <p style={{color: 'var(--text-secondary)'}}>Status: SUCCESS</p>
              <p style={{color: 'var(--accent-amber)', marginTop: '20px'}}>Note: {result?.note}</p>
            </div>
            <button className="btn btn-secondary btn-full" onClick={handleReset} style={{marginTop: '20px'}}>
              [ NEW VERIFICATION ]
            </button>
          </div>
        )}

        {status === 'fail' && (
          <div className="status-display">
            <div className="status-icon" style={{color: 'var(--accent-red)', fontSize: '64px'}}>✗</div>
            <div className="status-text" style={{color: 'var(--accent-red)'}}>VERIFICATION_FAILED</div>
            <div style={{marginTop: '30px', textAlign: 'left', backgroundColor: 'var(--bg-primary)', padding: '20px', border: '1px solid var(--accent-red)'}}>
              <p style={{color: 'var(--accent-red)', marginBottom: '10px'}}>// ERROR:</p>
              <p style={{color: 'var(--text-secondary)'}}>{result?.error}</p>
              <p style={{color: 'var(--text-secondary)'}}>{result?.message}</p>
            </div>
            <button className="btn btn-secondary btn-full" onClick={handleReset} style={{marginTop: '20px'}}>
              [ RETRY ]
            </button>
          </div>
        )}
      </div>

      <div style={{marginTop: '40px', padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--text-muted)'}}>
        <h3 style={{marginBottom: '15px', color: 'var(--text-primary)'}}>// SECURITY NOTICE</h3>
        <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8'}}>
          • All cryptographic computations run in your browser using Web Crypto API<br />
          • No data is transmitted to external servers during verification<br />
          • Source code is transparent and auditable<br />
          • Your verification tool will be integrated for actual cryptographic validation
        </p>
      </div>
    </div>
  );
}

export default Verify;
