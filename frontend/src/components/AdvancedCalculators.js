import React, { useState } from 'react';

// Kelly Criterion Calculator
export function KellyCriterionCalculator() {
  const [bankroll, setBankroll] = useState(1000);
  const [winProbability, setWinProbability] = useState(55);
  const [odds, setOdds] = useState(2.0);
  const [kellyFraction, setKellyFraction] = useState(0.25);
  const [result, setResult] = useState(null);

  const calculateKelly = () => {
    const p = parseFloat(winProbability) / 100;
    const q = 1 - p;
    const b = parseFloat(odds) - 1; // Net odds

    // Kelly formula: f* = (bp - q) / b
    const kellyPercentage = ((b * p - q) / b) * 100;
    
    // Apply fractional Kelly
    const fraction = parseFloat(kellyFraction);
    const adjustedKelly = kellyPercentage * fraction;
    
    // Calculate bet sizes
    const fullKellyBet = (kellyPercentage / 100) * bankroll;
    const fractionalKellyBet = (adjustedKelly / 100) * bankroll;
    
    // Expected value
    const ev = (p * (bankroll * b)) - (q * bankroll);
    const evPercentage = (ev / bankroll) * 100;

    setResult({
      fullKellyPercentage: kellyPercentage.toFixed(2),
      fractionalKellyPercentage: adjustedKelly.toFixed(2),
      fullKellyBet: fullKellyBet.toFixed(2),
      fractionalKellyBet: fractionalKellyBet.toFixed(2),
      expectedValue: ev.toFixed(2),
      evPercentage: evPercentage.toFixed(2),
      recommendation: kellyPercentage > 0 ? 'POSITIVE EDGE' : 'NEGATIVE EDGE',
      isPositive: kellyPercentage > 0
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-primary)'}}>
          📊 KELLY CRITERION CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate optimal bet sizing based on your edge and bankroll
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Bankroll ($)</label>
        <input
          type="number"
          className="form-input"
          value={bankroll}
          onChange={(e) => setBankroll(parseFloat(e.target.value) || 0)}
          min="0"
          step="100"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Win Probability (%)</label>
        <input
          type="number"
          className="form-input"
          value={winProbability}
          onChange={(e) => setWinProbability(parseFloat(e.target.value) || 0)}
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Decimal Odds</label>
        <input
          type="number"
          className="form-input"
          value={odds}
          onChange={(e) => setOdds(parseFloat(e.target.value) || 1)}
          min="1"
          step="0.01"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          2.0 odds = 1:1 payout
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Kelly Fraction (Conservative: 0.25-0.5)</label>
        <input
          type="number"
          className="form-input"
          value={kellyFraction}
          onChange={(e) => setKellyFraction(parseFloat(e.target.value) || 0)}
          min="0"
          max="1"
          step="0.05"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          1.0 = Full Kelly (aggressive), 0.25 = Quarter Kelly (conservative)
        </small>
      </div>

      <button onClick={calculateKelly} className="btn btn-primary btn-full">
        CALCULATE OPTIMAL BET
      </button>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: result.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `2px solid ${result.isPositive ? 'var(--accent-success)' : 'var(--accent-danger)'}`,
          borderRadius: '12px'
        }}>
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <div style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px'}}>
              RECOMMENDATION
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: result.isPositive ? 'var(--accent-success)' : 'var(--accent-danger)'
            }}>
              {result.recommendation}
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>FULL KELLY %</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)'}}>
                {result.fullKellyPercentage}%
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>FRACTIONAL KELLY %</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-secondary)'}}>
                {result.fractionalKellyPercentage}%
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>FULL BET SIZE</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)'}}>
                ${result.fullKellyBet}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>RECOMMENDED BET</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)'}}>
                ${result.fractionalKellyBet}
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: 'var(--bg-primary)',
            borderRadius: '8px'
          }}>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)'}}>
              Expected Value: <span style={{fontWeight: '700', color: result.isPositive ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                ${result.expectedValue} ({result.evPercentage}%)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Bankroll Management Calculator
export function BankrollCalculator() {
  const [startingBankroll, setStartingBankroll] = useState(1000);
  const [betSize, setBetSize] = useState(10);
  const [numberOfBets, setNumberOfBets] = useState(100);
  const [winRate, setWinRate] = useState(55);
  const [avgOdds, setAvgOdds] = useState(2.0);
  const [result, setResult] = useState(null);

  const calculateBankroll = () => {
    const wins = Math.floor(numberOfBets * (winRate / 100));
    const losses = numberOfBets - wins;
    
    const totalWinAmount = wins * betSize * (avgOdds - 1);
    const totalLossAmount = losses * betSize;
    
    const finalBankroll = startingBankroll + totalWinAmount - totalLossAmount;
    const profit = finalBankroll - startingBankroll;
    const roi = (profit / startingBankroll) * 100;
    
    // Risk metrics
    const maxDrawdown = losses * betSize;
    const riskedPercentage = (betSize / startingBankroll) * 100;

    setResult({
      finalBankroll: finalBankroll.toFixed(2),
      profit: profit.toFixed(2),
      roi: roi.toFixed(2),
      wins,
      losses,
      totalWinAmount: totalWinAmount.toFixed(2),
      totalLossAmount: totalLossAmount.toFixed(2),
      maxDrawdown: maxDrawdown.toFixed(2),
      riskedPercentage: riskedPercentage.toFixed(2),
      isProfitable: profit > 0
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-secondary)'}}>
          💰 BANKROLL MANAGEMENT CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Simulate bankroll growth and risk over multiple bets
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Starting Bankroll ($)</label>
        <input
          type="number"
          className="form-input"
          value={startingBankroll}
          onChange={(e) => setStartingBankroll(parseFloat(e.target.value) || 0)}
          min="0"
          step="100"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Bet Size ($)</label>
        <input
          type="number"
          className="form-input"
          value={betSize}
          onChange={(e) => setBetSize(parseFloat(e.target.value) || 0)}
          min="0"
          step="5"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Number of Bets</label>
        <input
          type="number"
          className="form-input"
          value={numberOfBets}
          onChange={(e) => setNumberOfBets(parseInt(e.target.value) || 0)}
          min="1"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Win Rate (%)</label>
        <input
          type="number"
          className="form-input"
          value={winRate}
          onChange={(e) => setWinRate(parseFloat(e.target.value) || 0)}
          min="0"
          max="100"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Average Odds (Decimal)</label>
        <input
          type="number"
          className="form-input"
          value={avgOdds}
          onChange={(e) => setAvgOdds(parseFloat(e.target.value) || 1)}
          min="1"
          step="0.1"
        />
      </div>

      <button onClick={calculateBankroll} className="btn btn-primary btn-full">
        SIMULATE BANKROLL
      </button>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: result.isProfitable ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `2px solid ${result.isProfitable ? 'var(--accent-success)' : 'var(--accent-danger)'}`,
          borderRadius: '12px'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>FINAL BANKROLL</div>
              <div style={{fontSize: '32px', fontWeight: '700', color: result.isProfitable ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                ${result.finalBankroll}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>PROFIT/LOSS</div>
              <div style={{fontSize: '32px', fontWeight: '700', color: result.isProfitable ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                {result.profit > 0 ? '+' : ''}{result.profit}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>ROI</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: result.isProfitable ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                {result.roi > 0 ? '+' : ''}{result.roi}%
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>RISK PER BET</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-warning)'}}>
                {result.riskedPercentage}%
              </div>
            </div>
          </div>

          <div style={{
            padding: '16px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            fontSize: '12px',
            lineHeight: '1.8'
          }}>
            <div><span style={{color: 'var(--text-muted)'}}>Wins:</span> <span style={{color: 'var(--accent-success)'}}>{result.wins}</span> | <span style={{color: 'var(--text-muted)'}}>Losses:</span> <span style={{color: 'var(--accent-danger)'}}>{result.losses}</span></div>
            <div><span style={{color: 'var(--text-muted)'}}>Total Won:</span> <span style={{color: 'var(--accent-success)'}}>${result.totalWinAmount}</span></div>
            <div><span style={{color: 'var(--text-muted)'}}>Total Lost:</span> <span style={{color: 'var(--accent-danger)'}}>${result.totalLossAmount}</span></div>
            <div><span style={{color: 'var(--text-muted)'}}>Max Drawdown:</span> <span style={{color: 'var(--accent-warning)'}}>${result.maxDrawdown}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Risk of Ruin Calculator
export function RiskOfRuinCalculator() {
  const [bankroll, setBankroll] = useState(1000);
  const [betSize, setBetSize] = useState(50);
  const [winRate, setWinRate] = useState(52);
  const [result, setResult] = useState(null);

  const calculateROR = () => {
    const p = parseFloat(winRate) / 100;
    const q = 1 - p;
    const units = bankroll / betSize;
    
    // Simplified Risk of Ruin formula
    // RoR = ((1-p)/p)^units for even money bets
    let ror;
    if (p > 0.5) {
      ror = Math.pow(q / p, units) * 100;
    } else if (p === 0.5) {
      ror = 100; // Coin flip, certain ruin with finite bankroll
    } else {
      ror = 100; // Negative edge = certain ruin
    }

    const survivalRate = 100 - ror;

    setResult({
      riskOfRuin: ror.toFixed(4),
      survivalRate: survivalRate.toFixed(2),
      totalUnits: units.toFixed(1),
      edge: ((p - q) * 100).toFixed(2),
      isPositiveEdge: p > 0.5
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-danger)'}}>
          ⚠️ RISK OF RUIN CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate probability of losing entire bankroll
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Bankroll ($)</label>
        <input
          type="number"
          className="form-input"
          value={bankroll}
          onChange={(e) => setBankroll(parseFloat(e.target.value) || 0)}
          min="0"
          step="100"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Bet Size ($)</label>
        <input
          type="number"
          className="form-input"
          value={betSize}
          onChange={(e) => setBetSize(parseFloat(e.target.value) || 0)}
          min="0"
          step="5"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Win Rate (%)</label>
        <input
          type="number"
          className="form-input"
          value={winRate}
          onChange={(e) => setWinRate(parseFloat(e.target.value) || 0)}
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      <button onClick={calculateROR} className="btn btn-primary btn-full">
        CALCULATE RISK
      </button>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid var(--accent-danger)',
          borderRadius: '12px'
        }}>
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <div style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px'}}>
              RISK OF RUIN
            </div>
            <div style={{fontSize: '48px', fontWeight: '700', color: 'var(--accent-danger)'}}>
              {result.riskOfRuin}%
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>SURVIVAL RATE</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)'}}>
                {result.survivalRate}%
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>YOUR EDGE</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: result.isPositiveEdge ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                {result.edge > 0 ? '+' : ''}{result.edge}%
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>TOTAL UNITS</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)'}}>
                {result.totalUnits}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>RISK PER BET</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-warning)'}}>
                {((betSize / bankroll) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: 'var(--bg-primary)',
            borderRadius: '8px'
          }}>
            <div style={{fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
              💡 Lower risk = Smaller bet size relative to bankroll. Recommended: 1-5% per bet.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Monthly Boost / RTP Reality Check Calculator
export function MonthlyBoostCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(500);
  const [rtp, setRtp] = useState(96);
  const [sessionsPerMonth, setSessionsPerMonth] = useState(20);
  const [avgBetSize, setAvgBetSize] = useState(5);
  const [betsPerSession, setBetsPerSession] = useState(100);
  const [result, setResult] = useState(null);

  const calculateMonthly = () => {
    const totalBets = sessionsPerMonth * betsPerSession;
    const totalWagered = totalBets * avgBetSize;
    const expectedReturn = totalWagered * (rtp / 100);
    const expectedLoss = totalWagered - expectedReturn;
    const houseEdge = 100 - rtp;
    
    // Net result
    const netResult = monthlyDeposit - expectedLoss;
    const remainingBankroll = netResult > 0 ? netResult : 0;
    
    // Time estimate
    const avgSessionTime = (betsPerSession * 0.5) / 60; // Assuming 0.5 min per bet

    setResult({
      totalWagered: totalWagered.toFixed(2),
      expectedReturn: expectedReturn.toFixed(2),
      expectedLoss: expectedLoss.toFixed(2),
      netResult: netResult.toFixed(2),
      remainingBankroll: remainingBankroll.toFixed(2),
      houseEdge: houseEdge.toFixed(2),
      totalBets: totalBets.toLocaleString(),
      totalSessionTime: (sessionsPerMonth * avgSessionTime).toFixed(1),
      lossPerHour: (expectedLoss / (sessionsPerMonth * avgSessionTime)).toFixed(2),
      isProfitable: netResult > 0
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-cyan)'}}>
          📅 MONTHLY BOOST / RTP REALITY CHECK
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate expected monthly results based on RTP and play volume
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Monthly Deposit ($)</label>
        <input
          type="number"
          className="form-input"
          value={monthlyDeposit}
          onChange={(e) => setMonthlyDeposit(parseFloat(e.target.value) || 0)}
          min="0"
          step="50"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Game RTP (%)</label>
        <input
          type="number"
          className="form-input"
          value={rtp}
          onChange={(e) => setRtp(parseFloat(e.target.value) || 0)}
          min="0"
          max="100"
          step="0.1"
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          Return to Player percentage (e.g., 96% = 4% house edge)
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Sessions Per Month</label>
        <input
          type="number"
          className="form-input"
          value={sessionsPerMonth}
          onChange={(e) => setSessionsPerMonth(parseInt(e.target.value) || 0)}
          min="1"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Bets Per Session</label>
        <input
          type="number"
          className="form-input"
          value={betsPerSession}
          onChange={(e) => setBetsPerSession(parseInt(e.target.value) || 0)}
          min="1"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Average Bet Size ($)</label>
        <input
          type="number"
          className="form-input"
          value={avgBetSize}
          onChange={(e) => setAvgBetSize(parseFloat(e.target.value) || 0)}
          min="0"
          step="0.5"
        />
      </div>

      <button onClick={calculateMonthly} className="btn btn-primary btn-full">
        CALCULATE MONTHLY OUTLOOK
      </button>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: result.isProfitable ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `2px solid ${result.isProfitable ? 'var(--accent-success)' : 'var(--accent-danger)'}`,
          borderRadius: '12px'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>TOTAL WAGERED</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)'}}>
                ${result.totalWagered}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>EXPECTED LOSS</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--accent-danger)'}}>
                ${result.expectedLoss}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>NET RESULT</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: result.isProfitable ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                {result.netResult > 0 ? '+' : ''}{result.netResult}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>HOUSE EDGE</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--accent-warning)'}}>
                {result.houseEdge}%
              </div>
            </div>
          </div>

          <div style={{
            padding: '16px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            fontSize: '12px',
            lineHeight: '1.8'
          }}>
            <div><span style={{color: 'var(--text-muted)'}}>Total Bets:</span> <span style={{color: 'var(--text-primary)'}}>{result.totalBets}</span></div>
            <div><span style={{color: 'var(--text-muted)'}}>Total Play Time:</span> <span style={{color: 'var(--text-primary)'}}>{result.totalSessionTime} hours</span></div>
            <div><span style={{color: 'var(--text-muted)'}}>Expected Loss Per Hour:</span> <span style={{color: 'var(--accent-danger)'}}>${result.lossPerHour}/hr</span></div>
            <div><span style={{color: 'var(--text-muted)'}}>Expected Return:</span> <span style={{color: 'var(--accent-success)'}}>${result.expectedReturn}</span></div>
          </div>

          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid var(--accent-warning)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}>
            ⚠️ <strong>Reality Check:</strong> This is the EXPECTED mathematical outcome. Actual results will vary due to variance. Set loss limits and play responsibly.
          </div>
        </div>
      )}
    </div>
  );
}

// Variance Calculator
export function VarianceCalculator() {
  const [numberOfBets, setNumberOfBets] = useState(1000);
  const [betSize, setBetSize] = useState(10);
  const [winProbability, setWinProbability] = useState(50);
  const [odds, setOdds] = useState(2.0);
  const [result, setResult] = useState(null);

  const calculateVariance = () => {
    const n = parseInt(numberOfBets);
    const bet = parseFloat(betSize);
    const p = parseFloat(winProbability) / 100;
    const q = 1 - p;
    const b = parseFloat(odds) - 1; // Net odds (profit on win)

    // Expected value per bet
    const evPerBet = (p * b * bet) - (q * bet);
    const totalEV = evPerBet * n;

    // Variance per bet: p * (win_amount - EV)^2 + q * (loss_amount - EV)^2
    const winAmount = b * bet;
    const lossAmount = -bet;
    const variancePerBet = p * Math.pow(winAmount - evPerBet, 2) + q * Math.pow(lossAmount - evPerBet, 2);
    
    // Standard deviation per bet
    const sdPerBet = Math.sqrt(variancePerBet);
    
    // Total variance and SD for n bets
    const totalVariance = variancePerBet * n;
    const totalSD = Math.sqrt(totalVariance);

    // Confidence intervals (68%, 95%, 99.7%)
    const ci68Low = (totalEV - totalSD).toFixed(2);
    const ci68High = (totalEV + totalSD).toFixed(2);
    const ci95Low = (totalEV - 2 * totalSD).toFixed(2);
    const ci95High = (totalEV + 2 * totalSD).toFixed(2);
    const ci997Low = (totalEV - 3 * totalSD).toFixed(2);
    const ci997High = (totalEV + 3 * totalSD).toFixed(2);

    // Probability of profit
    const zScore = totalEV / totalSD;
    const probProfit = (0.5 * (1 + erf(zScore / Math.sqrt(2)))) * 100;

    setResult({
      evPerBet: evPerBet.toFixed(4),
      totalEV: totalEV.toFixed(2),
      variancePerBet: variancePerBet.toFixed(4),
      sdPerBet: sdPerBet.toFixed(4),
      totalSD: totalSD.toFixed(2),
      ci68: { low: ci68Low, high: ci68High },
      ci95: { low: ci95Low, high: ci95High },
      ci997: { low: ci997Low, high: ci997High },
      probProfit: probProfit.toFixed(2),
      isProfitableEV: totalEV > 0
    });
  };

  // Error function approximation
  function erf(x) {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-purple)'}}>
          📈 VARIANCE CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate expected swings and confidence intervals for your betting
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Number of Bets</label>
        <input
          type="number"
          className="form-input"
          value={numberOfBets}
          onChange={(e) => setNumberOfBets(parseInt(e.target.value) || 0)}
          min="1"
          step="100"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Bet Size ($)</label>
        <input
          type="number"
          className="form-input"
          value={betSize}
          onChange={(e) => setBetSize(parseFloat(e.target.value) || 0)}
          min="0"
          step="5"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Win Probability (%)</label>
        <input
          type="number"
          className="form-input"
          value={winProbability}
          onChange={(e) => setWinProbability(parseFloat(e.target.value) || 0)}
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Decimal Odds</label>
        <input
          type="number"
          className="form-input"
          value={odds}
          onChange={(e) => setOdds(parseFloat(e.target.value) || 1)}
          min="1.01"
          step="0.01"
        />
      </div>

      <button onClick={calculateVariance} className="btn btn-primary btn-full">
        CALCULATE VARIANCE
      </button>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: result.isProfitableEV ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `2px solid ${result.isProfitableEV ? 'var(--accent-success)' : 'var(--accent-danger)'}`,
          borderRadius: '12px'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>EXPECTED VALUE</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: result.isProfitableEV ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                {result.totalEV > 0 ? '+' : ''}${result.totalEV}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>STANDARD DEVIATION</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--accent-warning)'}}>
                ±${result.totalSD}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>PROB. OF PROFIT</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: parseFloat(result.probProfit) > 50 ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                {result.probProfit}%
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>EV PER BET</div>
              <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)'}}>
                ${result.evPerBet}
              </div>
            </div>
          </div>

          <div style={{
            padding: '16px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <div style={{fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px'}}>
              CONFIDENCE INTERVALS
            </div>
            <div style={{fontSize: '12px', lineHeight: '1.8'}}>
              <div>
                <span style={{color: 'var(--text-muted)'}}>68% chance:</span>{' '}
                <span style={{color: 'var(--accent-success)'}}>${result.ci68.low}</span>
                <span style={{color: 'var(--text-muted)'}}> to </span>
                <span style={{color: 'var(--accent-success)'}}>${result.ci68.high}</span>
              </div>
              <div>
                <span style={{color: 'var(--text-muted)'}}>95% chance:</span>{' '}
                <span style={{color: 'var(--accent-warning)'}}>${result.ci95.low}</span>
                <span style={{color: 'var(--text-muted)'}}> to </span>
                <span style={{color: 'var(--accent-warning)'}}>${result.ci95.high}</span>
              </div>
              <div>
                <span style={{color: 'var(--text-muted)'}}>99.7% chance:</span>{' '}
                <span style={{color: 'var(--accent-danger)'}}>${result.ci997.low}</span>
                <span style={{color: 'var(--text-muted)'}}> to </span>
                <span style={{color: 'var(--accent-danger)'}}>${result.ci997.high}</span>
              </div>
            </div>
          </div>

          <div style={{
            padding: '12px',
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '8px',
            fontSize: '11px',
            color: 'var(--text-secondary)'
          }}>
            💡 Variance shows how much your results can swing. Higher variance = bigger swings from expected value.
          </div>
        </div>
      )}
    </div>
  );
}

// Sports Betting Calculator (Parlay & Arbitrage)
export function SportsBettingCalculator() {
  const [calcType, setCalcType] = useState('parlay');
  
  // Parlay state
  const [parlayLegs, setParlayLegs] = useState([
    { odds: 2.0, probability: 50 },
    { odds: 1.8, probability: 55.56 }
  ]);
  const [parlayStake, setParlayStake] = useState(10);

  // Arbitrage state
  const [arbOdds1, setArbOdds1] = useState(2.10);
  const [arbOdds2, setArbOdds2] = useState(2.05);
  const [arbStake, setArbStake] = useState(100);

  const [result, setResult] = useState(null);

  const addParlayLeg = () => {
    setParlayLegs([...parlayLegs, { odds: 2.0, probability: 50 }]);
  };

  const removeParlayLeg = (index) => {
    if (parlayLegs.length > 2) {
      setParlayLegs(parlayLegs.filter((_, i) => i !== index));
    }
  };

  const updateParlayLeg = (index, field, value) => {
    const updated = [...parlayLegs];
    updated[index][field] = parseFloat(value) || 0;
    // Auto-calculate implied probability when odds change
    if (field === 'odds') {
      updated[index].probability = ((1 / parseFloat(value)) * 100).toFixed(2);
    }
    setParlayLegs(updated);
  };

  const calculateParlay = () => {
    const totalOdds = parlayLegs.reduce((acc, leg) => acc * leg.odds, 1);
    const totalProbability = parlayLegs.reduce((acc, leg) => acc * (leg.probability / 100), 1) * 100;
    const potentialPayout = parlayStake * totalOdds;
    const potentialProfit = potentialPayout - parlayStake;
    
    // Expected value
    const ev = (potentialPayout * (totalProbability / 100)) - parlayStake;

    setResult({
      type: 'parlay',
      totalOdds: totalOdds.toFixed(2),
      totalProbability: totalProbability.toFixed(4),
      potentialPayout: potentialPayout.toFixed(2),
      potentialProfit: potentialProfit.toFixed(2),
      expectedValue: ev.toFixed(2),
      numLegs: parlayLegs.length,
      isPositiveEV: ev > 0
    });
  };

  const calculateArbitrage = () => {
    const odds1 = parseFloat(arbOdds1);
    const odds2 = parseFloat(arbOdds2);
    const totalStake = parseFloat(arbStake);

    // Arbitrage margin calculation
    const margin = (1 / odds1 + 1 / odds2);
    const isArbitrage = margin < 1;
    
    // Calculate stakes for each outcome
    const stake1 = (totalStake * (1 / odds1)) / margin;
    const stake2 = (totalStake * (1 / odds2)) / margin;
    
    // Guaranteed profit
    const payout1 = stake1 * odds1;
    const payout2 = stake2 * odds2;
    const guaranteedPayout = Math.min(payout1, payout2);
    const profit = guaranteedPayout - totalStake;
    const profitPercentage = (profit / totalStake) * 100;

    setResult({
      type: 'arbitrage',
      isArbitrage,
      margin: (margin * 100).toFixed(2),
      stake1: stake1.toFixed(2),
      stake2: stake2.toFixed(2),
      payout1: payout1.toFixed(2),
      payout2: payout2.toFixed(2),
      guaranteedPayout: guaranteedPayout.toFixed(2),
      profit: profit.toFixed(2),
      profitPercentage: profitPercentage.toFixed(2)
    });
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-success)'}}>
          🏆 SPORTS BETTING CALCULATOR
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Calculate parlays, accumulators, and arbitrage opportunities
        </p>
      </div>

      {/* Calculator Type Selector */}
      <div style={{display: 'flex', gap: '12px', marginBottom: '24px'}}>
        <button
          className={`btn ${calcType === 'parlay' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => { setCalcType('parlay'); setResult(null); }}
          style={{flex: 1}}
        >
          PARLAY
        </button>
        <button
          className={`btn ${calcType === 'arbitrage' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => { setCalcType('arbitrage'); setResult(null); }}
          style={{flex: 1}}
        >
          ARBITRAGE
        </button>
      </div>

      {calcType === 'parlay' && (
        <>
          <div className="form-group">
            <label className="form-label">Stake ($)</label>
            <input
              type="number"
              className="form-input"
              value={parlayStake}
              onChange={(e) => setParlayStake(parseFloat(e.target.value) || 0)}
              min="0"
              step="5"
            />
          </div>

          <div style={{marginBottom: '16px'}}>
            <label className="form-label">Parlay Legs</label>
            {parlayLegs.map((leg, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '8px',
                alignItems: 'center'
              }}>
                <span style={{color: 'var(--text-muted)', fontSize: '12px', width: '24px'}}>
                  {index + 1}.
                </span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Odds"
                  value={leg.odds}
                  onChange={(e) => updateParlayLeg(index, 'odds', e.target.value)}
                  style={{flex: 1}}
                  min="1.01"
                  step="0.01"
                />
                <span style={{color: 'var(--text-muted)', fontSize: '11px'}}>
                  ({leg.probability}%)
                </span>
                {parlayLegs.length > 2 && (
                  <button
                    onClick={() => removeParlayLeg(index)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: 'none',
                      color: 'var(--accent-danger)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addParlayLeg}
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px dashed var(--accent-primary)',
                color: 'var(--accent-primary)',
                padding: '10px',
                borderRadius: '8px',
                width: '100%',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              + Add Leg
            </button>
          </div>

          <button onClick={calculateParlay} className="btn btn-primary btn-full">
            CALCULATE PARLAY
          </button>
        </>
      )}

      {calcType === 'arbitrage' && (
        <>
          <div className="form-group">
            <label className="form-label">Total Stake ($)</label>
            <input
              type="number"
              className="form-input"
              value={arbStake}
              onChange={(e) => setArbStake(parseFloat(e.target.value) || 0)}
              min="0"
              step="10"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Odds - Outcome 1 (e.g., Team A to Win)</label>
            <input
              type="number"
              className="form-input"
              value={arbOdds1}
              onChange={(e) => setArbOdds1(parseFloat(e.target.value) || 1)}
              min="1.01"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Odds - Outcome 2 (e.g., Team B to Win)</label>
            <input
              type="number"
              className="form-input"
              value={arbOdds2}
              onChange={(e) => setArbOdds2(parseFloat(e.target.value) || 1)}
              min="1.01"
              step="0.01"
            />
            <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
              Find different odds at different bookmakers for arbitrage opportunities
            </small>
          </div>

          <button onClick={calculateArbitrage} className="btn btn-primary btn-full">
            CALCULATE ARBITRAGE
          </button>
        </>
      )}

      {/* Parlay Result */}
      {result && result.type === 'parlay' && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '2px solid var(--accent-primary)',
          borderRadius: '12px'
        }}>
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <div style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px'}}>
              {result.numLegs}-LEG PARLAY
            </div>
            <div style={{fontSize: '42px', fontWeight: '700', color: 'var(--accent-primary)'}}>
              {result.totalOdds}x
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>POTENTIAL PAYOUT</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)'}}>
                ${result.potentialPayout}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>POTENTIAL PROFIT</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)'}}>
                +${result.potentialProfit}
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>WIN PROBABILITY</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-warning)'}}>
                {result.totalProbability}%
              </div>
            </div>
            <div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>EXPECTED VALUE</div>
              <div style={{fontSize: '24px', fontWeight: '700', color: result.isPositiveEV ? 'var(--accent-success)' : 'var(--accent-danger)'}}>
                {result.expectedValue > 0 ? '+' : ''}${result.expectedValue}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Arbitrage Result */}
      {result && result.type === 'arbitrage' && (
        <div style={{
          marginTop: '30px',
          padding: '24px',
          background: result.isArbitrage ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `2px solid ${result.isArbitrage ? 'var(--accent-success)' : 'var(--accent-danger)'}`,
          borderRadius: '12px'
        }}>
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <div style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px'}}>
              ARBITRAGE STATUS
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: result.isArbitrage ? 'var(--accent-success)' : 'var(--accent-danger)'
            }}>
              {result.isArbitrage ? '✓ OPPORTUNITY FOUND' : '✗ NO ARBITRAGE'}
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px'}}>
              Combined Margin: {result.margin}% {result.isArbitrage ? '(< 100% = Profit)' : '(≥ 100% = No Profit)'}
            </div>
          </div>

          {result.isArbitrage && (
            <>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px'}}>
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-primary)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px'}}>BET ON OUTCOME 1</div>
                  <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--accent-primary)'}}>
                    ${result.stake1}
                  </div>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px'}}>
                    Returns: ${result.payout1}
                  </div>
                </div>
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-primary)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px'}}>BET ON OUTCOME 2</div>
                  <div style={{fontSize: '28px', fontWeight: '700', color: 'var(--accent-secondary)'}}>
                    ${result.stake2}
                  </div>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px'}}>
                    Returns: ${result.payout2}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'rgba(16, 185, 129, 0.2)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px'}}>
                  GUARANTEED PROFIT
                </div>
                <div style={{fontSize: '36px', fontWeight: '700', color: 'var(--accent-success)'}}>
                  +${result.profit}
                </div>
                <div style={{fontSize: '14px', color: 'var(--accent-success)'}}>
                  ({result.profitPercentage}% ROI)
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Odds Converter Calculator
export function OddsConverterCalculator() {
  const [decimalOdds, setDecimalOdds] = useState(2.50);
  const [americanOdds, setAmericanOdds] = useState('+150');
  const [fractionalOdds, setFractionalOdds] = useState('3/2');
  const [impliedProbability, setImpliedProbability] = useState(40);
  const [lastChanged, setLastChanged] = useState('decimal');

  const convertFromDecimal = (decimal) => {
    const d = parseFloat(decimal);
    if (d <= 1) return;
    
    // To American
    let american;
    if (d >= 2) {
      american = '+' + ((d - 1) * 100).toFixed(0);
    } else {
      american = (-100 / (d - 1)).toFixed(0);
    }
    
    // To Fractional
    const numerator = d - 1;
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const precision = 100;
    const n = Math.round(numerator * precision);
    const divisor = gcd(n, precision);
    const fractional = `${n / divisor}/${precision / divisor}`;
    
    // To Implied Probability
    const prob = (1 / d * 100).toFixed(2);
    
    setAmericanOdds(american);
    setFractionalOdds(fractional);
    setImpliedProbability(prob);
  };

  const handleDecimalChange = (value) => {
    setDecimalOdds(value);
    setLastChanged('decimal');
    convertFromDecimal(value);
  };

  const handleAmericanChange = (value) => {
    setAmericanOdds(value);
    setLastChanged('american');
    
    let decimal;
    const numValue = parseFloat(value.replace('+', ''));
    if (numValue > 0) {
      decimal = (numValue / 100) + 1;
    } else {
      decimal = (100 / Math.abs(numValue)) + 1;
    }
    
    setDecimalOdds(decimal.toFixed(2));
    convertFromDecimal(decimal);
  };

  const handleProbabilityChange = (value) => {
    setImpliedProbability(value);
    setLastChanged('probability');
    
    const prob = parseFloat(value);
    if (prob > 0 && prob < 100) {
      const decimal = 100 / prob;
      setDecimalOdds(decimal.toFixed(2));
      convertFromDecimal(decimal);
    }
  };

  return (
    <div className="calculator-card">
      <div style={{marginBottom: '24px'}}>
        <h2 style={{fontSize: '24px', marginBottom: '8px', color: 'var(--accent-cyan)'}}>
          🔄 ODDS CONVERTER
        </h2>
        <p style={{fontSize: '13px', color: 'var(--text-muted)'}}>
          Convert between decimal, American, fractional odds and probability
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Decimal Odds</label>
        <input
          type="number"
          className="form-input"
          value={decimalOdds}
          onChange={(e) => handleDecimalChange(e.target.value)}
          min="1.01"
          step="0.01"
          style={{
            borderColor: lastChanged === 'decimal' ? 'var(--accent-primary)' : 'var(--border-color)'
          }}
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          European format (e.g., 2.50)
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">American Odds</label>
        <input
          type="text"
          className="form-input"
          value={americanOdds}
          onChange={(e) => handleAmericanChange(e.target.value)}
          style={{
            borderColor: lastChanged === 'american' ? 'var(--accent-primary)' : 'var(--border-color)'
          }}
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          US format (e.g., +150 or -200)
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Fractional Odds</label>
        <input
          type="text"
          className="form-input"
          value={fractionalOdds}
          readOnly
          style={{background: 'var(--bg-tertiary)', cursor: 'not-allowed'}}
        />
        <small style={{color: 'var(--text-muted)', fontSize: '11px'}}>
          UK format (e.g., 3/2)
        </small>
      </div>

      <div className="form-group">
        <label className="form-label">Implied Probability (%)</label>
        <input
          type="number"
          className="form-input"
          value={impliedProbability}
          onChange={(e) => handleProbabilityChange(e.target.value)}
          min="0.1"
          max="99.9"
          step="0.1"
          style={{
            borderColor: lastChanged === 'probability' ? 'var(--accent-primary)' : 'var(--border-color)'
          }}
        />
      </div>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        background: 'var(--bg-tertiary)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px'}}>
          QUICK REFERENCE
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '11px'}}>
          <div style={{padding: '8px', background: 'var(--bg-primary)', borderRadius: '6px'}}>
            <div style={{color: 'var(--accent-primary)', fontWeight: '700'}}>1.50</div>
            <div style={{color: 'var(--text-muted)'}}>-200</div>
          </div>
          <div style={{padding: '8px', background: 'var(--bg-primary)', borderRadius: '6px'}}>
            <div style={{color: 'var(--accent-primary)', fontWeight: '700'}}>2.00</div>
            <div style={{color: 'var(--text-muted)'}}>+100</div>
          </div>
          <div style={{padding: '8px', background: 'var(--bg-primary)', borderRadius: '6px'}}>
            <div style={{color: 'var(--accent-primary)', fontWeight: '700'}}>3.00</div>
            <div style={{color: 'var(--text-muted)'}}>+200</div>
          </div>
          <div style={{padding: '8px', background: 'var(--bg-primary)', borderRadius: '6px'}}>
            <div style={{color: 'var(--accent-primary)', fontWeight: '700'}}>5.00</div>
            <div style={{color: 'var(--text-muted)'}}>+400</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default { 
  KellyCriterionCalculator, 
  BankrollCalculator, 
  RiskOfRuinCalculator, 
  MonthlyBoostCalculator,
  VarianceCalculator,
  SportsBettingCalculator,
  OddsConverterCalculator
};
