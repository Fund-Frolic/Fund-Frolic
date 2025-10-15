/**
 * Link Component Stories
 *
 * Navigation using design system colors (terracotta + neutral).
 * 300ms transitions, WCAG underlines, external icons (16px, 4px gap).
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Link } from './Link';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation using design system. Colors: blue-600/700 (default/external), gray-700 (nav). Transitions: 300ms ease-out. Underlines for WCAG affordance. External icon: 16px with gap-1 (4px, 8-point grid). Focus: blue-600 ring.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'nav', 'external'],
      description: 'Visual style variant',
    },
    active: {
      control: 'boolean',
      description: 'Whether nav link is currently active (for nav variant only)',
    },
    external: {
      control: 'boolean',
      description: 'External link - adds icon, target="_blank", rel, and aria-label',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    children: 'View my portfolio',
    href: '#',
    variant: 'default',
  },
};

// Story 2: All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Default (Body Links)</p>
        <Link variant="default" href="#">
          View case study details
        </Link>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Nav (Navigation)</p>
        <nav className="flex gap-6">
          <Link variant="nav" href="#">
            Home
          </Link>
          <Link variant="nav" href="#" active>
            Projects
          </Link>
          <Link variant="nav" href="#">
            About
          </Link>
          <Link variant="nav" href="#">
            Contact
          </Link>
        </nav>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">External (Off-site)</p>
        <Link external href="https://github.com">
          View on GitHub
        </Link>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three link variants using design system colors: default (blue-600/700 with underline), nav (gray-700, terracotta hover/active), and external (adds 16px icon with 4px gap). All transitions: 300ms ease-out.',
      },
    },
  },
};

// Story 3: Nav States
export const NavStates: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Normal State</p>
        <nav className="flex gap-6">
          <Link variant="nav" href="#">
            Projects
          </Link>
          <Link variant="nav" href="#">
            About
          </Link>
          <Link variant="nav" href="#">
            Contact
          </Link>
        </nav>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Active State (Current Page)</p>
        <nav className="flex gap-6">
          <Link variant="nav" href="#" active>
            Projects
          </Link>
          <Link variant="nav" href="#">
            About
          </Link>
          <Link variant="nav" href="#">
            Contact
          </Link>
        </nav>
        <p className="text-xs text-gray-500 mt-2">
          Active link is blue-700 with medium weight, includes aria-current="page"
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-3">Hover State (hover over links)</p>
        <nav className="flex gap-6">
          <Link variant="nav" href="#" className="hover:text-blue-600">
            Projects
          </Link>
          <Link variant="nav" href="#" className="hover:text-blue-600">
            About
          </Link>
          <Link variant="nav" href="#" className="hover:text-blue-600">
            Contact
          </Link>
        </nav>
        <p className="text-xs text-gray-500 mt-2">
          Nav links transition to blue-600 on hover
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation link states: normal (gray-700), hover (blue-600), and active (blue-700 with medium weight and aria-current="page"). All transitions use 300ms ease-out per design system.',
      },
    },
  },
};

// Story 4: In Body Copy
export const InBodyCopy: Story = {
  render: () => (
    <div className="max-w-2xl p-8">
      <h2 className="font-display text-3xl font-semibold text-gray-900 mb-4">
        Featured Case Study
      </h2>
      <p className="font-inter text-base leading-normal text-gray-700 mb-4">
        This portfolio showcases a comprehensive design system built from the ground up.
        Every component embodies our philosophy of{' '}
        <Link href="#">professional warmth</Link>, differentiating from the{' '}
        <Link href="#">68% of portfolios</Link> that use generic blue and gray palettes.
      </p>
      <p className="font-inter text-base leading-normal text-gray-700 mb-4">
        The color system features{' '}
        <Link href="#">terracotta for craftsmanship</Link> and{' '}
        <Link href="#">sage for balance</Link>, with all shadows using{' '}
        <Link href="#">warm gray-900</Link> instead of cold black.
      </p>
      <p className="font-inter text-base leading-normal text-gray-700">
        View the complete documentation on{' '}
        <Link external href="https://github.com">
          GitHub
        </Link>{' '}
        or explore the{' '}
        <Link href="#">interactive component library</Link>.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Links within body copy using blue-600/700 from design system. Underlines provide WCAG-compliant affordance (never rely on color alone). External links add 16px icon with 4px gap (8-point grid).',
      },
    },
  },
};

// Story 5: Accessibility
export const Accessibility: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Keyboard Navigation</h4>
        <div className="space-y-2">
          <Link href="#">First Link (Tab)</Link>
          <br />
          <Link href="#">Second Link (Tab)</Link>
          <br />
          <Link href="#">Third Link (Tab + Enter)</Link>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Press Tab to navigate, Enter to activate. Focus rings are clearly visible.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Focus Indicators</h4>
        <Link href="#">Tab to see focus ring (2px terracotta with 2px offset)</Link>
        <p className="text-sm text-gray-600 mt-2">
          Focus rings meet 3:1 contrast minimum (WCAG 2.2 AA)
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">External Link Announcement</h4>
        <Link external href="https://github.com">
          GitHub Profile
        </Link>
        <p className="text-sm text-gray-600 mt-2">
          External links include aria-label="GitHub Profile (Opens in new window)" for screen readers
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Current Page Indicator</h4>
        <nav className="flex gap-4">
          <Link variant="nav" href="#">
            Home
          </Link>
          <Link variant="nav" href="#" active>
            Projects
          </Link>
          <Link variant="nav" href="#">
            About
          </Link>
        </nav>
        <p className="text-sm text-gray-600 mt-2">
          Active nav link includes aria-current="page" for screen readers
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Underline Affordance</h4>
        <p className="text-gray-700">
          Links always have visible underlines in body copy:{' '}
          <Link href="#">example link</Link>. This follows WCAG guidelines to{' '}
          <Link href="#">never rely on color alone</Link> to indicate interactivity.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility: keyboard navigation, focus indicators (3:1 contrast), ARIA labels for external links, aria-current for active pages, and underlines for affordance.',
      },
    },
  },
};

// Story 6: On Warm Background
export const OnWarmBackground: Story = {
  render: () => (
    <div className="bg-gray-50 p-12 space-y-6">
      <div>
        <h3 className="font-display text-3xl font-semibold text-gray-900 mb-4">
          Navigation on Warm Background
        </h3>
        <p className="text-gray-700 mb-6 max-w-2xl">
          This demonstrates how links appear on our warm gray-50 background (#FAF7F5).
          Notice how terracotta feels warm and inviting against the warm neutral, creating
          a cohesive professional warmth aesthetic.
        </p>

        <div className="space-y-4">
          <nav className="flex gap-6">
            <Link variant="nav" href="#" active>
              Projects
            </Link>
            <Link variant="nav" href="#">
              About
            </Link>
            <Link variant="nav" href="#">
              Contact
            </Link>
          </nav>

          <p className="text-gray-700">
            Explore my work to see how I approach{' '}
            <Link href="#">design systems</Link> and{' '}
            <Link href="#">component architecture</Link>. You can also view my profiles on{' '}
            <Link external href="https://github.com">
              GitHub
            </Link>{' '}
            and{' '}
            <Link external href="https://linkedin.com">
              LinkedIn
            </Link>.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Links on warm gray-50 background (#FAF7F5). All design system tokens applied: terracotta/neutral colors, 300ms transitions with ease-out, 16px external icons with 4px gap.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 7: Interactive (Playground)
export const Interactive: Story = {
  args: {
    children: 'Interactive Link',
    href: '#',
    variant: 'default',
    active: false,
    external: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different combinations of props.',
      },
    },
  },
};
