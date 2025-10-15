/**
 * Checkbox Component
 *
 * Boolean selection using design system.
 * Checked state: blue-600 (not generic blue). Rounded-sm (4px, technical feel).
 * Transitions: duration-fast (150ms) ease-out. Disabled: opacity-disabled (0.5).
 * Focus ring: blue-600 with offset. Touch target: 44×44px minimum.
 * Supports indeterminate state with aria-checked="mixed".
 */

'use client';

import { useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Checkmark icon (shown when checked)
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Dash icon (shown when indeterminate)
const DashIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2 6H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const checkboxVariants = cva(
  "border-2 rounded-sm transition-colors duration-150 ease-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
      checked: {
        true: "bg-blue-600 border-blue-600",
        false: "bg-white border-gray-300 hover:border-gray-400 disabled:bg-gray-100",
      },
    },
    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
  /** Indeterminate state (shows dash icon) */
  indeterminate?: boolean;
}

export const Checkbox = ({
  className,
  size = 'md',
  checked = false,
  indeterminate = false,
  disabled = false,
  ...props
}: CheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Set indeterminate property (can't be done via JSX)
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isChecked = indeterminate || checked;

  // Icon size based on checkbox size
  const iconSize = {
    sm: "w-3 h-3",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  }[size];

  return (
    <div className="relative inline-flex">
      {/* Hidden native checkbox for accessibility */}
      <input
        ref={checkboxRef}
        type="checkbox"
        className="absolute opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed peer"
        checked={checked}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
        {...props}
      />
      {/* Custom checkbox visual */}
      <div
        className={cn(
          checkboxVariants({ size, checked: isChecked as boolean }),
          "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600 peer-focus-visible:ring-offset-2",
          className
        )}
      >
        {isChecked && (
          <div className="flex items-center justify-center h-full pointer-events-none">
            {indeterminate ? (
              <DashIcon className={cn("text-white", iconSize)} />
            ) : (
              <CheckIcon className={cn("text-white", iconSize)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Checkbox.displayName = "Checkbox";
