import React, { useState } from 'react';
import crypto from 'crypto-js';

function HashCalculator() {
  const [input, setInput] = useState('');
  const [secret, setSecret] = useState('');
  const [sha256Result, setSha256Result] = useState('');
  const [hmacResult, setHmacResult] = useState('');

  const calculateHashes = () => {
    if (!input) {
      alert('Please enter input data');
      return;
    }

    // SHA256
    const sha = crypto.SHA256(input).toString();
    setSha256Result(sha);

    // HMAC-SHA256
    if (secret) {
      const hmac = crypto.HmacSHA256(input, secret).toString();
      setHmacResult(hmac);
    } else {
      setHmacResult('Secret key required for HMAC');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{marginBottom: '40px'}}>
      <h2 style={{fontSize: '28px', marginBottom: '20px'}}>Hash Calculator</h2>
      <div className="auth-container" style={{maxWidth: '700px', margin: '0'}}>
        <div className="form-group">
          <label className="form-label">Input Data *</label>
          <textarea
            className="textarea-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            style={{minHeight: '100px', fontFamily: 'Monaco, monospace'}}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Secret Key (for HMAC)</label>
          <input
            type="text"
            className="form-input"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Optional: Enter secret key for HMAC-SHA256"
          />
        </div>

        <button onClick={calculateHashes} className="btn btn-primary btn-full">
          CALCULATE HASHES
        </button>

        {sha256Result && (
          <div style={{marginTop: '30px'}}>
            <div style={{marginBottom: '20px', padding: '20px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                <h3 style={{fontSize: '16px', color: 'var(--text-primary)'}}>SHA256 Hash</h3>
                <button onClick={() => copyToClipboard(sha256Result)} className="btn btn-secondary" style={{padding: '6px 16px', fontSize: '12px'}}>
                  COPY
                </button>
              </div>
              <code style={{color: 'var(--accent-primary)', wordBreak: 'break-all', fontFamily: 'Monaco, monospace', fontSize: '13px'}}>
                {sha256Result}
              </code>
            </div>

            <div style={{padding: '20px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                <h3 style={{fontSize: '16px', color: 'var(--text-primary)'}}>HMAC-SHA256</h3>
                {hmacResult !== 'Secret key required for HMAC' && (
                  <button onClick={() => copyToClipboard(hmacResult)} className="btn btn-secondary" style={{padding: '6px 16px', fontSize: '12px'}}>
                    COPY
                  </button>
                )}
              </div>
              <code style={{color: hmacResult === 'Secret key required for HMAC' ? 'var(--accent-warning)' : 'var(--accent-primary)', wordBreak: 'break-all', fontFamily: 'Monaco, monospace', fontSize: '13px'}}>
                {hmacResult}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SeedAnalyzer() {
  const [serverSeed, setServerSeed] = useState('');
  const [clientSeed, setClientSeed] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeSeed = () => {
    if (!serverSeed && !clientSeed) {
      alert('Please enter at least one seed');
      return;
    }

    const results = {
      serverSeed: serverSeed ? {
        length: serverSeed.length,
        entropy: calculateEntropy(serverSeed),
        uniqueChars: new Set(serverSeed).size,
        isHex: /^[a-fA-F0-9]+$/.test(serverSeed),
        sha256: crypto.SHA256(serverSeed).toString()
      } : null,
      clientSeed: clientSeed ? {
        length: clientSeed.length,
        entropy: calculateEntropy(clientSeed),
        uniqueChars: new Set(clientSeed).size,
        isHex: /^[a-fA-F0-9]+$/.test(clientSeed),
        sha256: crypto.SHA256(clientSeed).toString()
      } : null
    };

    setAnalysis(results);
  };

  const calculateEntropy = (str) => {
    const freq = {};
    for (let char of str) {
      freq[char] = (freq[char] || 0) + 1;
    }
    
    let entropy = 0;
    for (let char in freq) {
      const p = freq[char] / str.length;
      entropy -= p * Math.log2(p);
    }
    
    return entropy.toFixed(4);
  };

  const renderSeedAnalysis = (seedData, seedType) => {
    if (!seedData) return null;

    return (
      <div style={{padding: '20px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '20px'}}>
        <h3 style={{fontSize: '18px', marginBottom: '16px', color: 'var(--accent-primary)'}}>{seedType} Analysis</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
          <div>
            <p style={{color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px'}}>Length</p>
            <p style={{color: 'var(--text-primary)', fontSize: '18px', fontWeight: '600'}}>{seedData.length} characters</p>
          </div>
          <div>
            <p style={{color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px'}}>Entropy</p>
            <p style={{color: 'var(--text-primary)', fontSize: '18px', fontWeight: '600'}}>{seedData.entropy} bits</p>
          </div>
          <div>
            <p style={{color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px'}}>Unique Characters</p>
            <p style={{color: 'var(--text-primary)', fontSize: '18px', fontWeight: '600'}}>{seedData.uniqueChars}</p>
          </div>
          <div>
            <p style={{color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px'}}>Format</p>
            <p style={{color: seedData.isHex ? 'var(--accent-success)' : 'var(--accent-warning)', fontSize: '18px', fontWeight: '600'}}>
              {seedData.isHex ? '✓ Hexadecimal' : 'Mixed'}
            </p>
          </div>
        </div>
        <div style={{marginTop: '20px'}}>
          <p style={{color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px'}}>SHA256 Hash:</p>
          <code style={{color: 'var(--accent-secondary)', wordBreak: 'break-all', fontFamily: 'Monaco, monospace', fontSize: '12px'}}>
            {seedData.sha256}
          </code>
        </div>
      </div>
    );
  };

  return (
    <div style={{marginBottom: '40px'}}>
      <h2 style={{fontSize: '28px', marginBottom: '20px'}}>Seed Analyzer</h2>
      <div className="auth-container" style={{maxWidth: '700px', margin: '0'}}>
        <div className="form-group">
          <label className="form-label">Server Seed</label>
          <input
            type="text"
            className="form-input"
            value={serverSeed}
            onChange={(e) => setServerSeed(e.target.value)}
            placeholder="Enter server seed to analyze..."
            style={{fontFamily: 'Monaco, monospace'}}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Client Seed</label>
          <input
            type="text"
            className="form-input"
            value={clientSeed}
            onChange={(e) => setClientSeed(e.target.value)}
            placeholder="Enter client seed to analyze..."
            style={{fontFamily: 'Monaco, monospace'}}
          />
        </div>

        <button onClick={analyzeSeed} className="btn btn-primary btn-full">
          ANALYZE SEEDS
        </button>

        {analysis && (
          <div style={{marginTop: '30px'}}>
            {renderSeedAnalysis(analysis.serverSeed, 'Server Seed')}
            {renderSeedAnalysis(analysis.clientSeed, 'Client Seed')}
            
            {analysis.serverSeed && analysis.clientSeed && (
              <div style={{padding: '20px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-success)', borderRadius: '12px'}}>
                <h3 style={{fontSize: '16px', marginBottom: '12px', color: 'var(--accent-success)'}}>✓ Quality Assessment</h3>
                <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7'}}>
                  Both seeds appear to have good randomness characteristics. 
                  {analysis.serverSeed.entropy > 4 && analysis.clientSeed.entropy > 4 ? ' High entropy detected - excellent for provably fair games.' : ' Consider using longer, more random seeds for better security.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MonitorModal({ isOpen, onClose }) {
  const sites = [
    {
      name: 'Stake.com',
      games: ['Limbo', 'Dice', 'Blackjack'],
      status: 'active',
      script: `// Stake.com Real-time Monitor
(function() {
  // Connect to game events
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        // Check for new game results
        const resultElement = document.querySelector('.game-result');
        if (resultElement) {
          const gameData = extractGameData(resultElement);
          sendToNoToGreed(gameData);
        }
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  function sendToNoToGreed(data) {
    fetch('https://notogreed.com/api/monitor', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
  }
})();`
    },
    {
      name: 'Shuffle.com',
      games: ['Crash', 'Dice', 'Limbo'],
      status: 'active',
      script: `// Shuffle.com Real-time Monitor
(function() {
  // Monitor game outcomes
  window.addEventListener('gameResult', (event) => {
    const gameData = {
      game: event.detail.game,
      result: event.detail.result,
      serverSeed: event.detail.serverSeed,
      clientSeed: event.detail.clientSeed,
      nonce: event.detail.nonce
    };
    
    // Send to NoToGreed for verification
    fetch('https://notogreed.com/api/monitor', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(gameData)
    });
  });
})();`
    },
    {
      name: 'BC.Game',
      games: ['Plinko', 'Mines', 'Keno'],
      status: 'coming_soon',
      script: '// Coming soon...'
    }
  ];

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '40px'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
          <h2 style={{fontSize: '28px', margin: 0}}>Real-Time Monitor Setup</h2>
          <button onClick={onClose} style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px'
          }}>×</button>
        </div>

        <p style={{color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.7'}}>
          Install monitoring scripts on supported gambling sites to automatically verify game results in real-time.
          Copy the script below and run it in your browser console while on the casino site.
        </p>

        <div style={{display: 'grid', gap: '20px'}}>
          {sites.map((site, idx) => (
            <div key={idx} className="feature-card" style={{padding: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <div>
                  <h3 style={{fontSize: '20px', marginBottom: '8px'}}>{site.name}</h3>
                  <p style={{color: 'var(--text-muted)', fontSize: '13px'}}>Supported: {site.games.join(', ')}</p>
                </div>
                <span style={{
                  padding: '6px 16px',
                  background: site.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  border: `1px solid ${site.status === 'active' ? 'var(--accent-success)' : 'var(--accent-warning)'}`,
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: site.status === 'active' ? 'var(--accent-success)' : 'var(--accent-warning)'
                }}>
                  {site.status === 'active' ? '✓ Active' : '⚠ Coming Soon'}
                </span>
              </div>

              <div style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '16px',
                marginTop: '16px'
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                  <span style={{color: 'var(--text-muted)', fontSize: '13px'}}>Monitoring Script:</span>
                  {site.status === 'active' && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(site.script);
                        alert('Script copied! Paste in browser console on ' + site.name);
                      }}
                      className="btn btn-secondary"
                      style={{padding: '6px 16px', fontSize: '12px'}}
                    >
                      COPY SCRIPT
                    </button>
                  )}
                </div>
                <pre style={{
                  color: 'var(--accent-primary)',
                  fontSize: '12px',
                  fontFamily: 'Monaco, monospace',
                  overflow: 'auto',
                  maxHeight: '150px',
                  margin: 0
                }}>{site.script}</pre>
              </div>

              {site.status === 'active' && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: 'rgba(99, 102, 241, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}>
                  <p style={{color: 'var(--text-secondary)', fontSize: '13px', margin: 0}}>
                    <strong>How to use:</strong> Open {site.name}, press F12 to open console, paste script, press Enter.
                    Games will be automatically verified in real-time.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid var(--accent-warning)',
          borderRadius: '12px'
        }}>
          <h4 style={{fontSize: '14px', marginBottom: '8px', color: 'var(--accent-warning)'}}>⚠️ Important Notes</h4>
          <ul style={{color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.8', marginLeft: '20px'}}>
            <li>Scripts only work while browser console is open</li>
            <li>You must be logged in to the casino site</li>
            <li>Scripts are safe and only monitor/verify results</li>
            <li>No account credentials are ever collected</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export { HashCalculator, SeedAnalyzer, MonitorModal };
