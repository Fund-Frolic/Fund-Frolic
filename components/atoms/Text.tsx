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

type TextElement = 'p' | 'span' | 'div' | 'label';

type ElementProps<T extends TextElement> = T extends 'label'
  ? React.LabelHTMLAttributes<HTMLLabelElement>
  : T extends 'div'
  ? React.HTMLAttributes<HTMLDivElement>
  : T extends 'span'
  ? React.HTMLAttributes<HTMLSpanElement>
  : React.HTMLAttributes<HTMLParagraphElement>;

export type TextProps<T extends TextElement = 'p'> = ElementProps<T> &
  VariantProps<typeof textVariants> & {
    /** HTML element to render */
    as?: T;
  };

export const Text = <T extends TextElement = 'p'>({
  as,
  className,
  variant,
  weight,
  children,
  ...props
}: TextProps<T>) => {
  const Component = (as || 'p') as TextElement;
  return (
    <Component
      className={cn(textVariants({ variant, weight }), className)}
      {...(props as any)}
    >
      {children}
    </Component>
  );
};

Text.displayName = "Text";
