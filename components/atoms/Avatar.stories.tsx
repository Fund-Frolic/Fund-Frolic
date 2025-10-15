/**
 * Avatar Component Stories
 *
 * User photos with warm fallback states.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'User photos with warm fallback states. Circular design feels friendly and human. Uses blue-100 background for warm, brand-consistent placeholders.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Avatar shape',
    },
    ring: {
      control: 'boolean',
      description: 'Show ring around avatar',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: "User's profile photo",
    size: 'md',
  },
};

// Story 2: All Sizes
export const AllSizes: Story = {
  args: { alt: "User" },
  render: () => (
    <div className="flex items-end gap-6 p-8">
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User"
          size="xs"
        />
        <p className="text-xs text-gray-600 mt-2">xs<br />24×24px</p>
      </div>
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User"
          size="sm"
        />
        <p className="text-xs text-gray-600 mt-2">sm<br />32×32px</p>
      </div>
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User"
          size="md"
        />
        <p className="text-xs text-gray-600 mt-2">md<br />40×40px</p>
      </div>
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User"
          size="lg"
        />
        <p className="text-xs text-gray-600 mt-2">lg<br />48×48px</p>
      </div>
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User"
          size="xl"
        />
        <p className="text-xs text-gray-600 mt-2">xl<br />64×64px</p>
      </div>
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User"
          size="2xl"
        />
        <p className="text-xs text-gray-600 mt-2">2xl<br />96×96px</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Six sizes aligned to 8-point grid: xs (24px), sm (32px), md (40px), lg (48px), xl (64px), 2xl (96px).',
      },
    },
  },
};

// Story 3: Shapes
export const Shapes: Story = {
  args: { alt: "User" },
  render: () => (
    <div className="flex gap-8 p-8">
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User"
          size="xl"
          shape="circle"
        />
        <p className="text-sm text-gray-600 mt-3">Circle (Default)<br />rounded-full</p>
      </div>
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User"
          size="xl"
          shape="square"
        />
        <p className="text-sm text-gray-600 mt-3">Square<br />rounded-md (8px)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two shapes: circle (rounded-full, friendly/human) and square (rounded-md/8px, consistent with design system).',
      },
    },
  },
};

// Story 4: Fallback Initials
export const FallbackInitials: Story = {
  args: { alt: "User", fallback: "LM" },
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <div className="text-center">
        <Avatar alt="Logan Miller" fallback="LM" size="lg" />
        <p className="text-xs text-gray-600 mt-2">LM</p>
      </div>
      <div className="text-center">
        <Avatar alt="Alex Brown" fallback="AB" size="lg" />
        <p className="text-xs text-gray-600 mt-2">AB</p>
      </div>
      <div className="text-center">
        <Avatar alt="Jane Doe" fallback="JD" size="lg" />
        <p className="text-xs text-gray-600 mt-2">JD</p>
      </div>
      <div className="text-center">
        <Avatar alt="Sam" fallback="S" size="lg" />
        <p className="text-xs text-gray-600 mt-2">S</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fallback initials (1-2 characters) on warm blue-100 background with blue-700 text. Not cold gray—maintains brand warmth.',
      },
    },
  },
};

// Story 5: Fallback Icon
export const FallbackIcon: Story = {
  args: { alt: "Anonymous user" },
  render: () => (
    <div className="flex gap-4 p-8">
      <Avatar alt="Anonymous user" size="xs" />
      <Avatar alt="Anonymous user" size="sm" />
      <Avatar alt="Anonymous user" size="md" />
      <Avatar alt="Anonymous user" size="lg" />
      <Avatar alt="Anonymous user" size="xl" />
      <Avatar alt="Anonymous user" size="2xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fallback user icon when no initials provided. Icon scales proportionally with avatar size.',
      },
    },
  },
};

// Story 6: With Ring
export const WithRing: Story = {
  args: { alt: "User with ring", ring: true },
  render: () => (
    <div className="flex gap-6 p-8">
      <div className="text-center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="User with ring"
          size="xl"
          ring
        />
        <p className="text-sm text-gray-600 mt-3">With Image</p>
      </div>
      <div className="text-center">
        <Avatar
          alt="Logan Miller"
          fallback="LM"
          size="xl"
          ring
        />
        <p className="text-sm text-gray-600 mt-3">With Initials</p>
      </div>
      <div className="text-center">
        <Avatar
          alt="Anonymous"
          size="xl"
          ring
        />
        <p className="text-sm text-gray-600 mt-3">With Icon</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ring variant (ring-2 ring-gray-200) adds subtle elevation. Useful for overlapping avatars or featured users.',
      },
    },
  },
};

// Story 7: On Warm Background
export const OnWarmBackground: Story = {
  args: { alt: "Team member" },
  render: () => (
    <div className="bg-gray-50 p-12 space-y-8">
      <div>
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
          Team Members
        </h3>

        <div className="bg-white p-6 rounded-md shadow-md space-y-4">
          <div className="flex items-center gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
              alt="Logan Miller"
              size="lg"
            />
            <div>
              <p className="font-semibold text-gray-900">Logan Miller</p>
              <p className="text-sm text-gray-600">Lead Designer & Developer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar
              alt="Alex Brown"
              fallback="AB"
              size="lg"
            />
            <div>
              <p className="font-semibold text-gray-900">Alex Brown</p>
              <p className="text-sm text-gray-600">Frontend Engineer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar
              alt="Jane Doe"
              fallback="JD"
              size="lg"
            />
            <div>
              <p className="font-semibold text-gray-900">Jane Doe</p>
              <p className="text-sm text-gray-600">UX Researcher</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-600 mb-3">Overlapping Avatars</p>
          <div className="flex -space-x-2">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
              alt="User 1"
              size="md"
              ring
            />
            <Avatar
              alt="User 2"
              fallback="AB"
              size="md"
              ring
            />
            <Avatar
              alt="User 3"
              fallback="JD"
              size="md"
              ring
            />
            <Avatar
              alt="User 4"
              fallback="SK"
              size="md"
              ring
            />
            <div className="h-10 w-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-medium ring-2 ring-white">
              +5
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars in realistic contexts: team member list and overlapping avatar stack. Notice warm blue-100 fallbacks maintain design system aesthetic.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 8: Interactive (Playground)
export const Interactive: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: "User's profile photo",
    size: 'md',
    shape: 'circle',
    ring: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different sizes, shapes, and ring options. Remove src to see fallback states.',
      },
    },
  },
};
