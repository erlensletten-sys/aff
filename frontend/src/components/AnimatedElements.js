import React from 'react';
import { 
  Zap, Trophy, Star, TrendingUp, Wallet, Gift, 
  Crown, Sparkles, ChevronRight, ExternalLink,
  Moon, Sun, Palette, Search, X, Check,
  Dice1, Target, Award, Gem, Shield
} from 'lucide-react';

// Consistent Casino Logo Component
export function CasinoLogo({ name, size = 48 }) {
  const letter = name?.charAt(0)?.toUpperCase() || '?';
  
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 12,
      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.45,
      fontWeight: '800',
      color: '#fff',
      flexShrink: 0
    }}>
      {letter}
    </div>
  );
}

// Animated Icon Wrapper
export function AnimatedIcon({ icon: Icon, size = 20, color = 'currentColor', animate = false }) {
  return (
    <span style={{
      display: 'inline-flex',
      animation: animate ? 'pulse-glow 2s ease-in-out infinite' : 'none'
    }}>
      <Icon size={size} color={color} />
    </span>
  );
}

// Badge with Lucide icon
export function IconBadge({ icon: Icon, text, color = '#ffd700', size = 'normal' }) {
  const padding = size === 'small' ? '4px 10px' : '6px 14px';
  const fontSize = size === 'small' ? '11px' : '12px';
  const iconSize = size === 'small' ? 12 : 14;
  
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: padding,
      background: `${color}15`,
      border: `1px solid ${color}40`,
      borderRadius: '6px',
      fontSize: fontSize,
      fontWeight: '600',
      color: color
    }}>
      {Icon && <Icon size={iconSize} />}
      {text}
    </span>
  );
}

// Live Status Indicator
export function LiveIndicator() {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '11px',
      color: 'var(--accent-success)'
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--accent-success)',
        animation: 'pulse-glow 1.5s ease-in-out infinite'
      }} />
      LIVE
    </span>
  );
}

// Stats Card with Icon
export function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '20px'
    }}>
      {Icon && (
        <div style={{ marginBottom: '8px', color: color }}>
          <Icon size={24} />
        </div>
      )}
      <div style={{
        fontSize: '32px',
        fontWeight: '800',
        color: color
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        letterSpacing: '1px',
        marginTop: '4px'
      }}>
        {label}
      </div>
    </div>
  );
}

// Theme Toggle with Lucide Icons
export function ThemeToggleIcon({ theme }) {
  const icons = {
    main: Palette,
    dark: Moon,
    light: Sun
  };
  const Icon = icons[theme] || Palette;
  return <Icon size={16} />;
}

// Export all Lucide icons we use
export {
  Zap, Trophy, Star, TrendingUp, Wallet, Gift,
  Crown, Sparkles, ChevronRight, ExternalLink,
  Moon, Sun, Palette, Search, X, Check,
  Dice1, Target, Award, Gem, Shield
};
