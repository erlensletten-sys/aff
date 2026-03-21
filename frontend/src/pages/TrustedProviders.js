import React, { useState } from 'react';

function TrustedProviders() {
  const providers = [
    {
      name: 'Stake.com',
      rating: 9.5,
      verified: true,
      games: ['Dice', 'Limbo', 'Crash', 'Slots'],
      status: 'Fully Verified',
      description: 'Industry-leading provably fair casino with comprehensive verification support.'
    },
    {
      name: 'Shuffle.com',
      rating: 9.3,
      verified: true,
      games: ['Dice', 'Limbo', 'Crash', 'Blackjack'],
      status: 'Fully Verified',
      description: 'Modern crypto casino with excellent transparency and provably fair implementation.'
    },
    {
      name: 'BC.Game',
      rating: 8.8,
      verified: true,
      games: ['Dice', 'Crash', 'Limbo', 'Plinko'],
      status: 'Fully Verified',
      description: 'Established platform with strong provably fair standards and active verification.'
    },
    {
      name: 'Roobet',
      rating: 8.5,
      verified: true,
      games: ['Crash', 'Dice', 'Slots'],
      status: 'Fully Verified',
      description: 'Popular casino with transparent provably fair systems and good documentation.'
    }
  ];

  return (
    <div className="stats-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '3px', fontSize: '42px', textShadow: 'var(--glow-green)'}}>TRUSTED PROVIDERS</h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '16px'}}>
        Verified gambling platforms with genuine provably fair systems
      </p>

      <div style={{marginBottom: '40px', padding: '30px', background: 'rgba(0, 255, 65, 0.05)', border: '2px solid var(--border-color)'}}>
        <h2 style={{fontSize: '24px', marginBottom: '16px', textShadow: '0 0 5px #00ff41'}}>OUR VERIFICATION PROCESS</h2>
        <p style={{color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px'}}>
          We continuously test and monitor major gambling platforms to ensure they maintain genuine provably fair systems. 
          Our verification process includes:
        </p>
        <ul style={{color: 'var(--text-secondary)', lineHeight: '2', listStylePosition: 'inside'}}>
          <li>✓ Testing provably fair implementation accuracy</li>
          <li>✓ Monitoring seed generation and rotation practices</li>
          <li>✓ Verifying cryptographic algorithm implementations</li>
          <li>✓ Continuous automated verification of game results</li>
          <li>✓ Community feedback and verification statistics</li>
        </ul>
      </div>

      <div className="features-grid">
        {providers.map((provider, index) => (
          <div key={index} className="feature-card" style={{textAlign: 'left'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
              <h3 style={{fontSize: '24px', textShadow: '0 0 5px #00ff41'}}>{provider.name}</h3>
              <div style={{
                padding: '6px 12px',
                background: 'rgba(0, 255, 65, 0.2)',
                border: '1px solid var(--border-color)',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                textShadow: '0 0 5px #00ff41'
              }}>
                {provider.rating}/10
              </div>
            </div>
            
            <div style={{
              padding: '8px 16px',
              background: 'rgba(0, 255, 65, 0.1)',
              border: '1px solid var(--border-color)',
              marginBottom: '16px',
              display: 'inline-block'
            }}>
              <span style={{color: 'var(--text-primary)', fontWeight: 'bold'}}>✓ {provider.status}</span>
            </div>
            
            <p style={{color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.7'}}>
              {provider.description}
            </p>
            
            <div style={{marginBottom: '16px'}}>
              <strong style={{color: 'var(--text-primary)', display: 'block', marginBottom: '8px'}}>Verified Games:</strong>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                {provider.games.map((game, idx) => (
                  <span key={idx} style={{
                    padding: '4px 12px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid var(--text-muted)',
                    fontSize: '13px',
                    color: 'var(--text-secondary)'
                  }}>
                    {game}
                  </span>
                ))}
              </div>
            </div>
            
            <button className="btn btn-secondary" style={{width: '100%', marginTop: '10px'}}>
              VIEW VERIFICATION REPORT
            </button>
          </div>
        ))}
      </div>

      <div style={{marginTop: '60px', padding: '40px', background: 'rgba(255, 255, 0, 0.05)', border: '2px solid var(--accent-warning)'}}>
        <h2 style={{fontSize: '28px', marginBottom: '16px', color: 'var(--accent-warning)'}}>⚠️ DISCLAIMER</h2>
        <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
          While these providers have verified provably fair systems, NoToGreed is an independent verification service 
          and is not affiliated with any gambling platform. Verification status reflects technical implementation only. 
          Always gamble responsibly and within your means. Gambling involves risk of loss.
        </p>
      </div>
    </div>
  );
}

export default TrustedProviders;
