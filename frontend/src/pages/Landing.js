import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    // Simulated XP for demo - in production this would come from user's account
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

  return (
    <div className="landing">
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '60px 20px 40px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '50px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          letterSpacing: '1px',
          marginBottom: '24px'
        }}>
          CRYPTO CASINO AFFILIATE AGGREGATOR
        </div>
        
        <h1 style={{
          fontSize: '64px',
          fontWeight: '900',
          letterSpacing: '-3px',
          marginBottom: '20px',
          lineHeight: '1.1',
          color: 'var(--text-primary)'
        }}>
          Earn Extra Rakeback on<br/>
          <span style={{
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Top Crypto Casinos</span>
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 32px',
          lineHeight: '1.7'
        }}>
          Join Rakestake VIP to unlock exclusive rakeback, weekly cashback, 
          and rewards across all partner casinos. One account, maximum rewards.
        </p>
        
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link to="/vip" className="btn" style={{
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            color: '#000',
            fontWeight: '700',
            padding: '16px 36px',
            fontSize: '15px',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(255, 215, 0, 0.3)'
          }}>
            JOIN VIP CLUB
          </Link>
          <a href="#compare" className="btn btn-secondary" style={{
            padding: '16px 36px',
            fontSize: '15px',
            borderRadius: '12px'
          }}>
            COMPARE CASINOS
          </a>
        </div>
      </div>

      {/* XP Progress Widget */}
      <div style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '24px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px'
      }}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{fontSize: '32px'}}>{currentLevel.icon}</span>
            <div>
              <div style={{fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)'}}>
                {currentLevel.name} VIP
              </div>
              <div style={{fontSize: '13px', color: 'var(--text-muted)'}}>
                {currentLevel.rakeback}% Rakeback
              </div>
            </div>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)'}}>
              {formatNumber(userXP)} XP
            </div>
            {nextLevel && (
              <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>
                {formatNumber(nextLevel.xp - userXP)} XP to {nextLevel.name}
              </div>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div style={{
          height: '8px',
          background: 'var(--bg-tertiary)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progressToNext}%`,
            background: `linear-gradient(90deg, ${currentLevel.color}, ${nextLevel?.color || currentLevel.color})`,
            borderRadius: '4px',
            transition: 'width 0.5s ease'
          }} />
        </div>
        
        {/* Level indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '12px'
        }}>
          {vipLevels.map((level, idx) => (
            <div key={level.name} style={{
              textAlign: 'center',
              opacity: userXP >= level.xp ? 1 : 0.4
            }}>
              <div style={{fontSize: '16px'}}>{level.icon}</div>
              <div style={{fontSize: '10px', color: 'var(--text-muted)'}}>{level.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Casino Comparison Table */}
      <div id="compare" style={{
        maxWidth: '1200px',
        margin: '80px auto',
        padding: '0 20px'
      }}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '12px',
            color: 'var(--text-primary)'
          }}>
            Compare Crypto Casinos
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '15px'}}>
            Find the best casino for your playstyle. All links include Rakestake VIP bonus.
          </p>
        </div>

        {/* Comparison Table */}
        <div style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr 1fr',
            gap: '16px',
            padding: '20px 24px',
            background: 'var(--bg-tertiary)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--text-muted)',
            letterSpacing: '1px'
          }}>
            <div>CASINO</div>
            <div>WELCOME BONUS</div>
            <div>RAKEBACK</div>
            <div>MIN DEPOSIT</div>
            <div>CRYPTOS</div>
            <div></div>
          </div>

          {/* Table Rows */}
          {loading ? (
            <div style={{padding: '60px', textAlign: 'center', color: 'var(--text-muted)'}}>
              Loading casinos...
            </div>
          ) : (
            campaigns.map((casino, idx) => (
              <div 
                key={casino.casino_slug}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr 1fr',
                  gap: '16px',
                  padding: '20px 24px',
                  alignItems: 'center',
                  borderBottom: idx < campaigns.length - 1 ? '1px solid var(--border-color)' : 'none',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {/* Casino Name */}
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#fff'
                  }}>
                    {casino.casino_name.charAt(0)}
                  </div>
                  <div>
                    <div style={{fontWeight: '600', fontSize: '16px', color: 'var(--text-primary)'}}>
                      {casino.casino_name}
                    </div>
                    {casino.exclusive_extra && (
                      <div style={{fontSize: '11px', color: '#ffd700', marginTop: '2px'}}>
                        {casino.exclusive_extra}
                      </div>
                    )}
                  </div>
                </div>

                {/* Welcome Bonus */}
                <div>
                  <div style={{fontWeight: '600', color: 'var(--accent-success)', fontSize: '15px'}}>
                    {casino.bonus_value}
                  </div>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px'}}>
                    {casino.wagering_requirement}
                  </div>
                </div>

                {/* Rakeback */}
                <div style={{
                  fontWeight: '700',
                  fontSize: '18px',
                  color: 'var(--accent-primary)'
                }}>
                  {casino.rakeback_rate ? `${(casino.rakeback_rate * 100).toFixed(0)}%` : '10%'}
                </div>

                {/* Min Deposit */}
                <div style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                  {casino.min_deposit}
                </div>

                {/* Cryptos */}
                <div style={{display: 'flex', gap: '4px', flexWrap: 'wrap'}}>
                  {(casino.supported_cryptos || ['BTC', 'ETH', 'LTC']).slice(0, 4).map(crypto => (
                    <span key={crypto} style={{
                      padding: '4px 8px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: 'var(--text-secondary)',
                      fontWeight: '500'
                    }}>
                      {crypto}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div>
                  <a
                    href={casino.referral_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    PLAY NOW
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          <div style={{
            padding: '24px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '32px', fontWeight: '700', color: '#ffd700'}}>15%</div>
            <div style={{fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px'}}>MAX RAKEBACK</div>
          </div>
          <div style={{
            padding: '24px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '32px', fontWeight: '700', color: 'var(--accent-success)'}}>{campaigns.length}</div>
            <div style={{fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px'}}>PARTNER CASINOS</div>
          </div>
          <div style={{
            padding: '24px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '32px', fontWeight: '700', color: 'var(--accent-cyan)'}}>$1,750</div>
            <div style={{fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px'}}>WEEKLY LOTTERY</div>
          </div>
          <div style={{
            padding: '24px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <div style={{fontSize: '32px', fontWeight: '700', color: 'var(--accent-primary)'}}>5</div>
            <div style={{fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px'}}>VIP LEVELS</div>
          </div>
        </div>
      </div>

      {/* VIP Tiers Preview */}
      <div style={{
        maxWidth: '1200px',
        margin: '80px auto',
        padding: '0 20px'
      }}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '12px',
            color: 'var(--text-primary)'
          }}>
            VIP Progression System
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '15px'}}>
            Earn XP from every wager. Level up for higher rakeback rates.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {vipLevels.map((level, idx) => (
            <div
              key={level.name}
              style={{
                padding: '24px',
                background: 'var(--bg-glass)',
                border: `2px solid ${level.color}40`,
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = level.color;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${level.color}40`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{fontSize: '40px', marginBottom: '8px'}}>{level.icon}</div>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: level.color,
                marginBottom: '4px'
              }}>
                {level.name}
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                {level.rakeback}%
              </div>
              <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>
                {level.xp === 0 ? 'Starting Level' : `${formatNumber(level.xp)} XP`}
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign: 'center', marginTop: '32px'}}>
          <Link to="/vip" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            borderRadius: '10px',
            color: '#000',
            fontWeight: '700',
            fontSize: '14px',
            textDecoration: 'none'
          }}>
            VIEW ALL VIP BENEFITS →
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        maxWidth: '1000px',
        margin: '80px auto',
        padding: '40px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '40px',
          color: 'var(--text-primary)'
        }}>
          How Rakestake Works
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px',
              color: '#fff',
              fontWeight: '700'
            }}>1</div>
            <h3 style={{fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Sign Up
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Create a free Rakestake account to track your XP and rewards
            </p>
          </div>
          
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-success))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px',
              color: '#fff',
              fontWeight: '700'
            }}>2</div>
            <h3 style={{fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Choose Casino
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Pick from our partner casinos and sign up through our link
            </p>
          </div>
          
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px',
              color: '#000',
              fontWeight: '700'
            }}>3</div>
            <h3 style={{fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Play & Earn
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Earn XP from wagers, unlock higher VIP tiers, get rakeback rewards
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        maxWidth: '800px',
        margin: '80px auto',
        padding: '60px 40px',
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.05))',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        borderRadius: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '16px',
          color: 'var(--text-primary)'
        }}>
          Ready to Maximize Your Rewards?
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '32px',
          maxWidth: '500px',
          margin: '0 auto 32px'
        }}>
          Join thousands of players earning extra rakeback through Rakestake VIP.
        </p>
        <Link to="/register" className="btn" style={{
          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
          color: '#000',
          fontWeight: '700',
          padding: '16px 40px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '12px'
        }}>
          GET STARTED FREE
        </Link>
      </div>
    </div>
  );
}

export default Landing;
