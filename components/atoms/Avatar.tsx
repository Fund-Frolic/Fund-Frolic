/**
 * Avatar Component
 *
 * User photos with warm fallback states.
 * Circular design feels friendly and human.
 */

"use client";

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const avatarVariants = cva(
  "inline-flex items-center justify-center overflow-hidden flex-shrink-0",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-2xl",
        "2xl": "h-24 w-24 text-4xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

// User icon for fallback
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-3/5 h-3/5"
  >
    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
  </svg>
);

export interface AvatarProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Fallback initials (1-2 characters) */
  fallback?: string;
  /** Show ring around avatar */
  ring?: boolean;
}

export const Avatar = ({
  src,
  alt,
  fallback,
  size,
  shape,
  ring = false,
  className,
  ...props
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const showFallback = !src || imageError;

  return (
    <div
      className={cn(
        avatarVariants({ size, shape }),
        ring && "ring-2 ring-gray-200",
        className
      )}
    >
      {showFallback ? (
        // Fallback state
        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 font-inter font-medium">
          {fallback ? (
            <span aria-label={alt}>{fallback}</span>
          ) : (
            <UserIcon />
          )}
        </div>
      ) : (
        // Image state
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          {...props}
        />
      )}
    </div>
  );
};

Avatar.displayName = "Avatar";
