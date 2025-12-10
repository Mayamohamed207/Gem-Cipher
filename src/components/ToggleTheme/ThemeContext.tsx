import React from 'react';
import { Sun, Moon } from 'lucide-react';
// 1. Import the CSS module
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  // Determine the dynamic class name based on the theme state
  const themeClass = isDark ? styles.dark : styles.light;

  // Determine the size of the icon (responsive using external styles)
  const iconSize = 24; 
  const mobileIconSize = 18;

  // Function to determine icon size based on viewport width (optional, for precise control)
  const getIconSize = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 600 ? mobileIconSize : iconSize;
    }
    return iconSize; // Default for server-side rendering
  };

  return (
    <button
      onClick={onToggle}
      // 2. Apply classes instead of inline styles
      className={`${styles.toggleButton} ${themeClass}`}
      // 3. Remove inline styles and JS event handlers
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun 
          // Icon size is responsive via CSS or can be adjusted here with state/hook if needed
          size={getIconSize()} 
          color="#120e06" 
          strokeWidth={2.5}
        />
      ) : (
        <Moon 
          size={getIconSize()} 
          color="#FFD700" 
          strokeWidth={2.5}
        />
      )}
    </button>
  );
};

export default ThemeToggle;