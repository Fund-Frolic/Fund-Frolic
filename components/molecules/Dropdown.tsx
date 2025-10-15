/**
 * Dropdown Molecule
 *
 * Menu with multiple selectable options for actions.
 * Trigger: Button atom (any variant).
 * Menu: bg-white border border-gray-200 rounded-md shadow-lg py-1.
 * Item: px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-gray-900.
 * Selected: bg-blue-50 text-blue-700.
 * Divider: border-t border-gray-200 my-1.
 * Keyboard nav: Arrow keys, Enter to select, ESC to close.
 * Accessibility: role="menu", role="menuitem", focus trap.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  /** Item label */
  label: string;
  /** Item value */
  value: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Select handler */
  onSelect: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export interface DropdownDivider {
  type: 'divider';
}

export type DropdownMenuItem = DropdownItem | DropdownDivider;

export interface DropdownProps {
  /** Trigger element (button) */
  trigger: React.ReactNode;
  /** Menu items or dividers */
  items: DropdownMenuItem[];
  /** Menu position */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** Additional wrapper class */
  className?: string;
}

export const Dropdown = ({
  trigger,
  items,
  position = 'bottom-left',
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Get actionable items (not dividers)
  const actionableItems = items.filter((item): item is DropdownItem =>
    'value' in item && !item.disabled
  );

  const handleSelect = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onSelect();
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= actionableItems.length ? 0 : next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? actionableItems.length - 1 : next;
          });
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < actionableItems.length) {
            handleSelect(actionableItems[focusedIndex]);
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, focusedIndex, actionableItems]);

  // Position classes
  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-1',
    'bottom-right': 'top-full right-0 mt-1',
    'top-left': 'bottom-full left-0 mb-1',
    'top-right': 'bottom-full right-0 mb-1',
  }[position];

  let actionableIndex = -1;

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {/* Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            "absolute z-[1000] min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg py-1",
            positionClasses
          )}
        >
          {items.map((item, index) => {
            // Divider
            if ('type' in item && item.type === 'divider') {
              return (
                <div
                  key={`divider-${index}`}
                  className="border-t border-gray-200 my-1"
                  role="separator"
                />
              );
            }

            // Menu item
            const menuItem = item as DropdownItem;
            const isDisabled = menuItem.disabled;

            // Track actionable index
            if (!isDisabled) {
              actionableIndex++;
            }
            const isFocused = !isDisabled && actionableIndex === focusedIndex;

            return (
              <button
                key={menuItem.value}
                role="menuitem"
                aria-disabled={isDisabled}
                tabIndex={isFocused ? 0 : -1}
                className={cn(
                  "w-full px-4 py-2 cursor-pointer transition-colors duration-[150ms] ease-[cubic-bezier(0.33,1,0.68,1)] flex items-center gap-3 text-left",
                  isFocused && "bg-blue-50 text-blue-700",
                  !isFocused && !isDisabled && "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  isDisabled && "text-gray-400 cursor-not-allowed opacity-50"
                )}
                onClick={() => !isDisabled && handleSelect(menuItem)}
              >
                {menuItem.icon && (
                  <span className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                    {menuItem.icon}
                  </span>
                )}
                <span className="flex-1">{menuItem.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
