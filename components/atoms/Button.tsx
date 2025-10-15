/**
 * Button Component
 *
 * Primary interactive element using design system colors exclusively.
 * Primary/destructive/outline use terracotta scales, secondary uses sage.
 * Icons scale responsively (16px/20px/24px), 8-point grid spacing, 300ms transitions with ease-out.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles - all buttons share these
  "inline-flex items-center justify-center gap-2 font-inter font-medium rounded-md transition-colors transition-shadow duration-[300ms] ease-[cubic-bezier(0.33,1,0.68,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-[0.5] disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md active:bg-blue-800 active:shadow-sm",
        secondary: "bg-gold-500 text-white shadow-sm hover:bg-gold-600 hover:shadow-md active:bg-gold-700 active:shadow-sm",
        ghost: "bg-transparent text-blue-700 hover:bg-blue-50 active:bg-blue-100",
        outline: "bg-transparent border-2 border-blue-600 text-blue-700 hover:bg-blue-50 hover:border-blue-700 active:bg-blue-100",
        destructive: "bg-blue-700 text-white shadow-sm hover:bg-blue-800 hover:shadow-md active:bg-blue-900 active:shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and disable button */
  loading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Make button full width of container */
  fullWidth?: boolean;
}

export const Button = ({
  className,
  variant,
  size,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && "w-full",
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className={cn(
              "animate-spin",
              size === "sm" && "h-4 w-4",
              size === "md" && "h-5 w-5",
              size === "lg" && "h-6 w-6"
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span
              className={cn(
                "[&>svg]:shrink-0",
                size === "sm" && "[&>svg]:h-4 [&>svg]:w-4",
                size === "md" && "[&>svg]:h-5 [&>svg]:w-5",
                size === "lg" && "[&>svg]:h-6 [&>svg]:w-6"
              )}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span
              className={cn(
                "[&>svg]:shrink-0",
                size === "sm" && "[&>svg]:h-4 [&>svg]:w-4",
                size === "md" && "[&>svg]:h-5 [&>svg]:w-5",
                size === "lg" && "[&>svg]:h-6 [&>svg]:w-6"
              )}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

Button.displayName = "Button";
