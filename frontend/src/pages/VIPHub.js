import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Star, Trophy, Gift, TrendingUp, Search, X,
  ExternalLink, ChevronRight, Sparkles, Zap, ArrowRight
} from 'lucide-react';
import { IconBadge, LiveIndicator } from '../components/AnimatedElements';
import { OfficialCasinoLogo, getCasinoBrand } from '../components/CasinoLogos';
import CasinoModal from '../components/CasinoModal';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function VIPHub() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userXP, setUserXP] = useState(0);
  const [selectedCasino, setSelectedCasino] = useState(null);
  const isAuthenticated = !!localStorage.getItem('token');

  const vipLevels = [
    { id: 'bronze', name: 'Bronze', xp: 0, rakeback: 2, color: '#cd7f32', benefits: ['2% Rakeback', 'Monthly Lottery Entry', 'Community Access'] },
    { id: 'silver', name: 'Silver', xp: 1000, rakeback: 5, color: '#c0c0c0', benefits: ['5% Rakeback', '2x Lottery Entries', 'Priority Support'] },
    { id: 'gold', name: 'Gold', xp: 10000, rakeback: 8, color: '#ffd700', benefits: ['8% Rakeback', '5x Lottery Entries', 'VIP Support'] },
    { id: 'platinum', name: 'Platinum', xp: 50000, rakeback: 12, color: '#e5e4e2', benefits: ['12% Rakeback', '10x Lottery Entries', 'Personal Manager'] },
    { id: 'diamond', name: 'Diamond', xp: 100000, rakeback: 15, color: '#b9f2ff', benefits: ['15% Rakeback', '25x Lottery Entries', 'VIP Host', 'Priority Withdrawals'] }
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

  const filteredCampaigns = campaigns.filter(c => 
    c.casino_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumber = (num) => num.toLocaleString('en-US');

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
      {/* Hero */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '48px 40px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px'
      }}>
        <div style={{marginBottom: '16px'}}>
          <IconBadge icon={Crown} text="VIP CLUB" color="#ffd700" />
        </div>
        
        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          marginBottom: '12px',
          color: 'var(--text-primary)'
        }}>
          Rakestake VIP
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '32px',
          maxWidth: '500px',
          margin: '0 auto 32px'
        }}>
          Up to 15% rakeback on top of casino bonuses. Earn XP from every wager.
        </p>

        {/* XP Progress */}
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '16px 20px',
          background: 'var(--bg-tertiary)',
          borderRadius: '12px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}80)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Star size={16} color="#fff" />
              </div>
              <span style={{fontWeight: '700', color: currentLevel.color}}>{currentLevel.name}</span>
            </div>
            <span style={{fontWeight: '700', color: 'var(--accent-primary)'}}>{formatNumber(userXP)} XP</span>
          </div>
          <div style={{height: 6, background: 'var(--bg-primary)', borderRadius: 3, overflow: 'hidden'}}>
            <div style={{
              height: '100%',
              width: `${progressToNext}%`,
              background: `linear-gradient(90deg, ${currentLevel.color}, ${nextLevel?.color || currentLevel.color})`,
              borderRadius: 3
            }} />
          </div>
          {nextLevel && (
            <div style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'right'}}>
              {formatNumber(nextLevel.xp - userXP)} XP to {nextLevel.name}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          marginTop: '32px',
          flexWrap: 'wrap'
        }}>
          <div style={{textAlign: 'center'}}>
            <div style={{color: '#ffd700', marginBottom: '4px'}}><Trophy size={20} /></div>
            <div style={{fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)'}}>{campaigns.length}</div>
            <div style={{fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px'}}>CASINOS</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{color: 'var(--accent-success)', marginBottom: '4px'}}><TrendingUp size={20} /></div>
            <div style={{fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)'}}>15%</div>
            <div style={{fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px'}}>MAX RAKEBACK</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{color: 'var(--accent-cyan)', marginBottom: '4px'}}><Gift size={20} /></div>
            <div style={{fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)'}}>$1,750</div>
            <div style={{fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px'}}>WEEKLY LOTTERY</div>
          </div>
        </div>
      </div>

      {/* VIP Tiers */}
      <div style={{marginBottom: '60px'}}>
        <h2 style={{fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '32px', color: 'var(--text-primary)'}}>
          VIP Levels
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {vipLevels.map((tier) => {
            const isUnlocked = userXP >= tier.xp;
            const isCurrent = currentLevel.id === tier.id;
            
            return (
              <div
                key={tier.id}
                style={{
                  background: 'var(--bg-glass)',
                  border: isCurrent ? `2px solid ${tier.color}` : '1px solid var(--border-color)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  opacity: isUnlocked ? 1 : 0.5
                }}
              >
                <div style={{
                  padding: '20px',
                  background: `linear-gradient(135deg, ${tier.color}20, ${tier.color}10)`,
                  borderBottom: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${tier.color}, ${tier.color}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px'
                  }}>
                    <Star size={20} color="#fff" />
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '700', color: tier.color}}>{tier.name}</div>
                  <div style={{fontSize: '28px', fontWeight: '900', color: 'var(--text-primary)'}}>{tier.rakeback}%</div>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>
                    {tier.xp === 0 ? 'Starting Level' : `${formatNumber(tier.xp)} XP`}
                  </div>
                </div>

                <div style={{padding: '16px'}}>
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
                        <Zap size={12} color={tier.color} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Partner Casinos */}
      <div style={{marginBottom: '60px'}}>
        <h2 style={{fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '12px', color: 'var(--text-primary)'}}>
          Partner Casinos
        </h2>
        <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px', fontSize: '14px'}}>
          Connect through Rakestake for extra rakeback on top of casino bonuses
        </p>

        {/* Search */}
        <div style={{maxWidth: '400px', margin: '0 auto 24px', position: 'relative'}}>
          <Search size={18} style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)'}} />
          <input
            type="text"
            placeholder="Search casinos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px 12px 44px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {loading ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)'}}>
              Loading casinos...
            </div>
          ) : (
            filteredCampaigns.map((casino) => {
              const brand = getCasinoBrand(casino.casino_slug);
              return (
                <div
                  key={casino.casino_slug}
                  data-testid={`vip-casino-card-${casino.casino_slug}`}
                  onClick={() => setSelectedCasino(casino)}
                  style={{
                    background: `linear-gradient(160deg, ${brand.primaryColor}ee 0%, #0a0a0f 100%)`,
                    border: `1px solid ${brand.accentColor}30`,
                    borderRadius: '16px',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${brand.accentColor}60`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px ${brand.accentColor}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${brand.accentColor}30`;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px'}}>
                    <OfficialCasinoLogo slug={casino.casino_slug} size={48} />
                    <div style={{flex: 1}}>
                      <h3 style={{fontSize: '17px', fontWeight: '700', color: '#ffffff', marginBottom: '4px'}}>
                        {casino.casino_name}
                      </h3>
                      <LiveIndicator />
                    </div>
                    <div style={{
                      padding: '6px 12px',
                      background: `${brand.accentColor}20`,
                      border: `1px solid ${brand.accentColor}40`,
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: brand.accentColor
                    }}>
                      +{casino.rakeback_rate ? `${(casino.rakeback_rate * 100).toFixed(0)}` : '10'}%
                    </div>
                  </div>

                  <div style={{
                    padding: '14px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '10px',
                    marginBottom: '14px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}>
                    <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontWeight: '600', letterSpacing: '0.5px'}}>RAKESTAKE BONUS</div>
                    <div style={{fontSize: '16px', fontWeight: '700', color: brand.accentColor}}>
                      Up to {casino.rakeback_rate ? `${(casino.rakeback_rate * 100).toFixed(0)}` : '10'}% Rakeback
                    </div>
                    <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px'}}>
                      + {casino.bonus_value}
                    </div>
                  </div>

                  <button
                    data-testid={`vip-casino-cta-${casino.casino_slug}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCasino(casino);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '12px',
                      background: brand.accentColor,
                      borderRadius: '10px',
                      border: 'none',
                      color: brand.primaryColor === '#0f0f1a' ? '#ffffff' : '#000000',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Play & Earn More
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Lottery */}
      <div style={{
        padding: '32px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        marginBottom: '40px'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
          <Gift size={20} color="var(--accent-primary)" />
          <h3 style={{fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)'}}>Weekly VIP Lottery</h3>
          <span style={{
            padding: '2px 8px',
            background: 'var(--accent-primary)',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '600',
            color: '#fff'
          }}>
            MEMBERS ONLY
          </span>
        </div>
        <p style={{fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px'}}>
          Higher VIP level = more lottery entries. Diamond members get 25x entries.
        </p>

        <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
          <div style={{padding: '16px 24px', background: 'var(--bg-tertiary)', borderRadius: '10px', textAlign: 'center'}}>
            <div style={{fontSize: '24px', fontWeight: '700', color: '#ffd700'}}>$1,000</div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>1ST PRIZE</div>
          </div>
          <div style={{padding: '16px 24px', background: 'var(--bg-tertiary)', borderRadius: '10px', textAlign: 'center'}}>
            <div style={{fontSize: '24px', fontWeight: '700', color: '#c0c0c0'}}>$500</div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>2ND PRIZE</div>
          </div>
          <div style={{padding: '16px 24px', background: 'var(--bg-tertiary)', borderRadius: '10px', textAlign: 'center'}}>
            <div style={{fontSize: '24px', fontWeight: '700', color: '#cd7f32'}}>$250</div>
            <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>3RD PRIZE</div>
          </div>
        </div>

        {!isAuthenticated && (
          <Link to="/register" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px',
            padding: '10px 20px',
            background: 'var(--accent-primary)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Register to Enter
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Casino Modal */}
      {selectedCasino && (
        <CasinoModal
          casino={selectedCasino}
          onClose={() => setSelectedCasino(null)}
        />
      )}
    </div>
  );
}

export default VIPHub;
