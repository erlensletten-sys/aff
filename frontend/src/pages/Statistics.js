import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Users, TrendingUp, Gift, Trophy, 
  Zap, Crown, ArrowUp, Clock, Sparkles, Activity
} from 'lucide-react';

function Statistics() {
  const [vipStats, setVipStats] = useState({
    totalPaidOut: 847329,
    vipUsers: 4387,
    paidThisMonth: 42156,
    lotteryJackpot: 2750
  });

  const [activityStats, setActivityStats] = useState({
    activePlayers: 892,
    casinoClicks: 15847,
    avgRakeback: 8.4,
    topEarner: 3420
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setVipStats(prev => ({
          ...prev,
          totalPaidOut: prev.totalPaidOut + Math.floor(Math.random() * 50) + 10
        }));
      }
      if (Math.random() > 0.95) {
        setVipStats(prev => ({ ...prev, vipUsers: prev.vipUsers + 1 }));
      }
      if (Math.random() > 0.8) {
        setVipStats(prev => ({
          ...prev,
          paidThisMonth: prev.paidThisMonth + Math.floor(Math.random() * 30) + 5
        }));
      }
      if (Math.random() > 0.6) {
        setActivityStats(prev => ({
          ...prev,
          activePlayers: Math.max(750, Math.min(1200, prev.activePlayers + Math.floor(Math.random() * 20) - 10))
        }));
      }
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

  const styles = {
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '40px 16px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 20px',
      background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,140,0,0.1))',
      border: '1px solid rgba(255,215,0,0.3)',
      borderRadius: '30px',
      marginBottom: '20px'
    },
    title: {
      fontSize: 'clamp(32px, 6vw, 48px)',
      fontWeight: '900',
      color: 'var(--text-primary)',
      letterSpacing: '-2px',
      marginBottom: '12px'
    },
    topSection: {
      background: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(124,58,237,0.05) 100%)',
      border: '1px solid rgba(255,215,0,0.2)',
      borderRadius: '20px',
      padding: 'clamp(20px, 4vw, 40px)',
      marginBottom: '24px'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '24px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '16px'
    },
    statCard: {
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      padding: 'clamp(16px, 3vw, 24px)',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.08)'
    },
    iconWrapper: {
      width: 'clamp(40px, 8vw, 56px)',
      height: 'clamp(40px, 8vw, 56px)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 12px'
    },
    statValue: {
      fontSize: 'clamp(24px, 5vw, 36px)',
      fontWeight: '800',
      marginBottom: '6px'
    },
    statLabel: {
      fontSize: 'clamp(9px, 2vw, 12px)',
      color: 'rgba(255,255,255,0.6)',
      letterSpacing: '1px',
      fontWeight: '600'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      margin: '32px 0'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: 'rgba(255,255,255,0.1)'
    },
    dividerText: {
      padding: '10px 20px',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '20px',
      fontSize: '11px',
      color: 'rgba(255,255,255,0.5)',
      letterSpacing: '1px',
      whiteSpace: 'nowrap'
    },
    bottomSection: {
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '20px',
      padding: 'clamp(20px, 4vw, 40px)'
    },
    activityBar: {
      padding: '16px 20px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '12px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '16px',
      border: '1px solid rgba(255,255,255,0.06)',
      marginTop: '24px'
    },
    liveIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      background: 'rgba(34, 197, 94, 0.15)',
      borderRadius: '20px',
      fontSize: '12px',
      color: '#22c55e'
    },
    liveDot: {
      width: '8px',
      height: '8px',
      background: '#22c55e',
      borderRadius: '50%',
      animation: 'pulse 2s ease-in-out infinite'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.badge}>
          <TrendingUp size={18} color="#ffd700" />
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffd700', letterSpacing: '1px' }}>
            LIVE STATISTICS
          </span>
        </div>
        <h1 style={styles.title}>Platform Stats</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Real-time rakeback payouts and community growth
        </p>
      </div>

      {/* TOP SECTION: PAYOUT DATA */}
      <div style={styles.topSection}>
        <div style={styles.sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <DollarSign size={20} color="#ffd700" />
            <h2 style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: '700', color: '#ffd700', letterSpacing: '1px', margin: 0 }}>
              RAKEBACK PAYOUTS
            </h2>
          </div>
          <div style={styles.liveIndicator}>
            <span style={styles.liveDot} />
            LIVE
          </div>
        </div>

        <div style={styles.statsGrid}>
          {/* Total Paid Out */}
          <div style={styles.statCard}>
            <div style={{...styles.iconWrapper, background: 'linear-gradient(135deg, #ffd700, #ff8c00)'}}>
              <TrendingUp size={24} color="#000" />
            </div>
            <div style={{...styles.statValue, color: '#ffd700'}}>
              {formatCurrency(vipStats.totalPaidOut)}
            </div>
            <div style={styles.statLabel}>TOTAL PAID OUT</div>
            <div style={{ marginTop: '6px', fontSize: '10px', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <ArrowUp size={10} /> Live
            </div>
          </div>

          {/* VIP Users */}
          <div style={styles.statCard}>
            <div style={{...styles.iconWrapper, background: 'linear-gradient(135deg, #7c3aed, #5b21b6)'}}>
              <Users size={24} color="#fff" />
            </div>
            <div style={{...styles.statValue, color: '#a78bfa'}}>
              {formatNumber(vipStats.vipUsers)}
            </div>
            <div style={styles.statLabel}>VIP MEMBERS</div>
            <div style={{ marginTop: '6px', fontSize: '10px', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <ArrowUp size={10} /> Growing
            </div>
          </div>

          {/* Paid This Month */}
          <div style={styles.statCard}>
            <div style={{...styles.iconWrapper, background: 'linear-gradient(135deg, #22c55e, #16a34a)'}}>
              <DollarSign size={24} color="#fff" />
            </div>
            <div style={{...styles.statValue, color: '#4ade80'}}>
              {formatCurrency(vipStats.paidThisMonth)}
            </div>
            <div style={styles.statLabel}>PAID THIS MONTH</div>
            <div style={{ marginTop: '6px', fontSize: '10px', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <ArrowUp size={10} /> Live
            </div>
          </div>

          {/* Lottery Jackpot */}
          <div style={{...styles.statCard, border: '1px solid rgba(255,215,0,0.2)'}}>
            <div style={{...styles.iconWrapper, background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
              <Trophy size={24} color="#fff" />
            </div>
            <div style={{...styles.statValue, color: '#fbbf24'}}>
              {formatCurrency(vipStats.lotteryJackpot)}
            </div>
            <div style={styles.statLabel}>LOTTERY JACKPOT</div>
            <div style={{ marginTop: '6px', fontSize: '10px', color: '#fbbf24' }}>Weekly draw</div>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={styles.divider}>
        <div style={styles.dividerLine} />
        <div style={styles.dividerText}>PLATFORM ACTIVITY</div>
        <div style={styles.dividerLine} />
      </div>

      {/* BOTTOM SECTION: ACTIVITY DATA */}
      <div style={styles.bottomSection}>
        <div style={styles.statsGrid}>
          {/* Active Now */}
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{...styles.iconWrapper, background: 'rgba(34, 197, 94, 0.15)', width: 44, height: 44}}>
              <Zap size={22} color="#22c55e" />
            </div>
            <div style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {formatNumber(activityStats.activePlayers)}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>PLAYING NOW</div>
          </div>

          {/* Casino Clicks */}
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{...styles.iconWrapper, background: 'rgba(124, 58, 237, 0.15)', width: 44, height: 44}}>
              <Activity size={22} color="#7c3aed" />
            </div>
            <div style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {formatNumber(activityStats.casinoClicks)}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>CASINO CLICKS</div>
          </div>

          {/* Avg Rakeback */}
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{...styles.iconWrapper, background: 'rgba(255, 215, 0, 0.15)', width: 44, height: 44}}>
              <Gift size={22} color="#ffd700" />
            </div>
            <div style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {activityStats.avgRakeback}%
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>AVG RAKEBACK</div>
          </div>

          {/* Top Earner */}
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{...styles.iconWrapper, background: 'rgba(6, 182, 212, 0.15)', width: 44, height: 44}}>
              <Crown size={22} color="#06b6d4" />
            </div>
            <div style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {formatCurrency(activityStats.topEarner)}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>TOP EARNER</div>
          </div>
        </div>

        {/* Activity Bar */}
        <div style={styles.activityBar}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>Top Casino</div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600' }}>Stake.com</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>Peak Hour</div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600' }}>20:00 UTC</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>Avg Session</div>
            <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600' }}>23 min</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>New Today</div>
            <div style={{ fontSize: '14px', color: '#22c55e', fontWeight: '600' }}>+47 VIPs</div>
          </div>
        </div>
      </div>

      {/* Live Indicator Footer */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '20px',
          fontSize: '11px',
          color: '#22c55e'
        }}>
          <span style={styles.liveDot} />
          LIVE DATA • UPDATES EVERY 3S
        </div>
      </div>
    </div>
  );
}

export default Statistics;
