/**
 * StatCard Molecule Stories
 *
 * Display metrics with icon and label.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatCard } from './StatCard';

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Display metrics with icon and label. Container: bg-white border border-gray-200 rounded-lg p-6 text-center. Icon: 32px (w-8 h-8), text-blue-600. Number: font-display text-4xl font-bold text-gray-900. Label: text-gray-600 text-sm mt-2. Centered layout. Accessibility: Icon decorative (aria-hidden), number announced as text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Icon (React.ReactNode)',
    },
    value: {
      control: 'text',
      description: 'Metric value (string or number)',
    },
    label: {
      control: 'text',
      description: 'Description label',
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample icons
const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h6a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0112 13a22.95 22.95 0 01-10-2.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h6a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" clipRule="evenodd" />
    <path d="M2 13.692V16a2 2 0 002 2h16a2 2 0 002-2v-2.308A24.974 24.974 0 0112 15c-2.796 0-5.487-.46-8-1.308z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// Story 1: Years of Experience
export const YearsOfExperience: Story = {
  args: {
    icon: <CalendarIcon />,
    value: '5+',
    label: 'Years Experience',
  },
};

// Story 2: Projects Completed
export const ProjectsCompleted: Story = {
  args: {
    icon: <BriefcaseIcon />,
    value: '50+',
    label: 'Projects Completed',
  },
};

// Story 3: Happy Clients
export const HappyClients: Story = {
  args: {
    icon: <UsersIcon />,
    value: '30+',
    label: 'Happy Clients',
  },
};

// Story 4: Percentage Improvement
export const PercentageImprovement: Story = {
  args: {
    icon: <ChartIcon />,
    value: '50%',
    label: 'Performance Boost',
  },
};

// Story 5: About Page Stats
export const AboutPageStats: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto p-8">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
          By the Numbers
        </h2>
        <p className="text-lg text-gray-700">
          A snapshot of my professional journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<CalendarIcon />}
          value="5+"
          label="Years Experience"
        />
        <StatCard
          icon={<BriefcaseIcon />}
          value="50+"
          label="Projects Completed"
        />
        <StatCard
          icon={<UsersIcon />}
          value="30+"
          label="Happy Clients"
        />
        <StatCard
          icon={<StarIcon />}
          value="4.9"
          label="Average Rating"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'About page stats in 4-column grid. Shows professional metrics.',
      },
    },
  },
};

// Story 6: Homepage Metrics
export const HomepageMetrics: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50">
      <div className="bg-white rounded-xl p-12">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Proven Track Record
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            I've helped startups and established companies build better products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={<BriefcaseIcon />}
            value="50+"
            label="Projects Delivered"
          />
          <StatCard
            icon={<UsersIcon />}
            value="30+"
            label="Satisfied Clients"
          />
          <StatCard
            icon={<TrophyIcon />}
            value="10+"
            label="Awards Won"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Homepage metrics section with 3-column grid.',
      },
    },
  },
};

// Story 7: Case Study Results
export const CaseStudyResults: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
        Austin Power Alert
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Real-time electricity monitoring dashboard for Austin, TX residents.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h3 className="font-display text-xl font-semibold text-blue-900 mb-6 text-center">
          Impact & Results
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<UsersIcon />}
            value="10K+"
            label="Active Users"
          />
          <StatCard
            icon={<ChartIcon />}
            value="40%"
            label="Cost Reduction"
          />
          <StatCard
            icon={<StarIcon />}
            value="4.8"
            label="App Store Rating"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Case study results with project impact metrics.',
      },
    },
  },
};

// Story 8: Different Value Formats
export const DifferentValueFormats: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
        Different Value Formats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<CalendarIcon />}
          value="5+"
          label="Years (with plus sign)"
        />
        <StatCard
          icon={<ChartIcon />}
          value="50%"
          label="Percentage"
        />
        <StatCard
          icon={<StarIcon />}
          value="4.9"
          label="Decimal"
        />
        <StatCard
          icon={<ClockIcon />}
          value="24/7"
          label="Fraction"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different value formats: plus signs, percentages, decimals, fractions.',
      },
    },
  },
};

// Story 9: Two Column Grid
export const TwoColumnGrid: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={<BriefcaseIcon />}
          value="50+"
          label="Projects Completed"
        />
        <StatCard
          icon={<UsersIcon />}
          value="30+"
          label="Happy Clients"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two-column grid layout for smaller stat sections.',
      },
    },
  },
};

// Story 10: Single Stat Feature
export const SingleStatFeature: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-8">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
        <h3 className="font-display text-xl font-semibold text-blue-900 mb-6 text-center">
          Featured Achievement
        </h3>
        <StatCard
          icon={<TrophyIcon />}
          value="10+"
          label="Industry Awards"
          className="bg-white"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Single stat as featured achievement with highlighted background.',
      },
    },
  },
};

// Story 11: Performance Metrics
export const PerformanceMetrics: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <h3 className="font-display text-2xl font-semibold text-gray-900 mb-6 text-center">
        Performance Improvements
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<ChartIcon />}
          value="50%"
          label="Faster Load Time"
        />
        <StatCard
          icon={<ChartIcon />}
          value="3x"
          label="Development Speed"
        />
        <StatCard
          icon={<ChartIcon />}
          value="90+"
          label="Lighthouse Score"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance metrics showing technical improvements.',
      },
    },
  },
};

// Story 12: Tech Stack Stats
export const TechStackStats: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto p-8">
      <h3 className="font-display text-2xl font-semibold text-gray-900 mb-8 text-center">
        Technical Expertise
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<CodeIcon />}
          value="10+"
          label="Languages"
        />
        <StatCard
          icon={<CodeIcon />}
          value="20+"
          label="Frameworks"
        />
        <StatCard
          icon={<BriefcaseIcon />}
          value="50K+"
          label="Lines of Code"
        />
        <StatCard
          icon={<ClockIcon />}
          value="5K+"
          label="Hours Coded"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tech stack statistics showing technical depth.',
      },
    },
  },
};

// Story 13: Large Numbers
export const LargeNumbers: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<UsersIcon />}
          value="10,000+"
          label="App Downloads"
        />
        <StatCard
          icon={<CodeIcon />}
          value="100K+"
          label="Lines of Code"
        />
        <StatCard
          icon={<ClockIcon />}
          value="5,000+"
          label="Development Hours"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Large numbers with comma separators. Fraunces handles them well.',
      },
    },
  },
};

// Story 14: Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>Icon decorative</strong> - aria-hidden="true" (not announced)</li>
          <li>✅ <strong>Value as text</strong> - Screen readers announce number naturally</li>
          <li>✅ <strong>Label provides context</strong> - Explains what the number represents</li>
          <li>✅ <strong>Semantic HTML</strong> - Paragraph tags for proper structure</li>
          <li>✅ <strong>Clear hierarchy</strong> - Icon → Value → Label logical flow</li>
          <li>✅ <strong>No interaction required</strong> - Information is static and visible</li>
          <li>✅ <strong>High contrast</strong> - text-gray-900 on white background</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Example
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Screen readers will announce: "50+, Projects Completed" for this stat card.
          The icon is decorative and not announced.
        </p>

        <StatCard
          icon={<BriefcaseIcon />}
          value="50+"
          label="Projects Completed"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Container:</strong> bg-white, border-gray-200, rounded-lg, p-6<br />
          <strong>Layout:</strong> text-center (all content centered)<br />
          <strong>Icon:</strong> w-8 h-8 (32px), text-blue-600, mb-4<br />
          <strong>Value:</strong> Fraunces text-4xl font-bold, text-gray-900<br />
          <strong>Label:</strong> Inter text-sm, text-gray-600, mt-2<br />
          <strong>Spacing:</strong> 8-point grid (p-6, mb-4, mt-2)<br />
          <strong>Brand color:</strong> blue-600 for icons (not generic blue)<br />
          <strong>Typography:</strong> Fraunces for numbers adds character<br />
          <strong>Accessibility:</strong> Icon aria-hidden, value announced as text
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
    icon: <BriefcaseIcon />,
    value: '50+',
    label: 'Projects Completed',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different values and labels.',
      },
    },
  },
};
