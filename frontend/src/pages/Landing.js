import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function Landing() {
  // Live statistics
  const [totalVerifications, setTotalVerifications] = useState(121243);
  const [registeredUsers, setRegisteredUsers] = useState(5699);
  const [campaigns, setCampaigns] = useState([]);
  const successRate = 99.3;

  useEffect(() => {
    // Fetch VIP campaigns for the homepage section
    fetchCampaigns();
    
    // Increment counters at different rates
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const increment = Math.floor(Math.random() * 3) + 1;
        setTotalVerifications(prev => prev + increment);
      }
      if (Math.random() > 0.85) {
        setRegisteredUsers(prev => prev + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`${API_URL}/api/vip/campaigns/featured`);
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    }
  };

  const formatNumber = (num) => num.toLocaleString('en-US');

  return (
    <div className="landing">
      <div className="system-status">
        <span>SYSTEM ONLINE • SECURE • INDEPENDENT</span>
      </div>
      
      <h1 style={{
        fontSize: '72px',
        fontWeight: '900',
        letterSpacing: '-3px',
        background: 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>Rakestake</h1>
      
      <div className="subtitle">
        <p style={{fontSize: '26px', fontWeight: 700, marginBottom: '16px', color: '#fff'}}>
          Play Smarter. Earn More.
        </p>
        <p style={{fontSize: '16px', color: '#b0b0b0'}}>Verification Tools • VIP Rewards • Exclusive Bonuses</p>
      </div>
      
      <div className="cta-buttons" style={{marginTop: '40px'}}>
        <Link to="/vip" className="btn" style={{
          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
          color: '#000',
          fontWeight: '700',
          padding: '18px 40px',
          fontSize: '16px',
          border: 'none',
          boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)'
        }}>
          JOIN VIP CLUB
        </Link>
        <Link to="/calculators" className="btn btn-secondary">
          CALCULATORS
        </Link>
        <Link to="/verifiers" className="btn btn-secondary">
          VERIFIERS
        </Link>
      </div>

      {/* VIP CLUB HIGHLIGHT SECTION */}
      <div style={{
        marginTop: '100px',
        marginBottom: '80px',
        padding: '60px 40px',
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%)',
        borderRadius: '32px',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        
        <div style={{display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap'}}>
          <div style={{flex: '1', minWidth: '300px'}}>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#000',
              letterSpacing: '1px',
              marginBottom: '20px'
            }}>
              EXCLUSIVE MEMBERSHIP
            </div>
            
            <h2 style={{
              fontSize: '48px',
              fontWeight: '900',
              marginBottom: '20px',
              letterSpacing: '-2px',
              color: '#fff',
              lineHeight: '1.1'
            }}>
              Rakestake<br/>
              <span style={{
                background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>VIP CLUB</span>
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#c0c0c0',
              lineHeight: '1.8',
              marginBottom: '24px'
            }}>
              Connect your favorite casino and unlock exclusive rewards: 
              <span style={{color: '#ffd700', fontWeight: '600'}}> up to 20% weekly cashback</span>, 
              lottery entries, and VIP perks you won't find anywhere else.
            </p>

            <div style={{
              display: 'flex',
              gap: '24px',
              marginBottom: '32px',
              flexWrap: 'wrap'
            }}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '32px', fontWeight: '800', color: '#ffd700'}}>20%</div>
                <div style={{fontSize: '11px', color: '#888', letterSpacing: '1px'}}>MAX CASHBACK</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '32px', fontWeight: '800', color: '#fff'}}>$1,750</div>
                <div style={{fontSize: '11px', color: '#888', letterSpacing: '1px'}}>WEEKLY LOTTERY</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '32px', fontWeight: '800', color: 'var(--accent-success)'}}>{campaigns.length}+</div>
                <div style={{fontSize: '11px', color: '#888', letterSpacing: '1px'}}>PARTNER CASINOS</div>
              </div>
            </div>

            <Link to="/vip" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
              borderRadius: '12px',
              color: '#000',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 30px rgba(255, 215, 0, 0.3)'
            }}>
              EXPLORE VIP BENEFITS
              <span style={{fontSize: '20px'}}>→</span>
            </Link>

            <p style={{
              marginTop: '16px',
              fontSize: '13px',
              color: '#888'
            }}>
              No account needed to join VIP • Create account for Forum & Lottery access
            </p>
          </div>

          {/* Partner Casinos Preview */}
          <div style={{
            flex: '0 0 350px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#888',
              letterSpacing: '1px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              FEATURED PARTNER CASINOS
            </div>
            
            {campaigns.slice(0, 3).map((campaign, idx) => (
              <div key={campaign.casino_slug || idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                marginBottom: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '800',
                  color: '#fff'
                }}>
                  {campaign.casino_name?.charAt(0) || '?'}
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontSize: '14px', fontWeight: '600', color: '#fff'}}>
                    {campaign.casino_name}
                  </div>
                  <div style={{fontSize: '12px', color: 'var(--accent-success)'}}>
                    {campaign.bonus_value}
                  </div>
                </div>
              </div>
            ))}
            
            <Link to="/vip" style={{
              display: 'block',
              textAlign: 'center',
              padding: '12px',
              marginTop: '8px',
              color: '#ffd700',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              View All Partner Casinos →
            </Link>
          </div>
        </div>
      </div>

      {/* Live Statistics Display */}
      <div style={{marginBottom: '80px'}}>
        <h2 style={{fontSize: '32px', marginBottom: '30px', letterSpacing: '-1px', color: '#fff'}}>LIVE STATISTICS</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            padding: '32px 24px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}>
            <div style={{
              fontSize: '42px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px'
            }}>
              {formatNumber(totalVerifications)}
            </div>
            <div style={{fontSize: '13px', letterSpacing: '1px', color: '#a0a0a0', textTransform: 'uppercase'}}>
              Verifications
            </div>
          </div>

          <div style={{
            padding: '32px 24px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent-success)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}>
            <div style={{
              fontSize: '42px',
              fontWeight: '700',
              color: 'var(--accent-success)',
              marginBottom: '8px'
            }}>
              {successRate}%
            </div>
            <div style={{fontSize: '13px', letterSpacing: '1px', color: '#a0a0a0', textTransform: 'uppercase'}}>
              Success Rate
            </div>
          </div>

          <div style={{
            padding: '32px 24px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}>
            <div style={{
              fontSize: '42px',
              fontWeight: '700',
              color: 'var(--accent-secondary)',
              marginBottom: '8px'
            }}>
              {formatNumber(registeredUsers)}
            </div>
            <div style={{fontSize: '13px', letterSpacing: '1px', color: '#a0a0a0', textTransform: 'uppercase'}}>
              Registered Users
            </div>
          </div>

          <div style={{
            padding: '32px 24px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            textAlign: 'center',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = 'var(--accent-warning)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}>
            <div style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '8px'
            }}>
              100%
            </div>
            <div style={{fontSize: '13px', letterSpacing: '1px', color: '#a0a0a0', textTransform: 'uppercase'}}>
              Free Forever
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Rakestake Section */}
      <div style={{marginBottom: '80px', padding: '50px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '24px'}}>
        <h2 style={{fontSize: '36px', marginBottom: '30px', letterSpacing: '-1px', color: '#fff'}}>WHY RAKESTAKE?</h2>
        
        <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'left'}}>
          <div style={{marginBottom: '30px'}}>
            <h3 style={{color: '#fff', fontSize: '20px', marginBottom: '12px'}}>⚡ CLIENT-SIDE VERIFICATION</h3>
            <p style={{color: '#b0b0b0', lineHeight: '1.8', fontSize: '15px'}}>All verification happens directly in YOUR browser using each casino's official documentation and algorithms. No data is sent to our servers during verification - making manipulation impossible.</p>
          </div>
          
          <div style={{marginBottom: '30px'}}>
            <h3 style={{color: '#fff', fontSize: '20px', marginBottom: '12px'}}>🎁 VIP REWARDS SYSTEM</h3>
            <p style={{color: '#b0b0b0', lineHeight: '1.8', fontSize: '15px'}}>Connect your casino account and earn cashback, lottery entries, and exclusive bonuses. Our VIP tiers reward loyal players with up to 20% weekly cashback and personalized perks.</p>
          </div>
          
          <div style={{marginBottom: '30px'}}>
            <h3 style={{color: '#fff', fontSize: '20px', marginBottom: '12px'}}>🔒 CRYPTOGRAPHIC STANDARDS</h3>
            <p style={{color: '#b0b0b0', lineHeight: '1.8', fontSize: '15px'}}>We utilize industry-standard cryptographic algorithms (HMAC-SHA256, SHA256) used by financial institutions. Our verification process is mathematically sound and tamper-proof.</p>
          </div>
          
          <div>
            <h3 style={{color: '#fff', fontSize: '20px', marginBottom: '12px'}}>🛡️ PROTECTING PLAYERS</h3>
            <p style={{color: '#b0b0b0', lineHeight: '1.8', fontSize: '15px'}}>Online gambling should be fair. When operators use provably fair systems, players deserve an independent way to verify results. We bridge the trust gap between players and platforms.</p>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <h2 style={{fontSize: '36px', marginBottom: '40px', letterSpacing: '-1px', color: '#fff'}}>OUR TOOLS</h2>
      
      <div className="features-grid">
        <div className="feature-card">
          <h3 style={{color: '#fff'}}>🎲 GAME CALCULATORS</h3>
          <p style={{color: '#a0a0a0'}}>
            Calculate exact probabilities for Mines, Dice, Limbo, Plinko, and more. 
            Plus advanced tools like Kelly Criterion, Variance, and Bankroll Management.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 style={{color: '#fff'}}>✅ PROVABLY FAIR VERIFIERS</h3>
          <p style={{color: '#a0a0a0'}}>
            Verify game outcomes with cryptographic proof. Support for Stake, BC.Game, 
            and more. See exactly how each result was generated.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 style={{color: '#fff'}}>🏆 VIP CLUB</h3>
          <p style={{color: '#a0a0a0'}}>
            Join our exclusive VIP program. Connect your casino, earn cashback, 
            enter weekly lotteries, and unlock premium rewards.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 style={{color: '#fff'}}>📊 SPORTS BETTING TOOLS</h3>
          <p style={{color: '#a0a0a0'}}>
            Build parlays, find arbitrage opportunities, convert odds formats. 
            Professional tools for serious sports bettors.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 style={{color: '#fff'}}>🎰 PARTNER CASINOS</h3>
          <p style={{color: '#a0a0a0'}}>
            Access exclusive bonuses from our partner casinos. 
            Get extra value on your deposits through Rakestake.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 style={{color: '#fff'}}>💬 COMMUNITY FORUM</h3>
          <p style={{color: '#a0a0a0'}}>
            Join our community of players. Share strategies, discuss casinos, 
            and get help with verification. Registered members only.
          </p>
        </div>
      </div>
      
      {/* Mission Section */}
      <div style={{marginTop: '80px', padding: '60px 40px', background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-color)', borderRadius: '24px'}}>
        <h2 style={{fontSize: '36px', marginBottom: '20px', color: '#fff'}}>OUR MISSION</h2>
        <p style={{fontSize: '18px', lineHeight: '1.8', color: '#b0b0b0', maxWidth: '800px', margin: '0 auto'}}>
          At Rakestake, we believe in a fair, transparent online gambling ecosystem. Our mission is to provide players with 
          the tools to verify game outcomes independently, and reward them for playing at our partner casinos. 
          Play smarter, earn more, and never doubt whether your game was fair.
        </p>
      </div>
    </div>
  );
}

export default Landing;
