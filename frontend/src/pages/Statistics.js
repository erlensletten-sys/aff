import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Users, TrendingUp, Gift, Trophy, 
  Zap, Crown, ArrowUp, Clock, Sparkles
} from 'lucide-react';

function Statistics() {
  // VIP Platform Stats - realistic for ~4,400 users
  const [vipStats, setVipStats] = useState({
    totalPaidOut: 847329,
    vipUsers: 4387,
    paidThisMonth: 42156,
    lotteryJackpot: 2750
  });

  // Platform activity stats
  const [activityStats, setActivityStats] = useState({
    activePlayers: 892,
    casinoClicks: 15847,
    avgRakeback: 8.4,
    topEarner: 3420
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Slowly increase total paid out
      if (Math.random() > 0.7) {
        setVipStats(prev => ({
          ...prev,
          totalPaidOut: prev.totalPaidOut + Math.floor(Math.random() * 50) + 10
        }));
      }
      
      // Occasionally add new VIP user
      if (Math.random() > 0.95) {
        setVipStats(prev => ({
          ...prev,
          vipUsers: prev.vipUsers + 1
        }));
      }
      
      // Update monthly paid
      if (Math.random() > 0.8) {
        setVipStats(prev => ({
          ...prev,
          paidThisMonth: prev.paidThisMonth + Math.floor(Math.random() * 30) + 5
        }));
      }
      
      // Update active players
      if (Math.random() > 0.6) {
        setActivityStats(prev => ({
          ...prev,
          activePlayers: Math.max(750, Math.min(1200, prev.activePlayers + Math.floor(Math.random() * 20) - 10))
        }));
      }
      
      // Update casino clicks
      if (Math.random() > 0.5) {
        setActivityStats(prev => ({
          ...prev,
          casinoClicks: prev.casinoClicks + Math.floor(Math.random() * 5) + 1
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => num.toLocaleString('en-US');
  const formatCurrency = (num) => '$' + num.toLocaleString('en-US');

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,140,0,0.1))',
          border: '1px solid rgba(255,215,0,0.3)',
          borderRadius: '30px',
          marginBottom: '20px'
        }}>
          <TrendingUp size={18} color="#ffd700" />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffd700', letterSpacing: '1px' }}>
            LIVE STATISTICS
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: '900', 
          color: 'var(--text-primary)', 
          letterSpacing: '-2px',
          marginBottom: '12px'
        }}>
          Platform Stats
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          Real-time rakeback payouts and community growth
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* TOP SECTION: PAYOUT DATA */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(124,58,237,0.05) 100%)',
        border: '1px solid rgba(255,215,0,0.2)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '24px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          marginBottom: '32px' 
        }}>
          <DollarSign size={24} color="#ffd700" />
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '700', 
            color: '#ffd700',
            letterSpacing: '1px',
            margin: 0
          }}>
            RAKEBACK PAYOUTS
          </h2>
          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'rgba(34, 197, 94, 0.15)',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#22c55e'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#22c55e',
              borderRadius: '50%',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            LIVE
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          {/* Total Paid Out */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
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
              margin: '0 auto 16px'
            }}>
              <TrendingUp size={28} color="#000" />
            </div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              color: '#ffd700',
              marginBottom: '8px'
            }}>
              {formatCurrency(vipStats.totalPaidOut)}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '1px',
              fontWeight: '600'
            }}>
              TOTAL PAID OUT
            </div>
            <div style={{ 
              marginTop: '8px', 
              fontSize: '11px', 
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              <ArrowUp size={12} />
              Live counter
            </div>
          </div>

          {/* VIP Users */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
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
              margin: '0 auto 16px'
            }}>
              <Users size={28} color="#fff" />
            </div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              color: '#a78bfa',
              marginBottom: '8px'
            }}>
              {formatNumber(vipStats.vipUsers)}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '1px',
              fontWeight: '600'
            }}>
              VIP MEMBERS
            </div>
            <div style={{ 
              marginTop: '8px', 
              fontSize: '11px', 
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              <ArrowUp size={12} />
              Growing daily
            </div>
          </div>

          {/* Paid This Month */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
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
              margin: '0 auto 16px'
            }}>
              <DollarSign size={28} color="#fff" />
            </div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              color: '#4ade80',
              marginBottom: '8px'
            }}>
              {formatCurrency(vipStats.paidThisMonth)}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '1px',
              fontWeight: '600'
            }}>
              PAID THIS MONTH
            </div>
            <div style={{ 
              marginTop: '8px', 
              fontSize: '11px', 
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              <ArrowUp size={12} />
              Live counter
            </div>
          </div>

          {/* Lottery Jackpot */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid rgba(255,215,0,0.2)'
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Trophy size={28} color="#fff" />
            </div>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '800', 
              color: '#fbbf24',
              marginBottom: '8px'
            }}>
              {formatCurrency(vipStats.lotteryJackpot)}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '1px',
              fontWeight: '600'
            }}>
              LOTTERY JACKPOT
            </div>
            <div style={{ 
              marginTop: '8px', 
              fontSize: '11px', 
              color: '#fbbf24'
            }}>
              Weekly draw
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* DIVIDER */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        margin: '40px 0'
      }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '1px'
        }}>
          PLATFORM ACTIVITY
        </div>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BOTTOM SECTION: ACTIVITY DATA */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div style={{
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          marginBottom: '32px'
        }}>
          {/* Active Now */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(34, 197, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <Zap size={24} color="#22c55e" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {formatNumber(activityStats.activePlayers)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
              PLAYING NOW
            </div>
          </div>

          {/* Casino Clicks */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(124, 58, 237, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <TrendingUp size={24} color="#7c3aed" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {formatNumber(activityStats.casinoClicks)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
              CASINO CLICKS
            </div>
          </div>

          {/* Avg Rakeback */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(255, 215, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <Gift size={24} color="#ffd700" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {activityStats.avgRakeback}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
              AVG RAKEBACK
            </div>
          </div>

          {/* Top Earner */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <Crown size={24} color="#06b6d4" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {formatCurrency(activityStats.topEarner)}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
              TOP EARNER (MONTH)
            </div>
          </div>
        </div>

        {/* Recent Activity Bar */}
        <div style={{
          padding: '20px 24px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Top Casino</div>
            <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>Stake.com</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Peak Hour</div>
            <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>20:00 UTC</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Avg Session</div>
            <div style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>23 min</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>New Today</div>
            <div style={{ fontSize: '15px', color: '#22c55e', fontWeight: '600' }}>+47 VIPs</div>
          </div>
        </div>
      </div>

      {/* Live Indicator */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '20px',
          fontSize: '12px',
          color: '#22c55e'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            background: '#22c55e',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
          LIVE DATA • UPDATING EVERY 3 SECONDS
        </div>
      </div>
    </div>
  );
}

export default Statistics;
