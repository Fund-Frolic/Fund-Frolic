/**
 * Input Component
 *
 * Text input fields using design system.
 * Colors: neutral borders, terracotta focus. Transitions: 300ms ease-out.
 * Sizes: 32px/40px/48px (8-point grid). Error state: blue-700 (design system, not generic red).
 * Icons: Positioned with 8-point grid spacing. Gap between icon and text: 8px.
 *   - Small: Icon at 12px, size 16px, text padding 36px (with icon), 12px (without)
 *   - Medium: Icon at 16px, size 20px, text padding 44px (with icon), 16px (without)
 *   - Large: Icon at 16px, size 24px, text padding 48px (with icon), 16px (without)
 * Uses inline styles for icon positioning and padding to avoid Tailwind spacing scale limitations.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  "w-full font-inter text-base text-gray-900 placeholder:text-gray-500 transition-colors duration-[300ms] ease-[cubic-bezier(0.33,1,0.68,1)] focus-visible:outline-none disabled:opacity-[0.5] disabled:cursor-not-allowed disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20",
        error: "bg-white border border-blue-700 text-blue-900 hover:border-blue-800 focus:border-blue-700 focus:ring-2 focus:ring-blue-600/20",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-sm",
        md: "h-10 px-4 text-base rounded-md",
        lg: "h-12 px-4 text-lg rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon to display before input */
  leftIcon?: React.ReactNode;
  /** Icon to display after input */
  rightIcon?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Make input full width */
  fullWidth?: boolean;
}

export const Input = ({
  className,
  variant,
  size = 'md',
  leftIcon,
  rightIcon,
  error = false,
  fullWidth = true,
  disabled,
  type = 'text',
  ...props
}: InputProps) => {
  const effectiveVariant = error ? 'error' : variant;

  // Icon positioning values (8-point grid aligned)
  const iconPosition = {
    sm: {
      iconLeft: '12px',
      iconRight: '12px',
      textPaddingLeft: '36px',   // 12px position + 16px icon + 8px gap
      textPaddingRight: '36px',
      defaultPadding: '12px'     // Original px-3
    },
    md: {
      iconLeft: '16px',
      iconRight: '16px',
      textPaddingLeft: '44px',   // 16px position + 20px icon + 8px gap
      textPaddingRight: '44px',
      defaultPadding: '16px'     // Original px-4
    },
    lg: {
      iconLeft: '16px',
      iconRight: '16px',
      textPaddingLeft: '48px',   // 16px position + 24px icon + 8px gap
      textPaddingRight: '48px',
      defaultPadding: '16px'     // Original px-4
    },
  }[size || 'md'];

  // If there are icons, we need a wrapper
  if (leftIcon || rightIcon) {
    return (
      <div className={cn("relative", fullWidth && "w-full")}>
        {leftIcon && (
          <div
            className={cn(
              "absolute top-0 h-full flex items-center pointer-events-none text-gray-500",
              size === "sm" && "[&>svg]:h-4 [&>svg]:w-4",
              size === "md" && "[&>svg]:h-5 [&>svg]:w-5",
              size === "lg" && "[&>svg]:h-6 [&>svg]:w-6"
            )}
            style={{ left: iconPosition.iconLeft }}
          >
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant: effectiveVariant, size }),
            !fullWidth && "w-auto",
            className
          )}
          style={{
            paddingLeft: leftIcon ? iconPosition.textPaddingLeft : iconPosition.defaultPadding,
            paddingRight: rightIcon ? iconPosition.textPaddingRight : iconPosition.defaultPadding,
          }}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div
            className={cn(
              "absolute top-0 h-full flex items-center text-gray-500",
              size === "sm" && "[&>svg]:h-4 [&>svg]:w-4",
              size === "md" && "[&>svg]:h-5 [&>svg]:w-5",
              size === "lg" && "[&>svg]:h-6 [&>svg]:w-6",
              disabled && "pointer-events-none"
            )}
            style={{ right: iconPosition.iconRight }}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  }

  // No icons, simple input
  return (
    <input
      type={type}
      className={cn(
        inputVariants({ variant: effectiveVariant, size }),
        !fullWidth && "w-auto",
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
};

Input.displayName = "Input";
