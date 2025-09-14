import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  const handleThemeChange = () => {
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  return (
    <div className="relative">
      <button
        onClick={handleThemeChange}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-primary bg-bg-primary text-text-primary hover:bg-bg-secondary hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`Current theme: ${currentTheme.label}. Click to change theme.`}
        title={`Current theme: ${currentTheme.label}. Click to cycle through themes.`}
      >
        <CurrentIcon className="w-5 h-5" />
      </button>
      
      {/* Theme indicator */}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-bg-primary"
           style={{
             backgroundColor: resolvedTheme === 'dark' ? '#818CF8' : '#6366F1'
           }}
           aria-hidden="true"
      />
    </div>
  );
};

export default ThemeToggle;
