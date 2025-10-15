/**
 * Layout Tokens - Design System Foundation
 * Status: ✅ Complete
 *
 * Our layout system provides the structural foundation for responsive design.
 * Built on mobile-first principles with industry-standard breakpoints and
 * aligned with our 8-point spacing system.
 *
 * Philosophy: Start simple (mobile), add complexity (desktop) through
 * progressive enhancement. Every breakpoint is intentional, tested, and
 * aligned with real device markets.
 */

// ============================================================================
// BREAKPOINTS (Mobile-First)
// ============================================================================

/**
 * Breakpoint Scale
 * Mobile-first approach: Base styles apply to all devices.
 * Breakpoint prefixes (sm:, md:, lg:, xl:, 2xl:) apply from that width upward.
 *
 * Based on Tailwind with custom 2xl adjustment (1440px vs 1536px)
 */
export const breakpoints = {
  sm: '640px',    // Large phones (landscape), small tablets
  md: '768px',    // Tablets (portrait)
  lg: '1024px',   // Laptops, tablets (landscape)
  xl: '1280px',   // Desktops
  '2xl': '1440px' // Large desktops, MacBook Pro 16", 27" monitors
} as const;

/**
 * Breakpoint Scale (Numeric Values)
 * For calculations and JavaScript usage
 */
export const breakpointsPx = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;

/**
 * Breakpoint Metadata
 * Device targets, market coverage, and design guidance
 */
export const breakpointInfo = {
  sm: {
    label: 'Small',
    description: 'Large phones (landscape), small tablets',
    devices: ['iPhone 14 Pro Max', 'Galaxy S23 Ultra'],
    marketCoverage: '~40% of mobile traffic',
    designChanges: ['2-column layouts viable', 'Horizontal navigation possible', 'Larger touch targets'],
  },
  md: {
    label: 'Medium',
    description: 'Tablets (portrait)',
    devices: ['iPad', 'iPad Mini', 'Android tablets'],
    marketCoverage: '~15% of traffic',
    designChanges: ['3-column layouts viable', 'Sidebar layouts work', 'More generous spacing'],
  },
  lg: {
    label: 'Large',
    description: 'Laptops',
    devices: ['MacBook Air', 'Smaller laptops (1366px)'],
    marketCoverage: '~20% of traffic',
    designChanges: ['Full navigation visible', '4-column layouts comfortable', 'Sidebars always visible'],
  },
  xl: {
    label: 'Extra Large',
    description: 'Desktops',
    devices: ['Standard desktops (1920×1080)', 'MacBook Pro 14"'],
    marketCoverage: '~10% of traffic',
    designChanges: ['Maximum layout width engaged', 'Luxury spacing increases', 'Complex multi-column layouts'],
  },
  '2xl': {
    label: '2X Large',
    description: 'Large desktops',
    devices: ['MacBook Pro 16"', '27" monitors', '4K displays'],
    marketCoverage: '~10% of traffic (growing)',
    designChanges: ['Full container width (1440px max)', 'Extra breathing room', 'High-density content displays'],
  },
} as const;

// ============================================================================
// CONTAINERS
// ============================================================================

/**
 * Container Max-Widths
 * Responsive containers that grow with viewport up to maximum width
 */
export const containers = {
  // Breakpoint-based containers (match breakpoint values)
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px', // Custom (not Tailwind's default 1536px)

  // Semantic containers
  prose: '672px',  // Blog/article content (65-75 chars per line)
  narrow: '768px', // Forms, focused content
  wide: '1440px',  // Default max container
} as const;

/**
 * Container Max-Widths (Numeric Values)
 */
export const containersPx = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  prose: 672,
  narrow: 768,
  wide: 1440,
} as const;

/**
 * Container Padding (8-Point Grid Aligned)
 * Progressive padding increase for larger screens
 */
export const containerPadding = {
  mobile: '16px',   // space-4 (px-4)
  tablet: '24px',   // space-6 (px-6)
  desktop: '32px',  // space-8 (px-8)
} as const;

/**
 * Container Padding Tokens
 * References to spacing system for consistency
 */
export const containerPaddingTokens = {
  mobile: 'space-4',   // 16px
  tablet: 'space-6',   // 24px
  desktop: 'space-8',  // 32px
} as const;

// ============================================================================
// GRID SYSTEM
// ============================================================================

/**
 * Grid Column Counts
 * 12-column system provides maximum layout flexibility
 */
export const gridColumns = {
  default: 12,
  max: 12,
} as const;

/**
 * Common Column Spans
 * Pre-calculated spans for typical layouts
 */
export const columnSpans = {
  full: 12,      // Full width (1 column)
  half: 6,       // Half width (2 columns)
  third: 4,      // Third width (3 columns)
  quarter: 3,    // Quarter width (4 columns)
  twoThirds: 8,  // Two-thirds width
  sidebar: 3,    // Sidebar (with 9 for main)
  sidebarWide: 4, // Wide sidebar (with 8 for main)
  main: 9,       // Main content (with 3 for sidebar)
  mainNarrow: 8, // Main content (with 4 for sidebar)
} as const;

/**
 * Grid Gap Standards (8-Point Grid Aligned)
 */
export const gridGap = {
  tight: '16px',   // space-4 (gap-4) - Tight grids, galleries
  default: '24px', // space-6 (gap-6) - Default grid spacing ⭐
  loose: '32px',   // space-8 (gap-8) - Loose grids, features
  section: '48px', // space-12 (gap-12) - Section gaps
} as const;

/**
 * Grid Gap Tokens
 * References to spacing system
 */
export const gridGapTokens = {
  tight: 'space-4',    // 16px
  default: 'space-6',  // 24px ⭐
  loose: 'space-8',    // 32px
  section: 'space-12', // 48px
} as const;

// ============================================================================
// COMMON LAYOUT PATTERNS
// ============================================================================

/**
 * Layout Pattern Configurations
 * Pre-defined patterns for common use cases
 */
export const layoutPatterns = {
  // Full-width container (default)
  fullWidth: {
    container: 'max-w-7xl',     // xl breakpoint (1280px)
    padding: 'px-4 md:px-6 lg:px-8',
    alignment: 'mx-auto',
  },

  // Narrow container (prose/forms)
  narrow: {
    container: 'max-w-prose',   // 672px
    padding: 'px-4 md:px-6',
    alignment: 'mx-auto',
  },

  // Sidebar + main content
  sidebarLayout: {
    container: 'max-w-7xl',
    padding: 'px-4 lg:px-8',
    grid: 'grid lg:grid-cols-[250px_1fr]',
    gap: 'gap-8',
  },

  // Card grid
  cardGrid: {
    container: 'max-w-7xl',
    padding: 'px-4 md:px-6 lg:px-8',
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    gap: 'gap-6',
  },

  // Hero section
  hero: {
    container: 'max-w-7xl',
    padding: 'px-4 md:px-6 lg:px-8',
    content: 'max-w-3xl',
    spacing: 'space-y-6 md:space-y-8',
  },
} as const;

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

/**
 * Common Responsive Class Patterns
 * Quick reference for typical responsive behavior
 */
export const responsivePatterns = {
  // Column progressions
  stackToTwo: 'grid-cols-1 md:grid-cols-2',
  stackToThree: 'grid-cols-1 md:grid-cols-3',
  stackToFour: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',

  // Show/hide
  hideOnMobile: 'hidden lg:block',
  hideOnDesktop: 'lg:hidden',
  showOnMobile: 'block lg:hidden',
  showOnDesktop: 'hidden lg:block',

  // Flex direction
  stackMobileRowDesktop: 'flex flex-col lg:flex-row',
  rowMobileStackDesktop: 'flex flex-row lg:flex-col',
  reverseOnMobile: 'flex flex-col-reverse lg:flex-row',

  // Container padding
  responsivePadding: 'px-4 md:px-6 lg:px-8',
  responsivePaddingY: 'py-8 md:py-12 lg:py-16',

  // Gap progressions
  responsiveGap: 'gap-4 md:gap-6 lg:gap-8',
} as const;

// ============================================================================
// ALIGNMENT WITH SPACING SYSTEM
// ============================================================================

/**
 * Layout-Spacing Alignment
 * Demonstrates perfect harmony between layout and spacing systems
 */
export const layoutSpacingAlignment = {
  containerPadding: {
    mobile: { layout: '16px', spacing: 'space-4', multiple: '2 × 8pt' },
    tablet: { layout: '24px', spacing: 'space-6', multiple: '3 × 8pt' },
    desktop: { layout: '32px', spacing: 'space-8', multiple: '4 × 8pt' },
  },
  gridGaps: {
    tight: { layout: '16px', spacing: 'space-4', multiple: '2 × 8pt' },
    default: { layout: '24px', spacing: 'space-6', multiple: '3 × 8pt' },
    loose: { layout: '32px', spacing: 'space-8', multiple: '4 × 8pt' },
  },
  sectionSpacing: {
    vertical: { layout: '48-64px', spacing: 'space-12 to space-16', multiple: '6-8 × 8pt' },
  },
} as const;

// ============================================================================
// EXPORTS & TYPES
// ============================================================================

/**
 * All layout tokens grouped by category
 */
export const layoutTokens = {
  breakpoints,
  breakpointsPx,
  breakpointInfo,
  containers,
  containersPx,
  containerPadding,
  containerPaddingTokens,
  gridColumns,
  columnSpans,
  gridGap,
  gridGapTokens,
  layoutPatterns,
  responsivePatterns,
  layoutSpacingAlignment,
} as const;

/**
 * Type for breakpoint keys
 */
export type Breakpoint = keyof typeof breakpoints;

/**
 * Type for container keys
 */
export type Container = keyof typeof containers;

/**
 * Type for grid gap options
 */
export type GridGap = keyof typeof gridGap;

/**
 * Type for layout pattern keys
 */
export type LayoutPattern = keyof typeof layoutPatterns;
