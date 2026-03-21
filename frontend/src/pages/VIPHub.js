import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function VIPHub() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    fetchCampaigns();
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
    setShowModal(true);
  };

  const handleCasinoSelect = (campaign) => {
    // Open referral link in new tab
    window.open(campaign.referral_link, '_blank', 'noopener,noreferrer');
    setShowModal(false);
  };

  const vipTiers = [
    {
      id: 'bronze',
      name: 'BRONZE',
      color: '#cd7f32',
      gradient: 'linear-gradient(135deg, #cd7f32, #8b4513)',
      benefits: ['5% Weekly Cashback', 'Monthly Lottery Entry', 'Basic Support'],
      requirement: 'Connect any casino',
      icon: '🥉'
    },
    {
      id: 'silver',
      name: 'SILVER',
      color: '#c0c0c0',
      gradient: 'linear-gradient(135deg, #c0c0c0, #808080)',
      benefits: ['10% Weekly Cashback', '2x Lottery Entries', 'Priority Support', 'Exclusive Promotions'],
      requirement: '$500+ monthly volume',
      icon: '🥈'
    },
    {
      id: 'gold',
      name: 'GOLD',
      color: '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #ff8c00)',
      benefits: ['15% Weekly Cashback', '5x Lottery Entries', 'VIP Support 24/7', 'Personal Account Manager', 'Birthday Bonus'],
      requirement: '$2,000+ monthly volume',
      icon: '🥇'
    },
    {
      id: 'diamond',
      name: 'DIAMOND',
      color: '#b9f2ff',
      gradient: 'linear-gradient(135deg, #b9f2ff, #00bfff, #87ceeb)',
      benefits: ['20% Weekly Cashback', '10x Lottery Entries', 'Dedicated VIP Host', 'Custom Bonus Requests', 'Exclusive Events Access', 'No Withdrawal Limits'],
      requirement: '$10,000+ monthly volume',
      icon: '💎'
    }
  ];

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
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 20px',
          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
          borderRadius: '50px',
          fontSize: '12px',
          fontWeight: '700',
          color: '#000',
          letterSpacing: '1px'
        }}>
          MEMBERS ONLY
        </div>
        
        <h1 style={{
          fontSize: '56px',
          fontWeight: '900',
          marginBottom: '16px',
          letterSpacing: '-2px',
          background: 'linear-gradient(135deg, #ffd700, #ff8c00, #ffd700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          NoToGreed VIP CLUB
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: 'var(--text-secondary)',
          marginBottom: '8px',
          maxWidth: '700px',
          margin: '0 auto 16px'
        }}>
          Your Gateway to Exclusive Rewards & Cashback
        </p>
        
        <p style={{
          fontSize: '14px',
          color: 'var(--text-muted)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          Connect your favorite casino to the NoToGreed VIP system and unlock exclusive perks: 
          weekly cashback, lottery entries, personal bonuses, and VIP treatment across all partner casinos.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          marginTop: '40px',
          flexWrap: 'wrap'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '36px', fontWeight: '800', color: 'var(--accent-success)'}}>
              {campaigns.length}+
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>
              PARTNER CASINOS
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '36px', fontWeight: '800', color: '#ffd700'}}>
              20%
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>
              MAX CASHBACK
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '36px', fontWeight: '800', color: 'var(--accent-cyan)'}}>
              WEEKLY
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>
              LOTTERY DRAWS
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
          marginBottom: '16px',
          color: 'var(--text-primary)'
        }}>
          VIP Membership Tiers
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          marginBottom: '40px',
          fontSize: '14px'
        }}>
          Connect your casino account and start earning rewards immediately
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {vipTiers.map((tier) => (
            <div
              key={tier.id}
              data-testid={`tier-${tier.id}`}
              style={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${tier.color}40`,
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 60px ${tier.color}30`;
                e.currentTarget.style.borderColor = tier.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${tier.color}40`;
              }}
            >
              {/* Tier Header */}
              <div style={{
                background: tier.gradient,
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '48px', marginBottom: '8px'}}>{tier.icon}</div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: tier.id === 'gold' || tier.id === 'bronze' ? '#000' : '#fff',
                  letterSpacing: '2px'
                }}>
                  {tier.name}
                </h3>
              </div>

              {/* Benefits */}
              <div style={{padding: '24px'}}>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 20px 0'
                }}>
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} style={{
                      padding: '10px 0',
                      borderBottom: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '13px',
                      color: 'var(--text-secondary)'
                    }}>
                      <span style={{color: tier.color}}>✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div style={{
                  padding: '12px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px'}}>
                    REQUIREMENT
                  </div>
                  <div style={{fontSize: '12px', color: 'var(--text-primary)', fontWeight: '600'}}>
                    {tier.requirement}
                  </div>
                </div>

                <button
                  onClick={() => handleRedeemClick(tier)}
                  data-testid={`redeem-${tier.id}`}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: tier.gradient,
                    border: 'none',
                    borderRadius: '10px',
                    color: tier.id === 'gold' || tier.id === 'bronze' ? '#000' : '#fff',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    letterSpacing: '1px'
                  }}
                >
                  REDEEM VIP ACCESS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lottery Section */}
      <div style={{
        marginBottom: '80px',
        padding: '40px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
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

        <div style={{display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap'}}>
          <div style={{flex: '1', minWidth: '300px'}}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🎰 Weekly VIP Lottery
            </h2>
            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '20px'
            }}>
              Every week, we draw winners from our VIP member pool. The more you play at our partner casinos, 
              the more lottery entries you earn. Prizes include cash bonuses, free spins, and exclusive merchandise.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '24px', fontWeight: '700', color: '#ffd700'}}>$1,000</div>
                <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>1ST PRIZE</div>
              </div>
              <div style={{
                padding: '16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '24px', fontWeight: '700', color: '#c0c0c0'}}>$500</div>
                <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>2ND PRIZE</div>
              </div>
              <div style={{
                padding: '16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '24px', fontWeight: '700', color: '#cd7f32'}}>$250</div>
                <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>3RD PRIZE</div>
              </div>
            </div>

            {isAuthenticated ? (
              <div style={{
                padding: '16px 20px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid var(--accent-success)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{fontSize: '24px'}}>✅</span>
                <div>
                  <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--accent-success)'}}>
                    You're Eligible!
                  </div>
                  <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>
                    Connect a casino to start earning lottery entries
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                padding: '16px 20px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--accent-danger)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{fontSize: '24px'}}>🔒</span>
                <div>
                  <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--accent-danger)'}}>
                    Registration Required
                  </div>
                  <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>
                    <a href="/register" style={{color: 'var(--accent-primary)'}}>Create a free account</a> to participate in lotteries
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '120px',
            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4)',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            🎰
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        marginBottom: '60px',
        padding: '40px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '40px',
          color: 'var(--text-primary)'
        }}>
          How NoToGreed VIP Works
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '28px'
            }}>
              1
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Register on NoToGreed
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Create your free account to access the VIP system and lottery eligibility.
            </p>
          </div>
          
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-success))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '28px'
            }}>
              2
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Connect Your Casino
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Click "Redeem VIP Access" and choose which partner casino to connect for rewards.
            </p>
          </div>
          
          <div style={{textAlign: 'center'}}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '28px',
              color: '#000'
            }}>
              3
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Play & Earn Rewards
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Play normally and earn cashback, lottery entries, and exclusive VIP perks automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{textAlign: 'center', padding: '60px'}}>
          <div style={{fontSize: '48px', marginBottom: '16px'}}>⏳</div>
          <p style={{color: 'var(--text-muted)'}}>Loading partner casinos...</p>
        </div>
      )}

      {/* Disclaimer */}
      <div style={{
        padding: '20px',
        background: 'rgba(239, 68, 68, 0.05)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
          18+ | Gambling can be addictive. Please play responsibly. | 
          VIP rewards subject to terms and conditions. | 
          Some offers may be geo-restricted. | 
          Lottery participation requires account registration.
        </p>
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
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowModal(false)}
          data-testid="casino-modal-overlay"
        >
          <div 
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: '24px',
              border: `2px solid ${selectedTier?.color || 'var(--border-color)'}`,
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
            data-testid="casino-modal"
          >
            {/* Modal Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid var(--border-color)',
              textAlign: 'center',
              background: selectedTier?.gradient || 'var(--bg-tertiary)'
            }}>
              <div style={{fontSize: '48px', marginBottom: '12px'}}>{selectedTier?.icon}</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: selectedTier?.id === 'gold' || selectedTier?.id === 'bronze' ? '#000' : '#fff',
                marginBottom: '8px'
              }}>
                {selectedTier?.name} VIP Access
              </h3>
              <p style={{
                fontSize: '14px',
                color: selectedTier?.id === 'gold' || selectedTier?.id === 'bronze' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)'
              }}>
                Which casino do you prefer to connect your boost to?
              </p>
            </div>

            {/* Close Button */}
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
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              data-testid="modal-close"
            >
              ✕
            </button>

            {/* Casino Options */}
            <div style={{padding: '24px'}}>
              <div style={{
                display: 'grid',
                gap: '12px'
              }}>
                {campaigns.map((campaign) => (
                  <button
                    key={campaign.casino_slug}
                    onClick={() => handleCasinoSelect(campaign)}
                    data-testid={`modal-casino-${campaign.casino_slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px 20px',
                      background: 'var(--bg-tertiary)',
                      border: '2px solid var(--border-color)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = selectedTier?.color || 'var(--accent-primary)';
                      e.currentTarget.style.background = 'var(--bg-glass)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'var(--bg-tertiary)';
                    }}
                  >
                    {/* Casino Icon */}
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: '800',
                      color: '#fff',
                      flexShrink: 0
                    }}>
                      {campaign.casino_name.charAt(0)}
                    </div>

                    {/* Casino Info */}
                    <div style={{flex: 1}}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '4px'
                      }}>
                        {campaign.casino_name}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--accent-success)'
                      }}>
                        {campaign.bonus_value}
                      </div>
                      {campaign.exclusive_extra && (
                        <div style={{
                          fontSize: '11px',
                          color: '#ffd700',
                          marginTop: '4px'
                        }}>
                          + {campaign.exclusive_extra}
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <div style={{
                      color: 'var(--text-muted)',
                      fontSize: '20px'
                    }}>
                      →
                    </div>
                  </button>
                ))}
              </div>

              {/* Info Note */}
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '10px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                💡 Sign up through our link to automatically connect your account to the NoToGreed VIP system 
                and start earning rewards immediately.
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default VIPHub;
