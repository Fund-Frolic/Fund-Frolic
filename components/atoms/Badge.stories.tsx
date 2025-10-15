/**
 * Badge Component Stories
 *
 * Status indicators using design system colors.
 * Success/info use sage, warning/error use terracotta.
 * 8-point grid aligned, pill-shaped with pastel backgrounds.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status indicators using design system colors. Success/info use sage (accent), warning/error use terracotta (primary). Pill-shaped with pastel backgrounds for soft, professional warmth.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'success', 'warning', 'error', 'info'],
      description: 'Semantic color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded', 'square'],
      description: 'Border radius style',
    },
    dot: {
      control: 'boolean',
      description: 'Show colored dot indicator',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

// Story 2: All Variants
export const AllVariants: Story = {
  args: { children: 'Badge' },
  render: () => (
    <div className="flex flex-wrap gap-3 p-8">
      <Badge variant="default">Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Six semantic variants using design system colors: default (gray-100), outline (border only), success (gold-100), warning (blue-100), error (blue-200), info (gold-50). Pastel backgrounds provide professional warmth.',
      },
    },
  },
};

// Story 3: All Sizes
export const AllSizes: Story = {
  args: { children: 'Badge' },
  render: () => (
    <div className="flex items-center gap-4 p-8">
      <div className="text-center">
        <Badge size="sm">Small</Badge>
        <p className="text-xs text-gray-600 mt-2">8px H × 4px V<br />12px text</p>
      </div>
      <div className="text-center">
        <Badge size="md">Medium</Badge>
        <p className="text-xs text-gray-600 mt-2">12px H × 4px V<br />14px text</p>
      </div>
      <div className="text-center">
        <Badge size="lg">Large</Badge>
        <p className="text-xs text-gray-600 mt-2">16px H × 4px V<br />16px text</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes aligned to 8-point grid: sm (8px H × 4px V padding, 12px text), md (12px H × 4px V, 14px text), lg (16px H × 4px V, 16px text). All padding values are 4px/8px multiples.',
      },
    },
  },
};

// Story 4: All Shapes
export const AllShapes: Story = {
  args: { children: 'Badge' },
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Pill (rounded-full) [Default]</p>
        <Badge shape="pill">Modern & Friendly</Badge>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Rounded (rounded-md / 8px)</p>
        <Badge shape="rounded">Structured & Consistent</Badge>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Square (rounded-sm / 4px)</p>
        <Badge shape="square">Technical & Compact</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three shapes: pill (rounded-full, modern), rounded (8px, consistent with buttons), square (4px, technical).',
      },
    },
  },
};

// Story 5: With Dot
export const WithDot: Story = {
  args: { children: 'Badge' },
  render: () => (
    <div className="flex flex-wrap gap-3 p-8">
      <Badge variant="default" dot>Neutral</Badge>
      <Badge variant="success" dot>Published</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Failed</Badge>
      <Badge variant="info" dot>New</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with colored dot indicators (8px circle, aligned to 8-point grid). Dot colors use design system scales: sage for success/info, terracotta for warning/error.',
      },
    },
  },
};

// Story 6: Semantic Use Cases
export const SemanticUseCases: Story = {
  args: { children: 'Badge' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-6">
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Project Status</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" dot>Published</Badge>
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="success" dot>Completed</Badge>
          <Badge variant="warning" dot>Draft</Badge>
          <Badge variant="warning" dot>In Review</Badge>
          <Badge variant="error" dot>Archived</Badge>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Technologies (Outline)</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" size="sm">React</Badge>
          <Badge variant="outline" size="sm">TypeScript</Badge>
          <Badge variant="outline" size="sm">Tailwind CSS</Badge>
          <Badge variant="outline" size="sm">Next.js</Badge>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Categories (Default)</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Design</Badge>
          <Badge variant="default">Development</Badge>
          <Badge variant="default">Strategy</Badge>
          <Badge variant="default">Research</Badge>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Notifications</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info" size="sm" dot>3 New</Badge>
          <Badge variant="success" size="sm" dot>Updated</Badge>
          <Badge variant="warning" size="sm" dot>Expiring Soon</Badge>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Build Status</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" shape="rounded">Build Passing</Badge>
          <Badge variant="error" shape="rounded">Tests Failed</Badge>
          <Badge variant="warning" shape="rounded">Warnings: 3</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world semantic use cases: project status, technology tags (outline), categories, notifications, build status. Use outline variant for tags/labels without semantic meaning.',
      },
    },
  },
};

// Story 7: On Warm Background
export const OnWarmBackground: Story = {
  args: { children: 'Badge' },
  render: () => (
    <div className="bg-gray-50 p-12 space-y-8">
      <div>
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
          Featured Projects
        </h3>
        <div className="bg-white p-6 rounded-md shadow-md space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Austin Power Alert</h4>
              <p className="text-sm text-gray-600">Real-time power monitoring dashboard</p>
            </div>
            <Badge variant="success" dot>Published</Badge>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Design System V2</h4>
              <p className="text-sm text-gray-600">Component library rebuild</p>
            </div>
            <Badge variant="warning" dot>In Progress</Badge>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Portfolio Redesign</h4>
              <p className="text-sm text-gray-600">Personal branding update</p>
            </div>
            <Badge variant="info" dot>Planning</Badge>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <p className="text-sm text-gray-600 w-full mb-2">Filter by category:</p>
          <Badge variant="default" size="sm">All Projects</Badge>
          <Badge variant="default" size="sm">Design</Badge>
          <Badge variant="default" size="sm">Engineering</Badge>
          <Badge variant="default" size="sm">Strategy</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges in realistic context on warm gray-50 background (#FAF7F5). Design system colors (sage + terracotta) provide professional warmth while maintaining clear semantic meaning.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 8: Interactive (Playground)
export const Interactive: Story = {
  args: {
    children: 'Interactive Badge',
    variant: 'default',
    size: 'md',
    shape: 'pill',
    dot: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different combinations of variants, sizes, shapes, and dot indicators.',
      },
    },
  },
};
