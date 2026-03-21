import React from 'react';

function Guide() {
  return (
    <div className="stats-container">
      <h1 style={{textAlign: 'center', marginBottom: '10px', letterSpacing: '-1px', fontSize: '42px'}}>VERIFICATION GUIDE</h1>
      <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '50px', fontSize: '16px'}}>
        Complete guide to verifying provably fair casino results
      </p>

      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        {/* What is Provably Fair */}
        <div style={{marginBottom: '50px', padding: '30px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '16px'}}>
          <h2 style={{fontSize: '28px', marginBottom: '20px', color: 'var(--accent-primary)'}}>What is Provably Fair?</h2>
          <p style={{color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px'}}>
            Provably fair gaming is a cryptographic method that allows players to independently verify the fairness of game outcomes. 
            Unlike traditional online gambling, where you must trust the casino, provably fair systems use mathematical proofs to demonstrate fairness.
          </p>
          <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
            Each game result is determined by combining:
          </p>
          <ul style={{color: 'var(--text-secondary)', lineHeight: '2', marginLeft: '30px', marginTop: '12px'}}>
            <li><strong>Server Seed</strong> - Random value from the casino (hashed before game)</li>
            <li><strong>Client Seed</strong> - Random value you provide</li>
            <li><strong>Nonce</strong> - Incrementing number for each bet</li>
          </ul>
        </div>

        {/* How to Verify */}
        <div style={{marginBottom: '50px', padding: '30px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '16px'}}>
          <h2 style={{fontSize: '28px', marginBottom: '20px', color: 'var(--accent-primary)'}}>How to Verify Results</h2>
          
          <div style={{marginBottom: '30px'}}>
            <h3 style={{fontSize: '20px', marginBottom: '12px', color: 'var(--text-primary)'}}>Step 1: Export Game Data</h3>
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
              After playing on a casino, go to your game history and export the verification data. This typically includes:
              server seed, client seed, nonce, and the game result.
            </p>
          </div>

          <div style={{marginBottom: '30px'}}>
            <h3 style={{fontSize: '20px', marginBottom: '12px', color: 'var(--text-primary)'}}>Step 2: Select Game & Provider</h3>
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
              On our <a href="/verify" style={{color: 'var(--accent-primary)'}}>Verification Tool</a>, select the game type (Limbo, Dice, Blackjack, etc.) 
              and the casino provider you played on. Different casinos use different algorithms.
            </p>
          </div>

          <div style={{marginBottom: '30px'}}>
            <h3 style={{fontSize: '20px', marginBottom: '12px', color: 'var(--text-primary)'}}>Step 3: Paste & Verify</h3>
            <p style={{color: 'var(--text-secondary)', lineHeight: '1.8'}}>
              Paste your exported data into our tool and click "Start Verification". The tool will:
            </p>
            <ul style={{color: 'var(--text-secondary)', lineHeight: '2', marginLeft: '30px', marginTop: '12px'}}>
              <li>Use the same algorithm the casino used</li>
              <li>Calculate what the result should be</li>
              <li>Compare it with the actual result</li>
              <li>Confirm if the game was fair</li>
            </ul>
          </div>
        </div>

        {/* Game Specific Guides */}
        <div style={{marginBottom: '50px', padding: '30px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '16px'}}>
          <h2 style={{fontSize: '28px', marginBottom: '20px', color: 'var(--accent-primary)'}}>Game-Specific Guides</h2>
          
          {[
            {name: 'Limbo', icon: '🎯', desc: 'Verify multiplier calculations based on server/client seeds'},
            {name: 'Dice', icon: '🎲', desc: 'Verify dice roll results (0-99.99) using seed hashing'},
            {name: 'Blackjack', icon: '🃏', desc: 'Verify card deck shuffling and dealing order'},
            {name: 'Keno', icon: '🔢', desc: 'Verify number selection from 80-ball pool'},
            {name: 'Mines', icon: '💣', desc: 'Verify mine placement and safe tile positions'},
            {name: 'Plinko', icon: '⚡', desc: 'Verify ball path and landing position'}
          ].map((game, idx) => (
            <div key={idx} style={{marginBottom: '20px', padding: '20px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid var(--border-color)', borderRadius: '12px'}}>
              <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>{game.icon} {game.name}</h3>
              <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>{game.desc}</p>
            </div>
          ))}
        </div>

        {/* Common Issues */}
        <div style={{marginBottom: '50px', padding: '30px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '16px'}}>
          <h2 style={{fontSize: '28px', marginBottom: '20px', color: 'var(--accent-primary)'}}>Common Issues</h2>
          
          <div style={{marginBottom: '20px'}}>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>❓ Verification Failed</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7'}}>
              If verification fails, double-check: (1) You selected the correct provider, (2) The export data is complete and unmodified, 
              (3) The game type matches what you played.
            </p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>❓ No Provider Listed</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7'}}>
              If your casino isn't listed, contact us or check our <a href="/trusted-providers" style={{color: 'var(--accent-primary)'}}>Trusted Providers</a> page 
              for supported platforms. We're constantly adding new providers.
            </p>
          </div>

          <div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>❓ Data Format Issues</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7'}}>
              Make sure you're copying the complete export data. Most casinos provide a "Copy Verification Data" button. 
              Don't manually type or modify any values.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div style={{padding: '30px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '16px'}}>
          <h2 style={{fontSize: '28px', marginBottom: '20px', color: 'var(--accent-primary)'}}>Frequently Asked Questions</h2>
          
          <div style={{marginBottom: '24px'}}>
            <h3 style={{fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600'}}>Q: Do I need to register to verify results?</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>A: No! Verification is completely public. Guest users just need to complete a CAPTCHA.</p>
          </div>

          <div style={{marginBottom: '24px'}}>
            <h3 style={{fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600'}}>Q: Is my data safe when I verify?</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>A: Yes! All verification happens in YOUR browser. We never see or store your seeds or game data.</p>
          </div>

          <div style={{marginBottom: '24px'}}>
            <h3 style={{fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600'}}>Q: Can I verify old games?</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>A: Yes, as long as you have the export data. Results remain verifiable forever.</p>
          </div>

          <div>
            <h3 style={{fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600'}}>Q: What if verification shows the game was unfair?</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '14px'}}>A: Contact the casino with proof from our verification tool. If they can't explain the discrepancy, consider reporting them and avoiding that platform.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{marginTop: '50px', padding: '40px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1))', border: '1px solid var(--accent-primary)', borderRadius: '16px', textAlign: 'center'}}>
          <h2 style={{fontSize: '28px', marginBottom: '16px'}}>Ready to Verify?</h2>
          <p style={{color: 'var(--text-secondary)', marginBottom: '30px'}}>Start verifying your casino results now</p>
          <a href="/verify" className="btn btn-primary" style={{display: 'inline-block', textDecoration: 'none'}}>
            GO TO VERIFICATION TOOL
          </a>
        </div>
      </div>
    </div>
  );
}

export default Guide;
