/**
 * SkillBadge Molecule Stories
 *
 * Display skills with proficiency indicators.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SkillBadge } from './SkillBadge';

const meta = {
  title: 'Molecules/SkillBadge',
  component: SkillBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Display skills with proficiency indicators. Container: flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md. Icon: Technology icon (20px), text-gray-700. Label: font-inter text-sm font-medium text-gray-900. Proficiency: Optional dot indicator (1-3 dots for beginner/intermediate/expert). Hover: hover:bg-gray-200. Accessibility: Proficiency aria-label for screen readers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Technology icon (React.ReactNode)',
    },
    label: {
      control: 'text',
      description: 'Skill name',
    },
    proficiency: {
      control: 'select',
      options: [undefined, 1, 2, 3],
      description: 'Optional skill level (1-3)',
    },
  },
} satisfies Meta<typeof SkillBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample icons (simple SVGs)
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2" />
    <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">TS</text>
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="19" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="19" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6c-2 0-3.3.7-4 2 1-.7 2.2-1 3.5-.7.8.2 1.3.7 2 1.3 1 1 2.2 2 4.5 2 2 0 3.3-.7 4-2-1 .7-2.2 1-3.5.7-.8-.2-1.3-.7-2-1.3-1-1-2.2-2-4.5-2zm-4 6c-2 0-3.3.7-4 2 1-.7 2.2-1 3.5-.7.8.2 1.3.7 2 1.3 1 1 2.2 2 4.5 2 2 0 3.3-.7 4-2-1 .7-2.2 1-3.5.7-.8-.2-1.3-.7-2-1.3-1-1-2.2-2-4.5-2z" />
  </svg>
);

const NextJSIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <line x1="8" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1.5" />
    <line x1="14" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// Story 1: Expert Level
export const ExpertLevel: Story = {
  args: {
    icon: <ReactIcon />,
    label: 'React',
    proficiency: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Expert level skill (3 dots filled). All three proficiency dots are blue-600.',
      },
    },
  },
};

// Story 2: Intermediate Level
export const IntermediateLevel: Story = {
  args: {
    icon: <TypeScriptIcon />,
    label: 'TypeScript',
    proficiency: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Intermediate level skill (2 dots filled). Two dots blue-600, one gray-300.',
      },
    },
  },
};

// Story 3: Beginner Level
export const BeginnerLevel: Story = {
  args: {
    icon: <FigmaIcon />,
    label: 'Figma',
    proficiency: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Beginner level skill (1 dot filled). One dot blue-600, two gray-300.',
      },
    },
  },
};

// Story 4: No Proficiency
export const NoProficiency: Story = {
  args: {
    icon: <GitIcon />,
    label: 'Git',
  },
  parameters: {
    docs: {
      description: {
        story: 'Skill without proficiency indicator. No dots shown.',
      },
    },
  },
};

// Story 5: About Page Skills
export const AboutPageSkills: Story = {
  render: () => (
    <div className="max-w-3xl p-8 bg-white">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
        Skills & Technologies
      </h2>
      <p className="text-base text-gray-700 mb-8">
        Here are the tools and technologies I work with regularly.
      </p>

      <div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Frontend Development
        </h3>
        <div className="flex flex-wrap gap-2 mb-8">
          <SkillBadge icon={<ReactIcon />} label="React" proficiency={3} />
          <SkillBadge icon={<TypeScriptIcon />} label="TypeScript" proficiency={3} />
          <SkillBadge icon={<NextJSIcon />} label="Next.js" proficiency={3} />
          <SkillBadge icon={<TailwindIcon />} label="Tailwind CSS" proficiency={3} />
        </div>

        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Design Tools
        </h3>
        <div className="flex flex-wrap gap-2 mb-8">
          <SkillBadge icon={<FigmaIcon />} label="Figma" proficiency={3} />
          <SkillBadge icon={<FigmaIcon />} label="Adobe XD" proficiency={2} />
          <SkillBadge icon={<FigmaIcon />} label="Sketch" proficiency={1} />
        </div>

        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Developer Tools
        </h3>
        <div className="flex flex-wrap gap-2">
          <SkillBadge icon={<GitIcon />} label="Git" proficiency={3} />
          <SkillBadge icon={<GitIcon />} label="GitHub Actions" proficiency={2} />
          <SkillBadge icon={<GitIcon />} label="Docker" proficiency={2} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skills section on About page. Organized by category with proficiency indicators.',
      },
    },
  },
};

// Story 6: Case Study Tech Stack
export const CaseStudyTechStack: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white">
      <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
        Austin Power Alert
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Real-time electricity monitoring dashboard for Austin, TX residents.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          <SkillBadge icon={<ReactIcon />} label="React" />
          <SkillBadge icon={<TypeScriptIcon />} label="TypeScript" />
          <SkillBadge icon={<NextJSIcon />} label="Next.js" />
          <SkillBadge icon={<TailwindIcon />} label="Tailwind CSS" />
          <SkillBadge icon={<GitIcon />} label="PostgreSQL" />
          <SkillBadge icon={<GitIcon />} label="Vercel" />
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Project Overview
        </h3>
        <p className="text-base text-gray-700">
          Built with React and Next.js, this dashboard fetches real-time electricity
          pricing data from the ERCOT API and sends push notifications to users during
          peak pricing hours.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tech stack in case study. No proficiency dots (just listing technologies used).',
      },
    },
  },
};

// Story 7: Grid Layout
export const GridLayout: Story = {
  render: () => (
    <div className="max-w-2xl p-8">
      <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
        All Skills
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <SkillBadge icon={<ReactIcon />} label="React" proficiency={3} />
        <SkillBadge icon={<TypeScriptIcon />} label="TypeScript" proficiency={3} />
        <SkillBadge icon={<NextJSIcon />} label="Next.js" proficiency={3} />
        <SkillBadge icon={<TailwindIcon />} label="Tailwind" proficiency={3} />
        <SkillBadge icon={<FigmaIcon />} label="Figma" proficiency={3} />
        <SkillBadge icon={<GitIcon />} label="Git" proficiency={3} />
        <SkillBadge icon={<ReactIcon />} label="Node.js" proficiency={2} />
        <SkillBadge icon={<TypeScriptIcon />} label="Python" proficiency={2} />
        <SkillBadge icon={<GitIcon />} label="Docker" proficiency={2} />
        <SkillBadge icon={<FigmaIcon />} label="Sketch" proficiency={1} />
        <SkillBadge icon={<ReactIcon />} label="Vue.js" proficiency={1} />
        <SkillBadge icon={<GitIcon />} label="Kubernetes" proficiency={1} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout with 3 columns. Shows all proficiency levels.',
      },
    },
  },
};

// Story 8: Compact List
export const CompactList: Story = {
  render: () => (
    <div className="w-64 bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">
        Core Skills
      </h3>
      <div className="flex flex-col gap-2">
        <SkillBadge icon={<ReactIcon />} label="React" proficiency={3} className="w-full" />
        <SkillBadge icon={<TypeScriptIcon />} label="TypeScript" proficiency={3} className="w-full" />
        <SkillBadge icon={<TailwindIcon />} label="Tailwind CSS" proficiency={3} className="w-full" />
        <SkillBadge icon={<FigmaIcon />} label="Figma" proficiency={3} className="w-full" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact vertical list in sidebar. Full-width badges.',
      },
    },
  },
};

// Story 9: Resume Section
export const ResumeSection: Story = {
  render: () => (
    <div className="max-w-3xl p-8 bg-white">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">
          Logan Smith
        </h1>
        <p className="text-xl text-gray-700 mb-1">
          Full-stack Developer & Product Designer
        </p>
        <p className="text-base text-gray-600">
          Austin, TX • logan@example.com
        </p>
      </div>

      <div className="mb-8">
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
          Technical Skills
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Expert
            </h3>
            <div className="flex flex-wrap gap-2">
              <SkillBadge icon={<ReactIcon />} label="React" proficiency={3} />
              <SkillBadge icon={<TypeScriptIcon />} label="TypeScript" proficiency={3} />
              <SkillBadge icon={<NextJSIcon />} label="Next.js" proficiency={3} />
              <SkillBadge icon={<TailwindIcon />} label="Tailwind CSS" proficiency={3} />
              <SkillBadge icon={<FigmaIcon />} label="Figma" proficiency={3} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Intermediate
            </h3>
            <div className="flex flex-wrap gap-2">
              <SkillBadge icon={<ReactIcon />} label="Node.js" proficiency={2} />
              <SkillBadge icon={<TypeScriptIcon />} label="Python" proficiency={2} />
              <SkillBadge icon={<GitIcon />} label="Docker" proficiency={2} />
              <SkillBadge icon={<GitIcon />} label="PostgreSQL" proficiency={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resume/CV skills section. Grouped by proficiency level.',
      },
    },
  },
};

// Story 10: Hover States Demo
export const HoverStates: Story = {
  render: () => (
    <div className="bg-gray-100 p-8 rounded-md">
      <p className="text-sm text-gray-700 mb-6">
        Hover over badges to see background transition
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <SkillBadge icon={<ReactIcon />} label="React" proficiency={3} />
        <SkillBadge icon={<TypeScriptIcon />} label="TypeScript" proficiency={2} />
        <SkillBadge icon={<FigmaIcon />} label="Figma" proficiency={1} />
        <SkillBadge icon={<GitIcon />} label="Git" />
      </div>

      <div className="text-xs text-gray-600 space-y-1">
        <p>• Default: bg-gray-100, border-gray-200</p>
        <p>• Hover: bg-gray-200 (subtle change)</p>
        <p>• Transition: 150ms ease-out</p>
        <p>• Proficiency dots: 6px (w-1.5 h-1.5), gap-1 (4px)</p>
        <p>• Filled: blue-600, Empty: gray-300</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of hover states. Background lightens from gray-100 to gray-200.',
      },
    },
  },
};

// Story 11: Different Proficiency Levels
export const ProficiencyLevels: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Expert (3 dots)
        </h3>
        <div className="flex flex-wrap gap-2">
          <SkillBadge icon={<ReactIcon />} label="React" proficiency={3} />
          <SkillBadge icon={<TypeScriptIcon />} label="TypeScript" proficiency={3} />
          <SkillBadge icon={<TailwindIcon />} label="Tailwind CSS" proficiency={3} />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Intermediate (2 dots)
        </h3>
        <div className="flex flex-wrap gap-2">
          <SkillBadge icon={<NextJSIcon />} label="Next.js" proficiency={2} />
          <SkillBadge icon={<GitIcon />} label="Docker" proficiency={2} />
          <SkillBadge icon={<FigmaIcon />} label="Adobe XD" proficiency={2} />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Beginner (1 dot)
        </h3>
        <div className="flex flex-wrap gap-2">
          <SkillBadge icon={<ReactIcon />} label="Vue.js" proficiency={1} />
          <SkillBadge icon={<TypeScriptIcon />} label="Rust" proficiency={1} />
          <SkillBadge icon={<GitIcon />} label="Kubernetes" proficiency={1} />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          No Proficiency Indicator
        </h3>
        <div className="flex flex-wrap gap-2">
          <SkillBadge icon={<GitIcon />} label="Git" />
          <SkillBadge icon={<ReactIcon />} label="REST API" />
          <SkillBadge icon={<TypeScriptIcon />} label="GraphQL" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All proficiency levels side by side. Expert (3), Intermediate (2), Beginner (1), None (0).',
      },
    },
  },
};

// Story 12: Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>aria-label on dots</strong> - "Proficiency: Expert/Intermediate/Beginner"</li>
          <li>✅ <strong>Screen reader text</strong> - "React, Expert level" announcement</li>
          <li>✅ <strong>role="img"</strong> - Proficiency dots treated as image element</li>
          <li>✅ <strong>Icon aria-hidden</strong> - Decorative icon hidden from screen readers</li>
          <li>✅ <strong>Semantic markup</strong> - Clear label + indicator structure</li>
          <li>✅ <strong>Color + shape</strong> - Both color (terracotta/neutral) and shape (filled/empty) convey meaning</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Screen Reader Example
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Screen readers will announce: "React, Expert level" for a badge with 3 dots.
        </p>

        <div className="flex flex-wrap gap-2">
          <SkillBadge icon={<ReactIcon />} label="React" proficiency={3} />
          <SkillBadge icon={<TypeScriptIcon />} label="TypeScript" proficiency={2} />
          <SkillBadge icon={<FigmaIcon />} label="Figma" proficiency={1} />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Container:</strong> px-3 py-2 (12px × 8px), gap-2 (8px)<br />
          <strong>Background:</strong> gray-100 → gray-200 on hover<br />
          <strong>Border:</strong> border-gray-200, rounded-md (8px)<br />
          <strong>Icon:</strong> w-5 h-5 (20px), text-gray-700<br />
          <strong>Label:</strong> text-sm font-medium, text-gray-900<br />
          <strong>Dots:</strong> w-1.5 h-1.5 (6px), gap-1 (4px)<br />
          <strong>Filled dots:</strong> blue-600 (brand color)<br />
          <strong>Empty dots:</strong> gray-300<br />
          <strong>Transition:</strong> 150ms ease-out
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

// Story 13: Interactive (Playground)
export const Interactive: Story = {
  args: {
    icon: <ReactIcon />,
    label: 'React',
    proficiency: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different proficiency levels.',
      },
    },
  },
};
