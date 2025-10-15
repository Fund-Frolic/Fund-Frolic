/**
 * Typography Tokens - Design System Foundation
 * Status: ✅ Complete
 *
 * Our typography system balances professionalism (Plus Jakarta Sans) with clarity (Inter).
 * Built on an 8-point grid with WCAG-compliant line heights.
 *
 * Philosophy: Plus Jakarta Sans brings modern geometric elegance to display text,
 * Inter provides clarity for body content. All sizes align to 4px/8px grid for harmony.
 */

// ============================================================================
// FONT FAMILIES
// ============================================================================

/**
 * Font Family Tokens
 * CSS variables defined in globals.css from next/font/google
 */
export const fontFamily = {
  display: 'var(--font-plus-jakarta-sans)', // Plus Jakarta Sans - Modern geometric sans
  body: 'var(--font-inter)',                // Inter - Sans-serif for body/UI
  mono: 'var(--font-jetbrains-mono)',       // JetBrains Mono - Code/technical
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================

/**
 * Font Weight Scale (4-Weight System)
 * Airbnb-inspired: Fewer weights = clearer hierarchy
 */
export const fontWeight = {
  regular: 400,   // Body text, standard UI, default
  medium: 500,    // Emphasized text, semi-bold buttons, subheadings
  semibold: 600,  // Headings, strong emphasis, active states
  bold: 700,      // Display headings, major emphasis, CTAs
} as const;

// ============================================================================
// TYPE SCALE (8-Point Grid Aligned)
// ============================================================================

/**
 * Font Size Scale
 * Base: 16px (1rem) - Browser default for accessibility
 * All sizes are multiples of 4px or 8px
 */
export const fontSize = {
  xs: '0.75rem',    // 12px - Caption, legal text, metadata
  sm: '0.875rem',   // 14px - Small body, secondary text
  base: '1rem',     // 16px - Standard body text
  lg: '1.25rem',    // 20px - Large body, emphasized paragraphs
  xl: '1.5rem',     // 24px - Small headings (h6-equivalent)
  '2xl': '2rem',    // 32px - Medium headings (h4-h5)
  '3xl': '2.5rem',  // 40px - Large headings (h3)
  '4xl': '3rem',    // 48px - Extra large headings (h2)
  '5xl': '4rem',    // 64px - Display headings (h1)
  '6xl': '5rem',    // 80px - Hero display text
} as const;

/**
 * Font Size Scale (Pixel Values)
 * For use in calculations and documentation
 */
export const fontSizePx = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
} as const;

// ============================================================================
// LINE HEIGHTS (Rounded to 4px Grid)
// ============================================================================

/**
 * Line Height Scale
 * Formula: Display (1.1×) → Body (1.5×) with WCAG minimums
 * All values rounded to 4px grid for visual rhythm
 */
export const lineHeight = {
  xs: '1.5',      // 18px (12px × 1.5) - Small text accessibility
  sm: '1.428',    // 20px (14px × 1.428) - Comfortable secondary
  base: '1.5',    // 24px (16px × 1.5) - WCAG compliant body
  lg: '1.6',      // 32px (20px × 1.6) - Relaxed emphasized
  xl: '1.333',    // 32px (24px × 1.333) - Tight small headings
  '2xl': '1.25',  // 40px (32px × 1.25) - Balanced medium headings
  '3xl': '1.2',   // 48px (40px × 1.2) - Compact large headings
  '4xl': '1.167', // 56px (48px × 1.167) - Display heading rhythm
  '5xl': '1.125', // 72px (64px × 1.125) - Tight hero text
  '6xl': '1.1',   // 88px (80px × 1.1) - Maximum display
} as const;

/**
 * Line Height Scale (Pixel Values)
 * For reference and calculations
 */
export const lineHeightPx = {
  xs: 18,
  sm: 20,
  base: 24,
  lg: 32,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 56,
  '5xl': 72,
  '6xl': 88,
} as const;

// ============================================================================
// LETTER SPACING (Optical Adjustment)
// ============================================================================

/**
 * Letter Spacing Scale
 * Optical adjustment: Geometric sans needs neutral/open spacing at large sizes
 */
export const letterSpacing = {
  tighter: '0',        // 64-80px display sizes (neutral for geometric sans)
  tight: '0',          // 40-48px large headings (neutral for geometric sans)
  normal: '0',         // 16-32px standard sizes (default)
  wide: '0.01em',      // 12-14px small text + buttons
  wider: '0.05em',     // Uppercase/all-caps text
} as const;

/**
 * Letter Spacing by Size
 * Maps font sizes to appropriate letter spacing
 */
export const letterSpacingBySize = {
  '6xl': letterSpacing.tighter,  // 80px
  '5xl': letterSpacing.tighter,  // 64px
  '4xl': letterSpacing.tight,    // 48px
  '3xl': letterSpacing.tight,    // 40px
  '2xl': letterSpacing.normal,   // 32px
  xl: letterSpacing.normal,      // 24px
  lg: letterSpacing.normal,      // 20px
  base: letterSpacing.normal,    // 16px
  sm: letterSpacing.wide,        // 14px
  xs: letterSpacing.wide,        // 12px
} as const;

// ============================================================================
// SEMANTIC TYPOGRAPHY TOKENS
// ============================================================================

/**
 * Display Tokens (Plus Jakarta Sans - Geometric Sans)
 * For hero sections and large display elements
 */
export const display = {
  '2xl': {
    fontSize: fontSize['6xl'],           // 80px
    lineHeight: lineHeight['6xl'],       // 88px (1.1)
    fontWeight: fontWeight.bold,         // 700
    letterSpacing: letterSpacing.tighter,// 0 (neutral for geometric sans)
    fontFamily: fontFamily.display,      // Plus Jakarta Sans
  },
  xl: {
    fontSize: fontSize['5xl'],           // 64px
    lineHeight: lineHeight['5xl'],       // 72px (1.125)
    fontWeight: fontWeight.bold,         // 700
    letterSpacing: letterSpacing.tighter,// 0 (neutral for geometric sans)
    fontFamily: fontFamily.display,      // Plus Jakarta Sans
  },
  lg: {
    fontSize: fontSize['4xl'],           // 48px
    lineHeight: lineHeight['4xl'],       // 56px (1.167)
    fontWeight: fontWeight.semibold,     // 600
    letterSpacing: letterSpacing.tight,  // 0 (neutral for geometric sans)
    fontFamily: fontFamily.display,      // Plus Jakarta Sans
  },
} as const;

/**
 * Heading Tokens
 * 3xl-2xl: Plus Jakarta Sans (modern elegance) | xl and below: Inter (clarity)
 */
export const heading = {
  '3xl': {
    fontSize: fontSize['3xl'],           // 40px
    lineHeight: lineHeight['3xl'],       // 48px (1.2)
    fontWeight: fontWeight.semibold,     // 600
    letterSpacing: letterSpacing.tight,  // 0 (neutral for geometric sans)
    fontFamily: fontFamily.display,      // Plus Jakarta Sans
  },
  '2xl': {
    fontSize: fontSize['2xl'],           // 32px
    lineHeight: lineHeight['2xl'],       // 40px (1.25)
    fontWeight: fontWeight.semibold,     // 600
    letterSpacing: letterSpacing.normal, // 0
    fontFamily: fontFamily.display,      // Plus Jakarta Sans
  },
  xl: {
    fontSize: fontSize.xl,               // 24px
    lineHeight: lineHeight.xl,           // 32px (1.333)
    fontWeight: fontWeight.semibold,     // 600
    letterSpacing: letterSpacing.normal, // 0
    fontFamily: fontFamily.body,         // Inter
  },
} as const;

/**
 * Body Text Tokens (Inter - Sans-Serif)
 * For paragraphs, UI elements, and readable content
 */
export const body = {
  lg: {
    fontSize: fontSize.lg,               // 20px
    lineHeight: lineHeight.lg,           // 32px (1.6)
    fontWeight: fontWeight.regular,      // 400
    letterSpacing: letterSpacing.normal, // 0
    fontFamily: fontFamily.body,         // Inter
  },
  base: {
    fontSize: fontSize.base,             // 16px
    lineHeight: lineHeight.base,         // 24px (1.5)
    fontWeight: fontWeight.regular,      // 400
    letterSpacing: letterSpacing.normal, // 0
    fontFamily: fontFamily.body,         // Inter
  },
  sm: {
    fontSize: fontSize.sm,               // 14px
    lineHeight: lineHeight.sm,           // 20px (1.428)
    fontWeight: fontWeight.regular,      // 400
    letterSpacing: letterSpacing.wide,   // 0.01em
    fontFamily: fontFamily.body,         // Inter
  },
} as const;

/**
 * Utility Typography Tokens (Inter)
 * For captions, labels, buttons, and specialized UI
 */
export const utility = {
  caption: {
    fontSize: fontSize.xs,               // 12px
    lineHeight: lineHeight.xs,           // 18px (1.5)
    fontWeight: fontWeight.regular,      // 400
    letterSpacing: letterSpacing.wide,   // 0.01em
    fontFamily: fontFamily.body,         // Inter
  },
  label: {
    fontSize: fontSize.sm,               // 14px
    lineHeight: lineHeight.sm,           // 20px (1.428)
    fontWeight: fontWeight.medium,       // 500
    letterSpacing: letterSpacing.normal, // 0
    fontFamily: fontFamily.body,         // Inter
  },
  button: {
    fontSize: fontSize.base,             // 16px
    lineHeight: lineHeight.base,         // 24px (1.5)
    fontWeight: fontWeight.medium,       // 500
    letterSpacing: letterSpacing.wide,   // 0.01em
    fontFamily: fontFamily.body,         // Inter
  },
  code: {
    fontSize: fontSize.sm,               // 14px
    lineHeight: lineHeight.base,         // 24px (1.714)
    fontWeight: fontWeight.regular,      // 400
    letterSpacing: letterSpacing.normal, // 0
    fontFamily: fontFamily.mono,         // JetBrains Mono
  },
} as const;

// ============================================================================
// EXPORTS & TYPES
// ============================================================================

/**
 * All typography tokens grouped by category
 */
export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
  fontSizePx,
  lineHeight,
  lineHeightPx,
  letterSpacing,
  letterSpacingBySize,
  display,
  heading,
  body,
  utility,
} as const;

/**
 * Type for semantic typography token categories
 */
export type TypographyCategory = 'display' | 'heading' | 'body' | 'utility';

/**
 * Type for typography token sizes
 */
export type DisplaySize = keyof typeof display;
export type HeadingSize = keyof typeof heading;
export type BodySize = keyof typeof body;
export type UtilityType = keyof typeof utility;
