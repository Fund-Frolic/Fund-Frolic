/**
 * Transition Tokens - Design System Foundation
 * Status: ✅ Complete
 *
 * Accessibility-first transition system with duration, easing, and
 * motion-safe support (prefers-reduced-motion).
 *
 * Philosophy: Motion should enhance, not distract. Fast transitions
 * for micro-interactions, slower for major UI changes. Always respect
 * user motion preferences.
 */

// ============================================================================
// DURATION SCALE
// ============================================================================

/**
 * Duration Scale
 * 3 levels based on Nielsen Norman Group research (100-400ms max)
 *
 * Fast: 150ms - Micro-interactions (hover, focus, color changes)
 * Base: 300ms - Standard transitions (dropdowns, modals, most UI)
 * Slow: 500ms - Complex animations (page transitions, large movements)
 *
 * Note: Durations longer than 500ms feel sluggish and should be avoided
 * for UI transitions. Reserve longer durations for decorative animations
 * or loading states.
 */
export const duration = {
  /**
   * Fast - 150ms
   * Use for: Hover states, focus rings, color changes, opacity fades
   */
  fast: '150ms',

  /**
   * Base - 300ms (Default ⭐)
   * Use for: Dropdowns, tooltips, popovers, most UI transitions
   */
  base: '300ms',

  /**
   * Slow - 500ms
   * Use for: Modals, drawers, page transitions, complex animations
   */
  slow: '500ms',
} as const;

// ============================================================================
// EASING CURVES
// ============================================================================

/**
 * Easing Curves
 * Custom cubic-bezier curves for natural motion (better than CSS defaults)
 *
 * Out: Elements decelerating into view (entrance)
 * In: Elements accelerating away (exit)
 * InOut: Bidirectional, reversible animations
 *
 * CSS defaults like 'ease' and 'ease-in-out' are mathematically simple
 * but feel mechanical. Our custom curves provide more natural motion.
 */
export const easing = {
  /**
   * Ease Out - Smooth deceleration
   * cubic-bezier(0.33, 1, 0.68, 1)
   *
   * Use for: Entrance animations (elements coming into view)
   * Effect: Fast start, gentle landing (natural, welcoming)
   */
  out: 'cubic-bezier(0.33, 1, 0.68, 1)',

  /**
   * Ease In - Quick acceleration
   * cubic-bezier(0.32, 0, 0.67, 0)
   *
   * Use for: Exit animations (elements leaving view)
   * Effect: Slow start, quick acceleration (elements "falling away")
   */
  in: 'cubic-bezier(0.32, 0, 0.67, 0)',

  /**
   * Ease In-Out - Natural motion
   * cubic-bezier(0.65, 0, 0.35, 1)
   *
   * Use for: Bidirectional animations (reversible, toggles)
   * Effect: Smooth acceleration and deceleration (natural, balanced)
   */
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

// ============================================================================
// SEMANTIC TRANSITIONS
// ============================================================================

/**
 * Semantic Transition Tokens
 * Pre-composed transitions for common use cases
 *
 * These combine duration + easing for typical scenarios.
 * Always use getTransition() helper to respect motion preferences.
 */
export const transitions = {
  /**
   * Interactive - Fast transitions for user interactions
   * Duration: 150ms | Easing: out (smooth deceleration)
   * Use for: Hover states, focus rings, button presses, color changes
   */
  interactive: `all ${duration.fast} ${easing.out}`,

  /**
   * Dropdown - Standard overlay transitions
   * Duration: 300ms | Easing: out (smooth entrance)
   * Use for: Dropdowns, tooltips, popovers, menus
   */
  dropdown: `all ${duration.base} ${easing.out}`,

  /**
   * Modal - Slow transitions for major UI changes
   * Duration: 500ms | Easing: inOut (balanced motion)
   * Use for: Modals, drawers, sheets, page transitions
   */
  modal: `all ${duration.slow} ${easing.inOut}`,

  /**
   * Color - Performance-optimized color transitions
   * Duration: 150ms | Easing: out (smooth color change)
   * Use for: Theme switches, color-only animations
   *
   * Note: Only animates color, background-color, and border-color
   * for better performance (no layout reflows).
   */
  color: `color ${duration.fast} ${easing.out}, background-color ${duration.fast} ${easing.out}, border-color ${duration.fast} ${easing.out}`,
} as const;

// ============================================================================
// TYPES
// ============================================================================

/**
 * Type for duration keys
 */
export type Duration = keyof typeof duration;

/**
 * Type for easing keys
 */
export type Easing = keyof typeof easing;

/**
 * Type for transition keys
 */
export type Transition = keyof typeof transitions;

// ============================================================================
// ACCESSIBILITY HELPER
// ============================================================================

/**
 * Get transition with motion-safe support
 *
 * Respects user's prefers-reduced-motion preference.
 * If user has reduced motion enabled, returns 'none' instead of transition.
 *
 * Critical: Always use this helper in components (not raw transition strings)
 *
 * @example
 * // In a React component
 * const buttonStyles = {
 *   transition: getTransition('interactive')
 * };
 *
 * @example
 * // With Tailwind classes
 * // Instead of: transition-all duration-150
 * // Use: motion-safe:transition-all motion-safe:duration-150
 */
export const getTransition = (transition: Transition): string => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'none';
  }
  return transitions[transition];
};

// ============================================================================
// USAGE GUIDELINES
// ============================================================================

/**
 * Transition Usage Guide
 *
 * Default: interactive (150ms, fast feedback)
 * Overlays: dropdown (300ms, smooth entrance)
 * Major UI: modal (500ms, deliberate change)
 * Theme Switch: color (150ms, performance-optimized)
 *
 * Accessibility:
 * - ALWAYS respect prefers-reduced-motion
 * - Use getTransition() helper in JavaScript/React
 * - Use motion-safe: prefix in Tailwind classes
 * - Test with motion reduced in OS settings
 *
 * Performance:
 * - Avoid animating layout properties (width, height, margin, padding)
 * - Prefer transform and opacity (GPU-accelerated)
 * - Use will-change sparingly (only for frequently animated elements)
 * - Remove will-change after animation completes
 *
 * Best Practices:
 * - Entrance: Use easing.out (smooth deceleration)
 * - Exit: Use easing.in (quick acceleration)
 * - Bidirectional: Use easing.inOut (balanced motion)
 * - Keep durations under 500ms for UI (longer feels sluggish)
 */
export const transitionUsage = {
  default: 'interactive',        // 150ms - Most interactions
  overlay: 'dropdown',            // 300ms - Overlays, menus
  major: 'modal',                 // 500ms - Modals, drawers
  colorOnly: 'color',             // 150ms - Theme switches
} as const;

// ============================================================================
// TRANSITION METADATA
// ============================================================================

/**
 * Transition metadata for documentation and tooling
 */
export const transitionInfo = {
  interactive: {
    label: 'Interactive',
    duration: '150ms',
    easing: 'out',
    description: 'Fast transitions for user interactions',
    useCases: ['Hover states', 'Focus rings', 'Button presses', 'Color changes'],
  },
  dropdown: {
    label: 'Dropdown',
    duration: '300ms',
    easing: 'out',
    description: 'Standard overlay transitions',
    useCases: ['Dropdowns', 'Tooltips', 'Popovers', 'Menus'],
  },
  modal: {
    label: 'Modal',
    duration: '500ms',
    easing: 'inOut',
    description: 'Slow transitions for major UI changes',
    useCases: ['Modals', 'Drawers', 'Sheets', 'Page transitions'],
  },
  color: {
    label: 'Color',
    duration: '150ms',
    easing: 'out',
    description: 'Performance-optimized color transitions',
    useCases: ['Theme switches', 'Color-only animations'],
  },
} as const;

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * Common transition patterns for typical use cases
 */
export const transitionPatterns = {
  // Interactive elements
  button: {
    rest: getTransition('interactive'),
    hover: getTransition('interactive'),
    active: getTransition('interactive'),
  },

  // Overlays
  overlay: {
    enter: `opacity ${duration.base} ${easing.out}, transform ${duration.base} ${easing.out}`,
    exit: `opacity ${duration.fast} ${easing.in}, transform ${duration.fast} ${easing.in}`,
  },

  // Modals
  modal: {
    backdrop: `opacity ${duration.base} ${easing.inOut}`,
    content: `opacity ${duration.slow} ${easing.inOut}, transform ${duration.slow} ${easing.inOut}`,
  },

  // Theme toggle
  theme: getTransition('color'),
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * All transition tokens grouped
 */
export const transitionTokens = {
  duration,
  easing,
  transitions,
  transitionUsage,
  transitionInfo,
  transitionPatterns,
  getTransition,
} as const;
