import React from 'react';

// Official Casino Brand Colors and Logos
const casinoBrands = {
  stake: {
    name: 'Stake',
    primaryColor: '#1a1a2e',
    accentColor: '#00d4aa',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1a1a2e"/>
        <path d="M25 65 L40 35 L55 55 L70 25 L85 45" stroke="#00d4aa" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="25" cy="65" r="4" fill="#00d4aa"/>
        <circle cx="70" cy="25" r="4" fill="#00d4aa"/>
      </svg>
    )
  },
  shuffle: {
    name: 'Shuffle',
    primaryColor: '#0f0f1a',
    accentColor: '#7c3aed',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#0f0f1a"/>
        <rect x="20" y="25" width="25" height="25" rx="4" fill="#7c3aed" opacity="0.8"/>
        <rect x="55" y="25" width="25" height="25" rx="4" fill="#a855f7" opacity="0.6"/>
        <rect x="20" y="55" width="25" height="25" rx="4" fill="#a855f7" opacity="0.6"/>
        <rect x="55" y="55" width="25" height="25" rx="4" fill="#7c3aed" opacity="0.8"/>
      </svg>
    )
  },
  rainbet: {
    name: 'Rainbet',
    primaryColor: '#0a1628',
    accentColor: '#22c55e',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#0a1628"/>
        <path d="M50 20 L50 45" stroke="#22c55e" strokeWidth="4" strokeLinecap="round"/>
        <path d="M35 30 L35 55" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" opacity="0.7"/>
        <path d="M65 30 L65 55" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" opacity="0.7"/>
        <path d="M20 40 L20 65" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
        <path d="M80 40 L80 65" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
        <ellipse cx="50" cy="70" rx="35" ry="10" fill="#22c55e" opacity="0.3"/>
      </svg>
    )
  },
  fortunejack: {
    name: 'FortuneJack',
    primaryColor: '#1a1a1a',
    accentColor: '#f59e0b',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1a1a1a"/>
        <text x="50" y="62" textAnchor="middle" fill="#f59e0b" fontSize="40" fontWeight="900" fontFamily="Arial">FJ</text>
        <circle cx="50" cy="25" r="8" fill="#f59e0b"/>
      </svg>
    )
  },
  bitstarz: {
    name: 'BitStarz',
    primaryColor: '#1e1e2f',
    accentColor: '#ff6b35',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1e1e2f"/>
        <polygon points="50,15 61,40 88,40 67,55 76,82 50,67 24,82 33,55 12,40 39,40" fill="#ff6b35"/>
      </svg>
    )
  },
  '1win': {
    name: '1win',
    primaryColor: '#0a2540',
    accentColor: '#00a3ff',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#0a2540"/>
        <text x="50" y="65" textAnchor="middle" fill="#00a3ff" fontSize="36" fontWeight="900" fontFamily="Arial">1W</text>
      </svg>
    )
  },
  '1xbet': {
    name: '1xBet',
    primaryColor: '#1a5276',
    accentColor: '#00bcd4',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1a5276"/>
        <text x="50" y="65" textAnchor="middle" fill="#00bcd4" fontSize="32" fontWeight="900" fontFamily="Arial">1X</text>
      </svg>
    )
  },
  royalpartners: {
    name: 'RoyalPartners',
    primaryColor: '#2d1b4e',
    accentColor: '#ffd700',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#2d1b4e"/>
        <polygon points="50,20 56,35 72,35 59,45 64,62 50,52 36,62 41,45 28,35 44,35" fill="#ffd700"/>
        <rect x="35" y="65" width="30" height="15" rx="2" fill="#ffd700" opacity="0.8"/>
      </svg>
    )
  }
};

export function getCasinoBrand(slug) {
  const normalizedSlug = slug?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
  return casinoBrands[normalizedSlug] || {
    name: slug,
    primaryColor: '#1a1a2e',
    accentColor: '#ffd700',
    textColor: '#ffffff',
    logo: (size) => (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="16" fill="#1a1a2e"/>
        <text x="50" y="62" textAnchor="middle" fill="#ffd700" fontSize="36" fontWeight="900" fontFamily="Arial">
          {slug?.charAt(0)?.toUpperCase() || '?'}
        </text>
      </svg>
    )
  };
}

export function OfficialCasinoLogo({ slug, size = 56 }) {
  const brand = getCasinoBrand(slug);
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 14,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '0 4px 20px ' + brand.accentColor + '30'
    }}>
      {brand.logo(size)}
    </div>
  );
}

export function getCasinoGradient(slug) {
  const brand = getCasinoBrand(slug);
  return 'linear-gradient(135deg, ' + brand.primaryColor + ', ' + brand.primaryColor + 'dd)';
}

export function getCasinoAccent(slug) {
  const brand = getCasinoBrand(slug);
  return brand.accentColor;
}

export default casinoBrands;
