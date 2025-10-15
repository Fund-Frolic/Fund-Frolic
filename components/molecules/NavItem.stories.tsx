/**
 * NavItem Molecule Stories
 *
 * Navigation links with active state indicators and optional icons.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavItem } from './NavItem';

// Sample icons
const HomeIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const meta = {
  title: 'Molecules/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation links with active state indicators. Default: gray-700, hover: blue-600. Active: blue-700 font-medium with border-b-2. Transitions: 150ms ease-out. Touch target: 44×44px. Optional icon support (16px).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Active state (current page)',
    },
    icon: {
      control: false,
      description: 'Optional icon (React node)',
    },
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    children: 'Home',
    href: '/',
  },
};

// Story 2: Active
export const Active: Story = {
  args: {
    children: 'About',
    href: '/about',
    active: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Active state with blue-700 text, font-medium weight, and bottom border (blue-600).',
      },
    },
  },
};

// Story 3: With Icon
export const WithIcon: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <div className="flex gap-6">
      <NavItem href="/" icon={<HomeIcon />}>
        Home
      </NavItem>
      <NavItem href="/about" icon={<InfoIcon />}>
        About
      </NavItem>
      <NavItem href="/projects" icon={<BriefcaseIcon />} active>
        Projects
      </NavItem>
      <NavItem href="/contact" icon={<MailIcon />}>
        Contact
      </NavItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation items with icons. Icons are 16px (w-4 h-4) with 8px gap (gap-2).',
      },
    },
  },
};

// Story 4: Navigation Bar
export const NavigationBar: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <nav className="bg-white border-b border-gray-200 px-6">
      <div className="flex items-center gap-1">
        <NavItem href="/" active>
          Home
        </NavItem>
        <NavItem href="/about">
          About
        </NavItem>
        <NavItem href="/projects">
          Projects
        </NavItem>
        <NavItem href="/blog">
          Blog
        </NavItem>
        <NavItem href="/contact">
          Contact
        </NavItem>
      </div>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full navigation bar with active state on Home. Border-b on container for visual separation.',
      },
    },
  },
};

// Story 5: With Icons Navigation
export const WithIconsNavigation: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <nav className="bg-white border-b border-gray-200 px-6">
      <div className="flex items-center gap-1">
        <NavItem href="/" icon={<HomeIcon />} active>
          Home
        </NavItem>
        <NavItem href="/about" icon={<InfoIcon />}>
          About
        </NavItem>
        <NavItem href="/projects" icon={<BriefcaseIcon />}>
          Projects
        </NavItem>
        <NavItem href="/contact" icon={<MailIcon />}>
          Contact
        </NavItem>
      </div>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation with icons and text. Icons provide visual context for each section.',
      },
    },
  },
};

// Story 6: Vertical Navigation
export const VerticalNavigation: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <nav className="flex flex-col gap-1">
        <NavItem href="/" icon={<HomeIcon />} active>
          Home
        </NavItem>
        <NavItem href="/about" icon={<InfoIcon />}>
          About
        </NavItem>
        <NavItem href="/projects" icon={<BriefcaseIcon />}>
          Projects
        </NavItem>
        <NavItem href="/contact" icon={<MailIcon />}>
          Contact
        </NavItem>
      </nav>
    </aside>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical sidebar navigation. Border indicator still visible on left-aligned items.',
      },
    },
  },
};

// Story 7: Mobile Navigation
export const MobileNavigation: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <nav className="bg-white border-t border-gray-200">
      <div className="flex flex-col">
        <NavItem href="/" icon={<HomeIcon />} active className="justify-start">
          Home
        </NavItem>
        <NavItem href="/about" icon={<InfoIcon />} className="justify-start">
          About
        </NavItem>
        <NavItem href="/projects" icon={<BriefcaseIcon />} className="justify-start">
          Projects
        </NavItem>
        <NavItem href="/contact" icon={<MailIcon />} className="justify-start">
          Contact
        </NavItem>
      </div>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile drawer navigation with full-width items. Touch targets are 44×44px minimum.',
      },
    },
  },
};

// Story 8: Footer Navigation
export const FooterNavigation: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <NavItem href="/" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Home
              </NavItem>
              <NavItem href="/about" className="text-gray-300 hover:text-white border-white py-2 px-0">
                About
              </NavItem>
              <NavItem href="/projects" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Projects
              </NavItem>
              <NavItem href="/contact" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Contact
              </NavItem>
            </nav>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Projects</h3>
            <nav className="flex flex-col gap-2">
              <NavItem href="/projects/web" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Web Development
              </NavItem>
              <NavItem href="/projects/mobile" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Mobile Apps
              </NavItem>
              <NavItem href="/projects/design" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Design Systems
              </NavItem>
            </nav>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Resources</h3>
            <nav className="flex flex-col gap-2">
              <NavItem href="/blog" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Blog
              </NavItem>
              <NavItem href="/case-studies" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Case Studies
              </NavItem>
              <NavItem href="/resume" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Resume
              </NavItem>
            </nav>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Connect</h3>
            <nav className="flex flex-col gap-2">
              <NavItem href="https://github.com" className="text-gray-300 hover:text-white border-white py-2 px-0">
                GitHub
              </NavItem>
              <NavItem href="https://linkedin.com" className="text-gray-300 hover:text-white border-white py-2 px-0">
                LinkedIn
              </NavItem>
              <NavItem href="https://twitter.com" className="text-gray-300 hover:text-white border-white py-2 px-0">
                Twitter
              </NavItem>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer navigation with dark background. Colors adjusted for contrast (gray-300 → white on hover).',
      },
    },
  },
};

// Story 9: Hover States
export const HoverStates: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <div className="bg-gray-100 p-8 rounded-md">
      <p className="text-sm text-gray-700 mb-4">Hover over items to see color transitions</p>
      <nav className="bg-white border border-gray-200 rounded-md px-6">
        <div className="flex items-center gap-1">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </div>
      </nav>
      <div className="mt-4 text-xs text-gray-600">
        <p>• Default: gray-700</p>
        <p>• Hover: blue-600</p>
        <p>• Active: blue-700 (font-medium, bottom border)</p>
        <p>• Transition: 150ms ease-out</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of hover state transitions. Default gray-700 → blue-600 on hover.',
      },
    },
  },
};

// Story 10: Accessibility Demo
export const AccessibilityDemo: Story = {
  args: { href: '#', children: 'Link' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>aria-current="page"</strong> - Announces active page to screen readers</li>
          <li>✅ <strong>Touch target</strong> - 44×44px minimum (py-3 px-4 = 48px height)</li>
          <li>✅ <strong>Keyboard navigation</strong> - Tab to focus, Enter to navigate</li>
          <li>✅ <strong>Color contrast</strong> - WCAG AA compliant (gray-700 on white)</li>
          <li>✅ <strong>Visual indicator</strong> - Bottom border for active state (not just color)</li>
          <li>✅ <strong>Hover state</strong> - Clear visual feedback on interaction</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Touch Target Compliance
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Navigation items have 44×44px minimum touch targets (WCAG 2.5.5).
          This ensures usability on mobile devices and for users with motor disabilities.
        </p>
        <nav className="flex flex-col gap-1 border border-gray-200 rounded-md">
          <NavItem href="/" active>
            Home (44×44px touch target)
          </NavItem>
          <NavItem href="/about">
            About (44×44px touch target)
          </NavItem>
          <NavItem href="/projects">
            Projects (44×44px touch target)
          </NavItem>
        </nav>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including ARIA attributes, touch targets, and keyboard navigation.',
      },
    },
  },
};

// Story 11: Interactive (Playground)
export const Interactive: Story = {
  args: {
    children: 'Navigation Link',
    href: '#',
    active: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test active state and text content.',
      },
    },
  },
};
