import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setLight = useCallback(() => setTheme('light'), []);
  const setDark = useCallback(() => setTheme('dark'), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
    
    // CSS variables for dynamic theming
    const colors = {
      light: {
        bg: '#FDF6E9',
        text: '#4A2C2C',
        accent: '#C4A35A'
      },
      dark: {
        bg: '#1A1212',
        text: '#FAF1E2',
        accent: '#C4A35A'
      }
    };
    
    const currentColors = colors[theme];
    Object.entries(currentColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
  }, [theme]);

  return {
    theme,
    toggleTheme,
    setLight,
    setDark,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };
};

export default useTheme;