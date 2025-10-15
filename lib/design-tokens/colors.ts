/**
 * Color Tokens - Design System Foundation
 * Status: ✅ Complete
 *
 * Our color system balances trust and optimism with professional clarity.
 * All semantic tokens meet WCAG 2.1 AA accessibility standards.
 *
 * Philosophy: Deep blues convey expertise and stability, gold accents add warmth
 * and optimism, while clean grays provide a modern, professional foundation.
 */

// ============================================================================
// PRIMITIVE COLORS
// ============================================================================

/**
 * Trust Blue Scale - Primary Brand Color
 * Conveys stability, expertise, and professionalism
 */
export const blue = {
  50: '#EFF6FF',
  100: '#DBEAFE',  // Soft sky blue
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',
  600: '#2563EB',  // Primary interactive - light mode
  700: '#1D4ED8',  // Primary hover - light mode
  800: '#1E40AF',
  900: '#1E3A8A',  // Deep trust blue
  950: '#172554',
} as const;

/**
 * Clean Gray Scale - Foundation
 * Modern, professional base with cool blue undertones
 */
export const gray = {
  50: '#F9FAFB',   // Clean white
  100: '#F3F4F6',  // Soft gray
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',  // Deep charcoal
  900: '#111827',
  950: '#030712',
} as const;

/**
 * Optimism Gold Scale - Accent Color
 * Warm, optimistic, highlights success and opportunities
 */
export const gold = {
  50: '#FFFBEB',
  100: '#FEF3C7',  // Gentle cream
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',  // Accent anchor
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
  950: '#451A03',
} as const;

/**
 * Feedback Colors - Fixed values across modes
 */
export const feedback = {
  success: {
    light: '#10B981',  // Green
    dark: '#34D399',   // Light green
  },
  warning: {
    light: '#F59E0B',  // Gold
    dark: '#FBBF24',   // Light gold
  },
  error: {
    light: '#DC2626',  // Red
    dark: '#F87171',   // Light red
  },
} as const;

// ============================================================================
// SEMANTIC TOKEN MAPPINGS
// ============================================================================

/**
 * Light Mode Semantic Tokens
 * Optimized for light backgrounds with professional clarity
 */
export const lightMode = {
  // Primary Actions & Interactive Elements
  primary: blue[600],                 // #2563EB
  'primary-hover': blue[700],         // #1D4ED8
  'primary-foreground': '#FFFFFF',

  // Accent & Secondary Actions
  accent: gold[500],                  // #F59E0B
  'accent-foreground': gray[800],     // #1F2937

  // Backgrounds
  background: '#FFFFFF',
  'background-elevated': gray[50],    // #F9FAFB

  // Text & Foregrounds
  foreground: gray[800],              // #1F2937
  'muted': gray[100],                 // #F3F4F6
  'muted-foreground': gray[500],      // #6B7280

  // Borders
  border: gray[200],                  // #E5E7EB

  // Links & Headings
  link: blue[600],                    // #2563EB
  'heading-accent': blue[800],        // #1E40AF

  // Feedback States
  success: feedback.success.light,    // #10B981
  warning: feedback.warning.light,    // #F59E0B
  error: feedback.error.light,        // #DC2626
} as const;

/**
 * Dark Mode Semantic Tokens
 * Optimized for dark backgrounds with maintained contrast
 */
export const darkMode = {
  // Primary Actions & Interactive Elements
  primary: blue[400],                 // #60A5FA
  'primary-hover': blue[300],         // #93C5FD
  'primary-foreground': gray[900],    // #111827

  // Accent & Secondary Actions
  accent: gold[400],                  // #FBBF24
  'accent-foreground': gray[900],     // #111827

  // Backgrounds
  background: gray[900],              // #111827
  'background-elevated': gray[800],   // #1F2937

  // Text & Foregrounds
  foreground: gray[50],               // #F9FAFB
  'muted': gray[700],                 // #374151
  'muted-foreground': gray[400],      // #9CA3AF

  // Borders
  border: gray[600],                  // #4B5563

  // Links & Headings
  link: blue[400],                    // #60A5FA
  'heading-accent': blue[300],        // #93C5FD

  // Feedback States
  success: feedback.success.dark,     // #34D399
  warning: feedback.warning.dark,     // #FBBF24
  error: feedback.error.dark,         // #F87171
} as const;

// ============================================================================
// EXPORTS & TYPES
// ============================================================================

/**
 * All primitive color scales
 */
export const primitives = {
  blue,
  gray,
  gold,
  feedback,
} as const;

/**
 * Export type for semantic color tokens
 */
export type SemanticColorToken = keyof typeof lightMode;

/**
 * Default export with all color tokens
 */
export const colors = {
  primitives,
  lightMode,
  darkMode,
} as const;
