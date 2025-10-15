# Foundation Tokens

**Status:** ✅ Complete
**Last Updated:** 2025-10-08
**Version:** 1.0.0

## Overview

Foundation tokens represent the final layer of our design system's foundation. While our previous systems (color, typography, spacing, layout) define what elements look like and where they sit, foundation tokens define **how elements behave** — their depth, shape, motion, stacking order, and transparency.

These tokens complete the vocabulary needed to build our atomic component library.

### The Five Pillars

1. **Shadows** - Communicates elevation and hierarchy through depth
2. **Border Radius** - Defines shape language and brand personality
3. **Transitions** - Controls motion and interaction feedback
4. **Z-Index** - Manages stacking order systematically
5. **Opacity** - Controls transparency while maintaining accessibility

---

## Design Philosophy

### Material Design 3 Influence

Our shadow system is inspired by Material Design 3's elevation tokens, which moved away from arbitrary shadow values to a systematic 5-level hierarchy. This approach:

- **Reduces cognitive load** - Designers choose from 5 levels, not infinite variations
- **Creates consistency** - Same elevation = same shadow across the entire system
- **Simplifies implementation** - Components inherit semantic elevation levels

### 8-Point Grid Alignment

Border radius values align to our 8-point grid system (4px, 8px, 16px, 24px), ensuring visual harmony with spacing and layout. The exception is our `xs` (2px) and `full` (9999px) tokens, which serve specific use cases outside the grid.

### Accessibility-First Motion

Our transition system includes built-in `prefers-reduced-motion` support. Users with vestibular disorders or motion sensitivity automatically receive instant state changes instead of animated transitions.

**This is not optional** — it's a core accessibility requirement.

---

## 1. Shadow System

### Research Summary

**Challenge:** Most design systems use arbitrary shadow values that don't communicate purpose. A "medium" shadow in one context might be too subtle or too heavy in another.

**Solution:** Material Design 3's elevation model treats shadows as **communicating hierarchy**, not decoration. We adopted their 5-level system:

- **Level 0 (none)** - Flat, no elevation
- **Level 1 (sm)** - Raised, subtle depth
- **Level 2 (md)** - Lifted, standard cards
- **Level 3 (lg)** - Floating, dropdowns
- **Level 4 (xl)** - Modal, dialogs
- **Level 5 (2xl)** - Maximum, tooltips over modals

### Design Decisions

#### Shadow Colors
We use `neutral-900` (#2E2D2A) at varying opacities instead of pure black. This maintains our warm color palette and prevents harsh, cold shadows on our warm neutral backgrounds.

#### Layered Shadows
Each level combines two shadow layers:
1. **Close shadow** - Small offset, tighter blur (definition)
2. **Ambient shadow** - Larger offset, wider blur (depth)

This dual-layer approach creates more realistic depth perception than single shadows.

### Token Reference

```typescript
shadows: {
  none: 'none',                    // Level 0: Flat
  sm: '0 1px 2px 0 ...',          // Level 1: Raised
  md: '0 2px 4px -1px ...',       // Level 2: Lifted
  lg: '0 4px 6px -2px ...',       // Level 3: Floating
  xl: '0 10px 25px -5px ...',     // Level 4: Modal
  '2xl': '0 25px 50px -12px ...'  // Level 5: Maximum
}
```

### Usage Guidelines

| Token | Use Case                    | Examples                              |
|-------|-----------------------------|---------------------------------------|
| none  | Flat surfaces, backgrounds  | Page background, section containers   |
| sm    | Subtle depth, resting state | Buttons, input fields, simple cards   |
| md    | Standard elevation          | Navigation, content cards, panels     |
| lg    | Floating elements           | Dropdown menus, popovers, date pickers|
| xl    | Prominent dialogs           | Modals, drawers, full-screen overlays |
| 2xl   | Maximum hierarchy           | Tooltips over modals, critical alerts |

### Common Patterns

**Progressive Elevation on Interaction:**
```tsx
<Card className="shadow-sm hover:shadow-md transition-shadow">
  {/* Card elevates on hover */}
</Card>
```

**Context-Aware Shadows:**
- Use `md` for cards on neutral-50 backgrounds
- Use `lg` for dropdowns over content
- Use `xl` for modals with overlays

---

## 2. Border Radius System

### Research Summary

**Challenge:** Border radius communicates brand personality more than developers realize. Too sharp feels technical and cold. Too round feels playful or childish.

**Insight from Research:**
- 2-4px (subtle) = Professional, technical, corporate
- 8-12px (moderate) = Friendly, approachable, warm
- 16-24px (heavy) = Playful, creative, bold
- Full rounds = Pills, avatars, badges

We chose **8px as our base** to communicate **professional warmth** — approachable without sacrificing credibility.

### Design Decisions

#### Nested Container Math

When a rounded container holds rounded children, inner radius should be `outer radius - padding`:

```typescript
// Outer container: 16px radius, 12px padding
// Inner element: 16px - 12px = 4px radius
```

Our `getNestedRadius()` helper calculates this automatically.

#### Alignment with 8-Point Grid

Most radius values align to our spacing scale:
- `sm` (4px) = spacing-1
- `md` (8px) = spacing-2 ← Base unit
- `lg` (12px) = spacing-3
- `xl` (16px) = spacing-4
- `2xl` (24px) = spacing-6

### Token Reference

```typescript
radii: {
  none: '0px',      // Sharp edges, technical UI
  xs: '2px',        // Minimal softness, tags
  sm: '4px',        // Buttons, inputs, chips
  md: '8px',        // Cards, panels (default)
  lg: '12px',       // Prominent cards
  xl: '16px',       // Hero cards, modals
  '2xl': '24px',    // Decorative, feature sections
  full: '9999px'    // Pills, avatars, circular
}
```

### Usage Guidelines

| Token | Use Case            | Examples                                 |
|-------|---------------------|------------------------------------------|
| none  | Technical precision | Tables, code blocks, data visualizations |
| xs    | Subtle softness     | Tags, badges, pills (non-circular)       |
| sm    | Compact interactive | Buttons, inputs, form controls           |
| md    | Default             | Cards, panels, containers                |
| lg    | Featured content    | Hero cards, section highlights           |
| xl    | Prominent dialogs   | Modals, drawers, large cards             |
| 2xl   | Decorative elements | Image containers, creative sections      |
| full  | Circular elements   | Avatars, icon buttons, status dots       |

### Common Patterns

**Default Everything to md:**
Unless you have a specific reason, use `rounded-md` (8px). This creates consistency and reduces decision fatigue.

**Nested Containers:**
```tsx
<Card className="rounded-xl p-6">
  {/* Outer: 16px radius, 24px padding */}
  <div className="rounded-sm">
    {/* Inner: 4px radius (16 - 12 ≈ 4) */}
  </div>
</Card>
```

---

## 3. Transition System

### Research Summary

**Challenge:** Transitions improve perceived performance and provide feedback, but poorly implemented motion causes accessibility issues and performance problems.

**Nielsen Norman Group Guidelines:**
- 100ms - Perceived as instant
- 100-300ms - Slight delay, acceptable
- 300-1000ms - Noticeable delay
- 1000ms+ - User attention wanders

We capped our longest transition at **500ms** to stay within acceptable ranges.

### Design Decisions

#### Three Duration Levels

- **Fast (150ms)** - Micro-interactions (hover, focus, color changes)
- **Base (300ms)** - Standard UI changes (dropdowns, tooltips)
- **Slow (500ms)** - Complex transitions (modals, page changes)

#### Custom Easing Curves

CSS defaults (`ease`, `ease-in-out`) are too generic. We use custom cubic-bezier curves:

- **Ease Out** - `cubic-bezier(0.33, 1, 0.68, 1)` - Elements decelerate into view (entrances)
- **Ease In** - `cubic-bezier(0.32, 0, 0.67, 0)` - Elements accelerate away (exits)
- **Ease In-Out** - `cubic-bezier(0.65, 0, 0.35, 1)` - Reversible animations

#### Accessibility: prefers-reduced-motion

Our `getTransition()` helper automatically disables transitions for users who request reduced motion:

```typescript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  return 'none';
}
```

This is **mandatory for WCAG 2.1 compliance**.

### Token Reference

```typescript
// Durations
duration: {
  fast: '150ms',    // Micro-interactions
  base: '300ms',    // Standard transitions
  slow: '500ms'     // Complex animations
}

// Easing
easing: {
  out: 'cubic-bezier(0.33, 1, 0.68, 1)',      // Entrances
  in: 'cubic-bezier(0.32, 0, 0.67, 0)',       // Exits
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)'     // Bidirectional
}

// Semantic Transitions
transitions: {
  interactive: 'all 150ms ease-out',           // Hover, focus
  dropdown: 'all 300ms ease-out',              // Menus, tooltips
  modal: 'all 500ms ease-in-out',              // Dialogs, drawers
  color: 'color 150ms ease-out, background...' // Color-only (performance)
}
```

### Usage Guidelines

| Token       | Use Case                          | Duration | Easing     |
|-------------|-----------------------------------|----------|------------|
| interactive | Buttons, links, hover states      | 150ms    | ease-out   |
| dropdown    | Dropdowns, tooltips, popovers     | 300ms    | ease-out   |
| modal       | Modals, drawers, page transitions | 500ms    | ease-in-out|
| color       | Color changes only (optimized)    | 150ms    | ease-out   |

### Common Patterns

**Always Use the Helper:**
```typescript
import { getTransition } from '@/lib/design-tokens';

<div style={{ transition: getTransition('interactive') }}>
  {/* Respects prefers-reduced-motion automatically */}
</div>
```

**Performance Optimization:**
Transition only necessary properties, not `all`:
```css
/* ❌ Bad - Triggers unnecessary repaints */
transition: all 300ms;

/* ✅ Good - Only transitions what changes */
transition: background-color 300ms, box-shadow 300ms;
```

---

## 4. Z-Index System

### Research Summary

**The Z-Index Problem:**
Without a system, developers use arbitrary values (`z-index: 999`, `z-index: 9999`), leading to stacking conflicts when components from different parts of the codebase overlap.

**Industry Standard:** Josh Comeau and other CSS experts recommend:
1. Use a systematic scale with large gaps (1000-unit increments)
2. Never use raw numbers — only named tokens
3. Minimize z-index usage — prefer flexbox/grid order when possible

### Design Decisions

#### 1000-Unit Gaps

Each layer is separated by 1000 units, allowing room for edge cases:

```typescript
dropdown: 1000,
sticky: 1010,
fixed: 1020,
overlay: 1030,
modal: 1040,
popover: 1050,
tooltip: 1060,
toast: 1070
```

If you need a dropdown slightly above others, you can use `1001` without breaking the system.

#### Semantic Naming

Tokens describe purpose, not magnitude:
- ❌ `z-100`, `z-200`, `z-300` (meaningless numbers)
- ✅ `z-dropdown`, `z-modal`, `z-tooltip` (clear intent)

### Token Reference

```typescript
zIndex: {
  base: 0,          // Default document flow
  dropdown: 1000,   // Dropdown menus, selects
  sticky: 1010,     // Sticky headers, FABs
  fixed: 1020,      // Fixed navigation, sidebars
  overlay: 1030,    // Modal backdrops
  modal: 1040,      // Dialogs, sheets
  popover: 1050,    // Context menus over modals
  tooltip: 1060,    // Tooltips (always on top)
  toast: 1070       // Notifications, alerts
}
```

### Usage Guidelines

| Token    | Use Case                                | Z-Index Value |
|----------|-----------------------------------------|---------------|
| base     | Normal document flow                    | 0             |
| dropdown | Select menus, autocomplete              | 1000          |
| sticky   | Sticky table headers, floating buttons  | 1010          |
| fixed    | Fixed navigation bars                   | 1020          |
| overlay  | Modal/drawer backdrops                  | 1030          |
| modal    | Modal dialogs, drawers                  | 1040          |
| popover  | Context menus appearing over modals     | 1050          |
| tooltip  | Tooltips (must appear above everything) | 1060          |
| toast    | Toast notifications, alerts             | 1070          |

### Common Patterns

**Never Use Raw Numbers:**
```tsx
// ❌ Bad
<div className="z-[100]">

// ✅ Good
<div className="z-dropdown">
```

**Modal with Overlay:**
```tsx
<>
  <div className="z-overlay" /> {/* 1030 */}
  <div className="z-modal">     {/* 1040 - appears above overlay */}
    <Tooltip className="z-tooltip" /> {/* 1060 - appears above modal */}
  </div>
</>
```

---

## 5. Opacity System

### Research Summary

**Accessibility Challenge:** Reducing opacity affects text contrast. A perfectly accessible color at full opacity can fail WCAG AA when transparency is applied.

**WCAG Requirement:** Text must maintain 4.5:1 contrast ratio (AA) or 3:1 (large text).

### Design Decisions

#### 50% Minimum for Disabled States

Research shows `opacity: 0.5` is the minimum for users to recognize disabled states. Below 50%, elements become too faint.

#### Text Safety Helpers

We provide `isTextSafe()` and `getOpacityWithWarning()` utilities to prevent accidental contrast violations during development.

### Token Reference

```typescript
opacity: {
  full: '1',        // 100% - Default
  high: '0.9',      // 90% - Glassmorphism, slight transparency
  medium: '0.75',   // 75% - Secondary content
  low: '0.6',       // 60% - Tertiary elements
  disabled: '0.5',  // 50% - Disabled states (WCAG minimum)
  subtle: '0.25',   // 25% - Hover overlays, dividers
  faint: '0.1',     // 10% - Very subtle backgrounds
  invisible: '0'    // 0% - Hidden (but in DOM)
}
```

### Usage Guidelines

| Token     | Use Case                      | Opacity | Accessibility             |
|-----------|-------------------------------|---------|---------------------------|
| full      | Normal content                | 100%    | ✅ Always safe            |
| high      | Glassmorphism, translucent UI | 90%     | ⚠️ Test text contrast     |
| medium    | Secondary text, muted content | 75%     | ⚠️ Test text contrast     |
| low       | Tertiary text, placeholders   | 60%     | ⚠️ Test text contrast     |
| disabled  | Disabled buttons, inputs      | 50%     | ⚠️ Disabled states exempt |
| subtle    | Hover overlays, dividers      | 25%     | ✅ Safe (no text)         |
| faint     | Very subtle backgrounds       | 10%     | ✅ Safe (no text)         |
| invisible | Hidden but present            | 0%      | ✅ Safe (no text)         |

### Common Patterns

**Disabled States (Safe):**
```tsx
<Button disabled className="opacity-disabled">
  {/* 50% opacity - WCAG exempts disabled states */}
</Button>
```

**Hover Overlays (Safe):**
```tsx
<div className="relative">
  <div className="absolute inset-0 bg-terracotta-600 opacity-subtle hover:opacity-medium transition-opacity">
    {/* 25% → 75% opacity on decorative overlay, no text */}
  </div>
</div>
```

**Text with Opacity (⚠️ Requires Testing):**
```tsx
// ⚠️ WARNING: May fail WCAG contrast requirements
<p className="text-neutral-700 opacity-medium">
  {/* Must verify: neutral-700 at 75% opacity still achieves 4.5:1 */}
</p>

// ✅ Better: Use a lighter color token instead
<p className="text-neutral-500">
  {/* Pre-calculated to meet contrast at 100% opacity */}
</p>
```

---

## Integration with Existing Systems

### Color System

Shadows use `neutral-900` (#2E2D2A) to maintain warm tonality. All shadow opacities tested against our neutral palette backgrounds.

### Typography System

Opacity tokens include warnings for text usage. When possible, use lighter color tokens instead of reducing opacity.

### Spacing System

Border radius aligns to 8-point grid (`sm`=4px, `md`=8px, `lg`=12px, `xl`=16px, `2xl`=24px).

### Layout System

Z-index tokens account for layout components (sticky headers=1010, fixed nav=1020).

---

## Implementation Details

### File Structure

```
lib/design-tokens/
├── shadows.ts      # Shadow elevation system
├── radii.ts        # Border radius scale + helpers
├── transitions.ts  # Duration, easing, motion-safe support
├── z-index.ts      # Stacking order scale
├── opacity.ts      # Opacity levels + safety helpers
└── index.ts        # Exports all tokens
```

### Tailwind CSS v4 Configuration

All tokens mapped in `app/globals.css` under `@theme`:

```css
@theme inline {
  --shadow-sm: 0 1px 2px 0 rgba(46, 45, 42, 0.05);
  --radius-md: 8px;
  --duration-base: 300ms;
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --z-modal: 1040;
  --opacity-disabled: 0.5;
}
```

### TypeScript Types

Every token file exports types for autocomplete:

```typescript
import type { Shadow, Radius, Transition, ZIndex, Opacity } from '@/lib/design-tokens';
```

---

## Testing & Validation

### Shadow Testing

- ✅ Test all 5 levels on neutral-50 background
- ✅ Test all 5 levels on white background
- ✅ Verify layered shadows create realistic depth
- ✅ Confirm warm tonality (no cold black shadows)

### Border Radius Testing

- ✅ Verify alignment with 8-point grid
- ✅ Test nested container calculations
- ✅ Confirm md (8px) feels appropriately warm

### Transition Testing

- ✅ Verify `getTransition()` respects `prefers-reduced-motion`
- ✅ Test all three durations feel natural
- ✅ Confirm custom easing curves improve perceived performance

### Z-Index Testing

- ✅ Test stacking order: dropdown < modal < tooltip
- ✅ Verify no conflicts when multiple modals/tooltips present
- ✅ Confirm 1000-unit gaps prevent edge case collisions

### Opacity Testing

- ✅ Verify disabled state (50%) recognizable
- ✅ Test opacity + text contrast combinations
- ✅ Confirm `isTextSafe()` helper catches violations

---

## Next Steps

With all foundation tokens complete, we're ready to build components:

1. **Atomic Components (Week 9-10)**
   - Atoms: Button, Input, Badge, Avatar, Icon
   - Design tokens applied consistently
2. **Molecular Components (Week 10-11)**
   - Card, Form Field, Navigation Item
   - Combine atomic components
3. **Organism Components (Week 11-12)**
   - Header, Footer, Hero Section
   - Complete page sections
4. **Aceternity UI Integration**
   - Apply our design tokens to Aceternity components
   - Maintain consistency with custom system

---

## Resources

- [Material Design 3 - Elevation](https://m3.material.io/styles/elevation/overview)
- [Josh Comeau - Z-Index](https://www.joshwcomeau.com/css/z-index/)
- [Nielsen Norman - Animation Duration](https://www.nngroup.com/articles/animation-duration/)
- [MDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WCAG 2.1 - Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## Design System Status

**Foundation Complete** ✅
**Ready for Component Development** 🚀
