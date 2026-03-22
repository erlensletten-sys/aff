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

// Detailed casino information with real data
const casinoDetails = [
  {
    slug: 'stake',
    name: 'Stake',
    link: 'https://stake.com/?c=rakestakevip',
    rakeback: 10,
    bonus: 'Up to $3,000',
    description: "World's largest crypto casino. Known for Stake Originals, instant payouts, and industry-leading sports betting odds.",
    highlights: ['#1 Crypto Casino', 'Instant Withdrawals', 'Stake Originals', 'Sports Betting'],
    ctaText: 'Play Stake + Get 10% Back'
  },
  {
    slug: 'shuffle',
    name: 'Shuffle',
    link: 'https://shuffle.com?r=rakestakevip',
    rakeback: 15,
    bonus: 'Up to $1,500 + 100 FS',
    description: 'Provably fair crypto casino with transparent RTP. Best known for high-stakes games and VIP rewards.',
    highlights: ['Provably Fair', 'High RTP', 'VIP Rewards', 'Fast Payouts'],
    ctaText: 'Unlock 15% Rakeback'
  },
  {
    slug: 'rainbet',
    name: 'Rainbet',
    link: 'https://rainbet.com?r=rakestakevip',
    rakeback: 12,
    bonus: 'Up to $1,000 + Daily Rakeback',
    description: 'Community-driven casino with daily rakeback and frequent promotions. Strong on slots and live casino.',
    highlights: ['Daily Rakeback', 'Active Community', 'Slots Focus', 'Live Casino'],
    ctaText: 'Join & Stack Rewards'
  },
  {
    slug: 'fortunejack',
    name: 'FortuneJack',
    link: 'https://fortunejack.com/?ref=rakestake',
    rakeback: 8,
    bonus: 'Up to 6 BTC + 350 FS',
    description: 'One of the oldest crypto casinos (est. 2014). Massive game library with 3,000+ titles and lottery games.',
    highlights: ['Est. 2014', '3,000+ Games', 'Lottery Games', 'Dice & Crash'],
    ctaText: 'Claim Up to 6 BTC + Rakeback'
  },
  {
    slug: 'bitstarz',
    name: 'BitStarz',
    link: 'https://bitstarz.com/?ref=rakestake',
    rakeback: 10,
    bonus: 'Up to 5 BTC + 180 FS',
    description: 'Award-winning casino with fast withdrawals (avg 10 min). Top choice for slots and table games.',
    highlights: ['Award-Winning', '10 Min Withdrawals', 'Slots Leader', '4,000+ Games'],
    ctaText: 'Get 5 BTC + Extra Rakeback'
  },
  {
    slug: '1win',
    name: '1win',
    link: 'https://1win.com/?ref=rakestake',
    rakeback: 12,
    bonus: 'Up to $10,000',
    description: 'Global sportsbook and casino with competitive odds. Excellent for esports and live betting.',
    highlights: ['Sports & Casino', 'Esports Focus', 'Live Betting', 'High Limits'],
    ctaText: 'Bet Sports + Earn 12% Back'
  },
  {
    slug: '1xbet',
    name: '1xBet',
    link: 'https://1xbet.com/?ref=rakestake',
    rakeback: 8,
    bonus: 'Up to $1,500 + 150 FS',
    description: 'Leading global bookmaker with 1,000+ daily events. Wide crypto support and competitive odds.',
    highlights: ['1,000+ Events/Day', 'Best Odds', 'Multi-Currency', 'Live Streaming'],
    ctaText: 'Start Betting Smarter'
  },
  {
    slug: 'royalpartners',
    name: 'RoyalPartners',
    link: 'https://royalpartners.com/?ref=rakestake',
    rakeback: 15,
    bonus: 'Up to $3,000 + Cashback',
    description: 'Premium VIP-focused casino with generous cashback and dedicated account managers.',
    highlights: ['VIP Program', 'Personal Manager', 'Cashback Rewards', 'Exclusive Bonuses'],
    ctaText: 'Go VIP + 15% Rakeback'
  }
];

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

      {/* Casino Cards - Professional Stacked Layout */}
      <div id="casinos" style={{
        maxWidth: '900px',
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

        {/* Professional Stacked Casino Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {loading ? (
            <div style={{textAlign: 'center', padding: '60px', color: 'var(--text-muted)'}}>
              Loading casinos...
            </div>
          ) : (
            casinoDetails.map((casinoData, idx) => {
              const casino = campaigns.find(c => c.casino_slug === casinoData.slug) || {
                casino_slug: casinoData.slug,
                casino_name: casinoData.name,
                referral_link: casinoData.link,
                rakeback_rate: casinoData.rakeback / 100,
                bonus_value: casinoData.bonus
              };
              const brand = getCasinoBrand(casinoData.slug);
              
              return (
                <div
                  key={casinoData.slug}
                  data-testid={`casino-card-${casinoData.slug}`}
                  onClick={() => setSelectedCasino({...casino, ...casinoData})}
                  style={{
                    background: `linear-gradient(135deg, ${brand.primaryColor}f0 0%, #0a0a0f 100%)`,
                    border: `1px solid ${brand.accentColor}30`,
                    borderRadius: '24px',
                    padding: '32px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 20px 50px ${brand.accentColor}25`;
                    e.currentTarget.style.borderColor = `${brand.accentColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = `${brand.accentColor}30`;
                  }}
                >
                  {/* Top Glow */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: `linear-gradient(180deg, ${brand.accentColor}10 0%, transparent 100%)`,
                    pointerEvents: 'none'
                  }} />

                  {/* Header Row */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '16px',
                    marginBottom: '20px',
                    position: 'relative',
                    flexWrap: 'wrap'
                  }}>
                    <OfficialCasinoLogo slug={casinoData.slug} size={64} />
                    
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                          {casinoData.name}
                        </h3>
                        <div style={{
                          padding: '4px 12px',
                          background: `${brand.accentColor}20`,
                          border: `1px solid ${brand.accentColor}50`,
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '700',
                          color: brand.accentColor
                        }}>
                          +{casinoData.rakeback}% Rakeback
                        </div>
                        <LiveIndicator />
                      </div>
                      
                      <p style={{ 
                        fontSize: '14px', 
                        color: 'rgba(255,255,255,0.7)', 
                        margin: 0,
                        lineHeight: '1.6'
                      }}>
                        {casinoData.description}
                      </p>
                    </div>

                    {/* Bonus Badge */}
                    <div style={{ 
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.05)',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      minWidth: '120px'
                    }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '4px' }}>
                        WELCOME BONUS
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>
                        {casinoData.bonus}
                      </div>
                    </div>
                  </div>

                  {/* Tags/Highlights */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    flexWrap: 'wrap',
                    marginBottom: '20px',
                    justifyContent: 'center'
                  }}>
                    {casinoData.highlights.slice(0, 4).map((highlight, hidx) => (
                      <span
                        key={hidx}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(255,255,255,0.06)',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: 'rgba(255,255,255,0.85)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          border: '1px solid rgba(255,255,255,0.08)'
                        }}
                      >
                        <Star size={12} color={brand.accentColor} />
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button - Centered at Bottom */}
                  <div style={{ textAlign: 'center' }}>
                    <button
                      data-testid={`casino-cta-${casinoData.slug}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCasino({...casino, ...casinoData});
                      }}
                      style={{
                        padding: '16px 40px',
                        background: `linear-gradient(135deg, ${brand.accentColor}, ${brand.accentColor}cc)`,
                        borderRadius: '14px',
                        border: 'none',
                        color: brand.primaryColor === '#0f0f1a' ? '#ffffff' : '#000000',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 4px 20px ${brand.accentColor}30`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `0 8px 30px ${brand.accentColor}50`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 4px 20px ${brand.accentColor}30`;
                      }}
                    >
                      <Zap size={18} />
                      {casinoData.ctaText}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* WHY RAKESTAKE SECTION */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto 100px',
        padding: '0 20px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(124,58,237,0.05) 100%)',
          border: '1px solid rgba(255,215,0,0.2)',
          borderRadius: '32px',
          padding: '60px 48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Decoration */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 20px',
                background: 'rgba(255,215,0,0.15)',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '30px',
                marginBottom: '20px'
              }}>
                <Sparkles size={18} color="#ffd700" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffd700', letterSpacing: '1px' }}>
                  THE RAKESTAKE ADVANTAGE
                </span>
              </div>
              
              <h2 style={{
                fontSize: '42px',
                fontWeight: '900',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                letterSpacing: '-1px',
                lineHeight: '1.2'
              }}>
                Why Play Through Rakestake?
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.7'
              }}>
                You're already gambling. Why not get <strong style={{color: '#ffd700'}}>paid more</strong> for it?
              </p>
            </div>

            {/* Value Props */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '48px'
            }}>
              {/* Prop 1 */}
              <div style={{
                padding: '28px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <TrendingUp size={28} color="#000" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
                  Free Money. Literally.
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', margin: 0 }}>
                  Casinos already have affiliate programs. We pass <strong style={{color: '#ffd700'}}>100% of our commission back to you</strong> as rakeback. You lose nothing. You only gain.
                </p>
              </div>

              {/* Prop 2 */}
              <div style={{
                padding: '28px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Gift size={28} color="#fff" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
                  Stack It. Don't Waste It.
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', margin: 0 }}>
                  Your casino welcome bonus stays the same. Rakestake rakeback is <strong style={{color: '#a78bfa'}}>extra, on top</strong>. It's not either/or — it's both. Every single bet earns you more.
                </p>
              </div>

              {/* Prop 3 */}
              <div style={{
                padding: '28px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Wallet size={28} color="#fff" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
                  Turn Losses Into Wins
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', margin: 0 }}>
                  Had a bad session? Rakeback softens the blow. <strong style={{color: '#4ade80'}}>Up to 15% of every bet comes back to you</strong> — win or lose. It's insurance that actually pays.
                </p>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div style={{
              textAlign: 'center',
              padding: '32px',
              background: 'rgba(255,215,0,0.08)',
              borderRadius: '20px',
              border: '1px solid rgba(255,215,0,0.2)'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '8px'
              }}>
                It's Free. Why Wouldn't You?
              </div>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '24px',
                maxWidth: '500px',
                margin: '0 auto 24px'
              }}>
                Same casinos. Same bonuses. Same games.<br/>
                <span style={{color: '#ffd700', fontWeight: '800'}}>Up to 15% extra</span> just for signing up through us.
              </p>
              <Link 
                to="/vip"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '18px 40px',
                  background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                  borderRadius: '14px',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Crown size={20} />
                Join the VIP Club
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
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
