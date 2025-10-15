/**
 * Badge Component
 *
 * Status indicators using design system colors (terracotta + sage + neutral).
 * Success/info use sage (accent), warning/error use terracotta (primary).
 * 8-point grid aligned spacing, pill-shaped with pastel backgrounds for professional warmth.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  "inline-flex items-center gap-2 font-inter font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700",
        outline: "border border-gray-300 bg-transparent text-gray-700",
        success: "bg-gold-100 text-gold-800",
        warning: "bg-blue-100 text-blue-700",
        error: "bg-blue-200 text-blue-900",
        info: "bg-gold-50 text-gold-700",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1 text-base",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "pill",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show colored dot indicator */
  dot?: boolean;
}

export const Badge = ({
  className,
  variant,
  size,
  shape,
  dot = false,
  children,
  ...props
}: BadgeProps) => {
  // Dot color matches variant (8px for 8-point grid)
  const dotColorClass = {
    default: 'bg-gray-500',
    outline: 'bg-gray-500',
    success: 'bg-gold-600',
    warning: 'bg-blue-500',
    error: 'bg-blue-700',
    info: 'bg-gold-500',
  }[variant || 'default'];

  return (
    <span
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-2 h-2 rounded-full', dotColorClass)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
