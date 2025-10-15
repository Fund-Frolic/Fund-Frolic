/**
 * Code Component Stories
 *
 * Inline and block code using design system.
 * JetBrains Mono font, terracotta/neutral colors, 8-point grid spacing.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Code } from './Code';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Code',
  component: Code,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Inline and block code using design system. Font: JetBrains Mono. Inline: blue-700 + gray-100 bg, 8px H × 4px V padding, 4px radius. Block: gray-900 bg + gray-50 text, 8px radius. All spacing 8-point grid aligned.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    inline: {
      control: 'boolean',
      description: 'Inline vs block code',
    },
    language: {
      control: 'text',
      description: 'Programming language (for future syntax highlighting)',
    },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    children: "const foo = 'bar'",
    inline: true,
  },
};

// Story 2: Block
export const Block: Story = {
  args: { children: 'code' },
  render: () => (
    <div className="w-full max-w-2xl p-8">
      <Code inline={false}>{`function hello() {
  return 'world';
}`}</Code>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Block code (inline={false}) wraps in <pre><code> with gray-900 background (not pure black), gray-50 text, 8px border radius (rounded-md per design system), and horizontal scroll. Padding is 16px (4 × 4px = 8-point grid).',
      },
    },
  },
};

// Story 3: In Text
export const InText: Story = {
  args: { children: 'code' },
  render: () => (
    <div className="max-w-2xl p-8">
      <Text variant="body">
        The <Code>useState</Code> hook lets you add state to functional components.
        Call it at the top level: <Code>const [count, setCount] = useState(0)</Code>.
        The initial state can be any value, including objects like{' '}
        <Code>{`{ name: 'Logan' }`}</Code>.
      </Text>

      <Text variant="body" className="mt-4">
        For environment variables in Next.js, prefix public variables with{' '}
        <Code>NEXT_PUBLIC_</Code>. Server-only variables can be accessed with{' '}
        <Code>process.env.SECRET_KEY</Code> but only in API routes or server components.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inline code within body text using JetBrains Mono font. Terracotta-700 color provides professional warmth (not generic red). Padding 8px H × 4px V per 8-point grid, 4px radius (rounded-sm).',
      },
    },
  },
};

// Story 4: Long Block
export const LongBlock: Story = {
  args: { children: 'code' },
  render: () => (
    <div className="w-full max-w-2xl p-8">
      <Code inline={false}>{`// This is a longer code block that demonstrates horizontal scrolling
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-inter font-medium rounded-md transition-interactive focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
        secondary: "bg-gold-500 text-white shadow-sm hover:bg-gold-600",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
  }
);`}</Code>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Long code block with horizontal scroll (overflow-x-auto). Warm gray-900 background + gray-50 text maintains design system aesthetic. Uses JetBrains Mono font at 14px.',
      },
    },
  },
};

// Story 5: Multiple Languages
export const MultipleLanguages: Story = {
  args: { children: 'code' },
  render: () => (
    <div className="max-w-3xl p-8 space-y-6">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">TypeScript</p>
        <Code inline={false} language="typescript">{`interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}`}</Code>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">CSS</p>
        <Code inline={false} language="css">{`.button {
  background-color: #B85032; /* blue-600 */
  border-radius: 8px; /* professional warmth */
  transition: all 150ms cubic-bezier(0.33, 1, 0.68, 1);
}`}</Code>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">JSON</p>
        <Code inline={false} language="json">{`{
  "colors": {
    "blue": "#B85032",
    "gold": "#7C9473",
    "neutral": {
      "50": "#FAF7F5",
      "900": "#2E2D2A"
    }
  }
}`}</Code>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Bash</p>
        <Code inline={false} language="bash">{`# Install dependencies
pnpm install

# Run Storybook
pnpm run storybook`}</Code>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code blocks for different languages. The "language" prop is stored for future syntax highlighting integration (currently not styled differently).',
      },
    },
  },
};

// Story 6: Inline Variants
export const InlineVariants: Story = {
  args: { children: 'code' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-4">
      <Text variant="body">
        Variable declaration: <Code>const name = 'Logan'</Code>
      </Text>

      <Text variant="body">
        Function call: <Code>console.log('Hello, world!')</Code>
      </Text>

      <Text variant="body">
        Object destructuring: <Code>{`const { id, name } = user`}</Code>
      </Text>

      <Text variant="body">
        CSS class: <Code>bg-blue-600</Code>
      </Text>

      <Text variant="body">
        File path: <Code>/components/atoms/Button.tsx</Code>
      </Text>

      <Text variant="body">
        Command: <Code>pnpm run build</Code>
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various inline code use cases: variables, functions, destructuring, CSS classes, file paths, commands. Consistent blue-700 color, JetBrains Mono font, 8-point grid spacing.',
      },
    },
  },
};

// Story 7: On Warm Background
export const OnWarmBackground: Story = {
  args: { children: 'code' },
  render: () => (
    <div className="bg-gray-50 p-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl font-semibold text-gray-900 mb-4">
          Implementation Guide
        </h2>

        <Text variant="body" className="mb-6">
          To use the Button component, import it from the atoms directory:{' '}
          <Code>import {`{ Button }`} from '@/components/atoms/Button'</Code>
        </Text>

        <Text variant="body" className="mb-6">
          The component uses <Code>class-variance-authority</Code> for type-safe variants.
          This allows autocomplete for the <Code>variant</Code> and <Code>size</Code> props.
        </Text>

        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="text-sm font-medium text-gray-600 mb-3">Example Usage:</p>
          <Code inline={false}>{`<Button
  variant="primary"
  size="md"
  rightIcon={<ArrowRightIcon />}
>
  View Case Study
</Button>`}</Code>
        </div>

        <Text variant="caption" className="mt-4">
          All design tokens are defined in <Code>app/globals.css</Code> and{' '}
          <Code>lib/design-tokens/</Code>
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code in realistic documentation context on warm gray-50 background (#FAF7F5). All design system tokens applied: JetBrains Mono font, blue-700 inline, gray-900 block, 8-point grid spacing, proper border radius.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 8: Interactive (Playground)
export const Interactive: Story = {
  args: {
    children: "const example = 'Interactive code'",
    inline: true,
    language: 'javascript',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test inline vs block code. Change "inline" to false to see block styling.',
      },
    },
  },
};
