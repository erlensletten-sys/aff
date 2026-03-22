import React, { useState, useEffect } from 'react';
import { X, Check, Users, DollarSign, TrendingUp, ExternalLink, Sparkles, Shield } from 'lucide-react';
import { CasinoLogo } from './AnimatedElements';

// Casino-specific modal content
const casinoContent = {
  'stake': {
    headline: 'Play on Stake with Extra Rewards',
    subheadline: "The world's most trusted crypto casino, now with added rakeback through Rakestake.",
    benefits: [
      'Industry-leading payouts',
      'Massive game selection',
      'Trusted by millions'
    ],
    boostText: 'Earn up to 10% extra rakeback on every bet through Rakestake.',
    cta: 'Play on Stake → Earn More',
    color: '#00d4ff'
  },
  'shuffle': {
    headline: 'Provably Fair Gaming with Extra Rewards',
    subheadline: 'Transparent, crypto-native casino with verifiable fairness.',
    benefits: [
      'Fully provably fair system',
      'Fast crypto deposits & withdrawals',
      'Competitive RTP'
    ],
    boostText: "Stack additional rakeback rewards on top of Shuffle's system.",
    cta: 'Play Fair. Earn More.',
    color: '#7c3aed'
  },
  'rainbet': {
    headline: 'Play & Earn in a Community-Driven Casino',
    subheadline: 'A fast-growing crypto casino with active rewards and engaging gameplay.',
    benefits: [
      'Frequent bonuses',
      'Engaged player base',
      'Smooth user experience'
    ],
    boostText: 'Unlock extra rewards and VIP perks through Rakestake.',
    cta: 'Join Rainbet + Boost Rewards',
    color: '#10b981'
  },
  'default': {
    headline: 'Maximize Your Rewards',
    subheadline: 'Play smarter by stacking Rakestake rewards on top of your gameplay.',
    benefits: [
      'Competitive payouts',
      'Crypto-friendly gameplay',
      'Fast withdrawals'
    ],
    boostText: 'Earn extra rakeback, bonuses, and VIP rewards automatically.',
    cta: 'Start Playing Smarter',
    color: '#ffd700'
  }
};

function CasinoModal({ casino, onClose }) {
  const [liveStats, setLiveStats] = useState({
    usersPlaying: 0,
    rewardsPaidToday: 0
  });
  const [estimatedEarnings, setEstimatedEarnings] = useState(45);

  // Get casino-specific content or default
  const slug = casino?.casino_slug?.toLowerCase() || '';
  const content = casinoContent[slug] || casinoContent.default;

  // Simulate live stats (in production, these would come from an API)
  useEffect(() => {
    // Generate realistic-looking random stats
    const baseUsers = Math.floor(Math.random() * 500) + 800;
    const baseRewards = Math.floor(Math.random() * 5000) + 8000;
    
    setLiveStats({
      usersPlaying: baseUsers,
      rewardsPaidToday: baseRewards
    });

    // Simulate fluctuating stats
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        usersPlaying: prev.usersPlaying + Math.floor(Math.random() * 10) - 5,
        rewardsPaidToday: prev.rewardsPaidToday + Math.floor(Math.random() * 100)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate personalized estimate based on rakeback rate
  useEffect(() => {
    const rakebackRate = casino?.rakeback_rate || 0.10;
    const weeklyWager = 500; // Average assumed weekly wager
    const estimated = Math.round(weeklyWager * rakebackRate);
    setEstimatedEarnings(estimated);
  }, [casino]);

  const handlePlayClick = () => {
    // Track click (would send to analytics/backend in production)
    console.log('Affiliate click tracked:', casino.casino_slug);
    window.open(casino.referral_link, '_blank', 'noopener,noreferrer');
  };

  if (!casino) return null;

  return (
    <div 
      data-testid="casino-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        data-testid="casino-modal-content"
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          maxWidth: '480px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          data-testid="casino-modal-close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        {/* Header with Logo */}
        <div style={{
          padding: '32px 24px 20px',
          textAlign: 'center',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <CasinoLogo name={casino.casino_name} size={64} />
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginTop: '16px',
            marginBottom: '8px',
            lineHeight: '1.3'
          }}>
            {content.headline.replace('[Casino Name]', casino.casino_name)}
          </h2>
          
          <p style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            margin: 0
          }}>
            {content.subheadline}
          </p>
        </div>

        {/* Benefits Section */}
        <div style={{ padding: '20px 24px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {content.benefits.map((benefit, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'var(--accent-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={14} color="#fff" strokeWidth={3} />
                </div>
                <span style={{
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Rakestake Boost Section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,140,0,0.1))',
            border: '1px solid rgba(255,215,0,0.3)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <Sparkles size={18} color="#ffd700" />
              <span style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#ffd700',
                letterSpacing: '0.5px'
              }}>
                RAKESTAKE BOOST
              </span>
            </div>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: '1.5'
            }}>
              {content.boostText}
            </p>
          </div>

          {/* Live Stats Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: 'var(--bg-tertiary)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginBottom: '6px'
              }}>
                <Users size={14} color="var(--accent-cyan)" />
                <span style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  PLAYING NOW
                </span>
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '800',
                color: 'var(--text-primary)'
              }}>
                {liveStats.usersPlaying.toLocaleString()}
              </div>
            </div>
            <div style={{
              background: 'var(--bg-tertiary)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginBottom: '6px'
              }}>
                <DollarSign size={14} color="var(--accent-success)" />
                <span style={{
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  letterSpacing: '0.5px'
                }}>
                  REWARDS TODAY
                </span>
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '800',
                color: 'var(--accent-success)'
              }}>
                ${liveStats.rewardsPaidToday.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Personalized Estimate */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1))',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: 'var(--accent-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <TrendingUp size={20} color="#fff" />
            </div>
            <div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginBottom: '2px'
              }}>
                Your estimated weekly rakeback
              </div>
              <div style={{
                fontSize: '22px',
                fontWeight: '800',
                color: 'var(--accent-success)'
              }}>
                ~${estimatedEarnings}/week
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            data-testid="casino-modal-cta"
            onClick={handlePlayClick}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              color: '#000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {content.cta}
            <ExternalLink size={18} />
          </button>

          {/* Trust Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '14px',
            color: 'var(--text-muted)',
            fontSize: '11px'
          }}>
            <Shield size={12} />
            <span>Verified Partner • Secure Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CasinoModal;
