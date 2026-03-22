import React from 'react';
import { useTheme, themes } from '../contexts/ThemeContext';
import { Moon, Sun, Palette } from 'lucide-react';

const themeIcons = {
  main: Palette,
  dark: Moon,
  light: Sun
};

function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const currentTheme = themes[theme];
  const Icon = themeIcons[theme] || Palette;

  return (
    <button
      onClick={cycleTheme}
      data-testid="theme-toggle"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-primary)';
        e.currentTarget.style.background = 'var(--bg-glass)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.background = 'var(--bg-tertiary)';
      }}
      title={`Current: ${currentTheme.name} - Click to change`}
    >
      <Icon size={16} />
      <span>{currentTheme.name}</span>
    </button>
  );
}

export default ThemeToggle;
