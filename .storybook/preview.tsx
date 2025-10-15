import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css'

/**
 * Fonts are loaded via preview-head.html
 * This avoids issues with next/font in Storybook's Vite setup
 */

const preview: Preview = {

  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
      expanded: true,
    },

    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF7F5', // neutral-50
        },
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#2E2D2A', // neutral-900
        },
      ],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;