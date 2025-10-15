/**
 * SocialLink Molecule Stories
 *
 * Social media links with icons and tooltips.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SocialLink } from './SocialLink';

const meta = {
  title: 'Molecules/SocialLink',
  component: SocialLink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Social media links with icons and tooltips. Icon: 20px (w-5 h-5), gray-700 → blue-600 on hover. Tooltip: bg-gray-900, text-white, text-xs. Transitions: 150ms ease-out. External link with target="_blank" and rel="noopener noreferrer". Tooltip shows on hover and focus.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    platform: {
      control: 'select',
      options: ['github', 'linkedin', 'twitter', 'email'],
      description: 'Social media platform',
    },
    href: {
      control: 'text',
      description: 'Link URL',
    },
    label: {
      control: 'text',
      description: 'Tooltip text (defaults to platform name)',
    },
  },
} satisfies Meta<typeof SocialLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: GitHub
export const GitHub: Story = {
  args: {
    platform: 'github',
    href: 'https://github.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'GitHub social link. Hover to see tooltip.',
      },
    },
  },
};

// Story 2: LinkedIn
export const LinkedIn: Story = {
  args: {
    platform: 'linkedin',
    href: 'https://linkedin.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'LinkedIn social link. Hover to see tooltip.',
      },
    },
  },
};

// Story 3: Twitter
export const Twitter: Story = {
  args: {
    platform: 'twitter',
    href: 'https://twitter.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Twitter (X) social link. Hover to see tooltip.',
      },
    },
  },
};

// Story 4: Email
export const Email: Story = {
  args: {
    platform: 'email',
    href: 'mailto:hello@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Email contact link. Hover to see tooltip.',
      },
    },
  },
};

// Story 5: All Platforms
export const AllPlatforms: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      <SocialLink platform="github" href="https://github.com" />
      <SocialLink platform="linkedin" href="https://linkedin.com" />
      <SocialLink platform="twitter" href="https://twitter.com" />
      <SocialLink platform="email" href="mailto:hello@example.com" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All platform icons. Hover over each to see tooltips.',
      },
    },
  },
};

// Story 6: Custom Labels
export const CustomLabels: Story = {
  render: () => (
    <div className="flex gap-4 p-8">
      <SocialLink
        platform="github"
        href="https://github.com/johndoe"
        label="@johndoe on GitHub"
      />
      <SocialLink
        platform="linkedin"
        href="https://linkedin.com/in/johndoe"
        label="Connect on LinkedIn"
      />
      <SocialLink
        platform="twitter"
        href="https://twitter.com/johndoe"
        label="Follow @johndoe"
      />
      <SocialLink
        platform="email"
        href="mailto:john@example.com"
        label="john@example.com"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Social links with custom tooltip labels. Hover to see personalized messages.',
      },
    },
  },
};

// Story 7: Footer Example
export const FooterExample: Story = {
  render: () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <SocialLink
              platform="github"
              href="https://github.com"
              className="text-gray-300 hover:text-blue-400"
            />
            <SocialLink
              platform="linkedin"
              href="https://linkedin.com"
              className="text-gray-300 hover:text-blue-400"
            />
            <SocialLink
              platform="twitter"
              href="https://twitter.com"
              className="text-gray-300 hover:text-blue-400"
            />
            <SocialLink
              platform="email"
              href="mailto:hello@example.com"
              className="text-gray-300 hover:text-blue-400"
            />
          </div>
          <p className="text-sm text-gray-400">
            © 2024 Logan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Social links in footer with dark background. Colors adjusted for contrast (gray-300 → blue-400).',
      },
    },
  },
};

// Story 8: Contact Page
export const ContactPage: Story = {
  render: () => (
    <div className="max-w-md p-8 bg-white border border-gray-200 rounded-md">
      <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
        Get in Touch
      </h2>
      <p className="text-base text-gray-700 mb-6">
        Feel free to reach out through any of these channels:
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <SocialLink platform="email" href="mailto:hello@example.com" />
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-600">hello@example.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SocialLink platform="linkedin" href="https://linkedin.com" />
          <div>
            <p className="text-sm font-medium text-gray-900">LinkedIn</p>
            <p className="text-sm text-gray-600">Connect professionally</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SocialLink platform="github" href="https://github.com" />
          <div>
            <p className="text-sm font-medium text-gray-900">GitHub</p>
            <p className="text-sm text-gray-600">Check out my code</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SocialLink platform="twitter" href="https://twitter.com" />
          <div>
            <p className="text-sm font-medium text-gray-900">Twitter</p>
            <p className="text-sm text-gray-600">Follow for updates</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Social links with text labels on contact page. Icons provide visual anchors.',
      },
    },
  },
};

// Story 9: Sidebar
export const Sidebar: Story = {
  render: () => (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
          Logan Smith
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Full-stack developer & designer
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Connect
        </h4>
        <div className="flex gap-2">
          <SocialLink platform="github" href="https://github.com" />
          <SocialLink platform="linkedin" href="https://linkedin.com" />
          <SocialLink platform="twitter" href="https://twitter.com" />
          <SocialLink platform="email" href="mailto:hello@example.com" />
        </div>
      </div>

      <div className="text-xs text-gray-600">
        <p>Available for freelance projects</p>
      </div>
    </aside>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Social links in sidebar profile. Compact layout with gap-2 spacing.',
      },
    },
  },
};

// Story 10: Hero Section
export const HeroSection: Story = {
  render: () => (
    <div className="bg-gray-50 p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-display text-5xl font-bold text-gray-900 mb-4">
          Logan Smith
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Full-stack Developer & Product Designer
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <SocialLink
            platform="github"
            href="https://github.com"
            label="View my GitHub projects"
          />
          <SocialLink
            platform="linkedin"
            href="https://linkedin.com"
            label="Connect on LinkedIn"
          />
          <SocialLink
            platform="twitter"
            href="https://twitter.com"
            label="Follow me on Twitter"
          />
          <SocialLink
            platform="email"
            href="mailto:hello@example.com"
            label="Send me an email"
          />
        </div>

        <p className="text-sm text-gray-600">
          Based in Austin, TX • Available for select projects
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Social links in hero section. Centered layout with descriptive tooltips.',
      },
    },
  },
};

// Story 11: Hover States Demo
export const HoverStates: Story = {
  render: () => (
    <div className="bg-gray-100 p-8 rounded-md">
      <p className="text-sm text-gray-700 mb-6">
        Hover over icons to see tooltip and color transition
      </p>
      <div className="flex gap-4 justify-center mb-6">
        <SocialLink platform="github" href="https://github.com" />
        <SocialLink platform="linkedin" href="https://linkedin.com" />
        <SocialLink platform="twitter" href="https://twitter.com" />
        <SocialLink platform="email" href="mailto:hello@example.com" />
      </div>
      <div className="text-xs text-gray-600 space-y-1">
        <p>• Default: gray-700</p>
        <p>• Hover: blue-600</p>
        <p>• Transition: 150ms ease-out</p>
        <p>• Tooltip: bg-gray-900, appears on hover & focus</p>
        <p>• Focus ring: blue-600 with 2px offset</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of hover and focus states. Tooltip appears above icon with arrow.',
      },
    },
  },
};

// Story 12: Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>aria-label</strong> - Descriptive labels for screen readers ("Visit my GitHub profile")</li>
          <li>✅ <strong>External link attributes</strong> - target="_blank" with rel="noopener noreferrer"</li>
          <li>✅ <strong>Keyboard navigation</strong> - Tab to focus, Enter to open link</li>
          <li>✅ <strong>Focus ring</strong> - blue-600 ring with 2px offset</li>
          <li>✅ <strong>Tooltip on focus</strong> - Not just hover (keyboard accessible)</li>
          <li>✅ <strong>Touch target</strong> - 40×40px (w-10 h-10) meets WCAG guidelines</li>
          <li>✅ <strong>Color contrast</strong> - gray-700 on white meets WCAG AA</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Keyboard Navigation Test
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Press Tab to navigate through the social links. Tooltips appear on focus,
          not just hover. Press Enter to follow the link.
        </p>
        <div className="flex gap-4">
          <SocialLink platform="github" href="https://github.com" />
          <SocialLink platform="linkedin" href="https://linkedin.com" />
          <SocialLink platform="twitter" href="https://twitter.com" />
          <SocialLink platform="email" href="mailto:hello@example.com" />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Icons:</strong> 20px (w-5 h-5) on 8-point grid<br />
          <strong>Touch target:</strong> 40×40px (w-10 h-10)<br />
          <strong>Colors:</strong> gray-700 → blue-600<br />
          <strong>Tooltip:</strong> bg-gray-900, text-xs, px-2 py-1, rounded-sm (4px)<br />
          <strong>Transitions:</strong> 150ms ease-out (duration-fast)<br />
          <strong>Focus ring:</strong> 2px blue-600 with 2px offset
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features and design system compliance details.',
      },
    },
  },
};

// Story 13: Interactive (Playground)
export const Interactive: Story = {
  args: {
    platform: 'github',
    href: 'https://github.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different platforms and custom labels.',
      },
    },
  },
};
