import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function VIPHub() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const vipTiers = [
    {
      id: 'bronze',
      name: 'BRONZE',
      color: '#cd7f32',
      gradient: 'linear-gradient(135deg, #cd7f32, #8b4513)',
      benefits: ['5% Weekly Cashback', 'Monthly Lottery Entry', 'Community Access'],
      requirement: 'Connect any partner casino',
      icon: '🥉'
    },
    {
      id: 'silver',
      name: 'SILVER',
      color: '#c0c0c0',
      gradient: 'linear-gradient(135deg, #c0c0c0, #808080)',
      benefits: ['10% Weekly Cashback', '2x Lottery Entries', 'Priority Support', 'Exclusive Promos'],
      requirement: '$500+ monthly wagered',
      icon: '🥈'
    },
    {
      id: 'gold',
      name: 'GOLD',
      color: '#ffd700',
      gradient: 'linear-gradient(135deg, #ffd700, #ff8c00)',
      benefits: ['15% Weekly Cashback', '5x Lottery Entries', 'VIP Support 24/7', 'Personal Bonuses', 'Birthday Rewards'],
      requirement: '$2,000+ monthly wagered',
      icon: '🥇'
    },
    {
      id: 'diamond',
      name: 'DIAMOND',
      color: '#b9f2ff',
      gradient: 'linear-gradient(135deg, #b9f2ff, #00bfff, #87ceeb)',
      benefits: ['20% Weekly Cashback', '10x Lottery Entries', 'Dedicated VIP Host', 'Custom Requests', 'Exclusive Events', 'Priority Withdrawals'],
      requirement: '$10,000+ monthly wagered',
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
          EXCLUSIVE
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
          Rakestake VIP CLUB
        </h1>
        
        <p style={{
          fontSize: '22px',
          color: '#e0e0e0',
          marginBottom: '8px',
          maxWidth: '700px',
          margin: '0 auto 16px'
        }}>
          Your Gateway to Exclusive Rewards
        </p>
        
        <p style={{
          fontSize: '16px',
          color: '#a0a0a0',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          Connect your favorite casino to the Rakestake VIP system and unlock exclusive perks: 
          weekly cashback, lottery entries, personal bonuses, and VIP treatment across all partner casinos.
        </p>

        <div style={{
          marginTop: '32px',
          padding: '16px 24px',
          background: 'rgba(255, 215, 0, 0.1)',
          borderRadius: '12px',
          display: 'inline-block',
          border: '1px solid rgba(255, 215, 0, 0.2)'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#ffd700',
            margin: 0
          }}>
            <strong>No account required to join VIP</strong> • Create a free account to access Forum & Weekly Lottery
          </p>
        </div>
        
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
            <div style={{fontSize: '13px', color: '#a0a0a0', letterSpacing: '1px'}}>
              PARTNER CASINOS
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '36px', fontWeight: '800', color: '#ffd700'}}>
              20%
            </div>
            <div style={{fontSize: '13px', color: '#a0a0a0', letterSpacing: '1px'}}>
              MAX CASHBACK
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '36px', fontWeight: '800', color: 'var(--accent-cyan)'}}>
              $1,750
            </div>
            <div style={{fontSize: '13px', color: '#a0a0a0', letterSpacing: '1px'}}>
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
          marginBottom: '16px',
          color: '#fff'
        }}>
          VIP Membership Tiers
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#a0a0a0',
          marginBottom: '40px',
          fontSize: '15px'
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
                      fontSize: '14px',
                      color: '#d0d0d0'
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
                  <div style={{fontSize: '11px', color: '#888', marginBottom: '4px'}}>
                    REQUIREMENT
                  </div>
                  <div style={{fontSize: '13px', color: '#e0e0e0', fontWeight: '600'}}>
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
          fontSize: '11px',
          fontWeight: '700',
          color: '#fff',
          letterSpacing: '1px'
        }}>
          REGISTERED MEMBERS ONLY
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
              fontSize: '16px',
              color: '#c0c0c0',
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
                <div style={{fontSize: '28px', fontWeight: '700', color: '#ffd700'}}>$1,000</div>
                <div style={{fontSize: '12px', color: '#888'}}>1ST PRIZE</div>
              </div>
              <div style={{
                padding: '16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '28px', fontWeight: '700', color: '#c0c0c0'}}>$500</div>
                <div style={{fontSize: '12px', color: '#888'}}>2ND PRIZE</div>
              </div>
              <div style={{
                padding: '16px',
                background: 'var(--bg-tertiary)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '28px', fontWeight: '700', color: '#cd7f32'}}>$250</div>
                <div style={{fontSize: '12px', color: '#888'}}>3RD PRIZE</div>
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
                  <div style={{fontSize: '15px', fontWeight: '600', color: 'var(--accent-success)'}}>
                    You're Eligible for the Lottery!
                  </div>
                  <div style={{fontSize: '13px', color: '#a0a0a0'}}>
                    Connect a casino below to start earning entries
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
                  <div style={{fontSize: '15px', fontWeight: '600', color: 'var(--accent-danger)'}}>
                    Account Required for Lottery
                  </div>
                  <div style={{fontSize: '13px', color: '#a0a0a0'}}>
                    <a href="/register" style={{color: 'var(--accent-primary)', textDecoration: 'underline'}}>Create a free account</a> to participate in weekly draws
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{
            width: '280px',
            height: '280px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '100px',
            boxShadow: '0 20px 60px rgba(99, 102, 241, 0.4)',
            animation: 'pulse 2s ease-in-out infinite',
            flexShrink: 0
          }}>
            🎰
          </div>
        </div>
      </div>

      {/* Forum Section */}
      <div style={{
        marginBottom: '80px',
        padding: '40px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 14px',
          background: 'var(--accent-cyan)',
          borderRadius: '50px',
          fontSize: '11px',
          fontWeight: '700',
          color: '#000',
          letterSpacing: '1px',
          marginBottom: '20px'
        }}>
          REGISTERED MEMBERS ONLY
        </div>
        
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#fff'
        }}>
          💬 Community Forum
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#a0a0a0',
          maxWidth: '600px',
          margin: '0 auto 24px',
          lineHeight: '1.7'
        }}>
          Join our exclusive community of players. Share strategies, discuss casinos, 
          report issues, and connect with fellow VIP members.
        </p>
        
        {isAuthenticated ? (
          <button style={{
            padding: '14px 32px',
            background: 'var(--accent-cyan)',
            border: 'none',
            borderRadius: '10px',
            color: '#000',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer'
          }}>
            ACCESS FORUM (Coming Soon)
          </button>
        ) : (
          <a href="/register" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            color: '#a0a0a0',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Register to Access Forum
          </a>
        )}
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
          color: '#fff'
        }}>
          How Rakestake VIP Works
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
              fontSize: '28px',
              color: '#fff'
            }}>
              1
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#fff'}}>
              Choose Your Casino
            </h3>
            <p style={{fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6'}}>
              Click "Redeem VIP Access" and select which partner casino you want to connect.
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
              fontSize: '28px',
              color: '#fff'
            }}>
              2
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#fff'}}>
              Sign Up & Play
            </h3>
            <p style={{fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6'}}>
              Register through our link and play normally. Your cashback is tracked automatically.
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
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: '#fff'}}>
              Earn Rewards
            </h3>
            <p style={{fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6'}}>
              Receive weekly cashback, earn lottery entries, and unlock VIP perks as you play.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        padding: '20px',
        background: 'rgba(239, 68, 68, 0.05)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{fontSize: '12px', color: '#888', lineHeight: '1.6'}}>
          18+ | Gambling can be addictive. Please play responsibly. | 
          VIP rewards subject to terms and conditions. | 
          Some offers may be geo-restricted. | 
          Lottery and Forum access require free account registration.
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
            background: 'rgba(0, 0, 0, 0.85)',
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
              maxHeight: '85vh',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
            data-testid="casino-modal"
          >
            {/* Modal Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid var(--border-color)',
              textAlign: 'center',
              background: selectedTier?.gradient || 'var(--bg-tertiary)',
              flexShrink: 0
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
                fontSize: '15px',
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
                width: '40px',
                height: '40px',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              data-testid="modal-close"
            >
              ✕
            </button>

            {/* Search Input */}
            <div style={{padding: '20px 24px 0', flexShrink: 0}}>
              <input
                type="text"
                placeholder="Search casinos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="casino-search"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: 'var(--bg-tertiary)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = selectedTier?.color || 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>

            {/* Casino Options */}
            <div style={{padding: '20px 24px', overflowY: 'auto', flex: 1}}>
              <div style={{
                display: 'grid',
                gap: '12px'
              }}>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
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
                          color: '#fff',
                          marginBottom: '4px'
                        }}>
                          {campaign.casino_name}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: 'var(--accent-success)'
                        }}>
                          {campaign.bonus_value}
                        </div>
                        {campaign.exclusive_extra && (
                          <div style={{
                            fontSize: '12px',
                            color: '#ffd700',
                            marginTop: '4px'
                          }}>
                            + {campaign.exclusive_extra}
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <div style={{
                        color: '#888',
                        fontSize: '20px'
                      }}>
                        →
                      </div>
                    </button>
                  ))
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#888'
                  }}>
                    <div style={{fontSize: '48px', marginBottom: '12px'}}>🔍</div>
                    <p>No casinos found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>

              {/* Info Note */}
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '10px',
                fontSize: '13px',
                color: '#b0b0b0',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                💡 Sign up through our link to automatically connect your account to the Rakestake VIP system 
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
