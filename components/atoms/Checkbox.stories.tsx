/**
 * Checkbox Component Stories
 *
 * Boolean selection using design system (blue-600 checked, 4px radius, 150ms transitions).
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';
import { Label } from './Label';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Boolean selection using design system. Checked: blue-600 (not blue). Rounded-sm (4px technical feel). Focus ring: blue-600 with offset. Supports indeterminate state with aria-checked="mixed". Touch target: 44×44px minimum.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (shows dash icon)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    id: 'default-checkbox',
  },
  decorators: [
    (Story) => (
      <label htmlFor="default-checkbox" className="flex items-center gap-2 cursor-pointer">
        <Story />
        <span className="text-sm text-gray-700">Subscribe to newsletter</span>
      </label>
    ),
  ],
};

// Story 2: All Sizes
export const AllSizes: Story = {
  args: { 'aria-label': 'Checkbox' },
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center gap-3">
        <label htmlFor="small-checkbox" className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="small-checkbox" size="sm" />
          <span className="text-sm text-gray-700">Small (16×16px)</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="medium-checkbox" className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="medium-checkbox" size="md" />
          <span className="text-sm text-gray-700">Medium (20×20px) [Default]</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="large-checkbox" className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="large-checkbox" size="lg" />
          <span className="text-sm text-gray-700">Large (24×24px)</span>
        </label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes: sm (16px), md (20px), lg (24px). Icons scale proportionally. Touch targets should be 44×44px minimum (add padding via label).',
      },
    },
  },
};

// Story 3: All States
export const AllStates: Story = {
  args: { 'aria-label': 'Checkbox' },
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Unchecked</p>
        <label htmlFor="unchecked" className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="unchecked" />
          <span className="text-sm text-gray-700">Not selected</span>
        </label>
        <p className="text-xs text-gray-500 mt-2">Border: gray-300, Background: white</p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Checked</p>
        <label htmlFor="checked" className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="checked" checked readOnly />
          <span className="text-sm text-gray-700">Selected</span>
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Background: blue-600 (design system, not blue), White checkmark
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Indeterminate</p>
        <label htmlFor="indeterminate" className="flex items-center gap-2 cursor-pointer">
          <Checkbox id="indeterminate" indeterminate readOnly />
          <span className="text-sm text-gray-700">Partially selected</span>
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Background: blue-600, White dash icon, aria-checked="mixed"
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Disabled (Unchecked)</p>
        <label htmlFor="disabled-unchecked" className="flex items-center gap-2">
          <Checkbox id="disabled-unchecked" disabled />
          <span className="text-sm text-gray-500">Cannot interact</span>
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Background: gray-100, Border: gray-300, Opacity: 50%
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Disabled (Checked)</p>
        <label htmlFor="disabled-checked" className="flex items-center gap-2">
          <Checkbox id="disabled-checked" checked disabled readOnly />
          <span className="text-sm text-gray-500">Cannot interact</span>
        </label>
        <p className="text-xs text-gray-500 mt-2">Opacity: 50%, maintains terracotta background</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All states: unchecked, checked, indeterminate, disabled (unchecked), disabled (checked). Notice blue-600 for checked states (design system warm color, not generic blue).',
      },
    },
  },
};

// Story 4: Interactive States
export const InteractiveStates: Story = {
  args: { 'aria-label': 'Checkbox' },
  render: () => {
    const InteractiveExample = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div className="p-8 space-y-4">
          <p className="text-sm font-medium text-gray-700">Click to toggle:</p>
          <label htmlFor="interactive" className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              id="interactive"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span className="text-sm text-gray-700">
              {checked ? 'Checked' : 'Unchecked'}
            </span>
          </label>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-xs text-gray-600">
              State: <code className="bg-gray-900 text-gray-100 px-1 rounded">{checked.toString()}</code>
            </p>
          </div>
        </div>
      );
    };

    return <InteractiveExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive checkbox with state management. Click to toggle between checked and unchecked. Hover to see border-gray-400 (unchecked). Focus to see blue-600 ring.',
      },
    },
  },
};

// Story 5: Indeterminate Example (Select All)
export const IndeterminateExample: Story = {
  args: { 'aria-label': 'Checkbox' },
  render: () => {
    const SelectAllExample = () => {
      const [items, setItems] = useState({
        item1: false,
        item2: false,
        item3: false,
      });

      const allChecked = Object.values(items).every(Boolean);
      const someChecked = Object.values(items).some(Boolean) && !allChecked;

      const handleSelectAll = () => {
        const newValue = !allChecked;
        setItems({
          item1: newValue,
          item2: newValue,
          item3: newValue,
        });
      };

      return (
        <div className="w-80 p-8 space-y-4">
          <div className="pb-3 border-b border-gray-200">
            <label htmlFor="select-all" className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="select-all"
                checked={allChecked}
                indeterminate={someChecked}
                onChange={handleSelectAll}
              />
              <span className="text-sm font-medium text-gray-700">Select All</span>
            </label>
          </div>

          <div className="space-y-3 pl-6">
            <label htmlFor="item1" className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="item1"
                checked={items.item1}
                onChange={(e) => setItems({ ...items, item1: e.target.checked })}
              />
              <span className="text-sm text-gray-700">Item 1</span>
            </label>

            <label htmlFor="item2" className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="item2"
                checked={items.item2}
                onChange={(e) => setItems({ ...items, item2: e.target.checked })}
              />
              <span className="text-sm text-gray-700">Item 2</span>
            </label>

            <label htmlFor="item3" className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="item3"
                checked={items.item3}
                onChange={(e) => setItems({ ...items, item3: e.target.checked })}
              />
              <span className="text-sm text-gray-700">Item 3</span>
            </label>
          </div>
        </div>
      );
    };

    return <SelectAllExample />;
  },
  parameters: {
    docs: {
      description: {
        story: '"Select All" pattern with indeterminate state. When some (but not all) items are selected, parent checkbox shows dash icon with aria-checked="mixed".',
      },
    },
  },
};

// Story 6: Form Example
export const FormExample: Story = {
  args: { 'aria-label': 'Checkbox' },
  render: () => {
    const FormExampleComponent = () => {
      const [formData, setFormData] = useState({
        newsletter: false,
        terms: false,
        marketing: false,
      });

      return (
        <div className="w-full max-w-md p-8">
          <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
            Account Setup
          </h3>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="newsletter-checkbox" className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  id="newsletter-checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Subscribe to newsletter</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Get design system insights delivered weekly
                  </p>
                </div>
              </label>
            </div>

            <div>
              <label htmlFor="terms-checkbox" className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  id="terms-checkbox"
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    I agree to the terms and conditions
                    <span className="text-blue-600 ml-1" aria-label="required">*</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Required to create an account
                  </p>
                </div>
              </label>
            </div>

            <div>
              <label htmlFor="marketing-checkbox" className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  id="marketing-checkbox"
                  checked={formData.marketing}
                  onChange={(e) => setFormData({ ...formData, marketing: e.target.checked })}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Receive marketing emails</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Product updates and special offers (optional)
                  </p>
                </div>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!formData.terms}
                className="w-full h-10 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-fast ease-out"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      );
    };

    return <FormExampleComponent />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Realistic account setup form with checkboxes for newsletter, terms (required), and marketing. Notice blue-600 required indicator and button disabled state.',
      },
    },
  },
};

// Story 7: Filter Controls
export const FilterControls: Story = {
  args: { 'aria-label': 'Checkbox' },
  render: () => {
    const FilterExample = () => {
      const [filters, setFilters] = useState({
        featured: false,
        webDev: true,
        design: false,
        opensource: true,
      });

      const activeCount = Object.values(filters).filter(Boolean).length;

      return (
        <div className="w-80 p-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Filter Projects</h4>
            <span className="text-xs text-gray-600">{activeCount} active</span>
          </div>

          <div className="space-y-3">
            <label htmlFor="featured-filter" className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="featured-filter"
                checked={filters.featured}
                onChange={(e) => setFilters({ ...filters, featured: e.target.checked })}
              />
              <span className="text-sm text-gray-700">Featured only</span>
            </label>

            <label htmlFor="webdev-filter" className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="webdev-filter"
                checked={filters.webDev}
                onChange={(e) => setFilters({ ...filters, webDev: e.target.checked })}
              />
              <span className="text-sm text-gray-700">Web Development</span>
            </label>

            <label htmlFor="design-filter" className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="design-filter"
                checked={filters.design}
                onChange={(e) => setFilters({ ...filters, design: e.target.checked })}
              />
              <span className="text-sm text-gray-700">Design Systems</span>
            </label>

            <label htmlFor="opensource-filter" className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="opensource-filter"
                checked={filters.opensource}
                onChange={(e) => setFilters({ ...filters, opensource: e.target.checked })}
              />
              <span className="text-sm text-gray-700">Open Source</span>
            </label>
          </div>
        </div>
      );
    };

    return <FilterExample />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter controls for project showcase. Shows active filter count and allows multiple selections. Use case: "Show featured only" or category filtering.',
      },
    },
  },
};

// Story 8: On Warm Background
export const OnWarmBackground: Story = {
  args: { 'aria-label': 'Checkbox' },
  render: () => (
    <div className="bg-gray-50 p-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
          Preferences
        </h3>

        <div className="space-y-4">
          <label htmlFor="pref1" className="flex items-center gap-3 cursor-pointer">
            <Checkbox id="pref1" checked readOnly />
            <span className="text-sm text-gray-700">Email notifications</span>
          </label>

          <label htmlFor="pref2" className="flex items-center gap-3 cursor-pointer">
            <Checkbox id="pref2" />
            <span className="text-sm text-gray-700">Desktop notifications</span>
          </label>

          <label htmlFor="pref3" className="flex items-center gap-3 cursor-pointer">
            <Checkbox id="pref3" checked readOnly />
            <span className="text-sm text-gray-700">Weekly digest</span>
          </label>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Checkboxes on warm gray-50 background (#FAF7F5). Terracotta-600 checked state provides visual hierarchy while maintaining professional warmth.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 9: Accessibility Pattern
export const AccessibilityPattern: Story = {
  args: { 'aria-label': 'Checkbox' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-6">
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="text-sm font-semibold text-gray-900 mb-2">Accessibility Features</p>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>Native input:</strong> Uses &lt;input type="checkbox"&gt; for proper semantics</li>
          <li><strong>Keyboard:</strong> Space key toggles state, Tab for navigation</li>
          <li><strong>Indeterminate:</strong> aria-checked="mixed" for screen readers</li>
          <li><strong>Label association:</strong> Wrapping label provides clickable area</li>
          <li><strong>Touch target:</strong> 44×44px minimum (via label padding)</li>
          <li><strong>Focus indicator:</strong> Visible ring-2 ring-blue-600 ring-offset-2</li>
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Try keyboard navigation:</p>
        <label htmlFor="accessible1" className="flex items-center gap-2 cursor-pointer p-2 -m-2">
          <Checkbox id="accessible1" />
          <span className="text-sm text-gray-700">First checkbox (Tab to focus, Space to toggle)</span>
        </label>

        <label htmlFor="accessible2" className="flex items-center gap-2 cursor-pointer p-2 -m-2">
          <Checkbox id="accessible2" indeterminate readOnly />
          <span className="text-sm text-gray-700">Indeterminate (aria-checked="mixed")</span>
        </label>

        <label htmlFor="accessible3" className="flex items-center gap-2 cursor-pointer p-2 -m-2">
          <Checkbox id="accessible3" disabled />
          <span className="text-sm text-gray-500">Disabled (cannot focus)</span>
        </label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features: native checkbox, keyboard support (Tab/Space), aria-checked for indeterminate, label association, 44×44px touch targets, visible focus ring.',
      },
    },
  },
};

// Story 10: Interactive (Playground)
export const Interactive: Story = {
  args: {
    id: 'interactive-playground',
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <label htmlFor="interactive-playground" className="flex items-center gap-2 cursor-pointer p-8">
        <Story />
        <span className="text-sm text-gray-700">Interactive checkbox</span>
      </label>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test size, checked, indeterminate, and disabled states.',
      },
    },
  },
};
