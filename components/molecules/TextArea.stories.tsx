/**
 * TextArea Molecule Stories
 *
 * Multi-line text input with character counter.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextArea } from './TextArea';
import { FormField } from './FormField';
import { useState } from 'react';

const meta = {
  title: 'Molecules/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Multi-line text input with character counter. Matches Input styling (border, focus, error). Min height: 120px (h-30), resizable vertically. Character counter: text-gray-600 text-xs text-right mt-1.5. Max length indicator: Changes to blue-600 when 90% reached. Accessibility: aria-live="polite" counter, aria-describedby association.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    showCounter: {
      control: 'boolean',
      description: 'Show character counter',
    },
    autoResize: {
      control: 'boolean',
      description: 'Auto-resize with content',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Basic
export const Basic: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic textarea without counter. Min height 120px, resizable vertically.',
      },
    },
  },
};

// Story 2: With Counter
export const WithCounter: Story = {
  args: {
    placeholder: 'Enter your message...',
    showCounter: true,
  },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with character counter. Counter shows total characters typed.',
      },
    },
  },
};

// Story 3: With Max Length
export const WithMaxLength: Story = {
  args: {
    placeholder: 'Enter your message (max 500 characters)...',
    showCounter: true,
    maxLength: 500,
  },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Textarea with max length and counter showing "150 / 500 characters".',
      },
    },
  },
};

// Story 4: Approaching Limit
export const ApproachingLimit: Story = {
  args: {
    placeholder: 'Enter your message...',
    showCounter: true,
    maxLength: 100,
    defaultValue: 'This is a long message that is approaching the character limit. When you reach 90% of the max length, the counter turns red to warn you.',
  },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Counter turns blue-600 when 90% of max length reached (90 / 100).',
      },
    },
  },
};

// Story 5: Error State
export const ErrorState: Story = {
  args: {
    placeholder: 'Enter your message...',
    showCounter: true,
    maxLength: 500,
    error: true,
    defaultValue: 'This message is too short.',
  },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error state with blue-700 border. Matches Input error styling.',
      },
    },
  },
};

// Story 6: Auto Resize
export const AutoResize: Story = {
  args: {
    placeholder: 'Start typing and watch the textarea grow...',
    showCounter: true,
    autoResize: true,
  },
  render: (args) => (
    <div className="w-96">
      <p className="text-sm text-gray-700 mb-3">
        Type multiple lines to see auto-resize in action
      </p>
      <TextArea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Auto-resize grows with content. Not resizable manually when autoResize is true.',
      },
    },
  },
};

// Story 7: Contact Form
export const ContactForm: Story = {
  args: { label: 'Label' },
  render: () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | undefined>();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!message) {
        setError('Message is required');
      } else if (message.length < 10) {
        setError('Message must be at least 10 characters');
      } else {
        setError(undefined);
        alert('Message sent!');
      }
    };

    return (
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg">
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
          Contact Me
        </h2>
        <p className="text-base text-gray-700 mb-6">
          Have a project in mind? Let's talk about it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField error={error}>
            <FormField.Label required>Your Message</FormField.Label>
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              showCounter
              maxLength={1000}
              error={!!error}
            />
            <FormField.Helper>Min 10 characters, max 1000</FormField.Helper>
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
        story: 'Contact form with textarea validation. Try submitting with empty or short message.',
      },
    },
  },
};

// Story 8: Comment Form
export const CommentForm: Story = {
  args: { label: 'Label' },
  render: () => {
    const [comment, setComment] = useState('');

    return (
      <div className="w-full max-w-2xl p-8 bg-white">
        <div className="mb-6">
          <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
            Leave a Comment
          </h3>
          <p className="text-sm text-gray-600">
            Share your thoughts on this article
          </p>
        </div>

        <div className="space-y-4">
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you think of this article?"
            showCounter
            maxLength={500}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 font-inter font-medium text-base hover:bg-gray-100 rounded-md transition-colors duration-150 ease-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-inter font-medium text-base rounded-md hover:bg-blue-700 transition-colors duration-150 ease-out"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comment form with textarea and action buttons. Counter helps users stay within limit.',
      },
    },
  },
};

// Story 9: Different Heights
export const DifferentHeights: Story = {
  args: { label: 'Label' },
  render: () => (
    <div className="w-full max-w-2xl p-8 space-y-6">
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Small (min-h-[80px])
        </h4>
        <TextArea
          placeholder="Short message..."
          className="min-h-[80px]"
          showCounter
        />
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Default (min-h-[120px])
        </h4>
        <TextArea
          placeholder="Standard message..."
          showCounter
        />
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Large (min-h-[200px])
        </h4>
        <TextArea
          placeholder="Long message..."
          className="min-h-[200px]"
          showCounter
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different minimum heights: 80px (small), 120px (default), 200px (large).',
      },
    },
  },
};

// Story 10: With FormField
export const WithFormField: Story = {
  args: { label: 'Label' },
  render: () => (
    <div className="w-full max-w-md p-8 bg-white">
      <FormField>
        <FormField.Label required>Project Description</FormField.Label>
        <TextArea
          placeholder="Describe your project in detail..."
          showCounter
          maxLength={1000}
        />
      </FormField>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TextArea integrated with FormField. Note: TextArea handles its own counter, FormField handles helper/error text.',
      },
    },
  },
};

// Story 11: Disabled State
export const DisabledState: Story = {
  args: {
    placeholder: 'This field is disabled...',
    showCounter: true,
    maxLength: 500,
    defaultValue: 'This textarea is disabled and cannot be edited.',
    disabled: true,
  },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled textarea with 50% opacity. Cursor shows not-allowed.',
      },
    },
  },
};

// Story 12: Case Study Description
export const CaseStudyDescription: Story = {
  args: { label: 'Label' },
  render: () => {
    const [description, setDescription] = useState('');

    return (
      <div className="w-full max-w-3xl p-8 bg-white">
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
          New Case Study
        </h2>

        <div className="space-y-6">
          <FormField>
            <FormField.Label>Project Name</FormField.Label>
            <FormField.Input type="text" placeholder="Austin Power Alert" />
          </FormField>

          <FormField>
            <FormField.Label required>Project Description</FormField.Label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what the project does, the problems it solves, and the impact it had..."
              showCounter
              maxLength={2000}
            />
          </FormField>

          <FormField>
            <FormField.Label>Tech Stack</FormField.Label>
            <FormField.Input type="text" placeholder="React, TypeScript, Next.js..." />
          </FormField>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 font-inter font-medium text-base hover:bg-gray-100 rounded-md transition-colors duration-150 ease-out"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-inter font-medium text-base rounded-md hover:bg-blue-700 transition-colors duration-150 ease-out"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Case study CMS form with textarea for project description.',
      },
    },
  },
};

// Story 13: Character Counter States
export const CharacterCounterStates: Story = {
  args: { label: 'Label' },
  render: () => (
    <div className="w-full max-w-2xl p-8 space-y-6">
      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Normal (0% - 89%)
        </h4>
        <TextArea
          placeholder="Type something..."
          showCounter
          maxLength={100}
          defaultValue="This is within the safe zone."
        />
        <p className="text-xs text-gray-600 mt-2">
          Counter is gray-600 when below 90% of max length
        </p>
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Approaching Limit (90% - 100%)
        </h4>
        <TextArea
          placeholder="Type something..."
          showCounter
          maxLength={100}
          defaultValue="This message is getting quite long and is approaching the character limit. The counter turns red."
        />
        <p className="text-xs text-gray-600 mt-2">
          Counter turns blue-600 and font-medium at 90% to warn user
        </p>
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          At Limit (100%)
        </h4>
        <TextArea
          placeholder="Type something..."
          showCounter
          maxLength={100}
          defaultValue="This message has reached the maximum character limit and cannot be extended further. The counter warn"
        />
        <p className="text-xs text-gray-600 mt-2">
          Cannot type beyond max length. Browser prevents additional input.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different character counter states based on percentage of max length.',
      },
    },
  },
};

// Story 14: Accessibility Demo
export const AccessibilityDemo: Story = {
  args: { label: 'Label' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>Label association</strong> - Use with FormField or Label for proper htmlFor</li>
          <li>✅ <strong>aria-describedby</strong> - Counter ID associated with textarea</li>
          <li>✅ <strong>aria-live="polite"</strong> - Counter announces changes to screen readers</li>
          <li>✅ <strong>aria-atomic="true"</strong> - Entire counter re-announced on change</li>
          <li>✅ <strong>maxLength</strong> - Browser enforces character limit</li>
          <li>✅ <strong>Visual indicator</strong> - Color change at 90% (not just screen reader)</li>
          <li>✅ <strong>Keyboard navigation</strong> - Tab to focus, all standard textarea keys work</li>
          <li>✅ <strong>Resize handle</strong> - Vertical resize only (horizontal fixed)</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Try It Yourself
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Type in the textarea and use a screen reader. The character counter
          will announce updates politely without interrupting your typing.
        </p>

        <FormField>
          <FormField.Label required>Your Message</FormField.Label>
          <TextArea
            placeholder="Start typing to hear counter updates..."
            showCounter
            maxLength={200}
          />
        </FormField>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Border:</strong> gray-300 → blue-600 on focus<br />
          <strong>Error border:</strong> blue-700 (warm red)<br />
          <strong>Focus ring:</strong> blue-600/20 (2px)<br />
          <strong>Typography:</strong> Inter text-base, text-gray-900<br />
          <strong>Placeholder:</strong> text-gray-500<br />
          <strong>Min height:</strong> 120px (8-point grid aligned)<br />
          <strong>Padding:</strong> px-4 py-3 (16px × 12px)<br />
          <strong>Resize:</strong> Vertical only (resize-y)<br />
          <strong>Counter:</strong> text-xs, text-gray-600, mt-1.5 (6px)<br />
          <strong>Counter warning:</strong> blue-600 font-medium at 90%<br />
          <strong>Transition:</strong> 300ms cubic-bezier(0.33,1,0.68,1)<br />
          <strong>Disabled:</strong> opacity-[0.5], cursor-not-allowed
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

// Story 15: Interactive (Playground)
export const Interactive: Story = {
  args: {
    placeholder: 'Enter your message...',
    showCounter: true,
    maxLength: 500,
    error: false,
    autoResize: false,
  },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different props.',
      },
    },
  },
};
