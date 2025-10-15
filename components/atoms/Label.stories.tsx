/**
 * Label Component Stories
 *
 * Form field labels using design system (Inter medium, gray-700, terracotta required indicator).
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './Label';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form field labels using design system. Typography: Inter text-sm font-medium. Color: gray-700 (warm). Required: blue-600 asterisk (not generic red). Spacing: 6px gap to input (half 8-point grid step).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Show required indicator (asterisk)',
    },
    htmlFor: {
      control: 'text',
      description: 'Associated input ID (required for accessibility)',
    },
    hint: {
      control: 'text',
      description: 'Optional hint text below label',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    htmlFor: 'email',
    children: 'Email Address',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
    ),
  ],
};

// Story 2: Required
export const Required: Story = {
  args: {
    htmlFor: 'email-required',
    required: true,
    children: 'Email Address',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
        <Input id="email-required" type="email" placeholder="you@example.com" required />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Required indicator uses blue-600 (design system warm color, not generic red). Asterisk has aria-label="required" for screen readers.',
      },
    },
  },
};

// Story 3: With Hint
export const WithHint: Story = {
  args: {
    htmlFor: 'email-hint',
    children: 'Email Address',
    hint: "We'll never share your email with anyone else.",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
        <Input id="email-hint" type="email" placeholder="you@example.com" aria-describedby="email-hint-hint" />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Hint text (text-xs, gray-600) provides additional context. Hint has auto-generated ID ({htmlFor}-hint) for aria-describedby association.',
      },
    },
  },
};

// Story 4: Required With Hint
export const RequiredWithHint: Story = {
  args: {
    htmlFor: 'password',
    required: true,
    children: 'Password',
    hint: 'Must be at least 8 characters with a mix of letters and numbers.',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
        <Input id="password" type="password" placeholder="Enter password" aria-describedby="password-hint" required />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Combines required indicator and hint text. Both accessibility features work together.',
      },
    },
  },
};

// Story 5: Form Example
export const FormExample: Story = {
  args: { htmlFor: 'example', children: 'Label' },
  render: () => (
    <div className="w-full max-w-md p-8">
      <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6">
        Contact Form
      </h3>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <Label htmlFor="name" required>
            Full Name
          </Label>
          <Input id="name" type="text" placeholder="Logan Miller" required />
        </div>

        <div>
          <Label htmlFor="email-form" required hint="We'll only use this to respond to your message.">
            Email Address
          </Label>
          <Input
            id="email-form"
            type="email"
            placeholder="you@example.com"
            aria-describedby="email-form-hint"
            required
          />
        </div>

        <div>
          <Label htmlFor="subject">
            Subject
          </Label>
          <Input id="subject" type="text" placeholder="How can we help?" />
        </div>

        <div>
          <Label htmlFor="website" hint="Optional: Include your portfolio or company website.">
            Website
          </Label>
          <Input id="website" type="url" placeholder="https://example.com" aria-describedby="website-hint" />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-10 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-[300ms]"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Realistic contact form demonstrating labels with various combinations of required indicators and hints. All spacing 8-point grid aligned (6px label-to-input is half-step).',
      },
    },
  },
};

// Story 6: All Variants
export const AllVariants: Story = {
  args: { htmlFor: 'example', children: 'Label' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Basic Label</p>
        <div className="w-80">
          <Label htmlFor="basic">
            Email Address
          </Label>
          <Input id="basic" type="email" placeholder="you@example.com" />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Text-sm, font-medium, gray-700, 6px gap to input
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Required (Asterisk)</p>
        <div className="w-80">
          <Label htmlFor="required-variant" required>
            Password
          </Label>
          <Input id="required-variant" type="password" placeholder="Enter password" required />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Terracotta-600 asterisk (design system, not red-600), aria-label="required"
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">With Hint Text</p>
        <div className="w-80">
          <Label htmlFor="hint-variant" hint="We'll never share your email with anyone else.">
            Email Address
          </Label>
          <Input id="hint-variant" type="email" placeholder="you@example.com" aria-describedby="hint-variant-hint" />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Hint: text-xs, gray-600, mt-1 (4px gap from label)
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Required + Hint</p>
        <div className="w-80">
          <Label htmlFor="both-variant" required hint="Must be at least 8 characters.">
            Password
          </Label>
          <Input id="both-variant" type="password" placeholder="Enter password" aria-describedby="both-variant-hint" required />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Both features combined, maintains 6px total gap to input
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All label variants: basic, required, with hint, and required with hint. Notice blue-600 required indicator (not generic red).',
      },
    },
  },
};

// Story 7: Accessibility Pattern
export const AccessibilityPattern: Story = {
  args: { htmlFor: 'example', children: 'Label' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-6">
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="text-sm font-semibold text-gray-900 mb-2">Accessibility Features</p>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><strong>htmlFor:</strong> Label is associated with input via matching ID</li>
          <li><strong>Required:</strong> Asterisk has aria-label="required" for screen readers</li>
          <li><strong>Hint:</strong> Auto-generated ID ({'{'}htmlFor{'}'}-hint) for aria-describedby</li>
          <li><strong>Semantic HTML:</strong> Uses proper &lt;label&gt; element</li>
        </ul>
      </div>

      <div className="border-l-4 border-blue-600 pl-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">Code Example:</p>
        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto">
{`<Label
  htmlFor="email"
  required
  hint="We'll only use this to respond."
>
  Email Address
</Label>
<Input
  id="email"
  type="email"
  aria-describedby="email-hint"
  aria-required="true"
  aria-invalid="false"
/>`}
        </pre>
      </div>

      <div className="w-80">
        <Label htmlFor="accessible-example" required hint="This input demonstrates proper ARIA attributes.">
          Accessible Input
        </Label>
        <Input
          id="accessible-example"
          type="text"
          placeholder="Type here..."
          aria-describedby="accessible-example-hint"
          aria-required="true"
          aria-invalid="false"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates proper accessibility pattern: htmlFor association, aria-label for required, aria-describedby for hint. Inspect DOM to see ARIA attributes.',
      },
    },
  },
};

// Story 8: On Warm Background
export const OnWarmBackground: Story = {
  args: { htmlFor: 'example', children: 'Label' },
  render: () => (
    <div className="bg-gray-50 p-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
          Newsletter Signup
        </h3>
        <p className="text-gray-700 mb-6">
          Get design system insights delivered to your inbox weekly.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="newsletter-name" required>
              Name
            </Label>
            <Input id="newsletter-name" type="text" placeholder="Logan Miller" required />
          </div>

          <div>
            <Label
              htmlFor="newsletter-email"
              required
              hint="We respect your privacy. Unsubscribe anytime."
            >
              Email Address
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              aria-describedby="newsletter-email-hint"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-[300ms]"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels on warm gray-50 background (#FAF7F5). Neutral-700 text maintains excellent readability. Terracotta-600 required indicator provides visual hierarchy without harshness.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 9: Interactive (Playground)
export const Interactive: Story = {
  args: {
    htmlFor: 'interactive-input',
    children: 'Interactive Label',
    required: false,
    hint: '',
  },
  decorators: [
    (Story) => (
      <div className="w-80 p-8">
        <Story />
        <Input id="interactive-input" type="text" placeholder="Type here..." />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test required indicator and hint text.',
      },
    },
  },
};
