import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Shield, Calendar, Crown, TrendingUp, 
  DollarSign, Gift, ExternalLink, Copy, Check, 
  Zap, Star, Trophy, ArrowRight, Bell, Settings,
  Target, Flame, Clock, BarChart3, Wallet, Award,
  ChevronRight, RefreshCw, Eye, EyeOff, MessageCircle,
  LogOut, Edit2, Save, X
} from 'lucide-react';
import { OfficialCasinoLogo, getCasinoBrand } from '../components/CasinoLogos';
import { trackAffiliateClick } from '../utils/tracking';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ username: '', full_name: '' });

  // VIP data from localStorage (synced with VIPHub)
  const [userXP, setUserXP] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(7);

  // Affiliate stats 
  const [affiliateStats, setAffiliateStats] = useState({
    totalEarned: 0,
    pendingPayout: 0,
    totalClicks: 0,
    conversions: 0,
    currentLevel: 'Bronze',
    xp: 0,
    nextLevel: 'Silver',
    xpToNext: 1000,
    monthlyEarnings: 0,
    lifetimeWagered: 0,
    totalReferrals: 0,
    activeReferrals: 0
  });

  // Recent activity
  const [recentActivity, setRecentActivity] = useState([]);

  // Connected casinos
  const connectedCasinos = [
    { name: 'Stake', slug: 'stake', rakeback: 10, link: 'https://stake.com/?c=rakestakevip', bonus: 'Up to $3,000' },
    { name: 'Shuffle', slug: 'shuffle', rakeback: 15, link: 'https://shuffle.com/?r=rakestakevip', bonus: 'Up to $1,500 + 100 FS' },
    { name: 'Duelbits', slug: 'duelbits', rakeback: 10, link: 'https://duelbits.com/?a=rakestakevip', bonus: 'Up to $2,000 + 200 FS' },
    { name: 'Rainbet', slug: 'rainbet', rakeback: 12, link: 'https://rainbet.com/?r=rakestakevip', bonus: 'Up to $1,000' },
    { name: 'FortuneJack', slug: 'fortunejack', rakeback: 8, link: 'https://fortunejack.com/?ref=rakestakevip', bonus: 'Up to 6 BTC' },
  ];

  // Referrals
  const [referrals, setReferrals] = useState([]);

  const vipLevels = [
    { name: 'Bronze', xp: 0, rakeback: '2%', color: '#cd7f32' },
    { name: 'Silver', xp: 1000, rakeback: '5%', color: '#c0c0c0' },
    { name: 'Gold', xp: 10000, rakeback: '8%', color: '#ffd700' },
    { name: 'Platinum', xp: 50000, rakeback: '12%', color: '#06b6d4' },
    { name: 'Diamond', xp: 100000, rakeback: '15%', color: '#a78bfa' }
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

  useEffect(() => {
    fetchUserInfo();
    loadLocalData();
  }, []);

  const loadLocalData = () => {
    // Load XP from localStorage
    const savedXP = localStorage.getItem('rakestake-xp');
    const xp = savedXP ? parseInt(savedXP) : 0;
    setUserXP(xp);

    const currentLevel = getCurrentLevel(xp);
    const nextLevel = getNextLevel(xp);

    // Calculate stats based on XP
    const estimatedWagered = xp * 10; // 1 XP per $10 wagered
    const rakebackRate = parseFloat(currentLevel.rakeback) / 100;
    const estimatedEarned = estimatedWagered * rakebackRate;

    setAffiliateStats({
      totalEarned: estimatedEarned,
      pendingPayout: Math.random() * 50, // Mock pending
      totalClicks: Math.floor(xp / 5),
      conversions: Math.floor(xp / 100),
      currentLevel: currentLevel.name,
      xp: xp,
      nextLevel: nextLevel?.name || 'Max Level',
      xpToNext: nextLevel ? nextLevel.xp - xp : 0,
      monthlyEarnings: estimatedEarned * 0.3,
      lifetimeWagered: estimatedWagered,
      totalReferrals: Math.floor(xp / 500),
      activeReferrals: Math.floor(xp / 700)
    });

    // Generate mock recent activity
    if (xp > 0) {
      setRecentActivity([
        { type: 'rakeback', amount: Math.random() * 50, casino: 'Stake', date: '2 hours ago', status: 'completed' },
        { type: 'xp', amount: 50, reason: 'Daily Challenge', date: '5 hours ago', status: 'completed' },
        { type: 'rakeback', amount: Math.random() * 30, casino: 'Shuffle', date: '1 day ago', status: 'completed' },
        { type: 'bonus', amount: 25, reason: 'Streak Bonus', date: '2 days ago', status: 'completed' },
      ]);
    }
  };

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
        setProfileForm({ username: data.username, full_name: data.full_name || '' });
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const copyReferralLink = () => {
    const link = `https://rakestake.com/ref/${user?.username || 'user'}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayCasino = (casino) => {
    trackAffiliateClick(casino.slug, casino.name);
    window.open(casino.link, '_blank', 'noopener,noreferrer');
  };

  const currentLevelData = getCurrentLevel(userXP);
  const nextLevelData = getNextLevel(userXP);
  const progress = nextLevelData ? ((userXP - currentLevelData.xp) / (nextLevelData.xp - currentLevelData.xp) * 100) : 100;

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

  if (!user) {
    return (
      <div style={{ maxWidth: '500px', margin: '60px auto', padding: '20px', textAlign: 'center' }}>
        <div style={{ padding: '40px', background: 'var(--bg-glass)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <Crown size={48} color="#ffd700" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>Login Required</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Please login to access your dashboard and track your rewards.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/login" style={{
              padding: '12px 24px',
              background: 'var(--accent-primary)',
              borderRadius: '10px',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Login
            </Link>
            <Link to="/register" style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              borderRadius: '10px',
              color: '#000',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Create Account
            </Link>
          </div>
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
            Welcome back, {user?.username}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Track your rakeback, VIP progress, and manage your account
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
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
            {showBalance ? 'Hide' : 'Show'}
          </button>
          <button
            onClick={handleLogout}
            data-testid="logout-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              color: '#ef4444',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['overview', 'casinos', 'referrals', 'settings'].map(tab => (
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
                    VIP LEVEL
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: currentLevelData.color }}>
                    {currentLevelData.name}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Rakeback</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: currentLevelData.color }}>
                    {currentLevelData.rakeback}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total XP</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>
                    {userXP.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Streak</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ff8c00', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Flame size={24} />
                    {dailyStreak}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {nextLevelData && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Progress to {nextLevelData.name}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {(nextLevelData.xp - userXP).toLocaleString()} XP remaining
                  </span>
                </div>
                <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(progress, 100)}%`,
                    background: `linear-gradient(90deg, ${currentLevelData.color}, ${nextLevelData.color})`,
                    borderRadius: '5px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            )}

            <Link to="/vip" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
              fontSize: '14px',
              color: currentLevelData.color,
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              View VIP Benefits
              <ChevronRight size={16} />
            </Link>
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

            <div data-testid="stat-clicks" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <Target size={24} color="#6366f1" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: '800', color: 'var(--text-primary)' }}>
                {affiliateStats.totalClicks}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>CLICKS</div>
            </div>

            <div data-testid="stat-wagered" style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <BarChart3 size={24} color="#06b6d4" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: '800', color: '#06b6d4' }}>
                {showBalance ? `$${affiliateStats.lifetimeWagered.toLocaleString()}` : '••••••'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>WAGERED</div>
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
              
              {recentActivity.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentActivity.map((activity, idx) => (
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
                          {activity.type === 'xp' && `XP: ${activity.reason}`}
                          {activity.type === 'bonus' && activity.reason}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activity.date}</div>
                      </div>
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: '700', 
                        color: activity.type === 'xp' ? '#ffd700' : '#22c55e'
                      }}>
                        {activity.type === 'xp' ? `+${activity.amount} XP` : `+${formatCurrency(activity.amount)}`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-muted)' }}>
                  <Bell size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <p>No recent activity yet.</p>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>Start playing to earn rewards!</p>
                </div>
              )}
            </div>

            {/* Referral Link */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                    rakestake.com/ref/{user?.username}
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

              {/* Telegram CTA */}
              <a
                href="https://t.me/rakestakevip"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '20px',
                  background: 'linear-gradient(135deg, rgba(0,136,204,0.15), rgba(0,168,232,0.1))',
                  border: '1px solid rgba(0,136,204,0.3)',
                  borderRadius: '16px',
                  textDecoration: 'none'
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #0088cc, #00a8e8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MessageCircle size={22} color="#fff" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '2px' }}>
                    Join VIP Telegram
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Exclusive deals & instant support
                  </div>
                </div>
                <ChevronRight size={20} color="var(--text-muted)" />
              </a>
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
            <Link to="/blog" data-testid="action-blog" style={{
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
              Read Blog
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
              Play Casinos
            </Link>
          </div>
        </>
      )}

      {/* Casinos Tab */}
      {activeTab === 'casinos' && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Partner Casinos
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '14px' }}>
            Click to play and earn rakeback on every bet
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {connectedCasinos.map((casino, idx) => {
              const brand = getCasinoBrand(casino.slug);
              return (
                <div
                  key={idx}
                  data-testid={`casino-${casino.slug}`}
                  style={{
                    background: `linear-gradient(160deg, ${brand.primaryColor}ee 0%, #0a0a0f 100%)`,
                    border: `1px solid ${brand.accentColor}30`,
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                  }}
                >
                  <OfficialCasinoLogo slug={casino.slug} size={56} />
                  
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                      {casino.name}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                      {casino.bonus}
                    </p>
                  </div>
                  
                  <div style={{
                    padding: '8px 16px',
                    background: `${brand.accentColor}20`,
                    border: `1px solid ${brand.accentColor}40`,
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: brand.accentColor
                  }}>
                    +{casino.rakeback}% Rakeback
                  </div>
                  
                  <button
                    onClick={() => handlePlayCasino(casino)}
                    data-testid={`play-${casino.slug}`}
                    style={{
                      padding: '12px 24px',
                      background: brand.accentColor,
                      border: 'none',
                      borderRadius: '10px',
                      color: brand.primaryColor === '#0f0f1a' ? '#fff' : '#000',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Play Now
                    <ExternalLink size={16} />
                  </button>
                </div>
              );
            })}
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
            View All Casinos
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
                Referral Program
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Earn 10% of your referrals' rakeback for life
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
                {formatCurrency(affiliateStats.totalReferrals * 15)}
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
                https://rakestake.com/ref/{user?.username}
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

          {/* How it works */}
          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '20px' }}>
              How Referrals Work
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,215,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#ffd700' }}>1</span>
                </div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>Share Your Link</h5>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Send your unique link to friends</p>
              </div>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#22c55e' }}>2</span>
                </div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>They Sign Up</h5>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Friends create account through your link</p>
              </div>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800', color: '#6366f1' }}>3</span>
                </div>
                <h5 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>You Earn Forever</h5>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Get 10% of their rakeback for life</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px' }}>
            Account Settings
          </h2>
          
          {/* Profile Info */}
          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                Profile Information
              </h3>
            </div>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Username
                </label>
                <div style={{
                  padding: '12px 16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}>
                  {user?.username}
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Email
                </label>
                <div style={{
                  padding: '12px 16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>{user?.email}</span>
                  {user?.is_email_verified ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22c55e', fontSize: '12px' }}>
                      <Shield size={14} /> Verified
                    </span>
                  ) : (
                    <span style={{ color: '#f59e0b', fontSize: '12px' }}>Not Verified</span>
                  )}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Member Since
                </label>
                <div style={{
                  padding: '12px 16px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}>
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#ef4444', marginBottom: '12px' }}>
              Account Actions
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Need help? Contact us on Telegram for support.
            </p>
            <a
              href="https://t.me/rakestakevip"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #0088cc, #00a8e8)',
                borderRadius: '10px',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              <MessageCircle size={18} />
              Contact Support
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
