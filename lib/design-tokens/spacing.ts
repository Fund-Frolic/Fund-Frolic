/**
 * Spacing Tokens - Design System Foundation
 * Status: 🟡 In Progress
 *
 * Built on the 8-point grid methodology (Airbnb, Material Design, Apple).
 * All spacing is a multiple of 4px or 8px, creating mathematical harmony
 * with our typography system.
 *
 * Philosophy: Every spacing value aligns to the 8pt grid, ensuring perfect
 * vertical and horizontal rhythm across all components.
 */

// ============================================================================
// PRIMITIVE SPACING SCALE (8-Point Grid)
// ============================================================================

/**
 * Base Spacing Scale
 *
 * Primary values (8px multiples): Handle 90% of use cases
 * Half-steps (4px): Fine-tuning for special cases
 *
 * Base unit: 8px (0.5rem)
 */
export const spacing = {
  0: '0px',        // 0 - No space
  1: '0.25rem',    // 4px - Half-step for tight gaps
  2: '0.5rem',     // 8px - Base unit ⭐
  3: '0.75rem',    // 12px - Half-step
  4: '1rem',       // 16px - Standard small spacing
  5: '1.25rem',    // 20px - Half-step
  6: '1.5rem',     // 24px - Medium spacing
  8: '2rem',       // 32px - Large spacing
  10: '2.5rem',    // 40px - Extra large
  12: '3rem',      // 48px - Section spacing
  16: '4rem',      // 64px - Major sections
  20: '5rem',      // 80px - Hero sections
  24: '6rem',      // 96px - Large hero sections
  32: '8rem',      // 128px - Maximum spacing
} as const;

/**
 * Spacing Scale (Pixel Values)
 * For reference and calculations
 */
export const spacingPx = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

// ============================================================================
// SEMANTIC SPACING TOKENS (Optional Layer)
// ============================================================================

/**
 * Component Padding Tokens
 * Internal spacing within components
 */
export const componentPadding = {
  xs: spacing[2],   // 8px - Tight components
  sm: spacing[4],   // 16px - Small components
  md: spacing[6],   // 24px - Medium components
  lg: spacing[8],   // 32px - Large components
} as const;

/**
 * Component Gap Tokens
 * Spacing between child elements within components
 */
export const componentGap = {
  xs: spacing[2],   // 8px - Tight gaps (icons + labels)
  sm: spacing[4],   // 16px - Small gaps (list items)
  md: spacing[6],   // 24px - Medium gaps (cards in grid)
} as const;

/**
 * Section Padding Tokens
 * Vertical padding for major page sections
 */
export const sectionPadding = {
  sm: spacing[8],   // 32px - Small sections (mobile)
  md: spacing[12],  // 48px - Medium sections
  lg: spacing[16],  // 64px - Large sections (desktop)
  xl: spacing[20],  // 80px - Extra large sections (hero)
} as const;

/**
 * Section Gap Tokens
 * Spacing between major page sections
 */
export const sectionGap = {
  sm: spacing[8],   // 32px - Small section spacing
  md: spacing[12],  // 48px - Medium section spacing
  lg: spacing[16],  // 64px - Large section spacing
  xl: spacing[24],  // 96px - Extra large section spacing
} as const;

/**
 * Container Padding Tokens
 * Horizontal padding for page containers
 */
export const containerPadding = {
  mobile: spacing[4],   // 16px - Mobile container padding
  desktop: spacing[8],  // 32px - Desktop container padding
} as const;

// ============================================================================
// USAGE PATTERNS
// ============================================================================

/**
 * Common Spacing Patterns
 * Quick reference for typical use cases
 */
export const patterns = {
  // Inline Elements
  iconLabel: spacing[2],           // 8px - Icon + label gap
  buttonPaddingX: spacing[6],      // 24px - Button horizontal padding
  buttonPaddingY: spacing[3],      // 12px - Button vertical padding

  // Components
  cardPaddingMobile: spacing[4],   // 16px - Card padding (mobile)
  cardPaddingDesktop: spacing[6],  // 24px - Card padding (desktop)
  cardGap: spacing[4],             // 16px - Card internal gaps
  cardMargin: spacing[6],          // 24px - Card bottom margin

  // Lists & Grids
  listGap: spacing[2],             // 8px - List item gap (tight)
  listGapLoose: spacing[4],        // 16px - List item gap (loose)
  gridGap: spacing[6],             // 24px - Grid gap (cards)
  gridGapTight: spacing[4],        // 16px - Grid gap (compact)

  // Sections
  sectionPaddingMobile: spacing[12],    // 48px - Section padding (mobile)
  sectionPaddingDesktop: spacing[16],   // 64px - Section padding (desktop)
  sectionMargin: spacing[12],           // 48px - Section bottom margin

  // Hero
  heroPaddingMobile: spacing[16],       // 64px - Hero padding (mobile)
  heroPaddingDesktop: spacing[20],      // 80px - Hero padding (desktop)
  heroGap: spacing[6],                  // 24px - Hero element gap
} as const;

// ============================================================================
// ALIGNMENT WITH TYPOGRAPHY
// ============================================================================

/**
 * Typography Line Height Alignment
 * Our spacing scale aligns perfectly with typography line heights
 * for perfect vertical rhythm
 */
export const typographyAlignment = {
  // body-base (16px text) → 24px line-height → space-6 (24px) ✅
  bodyBase: spacing[6],

  // heading-xl (24px text) → 32px line-height → space-8 (32px) ✅
  headingXl: spacing[8],

  // heading-3xl (40px text) → 48px line-height → space-12 (48px) ✅
  heading3xl: spacing[12],

  // display-lg (48px text) → 56px line-height → space-16 (64px) ✅
  displayLg: spacing[16],
} as const;

// ============================================================================
// RESPONSIVE SPACING HELPERS
// ============================================================================

/**
 * Responsive Spacing Patterns
 * Common mobile → desktop spacing progressions
 */
export const responsive = {
  // Component padding: 16px → 24px
  componentPadding: {
    mobile: spacing[4],
    desktop: spacing[6],
  },

  // Section padding: 48px → 64px
  sectionPadding: {
    mobile: spacing[12],
    desktop: spacing[16],
  },

  // Hero padding: 64px → 96px
  heroPadding: {
    mobile: spacing[16],
    tablet: spacing[20],
    desktop: spacing[24],
  },

  // Container padding: 16px → 32px
  containerPadding: {
    mobile: spacing[4],
    desktop: spacing[8],
  },
} as const;

// ============================================================================
// EXPORTS & TYPES
// ============================================================================

/**
 * All spacing tokens grouped by category
 */
export const spacingTokens = {
  spacing,
  spacingPx,
  componentPadding,
  componentGap,
  sectionPadding,
  sectionGap,
  containerPadding,
  patterns,
  typographyAlignment,
  responsive,
} as const;

/**
 * Type for primitive spacing scale
 */
export type SpacingScale = keyof typeof spacing;

/**
 * Type for semantic spacing categories
 */
export type SpacingCategory =
  | 'componentPadding'
  | 'componentGap'
  | 'sectionPadding'
  | 'sectionGap'
  | 'containerPadding';
