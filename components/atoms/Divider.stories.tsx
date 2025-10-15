/**
 * Divider Component Stories
 *
 * Visual separators using design system (gray-200 border, bg-background-elevated labels).
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Visual separators using design system. Border: gray-200 for soft separation. Supports solid/dashed/dotted variants (all now functional). Label uses bg-background-elevated token, px-3 (12px = 8-point grid).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Line style',
    },
    label: {
      control: 'text',
      description: 'Optional label text',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Story 2: Orientations
export const Orientations: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Horizontal (Default)</p>
        <div className="w-full">
          <Divider />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Uses &lt;hr&gt; element for semantic separation
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Vertical</p>
        <div className="flex items-center gap-4 h-24">
          <div>Left Content</div>
          <Divider orientation="vertical" />
          <div>Right Content</div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Uses &lt;div role="separator" aria-orientation="vertical"&gt;
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two orientations: horizontal (default, <hr>) and vertical (div with role="separator"). Vertical requires parent with defined height.',
      },
    },
  },
};

// Story 3: Variants
export const Variants: Story = {
  render: () => (
    <div className="max-w-2xl p-8 space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Solid (Default)</p>
        <Divider variant="solid" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Dashed</p>
        <Divider variant="dashed" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three line styles using border properties: solid (continuous), dashed (segmented), dotted (individual dots). All variants now render correctly using border instead of background.',
      },
    },
  },
};

// Story 4: With Label
export const WithLabel: Story = {
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <Divider label="Projects" />
      <Divider label="or" />
      <Divider label="Featured Work" />
      <Divider label="2024" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers with centered labels. Label uses bg-background-elevated (design system token) with px-3 (12px, 8-point grid aligned) padding. Uses Text component (caption variant) for typography.',
      },
    },
  },
};

// Story 5: In Layout
export const InLayout: Story = {
  render: () => (
    <div className="max-w-3xl p-8">
      <h2 className="font-display text-3xl font-semibold text-gray-900 mb-4">
        Case Study: Austin Power Alert
      </h2>
      <p className="text-gray-700 mb-6">
        Real-time power monitoring dashboard for Austin, Texas residents during
        extreme weather events.
      </p>

      <Divider className="my-8" />

      <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
        Project Overview
      </h3>
      <p className="text-gray-700 mb-6">
        Built with Next.js, TypeScript, and Tailwind CSS. Integrates with ERCOT
        API for real-time grid status updates.
      </p>

      <Divider label="Technical Stack" className="my-8" />

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
          <p className="text-sm text-gray-700">
            Next.js 15, React 19, TypeScript, Tailwind CSS v4
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Backend</h4>
          <p className="text-sm text-gray-700">
            Supabase, PostgreSQL, Edge Functions
          </p>
        </div>
      </div>

      <Divider className="my-8" />

      <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
        Results & Impact
      </h3>
      <p className="text-gray-700">
        Dashboard served 50,000+ users during Winter Storm Uri, providing critical
        real-time updates when official sources were overwhelmed.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers in realistic content layout: between sections, with labels, and as visual breaks. Notice warm gray-200 creates soft separation.',
      },
    },
  },
};

// Story 6: On Warm Background
export const OnWarmBackground: Story = {
  render: () => (
    <div className="bg-gray-50 p-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="font-display text-3xl font-semibold text-gray-900 mb-4">
          Featured Projects
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Austin Power Alert</h3>
            <p className="text-sm text-gray-700">
              Real-time power monitoring dashboard
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Design System V2</h3>
            <p className="text-sm text-gray-700">
              Component library rebuild
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Portfolio Redesign</h3>
            <p className="text-sm text-gray-700">
              Personal branding update
            </p>
          </div>
        </div>

        <Divider label="2023 Archive" className="my-8" />

        <div className="flex gap-8 h-32">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">Left Column</h4>
            <p className="text-sm text-gray-700">
              Previous projects and archived work.
            </p>
          </div>

          <Divider orientation="vertical" />

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">Right Column</h4>
            <p className="text-sm text-gray-700">
              Additional context and metadata.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dividers on warm gray-50 background in realistic layout. Notice how gray-200 provides subtle but clear visual separation.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 7: Interactive (Playground)
export const Interactive: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    label: undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-96 p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different orientations, variants, and labels.',
      },
    },
  },
};
