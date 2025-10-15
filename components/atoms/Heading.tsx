/**
 * Heading Component
 *
 * Semantic headings that showcase Fraunces' character and warmth.
 * Uses tight tracking to highlight the font's personality.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva(
  "text-gray-900",
  {
    variants: {
      variant: {
        // Display 2xl: 80px (Fraunces) - Hero displays
        "display-2xl": "font-display text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]",

        // Display xl: 64px (Fraunces) - Large displays
        "display-xl": "font-display text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.125]",

        // Display lg: 48px (Fraunces)
        "display-lg": "font-display text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.167]",

        // Legacy display (maps to display-lg for backwards compatibility)
        display: "font-display text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.167]",

        // Heading 3xl: 40px (Fraunces)
        h1: "font-display text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.2]",

        // Heading 2xl: 32px (Fraunces)
        h2: "font-display text-2xl lg:text-3xl font-semibold leading-[1.25]",

        // Heading xl: 24px (Inter) - Font switch!
        h3: "font-inter text-xl lg:text-2xl font-semibold leading-[1.333]",

        // Smaller headings: Inter
        h4: "font-inter text-lg font-semibold leading-[1.6]",
        h5: "font-inter text-base font-semibold leading-[1.5]",
        h6: "font-inter text-sm font-semibold leading-[1.428]",
      },
    },
    defaultVariants: {
      variant: "h2",
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Semantic HTML tag (h1-h6) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = ({
  as: Component = 'h2',
  className,
  variant,
  children,
  ...props
}: HeadingProps) => {
  return (
    <Component
      className={cn(headingVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

Heading.displayName = "Heading";
