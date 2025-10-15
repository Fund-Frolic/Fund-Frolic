/**
 * IconButton Component
 *
 * Compact icon-only actions using design system exclusively.
 * Perfect circles (32px/40px/48px), responsive icons (16px/20px/24px).
 * Transitions: 300ms ease-out. Colors: terracotta (default), neutral (ghost/outline).
 */

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors transition-shadow duration-[300ms] ease-[cubic-bezier(0.33,1,0.68,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-[0.5] disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md active:bg-blue-800 active:shadow-sm",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
        outline: "bg-transparent border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 active:border-blue-700 active:bg-blue-100",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Size-specific icon classes
const iconSizeClasses = {
  sm: "[&>svg]:h-4 [&>svg]:w-4",
  md: "[&>svg]:h-5 [&>svg]:w-5",
  lg: "[&>svg]:h-6 [&>svg]:w-6",
} as const;

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Icon to display (required) */
  icon: React.ReactNode;
  /** Accessible label for screen readers (REQUIRED) */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size = 'md', icon, 'aria-label': ariaLabel, ...props }, ref) => {
    const safeSize = size || 'md';
    return (
      <button
        ref={ref}
        className={cn(
          iconButtonVariants({ variant, size }),
          iconSizeClasses[safeSize as keyof typeof iconSizeClasses],
          className
        )}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
