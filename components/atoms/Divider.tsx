/**
 * Divider Component
 *
 * Visual separators using design system colors.
 * Border: gray-200 for soft separation. Supports solid/dashed/dotted variants.
 * Label background uses design system token (bg-background-elevated).
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Text } from './Text';

const dividerVariants = cva(
  "border-gray-200",
  {
    variants: {
      orientation: {
        horizontal: "border-t w-full",
        vertical: "border-l h-full",
      },
      variant: {
        solid: "border-solid",
        dashed: "border-dashed",
        dotted: "border-dotted",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "solid",
    },
  }
);

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'aria-orientation'>,
    VariantProps<typeof dividerVariants> {
  /** Label text to display on divider */
  label?: string;
}

export const Divider = ({
  orientation = "horizontal",
  variant = "solid",
  label,
  className,
  ...props
}: DividerProps) => {
  const isHorizontal = orientation === "horizontal";

  // For vertical dividers or dividers without labels
  if (!label) {
    if (isHorizontal) {
      return (
        <hr
          className={cn(dividerVariants({ orientation, variant }), className)}
          {...props}
        />
      );
    } else {
      return (
        <div
          className={cn(dividerVariants({ orientation, variant }), className)}
          role="separator"
          aria-orientation={orientation || "vertical"}
          {...props}
        />
      );
    }
  }

  // Horizontal divider with label
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <div className={cn(dividerVariants({ orientation, variant }))} />
      </div>
      <div className="relative flex justify-center">
        <Text
          as="span"
          variant="caption"
          className="bg-background-elevated px-3 text-gray-600"
        >
          {label}
        </Text>
      </div>
    </div>
  );
};

Divider.displayName = "Divider";
