import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function VIPHub() {
  const [campaigns, setCampaigns] = useState([]);
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const [allRes, featuredRes] = await Promise.all([
        fetch(`${API_URL}/api/vip/campaigns`),
        fetch(`${API_URL}/api/vip/campaigns/featured`)
      ]);
      
      if (allRes.ok) {
        const allData = await allRes.json();
        setCampaigns(allData.campaigns || []);
      }
      
      if (featuredRes.ok) {
        const featuredData = await featuredRes.json();
        setFeaturedCampaigns(featuredData.campaigns || []);
      }
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = activeFilter === 'featured' 
    ? featuredCampaigns 
    : campaigns;

  const handleClaimClick = (campaign) => {
    // Open referral link in new tab
    window.open(campaign.referral_link, '_blank', 'noopener,noreferrer');
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    // Could add a toast notification here
  };

  return (
    <div style={{maxWidth: '1400px', margin: '0 auto', padding: '40px 20px'}}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '60px 40px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
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
          VIP EXCLUSIVE
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
          VIP HUB
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: 'var(--text-secondary)',
          marginBottom: '8px',
          maxWidth: '600px',
          margin: '0 auto 16px'
        }}>
          Exclusive Bonuses & Rewards
        </p>
        
        <p style={{
          fontSize: '14px',
          color: 'var(--text-muted)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.8'
        }}>
          Sign up through our exclusive referral links and receive extra bonuses, 
          higher cashback, and VIP rewards on top of what the casinos normally offer.
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
              EXCLUSIVE OFFERS
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '36px', fontWeight: '800', color: 'var(--accent-warning)'}}>
              $50K+
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>
              IN BONUS VALUE
            </div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '36px', fontWeight: '800', color: 'var(--accent-cyan)'}}>
              24/7
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px'}}>
              VIP SUPPORT
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '40px',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setActiveFilter('all')}
          data-testid="filter-all"
          style={{
            padding: '14px 32px',
            background: activeFilter === 'all' 
              ? 'linear-gradient(135deg, #667eea, #764ba2)'
              : 'rgba(99, 102, 241, 0.05)',
            border: activeFilter === 'all' ? 'none' : '2px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          ALL OFFERS ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveFilter('featured')}
          data-testid="filter-featured"
          style={{
            padding: '14px 32px',
            background: activeFilter === 'featured' 
              ? 'linear-gradient(135deg, #ffd700, #ff8c00)'
              : 'rgba(255, 215, 0, 0.05)',
            border: activeFilter === 'featured' ? 'none' : '2px solid rgba(255, 215, 0, 0.3)',
            color: activeFilter === 'featured' ? '#000' : '#ffd700',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          FEATURED ({featuredCampaigns.length})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{textAlign: 'center', padding: '60px'}}>
          <div style={{fontSize: '48px', marginBottom: '16px'}}>⏳</div>
          <p style={{color: 'var(--text-muted)'}}>Loading VIP offers...</p>
        </div>
      )}

      {/* Campaigns Grid */}
      {!loading && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '24px'
        }}>
          {filteredCampaigns.map((campaign, index) => (
            <div
              key={campaign.casino_slug || index}
              data-testid={`campaign-${campaign.casino_slug}`}
              style={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                border: campaign.is_featured 
                  ? '2px solid rgba(255, 215, 0, 0.5)'
                  : '1px solid var(--border-color)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = campaign.is_featured
                  ? '0 20px 60px rgba(255, 215, 0, 0.3)'
                  : '0 20px 60px rgba(99, 102, 241, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Featured Badge */}
              {campaign.is_featured && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '6px 14px',
                  background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                  borderRadius: '50px',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '1px',
                  zIndex: 2
                }}>
                  FEATURED
                </div>
              )}

              {/* Header */}
              <div style={{
                padding: '24px 24px 16px',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#fff'
                  }}>
                    {campaign.casino_name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      marginBottom: '4px',
                      color: 'var(--text-primary)'
                    }}>
                      {campaign.casino_name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--accent-success)',
                      fontWeight: '600'
                    }}>
                      {campaign.bonus_title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{padding: '20px 24px'}}>
                {/* Bonus Value */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: 'var(--accent-success)',
                    marginBottom: '4px'
                  }}>
                    {campaign.bonus_value}
                  </div>
                  {campaign.exclusive_extra && (
                    <div style={{
                      fontSize: '12px',
                      color: '#ffd700',
                      fontWeight: '600',
                      marginTop: '8px',
                      padding: '6px 12px',
                      background: 'rgba(255, 215, 0, 0.1)',
                      borderRadius: '6px',
                      display: 'inline-block'
                    }}>
                      ⭐ {campaign.exclusive_extra}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                  marginBottom: '16px'
                }}>
                  {campaign.description}
                </p>

                {/* Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  {campaign.min_deposit && (
                    <div style={{
                      padding: '10px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '8px'
                    }}>
                      <div style={{fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px'}}>
                        MIN DEPOSIT
                      </div>
                      <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)'}}>
                        {campaign.min_deposit}
                      </div>
                    </div>
                  )}
                  {campaign.wagering_requirement && (
                    <div style={{
                      padding: '10px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '8px'
                    }}>
                      <div style={{fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px'}}>
                        WAGERING
                      </div>
                      <div style={{fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)'}}>
                        {campaign.wagering_requirement}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bonus Code */}
                {campaign.bonus_code && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                    padding: '12px 16px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px dashed var(--accent-primary)',
                    borderRadius: '10px'
                  }}>
                    <div style={{flex: 1}}>
                      <div style={{fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px'}}>
                        BONUS CODE
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: 'var(--accent-primary)',
                        fontFamily: 'monospace',
                        letterSpacing: '2px'
                      }}>
                        {campaign.bonus_code}
                      </div>
                    </div>
                    <button
                      onClick={() => copyCode(campaign.bonus_code)}
                      style={{
                        padding: '10px 16px',
                        background: 'var(--accent-primary)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      COPY
                    </button>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleClaimClick(campaign)}
                  data-testid={`claim-${campaign.casino_slug}`}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: campaign.is_featured
                      ? 'linear-gradient(135deg, #ffd700, #ff8c00)'
                      : 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none',
                    borderRadius: '12px',
                    color: campaign.is_featured ? '#000' : '#fff',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    letterSpacing: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  CLAIM BONUS
                </button>

                {/* Terms */}
                {campaign.terms && (
                  <p style={{
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    marginTop: '12px'
                  }}>
                    {campaign.terms}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCampaigns.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '80px 40px',
          background: 'var(--bg-glass)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{fontSize: '64px', marginBottom: '20px'}}>🎰</div>
          <h3 style={{fontSize: '24px', marginBottom: '12px', color: 'var(--text-primary)'}}>
            No Offers Available
          </h3>
          <p style={{color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto'}}>
            Check back soon for exclusive VIP bonuses and rewards from top casinos.
          </p>
        </div>
      )}

      {/* How It Works Section */}
      <div style={{
        marginTop: '80px',
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
          How VIP Hub Works
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
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
              fontSize: '24px'
            }}>
              1
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Choose Your Offer
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Browse our curated list of exclusive casino bonuses and select the best one for you.
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
              fontSize: '24px'
            }}>
              2
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Sign Up via Our Link
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Click "Claim Bonus" to register through our referral link and unlock exclusive extras.
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
              color: '#000'
            }}>
              3
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)'}}>
              Enjoy Extra Rewards
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              Get your standard casino bonus PLUS NoToGreed exclusive perks like extra spins and cashback.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: 'rgba(239, 68, 68, 0.05)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <p style={{fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
          18+ | Gambling can be addictive. Please play responsibly. | 
          Offers subject to terms and conditions. | 
          Some offers may be geo-restricted. | 
          NoToGreed may receive commission from referrals.
        </p>
      </div>
    </div>
  );
}

export default VIPHub;
