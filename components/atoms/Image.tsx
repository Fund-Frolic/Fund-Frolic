/**
 * Image Component
 *
 * next/image wrapper using design system.
 * Loading skeleton: gray-200. Border radius: design system tokens (4px/8px/12px/16px, all 8-point grid).
 * Caption spacing: 8px (mt-2). Semantic HTML: figure/figcaption.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';

const imageVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      rounded: "md",
    },
  }
);

const aspectRatioMap = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
};

export interface ImageProps
  extends Omit<NextImageProps, 'src'>,
    VariantProps<typeof imageVariants> {
  /** Image source URL (required) */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Aspect ratio */
  aspectRatio?: keyof typeof aspectRatioMap;
  /** Caption text */
  caption?: string;
}

export const Image = ({
  src,
  alt,
  aspectRatio,
  rounded,
  caption,
  className,
  fill,
  ...props
}: ImageProps) => {
  const aspectClass = aspectRatio ? aspectRatioMap[aspectRatio] : undefined;

  const imageContent = (
    <div
      className={cn(
        imageVariants({ rounded }),
        aspectClass,
        "bg-gray-200",
        className
      )}
    >
      <NextImage
        src={src}
        alt={alt}
        fill={aspectRatio ? true : fill}
        className={cn(
          "object-cover",
          rounded && imageVariants({ rounded })
        )}
        {...props}
      />
    </div>
  );

  if (caption) {
    return (
      <figure>
        {imageContent}
        <figcaption className="font-inter text-sm leading-[1.428] text-gray-600 mt-2">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return imageContent;
};

Image.displayName = "Image";
