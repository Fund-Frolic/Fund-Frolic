/**
 * Opacity Tokens - Design System Foundation
 * Status:  Complete
 *
 * Accessibility-compliant opacity scale with 8 levels.
 *
 * Philosophy: Opacity should enhance hierarchy without compromising
 * accessibility. Our scale provides clear steps from invisible to full
 * opacity, with careful consideration for WCAG contrast requirements.
 */

// ============================================================================
// OPACITY SCALE (8 Levels)
// ============================================================================

/**
 * Opacity Scale
 * 8 levels from invisible (0) to full (1)
 *
 * Critical: Text with opacity < 1 may fail WCAG contrast requirements.
 * Always test final contrast ratio when applying opacity to text.
 *
 * Use opacity for:
 * - Disabled states (0.5 minimum for WCAG)
 * - Hover overlays (0.1-0.25)
 * - Glassmorphism effects (0.75-0.9)
 * - Fading animations
 *
 * Avoid opacity for:
 * - Body text (use color instead)
 * - Primary actions (must be fully opaque)
 * - Critical information
 */
export const opacity = {
  /**
   * Full - 100%
   * Default opacity (fully opaque)
   * Use for: All content by default, primary actions, body text
   */
  full: '1',

  /**
   * High - 90%
   * Slight transparency
   * Use for: Glassmorphism effects, subtle overlays, secondary surfaces
   */
  high: '0.9',

  /**
   * Medium - 75%
   * Noticeable transparency
   * Use for: Secondary elements, muted content, less important UI
   */
  medium: '0.75',

  /**
   * Low - 60%
   * Strong transparency
   * Use for: Tertiary elements, placeholders, very muted content
   */
  low: '0.6',

  /**
   * Disabled - 50%
   * Minimum for disabled state (WCAG compliant)
   * Use for: Disabled buttons, disabled inputs, inactive elements
   * Note: 0.5 is minimum for WCAG 2.1 - anything lower may fail contrast
   */
  disabled: '0.5',

  /**
   * Subtle - 25%
   * Very transparent
   * Use for: Hover overlays, subtle dividers, faint backgrounds
   */
  subtle: '0.25',

  /**
   * Faint - 10%
   * Barely visible
   * Use for: Very subtle backgrounds, ultra-light overlays
   */
  faint: '0.1',

  /**
   * Invisible - 0%
   * Completely transparent (but present in DOM)
   * Use for: Hidden elements that should maintain layout space
   */
  invisible: '0',
} as const;

// ============================================================================
// TYPES
// ============================================================================

/**
 * Type for opacity keys
 * Enables autocomplete: opacity-full, opacity-disabled, opacity-subtle, etc.
 */
export type Opacity = keyof typeof opacity;

// ============================================================================
// USAGE GUIDELINES
// ============================================================================

/**
 * Opacity Usage Guide
 *
 * Default: full (1) - All content by default
 * Glassmorphism: high (0.9) - Subtle transparency for modern effects
 * Secondary UI: medium (0.75) - Muted but readable
 * Disabled: disabled (0.5) - WCAG minimum for disabled states
 * Hover overlay: subtle (0.25) - Barely visible background change
 * Dividers: faint (0.1) - Ultra-subtle separation
 *
 * Accessibility:
 * - Text with opacity < 1 may fail WCAG AA (4.5:1 contrast)
 * - Always test final contrast ratio with tools
 * - For disabled text, use color instead of opacity when possible
 * - 0.5 (disabled) is minimum for WCAG 2.1 compliance
 *
 * Performance:
 * - Opacity animations are GPU-accelerated (performant)
 * - Prefer opacity over visibility for fade animations
 * - Use will-change: opacity for frequently animated elements
 *
 * Best Practices:
 * - Use color for text hierarchy (not opacity)
 * - Reserve opacity for backgrounds, overlays, and effects
 * - Test on both light and dark backgrounds
 * - Ensure sufficient contrast at all opacity levels
 */
export const opacityUsage = {
  default: 'full',           // 1 - Default for all content
  glassmorphism: 'high',     // 0.9 - Subtle transparency
  secondary: 'medium',       // 0.75 - Secondary UI
  tertiary: 'low',           // 0.6 - Tertiary elements
  disabled: 'disabled',      // 0.5 - Disabled states (WCAG minimum)
  hoverOverlay: 'subtle',    // 0.25 - Hover backgrounds
  divider: 'faint',          // 0.1 - Subtle dividers
} as const;

// ============================================================================
// OPACITY METADATA
// ============================================================================

/**
 * Opacity metadata for documentation and tooling
 */
export const opacityInfo = {
  full: {
    label: 'Full',
    value: 1,
    percentage: '100%',
    description: 'Fully opaque (default)',
    useCases: ['All content by default', 'Primary actions', 'Body text'],
    wcagCompliant: true,
  },
  high: {
    label: 'High',
    value: 0.9,
    percentage: '90%',
    description: 'Slight transparency',
    useCases: ['Glassmorphism effects', 'Subtle overlays', 'Secondary surfaces'],
    wcagCompliant: 'Test required',
  },
  medium: {
    label: 'Medium',
    value: 0.75,
    percentage: '75%',
    description: 'Noticeable transparency',
    useCases: ['Secondary elements', 'Muted content', 'Less important UI'],
    wcagCompliant: 'Test required',
  },
  low: {
    label: 'Low',
    value: 0.6,
    percentage: '60%',
    description: 'Strong transparency',
    useCases: ['Tertiary elements', 'Placeholders', 'Very muted content'],
    wcagCompliant: 'Likely fails',
  },
  disabled: {
    label: 'Disabled',
    value: 0.5,
    percentage: '50%',
    description: 'Minimum for disabled state (WCAG compliant)',
    useCases: ['Disabled buttons', 'Disabled inputs', 'Inactive elements'],
    wcagCompliant: 'Minimum threshold',
  },
  subtle: {
    label: 'Subtle',
    value: 0.25,
    percentage: '25%',
    description: 'Very transparent',
    useCases: ['Hover overlays', 'Subtle dividers', 'Faint backgrounds'],
    wcagCompliant: 'Not for text',
  },
  faint: {
    label: 'Faint',
    value: 0.1,
    percentage: '10%',
    description: 'Barely visible',
    useCases: ['Very subtle backgrounds', 'Ultra-light overlays'],
    wcagCompliant: 'Not for text',
  },
  invisible: {
    label: 'Invisible',
    value: 0,
    percentage: '0%',
    description: 'Completely transparent (but present in DOM)',
    useCases: ['Hidden elements that maintain layout space'],
    wcagCompliant: 'N/A',
  },
} as const;

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * Common opacity patterns for typical use cases
 */
export const opacityPatterns = {
  // Interactive states
  interactive: {
    rest: opacity.full,          // 1 - Fully visible
    hover: opacity.high,         // 0.9 - Subtle feedback
    active: opacity.medium,      // 0.75 - Clear feedback
    disabled: opacity.disabled,  // 0.5 - Clearly disabled
  },

  // Overlays
  overlay: {
    backdrop: opacity.medium,    // 0.75 - Visible but not opaque
    hoverOverlay: opacity.subtle, // 0.25 - Subtle hover effect
    loading: opacity.high,       // 0.9 - Slight transparency
  },

  // Backgrounds
  background: {
    glassmorphism: opacity.high,   // 0.9 - Modern frosted glass effect
    subtle: opacity.faint,         // 0.1 - Barely visible background
    muted: opacity.medium,         // 0.75 - Noticeable but soft
  },

  // Dividers
  divider: {
    default: opacity.faint,      // 0.1 - Ultra-subtle
    strong: opacity.subtle,      // 0.25 - More visible
  },

  // Images
  image: {
    fullBrightness: opacity.full,    // 1 - Normal image
    dimmed: opacity.medium,          // 0.75 - Slightly dimmed
    veryDimmed: opacity.disabled,    // 0.5 - Clearly dimmed
  },
} as const;

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

/**
 * Check if opacity level is safe for text
 *
 * Returns warning for opacity levels that may fail WCAG contrast requirements.
 * Always test final contrast ratio with actual colors.
 *
 * @example
 * isTextSafe('full')     // true
 * isTextSafe('disabled') // false (warning: test contrast)
 * isTextSafe('subtle')   // false (not safe for text)
 */
export const isTextSafe = (opacityKey: Opacity): boolean => {
  const value = parseFloat(opacity[opacityKey]);
  return value === 1; // Only full opacity is guaranteed safe
};

/**
 * Get opacity with accessibility warning
 *
 * Returns opacity value with console warning if unsafe for text.
 */
export const getOpacityWithWarning = (opacityKey: Opacity, isText: boolean = false): string => {
  if (isText && !isTextSafe(opacityKey)) {
    console.warn(
      `Opacity "${opacityKey}" (${opacity[opacityKey]}) may fail WCAG contrast requirements for text. ` +
      `Consider using color instead of opacity for text hierarchy. ` +
      `Always test final contrast ratio.`
    );
  }
  return opacity[opacityKey];
};

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * All opacity tokens grouped
 */
export const opacityTokens = {
  opacity,
  opacityUsage,
  opacityInfo,
  opacityPatterns,
  isTextSafe,
  getOpacityWithWarning,
} as const;
