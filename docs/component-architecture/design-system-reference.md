# Design System Reference Card

**Quick reference for building components that embody our design system's soul**

---

## Core Philosophy

### Professional Warmth
- Not generic Tailwind blue/gray (68% of dev portfolios use this)
- **Terracotta (#B85032)** = craftsmanship, differentiation
- **Warm neutrals** (#FAF7F5, #2E2D2A) never stark white/black
- **8px radius** = "Goldilocks zone" (not sharp/cold or playful/childish)
- **Material Design 3 shadows** with warm neutral-900 (not cold black)

### Human-First Philosophy
- Accessible doesn't mean sterile
- Intentional craft in every detail
- Custom easing curves (`cubic-bezier(0.33, 1, 0.68, 1)`)
- `prefers-reduced-motion` is **mandatory**
- WCAG 2.2 AA minimum (AAA where possible)

---

## Color Usage

### When to Use Each Color

**Terracotta (Primary)**
- Primary CTAs and action buttons
- Active states and selections
- Important highlights and badges
- Use cases: "Get Started", "Submit", "Active Tab"
- Psychology: Craftsmanship, warmth, action

**Sage (Secondary)**
- Success states and confirmations
- Secondary actions and supportive CTAs
- Growth/completion indicators
- Use cases: "Learn More", "Success Message", "Completed"
- Psychology: Balance, growth, harmony

**Neutral (Foundation)**
- Text hierarchy: 900 (primary), 700 (secondary), 500 (tertiary)
- Backgrounds: 50 (default), 100 (subtle), white (contrast)
- Borders: 200 (subtle), 300 (visible)
- **Never use neutral-950 or neutral-1000** (too cold/harsh)

### Accessibility-First
- All colors pre-calculated for WCAG compliance
- No exceptions, no asterisks
- Terracotta-600 on white = 4.66:1 (AA compliant)
- Sage-600 on white = 4.51:1 (AA compliant)

### Shadow Colors
```tsx
// ❌ Never use cold black
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

// ✅ Always use warm neutral-900
box-shadow: 0 4px 6px rgba(46, 45, 42, 0.1)
```

---

## Typography Usage

### Font Pairing Logic

**Fraunces (Display) - Use When:**
- 24px and above (optimal readability threshold)
- Hero headings, page titles
- Anywhere you want warmth and personality
- Display moments where craft matters

**Inter (Body) - Use When:**
- 20px and below (optimal for scanning)
- Body text, paragraphs
- UI elements (buttons, inputs, labels)
- Navigation, menus, forms

**JetBrains Mono (Code) - Use When:**
- Code snippets and blocks
- Technical content
- Pre-formatted text

### Common Patterns

```tsx
// Hero Section
<h1 className="font-fraunces text-5xl font-bold leading-tight tracking-tight">
  {/* 64px, Fraunces, -0.02em spacing */}
  Display Heading
</h1>
<p className="font-inter text-lg leading-relaxed">
  {/* 20px, Inter, 1.6 line height */}
  Subtitle or description
</p>

// Page Section
<h2 className="font-fraunces text-3xl font-semibold leading-snug tracking-tight">
  {/* 40px, Fraunces, -0.01em spacing */}
  Section Title
</h2>
<p className="font-inter text-base leading-normal">
  {/* 16px, Inter, 1.5 line height (WCAG) */}
  Body content
</p>

// Card Component
<h3 className="font-inter text-xl font-semibold leading-snug">
  {/* 24px, Inter (not Fraunces - too small) */}
  Card Title
</h3>
<p className="font-inter text-sm leading-relaxed">
  {/* 14px, Inter, slightly looser spacing */}
  Card description
</p>

// Button / UI Element
<button className="font-inter text-base font-medium tracking-wide">
  {/* 16px, Inter medium, +0.01em for UI */}
  Get Started
</button>
```

### 8-Point Grid Alignment
Every font size is a multiple of 4px:
- xs: 12px, sm: 14px, base: 16px, lg: 20px
- xl: 24px, 2xl: 32px, 3xl: 40px, 4xl: 48px, 5xl: 64px, 6xl: 80px

Every line height rounds to 4px grid while maintaining WCAG 1.5 minimum.

---

## Spacing & Layout

### 8-Point Grid System
All spacing uses multiples of 4px or 8px:
```tsx
// Base units (8px increments)
spacing-1  = 4px   (0.25rem)
spacing-2  = 8px   (0.5rem)  ← Base unit
spacing-3  = 12px  (0.75rem)
spacing-4  = 16px  (1rem)
spacing-6  = 24px  (1.5rem)
spacing-8  = 32px  (2rem)
spacing-12 = 48px  (3rem)
spacing-16 = 64px  (4rem)
spacing-24 = 96px  (6rem)
spacing-32 = 128px (8rem)
```

### Common Patterns
```tsx
// Button padding (8-point aligned)
className="px-4 py-2.5" // 16px × 10px (10px = 2.5 × 4)

// Card padding
className="p-6" // 24px all sides

// Section spacing
className="space-y-8" // 32px between elements

// Container margins
className="mx-auto max-w-7xl px-6 py-12" // 24px horizontal, 48px vertical
```

---

## Shadows & Elevation

### 5-Level Material Design 3 System

```tsx
// Level 0: Flat (no elevation)
className="shadow-none"

// Level 1: Raised (subtle depth)
className="shadow-sm"
// Use: Buttons, inputs, simple cards

// Level 2: Lifted (standard elevation)
className="shadow-md"
// Use: Navigation, content cards, panels

// Level 3: Floating (prominent)
className="shadow-lg"
// Use: Dropdown menus, popovers, date pickers

// Level 4: Modal (dialogs)
className="shadow-xl"
// Use: Modals, drawers, full-screen overlays

// Level 5: Maximum (critical)
className="shadow-2xl"
// Use: Tooltips over modals, critical alerts
```

### Progressive Elevation Pattern
```tsx
<Card className="shadow-sm hover:shadow-md transition-shadow">
  {/* Card elevates on interaction */}
</Card>

<Button className="shadow-sm active:shadow-none">
  {/* Button depresses on click */}
</Button>
```

---

## Border Radius (Shape Language)

### Professional Warmth = 8px Default

```tsx
// Technical precision
className="rounded-none"  // 0px - tables, code blocks

// Subtle softness
className="rounded-xs"    // 2px - tags, small badges

// Compact interactive
className="rounded-sm"    // 4px - buttons, inputs

// Default (use this unless you have a reason not to)
className="rounded-md"    // 8px - cards, panels, containers

// Featured content
className="rounded-lg"    // 12px - prominent cards

// Prominent dialogs
className="rounded-xl"    // 16px - modals, large cards

// Decorative elements
className="rounded-2xl"   // 24px - image containers

// Circular
className="rounded-full"  // 9999px - avatars, icon buttons, status dots
```

### Nested Container Math
```tsx
// Outer container: 16px radius, 24px padding
<Card className="rounded-xl p-6">
  {/* Inner element: 16px - 12px ≈ 4px */}
  <div className="rounded-sm">
    Content
  </div>
</Card>
```

---

## Transitions & Motion

### Three Duration Levels

```tsx
// Fast (150ms) - Micro-interactions
className="transition-interactive"
// Use: Hover, focus, color changes

// Base (300ms) - Standard UI
className="transition-dropdown"
// Use: Dropdowns, tooltips, popovers

// Slow (500ms) - Complex animations
className="transition-modal"
// Use: Modals, drawers, page transitions
```

### Custom Easing (Not Generic CSS)
- **Ease Out** `cubic-bezier(0.33, 1, 0.68, 1)` - Entrances (elements decelerate into view)
- **Ease In** `cubic-bezier(0.32, 0, 0.67, 0)` - Exits (elements accelerate away)
- **Ease In-Out** `cubic-bezier(0.65, 0, 0.35, 1)` - Bidirectional

### Accessibility: Motion-Safe is Mandatory
```tsx
// ✅ All transitions automatically respect prefers-reduced-motion
className="transition-interactive motion-reduce:transition-none"

// The design system handles this automatically in utility classes
```

### Performance: Transition Specific Properties
```tsx
// ❌ Bad - Triggers unnecessary repaints
className="transition-all"

// ✅ Good - Only transitions what changes
className="transition-colors"
className="transition-shadow"
className="transition-transform"
```

---

## Z-Index (Stacking Order)

### Semantic Tokens (Never Raw Numbers)

```tsx
// ❌ Never do this
className="z-[100]"

// ✅ Always use semantic tokens
className="z-base"      // 0 - Normal flow
className="z-dropdown"  // 1000 - Dropdown menus
className="z-sticky"    // 1010 - Sticky headers
className="z-fixed"     // 1020 - Fixed navigation
className="z-overlay"   // 1030 - Modal backdrops
className="z-modal"     // 1040 - Dialogs, drawers
className="z-popover"   // 1050 - Context menus over modals
className="z-tooltip"   // 1060 - Tooltips (always on top)
className="z-toast"     // 1070 - Notifications, alerts
```

### Common Pattern: Modal with Overlay
```tsx
<>
  <div className="z-overlay fixed inset-0 bg-neutral-900/50" />
  <div className="z-modal fixed ...">
    <Tooltip className="z-tooltip" />
  </div>
</>
```

---

## Opacity & Transparency

### Accessibility-Safe Levels

```tsx
className="opacity-full"      // 100% - Default
className="opacity-high"      // 90% - Glassmorphism
className="opacity-medium"    // 75% - Secondary content
className="opacity-low"       // 60% - Tertiary elements
className="opacity-disabled"  // 50% - Disabled states (WCAG minimum)
className="opacity-subtle"    // 25% - Hover overlays, dividers
className="opacity-faint"     // 10% - Very subtle backgrounds
className="opacity-invisible" // 0% - Hidden but in DOM
```

### Text + Opacity Warning
```tsx
// ⚠️ WARNING: May fail WCAG contrast
<p className="text-neutral-700 opacity-medium">
  {/* neutral-700 at 75% opacity - must verify 4.5:1 contrast */}
</p>

// ✅ Better: Use a lighter color token at 100%
<p className="text-neutral-500">
  {/* Pre-calculated to meet contrast */}
</p>
```

### Safe Use Cases
```tsx
// ✅ Disabled states (WCAG exempts these)
<Button disabled className="opacity-disabled">

// ✅ Decorative overlays (no text)
<div className="bg-terracotta-600 opacity-subtle" />

// ✅ Hover effects (progressive opacity)
<div className="opacity-0 hover:opacity-100 transition-opacity">
```

---

## Complete Button Example

### ❌ Generic Tailwind (What NOT to Build)
```tsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

### ✅ Our Design System (Embodying the Soul)
```tsx
<button className="
  bg-terracotta-600           // Craftsmanship color
  text-white
  px-4 py-2.5                 // 8-point grid (16px, 10px)
  rounded-md                  // 8px = professional warmth
  shadow-sm                   // Subtle elevation (Level 1)
  transition-interactive      // 150ms custom easing, motion-safe
  hover:bg-terracotta-700     // Darker on interaction
  hover:shadow-md             // Elevated depth (Level 2)
  focus-visible:ring-2        // Accessibility
  focus-visible:ring-terracotta-600
  focus-visible:ring-offset-2
  font-inter                  // Body font for UI
  font-medium                 // 500 weight for buttons
  text-base                   // 16px
  tracking-wide               // +0.01em for UI text
">
  Get Started
</button>
```

**What This Shows:**
- Terracotta primary action (not generic blue)
- 8-point grid alignment (py-2.5 = 10px)
- Professional warmth radius (rounded-md = 8px)
- Material Design 3 elevation (shadow-sm → shadow-md)
- Custom easing with motion safety
- Proper typography (Inter medium, +0.01em tracking)
- Full accessibility (focus rings, offset)

---

## Complete Card Example

### ✅ Design System Card
```tsx
<div className="
  bg-white                    // High contrast on neutral-50
  rounded-md                  // 8px professional warmth
  shadow-md                   // Level 2 elevation (standard cards)
  p-6                         // 24px padding (8-point grid)
  hover:shadow-lg             // Level 3 on hover (floating)
  transition-shadow           // Smooth elevation change
  border border-neutral-200   // Subtle definition
">
  <h3 className="
    font-inter                // UI heading (24px switches to Inter)
    text-xl                   // 24px
    font-semibold             // 600 weight
    leading-snug              // 1.33 line height (tight for headings)
    text-neutral-900          // Primary text color
    mb-2                      // 8px margin (8-point grid)
  ">
    Card Title
  </h3>

  <p className="
    font-inter                // Body font
    text-sm                   // 14px
    leading-relaxed           // 1.428 line height (comfortable)
    text-neutral-700          // Secondary text color
    mb-4                      // 16px margin (8-point grid)
  ">
    Card description with warm neutrals, proper spacing, and intentional typography.
  </p>

  <div className="flex gap-2"> {/* 8px gap between buttons */}
    <button className="
      bg-terracotta-600       // Primary CTA
      text-white
      px-4 py-2               // 16px × 8px (8-point grid)
      rounded-sm              // 4px for compact buttons
      font-medium             // 500 weight
      text-sm                 // 14px
      shadow-sm
      hover:bg-terracotta-700
      hover:shadow-md
      transition-interactive
    ">
      Primary Action
    </button>

    <button className="
      bg-sage-100             // Sage secondary (not gray)
      text-sage-700
      px-4 py-2
      rounded-sm
      font-medium
      text-sm
      hover:bg-sage-200
      transition-interactive
    ">
      Secondary
    </button>
  </div>
</div>
```

**What This Shows:**
- Warm neutral background (#FAF7F5 page, white card)
- Progressive elevation (md → lg on hover)
- Typography switching (Inter for 24px heading)
- Color psychology (terracotta CTA, sage secondary)
- 8-point grid throughout (padding, margins, gaps)
- Custom transitions with motion safety
- Material Design 3 shadows with warm neutral-900

---

## Accessibility Checklist

Every component MUST:
- ✅ Maintain 4.5:1 contrast for text (3:1 for large text 24px+)
- ✅ Support keyboard navigation (focus states visible)
- ✅ Respect `prefers-reduced-motion` (automatic in transitions)
- ✅ Use semantic HTML (`<button>`, `<h1>`, `<nav>`, etc.)
- ✅ Include ARIA labels when visual context is missing
- ✅ Support 200% browser zoom without breaking
- ✅ Maintain 44×44px minimum touch targets (mobile)
- ✅ Provide focus-visible indicators (not just :focus)

---

## Design System Soul Checklist

Ask yourself before shipping a component:

**Visual**
- [ ] Does it use warm neutrals (#FAF7F5, #2E2D2A) instead of stark white/black?
- [ ] Does it use terracotta/sage strategically (not generic blue/gray)?
- [ ] Does it use 8px radius for professional warmth (not 4px sharp or 16px playful)?
- [ ] Do shadows use warm neutral-900 (not cold black rgba(0,0,0,...))?

**Typography**
- [ ] Does it use Fraunces for 24px+ headings to show personality?
- [ ] Does it use Inter for body text and UI elements for clarity?
- [ ] Does it apply letter-spacing adjustments (-0.02em display, +0.01em UI)?
- [ ] Do all sizes align to 8-point grid (12, 14, 16, 20, 24, 32, 40, 48, 64, 80)?

**Interaction**
- [ ] Does it use custom easing curves (not generic CSS ease)?
- [ ] Does it respect prefers-reduced-motion?
- [ ] Does it show progressive elevation on interaction (shadow-sm → shadow-md)?
- [ ] Does it transition specific properties (not transition-all)?

**Accessibility**
- [ ] Does it maintain WCAG 2.2 AA contrast minimum?
- [ ] Does it support keyboard navigation with visible focus states?
- [ ] Does it use semantic z-index tokens (not arbitrary numbers)?
- [ ] Does it avoid text + opacity without verification?

**Philosophy**
- [ ] Does it feel warm and human (not cold and sterile)?
- [ ] Does it show intentional craft (not generic Tailwind)?
- [ ] Does it differentiate from 68% of dev portfolios (not blend in)?
- [ ] Does it communicate craftsmanship through every detail?

---

**If you can't check all boxes, the component doesn't embody our design system.**

**This is not optional. This is the standard.**
