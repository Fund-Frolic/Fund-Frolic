/**
 * Spinner Component
 *
 * Loading indicator respecting motion preferences.
 * Uses currentColor (inherits parent). Animation: rotate 360deg, 1s linear infinite.
 * Motion-safe: Shows static icon if user prefers reduced motion.
 * Sizes: xs (12px) to xl (32px). Accessibility: role="status", aria-live="polite".
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva("inline-block", {
  variants: {
    size: {
      xs: "w-3 h-3",    // 12px
      sm: "w-4 h-4",    // 16px
      md: "w-5 h-5",    // 20px
      lg: "w-6 h-6",    // 24px
      xl: "w-8 h-8",    // 32px
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label for screen readers */
  label?: string;
}

export const Spinner = ({
  size = 'md',
  label = 'Loading...',
  className,
  ...props
}: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <svg
        className={cn(
          spinnerVariants({ size }),
          // Rotation animation (1s linear infinite)
          "animate-spin motion-reduce:animate-none",
          // Color inheritance
          "text-current"
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        {/* Background circle (faint, for context) */}
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        {/* Animated arc (partial circle) */}
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {/* Screen reader only text */}
      <span className="sr-only">{label}</span>
    </div>
  );
};

Spinner.displayName = "Spinner";
