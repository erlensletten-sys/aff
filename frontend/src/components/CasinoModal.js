import React, { useState, useEffect } from 'react';
import { X, Check, Users, DollarSign, TrendingUp, ExternalLink, Sparkles, Shield, Star } from 'lucide-react';
import { OfficialCasinoLogo, getCasinoBrand } from './CasinoLogos';

const casinoContent = {
  'stake': {
    headline: 'Play on Stake with Extra Rewards',
    subheadline: "The world's most trusted crypto casino, now with added rakeback through Rakestake.",
    benefits: ['Industry-leading payouts', 'Massive game selection', 'Trusted by millions'],
    boostText: 'Earn up to 10% extra rakeback on every bet through Rakestake.',
    cta: 'Play on Stake'
  },
  'shuffle': {
    headline: 'Provably Fair Gaming with Extra Rewards',
    subheadline: 'Transparent, crypto-native casino with verifiable fairness.',
    benefits: ['Fully provably fair system', 'Fast crypto deposits & withdrawals', 'Competitive RTP'],
    boostText: "Stack additional rakeback rewards on top of Shuffle's system.",
    cta: 'Play on Shuffle'
  },
  'rainbet': {
    headline: 'Play & Earn in a Community-Driven Casino',
    subheadline: 'A fast-growing crypto casino with active rewards and engaging gameplay.',
    benefits: ['Frequent bonuses', 'Engaged player base', 'Smooth user experience'],
    boostText: 'Unlock extra rewards and VIP perks through Rakestake.',
    cta: 'Join Rainbet'
  },
  'default': {
    headline: 'Maximize Your Rewards',
    subheadline: 'Play smarter by stacking Rakestake rewards on top of your gameplay.',
    benefits: ['Competitive payouts', 'Crypto-friendly gameplay', 'Fast withdrawals'],
    boostText: 'Earn extra rakeback, bonuses, and VIP rewards automatically.',
    cta: 'Start Playing'
  }
};

function CasinoModal({ casino, onClose }) {
  const [liveStats, setLiveStats] = useState({ usersPlaying: 0, rewardsPaidToday: 0 });
  const [estimatedEarnings, setEstimatedEarnings] = useState(45);

  const slug = casino?.casino_slug?.toLowerCase() || '';
  const content = casinoContent[slug] || casinoContent.default;
  const brand = getCasinoBrand(slug);

  useEffect(() => {
    const baseUsers = Math.floor(Math.random() * 500) + 800;
    const baseRewards = Math.floor(Math.random() * 5000) + 8000;
    setLiveStats({ usersPlaying: baseUsers, rewardsPaidToday: baseRewards });

    const interval = setInterval(() => {
      setLiveStats(prev => ({
        usersPlaying: Math.max(500, prev.usersPlaying + Math.floor(Math.random() * 20) - 10),
        rewardsPaidToday: prev.rewardsPaidToday + Math.floor(Math.random() * 150)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rakebackRate = casino?.rakeback_rate || 0.10;
    setEstimatedEarnings(Math.round(500 * rakebackRate));
  }, [casino]);

  const handlePlayClick = () => {
    window.open(casino.referral_link, '_blank', 'noopener,noreferrer');
  };

  if (!casino) return null;

  return (
    <div 
      data-testid="casino-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        data-testid="casino-modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          background: `linear-gradient(180deg, ${brand.primaryColor} 0%, #0a0a0f 100%)`,
          borderRadius: '24px',
          border: `1px solid ${brand.accentColor}40`,
          maxWidth: '440px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: `0 0 60px ${brand.accentColor}20`
        }}
      >
        {/* Close Button */}
        <button
          data-testid="casino-modal-close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '10px',
            padding: '10px',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.6)',
            display: 'flex',
            zIndex: 10,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{
          padding: '32px 28px 24px',
          textAlign: 'center',
          background: `linear-gradient(180deg, ${brand.accentColor}15 0%, transparent 100%)`
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <OfficialCasinoLogo slug={slug} size={72} />
          </div>
          
          <h2 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '10px',
            lineHeight: '1.3'
          }}>
            {content.headline}
          </h2>
          
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.5',
            margin: 0
          }}>
            {content.subheadline}
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '0 28px 28px' }}>
          {/* Benefits */}
          <div style={{ marginBottom: '20px' }}>
            {content.benefits.map((benefit, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '8px',
                  background: brand.accentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={16} color="#fff" strokeWidth={3} />
                </div>
                <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500' }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Rakestake Boost */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.12), rgba(255,140,0,0.08))',
            border: '1px solid rgba(255,215,0,0.25)',
            borderRadius: '14px',
            padding: '18px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Sparkles size={18} color="#ffd700" />
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#ffd700', letterSpacing: '1px' }}>
                RAKESTAKE BOOST
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#ffffff', margin: 0, lineHeight: '1.5' }}>
              {content.boostText}
            </p>
          </div>

          {/* Live Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
                <Users size={14} color={brand.accentColor} />
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', letterSpacing: '0.5px' }}>
                  PLAYING NOW
                </span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
                {liveStats.usersPlaying.toLocaleString()}
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
                <DollarSign size={14} color="#22c55e" />
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', letterSpacing: '0.5px' }}>
                  REWARDS TODAY
                </span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#22c55e' }}>
                ${liveStats.rewardsPaidToday.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Estimated Earnings */}
          <div style={{
            background: `linear-gradient(135deg, ${brand.accentColor}15, ${brand.accentColor}08)`,
            border: `1px solid ${brand.accentColor}30`,
            borderRadius: '14px',
            padding: '16px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              background: brand.accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <TrendingUp size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                Your estimated weekly rakeback
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: brand.accentColor }}>
                ~${estimatedEarnings}/week
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            data-testid="casino-modal-cta"
            onClick={handlePlayClick}
            style={{
              width: '100%',
              padding: '18px 24px',
              background: `linear-gradient(135deg, ${brand.accentColor}, ${brand.accentColor}cc)`,
              border: 'none',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: '700',
              color: brand.primaryColor === '#0f0f1a' || brand.primaryColor === '#1a1a2e' ? '#ffffff' : '#000000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              boxShadow: `0 4px 20px ${brand.accentColor}40`
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 30px ${brand.accentColor}50`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 20px ${brand.accentColor}40`;
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
            gap: '8px',
            marginTop: '16px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px'
          }}>
            <Shield size={12} />
            <span>Verified Partner</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <Star size={12} />
            <span>Secure Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CasinoModal;
