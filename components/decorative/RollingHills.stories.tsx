import type { Meta, StoryObj } from '@storybook/react';
import { RollingHills } from './RollingHills';

const meta: Meta<typeof RollingHills> = {
  title: 'Components/Decorative/RollingHills',
  component: RollingHills,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sophisticated decorative background element featuring 4 layers of organic rolling hills with natural topography. Each layer uses gold color tokens at graduated opacity levels (0.08-0.25) to create depth and atmospheric perspective. Staggered float animations add subtle movement. Reinforces the "frolic" brand personality with a whimsical, ethereal landscape.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RollingHills>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen bg-gradient-to-br from-blue-50 via-background to-gold-50">
      <RollingHills />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Rolling Hills Background
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-md">
            Subtle decorative element that adds depth and reinforces the playful brand personality.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-background to-gold-50">
      <RollingHills />
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-display text-5xl font-bold text-foreground">
            The funding buddy you actually want on your team.
          </h1>
          <p className="font-body text-xl text-muted-foreground">
            Millions in federal, state, and private grants go unclaimed every year… and a bunch of them could be perfect for your startup.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background-elevated rounded-xl p-6 shadow-lg">
                <h3 className="font-body text-lg font-semibold mb-2">Feature {i}</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Example content to show how hills work behind page content.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};
