import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, Zap, Database, Shield, ChevronRight, 
  Gamepad2, TrendingUp, Globe, Lock, Server
} from 'lucide-react';

function SlotsAPI() {
  const features = [
    {
      icon: Gamepad2,
      title: '10,000+ Slots',
      description: 'Access games from top providers like Pragmatic, Evolution, Hacksaw'
    },
    {
      icon: TrendingUp,
      title: 'Live Sportsbook',
      description: 'Real-time odds from 50+ sports with in-play betting'
    },
    {
      icon: Globe,
      title: 'Multi-Currency',
      description: 'Support for BTC, ETH, USDT, and 20+ cryptocurrencies'
    },
    {
      icon: Lock,
      title: 'Provably Fair',
      description: 'Cryptographic verification for all game outcomes'
    },
    {
      icon: Server,
      title: '99.9% Uptime',
      description: 'Enterprise-grade infrastructure with global CDN'
    },
    {
      icon: Shield,
      title: 'Licensed',
      description: 'Fully compliant with Curacao eGaming regulations'
    }
  ];

  const codeExample = `// Initialize Rakestake API
const rakestake = new RakestakeAPI({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Get available slots
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
});`;

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '60px 20px'}}>
      {/* Hero */}
      <div style={{textAlign: 'center', marginBottom: '80px'}}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: 'rgba(124, 58, 237, 0.15)',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          borderRadius: '20px',
          marginBottom: '24px'
        }}>
          <Code size={16} color="#7c3aed" />
          <span style={{fontSize: '13px', fontWeight: '600', color: '#7c3aed'}}>DEVELOPER API</span>
        </div>

        <h1 style={{
          fontSize: '52px',
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
          maxWidth: '600px',
          margin: '0 auto 40px',
          lineHeight: '1.7'
        }}>
          Integrate 10,000+ casino games and live sports betting into your platform with our powerful API. Built for scale, designed for developers.
        </p>

        <div style={{display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a 
            href="mailto:api@rakestake.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            <Zap size={18} />
            Request API Access
          </a>
          <a 
            href="#docs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none'
            }}
          >
            View Documentation
            <ChevronRight size={18} />
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px',
        marginBottom: '80px'
      }}>
        {features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              padding: '28px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(124, 58, 237, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <feature.icon size={24} color="#7c3aed" />
            </div>
            <h3 style={{fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px'}}>
              {feature.title}
            </h3>
            <p style={{fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0}}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Code Example */}
      <div id="docs" style={{marginBottom: '80px'}}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h2 style={{fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px'}}>
            Simple Integration
          </h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '16px'}}>
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

      {/* Pricing CTA */}
      <div style={{
        padding: '48px',
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.05))',
        border: '1px solid rgba(124, 58, 237, 0.2)',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px'}}>
          Ready to Build?
        </h2>
        <p style={{color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px'}}>
          Contact our team to discuss API access, pricing, and integration support for your platform.
        </p>
        <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a 
            href="mailto:api@rakestake.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: '#7c3aed',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: '600',
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Contact Sales
          </a>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              fontWeight: '600',
              fontSize: '14px',
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
