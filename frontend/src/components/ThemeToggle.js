import React from 'react';
import { useTheme, themes } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, setTheme, cycleTheme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      {/* Quick cycle button */}
      <button
        onClick={cycleTheme}
        data-testid="theme-toggle"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
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
        <span style={{ fontSize: '16px' }}>{currentTheme.icon}</span>
        <span>{currentTheme.name}</span>
      </button>
    </div>
  );
}

// Dropdown version for more control
export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '10px',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <span style={{ fontSize: '18px' }}>{themes[theme].icon}</span>
        <span>{themes[theme].name}</span>
        <span style={{ 
          marginLeft: '4px', 
          fontSize: '10px',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>▼</span>
      </button>

      {isOpen && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99
            }}
            onClick={() => setIsOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            overflow: 'hidden',
            zIndex: 100,
            minWidth: '160px',
            boxShadow: '0 10px 40px var(--shadow-color)'
          }}>
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                onClick={() => {
                  setTheme(key);
                  setIsOpen(false);
                }}
                data-testid={`theme-option-${key}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  background: theme === key ? 'var(--accent-primary)' : 'transparent',
                  border: 'none',
                  color: theme === key ? '#fff' : 'var(--text-primary)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (theme !== key) {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== key) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{t.icon}</span>
                <span>{t.name}</span>
                {theme === key && <span style={{ marginLeft: 'auto' }}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ThemeToggle;
