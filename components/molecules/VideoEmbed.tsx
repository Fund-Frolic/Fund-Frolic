/**
 * VideoEmbed Molecule
 *
 * Embedded videos for case studies and demos.
 * Container: aspect-video rounded-lg overflow-hidden (16:9).
 * Iframe: YouTube, Vimeo, or native video.
 * Placeholder: Image with play button before load (performance).
 * Caption: Below video (like ImageWithCaption).
 * Lazy load: Load iframe on user interaction (performance).
 * Accessibility: iframe title, keyboard support (Tab + Enter).
 */

'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

// Play button icon
const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="12" className="text-white opacity-90" />
    <path
      d="M9.5 8.5L16.5 12L9.5 15.5V8.5Z"
      className="text-blue-600"
    />
  </svg>
);

export interface VideoEmbedProps {
  /** YouTube/Vimeo URL or video file */
  src: string;
  /** For iframe title (accessibility) */
  title: string;
  /** Optional caption below video */
  caption?: string;
  /** Thumbnail image (shown before load) */
  placeholder?: string;
  /** Additional wrapper class */
  className?: string;
}

export const VideoEmbed = ({
  src,
  title,
  caption,
  placeholder,
  className,
}: VideoEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsLoaded(true);
    }
  };

  const videoContent = (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
      {!isLoaded && placeholder ? (
        // Placeholder with play button
        <button
          onClick={handleLoad}
          onKeyDown={handleKeyDown}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          {/* Placeholder image */}
          <img
            src={placeholder}
            alt=""
            className="w-full h-full object-cover"
          />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-colors duration-[150ms] ease-[cubic-bezier(0.33,1,0.68,1)]">
            <PlayIcon className="w-16 h-16 drop-shadow-lg" />
          </div>
        </button>
      ) : (
        // Iframe (loaded on interaction)
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );

  if (caption) {
    return (
      <figure className={cn("", className)}>
        {videoContent}
        <figcaption className="mt-3 text-center">
          <p className="font-inter text-sm text-gray-600">{caption}</p>
        </figcaption>
      </figure>
    );
  }

  return <div className={className}>{videoContent}</div>;
};

VideoEmbed.displayName = "VideoEmbed";
