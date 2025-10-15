/**
 * ProgressBar Component
 *
 * Linear progress indicator for tasks.
 * Track: gray-200 rounded-full. Fill: blue-600 rounded-full.
 * Sizes: sm (4px), md (8px), lg (12px). Transition: 300ms smooth width changes.
 * Supports determinate (0-100%) and indeterminate (animated sweep) states.
 * Accessibility: Uses native <progress> element, proper ARIA attributes.
 */

'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const progressBarVariants = cva("w-full overflow-hidden bg-gray-200 rounded-full", {
  variants: {
    size: {
      sm: "h-1",   // 4px
      md: "h-2",   // 8px
      lg: "h-3",   // 12px
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof progressBarVariants> {
  /** Progress value (0-100) for determinate mode */
  value?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Indeterminate loading state (unknown duration) */
  indeterminate?: boolean;
  /** Accessible label describing what's loading */
  label?: string;
  /** Show label text below progress bar */
  showLabel?: boolean;
}

export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  indeterminate = false,
  label,
  showLabel = false,
  className,
  ...props
}: ProgressBarProps) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const ariaLabel = label || 'Loading';

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Progress track */}
      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : max}
        aria-busy={indeterminate}
        className={cn(progressBarVariants({ size }))}
      >
        {/* Progress fill */}
        {indeterminate ? (
          // Indeterminate: animated sweep
          <div className="h-full w-full relative">
            <div
              className="absolute inset-0 bg-blue-600 rounded-full origin-left"
              style={{ animation: 'progress-indeterminate 1.5s ease-in-out infinite' }}
            />
          </div>
        ) : (
          // Determinate: width based on percentage
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>

      {/* Optional label */}
      {showLabel && label && (
        <p className="text-sm text-gray-700 mt-2">
          {label}
          {!indeterminate && ` ${Math.round(percentage)}%`}
        </p>
      )}
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";
