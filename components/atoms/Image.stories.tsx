/**
 * Image Component Stories
 *
 * next/image wrapper using design system (gray-200 skeleton, border radius tokens, 8-point grid).
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Image } from './Image';

const meta = {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'next/image wrapper using design system. Loading skeleton: gray-200. Border radius: all design system tokens (sm/md/lg/xl = 4px/8px/12px/16px, 8-point grid aligned). Caption: Text component with mt-2 (8px). Semantic HTML: figure/figcaption.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['16/9', '4/3', '1/1', '3/2'],
      description: 'Aspect ratio',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius',
    },
    caption: {
      control: 'text',
      description: 'Optional caption text',
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=450&fit=crop',
    alt: 'Modern workspace with laptop',
    aspectRatio: '16/9',
    rounded: 'md',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

// Story 2: All Aspect Ratios
export const AllAspectRatios: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8 max-w-4xl">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">16:9 (Video)</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=450&fit=crop"
          alt="16:9 aspect ratio"
          aspectRatio="16/9"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">4:3 (Standard)</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop"
          alt="4:3 aspect ratio"
          aspectRatio="4/3"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">1:1 (Square)</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=800&fit=crop"
          alt="1:1 aspect ratio"
          aspectRatio="1/1"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">3:2 (Classic)</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=533&fit=crop"
          alt="3:2 aspect ratio"
          aspectRatio="3/2"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Four aspect ratios: 16:9 (video/widescreen), 4:3 (standard), 1:1 (square/Instagram), 3:2 (classic photography). Uses CSS aspect-ratio for layout stability.',
      },
    },
  },
};

// Story 3: All Rounded Options
export const AllRoundedOptions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-8 max-w-6xl">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">None (0px)</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop"
          alt="No border radius"
          aspectRatio="4/3"
          rounded="none"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Small (4px)</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop"
          alt="Small border radius"
          aspectRatio="4/3"
          rounded="sm"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Medium (8px) [Default]</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop"
          alt="Medium border radius"
          aspectRatio="4/3"
          rounded="md"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Large (12px)</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop"
          alt="Large border radius"
          aspectRatio="4/3"
          rounded="lg"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">X-Large (16px)</p>
        <Image
          src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop"
          alt="X-large border radius"
          aspectRatio="4/3"
          rounded="xl"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Full (9999px)</p>
        <Image
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
          alt="Full border radius"
          aspectRatio="1/1"
          rounded="full"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Six border radius options from design system: none (0px), sm (4px), md (8px - default), lg (12px), xl (16px), full (9999px). All values are 8-point grid aligned (multiples of 4px).',
      },
    },
  },
};

// Story 4: With Caption
export const WithCaption: Story = {
  render: () => (
    <div className="max-w-3xl p-8 space-y-8">
      <Image
        src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&h=675&fit=crop"
        alt="Austin Power Alert dashboard"
        aspectRatio="16/9"
        caption="Austin Power Alert dashboard showing real-time grid status during Winter Storm Uri. Built with Next.js and Supabase."
      />

      <Image
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
        alt="Team member profile"
        aspectRatio="1/1"
        rounded="lg"
        caption="Logan Miller - Lead Designer & Developer"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Images with captions. Wraps in <figure> with <figcaption> for semantic HTML. Caption uses Text component (caption variant) with mt-2 (8px, 8-point grid aligned).',
      },
    },
  },
};

// Story 5: Case Study Images
export const CaseStudyImages: Story = {
  render: () => (
    <div className="max-w-4xl p-8 space-y-12">
      <div>
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
          Hero Screenshot
        </h3>
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=788&fit=crop"
          alt="Application dashboard overview"
          aspectRatio="16/9"
          rounded="lg"
          caption="Main dashboard view showing real-time data visualization and monitoring capabilities."
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Mobile View</h4>
          <Image
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop"
            alt="Mobile responsive design"
            aspectRatio="3/2"
            rounded="lg"
            caption="Responsive layout optimized for mobile devices."
          />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Desktop View</h4>
          <Image
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop"
            alt="Desktop interface"
            aspectRatio="3/2"
            rounded="lg"
            caption="Full desktop experience with expanded navigation."
          />
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
          Design Process
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=400&fit=crop"
            alt="Wireframes"
            aspectRatio="1/1"
            caption="Initial wireframes"
          />
          <Image
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop"
            alt="High-fidelity mockups"
            aspectRatio="1/1"
            caption="Hi-fi mockups"
          />
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop"
            alt="Final implementation"
            aspectRatio="1/1"
            caption="Live implementation"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Realistic case study layout with hero image, mobile/desktop views, and design process gallery. Shows various aspect ratios and captions in context.',
      },
    },
  },
};

// Story 6: On Warm Background
export const OnWarmBackground: Story = {
  render: () => (
    <div className="bg-gray-50 p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h2 className="font-display text-3xl font-semibold text-gray-900 mb-6">
            Featured Case Study
          </h2>

          <div className="bg-white p-8 rounded-md shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop"
              alt="Project dashboard"
              aspectRatio="16/9"
              rounded="lg"
              caption="Austin Power Alert - Real-time power grid monitoring during extreme weather events."
            />

            <div className="mt-8 grid grid-cols-3 gap-4">
              <Image
                src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=400&fit=crop"
                alt="Tech detail 1"
                aspectRatio="1/1"
                rounded="md"
              />
              <Image
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop"
                alt="Tech detail 2"
                aspectRatio="1/1"
                rounded="md"
              />
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop"
                alt="Tech detail 3"
                aspectRatio="1/1"
                rounded="md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Images in realistic portfolio context on warm gray-50 background (#FAF7F5). Loading skeleton uses gray-200 (design system token) to maintain professional warmth. All border radius values from design system.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 7: Interactive (Playground)
export const Interactive: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=450&fit=crop',
    alt: 'Example image',
    aspectRatio: '16/9',
    rounded: 'md',
    caption: undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different aspect ratios, border radius, and captions.',
      },
    },
  },
};
