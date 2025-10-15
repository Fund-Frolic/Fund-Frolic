/**
 * Input Component Stories
 *
 * Text input fields using design system (neutral borders, terracotta focus, 300ms transitions).
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';
import { Text } from './Text';

// Common icons for stories
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text input fields using design system. Border: gray-300. Focus: blue-600 ring. Error: blue-700 (not generic red). Transitions: 300ms ease-out. Sizes: 32px/40px/48px (8-point grid). Icons: 16px/20px/24px with 8px gap to text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size (8-point grid aligned)',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make input full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number'],
      description: 'Input type',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
    type: 'text',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Story 2: All Sizes
export const AllSizes: Story = {
  args: { 'aria-label': 'Input' },
  render: () => (
    <div className="w-96 p-8 space-y-6">
      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Small (32px)
        </Text>
        <Input size="sm" placeholder="Small input" />
        <p className="text-xs text-gray-500 mt-1">h-8 (32px), px-3, text-sm, 4px radius</p>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Medium (40px) [Default]
        </Text>
        <Input size="md" placeholder="Medium input" />
        <p className="text-xs text-gray-500 mt-1">h-10 (40px), px-4, text-base, 8px radius</p>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Large (48px)
        </Text>
        <Input size="lg" placeholder="Large input" />
        <p className="text-xs text-gray-500 mt-1">h-12 (48px), px-4, text-lg, 8px radius</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes, 8-point grid aligned: sm (32px), md (40px), lg (48px). Icons scale with size: 16px/20px/24px.',
      },
    },
  },
};

// Story 3: States
export const States: Story = {
  args: { 'aria-label': 'Input' },
  render: () => (
    <div className="w-96 p-8 space-y-6">
      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Default (Resting)
        </Text>
        <Input placeholder="Type here..." />
        <p className="text-xs text-gray-500 mt-1">Border: gray-300</p>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Hover (hover over input)
        </Text>
        <Input placeholder="Hover over me" className="hover:border-gray-400" />
        <p className="text-xs text-gray-500 mt-1">Border: gray-400</p>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Focus (click input)
        </Text>
        <Input placeholder="Click to focus" />
        <p className="text-xs text-gray-500 mt-1">Border: blue-600, Ring: blue-600/20</p>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block text-blue-700">
          Error
        </Text>
        <Input error placeholder="Invalid input" />
        <p className="text-xs text-blue-600 mt-1">Uses blue-700 border (design system, not generic red)</p>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block text-gray-500">
          Disabled
        </Text>
        <Input disabled placeholder="Disabled input" value="Cannot edit" />
        <p className="text-xs text-gray-500 mt-1">50% opacity, gray-100 bg, cursor-not-allowed</p>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Read-only
        </Text>
        <Input readOnly value="Read-only value" />
        <p className="text-xs text-gray-500 mt-1">User can select but not edit</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input states: default (gray-300 border), hover (gray-400), focus (blue-600 with ring), error (blue-700), disabled (50% opacity), read-only. All transitions: 300ms ease-out.',
      },
    },
  },
};

// Story 4: With Icons
export const WithIcons: Story = {
  args: { 'aria-label': 'Input' },
  render: () => (
    <div className="w-96 p-8 space-y-6">
      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Search with left icon
        </Text>
        <Input leftIcon={<SearchIcon />} placeholder="Search..." type="search" />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Email with left icon
        </Text>
        <Input leftIcon={<MailIcon />} placeholder="you@example.com" type="email" />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Password with icons
        </Text>
        <Input
          leftIcon={<LockIcon />}
          rightIcon={<EyeIcon />}
          placeholder="Enter password"
          type="password"
        />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Small with icon
        </Text>
        <Input size="sm" leftIcon={<SearchIcon />} placeholder="Small search..." />
        <p className="text-xs text-gray-500 mt-1">Icon: 16px (h-4)</p>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Large with icon
        </Text>
        <Input size="lg" leftIcon={<SearchIcon />} placeholder="Large search..." />
        <p className="text-xs text-gray-500 mt-1">Icon: 24px (h-6)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs with left and/or right icons. Icons scale with input size: sm (16px), md (20px), lg (24px). Icon positioning aligned with 8-point grid. Gap between icon and text: 8px.',
      },
    },
  },
};

// Story 5: Input Types
export const InputTypes: Story = {
  args: { 'aria-label': 'Input' },
  render: () => (
    <div className="w-96 p-8 space-y-6">
      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Text
        </Text>
        <Input type="text" placeholder="Enter text" />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Email
        </Text>
        <Input type="email" placeholder="you@example.com" leftIcon={<MailIcon />} />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Password
        </Text>
        <Input type="password" placeholder="Enter password" leftIcon={<LockIcon />} />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Search
        </Text>
        <Input type="search" placeholder="Search..." leftIcon={<SearchIcon />} />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          URL
        </Text>
        <Input type="url" placeholder="https://example.com" />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Telephone
        </Text>
        <Input type="tel" placeholder="+1 (555) 000-0000" />
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Number
        </Text>
        <Input type="number" placeholder="0" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All supported input types: text, email, password, search, url, tel, number. Browser provides native validation for email, url, and tel types.',
      },
    },
  },
};

// Story 6: Form Example
export const FormExample: Story = {
  args: { 'aria-label': 'Input' },
  render: () => (
    <div className="w-full max-w-md p-8">
      <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
        Contact Form
      </h3>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Text as="label" htmlFor="name" variant="caption" weight="medium" className="mb-2 block">
            Name *
          </Text>
          <Input id="name" type="text" placeholder="Logan Miller" required />
        </div>

        <div>
          <Text as="label" htmlFor="email" variant="caption" weight="medium" className="mb-2 block">
            Email *
          </Text>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            leftIcon={<MailIcon />}
            required
          />
        </div>

        <div>
          <Text as="label" htmlFor="password" variant="caption" weight="medium" className="mb-2 block">
            Password *
          </Text>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            leftIcon={<LockIcon />}
            required
          />
          <Text variant="small" className="mt-1 text-gray-600">
            Must be at least 8 characters
          </Text>
        </div>

        <div>
          <Text as="label" htmlFor="website" variant="caption" weight="medium" className="mb-2 block">
            Website (optional)
          </Text>
          <Input id="website" type="url" placeholder="https://example.com" />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-10 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-[300ms]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Realistic form example with labels, required fields, helper text, and submit button. All spacing 8-point grid aligned.',
      },
    },
  },
};

// Story 7: Validation States
export const ValidationStates: Story = {
  args: { 'aria-label': 'Input' },
  render: () => (
    <div className="w-96 p-8 space-y-6">
      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block">
          Valid input
        </Text>
        <Input type="email" value="user@example.com" />
        <Text variant="small" className="mt-1 text-gold-700">
          ✓ Email format is correct
        </Text>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block text-blue-700">
          Invalid email
        </Text>
        <Input type="email" error value="invalid-email" />
        <Text variant="small" className="mt-1 text-blue-700">
          ✗ Please enter a valid email address
        </Text>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block text-blue-700">
          Required field
        </Text>
        <Input error placeholder="This field is required" />
        <Text variant="small" className="mt-1 text-blue-700">
          ✗ This field cannot be empty
        </Text>
      </div>

      <div>
        <Text as="label" variant="caption" weight="medium" className="mb-2 block text-blue-700">
          Password too short
        </Text>
        <Input type="password" error leftIcon={<LockIcon />} value="abc123" />
        <Text variant="small" className="mt-1 text-blue-700">
          ✗ Password must be at least 8 characters
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Validation states with error messages. Success uses gold-700, error uses blue-700 (design system colors, not generic green/red).',
      },
    },
  },
};

// Story 8: On Warm Background
export const OnWarmBackground: Story = {
  args: { 'aria-label': 'Input' },
  render: () => (
    <div className="bg-gray-50 p-12">
      <div className="max-w-md mx-auto">
        <h3 className="font-display text-3xl font-semibold text-gray-900 mb-2">
          Get in Touch
        </h3>
        <Text variant="body" className="mb-6 text-gray-700">
          Fill out the form below and I'll get back to you within 24 hours.
        </Text>

        <div className="bg-white p-6 rounded-md shadow-md space-y-4">
          <div>
            <Text as="label" variant="caption" weight="medium" className="mb-2 block">
              Full Name
            </Text>
            <Input placeholder="Logan Miller" />
          </div>

          <div>
            <Text as="label" variant="caption" weight="medium" className="mb-2 block">
              Email Address
            </Text>
            <Input type="email" placeholder="you@example.com" leftIcon={<MailIcon />} />
          </div>

          <div>
            <Text as="label" variant="caption" weight="medium" className="mb-2 block">
              Search Projects
            </Text>
            <Input type="search" placeholder="Search..." leftIcon={<SearchIcon />} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs on warm gray-50 background (#FAF7F5) in realistic context. All design system tokens applied: neutral borders, terracotta focus, 300ms transitions.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 9: Interactive (Playground)
export const Interactive: Story = {
  args: {
    type: 'text',
    placeholder: 'Interactive input',
    size: 'md',
    error: false,
    disabled: false,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div className="w-96 p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different types, sizes, and states.',
      },
    },
  },
};
