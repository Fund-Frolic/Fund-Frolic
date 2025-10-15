/**
 * Dropdown Molecule Stories
 *
 * Menu with multiple selectable options for actions.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Dropdown } from './Dropdown';
import { Button } from '@/components/atoms/Button';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Menu with multiple selectable options for actions. Trigger: Button atom. Menu: bg-white border border-gray-200 rounded-md shadow-lg py-1. Item: px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900. Selected/Focused: bg-blue-50 text-blue-700. Divider: border-t border-gray-200 my-1. Keyboard nav: Arrow keys, Enter/Space to select, ESC to close. Accessibility: role="menu", role="menuitem", focus trap.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: false,
      description: 'Trigger element (button)',
    },
    items: {
      control: false,
      description: 'Menu items or dividers',
    },
    position: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
      description: 'Menu position',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample icons
const UserIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414 0L4 7.414 5.414 6l3.293 3.293L13.586 6 15 7.414z" clipRule="evenodd" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
  </svg>
);

const SortIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// Story 1: User Menu
export const UserMenu: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => {
    const [lastAction, setLastAction] = useState<string>('');

    return (
      <div className="p-8">
        <Dropdown
          trigger={
            <Button variant="secondary" size="md">
              <UserIcon />
              My Account
            </Button>
          }
          items={[
            {
              label: 'Profile',
              value: 'profile',
              icon: <UserIcon />,
              onSelect: () => setLastAction('Viewed profile'),
            },
            {
              label: 'Settings',
              value: 'settings',
              icon: <SettingsIcon />,
              onSelect: () => setLastAction('Opened settings'),
            },
            { type: 'divider' },
            {
              label: 'Logout',
              value: 'logout',
              icon: <LogoutIcon />,
              onSelect: () => setLastAction('Logged out'),
            },
          ]}
        />

        {lastAction && (
          <p className="mt-4 text-sm text-gray-600">Last action: {lastAction}</p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'User menu with profile, settings, and logout. Divider separates logout action.',
      },
    },
  },
};

// Story 2: Filter Dropdown
export const FilterDropdown: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => {
    const [filter, setFilter] = useState<string>('all');

    return (
      <div className="p-8">
        <Dropdown
          trigger={
            <Button variant="secondary" size="md">
              <FilterIcon />
              Filter: {filter === 'all' ? 'All Projects' : filter === 'web' ? 'Web Apps' : filter === 'mobile' ? 'Mobile Apps' : 'Design'}
            </Button>
          }
          items={[
            {
              label: 'All Projects',
              value: 'all',
              icon: filter === 'all' ? <CheckIcon /> : undefined,
              onSelect: () => setFilter('all'),
            },
            {
              label: 'Web Apps',
              value: 'web',
              icon: filter === 'web' ? <CheckIcon /> : undefined,
              onSelect: () => setFilter('web'),
            },
            {
              label: 'Mobile Apps',
              value: 'mobile',
              icon: filter === 'mobile' ? <CheckIcon /> : undefined,
              onSelect: () => setFilter('mobile'),
            },
            {
              label: 'Design',
              value: 'design',
              icon: filter === 'design' ? <CheckIcon /> : undefined,
              onSelect: () => setFilter('design'),
            },
          ]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter dropdown for project showcase. Shows checkmark on selected filter.',
      },
    },
  },
};

// Story 3: Sort Dropdown
export const SortDropdown: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => {
    const [sort, setSort] = useState<string>('date');

    return (
      <div className="p-8">
        <Dropdown
          trigger={
            <Button variant="secondary" size="md">
              <SortIcon />
              Sort by: {sort === 'date' ? 'Date' : sort === 'popularity' ? 'Popularity' : 'Name'}
            </Button>
          }
          items={[
            {
              label: 'Date',
              value: 'date',
              icon: sort === 'date' ? <CheckIcon /> : undefined,
              onSelect: () => setSort('date'),
            },
            {
              label: 'Popularity',
              value: 'popularity',
              icon: sort === 'popularity' ? <CheckIcon /> : undefined,
              onSelect: () => setSort('popularity'),
            },
            {
              label: 'Name',
              value: 'name',
              icon: sort === 'name' ? <CheckIcon /> : undefined,
              onSelect: () => setSort('name'),
            },
          ]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Sort dropdown for projects. Updates button text based on selection.',
      },
    },
  },
};

// Story 4: Different Positions
export const DifferentPositions: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => (
    <div className="flex flex-col items-center gap-48 p-16">
      <div className="flex gap-8">
        <Dropdown
          position="bottom-left"
          trigger={<Button variant="secondary">Bottom Left</Button>}
          items={[
            { label: 'Option 1', value: '1', onSelect: () => {} },
            { label: 'Option 2', value: '2', onSelect: () => {} },
            { label: 'Option 3', value: '3', onSelect: () => {} },
          ]}
        />

        <Dropdown
          position="bottom-right"
          trigger={<Button variant="secondary">Bottom Right</Button>}
          items={[
            { label: 'Option 1', value: '1', onSelect: () => {} },
            { label: 'Option 2', value: '2', onSelect: () => {} },
            { label: 'Option 3', value: '3', onSelect: () => {} },
          ]}
        />
      </div>

      <div className="flex gap-8">
        <Dropdown
          position="top-left"
          trigger={<Button variant="secondary">Top Left</Button>}
          items={[
            { label: 'Option 1', value: '1', onSelect: () => {} },
            { label: 'Option 2', value: '2', onSelect: () => {} },
            { label: 'Option 3', value: '3', onSelect: () => {} },
          ]}
        />

        <Dropdown
          position="top-right"
          trigger={<Button variant="secondary">Top Right</Button>}
          items={[
            { label: 'Option 1', value: '1', onSelect: () => {} },
            { label: 'Option 2', value: '2', onSelect: () => {} },
            { label: 'Option 3', value: '3', onSelect: () => {} },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different menu positions: bottom-left, bottom-right, top-left, top-right.',
      },
    },
  },
};

// Story 5: With Disabled Items
export const WithDisabledItems: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => (
    <div className="p-8">
      <Dropdown
        trigger={<Button variant="secondary">Actions</Button>}
        items={[
          {
            label: 'Edit',
            value: 'edit',
            onSelect: () => alert('Edit clicked'),
          },
          {
            label: 'Duplicate',
            value: 'duplicate',
            onSelect: () => alert('Duplicate clicked'),
          },
          {
            label: 'Archive',
            value: 'archive',
            onSelect: () => alert('Archive clicked'),
            disabled: true,
          },
          { type: 'divider' },
          {
            label: 'Delete',
            value: 'delete',
            onSelect: () => alert('Delete clicked'),
            disabled: true,
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with disabled items. Disabled items have reduced opacity and no hover state.',
      },
    },
  },
};

// Story 6: Keyboard Navigation Demo
export const KeyboardNavigationDemo: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => (
    <div className="p-8">
      <div className="bg-gray-100 p-6 rounded-md mb-4">
        <h4 className="text-base font-semibold text-gray-900 mb-3">
          Keyboard Navigation
        </h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Click button to open menu</li>
          <li>• ↓ Arrow Down - Navigate to next item</li>
          <li>• ↑ Arrow Up - Navigate to previous item</li>
          <li>• Enter/Space - Select focused item</li>
          <li>• Esc - Close menu</li>
        </ul>
      </div>

      <Dropdown
        trigger={<Button variant="secondary">Open Menu (Try Keyboard)</Button>}
        items={[
          {
            label: 'First Option',
            value: '1',
            onSelect: () => alert('Selected: First Option'),
          },
          {
            label: 'Second Option',
            value: '2',
            onSelect: () => alert('Selected: Second Option'),
          },
          {
            label: 'Third Option',
            value: '3',
            onSelect: () => alert('Selected: Third Option'),
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Keyboard navigation demonstration. Open menu and use arrow keys to navigate.',
      },
    },
  },
};

// Story 7: With Icons
export const WithIcons: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => (
    <div className="p-8">
      <Dropdown
        trigger={<Button variant="secondary">Quick Actions</Button>}
        items={[
          {
            label: 'View Profile',
            value: 'profile',
            icon: <UserIcon />,
            onSelect: () => alert('Profile'),
          },
          {
            label: 'Settings',
            value: 'settings',
            icon: <SettingsIcon />,
            onSelect: () => alert('Settings'),
          },
          { type: 'divider' },
          {
            label: 'Sign Out',
            value: 'signout',
            icon: <LogoutIcon />,
            onSelect: () => alert('Sign Out'),
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown items with icons. Icons are 20px (w-5 h-5) and left-aligned.',
      },
    },
  },
};

// Story 8: Multiple Dividers
export const MultipleDividers: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => (
    <div className="p-8">
      <Dropdown
        trigger={<Button variant="secondary">File Menu</Button>}
        items={[
          { label: 'New File', value: 'new', onSelect: () => {} },
          { label: 'Open File', value: 'open', onSelect: () => {} },
          { type: 'divider' },
          { label: 'Save', value: 'save', onSelect: () => {} },
          { label: 'Save As', value: 'saveas', onSelect: () => {} },
          { type: 'divider' },
          { label: 'Export', value: 'export', onSelect: () => {} },
          { label: 'Print', value: 'print', onSelect: () => {} },
          { type: 'divider' },
          { label: 'Exit', value: 'exit', onSelect: () => {} },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with multiple dividers to group related actions.',
      },
    },
  },
};

// Story 9: Long Menu
export const LongMenu: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => (
    <div className="p-8">
      <Dropdown
        trigger={<Button variant="secondary">Select Country</Button>}
        items={Array.from({ length: 20 }, (_, i) => ({
          label: `Country ${i + 1}`,
          value: `country-${i + 1}`,
          onSelect: () => alert(`Selected Country ${i + 1}`),
        }))}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Long menu with many items. Menu becomes scrollable automatically.',
      },
    },
  },
};

// Story 10: Different Button Variants
export const DifferentButtonVariants: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => (
    <div className="flex gap-4 p-8">
      <Dropdown
        trigger={<Button variant="primary">Primary</Button>}
        items={[
          { label: 'Option 1', value: '1', onSelect: () => {} },
          { label: 'Option 2', value: '2', onSelect: () => {} },
        ]}
      />

      <Dropdown
        trigger={<Button variant="secondary">Secondary</Button>}
        items={[
          { label: 'Option 1', value: '1', onSelect: () => {} },
          { label: 'Option 2', value: '2', onSelect: () => {} },
        ]}
      />

      <Dropdown
        trigger={<Button variant="outline">Outline</Button>}
        items={[
          { label: 'Option 1', value: '1', onSelect: () => {} },
          { label: 'Option 2', value: '2', onSelect: () => {} },
        ]}
      />

      <Dropdown
        trigger={<Button variant="ghost">Ghost</Button>}
        items={[
          { label: 'Option 1', value: '1', onSelect: () => {} },
          { label: 'Option 2', value: '2', onSelect: () => {} },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with different Button variants as triggers.',
      },
    },
  },
};

// Story 11: Accessibility Demo
export const AccessibilityDemo: Story = {
  args: { trigger: 'Menu', items: [] },
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>role="menu"</strong> - Semantic menu for screen readers</li>
          <li>✅ <strong>role="menuitem"</strong> - Each item properly labeled</li>
          <li>✅ <strong>Keyboard navigation</strong> - Arrow keys, Enter, Space, Esc</li>
          <li>✅ <strong>Focus management</strong> - Tracks focused item visually</li>
          <li>✅ <strong>Focus trap</strong> - ESC closes menu</li>
          <li>✅ <strong>Click outside</strong> - Closes menu when clicking outside</li>
          <li>✅ <strong>aria-disabled</strong> - Disabled items properly marked</li>
          <li>✅ <strong>role="separator"</strong> - Dividers semantically marked</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">
          Try It Yourself
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Use keyboard navigation to interact with this dropdown. Arrow keys move focus,
          Enter/Space select, and ESC closes the menu.
        </p>

        <Dropdown
          trigger={<Button variant="secondary">Open Accessible Menu</Button>}
          items={[
            {
              label: 'Edit',
              value: 'edit',
              icon: <UserIcon />,
              onSelect: () => alert('Edit'),
            },
            {
              label: 'Settings',
              value: 'settings',
              icon: <SettingsIcon />,
              onSelect: () => alert('Settings'),
            },
            { type: 'divider' },
            {
              label: 'Logout',
              value: 'logout',
              icon: <LogoutIcon />,
              onSelect: () => alert('Logout'),
            },
          ]}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
        <h4 className="text-base font-semibold text-blue-900 mb-3">
          Design System Compliance
        </h4>
        <p className="text-sm text-blue-800">
          <strong>Menu:</strong> bg-white, border-gray-200, rounded-md, shadow-lg, py-1<br />
          <strong>Item:</strong> px-4 py-2, text-gray-700, hover:bg-gray-50 hover:text-gray-900<br />
          <strong>Focused:</strong> bg-blue-50, text-blue-700<br />
          <strong>Disabled:</strong> text-gray-400, opacity-50, cursor-not-allowed<br />
          <strong>Divider:</strong> border-t border-gray-200, my-1<br />
          <strong>Icon:</strong> w-5 h-5 (20px), gap-3 (12px)<br />
          <strong>Transitions:</strong> 150ms ease-out<br />
          <strong>Z-index:</strong> 1000 (ensures menu appears above content)<br />
          <strong>Position:</strong> Auto-adjusts to viewport (4 positions available)
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
  render: (args) => (
    <div className="p-8">
      <Dropdown
        {...args}
        trigger={<Button variant="secondary">Open Menu</Button>}
        items={[
          {
            label: 'Option 1',
            value: '1',
            icon: <UserIcon />,
            onSelect: () => alert('Option 1 selected'),
          },
          {
            label: 'Option 2',
            value: '2',
            icon: <SettingsIcon />,
            onSelect: () => alert('Option 2 selected'),
          },
          { type: 'divider' },
          {
            label: 'Option 3',
            value: '3',
            icon: <LogoutIcon />,
            onSelect: () => alert('Option 3 selected'),
          },
        ]}
      />
    </div>
  ),
  args: {
    trigger: 'Menu',
    items: [],
    position: 'bottom-left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test different positions.',
      },
    },
  },
};
