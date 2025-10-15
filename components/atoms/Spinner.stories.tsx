/**
 * Spinner Atom Stories
 *
 * Loading indicator with motion-safe support and color inheritance.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading indicator using SVG circle with stroke animation. Color: currentColor (inherits). Animation: 360deg rotation, 1s linear infinite. Motion-safe: Static when user prefers reduced motion. Sizes: xs (12px) to xl (32px). Accessibility: role="status", aria-live="polite".',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spinner size',
    },
    label: {
      control: 'text',
      description: 'Screen reader label',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    size: 'md',
  },
};

// Story 2: All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-8 p-8">
      <div className="text-center">
        <Spinner size="xs" />
        <p className="text-xs text-gray-600 mt-2">xs (12px)</p>
      </div>
      <div className="text-center">
        <Spinner size="sm" />
        <p className="text-xs text-gray-600 mt-2">sm (16px)</p>
      </div>
      <div className="text-center">
        <Spinner size="md" />
        <p className="text-xs text-gray-600 mt-2">md (20px) [Default]</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-xs text-gray-600 mt-2">lg (24px)</p>
      </div>
      <div className="text-center">
        <Spinner size="xl" />
        <p className="text-xs text-gray-600 mt-2">xl (32px)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Five sizes from xs (12px) to xl (32px). All use 1s linear rotation animation (respects motion preferences).',
      },
    },
  },
};

// Story 3: Color Inheritance
export const ColorInheritance: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="flex items-center gap-3">
        <div className="text-gray-900">
          <Spinner size="md" />
        </div>
        <p className="text-sm text-gray-700">Neutral (default text color)</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-blue-600">
          <Spinner size="md" />
        </div>
        <p className="text-sm text-gray-700">Terracotta-600 (primary color)</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-gold-600">
          <Spinner size="md" />
        </div>
        <p className="text-sm text-gray-700">Sage-600 (accent color)</p>
      </div>

      <div className="flex items-center gap-3 bg-blue-600 p-3 rounded-md">
        <div className="text-white">
          <Spinner size="md" />
        </div>
        <p className="text-sm text-white">White (on terracotta background)</p>
      </div>

      <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-md">
        <div className="text-gray-50">
          <Spinner size="md" />
        </div>
        <p className="text-sm text-gray-50">Neutral-50 (on dark background)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner uses currentColor, so it inherits text color from parent. Works with any design system color.',
      },
    },
  },
};

// Story 4: In Button Loading States
export const InButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      {/* Primary button loading */}
      <button
        disabled
        className="inline-flex items-center gap-2 h-10 px-4 bg-blue-600 text-white rounded-md font-medium opacity-75 cursor-not-allowed"
      >
        <Spinner size="sm" />
        <span>Loading...</span>
      </button>

      {/* Secondary button loading */}
      <button
        disabled
        className="inline-flex items-center gap-2 h-10 px-4 bg-white border border-gray-300 text-gray-900 rounded-md font-medium opacity-75 cursor-not-allowed"
      >
        <Spinner size="sm" />
        <span>Processing...</span>
      </button>

      {/* Ghost button loading */}
      <button
        disabled
        className="inline-flex items-center gap-2 h-10 px-4 text-blue-600 rounded-md font-medium opacity-75 cursor-not-allowed"
      >
        <Spinner size="sm" />
        <span>Sending...</span>
      </button>

      {/* Icon-only button loading */}
      <button
        disabled
        className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-md opacity-75 cursor-not-allowed"
      >
        <Spinner size="sm" />
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner inside button loading states. Uses currentColor to match button text color automatically.',
      },
    },
  },
};

// Story 5: Page Loading
export const PageLoading: Story = {
  render: () => (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50 p-8">
      <Spinner size="xl" className="text-blue-600" />
      <p className="text-lg font-medium text-gray-900 mt-6">Loading page content...</p>
      <p className="text-sm text-gray-600 mt-2">Please wait while we fetch your data</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-page loading state with large spinner and descriptive text. Good for Suspense fallbacks.',
      },
    },
  },
};

// Story 6: Inline with Text
export const InlineWithText: Story = {
  render: () => (
    <div className="max-w-md p-8 space-y-6">
      <p className="text-base text-gray-900 flex items-center gap-2">
        <Spinner size="sm" className="text-blue-600" />
        <span>Uploading file...</span>
      </p>

      <p className="text-base text-gray-900 flex items-center gap-2">
        <Spinner size="sm" className="text-gold-600" />
        <span>Saving changes...</span>
      </p>

      <p className="text-sm text-gray-600 flex items-center gap-2">
        <Spinner size="xs" />
        <span>Syncing with server...</span>
      </p>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
        <p className="text-sm text-blue-900 flex items-center gap-2">
          <Spinner size="sm" className="text-blue-600" />
          <span>Processing your request. This may take a few moments.</span>
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner inline with text content. Small sizes (xs, sm) work well for inline loading states.',
      },
    },
  },
};

// Story 7: Card Loading States
export const CardLoadingStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-4xl">
      {/* Loading card 1 */}
      <div className="bg-white border border-gray-200 rounded-md p-6 flex flex-col items-center justify-center h-48">
        <Spinner size="lg" className="text-blue-600" />
        <p className="text-sm text-gray-600 mt-4">Loading project details...</p>
      </div>

      {/* Loading card 2 */}
      <div className="bg-white border border-gray-200 rounded-md p-6 flex flex-col items-center justify-center h-48">
        <Spinner size="lg" className="text-gold-600" />
        <p className="text-sm text-gray-600 mt-4">Fetching analytics...</p>
      </div>

      {/* Loading card 3 (compact) */}
      <div className="bg-white border border-gray-200 rounded-md p-4">
        <div className="flex items-center gap-3">
          <Spinner size="md" className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">Loading...</p>
            <p className="text-xs text-gray-600">Please wait</p>
          </div>
        </div>
      </div>

      {/* Loading card 4 (minimal) */}
      <div className="bg-white border border-gray-200 rounded-md p-4 flex items-center justify-center">
        <Spinner size="md" className="text-gray-500" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states for card components. Various layouts and sizes depending on card context.',
      },
    },
  },
};

// Story 8: Form Submission
export const FormSubmission: Story = {
  render: () => (
    <div className="max-w-md p-8">
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Contact Form
        </h3>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value="Logan"
              disabled
              className="w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value="logan@example.com"
              disabled
              className="w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value="This is a test message..."
              disabled
              rows={3}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed resize-none"
            />
          </div>
        </div>

        <button
          disabled
          className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 bg-blue-600 text-white rounded-md font-medium opacity-75 cursor-not-allowed"
        >
          <Spinner size="sm" />
          <span>Sending message...</span>
        </button>

        <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded-md">
          <p className="text-xs text-blue-800 flex items-center gap-2">
            <Spinner size="xs" className="text-blue-600" />
            <span>Your message is being delivered. Please don't close this window.</span>
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form submission loading state with disabled inputs and loading button. Includes status message with spinner.',
      },
    },
  },
};

// Story 9: Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>role="status"</strong> - Announces loading state to screen readers</li>
          <li>✅ <strong>aria-live="polite"</strong> - Updates announced when complete</li>
          <li>✅ <strong>aria-label</strong> - Customizable screen reader text</li>
          <li>✅ <strong>Reduced motion</strong> - Static spinner if user prefers reduced motion</li>
          <li>✅ <strong>Color contrast</strong> - Inherits parent color for flexibility</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Reduced Motion Support
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          If you have "Reduce motion" enabled in your OS accessibility settings,
          the spinner will appear static instead of rotating. This prevents
          discomfort for users with vestibular disorders.
        </p>
        <div className="flex items-center gap-4">
          <Spinner size="lg" className="text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">Loading content</p>
            <p className="text-xs text-gray-600">Animation respects motion preferences</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Testing Reduced Motion
        </h4>
        <p className="text-sm text-blue-800">
          <strong>macOS:</strong> System Preferences → Accessibility → Display → Reduce motion<br />
          <strong>Windows:</strong> Settings → Ease of Access → Display → Show animations<br />
          <strong>Browser DevTools:</strong> Emulate CSS media feature prefers-reduced-motion
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including screen reader support and reduced motion compliance.',
      },
    },
  },
};

// Story 10: Interactive (Playground)
export const Interactive: Story = {
  args: {
    size: 'md',
    label: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test size and label.',
      },
    },
  },
};
