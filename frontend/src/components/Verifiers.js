import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// Stake Dice Verifier
export function StakeDiceVerifier() {
  const [clientSeed, setClientSeed] = useState('');
  const [serverSeed, setServerSeed] = useState('');
  const [nonce, setNonce] = useState('');
  const [result, setResult] = useState(null);

  const verifyDice = () => {
    if (!clientSeed || !serverSeed || !nonce) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // Stake Dice algorithm: HMAC-SHA256 based
      const message = `${clientSeed}:${nonce}:0`;
      const hmac = CryptoJS.HmacSHA256(message, serverSeed);
      const hex = hmac.toString(CryptoJS.enc.Hex);
      
      // Convert first 8 characters to float
      const floatResult = parseInt(hex.substring(0, 8), 16) / Math.pow(2, 32);
      
      // Dice result: floor(float × 10001) / 100
      const diceResult = (Math.floor(floatResult * 10001) / 100).toFixed(2);

      setResult({
        status: 'success',
        diceResult,
        floatValue: floatResult.toFixed(8),
        hexSubstring: hex.substring(0, 8),
        fullHex: hex,
        steps: [
          `1. Combined: "${clientSeed}:${nonce}:0"`,
          `2. HMAC-SHA256 with server seed as key`,
          `3. Hex result: ${hex.substring(0, 32)}...`,
          `4. First 8 chars: ${hex.substring(0, 8)}`,
          `5. Convert to decimal: ${parseInt(hex.substring(0, 8), 16)}`,
          `6. Divide by 2^32: ${floatResult.toFixed(8)}`,
          `7. Multiply by 10001 and floor: ${Math.floor(floatResult * 10001)}`,
          `8. Divide by 100: ${diceResult}`
        ]
      });
    } catch (error) {
      setResult({
        status: 'error',
        message: error.message
      });
    }
  };

  return (
    <div className="verifier-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '28px', marginBottom: '8px', color: 'var(--accent-primary)'}}>
          🎲 STAKE DICE VERIFIER
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
          Verify Stake.com and Stake.us Dice results (0.00-99.99) using HMAC-SHA256
        </p>
      </div>

      {/* Info Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{padding: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-success)', borderRadius: '8px'}}>
          <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>RETURN TO PLAYER</div>
          <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)'}}>99%</div>
        </div>
        <div style={{padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-danger)', borderRadius: '8px'}}>
          <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>HOUSE EDGE</div>
          <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-danger)'}}>1%</div>
        </div>
        <div style={{padding: '16px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '8px'}}>
          <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>RESULT RANGE</div>
          <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--accent-primary)'}}>0.00 - 99.99</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Client Seed *</label>
        <input
          type="text"
          className="form-input"
          value={clientSeed}
          onChange={(e) => setClientSeed(e.target.value)}
          placeholder="e.g., my-custom-seed-123"
          style={{fontFamily: 'Monaco, monospace'}}
          data-testid="stake-dice-client-seed"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          Your unique client seed from Stake
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Server Seed (Unhashed) *</label>
        <input
          type="text"
          className="form-input"
          value={serverSeed}
          onChange={(e) => setServerSeed(e.target.value)}
          placeholder="e.g., 4d7e8f9a2b3c1d5e6f7a8b9c0d1e2f3a..."
          style={{fontFamily: 'Monaco, monospace'}}
          data-testid="stake-dice-server-seed"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          Found in Settings → Fairness after unhashing
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Nonce *</label>
        <input
          type="number"
          className="form-input"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
          placeholder="e.g., 1"
          min="0"
          data-testid="stake-dice-nonce"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          The bet number in your current seed pair
        </small>
      </div>

      <button 
        onClick={verifyDice} 
        className="btn btn-primary btn-full"
        data-testid="stake-dice-verify-btn"
      >
        VERIFY RESULT
      </button>

      {result && result.status === 'success' && (
        <div style={{
          marginTop: '30px',
          padding: '32px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '2px solid var(--accent-success)',
          borderRadius: '12px'
        }} data-testid="stake-dice-result">
          <div style={{textAlign: 'center', marginBottom: '24px'}}>
            <div style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px'}}>
              VERIFIED DICE RESULT
            </div>
            <div style={{fontSize: '64px', fontWeight: '700', color: 'var(--accent-success)'}}>
              {result.diceResult}
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px'}}>
              Compare this with your Stake bet history
            </div>
          </div>

          <div style={{
            padding: '20px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px'}}>
              CRYPTOGRAPHIC PROOF
            </h4>
            <div style={{fontSize: '12px', fontFamily: 'Monaco, monospace', lineHeight: '1.8'}}>
              <div style={{marginBottom: '8px'}}>
                <span style={{color: 'var(--text-muted)'}}>Float Value:</span> <span style={{color: 'var(--accent-cyan)'}}>{result.floatValue}</span>
              </div>
              <div style={{marginBottom: '8px'}}>
                <span style={{color: 'var(--text-muted)'}}>Hex (8 chars):</span> <span style={{color: 'var(--accent-primary)'}}>{result.hexSubstring}</span>
              </div>
              <div style={{wordBreak: 'break-all'}}>
                <span style={{color: 'var(--text-muted)'}}>Full HMAC:</span> <span style={{color: 'var(--text-secondary)', fontSize: '10px'}}>{result.fullHex}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px'}}>
              VERIFICATION STEPS
            </h4>
            {result.steps.map((step, idx) => (
              <div key={idx} style={{
                padding: '8px 12px',
                marginBottom: '6px',
                background: 'var(--bg-primary)',
                borderLeft: '3px solid var(--accent-primary)',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                fontFamily: 'Monaco, monospace'
              }}>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {result && result.status === 'error' && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid var(--accent-danger)',
          borderRadius: '12px'
        }}>
          <div style={{fontSize: '18px', fontWeight: '600', color: 'var(--accent-danger)', marginBottom: '8px'}}>
            VERIFICATION ERROR
          </div>
          <div style={{fontSize: '13px', color: 'var(--text-secondary)'}}>
            {result.message}
          </div>
        </div>
      )}
    </div>
  );
}

// Stake Limbo Verifier
export function StakeLimboVerifier() {
  const [clientSeed, setClientSeed] = useState('');
  const [serverSeed, setServerSeed] = useState('');
  const [nonce, setNonce] = useState('');
  const [result, setResult] = useState(null);

  const verifyLimbo = () => {
    if (!clientSeed || !serverSeed || !nonce) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // Stake Limbo algorithm
      const message = `${clientSeed}:${nonce}:0`;
      const hmac = CryptoJS.HmacSHA256(message, serverSeed);
      const hex = hmac.toString(CryptoJS.enc.Hex);
      
      // Convert first 8 characters to float
      const floatResult = parseInt(hex.substring(0, 8), 16) / Math.pow(2, 32);
      
      // Limbo result: 99 / (100 × floatResult)
      let limboResult;
      if (floatResult === 0) {
        limboResult = 1000000; // Max multiplier
      } else {
        limboResult = (99 / (100 * floatResult));
      }
      
      // Cap at 1,000,000x
      limboResult = Math.min(limboResult, 1000000);

      setResult({
        status: 'success',
        limboResult: limboResult.toFixed(2),
        floatValue: floatResult.toFixed(8),
        hexSubstring: hex.substring(0, 8),
        fullHex: hex,
        steps: [
          `1. Combined: "${clientSeed}:${nonce}:0"`,
          `2. HMAC-SHA256 with server seed`,
          `3. Hex: ${hex.substring(0, 32)}...`,
          `4. First 8 chars: ${hex.substring(0, 8)}`,
          `5. Float value: ${floatResult.toFixed(8)}`,
          `6. Formula: 99 / (100 × ${floatResult.toFixed(8)})`,
          `7. Result: ${limboResult.toFixed(2)}x`,
          `8. Capped at 1,000,000x max`
        ]
      });
    } catch (error) {
      setResult({
        status: 'error',
        message: error.message
      });
    }
  };

  return (
    <div className="verifier-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '28px', marginBottom: '8px', color: 'var(--accent-purple)'}}>
          🚀 STAKE LIMBO VERIFIER
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
          Verify Stake.com Limbo instant multiplier results (up to 1,000,000x)
        </p>
      </div>

      {/* Info Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{padding: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-success)', borderRadius: '8px'}}>
          <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>RTP</div>
          <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)'}}>99%</div>
        </div>
        <div style={{padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-danger)', borderRadius: '8px'}}>
          <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>HOUSE EDGE</div>
          <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-danger)'}}>1%</div>
        </div>
        <div style={{padding: '16px', background: 'rgba(168, 139, 250, 0.1)', border: '1px solid var(--accent-purple)', borderRadius: '8px'}}>
          <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>MAX MULTIPLIER</div>
          <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--accent-purple)'}}>1,000,000x</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Client Seed *</label>
        <input
          type="text"
          className="form-input"
          value={clientSeed}
          onChange={(e) => setClientSeed(e.target.value)}
          placeholder="Your client seed from Stake"
          style={{fontFamily: 'Monaco, monospace'}}
          data-testid="stake-limbo-client-seed"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Server Seed (Unhashed) *</label>
        <input
          type="text"
          className="form-input"
          value={serverSeed}
          onChange={(e) => setServerSeed(e.target.value)}
          placeholder="Revealed server seed from Settings → Fairness"
          style={{fontFamily: 'Monaco, monospace'}}
          data-testid="stake-limbo-server-seed"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Nonce *</label>
        <input
          type="number"
          className="form-input"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
          placeholder="Bet number"
          min="0"
          data-testid="stake-limbo-nonce"
        />
      </div>

      <button 
        onClick={verifyLimbo} 
        className="btn btn-primary btn-full"
        data-testid="stake-limbo-verify-btn"
      >
        VERIFY RESULT
      </button>

      {result && result.status === 'success' && (
        <div style={{
          marginTop: '30px',
          padding: '32px',
          background: 'rgba(168, 139, 250, 0.1)',
          border: '2px solid var(--accent-purple)',
          borderRadius: '12px'
        }} data-testid="stake-limbo-result">
          <div style={{textAlign: 'center', marginBottom: '24px'}}>
            <div style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px'}}>
              VERIFIED LIMBO RESULT
            </div>
            <div style={{fontSize: '64px', fontWeight: '700', color: 'var(--accent-purple)'}}>
              {result.limboResult}x
            </div>
          </div>

          <div style={{
            padding: '20px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px'}}>
              CRYPTOGRAPHIC PROOF
            </h4>
            <div style={{fontSize: '12px', fontFamily: 'Monaco, monospace', lineHeight: '1.8'}}>
              <div style={{marginBottom: '8px'}}>
                <span style={{color: 'var(--text-muted)'}}>Float Value:</span> <span style={{color: 'var(--accent-cyan)'}}>{result.floatValue}</span>
              </div>
              <div style={{marginBottom: '8px'}}>
                <span style={{color: 'var(--text-muted)'}}>Hex (8 chars):</span> <span style={{color: 'var(--accent-primary)'}}>{result.hexSubstring}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px'}}>
              VERIFICATION STEPS
            </h4>
            {result.steps.map((step, idx) => (
              <div key={idx} style={{
                padding: '8px 12px',
                marginBottom: '6px',
                background: 'var(--bg-primary)',
                borderLeft: '3px solid var(--accent-purple)',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                fontFamily: 'Monaco, monospace'
              }}>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {result && result.status === 'error' && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid var(--accent-danger)',
          borderRadius: '12px'
        }}>
          <div style={{fontSize: '18px', fontWeight: '600', color: 'var(--accent-danger)'}}>
            ERROR: {result.message}
          </div>
        </div>
      )}
    </div>
  );
}

// Stake Mines Verifier
export function StakeMinesVerifier() {
  const [clientSeed, setClientSeed] = useState('');
  const [serverSeed, setServerSeed] = useState('');
  const [nonce, setNonce] = useState('');
  const [result, setResult] = useState(null);

  const verifyMines = () => {
    if (!clientSeed || !serverSeed || !nonce) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // Generate mine locations using HMAC
      const mineLocations = [];
      const grid = Array(25).fill(false); // 5x5 grid
      
      let cursor = 0;
      while (mineLocations.length < 25) {
        const message = `${clientSeed}:${nonce}:${cursor}`;
        const hmac = CryptoJS.HmacSHA256(message, serverSeed);
        const hex = hmac.toString(CryptoJS.enc.Hex);
        
        // Process hex in chunks to get positions
        for (let i = 0; i < 25 && mineLocations.length < 25; i += 2) {
          const hexChunk = hex.substring(i * 2, i * 2 + 2);
          const position = parseInt(hexChunk, 16) % 25;
          
          if (!grid[position]) {
            grid[position] = true;
            mineLocations.push(position);
          }
        }
        
        cursor++;
        if (cursor > 10) break; // Safety limit
      }

      // Convert to 5x5 visual grid
      const visualGrid = [];
      for (let row = 0; row < 5; row++) {
        const rowData = [];
        for (let col = 0; col < 5; col++) {
          const index = row * 5 + col;
          rowData.push({
            position: index,
            row: row + 1,
            col: col + 1,
            isMine: grid[index]
          });
        }
        visualGrid.push(rowData);
      }

      setResult({
        status: 'success',
        mineLocations: mineLocations.slice(0, 25),
        visualGrid,
        totalMines: 25,
        steps: [
          `1. Combined: "${clientSeed}:${nonce}:{cursor}"`,
          `2. HMAC-SHA256 for each cursor value`,
          `3. Convert hex chunks to positions (0-24)`,
          `4. Place mines on 5x5 grid`,
          `5. Total mines: ${mineLocations.length}`
        ]
      });
    } catch (error) {
      setResult({
        status: 'error',
        message: error.message
      });
    }
  };

  return (
    <div className="verifier-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '28px', marginBottom: '8px', color: 'var(--accent-cyan)'}}>
          💎 STAKE MINES VERIFIER
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
          Verify exact mine locations on the 5x5 Stake Mines grid
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Client Seed *</label>
        <input
          type="text"
          className="form-input"
          value={clientSeed}
          onChange={(e) => setClientSeed(e.target.value)}
          placeholder="Your client seed"
          style={{fontFamily: 'Monaco, monospace'}}
          data-testid="stake-mines-client-seed"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Server Seed (Unhashed) *</label>
        <input
          type="text"
          className="form-input"
          value={serverSeed}
          onChange={(e) => setServerSeed(e.target.value)}
          placeholder="Revealed server seed"
          style={{fontFamily: 'Monaco, monospace'}}
          data-testid="stake-mines-server-seed"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Nonce *</label>
        <input
          type="number"
          className="form-input"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
          placeholder="Bet number"
          min="0"
          data-testid="stake-mines-nonce"
        />
      </div>

      <button 
        onClick={verifyMines} 
        className="btn btn-primary btn-full"
        data-testid="stake-mines-verify-btn"
      >
        VERIFY MINE LOCATIONS
      </button>

      {result && result.status === 'success' && (
        <div style={{
          marginTop: '30px',
          padding: '32px',
          background: 'rgba(6, 182, 212, 0.1)',
          border: '2px solid var(--accent-cyan)',
          borderRadius: '12px'
        }} data-testid="stake-mines-result">
          <h3 style={{fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)', textAlign: 'center'}}>
            VERIFIED MINE GRID (5×5)
          </h3>

          {/* Visual 5x5 Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
            marginBottom: '24px',
            maxWidth: '400px',
            margin: '0 auto 24px auto'
          }}>
            {result.visualGrid.flat().map((cell) => (
              <div
                key={cell.position}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: cell.isMine ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  border: `2px solid ${cell.isMine ? 'var(--accent-danger)' : 'var(--accent-success)'}`,
                  borderRadius: '8px',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: cell.isMine ? 'var(--accent-danger)' : 'var(--accent-success)',
                  transition: 'transform 0.2s ease'
                }}
                title={`Position ${cell.position} (Row ${cell.row}, Col ${cell.col})`}
              >
                {cell.isMine ? '💣' : '💎'}
              </div>
            ))}
          </div>

          <div style={{
            padding: '20px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px'}}>
              MINE POSITIONS (0-24)
            </div>
            <div style={{fontSize: '14px', fontFamily: 'Monaco, monospace', color: 'var(--accent-cyan)', lineHeight: '1.6'}}>
              {result.mineLocations.slice(0, 5).join(', ')}
            </div>
          </div>

          <div>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px'}}>
              VERIFICATION STEPS
            </h4>
            {result.steps.map((step, idx) => (
              <div key={idx} style={{
                padding: '8px 12px',
                marginBottom: '6px',
                background: 'var(--bg-primary)',
                borderLeft: '3px solid var(--accent-cyan)',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                fontFamily: 'Monaco, monospace'
              }}>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {result && result.status === 'error' && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid var(--accent-danger)',
          borderRadius: '12px'
        }}>
          <div style={{fontSize: '18px', fontWeight: '600', color: 'var(--accent-danger)'}}>
            ERROR: {result.message}
          </div>
        </div>
      )}
    </div>
  );
}

// Stake Plinko Verifier
export function StakePlinkoVerifier() {
  const [clientSeed, setClientSeed] = useState('');
  const [serverSeed, setServerSeed] = useState('');
  const [nonce, setNonce] = useState('');
  const [rows, setRows] = useState(16);
  const [result, setResult] = useState(null);

  const verifyPlinko = () => {
    if (!clientSeed || !serverSeed || !nonce) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // Plinko: Generate path using HMAC
      const message = `${clientSeed}:${nonce}:0`;
      const hmac = CryptoJS.HmacSHA256(message, serverSeed);
      const hex = hmac.toString(CryptoJS.enc.Hex);
      
      // Each row: left (0) or right (1) decision
      const path = [];
      let position = 0; // Start at middle
      
      for (let i = 0; i < rows; i++) {
        // Use 2 hex characters per row
        const hexPair = hex.substring(i * 2, i * 2 + 2);
        const value = parseInt(hexPair, 16);
        
        // Odd = right, Even = left
        const direction = value % 2 === 0 ? 'LEFT' : 'RIGHT';
        
        if (direction === 'RIGHT') {
          position++;
        }
        
        path.push({
          row: i + 1,
          direction,
          hexPair,
          value
        });
      }

      // Final bucket is the position
      const finalBucket = position;

      setResult({
        status: 'success',
        finalBucket,
        path,
        totalRows: rows,
        steps: [
          `1. Combined: "${clientSeed}:${nonce}:0"`,
          `2. HMAC-SHA256 hash generated`,
          `3. Each row uses 2 hex characters`,
          `4. Even value = LEFT, Odd value = RIGHT`,
          `5. Final position: Bucket ${finalBucket}`,
          `6. Total right moves: ${position}/${rows}`
        ]
      });
    } catch (error) {
      setResult({
        status: 'error',
        message: error.message
      });
    }
  };

  return (
    <div className="verifier-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '28px', marginBottom: '8px', color: 'var(--accent-pink)'}}>
          🎯 STAKE PLINKO VERIFIER
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
          Verify ball drop pattern and final bucket position
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Client Seed *</label>
        <input
          type="text"
          className="form-input"
          value={clientSeed}
          onChange={(e) => setClientSeed(e.target.value)}
          placeholder="Your client seed"
          style={{fontFamily: 'Monaco, monospace'}}
          data-testid="stake-plinko-client-seed"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Server Seed (Unhashed) *</label>
        <input
          type="text"
          className="form-input"
          value={serverSeed}
          onChange={(e) => setServerSeed(e.target.value)}
          placeholder="Revealed server seed"
          style={{fontFamily: 'Monaco, monospace'}}
          data-testid="stake-plinko-server-seed"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Nonce *</label>
        <input
          type="number"
          className="form-input"
          value={nonce}
          onChange={(e) => setNonce(e.target.value)}
          placeholder="Bet number"
          min="0"
          data-testid="stake-plinko-nonce"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Number of Rows</label>
        <select 
          className="form-input"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          data-testid="stake-plinko-rows"
        >
          <option value={8}>8 Rows</option>
          <option value={12}>12 Rows</option>
          <option value={16}>16 Rows</option>
        </select>
      </div>

      <button 
        onClick={verifyPlinko} 
        className="btn btn-primary btn-full"
        data-testid="stake-plinko-verify-btn"
      >
        VERIFY DROP PATH
      </button>

      {result && result.status === 'success' && (
        <div style={{
          marginTop: '30px',
          padding: '32px',
          background: 'rgba(236, 72, 153, 0.1)',
          border: '2px solid var(--accent-pink)',
          borderRadius: '12px'
        }} data-testid="stake-plinko-result">
          <div style={{textAlign: 'center', marginBottom: '24px'}}>
            <div style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px'}}>
              FINAL BUCKET POSITION
            </div>
            <div style={{fontSize: '64px', fontWeight: '700', color: 'var(--accent-pink)'}}>
              {result.finalBucket}
            </div>
            <div style={{fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px'}}>
              Out of {result.totalRows + 1} possible buckets (0-{result.totalRows})
            </div>
          </div>

          <div style={{
            padding: '20px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            marginBottom: '20px',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px'}}>
              DROP PATH ({result.totalRows} ROWS)
            </h4>
            {result.path.map((step, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                marginBottom: '4px',
                background: step.direction === 'RIGHT' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(168, 139, 250, 0.1)',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'Monaco, monospace'
              }}>
                <span style={{color: 'var(--text-muted)'}}>Row {step.row}:</span>
                <span style={{color: step.direction === 'RIGHT' ? 'var(--accent-primary)' : 'var(--accent-purple)', fontWeight: '600'}}>
                  {step.direction}
                </span>
                <span style={{color: 'var(--text-muted)', fontSize: '10px'}}>
                  ({step.hexPair} = {step.value})
                </span>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px'}}>
              VERIFICATION STEPS
            </h4>
            {result.steps.map((step, idx) => (
              <div key={idx} style={{
                padding: '8px 12px',
                marginBottom: '6px',
                background: 'var(--bg-primary)',
                borderLeft: '3px solid var(--accent-pink)',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                fontFamily: 'Monaco, monospace'
              }}>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {result && result.status === 'error' && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid var(--accent-danger)',
          borderRadius: '12px'
        }}>
          <div style={{fontSize: '18px', fontWeight: '600', color: 'var(--accent-danger)'}}>
            ERROR: {result.message}
          </div>
        </div>
      )}
    </div>
  );
}

export default { StakeDiceVerifier, StakeLimboVerifier, StakeMinesVerifier, StakePlinkoVerifier };
