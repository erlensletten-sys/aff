import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, Star, Trophy, Gift, TrendingUp, Search, X,
  ExternalLink, ChevronRight, Sparkles, Zap, ArrowRight,
  Clock, Users, Target, Award, Flame, Shield, Rocket, MessageCircle
} from 'lucide-react';
import { IconBadge, LiveIndicator } from '../components/AnimatedElements';
import { OfficialCasinoLogo, getCasinoBrand } from '../components/CasinoLogos';
import CasinoModal from '../components/CasinoModal';
import { trackAffiliateClick } from '../utils/tracking';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function VIPHub() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userXP, setUserXP] = useState(0);
  const [selectedCasino, setSelectedCasino] = useState(null);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const isAuthenticated = !!localStorage.getItem('token');

  const vipLevels = [
    { id: 'bronze', name: 'Bronze', xp: 0, rakeback: 2, color: '#cd7f32', icon: Shield, benefits: ['2% Rakeback', 'Monthly Lottery Entry', 'Community Access', 'Basic Support'] },
    { id: 'silver', name: 'Silver', xp: 1000, rakeback: 5, color: '#c0c0c0', icon: Star, benefits: ['5% Rakeback', '2x Lottery Entries', 'Priority Support', 'Exclusive Promos'] },
    { id: 'gold', name: 'Gold', xp: 10000, rakeback: 8, color: '#ffd700', icon: Trophy, benefits: ['8% Rakeback', '5x Lottery Entries', 'VIP Support', 'Weekly Bonuses'] },
    { id: 'platinum', name: 'Platinum', xp: 50000, rakeback: 12, color: '#e5e4e2', icon: Crown, benefits: ['12% Rakeback', '10x Lottery Entries', 'Personal Manager', 'Monthly Gifts'] },
    { id: 'diamond', name: 'Diamond', xp: 100000, rakeback: 15, color: '#b9f2ff', icon: Sparkles, benefits: ['15% Rakeback', '25x Lottery Entries', 'VIP Host', 'Priority Withdrawals', 'Exclusive Events'] }
  ];

  // Daily challenges
  const dailyChallenges = [
    { id: 'wager', title: 'Daily Wager', description: 'Wager $100 today', xpReward: 50, progress: 75, target: 100, unit: '$' },
    { id: 'slots', title: 'Slot Spinner', description: 'Play 50 slot spins', xpReward: 30, progress: 32, target: 50, unit: 'spins' },
    { id: 'refer', title: 'Refer a Friend', description: 'Get 1 referral signup', xpReward: 100, progress: 0, target: 1, unit: 'signups' }
  ];

  // Weekly missions
  const weeklyMissions = [
    { id: 'weekly-wager', title: 'High Roller', description: 'Wager $1,000 this week', xpReward: 500, progress: 650, target: 1000, daysLeft: 3 },
    { id: 'weekly-casinos', title: 'Explorer', description: 'Play at 3 different casinos', xpReward: 200, progress: 2, target: 3, daysLeft: 3 },
    { id: 'weekly-streak', title: 'Consistent', description: 'Login 7 days in a row', xpReward: 150, progress: dailyStreak, target: 7, daysLeft: 3 }
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
    const savedClaimed = localStorage.getItem('rakestake-claimed');
    setClaimedRewards(savedClaimed ? JSON.parse(savedClaimed) : []);
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

  const claimReward = (rewardId, xpAmount) => {
    if (claimedRewards.includes(rewardId)) return;
    
    const newXP = userXP + xpAmount;
    setUserXP(newXP);
    localStorage.setItem('rakestake-xp', newXP.toString());
    
    const newClaimed = [...claimedRewards, rewardId];
    setClaimedRewards(newClaimed);
    localStorage.setItem('rakestake-claimed', JSON.stringify(newClaimed));
  };

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '48px',
        padding: '48px 40px',
        background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(124,58,237,0.05) 100%)',
        border: '1px solid rgba(255,215,0,0.2)',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite',
          pointerEvents: 'none'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{marginBottom: '16px'}}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.15))',
              border: '1px solid rgba(255,215,0,0.4)',
              borderRadius: '30px'
            }}>
              <Crown size={18} color="#ffd700" />
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffd700', letterSpacing: '1px' }}>
                VIP CLUB
              </span>
            </div>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: '900',
            marginBottom: '12px',
            color: 'var(--text-primary)',
            letterSpacing: '-1px'
          }}>
            Rakestake VIP Rewards
          </h1>
          
          <p style={{
            fontSize: '17px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Up to 15% rakeback on top of casino bonuses. Complete challenges, earn XP, and unlock exclusive rewards.
          </p>

          {/* Telegram CTA for non-logged in users */}
          {!isAuthenticated && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <a
                href="https://t.me/rakestakevip"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="telegram-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #0088cc, #00a8e8)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(0,136,204,0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <MessageCircle size={20} />
                Join VIP Telegram
              </a>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Get exclusive deals & instant support
              </p>
            </div>
          )}

          {/* XP Progress Card - Only show when logged in */}
          {isAuthenticated && (
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            padding: '24px',
            background: 'var(--bg-glass)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}80)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 20px ${currentLevel.color}40`
                }}>
                  {React.createElement(currentLevel.icon, { size: 24, color: '#fff' })}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.5px'}}>CURRENT LEVEL</div>
                  <div style={{fontSize: '20px', fontWeight: '800', color: currentLevel.color}}>{currentLevel.name}</div>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>TOTAL XP</div>
                <div style={{fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)'}}>{formatNumber(userXP)}</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px'}}>
                <span style={{color: currentLevel.color, fontWeight: '600'}}>{currentLevel.rakeback}% Rakeback</span>
                {nextLevel && (
                  <span style={{color: 'var(--text-muted)'}}>{formatNumber(nextLevel.xp - userXP)} XP to {nextLevel.name}</span>
                )}
              </div>
              <div style={{height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 5, overflow: 'hidden'}}>
                <div style={{
                  height: '100%',
                  width: `${progressToNext}%`,
                  background: `linear-gradient(90deg, ${currentLevel.color}, ${nextLevel?.color || currentLevel.color})`,
                  borderRadius: 5,
                  transition: 'width 0.5s ease',
                  boxShadow: `0 0 10px ${currentLevel.color}`
                }} />
              </div>
            </div>

            {/* Daily Streak */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              background: 'rgba(255,140,0,0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255,140,0,0.2)'
            }}>
              <Flame size={18} color="#ff8c00" />
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#ff8c00' }}>
                {dailyStreak} Day Streak
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>• Bonus XP Active</span>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Daily Challenges - Only show when logged in */}
      {isAuthenticated && (
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target size={22} color="#22c55e" />
            Daily Challenges
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <Clock size={16} />
            Resets in 14h 32m
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {dailyChallenges.map((challenge) => {
            const isComplete = challenge.progress >= challenge.target;
            const isClaimed = claimedRewards.includes(challenge.id);
            
            return (
              <div
                key={challenge.id}
                data-testid={`challenge-${challenge.id}`}
                style={{
                  background: 'var(--bg-glass)',
                  border: `1px solid ${isComplete ? 'rgba(34,197,94,0.4)' : 'var(--border-color)'}`,
                  borderRadius: '16px',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isComplete && (
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    padding: '4px 10px',
                    background: '#22c55e',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    COMPLETE
                  </div>
                )}
                
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  {challenge.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {challenge.description}
                </p>
                
                {/* Progress */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                      {challenge.unit === '$' ? `$${challenge.progress}` : challenge.progress} / {challenge.unit === '$' ? `$${challenge.target}` : challenge.target}
                    </span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%`,
                      background: isComplete ? '#22c55e' : 'var(--accent-primary)',
                      borderRadius: 3,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                
                {/* Reward */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={16} color="#ffd700" />
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#ffd700' }}>+{challenge.xpReward} XP</span>
                  </div>
                  
                  {isComplete && !isClaimed && (
                    <button
                      onClick={() => claimReward(challenge.id, challenge.xpReward)}
                      data-testid={`claim-${challenge.id}`}
                      style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Claim
                    </button>
                  )}
                  
                  {isClaimed && (
                    <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: '600' }}>Claimed!</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* Weekly Missions - Only show when logged in */}
      {isAuthenticated && (
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Rocket size={22} color="#a78bfa" />
            Weekly Missions
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <Clock size={16} />
            3 days left
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {weeklyMissions.map((mission) => {
            const progressPercent = Math.min((mission.progress / mission.target) * 100, 100);
            const isComplete = mission.progress >= mission.target;
            const isClaimed = claimedRewards.includes(mission.id);
            
            return (
              <div
                key={mission.id}
                data-testid={`mission-${mission.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  background: 'var(--bg-glass)',
                  border: `1px solid ${isComplete ? 'rgba(167,139,250,0.4)' : 'var(--border-color)'}`,
                  borderRadius: '14px',
                  padding: '20px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{mission.title}</h4>
                    {isComplete && (
                      <span style={{ padding: '2px 8px', background: '#a78bfa', borderRadius: '4px', fontSize: '10px', fontWeight: '700', color: '#fff' }}>
                        DONE
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{mission.description}</p>
                </div>
                
                <div style={{ width: '200px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{mission.progress} / {mission.target}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{progressPercent.toFixed(0)}%</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                    <div style={{
                      height: '100%',
                      width: `${progressPercent}%`,
                      background: isComplete ? '#a78bfa' : 'var(--accent-primary)',
                      borderRadius: 3
                    }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={16} color="#ffd700" />
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#ffd700' }}>+{mission.xpReward}</span>
                  </div>
                  
                  {isComplete && !isClaimed && (
                    <button
                      onClick={() => claimReward(mission.id, mission.xpReward)}
                      data-testid={`claim-${mission.id}`}
                      style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* VIP Tiers */}
      <div style={{marginBottom: '60px'}}>
        <h2 style={{fontSize: '24px', fontWeight: '700', textAlign: 'center', marginBottom: '12px', color: 'var(--text-primary)'}}>
          VIP Levels & Benefits
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
          Progress through tiers to unlock better rakeback and exclusive perks
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {vipLevels.map((tier) => {
            const isUnlocked = isAuthenticated ? userXP >= tier.xp : true;
            const isCurrent = isAuthenticated && currentLevel.id === tier.id;
            const TierIcon = tier.icon;
            
            return (
              <div
                key={tier.id}
                data-testid={`vip-tier-${tier.id}`}
                style={{
                  background: isCurrent 
                    ? `linear-gradient(135deg, ${tier.color}20, ${tier.color}10)` 
                    : 'var(--bg-glass)',
                  border: isCurrent ? `2px solid ${tier.color}` : '1px solid var(--border-color)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  opacity: 1,
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                {isCurrent && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '6px',
                    background: tier.color,
                    textAlign: 'center',
                    fontSize: '10px',
                    fontWeight: '700',
                    color: tier.id === 'gold' || tier.id === 'silver' ? '#000' : '#fff',
                    letterSpacing: '0.5px'
                  }}>
                    YOUR LEVEL
                  </div>
                )}
                
                <div style={{
                  padding: '24px 20px',
                  paddingTop: isCurrent ? '36px' : '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${tier.color}, ${tier.color}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    boxShadow: `0 0 20px ${tier.color}40`
                  }}>
                    <TierIcon size={24} color="#fff" />
                  </div>
                  <div style={{fontSize: '18px', fontWeight: '700', color: tier.color, marginBottom: '4px'}}>{tier.name}</div>
                  <div style={{fontSize: '32px', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '4px'}}>{tier.rakeback}%</div>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px'}}>
                    {tier.xp === 0 ? 'Starting Level' : `${formatNumber(tier.xp)} XP`}
                  </div>
                  
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                      {tier.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} style={{
                          padding: '6px 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          color: 'var(--text-secondary)'
                        }}>
                          <Zap size={10} color={tier.color} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Partner Casinos */}
      <div style={{marginBottom: '60px'}}>
        <h2 style={{fontSize: '24px', fontWeight: '700', textAlign: 'center', marginBottom: '12px', color: 'var(--text-primary)'}}>
          Partner Casinos
        </h2>
        <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px', fontSize: '14px'}}>
          Play at any partner casino to earn XP and rakeback through Rakestake
        </p>

        {/* Search */}
        <div style={{maxWidth: '400px', margin: '0 auto 24px', position: 'relative'}}>
          <Search size={18} style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)'}} />
          <input
            type="text"
            placeholder="Search casinos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="casino-search"
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
                    Play & Earn XP
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Lottery Section */}
      <div style={{
        padding: '40px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(167,139,250,0.05))',
        border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: '20px',
        marginBottom: '40px'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Gift size={24} color="#fff" />
          </div>
          <div>
            <h3 style={{fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '2px'}}>Weekly VIP Lottery</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Your entries: {currentLevel.id === 'diamond' ? '25' : currentLevel.id === 'platinum' ? '10' : currentLevel.id === 'gold' ? '5' : currentLevel.id === 'silver' ? '2' : '1'}x</p>
          </div>
          <span style={{
            marginLeft: 'auto',
            padding: '6px 14px',
            background: 'var(--accent-primary)',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '700',
            color: '#fff'
          }}>
            MEMBERS ONLY
          </span>
        </div>

        <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px'}}>
          <div style={{padding: '20px 32px', background: 'var(--bg-glass)', borderRadius: '12px', textAlign: 'center', flex: '1', minWidth: '120px'}}>
            <div style={{fontSize: '32px', fontWeight: '800', color: '#ffd700'}}>$1,000</div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600'}}>1ST PRIZE</div>
          </div>
          <div style={{padding: '20px 32px', background: 'var(--bg-glass)', borderRadius: '12px', textAlign: 'center', flex: '1', minWidth: '120px'}}>
            <div style={{fontSize: '32px', fontWeight: '800', color: '#c0c0c0'}}>$500</div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600'}}>2ND PRIZE</div>
          </div>
          <div style={{padding: '20px 32px', background: 'var(--bg-glass)', borderRadius: '12px', textAlign: 'center', flex: '1', minWidth: '120px'}}>
            <div style={{fontSize: '32px', fontWeight: '800', color: '#cd7f32'}}>$250</div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600'}}>3RD PRIZE</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          <Clock size={18} />
          Next draw in: <strong style={{ color: 'var(--text-primary)' }}>3 days 14 hours</strong>
        </div>

        {!isAuthenticated && (
          <Link to="/register" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '24px',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '700',
            textDecoration: 'none'
          }}>
            Register to Enter
            <ChevronRight size={18} />
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
