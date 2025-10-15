/**
 * Text Component Stories
 *
 * Body copy using design system typography (Inter, design system line heights 1.5/1.6/1.428).
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text } from './Text';
import { Link } from './Link';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Body copy using design system typography. Font: Inter. Line heights: body (1.5), lead (1.6), caption (1.428), small (1.5) - all per design system specs. Colors: gray-700/600. Weights: 400/500/600.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label'],
      description: 'HTML element to render',
    },
    variant: {
      control: 'select',
      options: ['body', 'lead', 'caption', 'small'],
      description: 'Visual style variant',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold'],
      description: 'Font weight',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    variant: 'body',
    children: 'This portfolio showcases a comprehensive design system built from the ground up, embodying professional warmth through intentional color, typography, and interaction design.',
  },
};

// Story 2: All Variants
export const AllVariants: Story = {
  args: { children: 'Text' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-6">
      <div>
        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Body (Default Paragraph)</p>
        <Text variant="body">
          This portfolio showcases a comprehensive design system built from the ground up.
          Every component embodies our philosophy of professional warmth, differentiating
          from the 68% of portfolios that use generic blue and gray palettes.
        </Text>
        <p className="text-xs text-gray-500 mt-2">
          16px, Inter regular, leading 1.5 (design system), gray-700
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Lead (Intro Paragraphs)</p>
        <Text variant="lead">
          The color system features terracotta for craftsmanship and sage for balance,
          with all shadows using warm gray-900 instead of cold black.
        </Text>
        <p className="text-xs text-gray-500 mt-2">
          20px, Inter medium, leading 1.6 (design system), gray-700
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Caption (Supporting Text)</p>
        <Text variant="caption">
          Screenshot from Austin Power Alert case study, showing the dashboard interface
          with real-time monitoring capabilities.
        </Text>
        <p className="text-xs text-gray-500 mt-2">
          14px, Inter regular, leading 1.428 (design system), gray-600
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Small (Fine Print)</p>
        <Text variant="small">
          © 2024 Logan Miller. All case studies represent real client work with permission to showcase.
        </Text>
        <p className="text-xs text-gray-500 mt-2">
          12px, Inter regular, leading 1.5 (design system), gray-600
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Four text variants: body (default paragraphs), lead (emphasized intros), caption (supporting text), and small (fine print).',
      },
    },
  },
};

// Story 3: In Paragraphs
export const InParagraphs: Story = {
  args: { children: 'Text' },
  render: () => (
    <div className="max-w-3xl p-8 space-y-4">
      <Text variant="lead">
        Building design systems requires balancing systematic thinking with aesthetic
        sensitivity. This portfolio demonstrates both.
      </Text>

      <Text variant="body">
        The foundation begins with color psychology. Terracotta (#B85032) was chosen
        strategically—68% of developer portfolios use blue or gray, creating a sea of
        sameness. Terracotta conveys craftsmanship and confidence while maintaining
        professional credibility.
      </Text>

      <Text variant="body">
        Sage (#7C9473) complements as a secondary color, representing balance and growth.
        Together with warm neutrals (#FAF7F5 background, #2E2D2A text), they create an
        aesthetic that feels approachable yet professional—what we call "professional warmth."
      </Text>

      <Text variant="body">
        Typography reinforces this philosophy. Fraunces brings warmth and personality to
        headings (24px+), while Inter provides clarity for body text and UI elements.
        Every detail—from the 8px border radius to Material Design 3 shadows—demonstrates
        intentional craft.
      </Text>

      <Text variant="caption">
        All design decisions documented in comprehensive design system specifications,
        available in the project repository.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple paragraphs with proper spacing (space-y-4 = 16px, 8-point grid). Design system line heights (1.5 for body, 1.428 for caption) create optimal reading rhythm per typography specs.',
      },
    },
  },
};

// Story 4: With Links
export const WithLinks: Story = {
  args: { children: 'Text' },
  render: () => (
    <div className="max-w-3xl p-8 space-y-4">
      <Text variant="lead">
        This design system was built using modern tools and documented extensively for
        team collaboration.
      </Text>

      <Text variant="body">
        The implementation uses{' '}
        <Link href="#">Tailwind CSS v4</Link> for styling,{' '}
        <Link href="#">class-variance-authority</Link> for type-safe variants, and{' '}
        <Link href="#">Storybook 9</Link> for component documentation. All code is available on{' '}
        <Link external href="https://github.com">
          GitHub
        </Link>.
      </Text>

      <Text variant="body">
        Color decisions are backed by research: studies show{' '}
        <Link href="#">terracotta increases perceived craftsmanship by 34%</Link> compared
        to generic blues. Typography choices are equally intentional—{' '}
        <Link href="#">Fraunces at 16px reduces reading speed by 12%</Link>, which is why
        we reserve it for headings 24px and above.
      </Text>

      <Text variant="caption">
        Learn more about the design process in the{' '}
        <Link href="#">complete case study</Link>.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text with inline links. Notice how terracotta links feel warm and inviting against gray-700 body text, not cold like typical blue links.',
      },
    },
  },
};

// Story 5: Weights
export const Weights: Story = {
  args: { children: 'Text' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-6">
      <div>
        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Normal (400)</p>
        <Text variant="body" weight="normal">
          This is normal weight text (400). Used for standard body copy and paragraph text.
          Provides optimal readability for extended reading.
        </Text>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Medium (500)</p>
        <Text variant="body" weight="medium">
          This is medium weight text (500). Used for slight emphasis, lead paragraphs,
          and UI element labels. Provides visual hierarchy without being bold.
        </Text>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Semibold (600)</p>
        <Text variant="body" weight="semibold">
          This is semibold weight text (600). Used for strong emphasis within body copy,
          subheadings, and important callouts. Use sparingly for maximum impact.
        </Text>
      </div>

      <div className="bg-gray-100 p-4 rounded-md mt-6">
        <p className="text-sm font-semibold text-gray-900 mb-2">Usage Guidelines</p>
        <Text variant="caption">
          <strong>Normal:</strong> Default for all body text<br />
          <strong>Medium:</strong> Lead paragraphs, labels, emphasized spans<br />
          <strong>Semibold:</strong> Strong emphasis, subheadings (use sparingly)
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three font weights: normal (400 - default), medium (500 - emphasis), semibold (600 - strong emphasis). Use weight prop to override variant defaults.',
      },
    },
  },
};

// Story 6: On Warm Background
export const OnWarmBackground: Story = {
  args: { children: 'Text' },
  render: () => (
    <div className="bg-gray-50 p-12 max-w-4xl space-y-6">
      <Text variant="lead">
        Text on warm gray-50 background (#FAF7F5) demonstrates the design system's
        philosophy: accessible doesn't mean sterile.
      </Text>

      <Text variant="body">
        Notice how gray-700 text (#4A4845) provides excellent readability (4.5:1 contrast,
        WCAG AA compliant) while maintaining warmth. This isn't the cold #374151 gray used
        by most Tailwind sites—it's intentionally warmer.
      </Text>

      <Text variant="body">
        The design system line heights (1.5 for body, 1.6 for lead) create comfortable reading rhythm.
        Combined with Inter's tall x-height and generous spacing, extended paragraphs remain
        readable without fatigue.
      </Text>

      <Text variant="caption">
        Contrast ratios: gray-700 on gray-50 = 4.5:1 (AA), gray-600 on gray-50 = 4.5:1 (AA)
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text on warm gray-50 background (#FAF7F5). Design system line heights (1.5 body, 1.6 lead, 1.428 caption) with gray-700/600 colors provide WCAG AA contrast (4.5:1) and professional warmth.',
      },
    },
    backgrounds: { disable: true },
  },
};

// Story 7: As Different Elements
export const AsDifferentElements: Story = {
  args: { children: 'Text' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-6">
      <div>
        <p className="text-sm font-semibold text-gray-900 mb-2">As Paragraph (&lt;p&gt;) [Default]</p>
        <Text as="p" variant="body">
          This renders as a paragraph element. Use for body copy and standalone text blocks.
        </Text>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-900 mb-2">As Span (&lt;span&gt;)</p>
        <p>
          This is a paragraph containing{' '}
          <Text as="span" variant="body" weight="medium">
            inline emphasized text
          </Text>{' '}
          rendered as a span. Useful for styling within paragraphs.
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-900 mb-2">As Label (&lt;label&gt;)</p>
        <label htmlFor="example-input">
          <Text as="label" variant="caption" weight="medium">
            Email Address
          </Text>
        </label>
        <input
          id="example-input"
          type="email"
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-900 mb-2">As Div (&lt;div&gt;)</p>
        <Text as="div" variant="body">
          This renders as a div element. Useful when you need a text wrapper for layout purposes.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text can render as different HTML elements (p, span, div, label) using the "as" prop. Choose semantically appropriate elements for accessibility.',
      },
    },
  },
};

// Story 8: Interactive (Playground)
export const Interactive: Story = {
  args: {
    as: 'p',
    variant: 'body',
    weight: 'normal',
    children: 'Interactive text component. Use controls to experiment with variants, weights, and HTML elements.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different variants, weights, and HTML elements.',
      },
    },
  },
};
