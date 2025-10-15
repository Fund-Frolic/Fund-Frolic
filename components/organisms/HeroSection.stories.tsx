import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Components/Organisms/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Landing page hero section showcasing Grant Riders value proposition and key features. Left side displays marketing copy with headline, subheadline, and feature list. Right side is a placeholder for visual content.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {},
};

export const WithCustomBackground: Story = {
  args: {
    className: 'bg-background-elevated',
  },
};
