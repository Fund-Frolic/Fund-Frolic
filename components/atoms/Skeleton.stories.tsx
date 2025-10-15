/**
 * Skeleton Atom Stories
 *
 * Content loading placeholder with warm aesthetic and subtle animations.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Content loading placeholder with warm aesthetic. Background: gray-200 (warm gray). Animation: Pulse 50% → 100% opacity (subtle). Variants: rectangle, circle, text. Respects prefers-reduced-motion. Accessibility: aria-busy="true", aria-live="polite".',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangle', 'circle', 'text'],
      description: 'Skeleton shape',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation style',
    },
    width: {
      control: 'text',
      description: 'Width (CSS value or number in px)',
    },
    height: {
      control: 'text',
      description: 'Height (CSS value or number in px)',
    },
    lines: {
      control: 'number',
      description: 'Number of lines (text variant only)',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    variant: 'rectangle',
    width: '200px',
    height: '100px',
  },
};

// Story 2: All Variants
export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Rectangle (Default)</p>
        <Skeleton variant="rectangle" width="300px" height="120px" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Circle</p>
        <Skeleton variant="circle" width="80px" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Text (3 lines)</p>
        <Skeleton variant="text" lines={3} className="max-w-md" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three variants: rectangle (cards, images), circle (avatars), text (paragraphs with varying widths).',
      },
    },
  },
};

// Story 3: All Animations
export const AllAnimations: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Pulse (Default)</p>
        <Skeleton animation="pulse" width="300px" height="100px" />
        <p className="text-xs text-gray-600 mt-2">Subtle opacity animation 50% → 100%</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Wave</p>
        <Skeleton animation="wave" width="300px" height="100px" />
        <p className="text-xs text-gray-600 mt-2">Gradient sweep from left to right</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">None</p>
        <Skeleton animation="none" width="300px" height="100px" />
        <p className="text-xs text-gray-600 mt-2">Static placeholder (no animation)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three animation styles: pulse (subtle opacity), wave (gradient sweep), none (static). All respect reduced motion preferences.',
      },
    },
  },
};

// Story 4: Text Loading Variants
export const TextLoadingVariants: Story = {
  args: {},
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Single line (heading)</p>
        <Skeleton variant="text" lines={1} className="max-w-xs" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Paragraph (3 lines)</p>
        <Skeleton variant="text" lines={3} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Long content (5 lines)</p>
        <Skeleton variant="text" lines={5} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Article (8 lines)</p>
        <Skeleton variant="text" lines={8} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text variant with different line counts. Last line is 60% width, alternating lines are 80%/100% for realistic appearance.',
      },
    },
  },
};

// Story 5: Avatar Sizes
export const AvatarSizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-end gap-6 p-8">
      <div className="text-center">
        <Skeleton variant="circle" width="32px" />
        <p className="text-xs text-gray-600 mt-2">32px</p>
      </div>
      <div className="text-center">
        <Skeleton variant="circle" width="40px" />
        <p className="text-xs text-gray-600 mt-2">40px</p>
      </div>
      <div className="text-center">
        <Skeleton variant="circle" width="48px" />
        <p className="text-xs text-gray-600 mt-2">48px</p>
      </div>
      <div className="text-center">
        <Skeleton variant="circle" width="64px" />
        <p className="text-xs text-gray-600 mt-2">64px</p>
      </div>
      <div className="text-center">
        <Skeleton variant="circle" width="96px" />
        <p className="text-xs text-gray-600 mt-2">96px</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circle variant for avatar loading states. Various sizes from 32px to 96px.',
      },
    },
  },
};

// Story 6: Card Loading State
export const CardLoadingState: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-4xl">
      {/* Card 1 */}
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <Skeleton variant="rectangle" width="100%" height="200px" className="mb-4" />
        <Skeleton variant="text" lines={1} className="max-w-xs mb-2" />
        <Skeleton variant="text" lines={3} />
      </div>

      {/* Card 2 */}
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <Skeleton variant="rectangle" width="100%" height="200px" className="mb-4" />
        <Skeleton variant="text" lines={1} className="max-w-xs mb-2" />
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Project card loading state with image placeholder and text lines.',
      },
    },
  },
};

// Story 7: Profile Loading
export const ProfileLoading: Story = {
  args: {},
  render: () => (
    <div className="max-w-md p-8">
      <div className="bg-white border border-gray-200 rounded-md p-6">
        {/* Header with avatar */}
        <div className="flex items-start gap-4 mb-6">
          <Skeleton variant="circle" width="64px" />
          <div className="flex-1">
            <Skeleton variant="text" lines={1} className="max-w-xs mb-2" />
            <Skeleton variant="text" lines={1} className="max-w-[200px]" />
          </div>
        </div>

        {/* Bio */}
        <Skeleton variant="text" lines={4} className="mb-6" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Skeleton variant="rectangle" width="100%" height="60px" />
          </div>
          <div>
            <Skeleton variant="rectangle" width="100%" height="60px" />
          </div>
          <div>
            <Skeleton variant="rectangle" width="100%" height="60px" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile page loading state with avatar, name, bio, and stats placeholders.',
      },
    },
  },
};

// Story 8: Testimonial Loading
export const TestimonialLoading: Story = {
  args: {},
  render: () => (
    <div className="max-w-2xl p-8">
      <div className="bg-white border border-gray-200 rounded-md p-6">
        {/* Quote */}
        <Skeleton variant="text" lines={4} className="mb-6" />

        {/* Author */}
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" width="48px" />
          <div className="flex-1">
            <Skeleton variant="text" lines={1} className="max-w-[150px] mb-1" />
            <Skeleton variant="text" lines={1} className="max-w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Testimonial card loading with quote text and author info placeholders.',
      },
    },
  },
};

// Story 9: List Loading
export const ListLoading: Story = {
  args: {},
  render: () => (
    <div className="max-w-2xl p-8 space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-md p-4 flex items-center gap-4"
        >
          <Skeleton variant="circle" width="40px" />
          <div className="flex-1">
            <Skeleton variant="text" lines={1} className="max-w-xs mb-1" />
            <Skeleton variant="text" lines={1} className="max-w-[250px]" />
          </div>
          <Skeleton variant="rectangle" width="80px" height="32px" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List of items loading with avatar, text, and action button placeholders.',
      },
    },
  },
};

// Story 10: Page Skeleton
export const PageSkeleton: Story = {
  args: {},
  render: () => (
    <div className="max-w-4xl p-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton variant="text" lines={1} className="max-w-md mb-4" />
        <Skeleton variant="text" lines={2} className="max-w-2xl" />
      </div>

      {/* Hero Image */}
      <Skeleton variant="rectangle" width="100%" height="400px" className="mb-8" />

      {/* Content columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Skeleton variant="text" lines={1} className="max-w-xs mb-4" />
          <Skeleton variant="text" lines={8} className="mb-6" />
          <Skeleton variant="text" lines={6} />
        </div>

        <div>
          <Skeleton variant="text" lines={1} className="max-w-[150px] mb-4" />
          <Skeleton variant="rectangle" width="100%" height="200px" className="mb-4" />
          <Skeleton variant="text" lines={3} />
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-3 gap-4">
        <Skeleton variant="rectangle" width="100%" height="150px" />
        <Skeleton variant="rectangle" width="100%" height="150px" />
        <Skeleton variant="rectangle" width="100%" height="150px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full page skeleton with header, hero image, content columns, and gallery. Good for Suspense fallback.',
      },
    },
  },
};

// Story 11: With Wave Animation
export const WithWaveAnimation: Story = {
  args: {},
  render: () => (
    <div className="max-w-2xl p-8">
      <div className="bg-white border border-gray-200 rounded-md p-6">
        <Skeleton
          variant="rectangle"
          width="100%"
          height="200px"
          animation="wave"
          className="mb-4"
        />
        <Skeleton variant="text" lines={1} animation="wave" className="max-w-xs mb-2" />
        <Skeleton variant="text" lines={3} animation="wave" />

        <div className="mt-6 flex items-center gap-3">
          <Skeleton variant="circle" width="48px" animation="wave" />
          <div className="flex-1">
            <Skeleton variant="text" lines={1} animation="wave" className="max-w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card loading with wave animation (gradient sweep). Alternative to pulse for variety.',
      },
    },
  },
};

// Story 12: Accessibility Demo
export const AccessibilityDemo: Story = {
  args: {},
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>aria-busy="true"</strong> - Announces loading state to screen readers</li>
          <li>✅ <strong>aria-live="polite"</strong> - Updates announced when content loads</li>
          <li>✅ <strong>role="status"</strong> - Identifies as status indicator</li>
          <li>✅ <strong>Reduced motion</strong> - No animation if user prefers reduced motion</li>
          <li>✅ <strong>Warm aesthetic</strong> - gray-200 maintains design system warmth</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Reduced Motion Support
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          If you have "Reduce motion" enabled in your OS accessibility settings,
          all skeleton animations will be disabled automatically.
        </p>
        <div className="space-y-4">
          <Skeleton variant="rectangle" width="100%" height="100px" />
          <Skeleton variant="text" lines={3} />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Warm gray:</strong> gray-200 (#EAEAE7) maintains aesthetic<br />
          <strong>Subtle pulse:</strong> 50% → 100% opacity (not 0% → 100%)<br />
          <strong>Proper radius:</strong> rounded-md for rectangles, rounded-full for circles<br />
          <strong>8-point grid:</strong> All dimensions aligned to spacing scale
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
    variant: 'rectangle',
    animation: 'pulse',
    width: '300px',
    height: '150px',
    lines: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test variant, animation, dimensions, and line count.',
      },
    },
  },
};
