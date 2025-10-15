/**
 * ProjectCard Molecule Stories
 *
 * Compound component for showcasing portfolio projects with flexible layouts.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProjectCard } from './ProjectCard';
import { Tag } from '../atoms/Tag';

const meta = {
  title: 'Molecules/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Compound component for portfolio projects. 4 layouts: grid (vertical), featured (prominent), horizontal (split), minimal (compact). Design system: white bg, gray-200 border, shadow-md → shadow-lg hover. Typography: Fraunces titles, Inter body. Transitions: 150ms ease-out.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['grid', 'featured', 'horizontal', 'minimal'],
      description: 'Card layout variant',
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Grid Layout (Default)
export const GridLayout: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <ProjectCard layout="grid">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
          alt="Analytics Dashboard"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Title>Austin Power Alert</ProjectCard.Title>
            <ProjectCard.Description>
              Real-time electricity monitoring dashboard for Austin, TX residents.
              Tracks usage patterns and sends alerts during peak pricing hours.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">Next.js</Tag>
            <Tag variant="success" size="sm">Supabase</Tag>
            <Tag variant="default" size="sm">TypeScript</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Stats>
            <ProjectCard.Stat icon="eye" value="1,245" label="Views" />
            <ProjectCard.Stat icon="heart" value="89" label="Likes" />
          </ProjectCard.Stats>
          <ProjectCard.Footer>
            <ProjectCard.Link href="/case-studies/austin">
              View Case Study
            </ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout: Vertical design with image top, content below. Default layout for project grids.',
      },
    },
  },
};

// Story 2: Featured Layout
export const FeaturedLayout: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ProjectCard layout="featured">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
          alt="E-commerce Platform"
          priority
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Badge variant="featured">Featured Project</ProjectCard.Badge>
            <ProjectCard.Title>Artisan Marketplace</ProjectCard.Title>
            <ProjectCard.Description>
              Full-stack e-commerce platform connecting local artisans with customers.
              Features real-time inventory, secure payments, and vendor analytics dashboard.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">React</Tag>
            <Tag variant="success" size="sm">Node.js</Tag>
            <Tag variant="blue" size="sm">PostgreSQL</Tag>
            <Tag variant="default" size="sm">Stripe</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Stats>
            <ProjectCard.Stat icon="eye" value="3,542" label="Views" />
            <ProjectCard.Stat icon="heart" value="287" label="Likes" />
          </ProjectCard.Stats>
          <ProjectCard.Footer>
            <ProjectCard.Link href="/case-studies/marketplace">
              View Case Study
            </ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Featured layout: Prominent display with larger spacing, badge, and subtle scale on hover. Use for hero projects.',
      },
    },
  },
};

// Story 3: Horizontal Layout
export const HorizontalLayout: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <ProjectCard layout="horizontal">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
          alt="Team Collaboration Tool"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Badge variant="new">New</ProjectCard.Badge>
            <ProjectCard.Title>CollabSpace</ProjectCard.Title>
            <ProjectCard.Description>
              Modern team collaboration platform with real-time messaging,
              file sharing, and project management tools built for remote teams.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="success" size="sm">Vue.js</Tag>
            <Tag variant="blue" size="sm">Firebase</Tag>
            <Tag variant="default" size="sm">Tailwind</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Footer>
            <ProjectCard.Link href="/case-studies/collabspace">
              View Case Study
            </ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout: Image left (40%), content right (60%). Good for search results and list views.',
      },
    },
  },
};

// Story 4: Minimal Layout
export const MinimalLayout: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <ProjectCard layout="minimal">
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Title>Design System 2.0</ProjectCard.Title>
            <ProjectCard.Description>
              Comprehensive design system with 50+ components, dark mode support,
              and accessibility-first approach.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">React</Tag>
            <Tag variant="success" size="sm">Storybook</Tag>
            <Tag variant="default" size="sm">Figma</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Footer>
            <ProjectCard.Link href="/case-studies/design-system">
              View Case Study
            </ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal layout: No image, compact design. Good for related projects or sidebar links.',
      },
    },
  },
};

// Story 5: Grid of Cards
export const GridOfCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 max-w-7xl">
      <ProjectCard layout="grid">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
          alt="Project 1"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Title>E-commerce Platform</ProjectCard.Title>
            <ProjectCard.Description>
              Modern shopping experience with AI-powered recommendations.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">Next.js</Tag>
            <Tag variant="success" size="sm">AI</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Footer>
            <ProjectCard.Link href="#">View Project</ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>

      <ProjectCard layout="grid">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
          alt="Project 2"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Title>Analytics Dashboard</ProjectCard.Title>
            <ProjectCard.Description>
              Real-time data visualization for business intelligence.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="success" size="sm">React</Tag>
            <Tag variant="default" size="sm">D3.js</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Footer>
            <ProjectCard.Link href="#">View Project</ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>

      <ProjectCard layout="grid">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
          alt="Project 3"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Title>Social Media App</ProjectCard.Title>
            <ProjectCard.Description>
              Mobile-first platform for creative professionals.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">React Native</Tag>
            <Tag variant="success" size="sm">GraphQL</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Footer>
            <ProjectCard.Link href="#">View Project</ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple cards in responsive grid layout. Typical project portfolio display.',
      },
    },
  },
};

// Story 6: With All Features
export const WithAllFeatures: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ProjectCard layout="featured">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop"
          alt="SaaS Application"
          priority
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Badge variant="featured">Featured</ProjectCard.Badge>
            <ProjectCard.Title>CloudFlow SaaS</ProjectCard.Title>
            <ProjectCard.Description>
              Enterprise workflow automation platform serving 10,000+ businesses.
              Features drag-and-drop builder, 100+ integrations, and advanced analytics.
              Scaled to handle millions of workflow executions per day.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">Next.js 14</Tag>
            <Tag variant="success" size="sm">PostgreSQL</Tag>
            <Tag variant="blue" size="sm">Redis</Tag>
            <Tag variant="success" size="sm">Docker</Tag>
            <Tag variant="default" size="sm">AWS</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Stats>
            <ProjectCard.Stat icon="eye" value="12,458" label="Views" />
            <ProjectCard.Stat icon="heart" value="1,024" label="Likes" />
          </ProjectCard.Stats>
          <ProjectCard.Footer>
            <ProjectCard.Link href="/case-studies/cloudflow">
              View Detailed Case Study
            </ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with all features: badge, image, title, description, tags, stats, and link.',
      },
    },
  },
};

// Story 7: Without Image
export const WithoutImage: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <ProjectCard layout="grid">
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Badge variant="new">New</ProjectCard.Badge>
            <ProjectCard.Title>Open Source CLI Tool</ProjectCard.Title>
            <ProjectCard.Description>
              Command-line interface for managing cloud infrastructure.
              Built with Go, featuring auto-completion and interactive prompts.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="success" size="sm">Go</Tag>
            <Tag variant="default" size="sm">CLI</Tag>
            <Tag variant="blue" size="sm">Open Source</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Stats>
            <ProjectCard.Stat icon="eye" value="892" label="Views" />
            <ProjectCard.Stat icon="heart" value="45" label="Likes" />
          </ProjectCard.Stats>
          <ProjectCard.Footer>
            <ProjectCard.Link href="#">View on GitHub</ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card without image. All other features still work in grid layout.',
      },
    },
  },
};

// Story 8: Horizontal List
export const HorizontalList: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4 p-8">
      <ProjectCard layout="horizontal">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
          alt="Project A"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Title>E-commerce Redesign</ProjectCard.Title>
            <ProjectCard.Description>
              Complete redesign of checkout flow resulting in 35% conversion increase.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">UX Design</Tag>
            <Tag variant="success" size="sm">A/B Testing</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Footer>
            <ProjectCard.Link href="#">Read Case Study</ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>

      <ProjectCard layout="horizontal">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
          alt="Project B"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Title>Mobile Banking App</ProjectCard.Title>
            <ProjectCard.Description>
              Secure mobile banking experience with biometric authentication and instant transfers.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="success" size="sm">React Native</Tag>
            <Tag variant="blue" size="sm">Security</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Footer>
            <ProjectCard.Link href="#">Read Case Study</ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>

      <ProjectCard layout="horizontal">
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
          alt="Project C"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Title>Learning Platform</ProjectCard.Title>
            <ProjectCard.Description>
              Interactive online courses with video lessons, quizzes, and progress tracking.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">Vue.js</Tag>
            <Tag variant="default" size="sm">Video</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Footer>
            <ProjectCard.Link href="#">Read Case Study</ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple horizontal cards stacked vertically. Good for search results or filtered lists.',
      },
    },
  },
};

// Story 9: Minimal Sidebar
export const MinimalSidebar: Story = {
  render: () => (
    <div className="flex gap-8 p-8 max-w-6xl">
      {/* Main content */}
      <div className="flex-1 bg-gray-100 rounded-md p-8">
        <h2 className="font-display text-3xl font-semibold text-gray-900 mb-4">
          Current Case Study
        </h2>
        <p className="text-gray-700">
          Main case study content would go here...
        </p>
      </div>

      {/* Sidebar with related projects */}
      <div className="w-80 space-y-4">
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">
          Related Projects
        </h3>

        <ProjectCard layout="minimal">
          <ProjectCard.Content>
            <ProjectCard.Header>
              <ProjectCard.Title>Design System</ProjectCard.Title>
              <ProjectCard.Description>
                Comprehensive component library with 50+ components.
              </ProjectCard.Description>
            </ProjectCard.Header>
            <ProjectCard.Tags>
              <Tag variant="blue" size="sm">React</Tag>
              <Tag variant="success" size="sm">Storybook</Tag>
            </ProjectCard.Tags>
            <ProjectCard.Footer>
              <ProjectCard.Link href="#">View Project</ProjectCard.Link>
            </ProjectCard.Footer>
          </ProjectCard.Content>
        </ProjectCard>

        <ProjectCard layout="minimal">
          <ProjectCard.Content>
            <ProjectCard.Header>
              <ProjectCard.Title>Mobile App</ProjectCard.Title>
              <ProjectCard.Description>
                Cross-platform mobile experience for iOS and Android.
              </ProjectCard.Description>
            </ProjectCard.Header>
            <ProjectCard.Tags>
              <Tag variant="success" size="sm">React Native</Tag>
            </ProjectCard.Tags>
            <ProjectCard.Footer>
              <ProjectCard.Link href="#">View Project</ProjectCard.Link>
            </ProjectCard.Footer>
          </ProjectCard.Content>
        </ProjectCard>

        <ProjectCard layout="minimal">
          <ProjectCard.Content>
            <ProjectCard.Header>
              <ProjectCard.Title>API Platform</ProjectCard.Title>
              <ProjectCard.Description>
                RESTful API serving millions of requests per day.
              </ProjectCard.Description>
            </ProjectCard.Header>
            <ProjectCard.Tags>
              <Tag variant="blue" size="sm">Node.js</Tag>
            </ProjectCard.Tags>
            <ProjectCard.Footer>
              <ProjectCard.Link href="#">View Project</ProjectCard.Link>
            </ProjectCard.Footer>
          </ProjectCard.Content>
        </ProjectCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal cards in sidebar for related projects. Compact design saves space.',
      },
    },
  },
};

// Story 10: Interactive (Playground)
export const Interactive: Story = {
  args: {
    layout: 'grid',
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ProjectCard {...args}>
        <ProjectCard.Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
          alt="Interactive Demo"
        />
        <ProjectCard.Content>
          <ProjectCard.Header>
            <ProjectCard.Badge variant="featured">Featured</ProjectCard.Badge>
            <ProjectCard.Title>Interactive Demo Project</ProjectCard.Title>
            <ProjectCard.Description>
              Use the controls to change the layout variant and see how the card adapts.
              Try grid, featured, horizontal, and minimal layouts.
            </ProjectCard.Description>
          </ProjectCard.Header>
          <ProjectCard.Tags>
            <Tag variant="blue" size="sm">React</Tag>
            <Tag variant="success" size="sm">TypeScript</Tag>
            <Tag variant="default" size="sm">Tailwind</Tag>
          </ProjectCard.Tags>
          <ProjectCard.Stats>
            <ProjectCard.Stat icon="eye" value="999" label="Views" />
            <ProjectCard.Stat icon="heart" value="42" label="Likes" />
          </ProjectCard.Stats>
          <ProjectCard.Footer>
            <ProjectCard.Link href="#">View Case Study</ProjectCard.Link>
          </ProjectCard.Footer>
        </ProjectCard.Content>
      </ProjectCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different layout variants.',
      },
    },
  },
};
