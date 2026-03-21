import React from 'react';

// Animated casino logo with gradient and pulse effect
export function CasinoLogo({ name, size = 48, gradient, animated = true }) {
  const defaultGradients = {
    'Stake': ['#00d4aa', '#00a67d'],
    'Shuffle': ['#ff6b35', '#f7931a'],
    'Rainbet': ['#667eea', '#764ba2'],
    'FortuneJack': ['#f7931a', '#ff6b00'],
    'BitStarz': ['#00d4ff', '#0099ff'],
    '1win': ['#00c853', '#00e676'],
    '1xBet': ['#1e88e5', '#42a5f5'],
    'RoyalPartners': ['#9c27b0', '#e040fb'],
  };

  const colors = gradient || defaultGradients[name] || ['#6366f1', '#8b5cf6'];
  const letter = name?.charAt(0) || '?';

  return (
    <div
      className={animated ? 'casino-logo-animated' : ''}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.45,
        fontWeight: '900',
        color: '#fff',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        boxShadow: `0 4px 20px ${colors[0]}50`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Shine effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        animation: animated ? 'shine 3s infinite' : 'none'
      }} />
      
      {/* Glow ring */}
      <div style={{
        position: 'absolute',
        inset: -2,
        borderRadius: size * 0.28,
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        opacity: 0.5,
        filter: 'blur(8px)',
        zIndex: -1,
        animation: animated ? 'pulse-glow 2s ease-in-out infinite' : 'none'
      }} />
      
      {letter}
    </div>
  );
}

// Animated stats counter
export function AnimatedCounter({ value, label, color, icon }) {
  return (
    <div style={{
      padding: '24px',
      background: 'var(--bg-glass)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background pulse */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
        height: '100px',
        background: `radial-gradient(circle, ${color}20, transparent)`,
        animation: 'pulse-bg 3s ease-in-out infinite'
      }} />
      
      <div style={{fontSize: '24px', marginBottom: '8px'}}>{icon}</div>
      <div style={{
        fontSize: '32px',
        fontWeight: '800',
        color: color,
        position: 'relative'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        letterSpacing: '1px',
        marginTop: '4px'
      }}>
        {label}
      </div>
    </div>
  );
}

// Glowing badge
export function GlowBadge({ text, color = '#ffd700', size = 'normal' }) {
  const padding = size === 'small' ? '4px 10px' : '6px 16px';
  const fontSize = size === 'small' ? '10px' : '12px';
  
  return (
    <span style={{
      display: 'inline-block',
      padding: padding,
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      borderRadius: '50px',
      fontSize: fontSize,
      fontWeight: '700',
      color: '#000',
      letterSpacing: '0.5px',
      boxShadow: `0 0 20px ${color}50`,
      animation: 'badge-glow 2s ease-in-out infinite'
    }}>
      {text}
    </span>
  );
}

// Floating particles background
export function FloatingParticles() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            background: `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1})`,
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `-${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
}

// CSS animations - add these to your App.css
export const animationStyles = `
@keyframes shine {
  0% { left: -100%; }
  20% { left: 100%; }
  100% { left: 100%; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes pulse-bg {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes badge-glow {
  0%, 100% { box-shadow: 0 0 10px currentColor; }
  50% { box-shadow: 0 0 25px currentColor; }
}

@keyframes float {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.casino-logo-animated:hover {
  transform: scale(1.1) rotate(5deg);
  transition: transform 0.3s ease;
}
`;

export default { CasinoLogo, AnimatedCounter, GlowBadge, FloatingParticles };
