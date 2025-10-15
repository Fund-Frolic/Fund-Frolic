/**
 * Z-Index Tokens - Design System Foundation
 * Status:  Complete
 *
 * Systematic stacking scale with 1000-unit gaps to prevent conflicts.
 *
 * Philosophy: Z-index should be predictable and conflict-free. Our system
 * uses large gaps (1000 units) to allow insertion of intermediate values
 * if needed, while maintaining clear hierarchy.
 */

// ============================================================================
// Z-INDEX SCALE (9 Layers)
// ============================================================================

/**
 * Z-Index Scale
 * 9 layers with 1000-unit gaps for clear stacking hierarchy
 *
 * Large gaps (1000 units) prevent conflicts and allow intermediate values
 * (e.g., dropdown + 1 = 1001) when absolutely necessary.
 *
 * Critical Rule: NEVER use raw numbers. Always use named tokens to prevent
 * stacking conflicts and maintain system consistency.
 *
 * Layers (bottom to top):
 * 0. Base - Normal document flow
 * 1. Dropdown - 1000 (menus, select dropdowns)
 * 2. Sticky - 1010 (sticky headers, floating action buttons)
 * 3. Fixed - 1020 (fixed navigation, sidebars)
 * 4. Overlay - 1030 (backdrop for modals/drawers)
 * 5. Modal - 1040 (dialogs, sheets, popovers)
 * 6. Popover - 1050 (context menus over modals)
 * 7. Tooltip - 1060 (tooltips must appear above everything)
 * 8. Toast - 1070 (notifications, alerts, toasts)
 */
export const zIndex = {
  /**
   * Base - 0
   * Normal document flow (default)
   * Use for: Most content, no explicit stacking needed
   */
  base: 0,

  /**
   * Dropdown - 1000
   * First elevated layer
   * Use for: Select dropdowns, basic menus, combobox options
   */
  dropdown: 1000,

  /**
   * Sticky - 1010
   * Sticky positioned elements
   * Use for: Sticky headers, sticky table headers, floating action buttons
   */
  sticky: 1010,

  /**
   * Fixed - 1020
   * Fixed positioned elements
   * Use for: Fixed navigation bars, fixed sidebars, persistent UI
   */
  fixed: 1020,

  /**
   * Overlay - 1030
   * Modal backdrop layer
   * Use for: Modal backdrops, drawer overlays, dimmed backgrounds
   */
  overlay: 1030,

  /**
   * Modal - 1040
   * Modal content layer
   * Use for: Modal dialogs, sheets, bottom sheets, major overlays
   */
  modal: 1040,

  /**
   * Popover - 1050
   * Contextual UI over modals
   * Use for: Context menus over modals, popovers inside dialogs
   */
  popover: 1050,

  /**
   * Tooltip - 1060
   * Tooltip layer (must appear above everything except toasts)
   * Use for: Tooltips, help text, assistive overlays
   */
  tooltip: 1060,

  /**
   * Toast - 1070
   * Highest layer for notifications
   * Use for: Toast notifications, alerts, snackbars, system messages
   */
  toast: 1070,
} as const;

// ============================================================================
// TYPES
// ============================================================================

/**
 * Type for z-index keys
 * Enables autocomplete: z-dropdown, z-modal, z-tooltip, etc.
 */
export type ZIndex = keyof typeof zIndex;

// ============================================================================
// USAGE GUIDELINES
// ============================================================================

/**
 * Z-Index Usage Guide
 *
 * Critical Rules:
 * 1. NEVER use raw numbers (e.g., z-index: 999)
 * 2. ALWAYS use named tokens (e.g., z-index: zIndex.modal)
 * 3. If you need intermediate values, update this scale
 * 4. Test stacking in realistic scenarios (modals + tooltips + toasts)
 *
 * Hierarchy (bottom to top):
 * - Base (0): Normal content
 * - Dropdown (1000): Menus, select options
 * - Sticky (1010): Sticky headers, FABs
 * - Fixed (1020): Fixed navigation
 * - Overlay (1030): Modal backdrops
 * - Modal (1040): Dialog content
 * - Popover (1050): Context menus over modals
 * - Tooltip (1060): Tooltips over everything
 * - Toast (1070): Notifications (highest)
 *
 * Common Scenarios:
 * - Modal with tooltip: Modal (1040) + Tooltip (1060) 
 * - Dropdown in modal: Dropdown would be too low L Use popover (1050)
 * - Toast over modal: Toast (1070) always on top 
 * - Fixed nav with dropdown: Dropdown (1000) + Fixed (1020) = Nav on top 
 *
 * Accessibility:
 * - Stacking order should not affect keyboard navigation
 * - Use proper focus management for overlays
 * - Ensure tooltips don't block interactive elements
 */
export const zIndexUsage = {
  default: 'base',           // 0 - Normal content
  menu: 'dropdown',          // 1000 - Menus, dropdowns
  stickyHeader: 'sticky',    // 1010 - Sticky elements
  fixedNav: 'fixed',         // 1020 - Fixed navigation
  modalBackdrop: 'overlay',  // 1030 - Modal backdrop
  modalContent: 'modal',     // 1040 - Modal content
  contextMenu: 'popover',    // 1050 - Context menus
  tooltip: 'tooltip',        // 1060 - Tooltips
  notification: 'toast',     // 1070 - Toasts, alerts
} as const;

// ============================================================================
// Z-INDEX METADATA
// ============================================================================

/**
 * Z-index metadata for documentation and tooling
 */
export const zIndexInfo = {
  base: {
    label: 'Base',
    value: 0,
    description: 'Normal document flow',
    useCases: ['Most content', 'No explicit stacking needed'],
  },
  dropdown: {
    label: 'Dropdown',
    value: 1000,
    description: 'First elevated layer',
    useCases: ['Select dropdowns', 'Basic menus', 'Combobox options'],
  },
  sticky: {
    label: 'Sticky',
    value: 1010,
    description: 'Sticky positioned elements',
    useCases: ['Sticky headers', 'Sticky table headers', 'FABs'],
  },
  fixed: {
    label: 'Fixed',
    value: 1020,
    description: 'Fixed positioned elements',
    useCases: ['Fixed navigation', 'Fixed sidebars', 'Persistent UI'],
  },
  overlay: {
    label: 'Overlay',
    value: 1030,
    description: 'Modal backdrop layer',
    useCases: ['Modal backdrops', 'Drawer overlays', 'Dimmed backgrounds'],
  },
  modal: {
    label: 'Modal',
    value: 1040,
    description: 'Modal content layer',
    useCases: ['Modal dialogs', 'Sheets', 'Bottom sheets', 'Major overlays'],
  },
  popover: {
    label: 'Popover',
    value: 1050,
    description: 'Contextual UI over modals',
    useCases: ['Context menus over modals', 'Popovers inside dialogs'],
  },
  tooltip: {
    label: 'Tooltip',
    value: 1060,
    description: 'Tooltip layer (above everything except toasts)',
    useCases: ['Tooltips', 'Help text', 'Assistive overlays'],
  },
  toast: {
    label: 'Toast',
    value: 1070,
    description: 'Highest layer for notifications',
    useCases: ['Toast notifications', 'Alerts', 'Snackbars', 'System messages'],
  },
} as const;

// ============================================================================
// COMMON PATTERNS
// ============================================================================

/**
 * Common z-index patterns for typical use cases
 */
export const zIndexPatterns = {
  // Navigation
  navigation: {
    header: zIndex.fixed,           // 1020 - Fixed header
    sidebar: zIndex.fixed,          // 1020 - Fixed sidebar
    dropdown: zIndex.dropdown,      // 1000 - Nav dropdowns
  },

  // Overlays
  overlay: {
    backdrop: zIndex.overlay,       // 1030 - Modal backdrop
    modal: zIndex.modal,            // 1040 - Modal content
    drawer: zIndex.modal,           // 1040 - Drawer content
  },

  // Interactive
  interactive: {
    dropdown: zIndex.dropdown,      // 1000 - Dropdown menus
    contextMenu: zIndex.popover,    // 1050 - Context menus
    tooltip: zIndex.tooltip,        // 1060 - Tooltips
  },

  // Notifications
  notifications: {
    toast: zIndex.toast,            // 1070 - Toast notifications
    alert: zIndex.toast,            // 1070 - Alert banners
  },
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * All z-index tokens grouped
 */
export const zIndexTokens = {
  zIndex,
  zIndexUsage,
  zIndexInfo,
  zIndexPatterns,
} as const;
