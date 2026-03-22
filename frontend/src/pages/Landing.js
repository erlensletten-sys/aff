import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Trophy, TrendingUp, Wallet, Gift, ChevronRight, 
  ExternalLink, Sparkles, Crown, Star, Users, ArrowRight
} from 'lucide-react';
import { IconBadge, LiveIndicator } from '../components/AnimatedElements';
import { OfficialCasinoLogo, getCasinoBrand } from '../components/CasinoLogos';
import CasinoModal from '../components/CasinoModal';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Landing() {
  const [campaigns, setCampaigns] = useState([]);
  const [userXP, setUserXP] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCasino, setSelectedCasino] = useState(null);

  const vipLevels = [
    { name: 'Bronze', xp: 0, rakeback: 2, color: '#cd7f32' },
    { name: 'Silver', xp: 1000, rakeback: 5, color: '#c0c0c0' },
    { name: 'Gold', xp: 10000, rakeback: 8, color: '#ffd700' },
    { name: 'Platinum', xp: 50000, rakeback: 12, color: '#e5e4e2' },
    { name: 'Diamond', xp: 100000, rakeback: 15, color: '#b9f2ff' }
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

  return (
    <div className="landing">
      {/* Animated Hero Section */}
      <div style={{
        position: 'relative',
        textAlign: 'center',
        padding: '100px 20px 80px',
        maxWidth: '1000px',
        margin: '0 auto',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {/* Glowing Orbs */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '5%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite reverse'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '20%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 10s ease-in-out infinite'
          }} />
          
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: i % 2 === 0 ? '#ffd700' : '#7c3aed',
                borderRadius: '50%',
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                opacity: 0.6,
                animation: `particle ${4 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            marginBottom: '24px',
            animation: 'fadeInUp 0.6s ease-out'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,140,0,0.1))',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '30px',
              animation: 'glow 3s ease-in-out infinite'
            }}>
              <Zap size={18} color="#ffd700" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffd700', letterSpacing: '1px' }}>
                CRYPTO CASINO AGGREGATOR
              </span>
            </div>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: '900',
            letterSpacing: '-3px',
            marginBottom: '24px',
            lineHeight: '1.05',
            color: 'var(--text-primary)',
            animation: 'fadeInUp 0.6s ease-out 0.1s both'
          }}>
            Up to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              15% Rakeback
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              on Top Crypto Casinos
            </span>
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.7',
            animation: 'fadeInUp 0.6s ease-out 0.2s both'
          }}>
            Join Rakestake VIP and earn extra rakeback on top of your favorite casino's existing bonuses.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s ease-out 0.3s both'
          }}>
            <Link to="/vip" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              color: '#000',
              fontWeight: '700',
              padding: '18px 36px',
              fontSize: '15px',
              border: 'none',
              borderRadius: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,215,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,215,0,0.3)';
            }}
            >
              <Crown size={20} />
              JOIN VIP CLUB
            </Link>
            <a href="#casinos" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              fontSize: '15px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            >
              VIEW CASINOS
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Stats Row */}
          <div style={{
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            marginTop: '70px',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s ease-out 0.4s both'
          }}>
            {[
              { icon: Trophy, value: campaigns.length || 8, label: 'PARTNER CASINOS', color: '#ffd700' },
              { icon: TrendingUp, value: '15%', label: 'MAX RAKEBACK', color: '#22c55e' },
              { icon: Gift, value: '$1,750', label: 'WEEKLY LOTTERY', color: '#06b6d4' }
            ].map((stat, idx) => (
              <div 
                key={idx}
                style={{
                  textAlign: 'center',
                  padding: '24px 32px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  minWidth: '140px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = `${stat.color}40`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <div style={{fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px'}}>
                  {stat.value}
                </div>
                <div style={{fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1.5px', fontWeight: '600'}}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* XP Widget */}
      <div style={{
        maxWidth: '500px',
        margin: '0 auto 80px',
        padding: '20px 24px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px'
      }}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}80)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Star size={20} color="#fff" />
            </div>
            <div>
              <div style={{fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)'}}>{currentLevel.name}</div>
              <div style={{fontSize: '12px', color: currentLevel.color}}>{currentLevel.rakeback}% Rakeback</div>
            </div>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--accent-primary)'}}>{formatNumber(userXP)} XP</div>
            {nextLevel && (
              <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>{formatNumber(nextLevel.xp - userXP)} to {nextLevel.name}</div>
            )}
          </div>
        </div>
        <div style={{height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden'}}>
          <div style={{
            height: '100%',
            width: `${progressToNext}%`,
            background: `linear-gradient(90deg, ${currentLevel.color}, ${nextLevel?.color || currentLevel.color})`,
            borderRadius: 3
          }} />
        </div>
      </div>

      {/* Casino Cards */}
      <div id="casinos" style={{
        maxWidth: '1200px',
        margin: '0 auto 100px',
        padding: '0 20px'
      }}>
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <div style={{marginBottom: '16px'}}>
            <IconBadge icon={Trophy} text="PARTNER CASINOS" color="var(--accent-primary)" />
          </div>
          <h2 style={{fontSize: '40px', fontWeight: '800', marginBottom: '14px', color: 'var(--text-primary)', letterSpacing: '-1px'}}>
            Play Smarter, Earn More
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px', margin: '0 auto'}}>
            Connect through Rakestake for exclusive rakeback on top of casino bonuses
          </p>
        </div>

        {/* Featured Casinos - Top Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '16px'
        }}>
          {loading ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'var(--text-muted)'}}>
              Loading casinos...
            </div>
          ) : (
            campaigns.slice(0, 3).map((casino) => {
              const brand = getCasinoBrand(casino.casino_slug);
              return (
                <div
                  key={casino.casino_slug}
                  data-testid={`casino-card-${casino.casino_slug}`}
                  onClick={() => setSelectedCasino(casino)}
                  style={{
                    background: `linear-gradient(160deg, ${brand.primaryColor} 0%, #0a0a0f 100%)`,
                    border: `1px solid ${brand.accentColor}30`,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${brand.accentColor}25`;
                    e.currentTarget.style.borderColor = `${brand.accentColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = `${brand.accentColor}30`;
                  }}
                >
                  {/* Glow Effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: `linear-gradient(180deg, ${brand.accentColor}15 0%, transparent 100%)`,
                    pointerEvents: 'none'
                  }} />

                  <div style={{padding: '28px 24px', position: 'relative'}}>
                    {/* Header */}
                    <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px'}}>
                      <OfficialCasinoLogo slug={casino.casino_slug} size={56} />
                      <div style={{
                        padding: '6px 14px',
                        background: `${brand.accentColor}20`,
                        border: `1px solid ${brand.accentColor}40`,
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: brand.accentColor
                      }}>
                        +{casino.rakeback_rate ? `${(casino.rakeback_rate * 100).toFixed(0)}` : '10'}% Rakeback
                      </div>
                    </div>

                    {/* Casino Name */}
                    <h3 style={{fontSize: '22px', fontWeight: '800', color: '#ffffff', marginBottom: '6px'}}>
                      {casino.casino_name}
                    </h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px'}}>
                      <LiveIndicator />
                      <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.5)'}}>•</span>
                      <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <Users size={12} />
                        {Math.floor(Math.random() * 500 + 800).toLocaleString()} playing
                      </span>
                    </div>

                    {/* Bonus */}
                    <div style={{
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}>
                      <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', fontWeight: '600', letterSpacing: '0.5px'}}>
                        WELCOME BONUS
                      </div>
                      <div style={{fontSize: '16px', fontWeight: '700', color: '#ffffff'}}>
                        {casino.bonus_value}
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      data-testid={`casino-cta-${casino.casino_slug}`}
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
                        padding: '14px',
                        background: brand.accentColor,
                        borderRadius: '12px',
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
                </div>
              );
            })
          )}
        </div>

        {/* Secondary Casinos - Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px'
        }}>
          {!loading && campaigns.slice(3).map((casino) => {
            const brand = getCasinoBrand(casino.casino_slug);
            return (
              <div
                key={casino.casino_slug}
                data-testid={`casino-card-${casino.casino_slug}`}
                onClick={() => setSelectedCasino(casino)}
                style={{
                  background: `linear-gradient(160deg, ${brand.primaryColor}dd 0%, #0a0a0f 100%)`,
                  border: `1px solid ${brand.accentColor}25`,
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = `${brand.accentColor}50`;
                  e.currentTarget.style.boxShadow = `0 12px 30px ${brand.accentColor}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `${brand.accentColor}25`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <OfficialCasinoLogo slug={casino.casino_slug} size={48} />
                <div style={{flex: 1}}>
                  <h4 style={{fontSize: '16px', fontWeight: '700', color: '#ffffff', marginBottom: '4px'}}>
                    {casino.casino_name}
                  </h4>
                  <div style={{fontSize: '13px', color: brand.accentColor, fontWeight: '600'}}>
                    +{casino.rakeback_rate ? `${(casino.rakeback_rate * 100).toFixed(0)}` : '10'}% Rakeback
                  </div>
                </div>
                <ChevronRight size={20} color="rgba(255,255,255,0.4)" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Casino Modal */}
      {selectedCasino && (
        <CasinoModal
          casino={selectedCasino}
          onClose={() => setSelectedCasino(null)}
        />
      )}

      {/* VIP Levels */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto 100px',
        padding: '0 20px'
      }}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <IconBadge icon={Sparkles} text="XP-BASED REWARDS" color="var(--accent-primary)" />
          <h2 style={{fontSize: '36px', fontWeight: '800', marginTop: '16px', marginBottom: '12px', color: 'var(--text-primary)'}}>
            VIP Levels
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '15px'}}>
            Earn XP from wagers. Higher level = more rakeback.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {vipLevels.map((level) => (
            <div
              key={level.name}
              style={{
                padding: '20px 24px',
                background: 'var(--bg-glass)',
                border: `1px solid ${level.color}40`,
                borderRadius: '12px',
                textAlign: 'center',
                minWidth: '140px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = level.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${level.color}40`;
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${level.color}, ${level.color}80)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px'
              }}>
                <Star size={18} color="#fff" />
              </div>
              <div style={{fontSize: '14px', fontWeight: '700', color: level.color, marginBottom: '4px'}}>
                {level.name}
              </div>
              <div style={{fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)'}}>
                {level.rakeback}%
              </div>
              <div style={{fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px'}}>
                {level.xp === 0 ? 'Start' : `${formatNumber(level.xp)} XP`}
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
            View VIP Benefits
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto 100px',
        padding: '48px 40px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{fontSize: '28px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)'}}>
          Start Earning Extra Rakeback
        </h2>
        <p style={{fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px'}}>
          Join Rakestake VIP and maximize your rewards.
        </p>
        <Link to="/register" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--accent-primary)',
          color: '#fff',
          fontWeight: '700',
          padding: '14px 32px',
          fontSize: '15px',
          borderRadius: '10px',
          textDecoration: 'none'
        }}>
          <Wallet size={18} />
          Get Started Free
        </Link>
      </div>
    </div>
  );
}

export default Landing;
