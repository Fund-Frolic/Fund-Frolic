/**
 * FormField Compound Component Stories
 *
 * Complete form field with label, input, error, helper text.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormField } from './FormField';
import { useState } from 'react';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete form field with label, input, error, helper text. Tight state coupling via Context API. Layout: Vertical stack (label → input → helper/error). Spacing: space-y-1.5 (6px). Error: text-blue-700 text-sm with error icon. Helper: text-gray-600 text-sm. Accessibility: Label association, aria-invalid, aria-describedby.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'text',
      description: 'Error message (triggers error state)',
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample icons
const MailIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

// Story 1: Basic (No Error)
export const Basic: Story = {
  render: () => (
    <div className="w-80">
      <FormField>
        <FormField.Label>Email</FormField.Label>
        <FormField.Input type="email" placeholder="you@example.com" />
        <FormField.Helper>We'll never share your email</FormField.Helper>
        <FormField.Error />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic form field with label, input, and helper text. No error state.',
      },
    },
  },
};

// Story 2: With Error
export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <FormField error="Please enter a valid email address">
        <FormField.Label>Email</FormField.Label>
        <FormField.Input type="email" placeholder="you@example.com" />
        <FormField.Helper>We'll never share your email</FormField.Helper>
        <FormField.Error />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form field with error. Helper text hidden, error message shown with icon.',
      },
    },
  },
};

// Story 3: Required Field
export const RequiredField: Story = {
  render: () => (
    <div className="w-80">
      <FormField>
        <FormField.Label required>Full Name</FormField.Label>
        <FormField.Input type="text" placeholder="John Doe" />
        <FormField.Helper>Enter your first and last name</FormField.Helper>
        <FormField.Error />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Required field with asterisk indicator. Terracotta asterisk matches design system.',
      },
    },
  },
};

// Story 4: With Left Icon
export const WithLeftIcon: Story = {
  render: () => (
    <div className="w-80">
      <FormField>
        <FormField.Label>Email Address</FormField.Label>
        <FormField.Input
          type="email"
          placeholder="you@example.com"
          leftIcon={<MailIcon />}
        />
        <FormField.Helper>Your primary email for notifications</FormField.Helper>
        <FormField.Error />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form field with left icon. Icon positioned with 8-point grid spacing.',
      },
    },
  },
};

// Story 5: Password Field
export const PasswordField: Story = {
  render: () => (
    <div className="w-80">
      <FormField>
        <FormField.Label required>Password</FormField.Label>
        <FormField.Input
          type="password"
          placeholder="••••••••"
          leftIcon={<LockIcon />}
        />
        <FormField.Helper>At least 8 characters with uppercase, lowercase, and numbers</FormField.Helper>
        <FormField.Error />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Password field with security icon and requirements helper text.',
      },
    },
  },
};

// Story 6: Contact Form
export const ContactForm: Story = {
  render: () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const newErrors: Record<string, string> = {};

      if (!formData.get('name')) {
        newErrors.name = 'Name is required';
      }
      if (!formData.get('email')) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.get('email') as string)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.get('message')) {
        newErrors.message = 'Message is required';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg">
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
          Get in Touch
        </h2>
        <p className="text-base text-gray-700 mb-6">
          Fill out the form and I'll get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField error={errors.name}>
            <FormField.Label required>Name</FormField.Label>
            <FormField.Input
              name="name"
              type="text"
              placeholder="John Doe"
              leftIcon={<UserIcon />}
            />
            <FormField.Helper>Your full name</FormField.Helper>
            <FormField.Error />
          </FormField>

          <FormField error={errors.email}>
            <FormField.Label required>Email</FormField.Label>
            <FormField.Input
              name="email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<MailIcon />}
            />
            <FormField.Helper>We'll never share your email</FormField.Helper>
            <FormField.Error />
          </FormField>

          <FormField error={errors.message}>
            <FormField.Label required>Message</FormField.Label>
            <FormField.Input
              name="message"
              type="text"
              placeholder="Tell me about your project..."
            />
            <FormField.Helper>What can I help you with?</FormField.Helper>
            <FormField.Error />
          </FormField>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-inter font-medium text-base rounded-md hover:bg-blue-700 transition-colors duration-150 ease-out"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete contact form with validation. Submit to see error states.',
      },
    },
  },
};

// Story 7: Newsletter Signup
export const NewsletterSignup: Story = {
  render: () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get('email') as string;

      if (!email) {
        setError('Email is required');
        setSuccess(false);
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address');
        setSuccess(false);
      } else {
        setError(undefined);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    };

    return (
      <div className="w-full max-w-md p-8 bg-gray-50 rounded-lg">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
          Subscribe to Newsletter
        </h3>
        <p className="text-sm text-gray-700 mb-6">
          Get the latest articles and updates delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField error={error}>
            <FormField.Label>Email Address</FormField.Label>
            <FormField.Input
              name="email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<MailIcon />}
            />
            <FormField.Helper>No spam, unsubscribe anytime</FormField.Helper>
            <FormField.Error />
          </FormField>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-inter font-medium text-base rounded-md hover:bg-blue-700 transition-colors duration-150 ease-out"
          >
            Subscribe
          </button>

          {success && (
            <div className="p-3 bg-gold-100 border border-gold-300 rounded-md text-sm text-gold-900">
              Successfully subscribed! Check your email for confirmation.
            </div>
          )}
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Newsletter signup form with validation and success state.',
      },
    },
  },
};

// Story 8: Multiple Fields
export const MultipleFields: Story = {
  render: () => (
    <div className="w-full max-w-md p-8 bg-white space-y-6">
      <FormField>
        <FormField.Label required>Username</FormField.Label>
        <FormField.Input
          type="text"
          placeholder="johndoe"
          leftIcon={<UserIcon />}
        />
        <FormField.Helper>Choose a unique username (3-20 characters)</FormField.Helper>
        <FormField.Error />
      </FormField>

      <FormField>
        <FormField.Label required>Email</FormField.Label>
        <FormField.Input
          type="email"
          placeholder="you@example.com"
          leftIcon={<MailIcon />}
        />
        <FormField.Helper>We'll send a verification email</FormField.Helper>
        <FormField.Error />
      </FormField>

      <FormField>
        <FormField.Label required>Password</FormField.Label>
        <FormField.Input
          type="password"
          placeholder="••••••••"
          leftIcon={<LockIcon />}
        />
        <FormField.Helper>At least 8 characters with mixed case and numbers</FormField.Helper>
        <FormField.Error />
      </FormField>

      <FormField>
        <FormField.Label required>Confirm Password</FormField.Label>
        <FormField.Input
          type="password"
          placeholder="••••••••"
          leftIcon={<LockIcon />}
        />
        <FormField.Helper>Re-enter your password</FormField.Helper>
        <FormField.Error />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple form fields stacked vertically. Consistent spacing (space-y-6).',
      },
    },
  },
};

// Story 9: Validation States
export const ValidationStates: Story = {
  render: () => (
    <div className="w-full max-w-md p-8 bg-white space-y-6">
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-4">Valid State</h4>
        <FormField>
          <FormField.Label>Email</FormField.Label>
          <FormField.Input
            type="email"
            placeholder="you@example.com"
            defaultValue="john@example.com"
          />
          <FormField.Helper>Looks good!</FormField.Helper>
          <FormField.Error />
        </FormField>
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-4">Error State</h4>
        <FormField error="Please enter a valid email address">
          <FormField.Label>Email</FormField.Label>
          <FormField.Input
            type="email"
            placeholder="you@example.com"
            defaultValue="invalid-email"
          />
          <FormField.Helper>We'll never share your email</FormField.Helper>
          <FormField.Error />
        </FormField>
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-4">Required Empty State</h4>
        <FormField error="This field is required">
          <FormField.Label required>Name</FormField.Label>
          <FormField.Input type="text" placeholder="John Doe" />
          <FormField.Helper>Your full name</FormField.Helper>
          <FormField.Error />
        </FormField>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different validation states: valid, error, required empty.',
      },
    },
  },
};

// Story 10: Different Sizes
export const DifferentSizes: Story = {
  render: () => (
    <div className="w-full max-w-md p-8 bg-white space-y-6">
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-4">Small</h4>
        <FormField>
          <FormField.Label>Email</FormField.Label>
          <FormField.Input size="sm" type="email" placeholder="you@example.com" />
          <FormField.Helper>Small input (32px height)</FormField.Helper>
          <FormField.Error />
        </FormField>
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-4">Medium (Default)</h4>
        <FormField>
          <FormField.Label>Email</FormField.Label>
          <FormField.Input size="md" type="email" placeholder="you@example.com" />
          <FormField.Helper>Medium input (40px height)</FormField.Helper>
          <FormField.Error />
        </FormField>
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-4">Large</h4>
        <FormField>
          <FormField.Label>Email</FormField.Label>
          <FormField.Input size="lg" type="email" placeholder="you@example.com" />
          <FormField.Helper>Large input (48px height)</FormField.Helper>
          <FormField.Error />
        </FormField>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Form fields with different input sizes: small (32px), medium (40px), large (48px).',
      },
    },
  },
};

// Story 11: Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>Label association</strong> - Automatic htmlFor with generated ID</li>
          <li>✅ <strong>aria-invalid</strong> - Set to true when error exists</li>
          <li>✅ <strong>aria-describedby</strong> - Points to helper or error ID</li>
          <li>✅ <strong>role="alert"</strong> - Error announced by screen readers</li>
          <li>✅ <strong>Required indicator</strong> - aria-label="required" on asterisk</li>
          <li>✅ <strong>Error icon</strong> - Visual indicator with semantic meaning</li>
          <li>✅ <strong>Context API</strong> - Automatic state sharing between components</li>
          <li>✅ <strong>Helper/Error toggle</strong> - Only one shown at a time (no confusion)</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Try It Yourself
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          This form field is fully accessible. Use Tab to navigate, and screen readers
          will announce the label, error state, and helper text.
        </p>

        <FormField error="Please enter a valid email address">
          <FormField.Label required>Email Address</FormField.Label>
          <FormField.Input
            type="email"
            placeholder="you@example.com"
            defaultValue="invalid"
          />
          <FormField.Helper>We'll never share your email</FormField.Helper>
          <FormField.Error />
        </FormField>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Layout:</strong> Vertical stack (label → input → helper/error)<br />
          <strong>Spacing:</strong> space-y-1.5 (6px, half 8-point grid)<br />
          <strong>Label:</strong> Inter text-sm font-medium, text-gray-700<br />
          <strong>Input:</strong> Uses Input atom (terracotta focus, error border)<br />
          <strong>Helper:</strong> text-sm, text-gray-600<br />
          <strong>Error:</strong> text-sm, text-blue-700 (warm red)<br />
          <strong>Error icon:</strong> 16px (w-4 h-4), gap-2 (8px)<br />
          <strong>Required asterisk:</strong> blue-600 (not generic red)<br />
          <strong>Context API:</strong> Shares fieldId, error state automatically
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

// Story 12: Interactive (Playground)
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | undefined>(args.error);

    const handleBlur = () => {
      if (!value) {
        setError('This field is required');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setError('Please enter a valid email address');
      } else {
        setError(undefined);
      }
    };

    return (
      <div className="w-80">
        <FormField error={error}>
          <FormField.Label required>Email</FormField.Label>
          <FormField.Input
            type="email"
            placeholder="you@example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
          />
          <FormField.Helper>We'll never share your email</FormField.Helper>
          <FormField.Error />
        </FormField>
      </div>
    );
  },
  args: {
    error: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - type and blur to trigger validation.',
      },
    },
  },
};
