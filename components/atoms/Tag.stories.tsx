/**
 * Tag Component Stories
 *
 * Technology tags using design system (terracotta + sage + neutral).
 * 8-point grid spacing, variant-specific hover colors, 300ms transitions.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tag } from './Tag';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Technology tags using design system. Colors: terracotta/sage/neutral scales. Spacing: gap-2 (8px), heights 24px/32px (8-point grid). Remove button: variant-specific hover colors, 300ms transitions. Icon: 12px.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'blue', 'gold'],
      description: 'Color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Tag size',
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    children: 'Next.js',
    variant: 'default',
  },
};

// Story 2: All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-8">
      <Tag variant="default">Default</Tag>
      <Tag variant="blue">Terracotta</Tag>
      <Tag variant="gold">Sage</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three variants using design system colors: default (gray-100 bg, gray-200 border), terracotta (blue-50 bg, blue-200 border), sage (gold-50 bg, gold-200 border). All maintain professional warmth.',
      },
    },
  },
};

// Story 3: All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-8">
      <div className="text-center">
        <Tag size="sm">Small</Tag>
        <p className="text-xs text-gray-600 mt-2">24px height<br />8px H × 4px V</p>
      </div>
      <div className="text-center">
        <Tag size="md">Medium</Tag>
        <p className="text-xs text-gray-600 mt-2">32px height<br />12px H × 8px V</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two sizes, 8-point grid aligned: sm (24px height, 8px H × 4px V padding), md (32px height, 12px H × 8px V padding). Gap between text and remove button: 8px (gap-2).',
      },
    },
  },
};

// Story 4: Removable
export const Removable: Story = {
  render: () => {
    const RemovableExample = () => {
      const [tags, setTags] = useState([
        'Next.js',
        'TypeScript',
        'Tailwind',
        'Storybook',
      ]);

      const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
      };

      return (
        <div className="p-8">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Click X to remove tags:
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Tag
                key={tag}
                variant="default"
                removable
                onRemove={() => removeTag(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
          {tags.length === 0 && (
            <p className="text-sm text-gray-500 mt-4">
              All tags removed! Refresh to reset.
            </p>
          )}
        </div>
      );
    };

    return <RemovableExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Removable tags with X button (12px icon, 4px padding). Click X to remove tags. Button hover uses variant-specific design system colors (gray-200/blue-200/gold-200) with 300ms transitions.',
      },
    },
  },
};

// Story 5: Technology Stack
export const TechnologyStack: Story = {
  render: () => (
    <div className="max-w-2xl p-8 space-y-6">
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Frontend</h4>
        <div className="flex flex-wrap gap-2">
          <Tag variant="blue">Next.js 15</Tag>
          <Tag variant="blue">React 19</Tag>
          <Tag variant="blue">TypeScript</Tag>
          <Tag variant="blue">Tailwind v4</Tag>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Design & Testing</h4>
        <div className="flex flex-wrap gap-2">
          <Tag variant="gold">Storybook 9</Tag>
          <Tag variant="gold">Figma</Tag>
          <Tag variant="gold">Vitest</Tag>
          <Tag variant="gold">Playwright</Tag>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Backend & Infrastructure</h4>
        <div className="flex flex-wrap gap-2">
          <Tag variant="default">Supabase</Tag>
          <Tag variant="default">PostgreSQL</Tag>
          <Tag variant="default">Vercel</Tag>
          <Tag variant="default">GitHub Actions</Tag>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <p className="text-sm font-semibold text-gray-900 mb-2">Color Strategy</p>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Terracotta:</strong> Primary/featured technologies</li>
          <li><strong>Sage:</strong> Secondary/design tools</li>
          <li><strong>Default:</strong> Infrastructure/supporting technologies</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world technology stack example. Use terracotta for primary tech, sage for secondary, default for infrastructure.',
      },
    },
  },
};

// Story 6: Removable with Variants
export const RemovableWithVariants: Story = {
  render: () => {
    const RemovableVariantsExample = () => {
      const [featured, setFeatured] = useState(['React', 'TypeScript']);
      const [skills, setSkills] = useState(['Design Systems', 'Accessibility']);
      const [tools, setTools] = useState(['Figma', 'Storybook']);

      return (
        <div className="max-w-2xl p-8 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Featured Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {featured.map(tag => (
                <Tag
                  key={tag}
                  variant="blue"
                  removable
                  onRemove={() => setFeatured(featured.filter(t => t !== tag))}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Core Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map(tag => (
                <Tag
                  key={tag}
                  variant="blue"
                  removable
                  onRemove={() => setSkills(skills.filter(t => t !== tag))}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Tools</h4>
            <div className="flex flex-wrap gap-2">
              {tools.map(tag => (
                <Tag
                  key={tag}
                  variant="default"
                  removable
                  onRemove={() => setTools(tools.filter(t => t !== tag))}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      );
    };

    return <RemovableVariantsExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Removable tags with all three variants. Demonstrates how different colors can organize categories while maintaining removal functionality.',
      },
    },
  },
};

// Story 7: On Warm Background
export const OnWarmBackground: Story = {
  render: () => (
    <div className="bg-gray-50 p-12 space-y-8">
      <div>
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
          Austin Power Alert
        </h3>
        <p className="text-gray-700 mb-4">
          Real-time power monitoring dashboard for Austin, Texas residents.
          Built with modern web technologies and design system principles.
        </p>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Tech Stack:</p>
            <div className="flex flex-wrap gap-2">
              <Tag variant="blue">Next.js</Tag>
              <Tag variant="blue">TypeScript</Tag>
              <Tag variant="blue">Tailwind</Tag>
              <Tag variant="gold">Supabase</Tag>
              <Tag variant="gold">PostgreSQL</Tag>
              <Tag variant="default">Vercel</Tag>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Skills Demonstrated:</p>
            <div className="flex flex-wrap gap-2">
              <Tag variant="default" size="sm">Real-time Data</Tag>
              <Tag variant="default" size="sm">API Integration</Tag>
              <Tag variant="default" size="sm">Responsive Design</Tag>
              <Tag variant="default" size="sm">Accessibility</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tags in realistic project context on warm gray-50 background (#FAF7F5). All design system tokens applied: terracotta/sage/neutral colors, 8-point grid spacing, proper border radius.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 8: Interactive (Playground)
export const Interactive: Story = {
  args: {
    children: 'Interactive Tag',
    variant: 'default',
    size: 'md',
    removable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different variants, sizes, and removable functionality.',
      },
    },
  },
};
