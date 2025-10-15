/**
 * ThemeToggle Molecule Stories
 *
 * Dark mode toggle switch with smooth animations.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

const meta = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dark mode toggle switch. Container: bg-gray-200 (light) or bg-blue-600 (dark), rounded-full w-12 h-6. Toggle: bg-white w-5 h-5 circle, slides with 300ms transition. Icons: Sun (light), Moon (dark), 12px. Accessibility: role="switch", aria-checked, keyboard Space/Enter to toggle.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Current theme',
    },
    onToggle: {
      action: 'toggled',
      description: 'Toggle handler',
    },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Light Mode
export const LightMode: Story = {
  args: {
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Light mode: bg-gray-200, sun icon, toggle on left.',
      },
    },
  },
};

// Story 2: Dark Mode
export const DarkMode: Story = {
  args: {
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark mode: bg-blue-600, moon icon, toggle on right.',
      },
    },
  },
};

// Story 3: Interactive Toggle
export const InteractiveToggle: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <span className="text-sm text-gray-700">
            Current theme: <strong>{theme}</strong>
          </span>
        </div>
        <p className="text-xs text-gray-600">
          Click to toggle between light and dark modes
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive toggle with state. Click to switch between modes and watch the smooth animation.',
      },
    },
  },
};

// Story 4: In Header
export const InHeader: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="font-display text-xl font-semibold text-gray-900">
            Logan's Portfolio
          </h1>

          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600">
              Projects
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-blue-600">
              Contact
            </a>

            <div className="border-l border-gray-200 pl-6 ml-2">
              <ThemeToggle
                theme={theme}
                onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              />
            </div>
          </nav>
        </div>
      </header>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle in header navigation. Separated from nav links with border.',
      },
    },
  },
};

// Story 5: Dark Header
export const DarkHeader: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    return (
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="font-display text-xl font-semibold text-white">
            Logan's Portfolio
          </h1>

          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-300 hover:text-white">
              Home
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">
              About
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">
              Projects
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">
              Contact
            </a>

            <div className="border-l border-gray-700 pl-6 ml-2">
              <ThemeToggle
                theme={theme}
                onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              />
            </div>
          </nav>
        </div>
      </header>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle in dark header. Toggle maintains visibility on dark backgrounds.',
      },
    },
  },
};

// Story 6: Settings Panel
export const SettingsPanel: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
      <div className="w-96 bg-white border border-gray-200 rounded-md p-6">
        <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">Dark Mode</p>
              <p className="text-xs text-gray-600">
                Toggle between light and dark themes
              </p>
            </div>
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">Notifications</p>
              <p className="text-xs text-gray-600">
                Receive email notifications
              </p>
            </div>
            <ThemeToggle theme="light" onToggle={() => {}} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Analytics</p>
              <p className="text-xs text-gray-600">
                Help improve our service
              </p>
            </div>
            <ThemeToggle theme="dark" onToggle={() => {}} />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle in settings panel with descriptive labels.',
      },
    },
  },
};

// Story 7: Mobile Menu
export const MobileMenu: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
      <div className="w-80 bg-white border border-gray-200 rounded-md">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-gray-900">
              Menu
            </h2>
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <a href="#" className="block py-2 text-base text-gray-900 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="block py-2 text-base text-gray-900 hover:text-blue-600">
            About
          </a>
          <a href="#" className="block py-2 text-base text-gray-900 hover:text-blue-600">
            Projects
          </a>
          <a href="#" className="block py-2 text-base text-gray-900 hover:text-blue-600">
            Contact
          </a>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Dark Mode</span>
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle in mobile drawer menu. Separated from nav items.',
      },
    },
  },
};

// Story 8: Animation Demo
export const AnimationDemo: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
      <div className="bg-gray-100 p-8 rounded-md">
        <p className="text-sm text-gray-700 mb-6">
          Click to see smooth 300ms animation
        </p>

        <div className="flex justify-center mb-6">
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <p>• Light mode: bg-gray-200, sun icon</p>
          <p>• Dark mode: bg-blue-600, moon icon</p>
          <p>• Toggle circle: bg-white, slides left/right</p>
          <p>• Animation: 300ms ease-out (smooth)</p>
          <p>• Icons: 12px (w-3 h-3)</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of smooth animation. Toggle slides with 300ms ease-out transition.',
      },
    },
  },
};

// Story 9: Multiple Instances
export const MultipleInstances: Story = {
  render: () => {
    const [theme1, setTheme1] = useState<'light' | 'dark'>('light');
    const [theme2, setTheme2] = useState<'light' | 'dark'>('dark');
    const [theme3, setTheme3] = useState<'light' | 'dark'>('light');

    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-4">
          <ThemeToggle
            theme={theme1}
            onToggle={() => setTheme1(theme1 === 'light' ? 'dark' : 'light')}
          />
          <span className="text-sm text-gray-700">Toggle 1: {theme1}</span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle
            theme={theme2}
            onToggle={() => setTheme2(theme2 === 'light' ? 'dark' : 'light')}
          />
          <span className="text-sm text-gray-700">Toggle 2: {theme2}</span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle
            theme={theme3}
            onToggle={() => setTheme3(theme3 === 'light' ? 'dark' : 'light')}
          />
          <span className="text-sm text-gray-700">Toggle 3: {theme3}</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent toggle instances. Each maintains its own state.',
      },
    },
  },
};

// Story 10: Keyboard Navigation Demo
export const KeyboardNavigation: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
      <div className="bg-gray-100 p-8 rounded-md">
        <p className="text-sm text-gray-700 mb-6">
          Press Tab to focus, then Space or Enter to toggle
        </p>

        <div className="flex justify-center mb-6">
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <p>• Tab: Focus the toggle</p>
          <p>• Space: Toggle theme</p>
          <p>• Enter: Toggle theme</p>
          <p>• Focus ring: blue-600 with 2px offset</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Keyboard navigation demonstration. Tab to focus, Space/Enter to toggle.',
      },
    },
  },
};

// Story 11: Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
      <div className="max-w-2xl p-8 space-y-8">
        <div className="bg-gray-100 p-6 rounded-md">
          <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✅ <strong>role="switch"</strong> - Semantic switch for screen readers</li>
            <li>✅ <strong>aria-checked</strong> - Announces current state (true/false)</li>
            <li>✅ <strong>aria-label</strong> - "Toggle dark mode" for context</li>
            <li>✅ <strong>Screen reader text</strong> - "Switch to light/dark mode"</li>
            <li>✅ <strong>Keyboard navigation</strong> - Tab to focus, Space/Enter to toggle</li>
            <li>✅ <strong>Focus ring</strong> - blue-600 ring with 2px offset</li>
            <li>✅ <strong>Visual feedback</strong> - Icon changes (sun/moon)</li>
            <li>✅ <strong>Smooth animation</strong> - 300ms transition for visual clarity</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-md">
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            Try It Yourself
          </h4>
          <p className="text-sm text-gray-700 mb-4">
            This toggle is fully accessible via keyboard and screen readers.
            Tab to focus, then press Space or Enter to toggle.
          </p>

          <div className="flex items-center gap-4">
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <span className="text-sm text-gray-700">
              Current: <strong>{theme} mode</strong>
            </span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
          <h4 className="text-base font-semibold text-blue-900 mb-3">
            Design System Compliance
          </h4>
          <p className="text-sm text-blue-800">
            <strong>Container:</strong> w-12 h-6, rounded-full<br />
            <strong>Light mode:</strong> bg-gray-200<br />
            <strong>Dark mode:</strong> bg-blue-600 (brand color, not blue)<br />
            <strong>Toggle circle:</strong> w-5 h-5, bg-white, shadow-sm<br />
            <strong>Icons:</strong> Sun/Moon, w-3 h-3 (12px)<br />
            <strong>Animation:</strong> 300ms ease-out (duration-base)<br />
            <strong>Focus ring:</strong> 2px blue-600 with 2px offset
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features and design system compliance details.',
      },
    },
  },
};

// Story 12: Interactive (Playground)
export const Interactive: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(args.theme);

    return (
      <ThemeToggle
        {...args}
        theme={theme}
        onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
    );
  },
  args: {
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - toggle to test animations and states.',
      },
    },
  },
};
