import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CasinoLogo, GlowBadge } from '../components/AnimatedElements';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Landing() {
  const [campaigns, setCampaigns] = useState([]);
  const [userXP, setUserXP] = useState(0);
  const [loading, setLoading] = useState(true);

  // VIP Levels with XP requirements
  const vipLevels = [
    { name: 'Bronze', xp: 0, rakeback: 2, color: '#cd7f32', icon: '🥉' },
    { name: 'Silver', xp: 1000, rakeback: 5, color: '#c0c0c0', icon: '🥈' },
    { name: 'Gold', xp: 10000, rakeback: 8, color: '#ffd700', icon: '🥇' },
    { name: 'Platinum', xp: 50000, rakeback: 12, color: '#e5e4e2', icon: '💎' },
    { name: 'Diamond', xp: 100000, rakeback: 15, color: '#b9f2ff', icon: '👑' }
  ];

  const getCurrentLevel = (xp) => {
    for (let i = vipLevels.length - 1; i >= 0; i--) {
      if (xp >= vipLevels[i].xp) return vipLevels[i];
    }
    return vipLevels[0];
  };

  const getNextLevel = (xp) => {
    for (let i = 0; i < vipLevels.length; i++) {
      if (xp < vipLevels[i].xp) return vipLevels[i];
    }
    return null;
  };

  const currentLevel = getCurrentLevel(userXP);
  const nextLevel = getNextLevel(userXP);
  const progressToNext = nextLevel 
    ? ((userXP - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100 
    : 100;

  useEffect(() => {
    fetchCampaigns();
    const savedXP = localStorage.getItem('rakestake-xp');
    setUserXP(savedXP ? parseInt(savedXP) : 2500);
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`${API_URL}/api/vip/campaigns`);
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => num.toLocaleString('en-US');

  // Casino gradient colors
  const casinoGradients = {
    'Stake': ['#00d4aa', '#00a67d'],
    'Shuffle': ['#ff6b35', '#f7931a'],
    'Rainbet': ['#667eea', '#764ba2'],
    'FortuneJack': ['#f7931a', '#ff6b00'],
    'BitStarz': ['#00d4ff', '#0099ff'],
    '1win': ['#00c853', '#00e676'],
    '1xBet': ['#1e88e5', '#42a5f5'],
    'RoyalPartners': ['#9c27b0', '#e040fb'],
  };

  return (
    <div className="landing" style={{position: 'relative'}}>
      {/* Floating Particles Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(255, 215, 0, ${Math.random() * 0.2 + 0.1})`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 15 + 15}s linear infinite`,
              animationDelay: `-${Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 20px 60px',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{marginBottom: '24px'}}>
          <GlowBadge text="⚡ CRYPTO CASINO AGGREGATOR" color="#ffd700" />
        </div>
        
        <h1 style={{
          fontSize: '72px',
          fontWeight: '900',
          letterSpacing: '-4px',
          marginBottom: '24px',
          lineHeight: '1',
          color: 'var(--text-primary)'
        }}>
          Maximize Your
          <br />
          <span className="shimmer-text" style={{
            background: 'linear-gradient(90deg, #ffd700 0%, #ff8c00 25%, #ffd700 50%, #ff8c00 75%, #ffd700 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'text-shimmer 3s linear infinite'
          }}>
            Rakeback Rewards
          </span>
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0 auto 40px',
          lineHeight: '1.7'
        }}>
          One VIP account. <strong style={{color: '#ffd700'}}>8+ top crypto casinos.</strong> Unlock exclusive rakeback, 
          weekly cashback, and rewards you won't find anywhere else.
        </p>
        
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link to="/vip" className="hover-lift" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            color: '#000',
            fontWeight: '700',
            padding: '18px 40px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '14px',
            textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)'
          }}>
            <span style={{fontSize: '20px'}}>⚡</span>
            JOIN VIP CLUB
          </Link>
          <a href="#compare" className="hover-lift" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 40px',
            fontSize: '16px',
            borderRadius: '14px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            <span style={{fontSize: '20px'}}>🎰</span>
            COMPARE CASINOS
          </a>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          marginTop: '60px',
          flexWrap: 'wrap'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '42px', fontWeight: '800', color: '#ffd700'}}>{campaigns.length}+</div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>CASINOS</div>
          </div>
          <div style={{width: '1px', background: 'var(--border-color)'}} />
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '42px', fontWeight: '800', color: 'var(--accent-success)'}}>15%</div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>MAX RAKEBACK</div>
          </div>
          <div style={{width: '1px', background: 'var(--border-color)'}} />
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '42px', fontWeight: '800', color: 'var(--accent-cyan)'}}>$1,750</div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>WEEKLY LOTTERY</div>
          </div>
        </div>
      </div>

      {/* XP Progress Widget */}
      <div style={{
        maxWidth: '600px',
        margin: '20px auto 80px',
        padding: '24px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{
              fontSize: '36px',
              animation: 'bounce-soft 2s ease-in-out infinite'
            }}>{currentLevel.icon}</div>
            <div>
              <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)'}}>
                {currentLevel.name} VIP
              </div>
              <div style={{fontSize: '13px', color: currentLevel.color}}>
                {currentLevel.rakeback}% Rakeback Active
              </div>
            </div>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{fontSize: '28px', fontWeight: '800', color: 'var(--accent-primary)'}}>
              {formatNumber(userXP)} <span style={{fontSize: '14px', fontWeight: '500'}}>XP</span>
            </div>
            {nextLevel && (
              <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>
                {formatNumber(nextLevel.xp - userXP)} XP to {nextLevel.name}
              </div>
            )}
          </div>
        </div>
        
        {/* Animated Progress Bar */}
        <div style={{
          height: '10px',
          background: 'var(--bg-tertiary)',
          borderRadius: '5px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            width: `${progressToNext}%`,
            background: `linear-gradient(90deg, ${currentLevel.color}, ${nextLevel?.color || currentLevel.color})`,
            borderRadius: '5px',
            transition: 'width 0.5s ease',
            position: 'relative'
          }}>
            {/* Shine effect on progress bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shine 2s infinite'
            }} />
          </div>
        </div>
        
        {/* Level indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '16px'
        }}>
          {vipLevels.map((level) => (
            <div key={level.name} style={{
              textAlign: 'center',
              opacity: userXP >= level.xp ? 1 : 0.4,
              transition: 'opacity 0.3s ease'
            }}>
              <div style={{fontSize: '18px'}}>{level.icon}</div>
              <div style={{fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px'}}>{level.rakeback}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Casino Comparison Section */}
      <div id="compare" style={{
        maxWidth: '1400px',
        margin: '0 auto 100px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '800',
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}>
            Top Crypto Casinos
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto'}}>
            Compare bonuses, rakeback rates, and features. All links include <span style={{color: '#ffd700'}}>exclusive Rakestake VIP bonuses</span>.
          </p>
        </div>

        {/* Casino Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px'
        }}>
          {loading ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '80px', color: 'var(--text-muted)'}}>
              <div style={{fontSize: '48px', marginBottom: '16px', animation: 'bounce-soft 1s ease-in-out infinite'}}>🎰</div>
              Loading casinos...
            </div>
          ) : (
            campaigns.map((casino, idx) => {
              const gradient = casinoGradients[casino.casino_name] || ['#6366f1', '#8b5cf6'];
              
              return (
                <div
                  key={casino.casino_slug}
                  className="hover-lift glass-card"
                  style={{
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {/* Featured Badge */}
                  {casino.is_featured && (
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      zIndex: 2
                    }}>
                      <GlowBadge text="⭐ FEATURED" color="#ffd700" size="small" />
                    </div>
                  )}

                  {/* Casino Header */}
                  <div style={{
                    padding: '24px',
                    background: `linear-gradient(135deg, ${gradient[0]}20, ${gradient[1]}10)`,
                    borderBottom: '1px solid var(--border-color)'
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                      <CasinoLogo 
                        name={casino.casino_name} 
                        size={56} 
                        gradient={gradient}
                        animated={true}
                      />
                      <div>
                        <h3 style={{
                          fontSize: '22px',
                          fontWeight: '700',
                          color: 'var(--text-primary)',
                          marginBottom: '4px'
                        }}>
                          {casino.casino_name}
                        </h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            padding: '4px 10px',
                            background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: '#fff'
                          }}>
                            {casino.rakeback_rate ? `${(casino.rakeback_rate * 100).toFixed(0)}%` : '10%'} RAKEBACK
                          </span>
                          <span className="live-indicator" style={{
                            fontSize: '11px',
                            color: 'var(--accent-success)'
                          }}>
                            LIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Casino Body */}
                  <div style={{padding: '24px'}}>
                    {/* Bonus Value */}
                    <div style={{
                      padding: '16px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        marginBottom: '4px'
                      }}>
                        {casino.bonus_title}
                      </div>
                      <div style={{
                        fontSize: '26px',
                        fontWeight: '800',
                        color: 'var(--accent-success)'
                      }}>
                        {casino.bonus_value}
                      </div>
                      {casino.exclusive_extra && (
                        <div style={{
                          marginTop: '8px',
                          padding: '6px 12px',
                          background: 'rgba(255, 215, 0, 0.1)',
                          borderRadius: '6px',
                          display: 'inline-block'
                        }}>
                          <span style={{
                            fontSize: '12px',
                            color: '#ffd700',
                            fontWeight: '600'
                          }}>
                            ⭐ {casino.exclusive_extra}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <div style={{fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px'}}>MIN DEPOSIT</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)'}}>{casino.min_deposit}</div>
                      </div>
                      <div>
                        <div style={{fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px'}}>WAGERING</div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)'}}>{casino.wagering_requirement}</div>
                      </div>
                    </div>

                    {/* Cryptos */}
                    <div style={{
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap',
                      marginBottom: '20px'
                    }}>
                      {(casino.supported_cryptos || ['BTC', 'ETH', 'LTC']).slice(0, 5).map(crypto => (
                        <span key={crypto} style={{
                          padding: '4px 10px',
                          background: 'var(--bg-primary)',
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: 'var(--text-secondary)',
                          fontWeight: '500',
                          border: '1px solid var(--border-color)'
                        }}>
                          {crypto}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a
                      href={casino.referral_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '14px',
                        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '700',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 4px 20px ${gradient[0]}40`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = `0 8px 30px ${gradient[0]}60`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = `0 4px 20px ${gradient[0]}40`;
                      }}
                    >
                      <span style={{fontSize: '18px'}}>🎰</span>
                      PLAY NOW
                      <span style={{fontSize: '16px'}}>→</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* VIP Tiers Preview */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 100px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
          <GlowBadge text="⚡ XP-BASED REWARDS" color="#6366f1" />
          <h2 style={{
            fontSize: '42px',
            fontWeight: '800',
            marginTop: '20px',
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}>
            VIP Progression System
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '16px'}}>
            Every wager earns XP. Level up for higher rakeback rates.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {vipLevels.map((level) => (
            <div
              key={level.name}
              className="hover-lift"
              style={{
                padding: '24px',
                background: 'var(--bg-glass)',
                border: `2px solid ${level.color}40`,
                borderRadius: '20px',
                textAlign: 'center',
                minWidth: '160px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = level.color;
                e.currentTarget.style.boxShadow = `0 0 30px ${level.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${level.color}40`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '8px',
                animation: 'bounce-soft 3s ease-in-out infinite',
                animationDelay: `${vipLevels.indexOf(level) * 0.2}s`
              }}>
                {level.icon}
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: level.color,
                marginBottom: '4px'
              }}>
                {level.name}
              </div>
              <div style={{
                fontSize: '32px',
                fontWeight: '900',
                color: 'var(--text-primary)'
              }}>
                {level.rakeback}%
              </div>
              <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px'}}>
                {level.xp === 0 ? 'Start' : `${formatNumber(level.xp)} XP`}
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <Link to="/vip" className="hover-lift" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            borderRadius: '12px',
            color: '#000',
            fontWeight: '700',
            fontSize: '15px',
            textDecoration: 'none'
          }}>
            VIEW ALL VIP BENEFITS
            <span style={{fontSize: '18px'}}>→</span>
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 100px',
        padding: '60px 40px',
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.05))',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        borderRadius: '32px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '800',
          marginBottom: '16px',
          color: 'var(--text-primary)'
        }}>
          Ready to Maximize Your Rewards?
        </h2>
        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          marginBottom: '32px',
          maxWidth: '550px',
          margin: '0 auto 32px'
        }}>
          Join thousands of players earning extra rakeback through Rakestake VIP.
        </p>
        <Link to="/register" className="hover-lift" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
          color: '#000',
          fontWeight: '700',
          padding: '18px 48px',
          fontSize: '17px',
          border: 'none',
          borderRadius: '14px',
          textDecoration: 'none',
          boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)'
        }}>
          <span style={{fontSize: '20px'}}>🚀</span>
          GET STARTED FREE
        </Link>
      </div>
    </div>
  );
}

export default Landing;
