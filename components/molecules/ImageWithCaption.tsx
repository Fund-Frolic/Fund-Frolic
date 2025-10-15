/**
 * ImageWithCaption Molecule
 *
 * Images with descriptive captions for case studies.
 * Image: Uses Image atom (aspect ratio, rounded-lg).
 * Caption: text-gray-600 text-sm text-center mt-3 (Inter).
 * Credit: text-gray-500 text-xs (optional photographer credit).
 * Container: <figure> with <figcaption>.
 * Accessibility: Semantic HTML, alt text, caption association.
 */

import { cn } from '@/lib/utils';
import { Image } from '@/components/atoms/Image';

export interface ImageWithCaptionProps {
  /** Image source URL */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Caption text */
  caption: string;
  /** Optional photographer credit */
  credit?: string;
  /** Aspect ratio */
  aspectRatio?: '16/9' | '4/3' | '1/1';
  /** Border radius */
  rounded?: 'md' | 'lg' | 'xl';
  /** Additional wrapper class */
  className?: string;
}

export const ImageWithCaption = ({
  src,
  alt,
  caption,
  credit,
  aspectRatio = '16/9',
  rounded = 'lg',
  className,
}: ImageWithCaptionProps) => {
  return (
    <figure className={cn("", className)}>
      {/* Image without built-in caption */}
      <Image
        src={src}
        alt={alt}
        aspectRatio={aspectRatio}
        rounded={rounded}
      />

      {/* Custom figcaption with centered text and optional credit */}
      <figcaption className="mt-3 text-center">
        <p className="font-inter text-sm text-gray-600">{caption}</p>
        {credit && (
          <p className="font-inter text-xs text-gray-500 mt-1">{credit}</p>
        )}
      </figcaption>
    </figure>
  );
};

ImageWithCaption.displayName = "ImageWithCaption";
