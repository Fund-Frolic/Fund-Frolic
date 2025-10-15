/**
 * Heading Component Stories
 *
 * Demonstrates font switching: Fraunces (32px+) → Inter (24px and below).
 * Shows the design system's intentional typography hierarchy.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Heading } from './Heading';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Semantic headings with intentional font switching. Fraunces for large headings (32px+) provides warmth and personality. Inter for smaller headings (24px and below) ensures clarity and readability.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Semantic HTML tag (critical for accessibility)',
    },
    variant: {
      control: 'select',
      options: ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Visual style (independent of semantic level)',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    as: 'h2',
    variant: 'h2',
    children: 'Building a World-Class Design System',
  },
};

// Story 2: Font Switching Demonstration
export const FontSwitching: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl p-8">
      <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
        <p className="text-sm font-medium text-blue-900">
          ⚡ Font Switching Rule: Fraunces (32px+) → Inter (24px and below)
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Display (48px+) - Fraunces</p>
        <Heading as="h1" variant="display">
          Crafting Digital Experiences
        </Heading>
        <p className="text-xs text-gray-500 mt-2 font-mono">
          48px, Fraunces bold, tracking-tight, leading-[1.167]
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">H1 (40px) - Fraunces</p>
        <Heading as="h1" variant="h1">
          Featured Case Studies
        </Heading>
        <p className="text-xs text-gray-500 mt-2 font-mono">
          40px, Fraunces semibold, tracking-tight, leading-[1.2]
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">H2 (32px) - Fraunces</p>
        <Heading as="h2" variant="h2">
          Design System Architecture
        </Heading>
        <p className="text-xs text-gray-500 mt-2 font-mono">
          32px, Fraunces semibold, leading-[1.25]
        </p>
      </div>

      <div className="border-t-2 border-blue-300 pt-6">
        <p className="text-sm font-semibold text-blue-700 mb-4">
          ↓ Font Switch to Inter (Clarity for smaller text)
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">H3 (24px) - Inter ⚡</p>
        <Heading as="h3" variant="h3">
          Implementation Details
        </Heading>
        <p className="text-xs text-gray-500 mt-2 font-mono">
          24px, Inter semibold, leading-[1.333]
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">H4 (20px) - Inter</p>
        <Heading as="h4" variant="h4">
          Component Patterns
        </Heading>
        <p className="text-xs text-gray-500 mt-2 font-mono">
          20px, Inter semibold, leading-[1.6]
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">H5 (16px) - Inter</p>
        <Heading as="h5" variant="h5">
          Usage Guidelines
        </Heading>
        <p className="text-xs text-gray-500 mt-2 font-mono">
          16px, Inter semibold, leading-[1.5]
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">H6 (14px) - Inter</p>
        <Heading as="h6" variant="h6">
          Technical Notes
        </Heading>
        <p className="text-xs text-gray-500 mt-2 font-mono">
          14px, Inter semibold, leading-[1.428]
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading variants from Display (48px, Fraunces) to H6 (14px, Inter). Notice the font switch from Fraunces to Inter at 24px (H3) for improved readability at smaller sizes.',
      },
    },
  },
};

// Story 3: Semantic Hierarchy
export const SemanticHierarchy: Story = {
  render: () => (
    <div className="max-w-4xl p-8 space-y-6">
      <Heading as="h1" variant="h1">
        Portfolio Case Study
      </Heading>

      <p className="text-gray-700 leading-relaxed">
        This demonstrates proper heading hierarchy for accessibility. Screen readers use
        heading levels to navigate content structure.
      </p>

      <Heading as="h2" variant="h2">
        Project Overview
      </Heading>

      <p className="text-gray-700 leading-relaxed">
        An h2 follows h1. Never skip levels (h1 → h3 breaks accessibility).
      </p>

      <Heading as="h3" variant="h3">
        Design Process
      </Heading>

      <p className="text-gray-700 leading-relaxed">
        An h3 follows h2. Visual styling (variant prop) is independent of semantic level (as prop).
      </p>

      <Heading as="h3" variant="h3">
        Technical Implementation
      </Heading>

      <p className="text-gray-700 leading-relaxed">
        Multiple h3s at the same level are perfectly valid.
      </p>

      <Heading as="h4" variant="h4">
        Frontend Architecture
      </Heading>

      <p className="text-gray-700 leading-relaxed">
        An h4 provides further subdivision under h3.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Proper heading hierarchy: h1 → h2 → h3 → h4. Never skip levels for accessibility. The "as" prop determines semantic HTML, "variant" determines visual styling.',
      },
    },
  },
};

// Story 4: Responsive
export const Responsive: Story = {
  render: () => (
    <div className="w-full p-8 space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">
          Display Variant (Responsive: 48px → 64px)
        </p>
        <Heading as="h1" variant="display">
          This Heading Grows from Mobile to Desktop
        </Heading>
        <p className="text-sm text-gray-500 mt-2">
          Resize your browser to see smooth responsive scaling
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">
          H1 Variant (Responsive: 32px → 40px)
        </p>
        <Heading as="h2" variant="h1">
          Responsive Typography Without Jarring Jumps
        </Heading>
        <p className="text-sm text-gray-500 mt-2">
          Uses Tailwind's lg: breakpoint for smooth scaling
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">
          H3 Variant (Responsive: 24px → 32px) - Inter font
        </p>
        <Heading as="h3" variant="h3">
          Font Switches to Inter at This Size
        </Heading>
        <p className="text-sm text-gray-500 mt-2">
          Notice the font change from Fraunces to Inter for clarity
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Display and H1 variants are responsive using Tailwind breakpoints. Resize browser to see smooth scaling. Notice H3 uses Inter font (not Fraunces) per design system font switching rules.',
      },
    },
  },
};

// Story 5: On Warm Background
export const OnWarmBackground: Story = {
  render: () => (
    <div className="bg-gray-50 p-12 space-y-8">
      <div>
        <Heading as="h1" variant="display">
          Professional Warmth in Every Detail
        </Heading>
        <p className="text-gray-700 leading-relaxed mt-4 text-lg">
          Fraunces on warm gray-50 background (#FAF7F5) showcases the design system's
          philosophy: accessible doesn't mean sterile. Notice how gray-900 text (#2E2D2A)
          feels warm and inviting, not cold black.
        </p>
      </div>

      <div>
        <Heading as="h2" variant="h2">
          Featured Case Studies
        </Heading>
        <p className="text-gray-700 leading-relaxed mt-4">
          The tight tracking (-0.01em) highlights Fraunces' personality and optical sizing.
          This isn't Times New Roman—it's intentional character.
        </p>
      </div>

      <div>
        <Heading as="h3" variant="h3">
          Design System Foundation
        </Heading>
        <p className="text-gray-700 leading-relaxed mt-4">
          Notice this heading uses Inter (not Fraunces) because it's 24px. The font switch
          improves readability at smaller sizes while maintaining hierarchy.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Headings on warm gray-50 background (#FAF7F5), our default page color. Notice Fraunces character for large headings, font switch to Inter for H3, tight tracking, and warm gray-900 text (not cold black).',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 6: Visual vs. Semantic Independence
export const VisualVsSemanticIndependence: Story = {
  render: () => (
    <div className="max-w-4xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="font-semibold text-gray-900 mb-3">Example: h2 with display styling</h4>
        <Heading as="h2" variant="display">
          This is an h2 Tag
        </Heading>
        <p className="text-sm text-gray-600 mt-3">
          Semantic level (h2) ≠ visual style (display). Useful when page structure requires
          h2 but visual hierarchy needs large display heading.
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="font-semibold text-gray-900 mb-3">Example: h1 with h4 styling</h4>
        <Heading as="h1" variant="h4">
          This is an h1 Tag
        </Heading>
        <p className="text-sm text-gray-600 mt-3">
          Page might have h1 for SEO/accessibility but visual design needs smaller heading.
          Separate semantic HTML from visual styling.
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="font-semibold text-gray-900 mb-3">Why this matters</h4>
        <p className="text-sm text-gray-600">
          Screen readers use semantic HTML (h1-h6) for navigation. Visual styling (variant)
          is purely presentational. This separation gives you full control over both
          accessibility AND design.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The "as" prop controls semantic HTML (h1-h6) for accessibility. The "variant" prop controls visual styling. They are independent for maximum flexibility.',
      },
    },
  },
};

// Story 7: Interactive (Playground)
export const Interactive: Story = {
  args: {
    as: 'h2',
    variant: 'h2',
    children: 'Interactive Heading - Try Different Variants',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different combinations of semantic levels (as) and visual styles (variant). Notice the font switch from Fraunces to Inter when you select h3, h4, h5, or h6 variants.',
      },
    },
  },
};
