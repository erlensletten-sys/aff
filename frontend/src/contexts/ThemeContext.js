import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  main: {
    name: 'Main',
    icon: '🎰',
    vars: {
      '--bg-primary': '#0a0a0f',
      '--bg-secondary': '#12121a',
      '--bg-tertiary': '#1a1a25',
      '--bg-glass': 'rgba(18, 18, 26, 0.8)',
      '--text-primary': '#ffffff',
      '--text-secondary': '#b0b0b0',
      '--text-muted': '#666666',
      '--border-color': 'rgba(255, 255, 255, 0.1)',
      '--accent-primary': '#6366f1',
      '--accent-secondary': '#8b5cf6',
      '--accent-success': '#10b981',
      '--accent-warning': '#f59e0b',
      '--accent-danger': '#ef4444',
      '--accent-cyan': '#06b6d4',
      '--accent-purple': '#a855f7',
      '--accent-gold': '#ffd700',
      '--header-bg': 'rgba(10, 10, 15, 0.95)',
      '--card-bg': 'rgba(18, 18, 26, 0.6)',
      '--input-bg': '#1a1a25',
      '--shadow-color': 'rgba(0, 0, 0, 0.5)'
    }
  },
  dark: {
    name: 'Dark',
    icon: '🌙',
    vars: {
      '--bg-primary': '#000000',
      '--bg-secondary': '#0d0d0d',
      '--bg-tertiary': '#1a1a1a',
      '--bg-glass': 'rgba(13, 13, 13, 0.9)',
      '--text-primary': '#e5e5e5',
      '--text-secondary': '#a0a0a0',
      '--text-muted': '#555555',
      '--border-color': 'rgba(255, 255, 255, 0.08)',
      '--accent-primary': '#3b82f6',
      '--accent-secondary': '#6366f1',
      '--accent-success': '#22c55e',
      '--accent-warning': '#eab308',
      '--accent-danger': '#dc2626',
      '--accent-cyan': '#0891b2',
      '--accent-purple': '#9333ea',
      '--accent-gold': '#facc15',
      '--header-bg': 'rgba(0, 0, 0, 0.98)',
      '--card-bg': 'rgba(13, 13, 13, 0.8)',
      '--input-bg': '#1a1a1a',
      '--shadow-color': 'rgba(0, 0, 0, 0.8)'
    }
  },
  light: {
    name: 'Light',
    icon: '☀️',
    vars: {
      '--bg-primary': '#f8fafc',
      '--bg-secondary': '#ffffff',
      '--bg-tertiary': '#f1f5f9',
      '--bg-glass': 'rgba(255, 255, 255, 0.9)',
      '--text-primary': '#0f172a',
      '--text-secondary': '#475569',
      '--text-muted': '#94a3b8',
      '--border-color': 'rgba(0, 0, 0, 0.1)',
      '--accent-primary': '#4f46e5',
      '--accent-secondary': '#7c3aed',
      '--accent-success': '#059669',
      '--accent-warning': '#d97706',
      '--accent-danger': '#dc2626',
      '--accent-cyan': '#0891b2',
      '--accent-purple': '#7c3aed',
      '--accent-gold': '#ca8a04',
      '--header-bg': 'rgba(255, 255, 255, 0.95)',
      '--card-bg': 'rgba(255, 255, 255, 0.8)',
      '--input-bg': '#f1f5f9',
      '--shadow-color': 'rgba(0, 0, 0, 0.1)'
    }
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('rakestake-theme');
    return saved && themes[saved] ? saved : 'main';
  });

  useEffect(() => {
    localStorage.setItem('rakestake-theme', theme);
    const root = document.documentElement;
    const themeVars = themes[theme].vars;
    
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
    // Add theme class to body for additional styling
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
