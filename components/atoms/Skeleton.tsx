/**
 * Skeleton Component
 *
 * Content loading placeholder with warm aesthetic.
 * Background: gray-200 (warm gray). Animation: Pulse 50% → 100% opacity (subtle).
 * Variants: rectangle, circle, text (multiple lines). Respects prefers-reduced-motion.
 * Accessibility: aria-busy="true", aria-live="polite" for loading states.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skeletonVariants = cva(
  "bg-gray-200 motion-reduce:animate-none",
  {
    variants: {
      variant: {
        rectangle: "rounded-md",
        circle: "rounded-full",
        text: "rounded-sm",
      },
      animation: {
        pulse: "animate-pulse",
        wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        none: "",
      },
    },
    defaultVariants: {
      variant: "rectangle",
      animation: "pulse",
    },
  }
);

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof skeletonVariants> {
  /** Width of skeleton (CSS value or number in px) */
  width?: string | number;
  /** Height of skeleton (CSS value or number in px) */
  height?: string | number;
  /** Number of lines for text variant */
  lines?: number;
}

export const Skeleton = ({
  variant = 'rectangle',
  animation = 'pulse',
  width,
  height,
  lines = 3,
  className,
  style,
  ...props
}: SkeletonProps) => {
  // Convert numeric values to px
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  // Text variant: Render multiple lines
  if (variant === 'text') {
    return (
      <div
        className={cn("space-y-2", className)}
        aria-busy="true"
        role="status"
        aria-live="polite"
        aria-label="Loading content"
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => {
          // Varying widths for text lines (more realistic)
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine ? '60%' : index % 2 === 0 ? '100%' : '80%';

          return (
            <div
              key={index}
              className={cn(
                skeletonVariants({ variant: 'text', animation }),
                "h-4" // 16px, standard text height
              )}
              style={{
                width: lineWidth,
                ...style,
              }}
            />
          );
        })}
      </div>
    );
  }

  // Circle variant: Ensure square dimensions
  if (variant === 'circle') {
    const size = widthStyle || heightStyle || '40px';
    return (
      <div
        className={cn(skeletonVariants({ variant, animation }), className)}
        style={{
          width: size,
          height: size,
          ...style,
        }}
        aria-busy="true"
        role="status"
        aria-live="polite"
        aria-label="Loading content"
        {...props}
      />
    );
  }

  // Rectangle variant
  return (
    <div
      className={cn(skeletonVariants({ variant, animation }), className)}
      style={{
        width: widthStyle,
        height: heightStyle,
        ...style,
      }}
      aria-busy="true"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      {...props}
    />
  );
};

Skeleton.displayName = "Skeleton";
