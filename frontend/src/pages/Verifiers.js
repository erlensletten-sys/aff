import React, { useState } from 'react';
import { StakeDiceVerifier, StakeLimboVerifier, StakeMinesVerifier, StakePlinkoVerifier } from '../components/Verifiers';

function Verifiers() {
  const [selectedProvider, setSelectedProvider] = useState('stake');
  const [selectedGame, setSelectedGame] = useState('dice');

  const verifierComponents = {
    stake: {
      dice: StakeDiceVerifier,
      limbo: StakeLimboVerifier,
      mines: StakeMinesVerifier,
      plinko: StakePlinkoVerifier
    },
    shuffle: {
      dice: StakeDiceVerifier, // Use same algorithm (placeholder for now)
      limbo: StakeLimboVerifier,
      mines: StakeMinesVerifier,
      plinko: StakePlinkoVerifier
    },
    bcgame: {
      dice: StakeDiceVerifier, // Use same algorithm (placeholder for now)
      limbo: StakeLimboVerifier,
      mines: StakeMinesVerifier,
      plinko: StakePlinkoVerifier
    }
  };

  const providers = [
    { id: 'stake', name: 'Stake.com', color: 'var(--accent-primary)' },
    { id: 'shuffle', name: 'Shuffle', color: 'var(--accent-secondary)' },
    { id: 'bcgame', name: 'BC.Game', color: 'var(--accent-cyan)' }
  ];

  const games = [
    { id: 'dice', name: 'DICE', icon: '🎲' },
    { id: 'limbo', name: 'LIMBO', icon: '🚀' },
    { id: 'mines', name: 'MINES', icon: '💎' },
    { id: 'plinko', name: 'PLINKO', icon: '🎯' }
  ];

  const ActiveVerifier = verifierComponents[selectedProvider]?.[selectedGame];

  return (
    <div style={{maxWidth: '1400px', margin: '0 auto', padding: '40px 20px'}}>
      <div style={{textAlign: 'center', marginBottom: '50px'}}>
        <h1 style={{fontSize: '42px', marginBottom: '12px', letterSpacing: '-1px'}}>
          PROVABLY FAIR VERIFIERS
        </h1>
        <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>
          Verify game outcomes using each casino's official cryptographic algorithms
        </p>
      </div>

      {/* Provider Selection */}
      <div style={{marginBottom: '30px'}}>
        <h3 style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px'}}>
          SELECT PROVIDER
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {providers.map(provider => (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(provider.id)}
              className={`btn ${selectedProvider === provider.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '20px',
                fontSize: '16px',
                fontWeight: '600',
                borderWidth: '2px',
                borderColor: selectedProvider === provider.id ? provider.color : 'var(--border-color)'
              }}
              data-testid={`verifier-provider-${provider.id}`}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>

      {/* Game Selection */}
      <div style={{marginBottom: '40px'}}>
        <h3 style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '1px'}}>
          SELECT GAME
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px'
        }}>
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`btn ${selectedGame === game.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}
              data-testid={`verifier-game-${game.id}`}
            >
              <span style={{fontSize: '20px'}}>{game.icon}</span>
              {game.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Verifier */}
      <div style={{
        padding: '40px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px'
      }}>
        {ActiveVerifier ? (
          <ActiveVerifier />
        ) : (
          <div style={{textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>🔧</div>
            <div style={{fontSize: '18px'}}>Verifier coming soon</div>
            <div style={{fontSize: '13px', marginTop: '8px'}}>
              This combination is under development
            </div>
          </div>
        )}
      </div>

      {/* How to Get Seeds */}
      <div style={{
        marginTop: '40px',
        padding: '32px',
        background: 'rgba(99, 102, 241, 0.05)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px'
      }}>
        <h3 style={{fontSize: '18px', marginBottom: '16px', color: 'var(--accent-primary)'}}>
          📋 HOW TO GET YOUR SEED DATA
        </h3>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
          <div>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600'}}>
              1. CLIENT SEED
            </h4>
            <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
              Go to Settings → Fairness on your casino. Your client seed is displayed there. You can use the default or set a custom one.
            </p>
          </div>

          <div>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600'}}>
              2. SERVER SEED (UNHASHED)
            </h4>
            <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
              In Settings → Fairness, click "Unhash" or "Reveal" next to your active server seed. ⚠️ Only bets BEFORE unhashing can be verified.
            </p>
          </div>

          <div>
            <h4 style={{fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600'}}>
              3. NONCE
            </h4>
            <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
              Each bet has a unique nonce (bet number). Find it in your bet history by clicking on the specific bet you want to verify.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div style={{
        marginTop: '24px',
        padding: '20px',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid var(--accent-success)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
          🔒 <strong>100% CLIENT-SIDE VERIFICATION</strong>
        </div>
        <div style={{fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px'}}>
          All calculations run in your browser. Your seeds and bet data never leave your device.
        </div>
      </div>
    </div>
  );
}

export default Verifiers;
