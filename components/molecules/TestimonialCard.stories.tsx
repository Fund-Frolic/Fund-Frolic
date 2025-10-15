/**
 * TestimonialCard Molecule Stories
 *
 * Client/colleague testimonials with attribution.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TestimonialCard } from './TestimonialCard';

const meta = {
  title: 'Molecules/TestimonialCard',
  component: TestimonialCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Client/colleague testimonials with attribution. Container: bg-white border border-gray-200 rounded-lg p-6 shadow-sm. Quote: font-inter text-lg text-gray-700 leading-relaxed with blue-600 quotation marks. Avatar: 48px (lg), circular. Name: text-base font-semibold text-gray-900. Role/Company: text-sm text-gray-600. Layout: Vertical (avatar top) or horizontal (avatar left). Accessibility: <blockquote> semantic HTML.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    quote: {
      control: 'text',
      description: 'Testimonial quote text',
    },
    name: {
      control: 'text',
      description: "Person's name",
    },
    role: {
      control: 'text',
      description: "Person's role/title",
    },
    company: {
      control: 'text',
      description: 'Company name (optional)',
    },
    avatar: {
      control: 'text',
      description: 'Avatar image URL (optional)',
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout variant',
    },
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Vertical Layout
export const VerticalLayout: Story = {
  args: {
    quote: "Logan's work on our e-commerce platform exceeded expectations. The design system they created has made our development process 3x faster.",
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'ShopFlow',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    layout: 'vertical',
  },
  render: (args) => (
    <div className="w-96">
      <TestimonialCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout with avatar at top. Best for grid layouts.',
      },
    },
  },
};

// Story 2: Horizontal Layout
export const HorizontalLayout: Story = {
  args: {
    quote: "Working with Logan was a game-changer for our product. Their attention to detail and user-centric approach resulted in a 40% increase in user engagement.",
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    company: 'DataViz Inc',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    layout: 'horizontal',
  },
  render: (args) => (
    <div className="w-[600px]">
      <TestimonialCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout with avatar on left. Best for featured testimonials.',
      },
    },
  },
};

// Story 3: Without Avatar
export const WithoutAvatar: Story = {
  args: {
    quote: "The design system Logan created has become the foundation of our entire product suite. It's saved us countless hours and ensured consistency across all platforms.",
    name: 'Emily Thompson',
    role: 'Design Lead',
    company: 'TechCorp',
    layout: 'vertical',
  },
  render: (args) => (
    <div className="w-96">
      <TestimonialCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Testimonial without avatar image. Fallback shows initials (ET).',
      },
    },
  },
};

// Story 4: Without Company
export const WithoutCompany: Story = {
  args: {
    quote: "Logan's expertise in React and TypeScript helped us ship our MVP in record time. Highly recommend!",
    name: 'Alex Johnson',
    role: 'Founder',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    layout: 'vertical',
  },
  render: (args) => (
    <div className="w-96">
      <TestimonialCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Testimonial without company name. Role only shown.',
      },
    },
  },
};

// Story 5: Homepage Testimonials Grid
export const HomepageGrid: Story = {
  args: { quote: 'Quote', author: 'Author' },
  render: () => (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="font-display text-3xl font-bold text-gray-900 text-center mb-2">
        What People Say
      </h2>
      <p className="text-lg text-gray-700 text-center mb-12">
        Feedback from clients and colleagues I've worked with
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TestimonialCard
          quote="Logan's work on our design system was exceptional. The documentation alone is worth its weight in gold."
          name="Sarah Chen"
          role="CTO"
          company="ShopFlow"
          avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
          layout="vertical"
        />

        <TestimonialCard
          quote="Incredible attention to detail and a true understanding of user needs. Our metrics improved dramatically."
          name="Michael Rodriguez"
          role="Product Manager"
          company="DataViz Inc"
          avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
          layout="vertical"
        />

        <TestimonialCard
          quote="Working with Logan was a pleasure. They brought both technical expertise and creative problem-solving to every challenge."
          name="Emily Thompson"
          role="Design Lead"
          company="TechCorp"
          avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
          layout="vertical"
        />

        <TestimonialCard
          quote="The best developer I've worked with. Fast, reliable, and always thinking ahead about edge cases."
          name="James Wilson"
          role="Engineering Manager"
          company="CloudFlow"
          avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
          layout="vertical"
        />

        <TestimonialCard
          quote="Logan transformed our messy codebase into a well-organized, maintainable system. A game-changer for our team."
          name="Rachel Park"
          role="Lead Developer"
          company="StartupXYZ"
          avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
          layout="vertical"
        />

        <TestimonialCard
          quote="Not only talented but also a great communicator. Logan made complex technical concepts easy to understand."
          name="David Kim"
          role="Founder"
          company="InnovateLabs"
          avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80"
          layout="vertical"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Homepage testimonials in 3-column grid. Vertical layout for consistent card heights.',
      },
    },
  },
};

// Story 6: Featured Testimonial
export const FeaturedTestimonial: Story = {
  args: { quote: 'Quote', author: 'Author' },
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
        <h3 className="font-display text-xl font-semibold text-blue-900 mb-6 text-center">
          Featured Testimonial
        </h3>

        <TestimonialCard
          quote="Logan is one of those rare developers who combines deep technical knowledge with exceptional design sense. The work they did on our dashboard didn't just meet our requirements—it exceeded them in ways we hadn't even imagined. Our users love the new interface, and our development team loves how maintainable the code is."
          name="Sarah Chen"
          role="CTO"
          company="ShopFlow"
          avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
          layout="horizontal"
          className="bg-white"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Featured testimonial with horizontal layout. Highlighted with blue-50 background.',
      },
    },
  },
};

// Story 7: About Page Social Proof
export const AboutPageSocialProof: Story = {
  args: { quote: 'Quote', author: 'Author' },
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left: About content */}
        <div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-base text-gray-700 mb-4">
            I'm a full-stack developer and product designer based in Austin, Texas.
            I specialize in creating intuitive, data-driven web applications.
          </p>
          <p className="text-base text-gray-700">
            With 5+ years of experience, I've worked with startups and established
            companies to build scalable design systems and high-performance applications.
          </p>
        </div>

        {/* Right: Testimonial */}
        <TestimonialCard
          quote="Logan's ability to bridge the gap between design and development is unmatched. A true asset to any team."
          name="Emily Thompson"
          role="Design Lead"
          company="TechCorp"
          avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
          layout="vertical"
        />
      </div>

      {/* Additional testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TestimonialCard
          quote="Fast, reliable, and always delivers quality work. Highly recommend working with Logan."
          name="James Wilson"
          role="Engineering Manager"
          company="CloudFlow"
          avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
          layout="vertical"
        />

        <TestimonialCard
          quote="The design system Logan created has saved us countless hours and improved our product consistency."
          name="Rachel Park"
          role="Lead Developer"
          company="StartupXYZ"
          avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
          layout="vertical"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'About page with testimonials as social proof. Mix of layouts and positioning.',
      },
    },
  },
};

// Story 8: Case Study Client Feedback
export const CaseStudyFeedback: Story = {
  args: { quote: 'Quote', author: 'Author' },
  render: () => (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
        Austin Power Alert
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Real-time electricity monitoring dashboard for Austin, TX residents.
      </p>

      <div className="mb-8">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Impact
        </h3>
        <ul className="text-base text-gray-700 space-y-2">
          <li>• 10,000+ active users in first 3 months</li>
          <li>• 40% average reduction in electricity costs for users</li>
          <li>• Featured in Austin Chronicle and KXAN News</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-6">
          Client Testimonial
        </h3>

        <TestimonialCard
          quote="Logan took our idea and turned it into a product that's making a real difference in people's lives. The dashboard is intuitive, beautiful, and has helped thousands of Austin residents save money on their electricity bills. We couldn't have asked for a better partner."
          name="Michael Rodriguez"
          role="Founder"
          company="Austin Power Alert"
          avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
          layout="horizontal"
          className="bg-white"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Case study with client feedback testimonial. Horizontal layout for emphasis.',
      },
    },
  },
};

// Story 9: Single Column Stack
export const SingleColumnStack: Story = {
  args: { quote: 'Quote', author: 'Author' },
  render: () => (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
        Client Testimonials
      </h2>

      <div className="space-y-6">
        <TestimonialCard
          quote="Logan's work on our design system was exceptional. The documentation alone is worth its weight in gold."
          name="Sarah Chen"
          role="CTO"
          company="ShopFlow"
          avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
          layout="horizontal"
        />

        <TestimonialCard
          quote="Incredible attention to detail and a true understanding of user needs. Our metrics improved dramatically."
          name="Michael Rodriguez"
          role="Product Manager"
          company="DataViz Inc"
          avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
          layout="horizontal"
        />

        <TestimonialCard
          quote="Working with Logan was a pleasure. They brought both technical expertise and creative problem-solving to every challenge."
          name="Emily Thompson"
          role="Design Lead"
          company="TechCorp"
          avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
          layout="horizontal"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Single column stack of testimonials. Horizontal layout for better readability.',
      },
    },
  },
};

// Story 10: Different Quote Lengths
export const DifferentQuoteLengths: Story = {
  args: { quote: 'Quote', author: 'Author' },
  render: () => (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TestimonialCard
          quote="Excellent work!"
          name="Alex Johnson"
          role="Founder"
          avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
          layout="vertical"
        />

        <TestimonialCard
          quote="Logan's expertise in React and TypeScript helped us ship our MVP in record time. Highly recommend!"
          name="David Kim"
          role="CTO"
          company="StartupXYZ"
          avatar="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80"
          layout="vertical"
        />

        <TestimonialCard
          quote="Working with Logan was transformative for our team. Not only did they deliver a beautiful, high-performance application, but they also taught our developers best practices for React and TypeScript. The code quality has improved across the board, and we continue to benefit from the foundation they built."
          name="Rachel Park"
          role="Engineering Manager"
          company="TechCorp"
          avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
          layout="vertical"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different quote lengths. Cards expand vertically to fit content.',
      },
    },
  },
};

// Story 11: Accessibility Demo
export const AccessibilityDemo: Story = {
  args: { quote: 'Quote', author: 'Author' },
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>Semantic HTML</strong> - &lt;blockquote&gt; for quote text</li>
          <li>✅ <strong>Descriptive alt text</strong> - "Photo of [name]" for avatars</li>
          <li>✅ <strong>Avatar fallback</strong> - Initials shown when image unavailable</li>
          <li>✅ <strong>Quotation marks</strong> - Visual (") and decorative quote icon</li>
          <li>✅ <strong>Color contrast</strong> - WCAG AA compliant text colors</li>
          <li>✅ <strong>Readable text</strong> - text-lg with leading-relaxed for quotes</li>
          <li>✅ <strong>Attribution</strong> - Name, role, company clearly separated</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Example
        </h4>

        <TestimonialCard
          quote="This testimonial demonstrates all accessibility features. The quote is in a blockquote element, the avatar has descriptive alt text, and all text meets WCAG contrast requirements."
          name="Sarah Chen"
          role="CTO"
          company="ShopFlow"
          avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
          layout="vertical"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Container:</strong> bg-white, border-gray-200, rounded-lg, p-6, shadow-sm<br />
          <strong>Quote icon:</strong> w-8 h-8 (vertical), w-6 h-6 (horizontal), text-blue-600<br />
          <strong>Quote text:</strong> Inter text-lg, text-gray-700, leading-relaxed<br />
          <strong>Avatar:</strong> size="lg" (48px), circular<br />
          <strong>Name:</strong> Inter text-base font-semibold, text-gray-900<br />
          <strong>Role/Company:</strong> Inter text-sm, text-gray-600<br />
          <strong>Spacing:</strong> gap-3/gap-4 (8-point grid)<br />
          <strong>Layout vertical:</strong> flex-col with avatar at top<br />
          <strong>Layout horizontal:</strong> flex with avatar on left<br />
          <strong>Quote marks:</strong> Warm blue-600 (brand color)
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
    quote: "Logan's work on our design system exceeded expectations. The documentation and components have made our development process significantly faster.",
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'ShopFlow',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    layout: 'vertical',
  },
  render: (args) => (
    <div className="w-96">
      <TestimonialCard {...args} />
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
