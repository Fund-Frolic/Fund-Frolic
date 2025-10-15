/**
 * VideoEmbed Molecule Stories
 *
 * Embedded videos for case studies and demos.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VideoEmbed } from './VideoEmbed';

const meta = {
  title: 'Molecules/VideoEmbed',
  component: VideoEmbed,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Embedded videos for case studies and demos. Container: aspect-video rounded-lg overflow-hidden (16:9). Iframe: YouTube, Vimeo, or native video. Placeholder: Image with play button before load (performance). Caption: Below video (like ImageWithCaption). Lazy load: Load iframe on user interaction. Accessibility: iframe title, keyboard support (Tab + Enter).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'YouTube/Vimeo URL or video file',
    },
    title: {
      control: 'text',
      description: 'For iframe title (accessibility)',
    },
    caption: {
      control: 'text',
      description: 'Optional caption below video',
    },
    placeholder: {
      control: 'text',
      description: 'Thumbnail image (shown before load)',
    },
  },
} satisfies Meta<typeof VideoEmbed>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: YouTube Video
export const YouTubeVideo: Story = {
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Product Demo Video',
    caption: 'Austin Power Alert dashboard walkthrough',
    placeholder: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  parameters: {
    docs: {
      description: {
        story: 'YouTube video with placeholder. Click play button to load video (lazy loading).',
      },
    },
  },
};

// Story 2: Vimeo Video
export const VimeoVideo: Story = {
  args: {
    src: 'https://player.vimeo.com/video/148751763',
    title: 'Design Process Video',
    caption: 'CloudFlow design system development timelapse',
    placeholder: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vimeo video with placeholder. Click to load iframe.',
      },
    },
  },
};

// Story 3: Without Placeholder
export const WithoutPlaceholder: Story = {
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Auto-loading video',
    caption: 'Video loads immediately without placeholder',
  },
  parameters: {
    docs: {
      description: {
        story: 'Video without placeholder image. Iframe loads immediately (use sparingly for performance).',
      },
    },
  },
};

// Story 4: Without Caption
export const WithoutCaption: Story = {
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Product demo',
    placeholder: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  parameters: {
    docs: {
      description: {
        story: 'Video without caption. Just the video player.',
      },
    },
  },
};

// Story 5: Case Study Demo
export const CaseStudyDemo: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
        Austin Power Alert
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Real-time electricity monitoring dashboard for Austin, TX residents.
        Tracks usage patterns and sends alerts during peak pricing hours.
      </p>

      <VideoEmbed
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Austin Power Alert Dashboard Walkthrough"
        caption="Full product demo showing real-time monitoring, usage graphs, and alert system"
        placeholder="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
      />

      <div className="mt-8">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Key Features
        </h3>
        <ul className="text-base text-gray-700 space-y-2">
          <li>• Real-time electricity pricing data from ERCOT API</li>
          <li>• Push notifications during peak pricing hours</li>
          <li>• Historical usage analytics and pattern detection</li>
          <li>• Customizable alert thresholds</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Video in case study layout. Demonstrates product features with caption.',
      },
    },
  },
};

// Story 6: Process Video
export const ProcessVideo: Story = {
  render: () => (
    <div className="max-w-3xl p-8 bg-white space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
          Design Process
        </h2>
        <p className="text-base text-gray-700 mb-6">
          Watch how I built the CloudFlow design system from scratch, including
          component development, documentation, and iteration.
        </p>

        <VideoEmbed
          src="https://player.vimeo.com/video/148751763"
          title="Design System Development Timelapse"
          caption="30-day timelapse showing Figma design, React components, and Storybook documentation"
          placeholder="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80"
        />
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Tools Used
        </h3>
        <ul className="text-base text-gray-700 space-y-2">
          <li>• Figma for design and prototyping</li>
          <li>• React + TypeScript for components</li>
          <li>• Tailwind CSS for styling</li>
          <li>• Storybook for documentation</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Process documentation video showing design system development.',
      },
    },
  },
};

// Story 7: Blog Post with Video
export const BlogPostVideo: Story = {
  render: () => (
    <article className="max-w-2xl p-8 bg-white">
      <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
        Building Accessible Forms
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        Published on February 10, 2024 • 12 min read
      </p>

      <p className="text-base text-gray-700 leading-relaxed mb-8">
        Creating accessible forms requires attention to semantic HTML, ARIA attributes,
        and keyboard navigation. In this tutorial, I'll walk you through the process.
      </p>

      <VideoEmbed
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Accessible Forms Tutorial"
        caption="Step-by-step tutorial on building accessible form components with React and ARIA"
        placeholder="https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80"
        className="mb-8"
      />

      <p className="text-base text-gray-700 leading-relaxed">
        As shown in the video, starting with proper label associations and ARIA
        attributes ensures screen reader compatibility from the beginning...
      </p>
    </article>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tutorial video embedded in blog post. Caption provides context.',
      },
    },
  },
};

// Story 8: Multiple Videos
export const MultipleVideos: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white space-y-12">
      <div>
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">
          Video Gallery
        </h2>

        <div className="space-y-8">
          <VideoEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Dashboard Overview"
            caption="Real-time monitoring dashboard with live data visualization"
            placeholder="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
          />

          <VideoEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Mobile App Demo"
            caption="Mobile-first responsive design with push notifications"
            placeholder="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80"
          />

          <VideoEmbed
            src="https://player.vimeo.com/video/148751763"
            title="User Testing Session"
            caption="Usability testing highlights showing user feedback and iterations"
            placeholder="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple videos stacked vertically. Each loads independently on interaction.',
      },
    },
  },
};

// Story 9: Grid Layout
export const GridLayout: Story = {
  render: () => (
    <div className="max-w-6xl p-8">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">
        Product Videos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VideoEmbed
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Feature 1: Real-time Monitoring"
          caption="Live electricity pricing dashboard"
          placeholder="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
        />

        <VideoEmbed
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Feature 2: Smart Alerts"
          caption="Push notification system"
          placeholder="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"
        />

        <VideoEmbed
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Feature 3: Usage Analytics"
          caption="Historical data and insights"
          placeholder="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
        />

        <VideoEmbed
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Feature 4: Mobile App"
          caption="iOS and Android apps"
          placeholder="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout with 2 columns. Each video loads on demand.',
      },
    },
  },
};

// Story 10: Play Button Hover States
export const PlayButtonHover: Story = {
  render: () => (
    <div className="bg-gray-100 p-8 rounded-md">
      <p className="text-sm text-gray-700 mb-6">
        Hover over the play button to see interaction states
      </p>

      <VideoEmbed
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Hover state demo"
        caption="Play button darkens on hover (20% → 30% opacity overlay)"
        placeholder="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
        className="max-w-2xl mx-auto"
      />

      <div className="mt-6 text-xs text-gray-600 space-y-1">
        <p>• Play button: 64px (w-16 h-16), white with terracotta icon</p>
        <p>• Overlay: bg-black bg-opacity-20 → bg-opacity-30 on hover</p>
        <p>• Transition: 150ms ease-out</p>
        <p>• Focus ring: blue-600 with 2px offset</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of play button hover state. Overlay darkens on interaction.',
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
          <li>✅ <strong>iframe title</strong> - Describes video content for screen readers</li>
          <li>✅ <strong>Keyboard navigation</strong> - Tab to focus play button, Enter/Space to activate</li>
          <li>✅ <strong>Focus ring</strong> - blue-600 ring with 2px offset</li>
          <li>✅ <strong>aria-label</strong> - "Play video: [title]" on placeholder button</li>
          <li>✅ <strong>Lazy loading</strong> - Improves page load performance</li>
          <li>✅ <strong>Semantic HTML</strong> - figure/figcaption for videos with captions</li>
          <li>✅ <strong>Video captions</strong> - Assumes videos have closed captions enabled</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Keyboard Navigation Test
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Press Tab to focus the play button, then press Enter or Space to load the video.
          The focus ring should be clearly visible.
        </p>

        <VideoEmbed
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Keyboard navigation demo video"
          caption="Test keyboard interaction by tabbing to play button and pressing Enter"
          placeholder="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Container:</strong> aspect-video, rounded-lg (12px)<br />
          <strong>Placeholder bg:</strong> gray-100 (warm tone)<br />
          <strong>Play button:</strong> 64px circle, white with terracotta icon<br />
          <strong>Overlay:</strong> bg-black bg-opacity-20 → bg-opacity-30<br />
          <strong>Caption:</strong> text-sm, text-gray-600, text-center, mt-3<br />
          <strong>Typography:</strong> Inter font family<br />
          <strong>Transitions:</strong> 150ms ease-out<br />
          <strong>Focus ring:</strong> 2px blue-600 with 2px offset
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

// Story 12: Performance Benefits
export const PerformanceBenefits: Story = {
  render: () => (
    <div className="max-w-2xl p-8 bg-white">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
        Lazy Loading Benefits
      </h2>

      <div className="bg-gray-100 p-6 rounded-md mb-8">
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Why Lazy Load Videos?
        </h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• <strong>Faster page load</strong> - Defer heavy iframe resources</li>
          <li>• <strong>Reduced bandwidth</strong> - Only load when user wants to watch</li>
          <li>• <strong>Better UX</strong> - Page becomes interactive faster</li>
          <li>• <strong>Mobile-friendly</strong> - Save cellular data</li>
        </ul>
      </div>

      <VideoEmbed
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Performance optimization demo"
        caption="Video only loads when you click play, improving initial page load time"
        placeholder="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
      />

      <div className="mt-8 text-sm text-gray-700">
        <p>
          <strong>Tip:</strong> Use high-quality placeholder images from video thumbnails
          to give users a preview of the content.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Explanation of lazy loading benefits. Click to load demonstrates the pattern.',
      },
    },
  },
};

// Story 13: Interactive (Playground)
export const Interactive: Story = {
  args: {
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Product demo video',
    caption: 'Interactive video with caption',
    placeholder: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different props.',
      },
    },
  },
};
