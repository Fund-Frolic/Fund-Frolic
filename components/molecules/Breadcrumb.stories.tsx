/**
 * Breadcrumb Molecule Stories
 *
 * Navigation breadcrumbs for deep pages with ChevronRight separators.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation breadcrumbs for deep pages. Link: gray-600 → blue-600 on hover, text-sm (14px). Current page: gray-900 font-medium (not a link). Separator: ChevronRight icon (8px), gray-400. Container: flex with gap-2 (8-point grid). Accessibility: nav with aria-label="Breadcrumb", ol/li structure, aria-current="page".',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Two Levels
export const TwoLevels: Story = {
  args: {
    items: [
      { href: '/', label: 'Home' },
      { label: 'About' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple two-level breadcrumb. Current page (About) is bold and not a link.',
      },
    },
  },
};

// Story 2: Three Levels
export const ThreeLevels: Story = {
  args: {
    items: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { label: 'Austin Power Alert' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Three-level breadcrumb for case study pages. Shows navigation hierarchy.',
      },
    },
  },
};

// Story 3: Deep Navigation
export const DeepNavigation: Story = {
  args: {
    items: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { href: '/projects/web', label: 'Web Apps' },
      { href: '/projects/web/saas', label: 'SaaS' },
      { label: 'CloudFlow' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Deep navigation breadcrumb with 5 levels. Wraps on small screens.',
      },
    },
  },
};

// Story 4: Case Study Page
export const CaseStudyPage: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white">
      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Projects' },
          { label: 'Austin Power Alert' },
        ]}
      />

      <div className="mt-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
          Austin Power Alert
        </h1>
        <p className="text-lg text-gray-700">
          Real-time electricity monitoring dashboard for Austin, TX residents.
          Tracks usage patterns and sends alerts during peak pricing hours.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb on case study page. Positioned above page title.',
      },
    },
  },
};

// Story 5: Blog Post
export const BlogPost: Story = {
  render: () => (
    <div className="max-w-3xl p-8 bg-white">
      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { href: '/blog/design', label: 'Design' },
          { label: 'Building a Design System from Scratch' },
        ]}
      />

      <article className="mt-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
          Building a Design System from Scratch
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Published on January 15, 2024 • 8 min read
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          Creating a design system is a significant undertaking that requires careful
          planning, collaboration, and iteration...
        </p>
      </article>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb on blog post with category navigation.',
      },
    },
  },
};

// Story 6: Product Category
export const ProductCategory: Story = {
  render: () => (
    <div className="max-w-6xl p-8 bg-gray-50">
      <div className="bg-white p-6 rounded-md border border-gray-200">
        <Breadcrumb
          items={[
            { href: '/', label: 'Home' },
            { href: '/shop', label: 'Shop' },
            { href: '/shop/electronics', label: 'Electronics' },
            { href: '/shop/electronics/laptops', label: 'Laptops' },
            { label: 'MacBook Pro 16"' },
          ]}
        />

        <div className="mt-6 grid grid-cols-2 gap-8">
          <div className="bg-gray-200 aspect-video rounded-md" />
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
              MacBook Pro 16"
            </h1>
            <p className="text-2xl text-blue-600 font-semibold mb-4">
              $2,499
            </p>
            <p className="text-base text-gray-700">
              Powerful performance for professional workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'E-commerce breadcrumb showing deep category hierarchy.',
      },
    },
  },
};

// Story 7: Documentation Page
export const DocumentationPage: Story = {
  render: () => (
    <div className="flex gap-8 max-w-7xl p-8">
      {/* Sidebar */}
      <aside className="w-64 bg-white border border-gray-200 rounded-md p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Components</h3>
        <nav className="text-sm text-gray-700 space-y-1">
          <a href="#" className="block hover:text-blue-600">Atoms</a>
          <a href="#" className="block hover:text-blue-600">Molecules</a>
          <a href="#" className="block hover:text-blue-600">Organisms</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <Breadcrumb
          items={[
            { href: '/', label: 'Docs' },
            { href: '/components', label: 'Components' },
            { href: '/components/molecules', label: 'Molecules' },
            { label: 'Breadcrumb' },
          ]}
        />

        <div className="mt-6">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Breadcrumb
          </h1>
          <p className="text-lg text-gray-700">
            Navigation breadcrumbs for deep pages with hierarchical structure.
          </p>
        </div>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Documentation site breadcrumb with sidebar navigation.',
      },
    },
  },
};

// Story 8: Mobile Responsive
export const MobileResponsive: Story = {
  render: () => (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-md">
      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Projects' },
          { href: '/projects/web', label: 'Web Development' },
          { label: 'E-commerce Platform' },
        ]}
      />

      <div className="mt-6">
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
          E-commerce Platform
        </h2>
        <p className="text-sm text-gray-700">
          Full-stack shopping experience with AI recommendations.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile layout showing breadcrumb wrapping on small screens (flex-wrap).',
      },
    },
  },
};

// Story 9: With Custom Styling
export const WithCustomStyling: Story = {
  render: () => (
    <div className="bg-blue-900 p-8 rounded-md">
      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' },
          { label: 'Team' },
        ]}
        className="[&_a]:text-blue-200 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-blue-400"
      />

      <div className="mt-6">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Our Team
        </h1>
        <p className="text-blue-100">
          Meet the people behind our success.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom styling for dark backgrounds. Colors adjusted for contrast.',
      },
    },
  },
};

// Story 10: Hover States Demo
export const HoverStates: Story = {
  render: () => (
    <div className="bg-gray-100 p-8 rounded-md">
      <p className="text-sm text-gray-700 mb-4">
        Hover over breadcrumb links to see color transitions
      </p>

      <Breadcrumb
        items={[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Projects' },
          { href: '/projects/web', label: 'Web Apps' },
          { label: 'SaaS Platform' },
        ]}
      />

      <div className="mt-6 text-xs text-gray-600 space-y-1">
        <p>• Links: gray-600 → blue-600 on hover</p>
        <p>• Current page: gray-900 font-medium (not a link)</p>
        <p>• Separator: ChevronRight 8px, gray-400</p>
        <p>• Spacing: gap-2 (8px, 8-point grid)</p>
        <p>• Transition: 150ms ease-out</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of hover state transitions. Links change from gray-600 to blue-600.',
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
          <li>✅ <strong>Semantic HTML</strong> - nav with aria-label="Breadcrumb"</li>
          <li>✅ <strong>List structure</strong> - ol with li items (proper hierarchy)</li>
          <li>✅ <strong>aria-current="page"</strong> - Marks current page for screen readers</li>
          <li>✅ <strong>Keyboard navigation</strong> - Tab through links, Enter to navigate</li>
          <li>✅ <strong>Visual separator</strong> - ChevronRight icon (not text slash)</li>
          <li>✅ <strong>Color contrast</strong> - WCAG AA compliant (gray-600 on white)</li>
          <li>✅ <strong>Flexible wrapping</strong> - flex-wrap for small screens</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Keyboard Navigation Test
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Press Tab to navigate through the breadcrumb links. Current page is not
          focusable (not a link). Press Enter on links to navigate.
        </p>

        <Breadcrumb
          items={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/about/team', label: 'Team' },
            { label: 'Leadership' },
          ]}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Typography:</strong> Inter text-sm (14px), font-medium for current<br />
          <strong>Colors:</strong> gray-600 → blue-600 (links), gray-900 (current)<br />
          <strong>Spacing:</strong> gap-2 (8px) on 8-point grid<br />
          <strong>Icons:</strong> ChevronRight w-2 h-2 (8px), gray-400<br />
          <strong>Transitions:</strong> 150ms ease-out (duration-fast)<br />
          <strong>Layout:</strong> flex items-center with flex-wrap
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
  args: {
    items: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { label: 'Current Page' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - edit items array to test different breadcrumb structures.',
      },
    },
  },
};
