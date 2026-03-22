import React from 'react';

// Official Casino Logo URLs
const casinoLogos = {
  stake: {
    name: 'Stake',
    logoUrl: 'https://customer-assets.emergentagent.com/job_7806151f-febd-4834-b0eb-9dcec45c7d18/artifacts/q3xw8bm4_stake-logo-white.png',
    primaryColor: '#1a1a2e',
    accentColor: '#00d4aa',
    bgColor: '#0d1117'
  },
  shuffle: {
    name: 'Shuffle',
    logoUrl: 'https://shuffle.com/icons/logo.svg',
    primaryColor: '#0f0f1a',
    accentColor: '#7c3aed',
    bgColor: '#0a0a12'
  },
  duel: {
    name: 'Duel',
    logoUrl: null, // Use letter fallback - Duel doesn't have easily accessible logo
    primaryColor: '#0d0d1a',
    accentColor: '#00e5ff',
    bgColor: '#080812'
  },
  rainbet: {
    name: 'Rainbet',
    logoUrl: 'https://gamblersconnect.com/wp-content/uploads/2025/05/New-Project-11-135x135.png',
    primaryColor: '#0a1628',
    accentColor: '#22c55e',
    bgColor: '#0a1420'
  },
  fortunejack: {
    name: 'FortuneJack',
    logoUrl: 'https://bestcrypto.casino/wp-content/uploads/2023/10/fortune-Jack.png',
    primaryColor: '#1a1a1a',
    accentColor: '#f59e0b',
    bgColor: '#141414'
  },
  bitstarz: {
    name: 'BitStarz',
    logoUrl: null, // No URL provided, use fallback
    primaryColor: '#1e1e2f',
    accentColor: '#ff6b35',
    bgColor: '#16161f'
  },
  '1win': {
    name: '1win',
    logoUrl: 'https://customer-assets.emergentagent.com/job_7806151f-febd-4834-b0eb-9dcec45c7d18/artifacts/10xhnlev_image.png',
    primaryColor: '#0a2540',
    accentColor: '#00a3ff',
    bgColor: '#071a2e'
  },
  '1xbet': {
    name: '1xBet',
    logoUrl: 'https://raw.githubusercontent.com/2fasvg/2fasvg.github.io/master/assets/img/logo/1xbit.com/1xbit.com.svg',
    primaryColor: '#1a5276',
    accentColor: '#00bcd4',
    bgColor: '#12405c'
  },
  royalpartners: {
    name: 'RoyalPartners',
    logoUrl: 'https://leadshub.ru/assets/royalpartners-bd9fab3f.svg',
    primaryColor: '#2d1b4e',
    accentColor: '#ffd700',
    bgColor: '#1f1338'
  }
};

export function getCasinoBrand(slug) {
  const normalizedSlug = slug?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
  return casinoLogos[normalizedSlug] || {
    name: slug,
    logoUrl: null,
    primaryColor: '#1a1a2e',
    accentColor: '#ffd700',
    bgColor: '#0d0d14'
  };
}

export function OfficialCasinoLogo({ slug, size = 56 }) {
  const brand = getCasinoBrand(slug);
  
  if (brand.logoUrl) {
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: 14,
        overflow: 'hidden',
        flexShrink: 0,
        background: brand.bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        boxShadow: `0 4px 20px ${brand.accentColor}30`
      }}>
        <img 
          src={brand.logoUrl} 
          alt={brand.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
          onError={(e) => {
            // Fallback to letter if image fails
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<span style="font-size: ${size * 0.4}px; font-weight: 800; color: ${brand.accentColor}">${brand.name?.charAt(0) || '?'}</span>`;
          }}
        />
      </div>
    );
  }

  // Fallback letter logo
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 14,
      overflow: 'hidden',
      flexShrink: 0,
      background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.bgColor})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 4px 20px ${brand.accentColor}30`
    }}>
      <span style={{
        fontSize: size * 0.4,
        fontWeight: 800,
        color: brand.accentColor
      }}>
        {brand.name?.charAt(0)?.toUpperCase() || '?'}
      </span>
    </div>
  );
}

export function getCasinoGradient(slug) {
  const brand = getCasinoBrand(slug);
  return `linear-gradient(160deg, ${brand.primaryColor} 0%, ${brand.bgColor} 100%)`;
}

export function getCasinoAccent(slug) {
  const brand = getCasinoBrand(slug);
  return brand.accentColor;
}

export default casinoLogos;
