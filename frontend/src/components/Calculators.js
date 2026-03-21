import React, { useState } from 'react';

// Mines Calculator Component
export function MinesCalculator() {
  const [gridSize, setGridSize] = useState(25); // 5x5 grid
  const [numMines, setNumMines] = useState(3);
  const [tilesRevealed, setTilesRevealed] = useState(1);
  const [results, setResults] = useState(null);

  const calculateMines = () => {
    const safeTiles = gridSize - numMines;
    
    if (numMines >= gridSize) {
      alert('Number of mines must be less than grid size');
      return;
    }
    
    if (tilesRevealed > safeTiles) {
      alert('Cannot reveal more tiles than safe tiles available');
      return;
    }

    // Calculate probability of success at each step
    const steps = [];
    let cumulativeProbability = 1;
    let currentMultiplier = 1;
    
    for (let i = 0; i < tilesRevealed; i++) {
      const remainingSafe = safeTiles - i;
      const remainingTotal = gridSize - i;
      const probability = remainingSafe / remainingTotal;
      
      cumulativeProbability *= probability;
      
      // Multiplier formula (simplified - casinos use their own)
      currentMultiplier = currentMultiplier * (remainingTotal / remainingSafe);
      
      steps.push({
        tile: i + 1,
        probability: (probability * 100).toFixed(2),
        cumulativeProbability: (cumulativeProbability * 100).toFixed(2),
        multiplier: currentMultiplier.toFixed(4)
      });
    }

    // Calculate expected value (simplified)
    const finalMultiplier = parseFloat(steps[steps.length - 1].multiplier);
    const finalProbability = parseFloat(steps[steps.length - 1].cumulativeProbability) / 100;
    const expectedValue = (finalMultiplier * finalProbability - (1 - finalProbability)).toFixed(4);

    setResults({
      steps,
      finalMultiplier: finalMultiplier.toFixed(4),
      winProbability: (cumulativeProbability * 100).toFixed(2),
      expectedValue,
      houseEdge: (-(parseFloat(expectedValue)) * 100).toFixed(2)
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-primary)'}}>
          💎 MINES CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate win probability and optimal cashout strategy
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Grid Size</label>
        <select 
          className="form-input"
          value={gridSize}
          onChange={(e) => setGridSize(parseInt(e.target.value))}
          data-testid="mines-calc-grid-size"
        >
          <option value={9}>3x3 (9 tiles)</option>
          <option value={16}>4x4 (16 tiles)</option>
          <option value={25}>5x5 (25 tiles)</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Number of Mines</label>
        <input
          type="number"
          className="form-input"
          value={numMines}
          onChange={(e) => setNumMines(parseInt(e.target.value) || 1)}
          min="1"
          max={gridSize - 1}
          data-testid="mines-calc-num-mines"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          Max: {gridSize - 1}
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Tiles to Reveal</label>
        <input
          type="number"
          className="form-input"
          value={tilesRevealed}
          onChange={(e) => setTilesRevealed(parseInt(e.target.value) || 1)}
          min="1"
          max={gridSize - numMines}
          data-testid="mines-calc-tiles-revealed"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          Max safe tiles: {gridSize - numMines}
        </small>
      </div>

      <button 
        onClick={calculateMines} 
        className="btn btn-primary btn-full"
        data-testid="mines-calc-submit"
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
        }} data-testid="mines-calc-results">
          <h3 style={{fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)'}}>
            RESULTS
          </h3>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>FINAL MULTIPLIER</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)'}}>{results.finalMultiplier}x</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>WIN PROBABILITY</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)'}}>{results.winProbability}%</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>EXPECTED VALUE</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: results.expectedValue >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'}}>{results.expectedValue}</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>HOUSE EDGE</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-warning)'}}>{results.houseEdge}%</div>
            </div>
          </div>

          <h4 style={{fontSize: '14px', marginBottom: '12px', color: 'var(--text-secondary)'}}>
            STEP-BY-STEP PROBABILITY
          </h4>
          <div style={{maxHeight: '300px', overflowY: 'auto'}}>
            <table style={{width: '100%', fontSize: '12px', fontFamily: 'Monaco, monospace'}}>
              <thead>
                <tr style={{borderBottom: '1px solid var(--border-color)'}}>
                  <th style={{padding: '8px', textAlign: 'left', color: 'var(--text-muted)'}}>Tile</th>
                  <th style={{padding: '8px', textAlign: 'right', color: 'var(--text-muted)'}}>Step %</th>
                  <th style={{padding: '8px', textAlign: 'right', color: 'var(--text-muted)'}}>Total %</th>
                  <th style={{padding: '8px', textAlign: 'right', color: 'var(--text-muted)'}}>Multiplier</th>
                </tr>
              </thead>
              <tbody>
                {results.steps.map((step, idx) => (
                  <tr key={idx} style={{borderBottom: '1px solid rgba(99, 102, 241, 0.1)'}}>
                    <td style={{padding: '8px', color: 'var(--text-primary)'}}>{step.tile}</td>
                    <td style={{padding: '8px', textAlign: 'right', color: 'var(--accent-secondary)'}}>{step.probability}%</td>
                    <td style={{padding: '8px', textAlign: 'right', color: 'var(--accent-success)'}}>{step.cumulativeProbability}%</td>
                    <td style={{padding: '8px', textAlign: 'right', color: 'var(--accent-primary)'}}>{step.multiplier}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// HiLo Calculator Component
export function HiLoCalculator() {
  const [currentCard, setCurrentCard] = useState('7');
  const [cardsRemaining, setCardsRemaining] = useState(52);
  const [results, setResults] = useState(null);

  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const calculateHiLo = () => {
    const cardValue = currentCard === 'A' ? 14 : 
                     currentCard === 'K' ? 13 :
                     currentCard === 'Q' ? 12 :
                     currentCard === 'J' ? 11 : parseInt(currentCard);

    // Count cards higher and lower (simplified - 4 of each in full deck)
    const cardsPerValue = 4;
    const totalRemainingCards = parseInt(cardsRemaining) - 1;

    // Calculate higher cards
    let higherCards = 0;
    for (let val = cardValue + 1; val <= 14; val++) {
      higherCards += cardsPerValue;
    }

    // Calculate lower cards
    let lowerCards = 0;
    for (let val = 2; val < cardValue; val++) {
      lowerCards += cardsPerValue;
    }

    // Equal cards (same value)
    const equalCards = cardsPerValue - 1; // Minus current card

    // Probabilities
    const higherProb = (higherCards / totalRemainingCards * 100).toFixed(2);
    const lowerProb = (lowerCards / totalRemainingCards * 100).toFixed(2);
    const equalProb = (equalCards / totalRemainingCards * 100).toFixed(2);

    // Optimal decision
    const higherP = parseFloat(higherProb);
    const lowerP = parseFloat(lowerProb);
    const decision = higherP > lowerP ? 'HIGHER' : 
                    lowerP > higherP ? 'LOWER' : 'SKIP (Equal odds)';

    setResults({
      higherProb,
      lowerProb,
      equalProb,
      higherCards,
      lowerCards,
      equalCards,
      decision,
      edge: Math.abs(higherP - lowerP).toFixed(2)
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-secondary)'}}>
          🎴 HILO CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate optimal higher/lower decision
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Current Card</label>
        <select 
          className="form-input"
          value={currentCard}
          onChange={(e) => setCurrentCard(e.target.value)}
          data-testid="hilo-calc-current-card"
        >
          {cards.map(card => (
            <option key={card} value={card}>{card}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Cards Remaining in Deck</label>
        <input
          type="number"
          className="form-input"
          value={cardsRemaining}
          onChange={(e) => setCardsRemaining(parseInt(e.target.value) || 52)}
          min="2"
          max="52"
          data-testid="hilo-calc-cards-remaining"
        />
      </div>

      <button 
        onClick={calculateHiLo} 
        className="btn btn-primary btn-full"
        data-testid="hilo-calc-submit"
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
        }} data-testid="hilo-calc-results">
          <div style={{
            padding: '16px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '2px solid var(--accent-primary)',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px'}}>
              OPTIMAL DECISION
            </div>
            <div style={{fontSize: '32px', fontWeight: '700', color: 'var(--accent-primary)'}}>
              {results.decision}
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px'}}>
              Edge: {results.edge}%
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px'}}>
            <div style={{textAlign: 'center', padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px'}}>
              <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--accent-success)'}}>{results.higherProb}%</div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px'}}>HIGHER</div>
              <div style={{fontSize: '10px', color: 'var(--text-muted)'}}>({results.higherCards} cards)</div>
            </div>
            <div style={{textAlign: 'center', padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px'}}>
              <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--accent-warning)'}}>{results.equalProb}%</div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px'}}>EQUAL</div>
              <div style={{fontSize: '10px', color: 'var(--text-muted)'}}>({results.equalCards} cards)</div>
            </div>
            <div style={{textAlign: 'center', padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px'}}>
              <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--accent-danger)'}}>{results.lowerProb}%</div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px'}}>LOWER</div>
              <div style={{fontSize: '10px', color: 'var(--text-muted)'}}>({results.lowerCards} cards)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dice Calculator Component
export function DiceCalculator() {
  const [targetNumber, setTargetNumber] = useState(50);
  const [rollOver, setRollOver] = useState(true);
  const [betAmount, setBetAmount] = useState(10);
  const [results, setResults] = useState(null);

  const calculateDice = () => {
    // Dice typically rolls 0-100 (101 possible outcomes)
    const totalOutcomes = 10000; // Using 100.00 precision
    
    let winningOutcomes;
    if (rollOver) {
      // Roll OVER target (e.g., over 50.00 means 50.01 to 100.00)
      winningOutcomes = (10000 - (targetNumber * 100));
    } else {
      // Roll UNDER target (e.g., under 50.00 means 0.00 to 49.99)
      winningOutcomes = (targetNumber * 100);
    }

    const winProbability = (winningOutcomes / totalOutcomes * 100).toFixed(2);
    
    // House edge typically 1-2% for dice games
    const houseEdge = 1.0;
    const fairMultiplier = (100 / parseFloat(winProbability)).toFixed(4);
    const actualMultiplier = (fairMultiplier * (1 - houseEdge / 100)).toFixed(4);
    
    const potentialWin = (betAmount * actualMultiplier).toFixed(2);
    const potentialProfit = (potentialWin - betAmount).toFixed(2);
    
    // Expected value
    const ev = ((potentialWin * parseFloat(winProbability) / 100) - betAmount).toFixed(4);

    setResults({
      winProbability,
      actualMultiplier,
      fairMultiplier,
      potentialWin,
      potentialProfit,
      houseEdge: houseEdge.toFixed(1),
      expectedValue: ev,
      winningOutcomes: (winningOutcomes / 100).toFixed(2),
      totalOutcomes: (totalOutcomes / 100).toFixed(2)
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-cyan)'}}>
          🎲 DICE CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate win probability and payout for dice rolls
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
          data-testid="dice-calc-bet-amount"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Roll Direction</label>
        <div style={{display: 'flex', gap: '12px'}}>
          <button
            className={`btn ${rollOver ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setRollOver(true)}
            style={{flex: 1}}
            data-testid="dice-calc-roll-over"
          >
            OVER
          </button>
          <button
            className={`btn ${!rollOver ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setRollOver(false)}
            style={{flex: 1}}
            data-testid="dice-calc-roll-under"
          >
            UNDER
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Target Number (0.00 - 100.00)</label>
        <input
          type="number"
          className="form-input"
          value={targetNumber}
          onChange={(e) => setTargetNumber(parseFloat(e.target.value) || 0)}
          min="0.01"
          max="99.99"
          step="0.01"
          data-testid="dice-calc-target"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          {rollOver ? `Win if result > ${targetNumber}` : `Win if result < ${targetNumber}`}
        </small>
      </div>

      <button 
        onClick={calculateDice} 
        className="btn btn-primary btn-full"
        data-testid="dice-calc-submit"
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
        }} data-testid="dice-calc-results">
          <h3 style={{fontSize: '18px', marginBottom: '16px', color: 'var(--text-primary)'}}>
            RESULTS
          </h3>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>WIN PROBABILITY</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)'}}>{results.winProbability}%</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>MULTIPLIER</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)'}}>{results.actualMultiplier}x</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>POTENTIAL WIN</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-cyan)'}}>${results.potentialWin}</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>PROFIT</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: results.potentialProfit >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'}}>${results.potentialProfit}</div>
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: 'var(--bg-primary)',
            borderRadius: '8px'
          }}>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px'}}>
              House Edge: {results.houseEdge}% • EV: {results.expectedValue}
            </div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Monaco, monospace'}}>
              Winning outcomes: {results.winningOutcomes} / {results.totalOutcomes}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Plinko Calculator Component
export function PlinkoCalculator() {
  const [rows, setRows] = useState(16);
  const [riskLevel, setRiskLevel] = useState('medium');
  const [betAmount, setBetAmount] = useState(10);
  const [results, setResults] = useState(null);

  const calculatePlinko = () => {
    // Simplified Plinko math - binomial distribution
    // Each row: 50/50 left or right decision
    
    const totalPaths = Math.pow(2, rows);
    
    // Multipliers vary by risk level and final position
    const multiplierSets = {
      low: [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5],
      medium: [8, 3, 1.5, 1, 0.5, 0.3, 0.2, 0.2, 0.2, 0.3, 0.5, 1, 1.5, 3, 8],
      high: [50, 10, 3, 1, 0.2, 0.1, 0.1, 0, 0.1, 0.1, 0.1, 0.2, 1, 3, 10, 50]
    };

    const multipliers = multiplierSets[riskLevel];
    
    // Calculate probability for each bucket using binomial distribution
    const buckets = [];
    let totalEV = 0;
    
    for (let i = 0; i <= rows; i++) {
      // Binomial probability: C(n,k) * (0.5)^n
      const combinations = factorial(rows) / (factorial(i) * factorial(rows - i));
      const probability = combinations / totalPaths;
      const multiplier = multipliers[Math.min(i, multipliers.length - 1)] || 1;
      
      const ev = probability * multiplier;
      totalEV += ev;
      
      buckets.push({
        position: i,
        probability: (probability * 100).toFixed(4),
        multiplier: multiplier,
        ev: ev.toFixed(4)
      });
    }

    const potentialWin = (betAmount * totalEV).toFixed(2);
    const houseEdge = ((1 - totalEV) * 100).toFixed(2);
    const expectedValue = (potentialWin - betAmount).toFixed(2);

    setResults({
      buckets: buckets.slice(0, 10), // Show top 10
      totalEV: totalEV.toFixed(4),
      potentialWin,
      houseEdge,
      expectedValue,
      totalPaths: totalPaths.toLocaleString()
    });
  };

  function factorial(n) {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-pink)'}}>
          🎯 PLINKO CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate probability distribution and expected value
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
          data-testid="plinko-calc-bet-amount"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Number of Rows</label>
        <select 
          className="form-input"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
          data-testid="plinko-calc-rows"
        >
          <option value={8}>8 Rows</option>
          <option value={12}>12 Rows</option>
          <option value={16}>16 Rows (Default)</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Risk Level</label>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px'}}>
          <button
            className={`btn ${riskLevel === 'low' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setRiskLevel('low')}
            data-testid="plinko-calc-risk-low"
          >
            LOW
          </button>
          <button
            className={`btn ${riskLevel === 'medium' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setRiskLevel('medium')}
            data-testid="plinko-calc-risk-medium"
          >
            MEDIUM
          </button>
          <button
            className={`btn ${riskLevel === 'high' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setRiskLevel('high')}
            data-testid="plinko-calc-risk-high"
          >
            HIGH
          </button>
        </div>
      </div>

      <button 
        onClick={calculatePlinko} 
        className="btn btn-primary btn-full"
        data-testid="plinko-calc-submit"
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
        }} data-testid="plinko-calc-results">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>EXPECTED RETURN</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)'}}>${results.potentialWin}</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>EXPECTED PROFIT</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: results.expectedValue >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'}}>${results.expectedValue}</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>HOUSE EDGE</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-warning)'}}>{results.houseEdge}%</div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>TOTAL PATHS</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)'}}>{results.totalPaths}</div>
            </div>
          </div>

          <div style={{fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px', padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px'}}>
            ℹ️ Expected Value (EV): {results.totalEV} • Risk: {riskLevel.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
}

// Limbo Calculator Component
export function LimboCalculator() {
  const [targetMultiplier, setTargetMultiplier] = useState(2.00);
  const [betAmount, setBetAmount] = useState(10);
  const [results, setResults] = useState(null);

  const calculateLimbo = () => {
    // Limbo: crash at random multiplier, you set target
    const target = parseFloat(targetMultiplier);
    
    if (target < 1.01) {
      alert('Target multiplier must be at least 1.01x');
      return;
    }

    // House edge typically 1%
    const houseEdge = 1.0;
    
    // Win probability = (100 - house_edge) / target_multiplier
    const winProbability = ((100 - houseEdge) / target).toFixed(2);
    
    const potentialWin = (betAmount * target).toFixed(2);
    const potentialProfit = (potentialWin - betAmount).toFixed(2);
    
    // Expected value
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
              House Edge: {results.houseEdge}% • Negative EV means house advantage
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default { MinesCalculator, HiLoCalculator, DiceCalculator, PlinkoCalculator, LimboCalculator };
