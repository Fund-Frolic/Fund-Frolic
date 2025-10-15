/**
 * Tag Component
 *
 * Technology tags using design system colors (blue + gold + gray).
 * 8-point grid spacing: gap-2 (8px), heights 24px/32px. Remove button: design system colors, 300ms transitions.
 * Border radius: sm (4px), md (8px).
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  "inline-flex items-center gap-2 font-inter font-medium border",
  {
    variants: {
      variant: {
        default: "bg-gray-100 border-gray-200 text-gray-700",
        blue: "bg-blue-50 border-blue-200 text-blue-700",
        gold: "bg-gold-50 border-gold-200 text-gold-700",
      },
      size: {
        sm: "px-2 py-1 text-xs h-6 rounded-sm",
        md: "px-3 py-2 text-sm h-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-3 h-3"
  >
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onRemove'>,
    VariantProps<typeof tagVariants> {
  /** Show remove button */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
}

export const Tag = ({
  className,
  variant,
  size,
  removable = false,
  onRemove,
  children,
  ...props
}: TagProps) => {
  return (
    <span
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "inline-flex items-center justify-center rounded-full transition-colors duration-[300ms] ease-[cubic-bezier(0.33,1,0.68,1)] p-1 -mr-1",
            variant === "blue" && "hover:bg-blue-200",
            variant === "gold" && "hover:bg-gold-200",
            variant === "default" && "hover:bg-gray-200"
          )}
          aria-label={`Remove ${children}`}
        >
          <XIcon />
        </button>
      )}
    </span>
  );
};

Tag.displayName = "Tag";
