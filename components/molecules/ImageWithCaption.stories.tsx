/**
 * ImageWithCaption Molecule Stories
 *
 * Images with descriptive captions for case studies.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ImageWithCaption } from './ImageWithCaption';

const meta = {
  title: 'Molecules/ImageWithCaption',
  component: ImageWithCaption,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Images with descriptive captions for case studies. Image: Uses Image atom (aspect ratio, rounded-lg). Caption: text-gray-600 text-sm text-center mt-3 (Inter). Credit: text-gray-500 text-xs (optional photographer credit). Container: <figure> with <figcaption>. Accessibility: Semantic HTML, alt text, caption association.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    caption: {
      control: 'text',
      description: 'Caption text',
    },
    credit: {
      control: 'text',
      description: 'Optional photographer credit',
    },
    aspectRatio: {
      control: 'select',
      options: ['16/9', '4/3', '1/1'],
      description: 'Image aspect ratio',
    },
    rounded: {
      control: 'select',
      options: ['md', 'lg', 'xl'],
      description: 'Border radius',
    },
  },
} satisfies Meta<typeof ImageWithCaption>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default (16:9)
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    alt: 'Dashboard with analytics charts',
    caption: 'Austin Power Alert real-time monitoring dashboard',
    aspectRatio: '16/9',
    rounded: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default 16:9 aspect ratio for case study screenshots. Caption centered below.',
      },
    },
  },
};

// Story 2: With Credit
export const WithCredit: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    alt: 'Developer working at desk',
    caption: 'Logan working on CloudFlow dashboard design',
    credit: 'Photo by Christopher Gower on Unsplash',
    aspectRatio: '16/9',
    rounded: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Image with photographer credit. Credit appears below caption in smaller, lighter text.',
      },
    },
  },
};

// Story 3: Square (1:1)
export const Square: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    alt: 'Portrait photo',
    caption: 'Logan Smith, Full-stack Developer & Designer',
    aspectRatio: '1/1',
    rounded: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Square 1:1 aspect ratio for portrait photos on About page.',
      },
    },
  },
};

// Story 4: 4:3 Aspect Ratio
export const FourThree: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
    alt: 'Wireframe sketches on paper',
    caption: 'Initial wireframe sketches for mobile app navigation',
    credit: 'Photo by Amélie Mourichon on Unsplash',
    aspectRatio: '4/3',
    rounded: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: '4:3 aspect ratio for process documentation and wireframe photos.',
      },
    },
  },
};

// Story 5: Case Study Screenshots
export const CaseStudyScreenshots: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white space-y-12">
      <div>
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">
          Austin Power Alert
        </h2>

        <ImageWithCaption
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
          alt="Dashboard showing real-time electricity data"
          caption="Real-time electricity monitoring dashboard with usage graphs and pricing alerts"
          aspectRatio="16/9"
          rounded="lg"
        />
      </div>

      <ImageWithCaption
        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80"
        alt="Mobile app screens showing alerts"
        caption="Push notification system alerts users during peak pricing hours"
        aspectRatio="16/9"
        rounded="lg"
      />

      <ImageWithCaption
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
        alt="Analytics dashboard with historical data"
        caption="Historical usage analytics help users identify consumption patterns"
        aspectRatio="16/9"
        rounded="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple screenshots in case study layout. Captions provide context for each screen.',
      },
    },
  },
};

// Story 6: About Page Profile
export const AboutPageProfile: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ImageWithCaption
          src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
          alt="Logan at workspace"
          caption="Working from my home office in Austin, TX"
          credit="Photo by LinkedIn Sales Navigator on Unsplash"
          aspectRatio="4/3"
          rounded="lg"
        />

        <div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            I'm a full-stack developer and product designer based in Austin, Texas.
            I specialize in creating intuitive, data-driven web applications.
          </p>
          <p className="text-base text-gray-700">
            With 5+ years of experience, I've worked on everything from SaaS platforms
            to e-commerce solutions, always focusing on user experience and performance.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Profile photo on About page with contextual caption.',
      },
    },
  },
};

// Story 7: Process Documentation
export const ProcessDocumentation: Story = {
  render: () => (
    <div className="max-w-3xl p-8 bg-white space-y-8">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
        Design Process
      </h2>

      <div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          1. Research & Discovery
        </h3>
        <ImageWithCaption
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80"
          alt="User research sticky notes"
          caption="Affinity mapping session to identify user pain points"
          aspectRatio="16/9"
          rounded="lg"
        />
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          2. Wireframing
        </h3>
        <ImageWithCaption
          src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80"
          alt="Paper wireframe sketches"
          caption="Low-fidelity wireframes exploring different navigation patterns"
          credit="Photo by Amélie Mourichon on Unsplash"
          aspectRatio="4/3"
          rounded="lg"
        />
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          3. High-Fidelity Design
        </h3>
        <ImageWithCaption
          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
          alt="Figma design mockups"
          caption="Figma mockups with complete design system integration"
          aspectRatio="16/9"
          rounded="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Process documentation with step-by-step visuals and explanatory captions.',
      },
    },
  },
};

// Story 8: Blog Post
export const BlogPost: Story = {
  render: () => (
    <article className="max-w-2xl p-8 bg-white">
      <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
        Building Accessible Web Applications
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        Published on January 15, 2024 • 8 min read
      </p>

      <p className="text-base text-gray-700 leading-relaxed mb-8">
        Accessibility isn't just a nice-to-have—it's essential for creating inclusive
        web experiences. Here's how I approach accessibility in my projects.
      </p>

      <ImageWithCaption
        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80"
        alt="Developer testing with screen reader"
        caption="Testing with VoiceOver to ensure screen reader compatibility"
        credit="Photo by KOBU Agency on Unsplash"
        aspectRatio="16/9"
        rounded="lg"
        className="mb-8"
      />

      <p className="text-base text-gray-700 leading-relaxed">
        Starting with semantic HTML and ARIA attributes ensures that assistive
        technologies can properly interpret your interface...
      </p>
    </article>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Blog post with inline image and caption. Caption provides context for article content.',
      },
    },
  },
};

// Story 9: Different Rounded Variants
export const RoundedVariants: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Rounded MD (8px)</h3>
        <ImageWithCaption
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"
          alt="Dashboard example"
          caption="Subtle rounding for tight layouts"
          aspectRatio="16/9"
          rounded="md"
          className="max-w-md"
        />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Rounded LG (12px, default)</h3>
        <ImageWithCaption
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"
          alt="Dashboard example"
          caption="Standard rounding for most use cases"
          aspectRatio="16/9"
          rounded="lg"
          className="max-w-md"
        />
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Rounded XL (16px)</h3>
        <ImageWithCaption
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"
          alt="Dashboard example"
          caption="Generous rounding for hero images"
          aspectRatio="16/9"
          rounded="xl"
          className="max-w-md"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different border radius options: md (8px), lg (12px), xl (16px).',
      },
    },
  },
};

// Story 10: Gallery Layout
export const GalleryLayout: Story = {
  render: () => (
    <div className="max-w-6xl p-8">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">
        Project Gallery
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ImageWithCaption
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
          alt="Analytics dashboard"
          caption="Real-time analytics dashboard"
          aspectRatio="4/3"
          rounded="lg"
        />

        <ImageWithCaption
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
          alt="Revenue charts"
          caption="Revenue tracking interface"
          aspectRatio="4/3"
          rounded="lg"
        />

        <ImageWithCaption
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"
          alt="Mobile app screens"
          caption="Mobile-first responsive design"
          aspectRatio="4/3"
          rounded="lg"
        />

        <ImageWithCaption
          src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80"
          alt="Team collaboration"
          caption="Collaborative features overview"
          credit="Photo by Marvin Meyer on Unsplash"
          aspectRatio="4/3"
          rounded="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gallery grid layout with 2 columns. Captions help users understand each screenshot.',
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
          <li>✅ <strong>Semantic HTML</strong> - &lt;figure&gt; and &lt;figcaption&gt; elements</li>
          <li>✅ <strong>Alt text</strong> - Describes image content for screen readers</li>
          <li>✅ <strong>Caption association</strong> - figcaption linked to image by figure</li>
          <li>✅ <strong>Credit attribution</strong> - Optional photographer credit for licensing</li>
          <li>✅ <strong>Responsive images</strong> - Scales to container width</li>
          <li>✅ <strong>Text hierarchy</strong> - Caption (text-sm) vs Credit (text-xs)</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Example with All Features
        </h4>

        <ImageWithCaption
          src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80"
          alt="Paper wireframe sketches showing app navigation flow with hand-drawn UI elements"
          caption="Early wireframe exploration for mobile banking app"
          credit="Photo by Amélie Mourichon on Unsplash"
          aspectRatio="4/3"
          rounded="lg"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Image:</strong> Uses Image atom (aspect ratio, rounded-lg)<br />
          <strong>Caption:</strong> text-sm, text-gray-600, text-center, mt-3<br />
          <strong>Credit:</strong> text-xs, text-gray-500, mt-1<br />
          <strong>Typography:</strong> Inter font family<br />
          <strong>Spacing:</strong> 8-point grid (mt-3 = 12px)<br />
          <strong>Container:</strong> Semantic &lt;figure&gt; element
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
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    alt: 'Dashboard with charts and graphs',
    caption: 'Interactive analytics dashboard',
    credit: 'Photo by Luke Chesser on Unsplash',
    aspectRatio: '16/9',
    rounded: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different props.',
      },
    },
  },
};
