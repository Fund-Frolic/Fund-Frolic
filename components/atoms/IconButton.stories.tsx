/**
 * IconButton Component Stories
 *
 * Compact icon-only buttons using design system colors (terracotta + neutral).
 * Perfect circles (32px/40px/48px), responsive icons, 300ms transitions.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from './IconButton';

// Common icon set for stories
const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const Bars3Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

const ArrowTopRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
  </svg>
);

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Compact icon-only actions using design system. Perfect circles (32px/40px/48px), responsive icons (16px/20px/24px), 300ms transitions with ease-out. Required aria-label for accessibility. Colors: terracotta (default), neutral (ghost/outline).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size (perfect circles)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label (REQUIRED for screen readers)',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    icon: <XMarkIcon />,
    'aria-label': 'Close dialog',
    variant: 'default',
    size: 'md',
  },
};

// Story 2: All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-8">
      <div className="text-center">
        <IconButton
          variant="default"
          icon={<XMarkIcon />}
          aria-label="Close dialog"
        />
        <p className="text-sm text-gray-600 mt-2">Default</p>
      </div>

      <div className="text-center">
        <IconButton
          variant="ghost"
          icon={<Bars3Icon />}
          aria-label="Open menu"
        />
        <p className="text-sm text-gray-600 mt-2">Ghost</p>
      </div>

      <div className="text-center">
        <IconButton
          variant="outline"
          icon={<ShareIcon />}
          aria-label="Share"
        />
        <p className="text-sm text-gray-600 mt-2">Outline</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three variants using design system colors: default (blue-600 filled), ghost (transparent with gray-100 hover), and outline (gray-300 border, terracotta hover).',
      },
    },
  },
};

// Story 3: All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 p-8">
      <div className="text-center">
        <IconButton
          size="sm"
          icon={<XMarkIcon />}
          aria-label="Close"
        />
        <p className="text-sm text-gray-600 mt-2">Small<br />32×32px</p>
      </div>

      <div className="text-center">
        <IconButton
          size="md"
          icon={<XMarkIcon />}
          aria-label="Close"
        />
        <p className="text-sm text-gray-600 mt-2">Medium<br />40×40px</p>
      </div>

      <div className="text-center">
        <IconButton
          size="lg"
          icon={<XMarkIcon />}
          aria-label="Close"
        />
        <p className="text-sm text-gray-600 mt-2">Large<br />48×48px</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes as perfect circles, 8-point grid aligned: sm (32×32px with 16px icon), md (40×40px with 20px icon), lg (48×48px with 24px icon). All meet 44×44px touch target minimum.',
      },
    },
  },
};

// Story 4: Common Icons
export const CommonIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <div className="text-center">
        <IconButton
          icon={<XMarkIcon />}
          aria-label="Close dialog"
        />
        <p className="text-xs text-gray-600 mt-2">Close</p>
      </div>

      <div className="text-center">
        <IconButton
          icon={<Bars3Icon />}
          aria-label="Open menu"
        />
        <p className="text-xs text-gray-600 mt-2">Menu</p>
      </div>

      <div className="text-center">
        <IconButton
          icon={<ArrowTopRightIcon />}
          aria-label="Open in new window"
        />
        <p className="text-xs text-gray-600 mt-2">External</p>
      </div>

      <div className="text-center">
        <IconButton
          icon={<GitHubIcon />}
          aria-label="View GitHub profile"
        />
        <p className="text-xs text-gray-600 mt-2">GitHub</p>
      </div>

      <div className="text-center">
        <IconButton
          icon={<HeartIcon />}
          aria-label="Like project"
        />
        <p className="text-xs text-gray-600 mt-2">Like</p>
      </div>

      <div className="text-center">
        <IconButton
          icon={<ShareIcon />}
          aria-label="Share project"
        />
        <p className="text-xs text-gray-600 mt-2">Share</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common icon button use cases: close dialogs, open menus, external links, social media, likes, and sharing.',
      },
    },
  },
};

// Story 5: States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <p className="text-sm text-gray-600 mb-2">Default (Resting State)</p>
        <IconButton
          icon={<XMarkIcon />}
          aria-label="Close"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Hover (hover over button)</p>
        <IconButton
          icon={<XMarkIcon />}
          aria-label="Close"
          className="hover:bg-blue-700 hover:shadow-md"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Focus (tab to button)</p>
        <IconButton
          icon={<XMarkIcon />}
          aria-label="Close (Tab to me)"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Disabled</p>
        <IconButton
          icon={<XMarkIcon />}
          aria-label="Close"
          disabled
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Ghost Hover</p>
        <IconButton
          variant="ghost"
          icon={<Bars3Icon />}
          aria-label="Menu"
          className="hover:bg-gray-100"
        />
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-2">Outline Hover</p>
        <IconButton
          variant="outline"
          icon={<ShareIcon />}
          aria-label="Share"
          className="hover:border-blue-600 hover:bg-blue-50"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All interactive states: resting, hover (darker bg + elevated shadow), focus (2px terracotta ring), and disabled (50% opacity per design system). Transitions use 300ms duration with ease-out.',
      },
    },
  },
};

// Story 6: Accessibility
export const Accessibility: Story = {
  render: () => (
    <div className="p-8 space-y-6 max-w-2xl">
      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Required aria-label</h4>
        <div className="flex gap-3 items-center">
          <IconButton
            icon={<XMarkIcon />}
            aria-label="Close dialog"
          />
          <IconButton
            icon={<Bars3Icon />}
            aria-label="Open navigation menu"
          />
          <IconButton
            icon={<ShareIcon />}
            aria-label="Share this project"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Every IconButton requires aria-label (enforced by TypeScript). Screen readers announce
          the label since there's no visible text.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Keyboard Navigation</h4>
        <div className="flex gap-3">
          <IconButton
            icon={<XMarkIcon />}
            aria-label="First button (Tab)"
          />
          <IconButton
            icon={<Bars3Icon />}
            aria-label="Second button (Tab)"
          />
          <IconButton
            icon={<ShareIcon />}
            aria-label="Third button (Tab + Enter)"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Press Tab to navigate, Enter or Space to activate. Focus rings are clearly visible.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Focus Indicators</h4>
        <IconButton
          icon={<XMarkIcon />}
          aria-label="Close (Tab to see focus ring)"
        />
        <p className="text-sm text-gray-600 mt-2">
          Focus rings are 2px terracotta with 2px offset, meeting 3:1 contrast minimum (WCAG 2.2 AA)
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Touch Targets (Mobile)</h4>
        <div className="flex gap-4 items-center">
          <IconButton
            size="sm"
            icon={<XMarkIcon />}
            aria-label="Small (32×32px + mobile padding = 44×44px)"
          />
          <IconButton
            size="md"
            icon={<XMarkIcon />}
            aria-label="Medium (40×40px + padding = 44×44px)"
          />
          <IconButton
            size="lg"
            icon={<XMarkIcon />}
            aria-label="Large (48×48px)"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          All buttons meet 44×44px minimum touch target. Small size adds extra padding on mobile.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Disabled State</h4>
        <IconButton
          icon={<XMarkIcon />}
          aria-label="Disabled button"
          disabled
        />
        <p className="text-sm text-gray-600 mt-2">
          Disabled buttons use 50% opacity, cursor-not-allowed, and pointer-events-none
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility: required aria-label (TypeScript enforced), keyboard navigation, focus indicators (3:1 contrast), and proper touch targets (44×44px).',
      },
    },
  },
};

// Story 7: On Warm Background
export const OnWarmBackground: Story = {
  render: () => (
    <div className="bg-gray-50 p-12 space-y-6">
      <div>
        <h3 className="font-display text-3xl font-semibold text-gray-900 mb-4">
          Icon Buttons in Context
        </h3>
        <p className="text-gray-700 mb-6 max-w-2xl">
          This demonstrates how icon buttons appear on our warm gray-50 background (#FAF7F5).
          Notice how the terracotta variant feels warm and approachable, while ghost and outline
          variants provide subtle alternatives.
        </p>

        <div className="flex gap-4 mb-6">
          <IconButton
            icon={<Bars3Icon />}
            aria-label="Open menu"
          />
          <IconButton
            variant="ghost"
            icon={<HeartIcon />}
            aria-label="Like"
          />
          <IconButton
            variant="outline"
            icon={<ShareIcon />}
            aria-label="Share"
          />
        </div>

        <div className="bg-white p-6 rounded-md shadow-md inline-block">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Dialog Title</h4>
            <IconButton
              variant="ghost"
              size="sm"
              icon={<XMarkIcon />}
              aria-label="Close dialog"
            />
          </div>
          <p className="text-gray-700">
            Icon buttons work beautifully in dialog headers, toolbars, and as utility actions.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon buttons on warm gray-50 background (#FAF7F5) in realistic dialog context. All design system tokens applied: terracotta/neutral colors, 300ms transitions, responsive icons.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 8: Interactive (Playground)
export const Interactive: Story = {
  args: {
    icon: <XMarkIcon />,
    'aria-label': 'Close',
    variant: 'default',
    size: 'md',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different combinations of props.',
      },
    },
  },
};
