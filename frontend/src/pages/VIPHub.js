import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function VIPHub() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userXP, setUserXP] = useState(0);
  const isAuthenticated = !!localStorage.getItem('token');

  // VIP Levels with XP requirements
  const vipLevels = [
    { id: 'bronze', name: 'Bronze', xp: 0, rakeback: 2, color: '#cd7f32', gradient: 'linear-gradient(135deg, #cd7f32, #8b4513)', icon: '🥉', benefits: ['2% Instant Rakeback', 'Monthly Lottery Entry', 'Community Access'] },
    { id: 'silver', name: 'Silver', xp: 1000, rakeback: 5, color: '#c0c0c0', gradient: 'linear-gradient(135deg, #c0c0c0, #808080)', icon: '🥈', benefits: ['5% Instant Rakeback', '2x Lottery Entries', 'Priority Support', 'Exclusive Promos'] },
    { id: 'gold', name: 'Gold', xp: 10000, rakeback: 8, color: '#ffd700', gradient: 'linear-gradient(135deg, #ffd700, #ff8c00)', icon: '🥇', benefits: ['8% Instant Rakeback', '5x Lottery Entries', 'VIP Support 24/7', 'Personal Bonuses', 'Birthday Rewards'] },
    { id: 'platinum', name: 'Platinum', xp: 50000, rakeback: 12, color: '#e5e4e2', gradient: 'linear-gradient(135deg, #e5e4e2, #b8b8b8)', icon: '💎', benefits: ['12% Instant Rakeback', '10x Lottery Entries', 'Dedicated Manager', 'Custom Rewards', 'Exclusive Events'] },
    { id: 'diamond', name: 'Diamond', xp: 100000, rakeback: 15, color: '#b9f2ff', gradient: 'linear-gradient(135deg, #b9f2ff, #00bfff)', icon: '👑', benefits: ['15% Instant Rakeback', '25x Lottery Entries', 'VIP Host', 'Custom Requests', 'Luxury Rewards', 'Priority Withdrawals'] }
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

  const handleRedeemClick = (tier) => {
    setSelectedTier(tier);
    setSearchQuery('');
    setShowModal(true);
  };

  const handleCasinoSelect = (campaign) => {
    window.open(campaign.referral_link, '_blank', 'noopener,noreferrer');
    setShowModal(false);
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.casino_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num) => num.toLocaleString('en-US');

  return (
    <div style={{maxWidth: '1400px', margin: '0 auto', padding: '40px 20px'}}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '60px 40px',
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        position: 'relative'
      }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: '900',
          marginBottom: '16px',
          letterSpacing: '-2px',
          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Rakestake VIP CLUB
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: 'var(--text-secondary)',
          marginBottom: '24px',
          maxWidth: '700px',
          margin: '0 auto 24px'
        }}>
          Earn XP from every wager. Level up for higher rakeback rates.
        </p>

        {/* XP Progress */}
        <div style={{
          maxWidth: '500px',
          margin: '32px auto',
          padding: '20px',
          background: 'var(--bg-glass)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '28px'}}>{currentLevel.icon}</span>
              <span style={{fontWeight: '700', color: currentLevel.color, fontSize: '18px'}}>{currentLevel.name}</span>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontWeight: '700', color: 'var(--accent-primary)', fontSize: '20px'}}>{formatNumber(userXP)} XP</div>
              {nextLevel && (
                <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>
                  {formatNumber(nextLevel.xp - userXP)} to {nextLevel.name}
                </div>
              )}
            </div>
          </div>
          <div style={{height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden'}}>
            <div style={{
              height: '100%',
              width: `${progressToNext}%`,
              background: currentLevel.gradient,
              borderRadius: '4px'
            }} />
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          marginTop: '32px',
          flexWrap: 'wrap'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '32px', fontWeight: '800', color: 'var(--accent-success)'}}>
              {campaigns.length}
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>
              PARTNER CASINOS
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '32px', fontWeight: '800', color: '#ffd700'}}>
              15%
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>
              MAX RAKEBACK
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '32px', fontWeight: '800', color: 'var(--accent-cyan)'}}>
              $1,750
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>
              WEEKLY LOTTERY
            </div>
          </div>
        </div>
      </div>

      {/* VIP Tiers */}
      <div style={{marginBottom: '80px'}}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '40px',
          color: 'var(--text-primary)'
        }}>
          VIP Levels & Rakeback Rates
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {vipLevels.map((tier) => {
            const isUnlocked = userXP >= tier.xp;
            const isCurrent = currentLevel.id === tier.id;
            
            return (
              <div
                key={tier.id}
                style={{
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(20px)',
                  border: isCurrent ? `2px solid ${tier.color}` : '1px solid var(--border-color)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  opacity: isUnlocked ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 40px ${tier.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isCurrent && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '4px 10px',
                    background: tier.color,
                    borderRadius: '20px',
                    fontSize: '10px',
                    fontWeight: '700',
                    color: tier.id === 'gold' || tier.id === 'bronze' ? '#000' : '#fff'
                  }}>
                    CURRENT
                  </div>
                )}

                <div style={{
                  background: tier.gradient,
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{fontSize: '44px', marginBottom: '4px'}}>{tier.icon}</div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: tier.id === 'gold' || tier.id === 'bronze' ? '#000' : '#fff',
                    letterSpacing: '1px'
                  }}>
                    {tier.name}
                  </h3>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '900',
                    color: tier.id === 'gold' || tier.id === 'bronze' ? '#000' : '#fff',
                    marginTop: '4px'
                  }}>
                    {tier.rakeback}%
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: tier.id === 'gold' || tier.id === 'bronze' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)'
                  }}>
                    INSTANT RAKEBACK
                  </div>
                </div>

                <div style={{padding: '20px'}}>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}>
                    {tier.xp === 0 ? 'Starting Level' : `Requires ${formatNumber(tier.xp)} XP`}
                  </div>

                  <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} style={{
                        padding: '8px 0',
                        borderBottom: idx < tier.benefits.length - 1 ? '1px solid var(--border-color)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}>
                        <span style={{color: tier.color}}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleRedeemClick(tier)}
                    disabled={!isUnlocked}
                    style={{
                      width: '100%',
                      marginTop: '16px',
                      padding: '12px',
                      background: isUnlocked ? tier.gradient : 'var(--bg-tertiary)',
                      border: 'none',
                      borderRadius: '10px',
                      color: isUnlocked ? (tier.id === 'gold' || tier.id === 'bronze' ? '#000' : '#fff') : 'var(--text-muted)',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isUnlocked ? 'CONNECT CASINO' : `UNLOCK AT ${formatNumber(tier.xp)} XP`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Partner Casinos */}
      <div style={{marginBottom: '80px'}}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '16px',
          color: 'var(--text-primary)'
        }}>
          Partner Casinos
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          marginBottom: '40px',
          fontSize: '15px'
        }}>
          Connect through Rakestake for exclusive bonuses and rakeback
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {loading ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)'}}>
              Loading casinos...
            </div>
          ) : (
            campaigns.map((casino) => (
              <div
                key={casino.casino_slug}
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{padding: '24px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      fontWeight: '800',
                      color: '#fff'
                    }}>
                      {casino.casino_name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px'}}>
                        {casino.casino_name}
                      </h3>
                      <div style={{fontSize: '13px', color: 'var(--accent-success)', fontWeight: '600'}}>
                        {casino.bonus_title}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: '16px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{fontSize: '24px', fontWeight: '800', color: 'var(--accent-success)', marginBottom: '4px'}}>
                      {casino.bonus_value}
                    </div>
                    {casino.exclusive_extra && (
                      <div style={{fontSize: '12px', color: '#ffd700', fontWeight: '600'}}>
                        + {casino.exclusive_extra}
                      </div>
                    )}
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px'}}>
                    <div>
                      <div style={{fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px'}}>MIN DEPOSIT</div>
                      <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)'}}>{casino.min_deposit}</div>
                    </div>
                    <div>
                      <div style={{fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px'}}>WAGERING</div>
                      <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)'}}>{casino.wagering_requirement}</div>
                    </div>
                  </div>

                  <a
                    href={casino.referral_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '14px',
                      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '700',
                      textAlign: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    PLAY AT {casino.casino_name.toUpperCase()}
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lottery Section */}
      <div style={{
        marginBottom: '80px',
        padding: '40px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        borderRadius: '24px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '6px 14px',
          background: 'var(--accent-primary)',
          borderRadius: '50px',
          fontSize: '10px',
          fontWeight: '700',
          color: '#fff',
          letterSpacing: '1px'
        }}>
          MEMBERS ONLY
        </div>

        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          marginBottom: '16px',
          color: 'var(--text-primary)'
        }}>
          🎰 Weekly VIP Lottery
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '32px',
          maxWidth: '600px'
        }}>
          Higher VIP levels = more lottery entries. Diamond members get 25x entries!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '12px', textAlign: 'center'}}>
            <div style={{fontSize: '28px', fontWeight: '700', color: '#ffd700'}}>$1,000</div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>1ST PRIZE</div>
          </div>
          <div style={{padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '12px', textAlign: 'center'}}>
            <div style={{fontSize: '28px', fontWeight: '700', color: '#c0c0c0'}}>$500</div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>2ND PRIZE</div>
          </div>
          <div style={{padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '12px', textAlign: 'center'}}>
            <div style={{fontSize: '28px', fontWeight: '700', color: '#cd7f32'}}>$250</div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>3RD PRIZE</div>
          </div>
        </div>

        {!isAuthenticated && (
          <Link to="/register" style={{
            display: 'inline-block',
            padding: '14px 28px',
            background: 'var(--accent-primary)',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '14px',
            textDecoration: 'none'
          }}>
            REGISTER TO ENTER LOTTERY
          </Link>
        )}
      </div>

      {/* Casino Selection Modal */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '24px',
              border: `2px solid ${selectedTier?.color || 'var(--border-color)'}`,
              maxWidth: '500px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '24px',
              background: selectedTier?.gradient || 'var(--bg-tertiary)',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '40px', marginBottom: '8px'}}>{selectedTier?.icon}</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: selectedTier?.id === 'gold' || selectedTier?.id === 'bronze' ? '#000' : '#fff'
              }}>
                Connect Casino
              </h3>
              <p style={{
                fontSize: '14px',
                color: selectedTier?.id === 'gold' || selectedTier?.id === 'bronze' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
                marginTop: '4px'
              }}>
                {selectedTier?.rakeback}% rakeback at {selectedTier?.name} level
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.3)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#fff',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >✕</button>

            <div style={{padding: '20px 24px 0'}}>
              <input
                type="text"
                placeholder="Search casinos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{padding: '20px 24px', overflowY: 'auto', flex: 1}}>
              {filteredCampaigns.map((casino) => (
                <a
                  key={casino.casino_slug}
                  href={casino.referral_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowModal(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '12px',
                    marginBottom: '10px',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-glass)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#fff'
                  }}>
                    {casino.casino_name.charAt(0)}
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: '600', color: 'var(--text-primary)', fontSize: '15px'}}>
                      {casino.casino_name}
                    </div>
                    <div style={{fontSize: '12px', color: 'var(--accent-success)'}}>
                      {casino.bonus_value}
                    </div>
                  </div>
                  <span style={{color: 'var(--text-muted)'}}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VIPHub;
