/**
 * ThemeToggle Molecule
 *
 * Dark mode toggle switch for theme switching.
 * Container: rounded-full w-11 h-6 (44px × 24px, 8-point grid aligned).
 * Toggle: bg-white rounded-full w-4 h-4 circle (16px, 8-point grid).
 * Active (dark): bg-blue-600 container.
 * Icons: Sun (light), Moon (dark), 10px (w-2.5 h-2.5).
 * Transition: 300ms ease-out (smooth slide with Framer Motion).
 * Accessibility: role="switch", aria-checked, keyboard Space to toggle.
 */

'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Sun icon (light mode)
const SunIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);

// Moon icon (dark mode)
const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

export interface ThemeToggleProps {
  /** Current theme */
  theme: 'light' | 'dark';
  /** Toggle handler */
  onToggle: () => void;
  /** Additional class */
  className?: string;
}

export const ThemeToggle = ({
  theme,
  onToggle,
  className,
}: ThemeToggleProps) => {
  const isDark = theme === 'dark';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex items-center w-11 h-6 px-1 rounded-full transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        isDark ? "bg-blue-600" : "bg-gray-300",
        className
      )}
    >
      {/* Toggle circle with Framer Motion animation */}
      <motion.span
        initial={false}
        animate={{
          x: isDark ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="flex items-center justify-center w-4 h-4 bg-white rounded-full shadow-sm"
      >
        {/* Icon inside toggle */}
        {isDark ? (
          <MoonIcon className="w-2.5 h-2.5 text-blue-600" />
        ) : (
          <SunIcon className="w-2.5 h-2.5 text-gray-600" />
        )}
      </motion.span>

      {/* Screen reader text */}
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
};

ThemeToggle.displayName = "ThemeToggle";
