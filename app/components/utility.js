'use client';

import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

export default function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');

  // Only run on client-side after component mounts
  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or use default
    const savedTheme = getLocalStorage('theme', 'light');
    setTheme(savedTheme);
  }, []);

  // Update the theme in localStorage and state
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setLocalStorage('theme', newTheme);
  };

  // Prevent hydration mismatch by only rendering the theme after mount
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <div data-theme={theme} className={theme}>
      {children}
      <button 
        onClick={toggleTheme} 
        className="fixed bottom-4 right-4 bg-primary-600 text-white p-3 rounded-full shadow-lg z-50"
        aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}