/**
 * Text Component
 *
 * Body copy using design system typography (Inter font, design system line heights).
 * Line heights: body (1.5), lead (1.6), caption (1.428), small (1.5) per design system.
 * Colors: gray-700 (body/lead), gray-600 (caption/small).
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva(
  "font-inter",
  {
    variants: {
      variant: {
        body: "text-base leading-[1.5] text-gray-700",
        lead: "text-lg font-medium leading-[1.6] text-gray-700",
        caption: "text-sm leading-[1.428] text-gray-600",
        small: "text-xs leading-[1.5] text-gray-600",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
    },
    defaultVariants: {
      variant: "body",
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** HTML element to render */
  as?: 'p' | 'span' | 'div' | 'label';
}

export const Text = ({
  as: Component = 'p',
  className,
  variant,
  weight,
  children,
  ...props
}: TextProps) => {
  return (
    <Component
      className={cn(textVariants({ variant, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.displayName = "Text";
