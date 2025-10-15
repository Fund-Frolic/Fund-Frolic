/**
 * Button Component Stories
 *
 * Demonstrates all variants using design system colors (terracotta + sage + neutral).
 * Icons scale responsively, all spacing 8-point grid aligned, transitions per design system.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

// Example icons for stories
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary interactive element using design system colors exclusively. Primary/destructive/outline use terracotta, secondary uses sage. Icons scale responsively (16px/20px/24px), all spacing 8-point grid aligned. Transitions use design system duration (300ms) and easing (ease-out).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'destructive'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size (8-point grid aligned)',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    children: 'View Case Study',
    variant: 'primary',
    size: 'md',
  },
};

// Story 2: All Variants
export const AllVariants: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Button variant="primary">Primary - Craftsmanship</Button>
      <Button variant="secondary">Secondary - Balance</Button>
      <Button variant="ghost">Ghost - Subtle</Button>
      <Button variant="outline">Outline - Structured</Button>
      <Button variant="destructive">Destructive - Careful</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All five button variants using design system colors. Primary (blue-600) for main actions, secondary (gold-500) for supporting actions, ghost for tertiary actions, outline for alternative CTAs, and destructive (blue-700, darker for emphasis) for careful actions.',
      },
    },
  },
};

// Story 3: All Sizes
export const AllSizes: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex items-end gap-4 p-8">
      <Button size="sm">Small (32px)</Button>
      <Button size="md">Medium (40px)</Button>
      <Button size="lg">Large (48px)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes aligned to 8-point grid: sm (32px), md (40px), lg (48px). All sizes maintain 44px minimum touch target on mobile.',
      },
    },
  },
};

// Story 4: With Icons
export const WithIcons: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Button leftIcon={<CheckIcon />}>Completed Projects</Button>
      <Button rightIcon={<ArrowRightIcon />}>View All Work</Button>
      <Button leftIcon={<DownloadIcon />} rightIcon={<ArrowRightIcon />}>
        Download Resume
      </Button>
      <Button variant="secondary" rightIcon={<ArrowRightIcon />}>
        Learn More
      </Button>
      <Button variant="outline" leftIcon={<DownloadIcon />}>
        Export Portfolio
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left icons, right icons, or both. Icons are sized responsively: sm (16px/h-4), md (20px/h-5), lg (24px/h-6). Gap is 8px (gap-2) per 8-point grid.',
      },
    },
  },
};

// Story 5: States
export const States: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div>
        <p className="text-sm text-gray-600 mb-2">Default (Resting State)</p>
        <Button>Default State</Button>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Hover (hover over button)</p>
        <Button className="hover:bg-blue-700 hover:shadow-md">Hover State</Button>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Focus (tab to button)</p>
        <Button>Focus State (Tab to me)</Button>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Disabled</p>
        <Button disabled>Disabled State</Button>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Loading</p>
        <Button loading>Loading State</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All interactive states: resting, hover (darker bg + elevated shadow), focus (2px terracotta ring), disabled (50% opacity per design system), and loading (spinner with aria-busy). Transitions use 300ms duration with ease-out.',
      },
    },
  },
};

// Story 6: On Warm Background
export const OnWarmBackground: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="bg-gray-50 p-12 space-y-6">
      <div>
        <h3 className="font-display text-3xl font-semibold text-gray-900 mb-4">
          Featured Case Study
        </h3>
        <p className="text-gray-700 mb-6 max-w-2xl">
          This is how buttons appear on our warm gray-50 background (#FAF7F5),
          the default page color. Notice how terracotta and sage provide professional warmth,
          not cold generic blue. All colors come from our design system scales.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button rightIcon={<ArrowRightIcon />}>View Case Study</Button>
          <Button variant="secondary">Explore Process</Button>
          <Button variant="outline">Download Assets</Button>
          <Button variant="ghost">Skip</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons on warm gray-50 background (#FAF7F5), our default page color. All colors (terracotta + sage + neutral) come from design system scales, creating professional warmth instead of cold generic blues.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 7: Accessibility
export const Accessibility: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="p-8 space-y-6">
      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Keyboard Navigation</h4>
        <div className="flex gap-3 items-center">
          <Button>First Button (Tab)</Button>
          <Button variant="secondary">Second Button (Tab)</Button>
          <Button variant="outline">Third Button (Tab + Enter)</Button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Press Tab to navigate, Enter or Space to activate. Focus rings are clearly visible.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Focus Indicators</h4>
        <Button>Tab to see focus ring (2px terracotta with 2px offset)</Button>
        <p className="text-sm text-gray-600 mt-2">
          Focus rings meet 3:1 contrast minimum (WCAG 2.2 AA)
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Loading State</h4>
        <Button loading>Processing...</Button>
        <p className="text-sm text-gray-600 mt-2">
          Loading state includes aria-busy="true" for screen readers
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Disabled State</h4>
        <Button disabled>Disabled Button</Button>
        <p className="text-sm text-gray-600 mt-2">
          Disabled buttons use 50% opacity (WCAG compliant for disabled states)
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Touch Targets</h4>
        <div className="flex gap-3 items-center">
          <Button size="sm">Small (32px + mobile padding = 44px)</Button>
          <Button size="md">Medium (40px)</Button>
          <Button size="lg">Large (48px)</Button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          All buttons meet 44×44px minimum touch target on mobile
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features: keyboard navigation, focus indicators (3:1 contrast), ARIA attributes, and proper touch targets (44×44px minimum).',
      },
    },
  },
};

// Story 8: Interactive (Playground)
export const Interactive: Story = {
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different combinations of props.',
      },
    },
  },
};

// Story 9: Full Width
export const FullWidth: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="w-full max-w-md p-8 space-y-3">
      <Button fullWidth rightIcon={<ArrowRightIcon />}>
        Continue to Portfolio
      </Button>
      <Button fullWidth variant="secondary">
        Save Draft
      </Button>
      <Button fullWidth variant="outline">
        Cancel
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-width buttons for mobile layouts and forms.',
      },
    },
  },
};
