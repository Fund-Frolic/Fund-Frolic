/**
 * Shadow Tokens - Design System Foundation
 * Status: ✅ Complete
 *
 * Material Design 3-inspired elevation system with 5 levels.
 * Shadows use warm neutral (#2E2D2A) to maintain palette consistency.
 *
 * Philosophy: Shadows should feel natural, not overpowering. Each level
 * represents a clear step in visual hierarchy, from flat surfaces to
 * maximum elevation.
 */

// ============================================================================
// SHADOW SCALE (5 Elevation Levels)
// ============================================================================

/**
 * Shadow Scale
 * 5 elevation levels from flat (none) to maximum (2xl)
 *
 * Based on Material Design 3 with custom adjustments for warm palette.
 * All shadow colors use neutral-900 (#2E2D2A, rgba(46, 45, 42)) for
 * consistency with our warm color system.
 *
 * Each shadow includes:
 * - Offset: Y-axis movement creates depth perception
 * - Blur: Softens edges for natural appearance
 * - Spread: Controls shadow size
 * - Opacity: Layered opacities for realistic depth
 */
export const shadows = {
  /**
   * Level 0: Flat - No elevation
   * Use for: Backgrounds, flat surfaces, inline elements
   */
  none: 'none',

  /**
   * Level 1: Raised - Subtle depth
   * Offset: 1px down | Blur: 2px | Opacity: 5%
   * Use for: Cards (default), buttons (rest state), chips
   */
  sm: '0 1px 2px 0 rgba(46, 45, 42, 0.05)',

  /**
   * Level 2: Lifted - Standard elevation
   * Two layers for realistic depth:
   * - Layer 1: 2px down, 4px blur, 6% opacity (ambient shadow)
   * - Layer 2: 4px down, 6px blur, 10% opacity (direct shadow)
   * Use for: Cards (hover), navigation bars, panels
   */
  md: '0 2px 4px -1px rgba(46, 45, 42, 0.06), 0 4px 6px -1px rgba(46, 45, 42, 0.10)',

  /**
   * Level 3: Floating - Elevated UI
   * Two layers with increased separation:
   * - Layer 1: 4px down, 6px blur, 5% opacity (ambient)
   * - Layer 2: 10px down, 15px blur, 10% opacity (direct)
   * Use for: Dropdowns, popovers, context menus, floating action buttons
   */
  lg: '0 4px 6px -2px rgba(46, 45, 42, 0.05), 0 10px 15px -3px rgba(46, 45, 42, 0.10)',

  /**
   * Level 4: Modal - High elevation
   * Two layers with dramatic separation:
   * - Layer 1: 10px down, 25px blur, 10% opacity (ambient)
   * - Layer 2: 20px down, 40px blur, 15% opacity (direct)
   * Use for: Modals, dialogs, sheets, command palettes
   */
  xl: '0 10px 25px -5px rgba(46, 45, 42, 0.10), 0 20px 40px -10px rgba(46, 45, 42, 0.15)',

  /**
   * Level 5: Maximum - Highest elevation
   * Single powerful shadow for maximum impact:
   * - 25px down, 50px blur, 25% opacity
   * Use for: Tooltips over modals, critical alerts, top-layer UI
   */
  '2xl': '0 25px 50px -12px rgba(46, 45, 42, 0.25)',
} as const;

// ============================================================================
// TYPES
// ============================================================================

/**
 * Type for shadow keys
 * Enables autocomplete: shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl
 */
export type Shadow = keyof typeof shadows;

// ============================================================================
// USAGE GUIDELINES
// ============================================================================

/**
 * Shadow Usage Guide
 *
 * Default: shadow-sm (most UI elements)
 * Hover: shadow-md (lifted state for interactive elements)
 * Active Overlay: shadow-lg (dropdowns, popovers)
 * Modal: shadow-xl (dialogs, sheets)
 * Maximum: shadow-2xl (tooltips over modals, critical UI)
 *
 * Accessibility:
 * - Shadows alone should not convey critical information
 * - Always pair with borders or other visual cues for low-vision users
 * - Test on both light and dark backgrounds
 *
 * Performance:
 * - Avoid animating box-shadow (causes repaints)
 * - Use opacity transitions on shadow containers instead
 * - Consider will-change: transform for frequently animated elements
 */
export const shadowUsage = {
  default: 'shadow-sm',
  hover: 'shadow-md',
  activeOverlay: 'shadow-lg',
  modal: 'shadow-xl',
  maximum: 'shadow-2xl',
} as const;

// ============================================================================
// SHADOW METADATA
// ============================================================================

/**
 * Shadow metadata for documentation and tooling
 */
export const shadowInfo = {
  none: {
    label: 'Flat',
    description: 'No elevation',
    useCases: ['Backgrounds', 'Flat surfaces', 'Inline elements'],
  },
  sm: {
    label: 'Raised',
    description: 'Subtle depth for basic elevation',
    useCases: ['Default cards', 'Buttons (rest)', 'Chips', 'Tags'],
  },
  md: {
    label: 'Lifted',
    description: 'Standard elevation for interactive elements',
    useCases: ['Cards (hover)', 'Navigation bars', 'Panels', 'Sidebars'],
  },
  lg: {
    label: 'Floating',
    description: 'Elevated UI elements above content',
    useCases: ['Dropdowns', 'Popovers', 'Context menus', 'FABs'],
  },
  xl: {
    label: 'Modal',
    description: 'High elevation for prominent UI',
    useCases: ['Modals', 'Dialogs', 'Sheets', 'Command palettes'],
  },
  '2xl': {
    label: 'Maximum',
    description: 'Highest elevation for critical UI',
    useCases: ['Tooltips over modals', 'Critical alerts', 'Top-layer UI'],
  },
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * All shadow tokens grouped
 */
export const shadowTokens = {
  shadows,
  shadowUsage,
  shadowInfo,
} as const;
