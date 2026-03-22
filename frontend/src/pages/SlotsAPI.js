import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, Zap, Database, Shield, ChevronRight, 
  Gamepad2, TrendingUp, Globe, Lock, Server,
  ShoppingCart, Layers, Users, Award, Cpu, Sparkles
} from 'lucide-react';

function SlotsAPI() {
  const features = [
    {
      icon: Gamepad2,
      title: '10,000+ Slots',
      description: 'Complete coverage of all major slot providers - Pragmatic, Evolution, Hacksaw, NetEnt, Microgaming & more'
    },
    {
      icon: TrendingUp,
      title: 'Live Sportsbook',
      description: 'Real-time odds from 50+ sports with in-play betting and comprehensive markets'
    },
    {
      icon: Globe,
      title: 'Multi-Currency',
      description: 'Support for BTC, ETH, USDT, LTC, DOGE, and 20+ cryptocurrencies'
    },
    {
      icon: Lock,
      title: 'Provably Fair',
      description: 'Cryptographic verification for all game outcomes with full transparency'
    },
    {
      icon: Server,
      title: '99.9% Uptime',
      description: 'Enterprise-grade infrastructure with global CDN and auto-scaling'
    },
    {
      icon: Shield,
      title: 'Licensed',
      description: 'Fully compliant with Curacao eGaming and other jurisdictions'
    }
  ];

  const providers = [
    'Pragmatic Play', 'Evolution Gaming', 'Hacksaw Gaming', 'NetEnt', 
    'Microgaming', 'Play n GO', 'Yggdrasil', 'Red Tiger', 
    'Big Time Gaming', 'Push Gaming', 'Nolimit City', 'Relax Gaming'
  ];

  const codeExample = `// Initialize Rakestake API
const rakestake = new RakestakeAPI({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Get available slots (10,000+ games)
const slots = await rakestake.slots.list({
  provider: 'pragmatic',
  limit: 50
});

// Launch a game session
const session = await rakestake.slots.launch({
  gameId: 'sweet-bonanza',
  userId: 'user_123',
  currency: 'USDT',
  returnUrl: 'https://yoursite.com/callback'
});

// Get live sports odds
const odds = await rakestake.sports.getOdds({
  sport: 'football',
  league: 'premier-league',
  live: true
});

// Place a bet
const bet = await rakestake.sports.placeBet({
  userId: 'user_123',
  marketId: 'match_winner',
  selection: 'home',
  stake: 100,
  currency: 'USDT'
});`;

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '60px 20px'}}>
      {/* Hero */}
      <div style={{textAlign: 'center', marginBottom: '80px'}}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(124, 58, 237, 0.1))',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          borderRadius: '30px',
          marginBottom: '28px',
          animation: 'glow 3s ease-in-out infinite'
        }}>
          <Code size={18} color="#7c3aed" />
          <span style={{fontSize: '13px', fontWeight: '700', color: '#7c3aed', letterSpacing: '1px'}}>
            DEVELOPER API
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 56px)',
          fontWeight: '900',
          letterSpacing: '-2px',
          marginBottom: '20px',
          color: 'var(--text-primary)',
          lineHeight: '1.1'
        }}>
          Slots & Sportsbook API
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0 auto 20px',
          lineHeight: '1.7'
        }}>
          Complete coverage of <strong style={{color: '#ffd700'}}>10,000+ casino games</strong> and live sports betting. 
          Built for scale, designed for developers.
        </p>

        <p style={{
          fontSize: '15px',
          color: 'var(--text-muted)',
          maxWidth: '550px',
          margin: '0 auto 40px'
        }}>
          Power your crypto casino with our battle-tested infrastructure. 
          Or let us build a complete turnkey solution for you.
        </p>

        <div style={{display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a 
            href="https://t.me/rakestake"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
              borderRadius: '14px',
              color: '#fff',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <Zap size={18} />
            Request API Access
          </a>
          <a 
            href="https://t.me/rakestake"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,140,0,0.1))',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '14px',
              color: '#ffd700',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <ShoppingCart size={18} />
            Buy Complete Casino
          </a>
        </div>
      </div>

      {/* Turnkey Solution Banner */}
      <div style={{
        padding: '32px 40px',
        background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,140,0,0.05))',
        border: '1px solid rgba(255,215,0,0.25)',
        borderRadius: '20px',
        marginBottom: '60px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Sparkles size={32} color="#000" />
        </div>
        <div style={{flex: 1, minWidth: '250px'}}>
          <h3 style={{fontSize: '20px', fontWeight: '800', color: '#ffd700', marginBottom: '6px'}}>
            Turnkey Crypto Casino Solution
          </h3>
          <p style={{fontSize: '14px', color: 'var(--text-secondary)', margin: 0}}>
            Don't want to build from scratch? Purchase a complete, ready-to-launch crypto casino website with 
            all games, payment processing, and admin panel included.
          </p>
        </div>
        <a 
          href="https://t.me/rakestake"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '12px 24px',
            background: '#ffd700',
            borderRadius: '10px',
            color: '#000',
            fontWeight: '700',
            fontSize: '14px',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Contact on Telegram
        </a>
      </div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px',
        marginBottom: '60px'
      }}>
        {features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              padding: '28px',
              background: 'linear-gradient(160deg, rgba(124, 58, 237, 0.08) 0%, transparent 100%)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              borderRadius: '16px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.5)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(124, 58, 237, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '18px'
            }}>
              <feature.icon size={26} color="#7c3aed" />
            </div>
            <h3 style={{fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px'}}>
              {feature.title}
            </h3>
            <p style={{fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0}}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Game Providers */}
      <div style={{marginBottom: '60px'}}>
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h2 style={{fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '10px'}}>
            Complete Provider Coverage
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '15px'}}>
            Access games from all major providers through a single API
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center'
        }}>
          {providers.map((provider, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {provider}
            </div>
          ))}
          <div
            style={{
              padding: '12px 20px',
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(124, 58, 237, 0.1))',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#7c3aed'
            }}
          >
            + 50 more providers
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div id="docs" style={{marginBottom: '60px'}}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h2 style={{fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '10px'}}>
            Simple Integration
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '15px'}}>
            Get started in minutes with our intuitive SDK
          </p>
        </div>

        <div style={{
          background: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '12px 20px',
            background: '#161b22',
            borderBottom: '1px solid #30363d',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{width: 12, height: 12, borderRadius: '50%', background: '#ff5f56'}} />
            <div style={{width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e'}} />
            <div style={{width: 12, height: 12, borderRadius: '50%', background: '#27ca40'}} />
            <span style={{marginLeft: '12px', fontSize: '13px', color: '#8b949e'}}>example.js</span>
          </div>
          <pre style={{
            padding: '24px',
            margin: 0,
            overflow: 'auto',
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#c9d1d9',
            fontFamily: "'Fira Code', 'Monaco', monospace"
          }}>
            <code>{codeExample}</code>
          </pre>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '60px'
      }}>
        {[
          { value: '10,000+', label: 'Casino Games', icon: Gamepad2 },
          { value: '50+', label: 'Sports Markets', icon: TrendingUp },
          { value: '99.9%', label: 'Uptime SLA', icon: Server },
          { value: '24/7', label: 'Support', icon: Users }
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              padding: '28px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              textAlign: 'center'
            }}
          >
            <stat.icon size={28} color="#7c3aed" style={{marginBottom: '12px'}} />
            <div style={{fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px'}}>
              {stat.value}
            </div>
            <div style={{fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: '600'}}>
              {stat.label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Pricing CTA */}
      <div style={{
        padding: '48px',
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(124, 58, 237, 0.05))',
        border: '1px solid rgba(124, 58, 237, 0.25)',
        borderRadius: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px'}}>
          Ready to Build?
        </h2>
        <p style={{color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '32px', maxWidth: '550px', margin: '0 auto 32px'}}>
          Whether you need API access or a complete turnkey casino, our team is ready to help you launch.
        </p>
        <div style={{display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a 
            href="https://t.me/rakestake"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: '#7c3aed',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none'
            }}
          >
            <Code size={18} />
            API Documentation
          </a>
          <a 
            href="https://t.me/rakestake"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: 'rgba(255,215,0,0.15)',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '12px',
              color: '#ffd700',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none'
            }}
          >
            <ShoppingCart size={18} />
            Buy Turnkey Casino
          </a>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none'
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SlotsAPI;
