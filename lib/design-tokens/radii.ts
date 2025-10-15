/**
 * Border Radius Tokens - Design System Foundation
 * Status: ✅ Complete
 *
 * 8-level radius system aligned to 8-point grid for consistent roundness.
 *
 * Philosophy: Rounded corners convey approachability and warmth. Our system
 * provides clear steps from sharp (technical) to full (pills/avatars),
 * with md (8px) as the default for professional warmth.
 */

// ============================================================================
// BORDER RADIUS SCALE (8 Levels)
// ============================================================================

/**
 * Border Radius Scale
 * 8 levels from sharp (none) to circular (full)
 *
 * Most values align to 8-point grid (4px, 8px, 16px, 24px).
 * Sub-8px values (2px) and 12px provide additional flexibility.
 *
 * Default: md (8px) for professional warmth
 */
export const radii = {
  /**
   * Sharp - 0px
   * Use for: Tables, technical components, data grids, strict layouts
   */
  none: '0px',

  /**
   * Subtle - 2px
   * Use for: Tags, badges, minimal softness, tight layouts
   */
  xs: '2px',

  /**
   * Small - 4px
   * Use for: Buttons, inputs, chips, compact UI (half of base unit)
   */
  sm: '4px',

  /**
   * Base - 8px (Default ⭐)
   * Use for: Cards, panels, default interactive elements
   * Aligns perfectly with 8-point grid base unit
   */
  md: '8px',

  /**
   * Large - 12px
   * Use for: Prominent cards, feature sections, highlighted content
   * 1.5× base unit for noticeable roundness
   */
  lg: '12px',

  /**
   * Extra Large - 16px
   * Use for: Hero cards, modal dialogs, primary surfaces
   * 2× base unit for strong roundness
   */
  xl: '16px',

  /**
   * 2X Large - 24px
   * Use for: Decorative elements, image containers, large surfaces
   * 3× base unit for dramatic roundness
   */
  '2xl': '24px',

  /**
   * Full - 9999px (Circular)
   * Use for: Pills, avatar badges, circular buttons, tags
   * Creates perfect circles for square elements
   */
  full: '9999px',
} as const;

// ============================================================================
// TYPES
// ============================================================================

/**
 * Type for radius keys
 * Enables autocomplete: rounded-sm, rounded-md, rounded-lg, etc.
 */
export type Radius = keyof typeof radii;

// ============================================================================
// NESTED RADIUS HELPER
// ============================================================================

/**
 * Calculate inner radius for nested containers
 *
 * When a rounded container has padding, the inner content should have
 * a smaller radius to maintain consistent visual spacing.
 *
 * Formula: innerRadius = max(0, outerRadius - padding)
 *
 * @example
 * // Outer container: rounded-lg (12px) with p-4 (16px padding)
 * // Inner content: rounded-none (0px)
 * getNestedRadius('lg', 16) // Returns '0px'
 *
 * @example
 * // Outer container: rounded-2xl (24px) with p-4 (16px padding)
 * // Inner content: rounded-sm (8px)
 * getNestedRadius('2xl', 16) // Returns '8px'
 */
export const getNestedRadius = (outerRadius: Radius, padding: number): string => {
  const outerValue = parseInt(radii[outerRadius]);
  const innerValue = Math.max(0, outerValue - padding);
  return `${innerValue}px`;
};

// ============================================================================
// USAGE GUIDELINES
// ============================================================================

/**
 * Radius Usage Guide
 *
 * Default: rounded-md (8px) - Professional warmth
 * Compact UI: rounded-sm (4px) - Buttons, inputs, chips
 * Prominent UI: rounded-lg (12px) or rounded-xl (16px) - Featured cards
 * Decorative: rounded-2xl (24px) - Large surfaces, images
 * Pills: rounded-full - Tags, badges, avatars
 *
 * Nested Containers:
 * - Use getNestedRadius() to calculate inner radius
 * - Maintains consistent visual spacing
 * - Prevents "double rounding" appearance
 *
 * Accessibility:
 * - Rounded corners are decorative, not functional
 * - Don't use radius alone to convey state or meaning
 * - Ensure sufficient contrast at edges
 */
export const radiusUsage = {
  default: 'rounded-md',     // 8px - Most UI elements
  compact: 'rounded-sm',     // 4px - Buttons, inputs
  prominent: 'rounded-lg',   // 12px - Featured content
  decorative: 'rounded-2xl', // 24px - Large surfaces
  pill: 'rounded-full',      // 9999px - Circular elements
} as const;

// ============================================================================
// RADIUS METADATA
// ============================================================================

/**
 * Radius metadata for documentation and tooling
 */
export const radiusInfo = {
  none: {
    label: 'Sharp',
    description: 'No rounding (0px)',
    useCases: ['Tables', 'Data grids', 'Technical components', 'Strict layouts'],
    gridAlignment: 'N/A',
  },
  xs: {
    label: 'Subtle',
    description: 'Minimal softness (2px)',
    useCases: ['Tags', 'Badges', 'Minimal UI', 'Tight layouts'],
    gridAlignment: '0.25× base unit',
  },
  sm: {
    label: 'Small',
    description: 'Compact roundness (4px)',
    useCases: ['Buttons', 'Inputs', 'Chips', 'Compact UI'],
    gridAlignment: '0.5× base unit',
  },
  md: {
    label: 'Base',
    description: 'Default roundness (8px) ⭐',
    useCases: ['Cards', 'Panels', 'Default interactive elements'],
    gridAlignment: '1× base unit',
  },
  lg: {
    label: 'Large',
    description: 'Prominent roundness (12px)',
    useCases: ['Featured cards', 'Feature sections', 'Highlighted content'],
    gridAlignment: '1.5× base unit',
  },
  xl: {
    label: 'Extra Large',
    description: 'Strong roundness (16px)',
    useCases: ['Hero cards', 'Modal dialogs', 'Primary surfaces'],
    gridAlignment: '2× base unit',
  },
  '2xl': {
    label: '2X Large',
    description: 'Dramatic roundness (24px)',
    useCases: ['Decorative elements', 'Image containers', 'Large surfaces'],
    gridAlignment: '3× base unit',
  },
  full: {
    label: 'Full',
    description: 'Circular (9999px)',
    useCases: ['Pills', 'Avatar badges', 'Circular buttons', 'Tags'],
    gridAlignment: 'N/A (percentage-based)',
  },
} as const;

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * Common radius patterns for typical use cases
 */
export const radiusPatterns = {
  // Form elements
  form: {
    input: 'rounded-sm',      // 4px - Compact for forms
    button: 'rounded-sm',     // 4px - Matches inputs
    checkbox: 'rounded-xs',   // 2px - Subtle for small elements
    switch: 'rounded-full',   // 9999px - Circular toggle
  },

  // Content containers
  container: {
    card: 'rounded-md',       // 8px - Default cards
    panel: 'rounded-md',      // 8px - Default panels
    modal: 'rounded-xl',      // 16px - Prominent dialogs
    hero: 'rounded-2xl',      // 24px - Large hero sections
  },

  // Interactive elements
  interactive: {
    button: 'rounded-sm',     // 4px - Standard buttons
    chip: 'rounded-full',     // 9999px - Pills
    badge: 'rounded-full',    // 9999px - Badges
    avatar: 'rounded-full',   // 9999px - Circular avatars
  },

  // Media
  media: {
    image: 'rounded-lg',      // 12px - Image containers
    video: 'rounded-lg',      // 12px - Video players
    thumbnail: 'rounded-md',  // 8px - Thumbnails
  },
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * All radius tokens grouped
 */
export const radiusTokens = {
  radii,
  radiusUsage,
  radiusInfo,
  radiusPatterns,
  getNestedRadius,
} as const;
