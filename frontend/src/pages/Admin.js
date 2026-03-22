import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, DollarSign, TrendingUp, Settings, Shield, 
  Search, Filter, MoreVertical, Check, X, Edit,
  Crown, Zap, AlertTriangle, RefreshCw, Download,
  ChevronLeft, ChevronRight, Eye, Ban, Gift
} from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock admin data
  const [platformStats] = useState({
    totalUsers: 4387,
    activeToday: 892,
    totalPaidOut: 847329,
    paidThisMonth: 42156,
    pendingPayouts: 8450,
    totalClicks: 156847,
    conversions: 2341,
    conversionRate: 1.49
  });

  const [users] = useState([
    { id: 1, username: 'cryptoking99', email: 'crypto***@gmail.com', level: 'Diamond', totalEarned: 12450.00, status: 'active', joinDate: '2024-08-15' },
    { id: 2, username: 'betmaster', email: 'bet***@yahoo.com', level: 'Platinum', totalEarned: 8230.50, status: 'active', joinDate: '2024-09-22' },
    { id: 3, username: 'luckycharm', email: 'lucky***@outlook.com', level: 'Gold', totalEarned: 3420.00, status: 'active', joinDate: '2024-10-01' },
    { id: 4, username: 'highroller', email: 'high***@gmail.com', level: 'Gold', totalEarned: 2890.75, status: 'pending', joinDate: '2024-10-15' },
    { id: 5, username: 'slotfan2024', email: 'slot***@gmail.com', level: 'Silver', totalEarned: 890.25, status: 'active', joinDate: '2024-11-01' },
    { id: 6, username: 'casinopro', email: 'casino***@mail.com', level: 'Silver', totalEarned: 650.00, status: 'suspended', joinDate: '2024-11-10' },
    { id: 7, username: 'newbie123', email: 'new***@gmail.com', level: 'Bronze', totalEarned: 45.50, status: 'active', joinDate: '2024-12-01' },
    { id: 8, username: 'gambler_x', email: 'gambler***@proton.me', level: 'Bronze', totalEarned: 12.00, status: 'active', joinDate: '2024-12-15' },
  ]);

  const [pendingPayouts] = useState([
    { id: 1, user: 'cryptoking99', amount: 2500.00, method: 'BTC', requested: '2 hours ago', status: 'pending' },
    { id: 2, user: 'betmaster', amount: 1200.00, method: 'ETH', requested: '5 hours ago', status: 'pending' },
    { id: 3, user: 'luckycharm', amount: 450.00, method: 'USDT', requested: '1 day ago', status: 'processing' },
    { id: 4, user: 'highroller', amount: 890.00, method: 'BTC', requested: '1 day ago', status: 'pending' },
  ]);

  const [casinoStats] = useState([
    { name: 'Stake', clicks: 45230, conversions: 856, revenue: 125000, rate: 1.89 },
    { name: 'Shuffle', clicks: 32100, conversions: 612, revenue: 89500, rate: 1.91 },
    { name: 'Rainbet', clicks: 28450, conversions: 498, revenue: 67800, rate: 1.75 },
    { name: 'FortuneJack', clicks: 18920, conversions: 245, revenue: 34200, rate: 1.29 },
    { name: 'BitStarz', clicks: 15670, conversions: 178, revenue: 28900, rate: 1.14 },
    { name: '1win', clicks: 12340, conversions: 134, revenue: 19800, rate: 1.09 },
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // In real app, verify admin status
    setLoading(false);
  }, [navigate]);

  const getLevelColor = (level) => {
    const colors = { Diamond: '#a78bfa', Platinum: '#06b6d4', Gold: '#ffd700', Silver: '#c0c0c0', Bronze: '#cd7f32' };
    return colors[level] || '#666';
  };

  const getStatusColor = (status) => {
    const colors = { active: '#22c55e', pending: '#fbbf24', suspended: '#ef4444', processing: '#3b82f6' };
    return colors[status] || '#666';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Zap size={40} color="#ffd700" style={{ animation: 'pulse 1s ease-in-out infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Shield size={24} color="#ef4444" />
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '900', color: 'var(--text-primary)', margin: 0 }}>
              Admin Panel
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Manage users, payouts, and platform settings</p>
        </div>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          <RefreshCw size={16} />
          Refresh Data
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {['overview', 'users', 'payouts', 'casinos', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #5b21b6)' : 'var(--bg-tertiary)',
              border: '1px solid ' + (activeTab === tab ? '#7c3aed' : 'var(--border-color)'),
              borderRadius: '10px',
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Users size={20} color="#7c3aed" />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TOTAL USERS</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>
                {platformStats.totalUsers.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '4px' }}>+47 today</div>
            </div>

            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Zap size={20} color="#22c55e" />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ACTIVE TODAY</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#22c55e' }}>
                {platformStats.activeToday.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>20.3% of users</div>
            </div>

            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <DollarSign size={20} color="#ffd700" />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TOTAL PAID</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffd700' }}>
                ${platformStats.totalPaidOut.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '4px' }}>All time</div>
            </div>

            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Gift size={20} color="#ef4444" />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PENDING</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#ef4444' }}>
                ${platformStats.pendingPayouts.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{pendingPayouts.length} requests</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px'
          }}>
            {/* Top Users */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px' }}>
                Top Earners
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {users.slice(0, 5).map((user, idx) => (
                  <div key={user.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', width: '20px' }}>
                        #{idx + 1}
                      </span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{user.username}</div>
                        <div style={{ fontSize: '11px', color: getLevelColor(user.level) }}>{user.level}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#22c55e' }}>
                      ${user.totalEarned.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Payouts */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={18} color="#fbbf24" />
                Pending Payouts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingPayouts.map(payout => (
                  <div key={payout.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{payout.user}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{payout.method} • {payout.requested}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#fbbf24' }}>${payout.amount}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ padding: '6px', background: '#22c55e', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                          <Check size={14} color="#fff" />
                        </button>
                        <button style={{ padding: '6px', background: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                          <X size={14} color="#fff" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
          {/* Search */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}
              />
            </div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>
              <Filter size={16} />
              Filter
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: '#7c3aed',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer'
            }}>
              <Download size={16} />
              Export
            </button>
          </div>

          {/* Users Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>USER</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>LEVEL</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>EARNED</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>STATUS</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>JOINED</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase())).map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{user.username}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user.email}</div>
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        background: `${getLevelColor(user.level)}20`,
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: getLevelColor(user.level)
                      }}>
                        {user.level}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '700', color: '#22c55e' }}>
                      ${user.totalEarned.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        background: `${getStatusColor(user.status)}20`,
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: getStatusColor(user.status),
                        textTransform: 'capitalize'
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {user.joinDate}
                    </td>
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                        <button style={{ padding: '6px 10px', background: 'rgba(59, 130, 246, 0.2)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                          <Eye size={14} color="#3b82f6" />
                        </button>
                        <button style={{ padding: '6px 10px', background: 'rgba(255, 215, 0, 0.2)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                          <Edit size={14} color="#ffd700" />
                        </button>
                        <button style={{ padding: '6px 10px', background: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                          <Ban size={14} color="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px' }}>
            Payout Requests
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingPayouts.map(payout => (
              <div key={payout.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ minWidth: '150px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{payout.user}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{payout.requested}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Amount</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#ffd700' }}>${payout.amount}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Method</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{payout.method}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    padding: '6px 14px',
                    background: `${getStatusColor(payout.status)}20`,
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: getStatusColor(payout.status),
                    textTransform: 'capitalize'
                  }}>
                    {payout.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '10px 20px',
                    background: '#22c55e',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Check size={16} />
                    Approve
                  </button>
                  <button style={{
                    padding: '10px 20px',
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <X size={16} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Casinos Tab */}
      {activeTab === 'casinos' && (
        <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px' }}>
            Casino Performance
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>CASINO</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>CLICKS</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>CONVERSIONS</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>RATE</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>REVENUE</th>
                </tr>
              </thead>
              <tbody>
                {casinoStats.map((casino, idx) => (
                  <tr key={casino.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)' }}>#{idx + 1}</span>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{casino.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {casino.clicks.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right', fontSize: '14px', color: '#7c3aed', fontWeight: '600' }}>
                      {casino.conversions.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right', fontSize: '14px', color: '#22c55e', fontWeight: '600' }}>
                      {casino.rate}%
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right', fontSize: '16px', color: '#ffd700', fontWeight: '700' }}>
                      ${casino.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Settings size={18} />
              General Settings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Minimum Payout</label>
                <input type="text" defaultValue="$50.00" style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Referral Commission</label>
                <input type="text" defaultValue="10%" style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Lottery Jackpot</label>
                <input type="text" defaultValue="$2,750" style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }} />
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Crown size={18} color="#ffd700" />
              VIP Levels
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Bronze', xp: '0', rakeback: '2%' },
                { name: 'Silver', xp: '1,000', rakeback: '5%' },
                { name: 'Gold', xp: '10,000', rakeback: '8%' },
                { name: 'Platinum', xp: '50,000', rakeback: '12%' },
                { name: 'Diamond', xp: '100,000', rakeback: '15%' }
              ].map(level => (
                <div key={level.name} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px'
                }}>
                  <span style={{ color: getLevelColor(level.name), fontWeight: '600' }}>{level.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{level.xp} XP</span>
                  <span style={{ color: '#22c55e', fontWeight: '700' }}>{level.rakeback}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
