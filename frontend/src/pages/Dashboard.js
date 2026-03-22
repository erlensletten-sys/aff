import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Shield, Calendar, Crown, TrendingUp, 
  DollarSign, Gift, ExternalLink, Copy, Check, 
  Zap, Star, Trophy, ArrowRight, Bell, Settings,
  Target, Flame, Clock, BarChart3, Wallet, Award,
  ChevronRight, RefreshCw, Eye, EyeOff
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock affiliate stats
  const [affiliateStats] = useState({
    totalEarned: 847.50,
    pendingPayout: 125.00,
    totalClicks: 234,
    conversions: 18,
    conversionRate: 7.7,
    currentLevel: 'Gold',
    xp: 12450,
    nextLevel: 'Platinum',
    xpToNext: 37550,
    monthlyEarnings: 245.00,
    lifetimeWagered: 45780,
    totalReferrals: 12,
    activeReferrals: 8
  });

  // Mock recent activity
  const [recentActivity] = useState([
    { type: 'rakeback', amount: 45.00, casino: 'Stake', date: '2 hours ago', status: 'completed' },
    { type: 'referral', amount: 25.00, user: 'user***23', date: '5 hours ago', status: 'completed' },
    { type: 'rakeback', amount: 32.50, casino: 'Shuffle', date: '1 day ago', status: 'completed' },
    { type: 'bonus', amount: 50.00, reason: 'VIP Bonus', date: '2 days ago', status: 'completed' },
    { type: 'rakeback', amount: 18.75, casino: 'Rainbet', date: '3 days ago', status: 'completed' },
    { type: 'withdrawal', amount: -200.00, method: 'BTC', date: '4 days ago', status: 'completed' },
  ]);

  // Mock connected casinos
  const [connectedCasinos] = useState([
    { name: 'Stake', slug: 'stake', rakeback: 10, wagered: 25000, earned: 450, status: 'active' },
    { name: 'Shuffle', slug: 'shuffle', rakeback: 15, wagered: 15000, earned: 280, status: 'active' },
    { name: 'Rainbet', slug: 'rainbet', rakeback: 12, wagered: 5780, earned: 117.50, status: 'active' },
  ]);

  // Mock referrals
  const [referrals] = useState([
    { username: 'player***42', signupDate: '2025-01-10', wagered: 5200, earned: 52.00, status: 'active' },
    { username: 'user***87', signupDate: '2025-01-05', wagered: 3100, earned: 31.00, status: 'active' },
    { username: 'gamer***15', signupDate: '2024-12-20', wagered: 8500, earned: 85.00, status: 'active' },
  ]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (err) {
      setError('Failed to load user information');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://rakestake.com/ref/${user?.username || 'user'}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vipLevels = [
    { name: 'Bronze', xp: 0, rakeback: '2%', color: '#cd7f32' },
    { name: 'Silver', xp: 1000, rakeback: '5%', color: '#c0c0c0' },
    { name: 'Gold', xp: 10000, rakeback: '8%', color: '#ffd700' },
    { name: 'Platinum', xp: 50000, rakeback: '12%', color: '#06b6d4' },
    { name: 'Diamond', xp: 100000, rakeback: '15%', color: '#a78bfa' }
  ];

  const currentLevelData = vipLevels.find(l => l.name === affiliateStats.currentLevel) || vipLevels[0];
  const nextLevelData = vipLevels.find(l => l.name === affiliateStats.nextLevel);
  const progress = nextLevelData ? ((affiliateStats.xp - currentLevelData.xp) / (nextLevelData.xp - currentLevelData.xp) * 100) : 100;

  const formatCurrency = (amount) => {
    if (!showBalance) return '••••••';
    return `$${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <RefreshCw size={40} color="#ffd700" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '20px', textAlign: 'center' }}>
        <div style={{ padding: '40px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <p style={{ color: '#ef4444', fontSize: '16px' }}>{error}</p>
          <button onClick={() => navigate('/login')} style={{ marginTop: '20px', padding: '12px 24px', background: '#ef4444', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 16px' }} data-testid="dashboard-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Welcome back, {user?.username || 'Player'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Track your rakeback earnings and VIP progress
          </p>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          data-testid="toggle-balance"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
          {showBalance ? 'Hide' : 'Show'} Balance
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['overview', 'casinos', 'referrals', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            data-testid={`tab-${tab}`}
            style={{
              padding: '10px 20px',
              background: activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* VIP Progress Card */}
          <div style={{
            background: `linear-gradient(135deg, ${currentLevelData.color}15, ${currentLevelData.color}05)`,
            border: `1px solid ${currentLevelData.color}40`,
            borderRadius: '20px',
            padding: 'clamp(20px, 4vw, 32px)',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${currentLevelData.color}, ${currentLevelData.color}80)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 20px ${currentLevelData.color}40`
                }}>
                  <Crown size={28} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '4px' }}>
                    CURRENT LEVEL
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: currentLevelData.color }}>
                    {affiliateStats.currentLevel}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Rakeback Rate</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: currentLevelData.color }}>
                    {currentLevelData.rakeback}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total XP</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {affiliateStats.xp.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Progress to {affiliateStats.nextLevel}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {affiliateStats.xpToNext.toLocaleString()} XP remaining
                </span>
              </div>
              <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(progress, 100)}%`,
                  background: `linear-gradient(90deg, ${currentLevelData.color}, ${nextLevelData?.color || currentLevelData.color})`,
                  borderRadius: '5px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div data-testid="stat-total-earned" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <DollarSign size={24} color="#22c55e" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: '800', color: '#22c55e' }}>
                {formatCurrency(affiliateStats.totalEarned)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>TOTAL EARNED</div>
            </div>

            <div data-testid="stat-pending" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <Gift size={24} color="#ffd700" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: '800', color: '#ffd700' }}>
                {formatCurrency(affiliateStats.pendingPayout)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>PENDING</div>
            </div>

            <div data-testid="stat-monthly" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <BarChart3 size={24} color="#06b6d4" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: '800', color: '#06b6d4' }}>
                {formatCurrency(affiliateStats.monthlyEarnings)}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>THIS MONTH</div>
            </div>

            <div data-testid="stat-referrals" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <User size={24} color="#a78bfa" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: '800', color: 'var(--text-primary)' }}>
                {affiliateStats.totalReferrals}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>REFERRALS</div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {/* Recent Activity */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bell size={18} />
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentActivity.slice(0, 4).map((activity, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {activity.type === 'rakeback' && `Rakeback from ${activity.casino}`}
                        {activity.type === 'referral' && `Referral bonus (${activity.user})`}
                        {activity.type === 'bonus' && activity.reason}
                        {activity.type === 'withdrawal' && `Withdrawal (${activity.method})`}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activity.date}</div>
                    </div>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: '700', 
                      color: activity.amount >= 0 ? '#22c55e' : '#ef4444'
                    }}>
                      {activity.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(activity.amount))}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveTab('history')}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                View All Activity
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Account & Referral */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Account Info */}
              <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User size={18} />
                  Account Info
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={16} color="var(--text-muted)" />
                    <span style={{ color: 'var(--text-secondary)' }}>{user?.username}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={16} color="var(--text-muted)" />
                    <span style={{ color: 'var(--text-secondary)' }}>{user?.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Shield size={16} color={user?.is_email_verified ? '#22c55e' : '#ef4444'} />
                    <span style={{ color: user?.is_email_verified ? '#22c55e' : '#ef4444' }}>
                      {user?.is_email_verified ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={16} color="var(--text-muted)" />
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Referral Link */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,140,0,0.05))',
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: '20px',
                padding: '24px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffd700', marginBottom: '12px' }}>
                  Your Referral Link
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Earn 10% of your referrals' rakeback forever
                </p>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  padding: '12px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  alignItems: 'center'
                }}>
                  <code style={{ flex: 1, fontSize: '12px', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    rakestake.com/ref/{user?.username || 'user'}
                  </code>
                  <button
                    onClick={copyReferralLink}
                    data-testid="copy-referral"
                    style={{
                      padding: '8px 12px',
                      background: copied ? '#22c55e' : '#ffd700',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#000',
                      fontWeight: '600',
                      fontSize: '12px'
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px'
          }}>
            <Link to="/vip" data-testid="action-vip" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              borderRadius: '12px',
              color: '#000',
              fontWeight: '700',
              textDecoration: 'none'
            }}>
              <Crown size={18} />
              VIP Club
            </Link>
            <Link to="/stats" data-testid="action-stats" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 24px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              <TrendingUp size={18} />
              Platform Stats
            </Link>
            <Link to="/#casinos" data-testid="action-casinos" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 24px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              <ExternalLink size={18} />
              Partner Casinos
            </Link>
          </div>
        </>
      )}

      {/* Casinos Tab */}
      {activeTab === 'casinos' && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px' }}>
            Connected Casinos
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {connectedCasinos.map((casino, idx) => (
              <div
                key={idx}
                data-testid={`casino-${casino.slug}`}
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  color: 'var(--accent-primary)',
                  fontSize: '18px'
                }}>
                  {casino.name.charAt(0)}
                </div>
                
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{casino.name}</h4>
                    <span style={{
                      padding: '2px 8px',
                      background: '#22c55e20',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                      color: '#22c55e',
                      textTransform: 'uppercase'
                    }}>
                      {casino.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {casino.rakeback}% Rakeback Rate
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Wagered</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {showBalance ? `$${casino.wagered.toLocaleString()}` : '••••••'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Earned</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#22c55e' }}>
                      {formatCurrency(casino.earned)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link
            to="/#casinos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '24px',
              padding: '14px 24px',
              background: 'var(--accent-primary)',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Connect More Casinos
            <ArrowRight size={18} />
          </Link>
        </div>
      )}

      {/* Referrals Tab */}
      {activeTab === 'referrals' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Your Referrals
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Earn 10% of their rakeback for life
              </p>
            </div>
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,140,0,0.05))',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Referral Earnings</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#ffd700' }}>
                {formatCurrency(168)}
              </div>
            </div>
          </div>

          {/* Referral Link Card */}
          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
              Share Your Link
            </h4>
            <div style={{
              display: 'flex',
              gap: '8px',
              padding: '12px',
              background: 'var(--bg-tertiary)',
              borderRadius: '10px',
              alignItems: 'center'
            }}>
              <code style={{ flex: 1, fontSize: '13px', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                https://rakestake.com/ref/{user?.username || 'user'}
              </code>
              <button
                onClick={copyReferralLink}
                style={{
                  padding: '10px 20px',
                  background: copied ? '#22c55e' : '#ffd700',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#000',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Referrals List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {referrals.map((ref, idx) => (
              <div
                key={idx}
                data-testid={`referral-${idx}`}
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={20} color="var(--text-muted)" />
                </div>
                
                <div style={{ flex: 1, minWidth: '120px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>
                    {ref.username}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Joined {new Date(ref.signupDate).toLocaleDateString()}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>Wagered</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {showBalance ? `$${ref.wagered.toLocaleString()}` : '••••••'}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>Your Earnings</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#22c55e' }}>
                      {formatCurrency(ref.earned)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px' }}>
            Transaction History
          </h2>
          
          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '16px',
              padding: '16px 20px',
              background: 'var(--bg-tertiary)',
              fontWeight: '600',
              fontSize: '12px',
              color: 'var(--text-muted)',
              letterSpacing: '0.5px'
            }}>
              <div>TYPE</div>
              <div>AMOUNT</div>
              <div>STATUS</div>
              <div>DATE</div>
            </div>
            
            {recentActivity.map((activity, idx) => (
              <div
                key={idx}
                data-testid={`history-${idx}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  gap: '16px',
                  padding: '16px 20px',
                  borderTop: '1px solid var(--border-color)',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                  {activity.type === 'rakeback' && `Rakeback - ${activity.casino}`}
                  {activity.type === 'referral' && `Referral - ${activity.user}`}
                  {activity.type === 'bonus' && activity.reason}
                  {activity.type === 'withdrawal' && `Withdrawal - ${activity.method}`}
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600',
                  color: activity.amount >= 0 ? '#22c55e' : '#ef4444'
                }}>
                  {activity.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(activity.amount))}
                </div>
                <div>
                  <span style={{
                    padding: '4px 10px',
                    background: activity.status === 'completed' ? '#22c55e20' : '#f59e0b20',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: activity.status === 'completed' ? '#22c55e' : '#f59e0b',
                    textTransform: 'capitalize'
                  }}>
                    {activity.status}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {activity.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
