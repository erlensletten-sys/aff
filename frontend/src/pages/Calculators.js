import React, { useState } from 'react';
import { MinesCalculator, HiLoCalculator, DiceCalculator, PlinkoCalculator } from '../components/Calculators';

function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState('mines');

  const calculators = [
    { id: 'mines', name: 'MINES', icon: '💎', component: MinesCalculator },
    { id: 'dice', name: 'DICE', icon: '🎲', component: DiceCalculator },
    { id: 'limbo', name: 'LIMBO', icon: '🚀', component: LimboCalculator },
    { id: 'plinko', name: 'PLINKO', icon: '🎯', component: PlinkoCalculator },
    { id: 'hilo', name: 'HILO', icon: '🎴', component: HiLoCalculator }
  ];

  const ActiveComponent = calculators.find(c => c.id === activeCalculator)?.component;

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
      <div style={{textAlign: 'center', marginBottom: '50px'}}>
        <h1 style={{fontSize: '42px', marginBottom: '12px', letterSpacing: '-1px'}}>
          GAME CALCULATORS
        </h1>
        <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>
          Professional tools to calculate probabilities, multipliers, and optimal strategies
        </p>
      </div>

      {/* Calculator Navigation */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px'
      }}>
        {calculators.map(calc => (
          <button
            key={calc.id}
            onClick={() => setActiveCalculator(calc.id)}
            className={`btn ${activeCalculator === calc.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              minWidth: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            data-testid={`calc-nav-${calc.id}`}
          >
            <span style={{fontSize: '18px'}}>{calc.icon}</span>
            {calc.name}
          </button>
        ))}
      </div>

      {/* Active Calculator Display */}
      <div style={{
        padding: '40px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px'
      }}>
        {ActiveComponent && <ActiveComponent />}
      </div>

      {/* Educational Note */}
      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: 'rgba(99, 102, 241, 0.05)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6'}}>
          💡 <strong>Mathematical Tools for Informed Decisions</strong>
        </p>
        <p style={{color: 'var(--text-muted)', fontSize: '12px', marginTop: '8px', lineHeight: '1.6'}}>
          These calculators use standard probability theory and game-specific formulas. Results are theoretical and based on mathematical models. 
          House edge varies by provider. Always gamble responsibly and within your means.
        </p>
      </div>
    </div>
  );
}

// Add Limbo Calculator to exports
function LimboCalculator() {
  const [targetMultiplier, setTargetMultiplier] = useState(2.00);
  const [betAmount, setBetAmount] = useState(10);
  const [results, setResults] = useState(null);

  const calculateLimbo = () => {
    const target = parseFloat(targetMultiplier);
    
    if (target < 1.01) {
      alert('Target multiplier must be at least 1.01x');
      return;
    }

    const houseEdge = 1.0;
    const winProbability = ((100 - houseEdge) / target).toFixed(2);
    const potentialWin = (betAmount * target).toFixed(2);
    const potentialProfit = (potentialWin - betAmount).toFixed(2);
    const ev = ((potentialWin * parseFloat(winProbability) / 100) - betAmount).toFixed(4);

    setResults({
      winProbability,
      targetMultiplier: target.toFixed(2),
      potentialWin,
      potentialProfit,
      houseEdge: houseEdge.toFixed(1),
      expectedValue: ev
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-purple)'}}>
          🚀 LIMBO CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate win probability for target multipliers
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Bet Amount</label>
        <input
          type="number"
          className="form-input"
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
          min="0"
          step="0.01"
          data-testid="limbo-calc-bet-amount"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Target Multiplier</label>
        <input
          type="number"
          className="form-input"
          value={targetMultiplier}
          onChange={(e) => setTargetMultiplier(parseFloat(e.target.value) || 1.01)}
          min="1.01"
          step="0.01"
          data-testid="limbo-calc-target-multiplier"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          Higher multiplier = Lower probability
        </small>
      </div>

      <button 
        onClick={calculateLimbo} 
        className="btn btn-primary btn-full"
        data-testid="limbo-calc-submit"
      >
        CALCULATE ODDS
      </button>

      {results && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px'
        }} data-testid="limbo-calc-results">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>WIN PROBABILITY</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--accent-success)'}}>{results.winProbability}%</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>TARGET MULTIPLIER</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--accent-primary)'}}>{results.targetMultiplier}x</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>POTENTIAL WIN</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--accent-cyan)'}}>${results.potentialWin}</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>PROFIT</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: results.potentialProfit >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'}}>${results.potentialProfit}</div>
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: results.expectedValue >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${results.expectedValue >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'}`,
            borderRadius: '8px'
          }}>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)'}}>
              Expected Value: <span style={{fontWeight: '700', color: results.expectedValue >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'}}>${results.expectedValue}</span>
            </div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px'}}>
              House Edge: {results.houseEdge}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculators;
