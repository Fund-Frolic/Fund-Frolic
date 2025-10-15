/**
 * CustomSelect Molecule
 *
 * Fully custom dropdown using React Aria with complete design system styling.
 * Unlike native Select, dropdown menu matches design system exactly.
 * Colors: terracotta focus/selected, neutral borders, warm hover states.
 * Transitions: 150ms ease-out. Shadow: lg for dropdown (floating).
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { useButton } from 'react-aria';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ChevronDown icon
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// CheckIcon for selected state
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const selectVariants = cva(
  "w-full flex items-center justify-between font-inter text-base text-gray-900 transition-colors duration-150 ease-out focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20",
        error: "bg-white border border-blue-700 text-blue-900 hover:border-blue-800 focus:border-blue-700 focus:ring-2 focus:ring-blue-600/20",
      },
      size: {
        sm: "h-8 pl-3 pr-8 text-sm rounded-sm",
        md: "h-10 pl-4 pr-10 text-base rounded-md",
        lg: "h-12 pl-4 pr-10 text-lg rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CustomSelectProps extends VariantProps<typeof selectVariants> {
  /** Options to display */
  options: SelectOption[];
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Custom className */
  className?: string;
  /** ID for label association */
  id?: string;
}

export const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  variant,
  size = 'md',
  error = false,
  disabled = false,
  fullWidth = true,
  className,
  id,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { buttonProps } = useButton(
    {
      onPress: () => !disabled && setIsOpen(!isOpen),
      isDisabled: disabled,
    },
    buttonRef
  );

  const selectedOption = options.find(opt => opt.value === value);
  const effectiveVariant = error ? 'error' : variant;
  const safeSize = size || 'md';

  // Icon size based on select size
  const iconSizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconPositionMap = {
    sm: "right-2",
    md: "right-3",
    lg: "right-3",
  };

  const iconSize = iconSizeMap[safeSize as keyof typeof iconSizeMap];
  const iconPosition = iconPositionMap[safeSize as keyof typeof iconPositionMap];

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={cn("relative", fullWidth && "w-full")}>
      <button
        {...buttonProps}
        ref={buttonRef}
        id={id}
        className={cn(
          selectVariants({ variant: effectiveVariant, size }),
          !selectedOption && "text-gray-500",
          !fullWidth && "w-auto",
          className
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">
          {selectedOption?.label || placeholder}
        </span>
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-gray-500 transition-transform duration-150 ease-out",
            iconPosition,
            isOpen && "rotate-180"
          )}
        >
          <ChevronDownIcon className={iconSize} />
        </div>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          className="absolute z-[1000] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            const isDisabled = option.disabled;

            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                className={cn(
                  "px-3 py-2 cursor-pointer transition-colors duration-150 ease-out flex items-center justify-between",
                  isSelected && "bg-blue-50 text-blue-700 font-medium",
                  !isSelected && !isDisabled && "text-gray-900 hover:bg-gray-50",
                  isDisabled && "text-gray-400 cursor-not-allowed opacity-50"
                )}
                onClick={() => !isDisabled && handleSelect(option.value)}
              >
                <span>{option.label}</span>
                {isSelected && <CheckIcon className="w-4 h-4 text-blue-600" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

CustomSelect.displayName = "CustomSelect";
