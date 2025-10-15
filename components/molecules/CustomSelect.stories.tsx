/**
 * CustomSelect Molecule Stories
 *
 * Fully custom dropdown with complete design system styling (React Aria-based).
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CustomSelect, SelectOption } from './CustomSelect';
import { Label } from '../atoms/Label';
import { useState } from 'react';

const meta = {
  title: 'Molecules/CustomSelect',
  component: CustomSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Fully custom dropdown using React Aria with complete design system styling. Unlike native Select, dropdown menu matches design system exactly. Selected: blue-50 bg with checkmark. Hover: gray-50 (warm). Transitions: 150ms ease-out. Shadow: lg (floating).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width',
    },
  },
} satisfies Meta<typeof CustomSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

// Story 1: Default
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    return (
      <div className="w-80">
        <CustomSelect
          options={basicOptions}
          value={value}
          onChange={setValue}
          placeholder="Select an option..."
        />
      </div>
    );
  },
};

// Story 2: All Sizes
export const AllSizes: Story = {
  render: () => {
    const [valueSm, setValueSm] = useState<string>();
    const [valueMd, setValueMd] = useState<string>();
    const [valueLg, setValueLg] = useState<string>();

    return (
      <div className="w-96 p-8 space-y-6">
        <div>
          <Label htmlFor="custom-sm">Small (32px)</Label>
          <CustomSelect
            id="custom-sm"
            options={basicOptions}
            value={valueSm}
            onChange={setValueSm}
            size="sm"
            placeholder="Select..."
          />
        </div>

        <div>
          <Label htmlFor="custom-md">Medium (40px) [Default]</Label>
          <CustomSelect
            id="custom-md"
            options={basicOptions}
            value={valueMd}
            onChange={setValueMd}
            size="md"
            placeholder="Select..."
          />
        </div>

        <div>
          <Label htmlFor="custom-lg">Large (48px)</Label>
          <CustomSelect
            id="custom-lg"
            options={basicOptions}
            value={valueLg}
            onChange={setValueLg}
            size="lg"
            placeholder="Select..."
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Three sizes: sm (32px), md (40px), lg (48px). Dropdown menu width matches trigger button.',
      },
    },
  },
};

// Story 3: States
export const States: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>();
    const [value2, setValue2] = useState<string>('option2');

    return (
      <div className="w-96 p-8 space-y-6">
        <div>
          <Label htmlFor="state-default">Default (Resting)</Label>
          <CustomSelect
            id="state-default"
            options={basicOptions}
            value={value1}
            onChange={setValue1}
          />
          <p className="text-xs text-gray-500 mt-1">Border: gray-300, ChevronDown icon</p>
        </div>

        <div>
          <Label htmlFor="state-selected">Selected</Label>
          <CustomSelect
            id="state-selected"
            options={basicOptions}
            value={value2}
            onChange={setValue2}
          />
          <p className="text-xs text-gray-500 mt-1">
            Shows selected value, dropdown shows blue-50 bg with checkmark
          </p>
        </div>

        <div>
          <Label htmlFor="state-error" className="text-blue-700">Error</Label>
          <CustomSelect
            id="state-error"
            options={basicOptions}
            error
          />
          <p className="text-xs text-blue-600 mt-1">
            Border: blue-700 (design system, not generic red)
          </p>
        </div>

        <div>
          <Label htmlFor="state-disabled" className="text-gray-500">Disabled</Label>
          <CustomSelect
            id="state-disabled"
            options={basicOptions}
            disabled
            placeholder="Cannot select..."
          />
          <p className="text-xs text-gray-500 mt-1">50% opacity, cursor-not-allowed</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All states: default, selected (blue-50 with checkmark), error (blue-700), disabled. Click to see dropdown styling.',
      },
    },
  },
};

// Story 4: Design System Dropdown
export const DesignSystemDropdown: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    const techOptions: SelectOption[] = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
    ];

    return (
      <div className="w-96 p-8">
        <Label htmlFor="design-dropdown">Technology</Label>
        <CustomSelect
          id="design-dropdown"
          options={techOptions}
          value={value}
          onChange={setValue}
          placeholder="Select a framework..."
        />

        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <p className="text-sm font-semibold text-gray-900 mb-2">Design System Features:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✅ Selected: blue-50 bg + blue-700 text</li>
            <li>✅ Hover: gray-50 (warm, not cold gray)</li>
            <li>✅ Checkmark icon for selected state</li>
            <li>✅ Shadow: lg (floating elevation)</li>
            <li>✅ Border: gray-200 (warm)</li>
            <li>✅ Transitions: 150ms ease-out</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Click to see dropdown with full design system styling. Notice warm gray-50 hover (not cold gray), blue-50 selected state, and checkmark icon.',
      },
    },
  },
};

// Story 5: With Disabled Options
export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>();

    const options: SelectOption[] = [
      { value: 'free', label: 'Free Plan' },
      { value: 'pro', label: 'Pro Plan' },
      { value: 'enterprise', label: 'Enterprise Plan (Coming Soon)', disabled: true },
      { value: 'custom', label: 'Custom Plan (Contact Sales)', disabled: true },
    ];

    return (
      <div className="w-96 p-8">
        <Label htmlFor="disabled-options">Subscription Plan</Label>
        <CustomSelect
          id="disabled-options"
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Select a plan..."
        />
        <p className="text-xs text-gray-600 mt-2">
          Disabled options shown with 50% opacity, cannot be selected
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Options can be individually disabled. Disabled options are shown with reduced opacity and cannot be selected.',
      },
    },
  },
};

// Story 6: Form Example
export const FormExample: Story = {
  render: () => {
    const [subject, setSubject] = useState<string>();
    const [priority, setPriority] = useState<string>('normal');
    const [budget, setBudget] = useState<string>();

    const subjectOptions: SelectOption[] = [
      { value: 'general', label: 'General Inquiry' },
      { value: 'project', label: 'Project Collaboration' },
      { value: 'hiring', label: 'Hiring Opportunities' },
      { value: 'speaking', label: 'Speaking Engagement' },
      { value: 'other', label: 'Other' },
    ];

    const priorityOptions: SelectOption[] = [
      { value: 'low', label: 'Low' },
      { value: 'normal', label: 'Normal' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' },
    ];

    const budgetOptions: SelectOption[] = [
      { value: 'under-5k', label: 'Under $5,000' },
      { value: '5k-10k', label: '$5,000 - $10,000' },
      { value: '10k-25k', label: '$10,000 - $25,000' },
      { value: '25k-50k', label: '$25,000 - $50,000' },
      { value: '50k-plus', label: '$50,000+' },
    ];

    return (
      <div className="w-full max-w-md p-8">
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
          Contact Form
        </h3>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="form-subject" required>
              Subject
            </Label>
            <CustomSelect
              id="form-subject"
              options={subjectOptions}
              value={subject}
              onChange={setSubject}
              placeholder="How can we help?"
            />
          </div>

          <div>
            <Label htmlFor="form-priority">
              Priority
            </Label>
            <CustomSelect
              id="form-priority"
              options={priorityOptions}
              value={priority}
              onChange={setPriority}
            />
          </div>

          <div>
            <Label htmlFor="form-budget">
              Budget Range (optional)
            </Label>
            <CustomSelect
              id="form-budget"
              options={budgetOptions}
              value={budget}
              onChange={setBudget}
              placeholder="Select budget range..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-10 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-150 ease-out"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Realistic contact form with multiple custom selects. All dropdown menus match design system exactly.',
      },
    },
  },
};

// Story 7: Filter Controls
export const FilterControls: Story = {
  render: () => {
    const [tech, setTech] = useState<string>();
    const [status, setStatus] = useState<string>('all');
    const [sort, setSort] = useState<string>('recent');

    const techOptions: SelectOption[] = [
      { value: 'all', label: 'All Technologies' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'nextjs', label: 'Next.js' },
      { value: 'typescript', label: 'TypeScript' },
    ];

    const statusOptions: SelectOption[] = [
      { value: 'all', label: 'All Projects' },
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Completed' },
      { value: 'archived', label: 'Archived' },
    ];

    const sortOptions: SelectOption[] = [
      { value: 'recent', label: 'Most Recent' },
      { value: 'alphabetical', label: 'Alphabetical' },
      { value: 'popular', label: 'Most Popular' },
      { value: 'updated', label: 'Recently Updated' },
    ];

    return (
      <div className="w-80 p-8">
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Filter Projects</h4>
          <p className="text-sm text-gray-600">Refine results by technology and status</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="filter-tech">Technology</Label>
            <CustomSelect
              id="filter-tech"
              options={techOptions}
              value={tech}
              onChange={setTech}
              placeholder="All technologies"
            />
          </div>

          <div>
            <Label htmlFor="filter-status">Status</Label>
            <CustomSelect
              id="filter-status"
              options={statusOptions}
              value={status}
              onChange={setStatus}
            />
          </div>

          <div>
            <Label htmlFor="filter-sort">Sort By</Label>
            <CustomSelect
              id="filter-sort"
              options={sortOptions}
              value={sort}
              onChange={setSort}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter controls with custom selects. All dropdowns styled with design system colors and spacing.',
      },
    },
  },
};

// Story 8: On Warm Background
export const OnWarmBackground: Story = {
  render: () => {
    const [framework, setFramework] = useState<string>('nextjs');
    const [styling, setStyling] = useState<string>('tailwind');

    const frameworkOptions: SelectOption[] = [
      { value: 'react', label: 'React' },
      { value: 'nextjs', label: 'Next.js' },
      { value: 'gatsby', label: 'Gatsby' },
      { value: 'remix', label: 'Remix' },
    ];

    const stylingOptions: SelectOption[] = [
      { value: 'tailwind', label: 'Tailwind CSS' },
      { value: 'styled', label: 'Styled Components' },
      { value: 'emotion', label: 'Emotion' },
      { value: 'css-modules', label: 'CSS Modules' },
    ];

    return (
      <div className="bg-gray-50 p-12">
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
            Project Settings
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bg-framework">Framework</Label>
              <CustomSelect
                id="bg-framework"
                options={frameworkOptions}
                value={framework}
                onChange={setFramework}
              />
            </div>

            <div>
              <Label htmlFor="bg-styling">Styling Solution</Label>
              <CustomSelect
                id="bg-styling"
                options={stylingOptions}
                value={styling}
                onChange={setStyling}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom select on warm gray-50 background (#FAF7F5). Dropdown menu uses white bg with design system borders and shadows.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 9: Comparison with Native
export const ComparisonWithNative: Story = {
  render: () => {
    const [customValue, setCustomValue] = useState<string>();

    const options: SelectOption[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    return (
      <div className="max-w-2xl p-8 space-y-8">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
          <p className="text-sm font-semibold text-blue-900 mb-2">✨ CustomSelect (This Component)</p>
          <p className="text-sm text-blue-800 mb-3">
            Full design system styling for dropdown menu. Click to see blue-50 selected state and warm gray-50 hover.
          </p>
        </div>

        <div>
          <Label htmlFor="custom-comparison">CustomSelect</Label>
          <CustomSelect
            id="custom-comparison"
            options={options}
            value={customValue}
            onChange={setCustomValue}
            placeholder="Select an option..."
          />
          <p className="text-xs text-gray-600 mt-2">
            ✅ Dropdown styled with design system<br />
            ✅ Selected: blue-50 bg + checkmark<br />
            ✅ Hover: gray-50 (warm)<br />
            ⚠️ Requires JavaScript
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm font-semibold text-gray-900 mb-2">When to Use Each:</p>
          <p className="text-sm text-gray-700">
            <strong>Native Select (Atom):</strong> Simple forms, mobile-first apps, progressive enhancement<br />
            <strong>CustomSelect (Molecule):</strong> Desktop apps, complex UIs, design system consistency required
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing CustomSelect with full design system styling vs native Select limitations.',
      },
    },
  },
};

// Story 10: Interactive (Playground)
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>();

    return (
      <div className="w-80 p-8">
        <CustomSelect
          {...args}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
  args: {
    options: basicOptions,
    placeholder: 'Select an option...',
    size: 'md',
    error: false,
    disabled: false,
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test size, error state, disabled state.',
      },
    },
  },
};
