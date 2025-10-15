# Component Development Guide - Grant Finder

> **Quick reference for creating new components that properly use the design system**

---

## TL;DR - Quick Checklist

When creating a new component, always:

- [ ] Use **semantic color tokens** (`primary`, `accent`, `muted`) not primitive scales
- [ ] Use **typography tokens** (`font-display`, `font-body`) not hardcoded fonts
- [ ] Use **spacing tokens** (`space-4`, `space-6`) aligned to 8-point grid
- [ ] Use **class-variance-authority** (CVA) for variants
- [ ] Include both component + `.stories.tsx` file
- [ ] Use `cn()` utility for className merging
- [ ] Make it accessible (ARIA labels, keyboard navigation)

---

## Color Usage

### ✅ DO: Use Semantic Tokens

```tsx
// Good - Uses semantic tokens that adapt to theme
<button className="bg-primary hover:bg-primary-hover text-primary-foreground">
  Click me
</button>

<div className="border border-border bg-muted text-muted-foreground">
  Secondary content
</div>
```

### ❌ DON'T: Use Primitive Scales Directly

```tsx
// Bad - Hardcodes specific color values
<button className="bg-blue-600 hover:bg-blue-700 text-white">
  Click me
</button>
```

### Available Semantic Tokens:

**Interactive Elements:**
- `bg-primary` / `text-primary` - Main brand actions (blue)
- `hover:bg-primary-hover` - Primary hover states
- `text-primary-foreground` - Text on primary backgrounds
- `bg-accent` / `text-accent` - Secondary actions (gold)
- `text-accent-foreground` - Text on accent backgrounds

**Backgrounds:**
- `bg-background` - Page background (white)
- `bg-background-elevated` - Cards/modals (light gray)
- `bg-muted` - Subtle backgrounds (soft gray)

**Text:**
- `text-foreground` - Primary text (charcoal)
- `text-muted-foreground` - Secondary text (gray-500)

**Borders:**
- `border-border` - Standard borders (gray-200)

**States:**
- `text-success` / `bg-success` - Success states (green)
- `text-warning` / `bg-warning` - Warning states (gold)
- `text-error` / `bg-error` - Error states (red)
- `text-link` - Links (blue)

**When to use primitives:** Only use `blue-50`, `gold-100`, etc. for custom one-off designs that don't fit semantic patterns.

---

## Typography

### ✅ DO: Use Font Variables

```tsx
// Good - Uses design system fonts
<h1 className="font-display text-4xl font-bold">
  Hero Title
</h1>

<p className="font-body text-base">
  Body content
</p>
```

### Font Usage Rules:

**Plus Jakarta Sans (Display Font):**
- **32px+:** Headings, hero text, major sections
- Classes: `font-display`
- Use with: `text-4xl`, `text-3xl`, `text-2xl`

**Inter (Body Font):**
- **24px and below:** Body text, UI elements, smaller headings
- Classes: `font-body` or `font-sans`
- Use with: `text-xl`, `text-lg`, `text-base`, `text-sm`, `text-xs`

**JetBrains Mono (Code Font):**
- Code blocks, technical content only
- Classes: `font-mono`

### Type Scale Reference:

```tsx
// Display sizes (Plus Jakarta Sans)
text-6xl  // 80px - Hero displays
text-5xl  // 64px - Large displays
text-4xl  // 48px - Display headings

// Heading sizes
text-3xl  // 40px - Major headings (Plus Jakarta Sans)
text-2xl  // 32px - Section headings (Plus Jakarta Sans)
text-xl   // 24px - Subsection headings (Inter)

// Body sizes (Inter)
text-lg   // 20px - Large body
text-base // 16px - Standard body
text-sm   // 14px - Small text, labels
text-xs   // 12px - Captions, metadata
```

### Font Weights:

```tsx
font-regular   // 400 - Body text
font-medium    // 500 - Emphasized text, buttons
font-semibold  // 600 - Headings
font-bold      // 700 - Display headings, major emphasis
```

---

## Spacing (8-Point Grid)

### ✅ DO: Use Spacing Tokens

```tsx
// Good - Uses 8-point grid spacing
<div className="p-6 mb-4 gap-8">
  <div className="mt-12 space-y-6">
    Content
  </div>
</div>
```

### Available Spacing Scale:

```
space-0  // 0px
space-1  // 4px   - Tight inline elements
space-2  // 8px   - Icon gaps, tight spacing
space-3  // 12px  - Compact elements
space-4  // 16px  - Standard spacing (default)
space-5  // 20px  - Comfortable spacing
space-6  // 24px  - Section spacing
space-8  // 32px  - Large section spacing
space-10 // 40px  - Extra large spacing
space-12 // 48px  - Major section breaks
space-16 // 64px  - Hero/featured sections
space-20 // 80px  - Page sections
space-24 // 96px  - Major page divisions
space-32 // 128px - Maximum spacing
```

### Spacing Guidelines:

- **Components:** Use `space-4` (16px) as default padding
- **Sections:** Use `space-8` to `space-12` (32-48px) for vertical spacing
- **Icons + Text:** Use `space-2` (8px) gap
- **Form fields:** Use `space-6` (24px) vertical spacing
- **Cards:** Use `space-6` (24px) internal padding

---

## Component Variants with CVA

Use `class-variance-authority` for consistent variant patterns:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const componentVariants = cva(
  // Base styles - always applied
  "inline-flex items-center gap-2 font-body font-medium rounded-md transition-colors duration-300",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-accent text-accent-foreground hover:bg-accent/90",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        outline: "border-2 border-border bg-transparent hover:bg-muted",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

export const Component = ({
  className,
  variant,
  size,
  ...props
}: ComponentProps) => {
  return (
    <div
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  );
};
```

---

## Component Structure Template

```tsx
/**
 * ComponentName Component
 *
 * Brief description of what this component does and when to use it.
 * Design system colors: primary (blue), accent (gold), semantic tokens.
 * Spacing: 8-point grid aligned.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 1. Define variants with CVA
const componentVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "default-styles",
        // other variants
      },
      size: {
        sm: "small-styles",
        md: "medium-styles",
        lg: "large-styles",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// 2. Define TypeScript interface
export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Add component-specific props
  label?: string;
  icon?: React.ReactNode;
}

// 3. Export component
export const ComponentName = ({
  className,
  variant,
  size,
  label,
  icon,
  children,
  ...props
}: ComponentNameProps) => {
  return (
    <div
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label && <span>{label}</span>}
      {children}
    </div>
  );
};

ComponentName.displayName = "ComponentName";
```

---

## Storybook Story Template

Create a `.stories.tsx` file alongside your component:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/Atoms/ComponentName', // or Molecules/Organisms
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Brief description of the component and its use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    label: 'Default Component',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Variant',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ComponentName size="sm" label="Small" />
      <ComponentName size="md" label="Medium" />
      <ComponentName size="lg" label="Large" />
    </div>
  ),
};
```

---

## Accessibility Checklist

When creating components, ensure:

- [ ] **Keyboard navigation** works (Tab, Enter, Escape)
- [ ] **Focus states** are visible (`focus-visible:ring-2 ring-primary`)
- [ ] **ARIA labels** for icon-only buttons (`aria-label="Close"`)
- [ ] **Semantic HTML** (use `<button>` not `<div onClick>`)
- [ ] **Color contrast** meets WCAG AA (4.5:1 for text)
- [ ] **Screen reader** support (`aria-hidden` for decorative icons)
- [ ] **Disabled states** are clear (`disabled:opacity-50 disabled:cursor-not-allowed`)

Example:

```tsx
<button
  className={cn(buttonVariants({ variant, size }))}
  disabled={isDisabled}
  aria-busy={loading}
  aria-label={ariaLabel}
>
  {icon && <span aria-hidden="true">{icon}</span>}
  {children}
</button>
```

---

## Common Patterns

### Loading States

```tsx
{loading ? (
  <div className="flex items-center gap-2">
    <svg className="animate-spin h-5 w-5" aria-hidden="true">
      {/* spinner SVG */}
    </svg>
    <span>Loading...</span>
  </div>
) : (
  content
)}
```

### Conditional Styling

```tsx
<div
  className={cn(
    "base-classes",
    isActive && "bg-primary text-primary-foreground",
    isDisabled && "opacity-50 cursor-not-allowed",
    className
  )}
>
```

### Icon + Text Alignment

```tsx
<div className="inline-flex items-center gap-2">
  <IconComponent className="h-5 w-5" aria-hidden="true" />
  <span>Text label</span>
</div>
```

---

## Design Token Quick Reference

### Import Tokens (TypeScript)

```tsx
import { colors } from '@/lib/design-tokens/colors';
import { typography } from '@/lib/design-tokens/typography';
import { spacing } from '@/lib/design-tokens/spacing';

// Use in JS logic
const primaryColor = colors.lightMode.primary; // #2563EB
const headingFont = typography.fontFamily.display; // Plus Jakarta Sans
```

### CSS Variables

```tsx
// Directly in components
style={{
  color: 'var(--color-primary)',
  fontFamily: 'var(--font-display)',
  padding: 'var(--space-6)'
}}
```

---

## Testing Your Component

### Visual Check in Storybook:

```bash
npm run storybook
```

Navigate to your component and verify:
- All variants render correctly
- Colors match design system (blue primary, gold accent)
- Typography uses correct fonts
- Spacing feels consistent with other components
- Dark mode works (if applicable)

### Accessibility Check:

1. Tab through interactive elements
2. Check focus indicators are visible
3. Use screen reader to test labels
4. Verify color contrast in DevTools

---

## Example: Creating a New "Alert" Component

```tsx
// components/atoms/Alert.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva(
  "rounded-md border p-4 font-body text-sm", // 8-point grid: p-4 = 16px
  {
    variants: {
      variant: {
        info: "bg-primary/10 border-primary text-primary",
        success: "bg-success/10 border-success text-success",
        warning: "bg-warning/10 border-warning text-warning",
        error: "bg-error/10 border-error text-error",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
}

export const Alert = ({
  className,
  variant,
  title,
  children,
  ...props
}: AlertProps) => {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {title && (
        <h5 className="font-semibold mb-1">{title}</h5>
      )}
      <div>{children}</div>
    </div>
  );
};

Alert.displayName = "Alert";
```

---

## Quick Reference Card

**Colors:**
- Primary actions → `bg-primary`
- Secondary actions → `bg-accent`
- Backgrounds → `bg-background`, `bg-muted`
- Text → `text-foreground`, `text-muted-foreground`
- Borders → `border-border`

**Typography:**
- Display/headings 32px+ → `font-display`
- Body/UI 24px- → `font-body`
- Sizes → `text-{xs|sm|base|lg|xl|2xl|3xl|4xl}`

**Spacing:**
- Tight → `space-2` (8px)
- Default → `space-4` (16px)
- Section → `space-6` (24px)
- Large → `space-8` (32px)

**Utils:**
- Merge classes → `cn(class1, class2)`
- Variants → Use CVA
- Accessibility → Always include ARIA labels

---

## Resources

- **Color System:** `/docs/design-system/01-color-system.md`
- **Typography:** `/docs/design-system/02-typography-system.md`
- **Spacing:** `/docs/design-system/03-spacing-system.md`
- **Design Tokens:** `/lib/design-tokens/`
- **Component Examples:** Browse `/components/atoms/` and `/components/molecules/`

---

**Questions?** Check existing components in `/components/atoms/` for real-world examples.
