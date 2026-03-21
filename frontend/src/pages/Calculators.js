import React, { useState } from 'react';
import { MinesCalculator, HiLoCalculator, DiceCalculator, PlinkoCalculator, LimboCalculator } from '../components/Calculators';
import { 
  KellyCriterionCalculator, 
  BankrollCalculator, 
  RiskOfRuinCalculator, 
  MonthlyBoostCalculator,
  VarianceCalculator,
  SportsBettingCalculator,
  OddsConverterCalculator
} from '../components/AdvancedCalculators';

function Calculators() {
  const [activeCategory, setActiveCategory] = useState('games');
  const [activeCalculator, setActiveCalculator] = useState('mines');

  const categories = [
    { id: 'games', name: 'GAME CALCULATORS', icon: '🎮' },
    { id: 'strategy', name: 'STRATEGY & BANKROLL', icon: '📊' },
    { id: 'sports', name: 'SPORTS BETTING', icon: '🏆' }
  ];

  const gameCalculators = [
    { id: 'mines', name: 'MINES', icon: '💎', component: MinesCalculator },
    { id: 'dice', name: 'DICE', icon: '🎲', component: DiceCalculator },
    { id: 'limbo', name: 'LIMBO', icon: '🚀', component: LimboCalculator },
    { id: 'plinko', name: 'PLINKO', icon: '🎯', component: PlinkoCalculator },
    { id: 'hilo', name: 'HILO', icon: '🎴', component: HiLoCalculator }
  ];

  const strategyCalculators = [
    { id: 'kelly', name: 'KELLY CRITERION', icon: '📊', component: KellyCriterionCalculator },
    { id: 'bankroll', name: 'BANKROLL MGMT', icon: '💰', component: BankrollCalculator },
    { id: 'ror', name: 'RISK OF RUIN', icon: '⚠️', component: RiskOfRuinCalculator },
    { id: 'variance', name: 'VARIANCE', icon: '📈', component: VarianceCalculator },
    { id: 'monthly', name: 'MONTHLY BOOST', icon: '📅', component: MonthlyBoostCalculator }
  ];

  const sportsCalculators = [
    { id: 'sports', name: 'PARLAY & ARB', icon: '🏆', component: SportsBettingCalculator },
    { id: 'odds', name: 'ODDS CONVERTER', icon: '🔄', component: OddsConverterCalculator }
  ];

  const getCurrentCalculators = () => {
    switch (activeCategory) {
      case 'games': return gameCalculators;
      case 'strategy': return strategyCalculators;
      case 'sports': return sportsCalculators;
      default: return gameCalculators;
    }
  };

  const calculators = getCurrentCalculators();
  const ActiveComponent = calculators.find(c => c.id === activeCalculator)?.component;

  // Reset to first calculator when category changes
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    switch (categoryId) {
      case 'games': setActiveCalculator('mines'); break;
      case 'strategy': setActiveCalculator('kelly'); break;
      case 'sports': setActiveCalculator('sports'); break;
      default: setActiveCalculator('mines');
    }
  };

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
      <div style={{textAlign: 'center', marginBottom: '50px'}}>
        <h1 style={{fontSize: '42px', marginBottom: '12px', letterSpacing: '-1px'}}>
          GAMBLING CALCULATORS
        </h1>
        <p style={{color: 'var(--text-muted)', fontSize: '14px', maxWidth: '600px', margin: '0 auto'}}>
          Professional tools to calculate probabilities, optimal bet sizing, and make informed decisions
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            data-testid={`category-${cat.id}`}
            style={{
              padding: '14px 28px',
              background: activeCategory === cat.id 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'rgba(99, 102, 241, 0.05)',
              border: activeCategory === cat.id 
                ? 'none' 
                : '2px solid var(--border-color)',
              color: activeCategory === cat.id 
                ? 'var(--text-primary)' 
                : 'var(--text-secondary)',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              boxShadow: activeCategory === cat.id 
                ? '0 4px 20px rgba(99, 102, 241, 0.4)' 
                : 'none'
            }}
          >
            <span style={{fontSize: '18px'}}>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Calculator Navigation */}
      <div style={{
        display: 'flex',
        gap: '10px',
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
              minWidth: '130px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 20px',
              fontSize: '13px'
            }}
            data-testid={`calc-nav-${calc.id}`}
          >
            <span style={{fontSize: '16px'}}>{calc.icon}</span>
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

      {/* Category Description */}
      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: 'rgba(99, 102, 241, 0.05)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px'
      }}>
        {activeCategory === 'games' && (
          <>
            <p style={{color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '12px'}}>
              <strong>Game Calculators</strong> - Calculate exact probabilities and optimal strategies for popular casino games.
            </p>
            <p style={{color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.6'}}>
              Each calculator uses the actual mathematical formulas behind provably fair games. Understand your true odds before placing bets.
            </p>
          </>
        )}
        {activeCategory === 'strategy' && (
          <>
            <p style={{color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '12px'}}>
              <strong>Strategy & Bankroll Tools</strong> - Professional-grade calculators for serious players.
            </p>
            <p style={{color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.6'}}>
              Kelly Criterion for optimal bet sizing, Risk of Ruin to understand survival probability, Variance to prepare for swings, and Monthly projections for long-term planning.
            </p>
          </>
        )}
        {activeCategory === 'sports' && (
          <>
            <p style={{color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '12px'}}>
              <strong>Sports Betting Tools</strong> - Build parlays, find arbitrage, and convert odds formats.
            </p>
            <p style={{color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.6'}}>
              Calculate parlay payouts instantly, identify arbitrage opportunities between bookmakers, and convert between decimal, American, and fractional odds.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Calculators;
