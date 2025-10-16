/**
 * GrantLoadingState Component
 *
 * Full-page loading overlay shown while AI finds matching grants.
 * Features animated messages that cycle through different loading states.
 */

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export interface GrantLoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional custom className for styling
   */
  className?: string;
}

const loadingMessages = [
  "Analyzing your project details...",
  "Searching federal grant databases...",
  "Exploring state funding opportunities...",
  "Reviewing private grant programs...",
  "Finding the perfect matches...",
];

export const GrantLoadingState = ({
  className,
  ...props
}: GrantLoadingStateProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-center space-y-8 px-4">
        {/* Animated Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 rounded-full border-4 border-gold-200"></div>

          {/* Spinning ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-gold-500 animate-spin"></div>

          {/* Inner glow */}
          <div className="absolute inset-2 w-20 h-20 rounded-full bg-gradient-to-br from-gold-400/30 via-gold-500/20 to-transparent blur-lg"></div>
        </div>

        {/* Loading Messages */}
        <div className="relative h-16 w-full max-w-md">
          {loadingMessages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-500",
                currentMessageIndex === index
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform -translate-y-2"
              )}
            >
              <p className="font-display text-lg md:text-xl font-semibold text-foreground text-center">
                {message}
              </p>
            </div>
          ))}
        </div>

        {/* Progress indicator dots */}
        <div className="flex gap-2">
          {loadingMessages.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-500",
                currentMessageIndex === index
                  ? "bg-gold-500 w-8"
                  : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Subtitle */}
        <p className="font-body text-sm text-muted-foreground text-center max-w-md">
          Our AI is analyzing thousands of grants to find the best matches for your project. This may take a moment.
        </p>
      </div>
    </div>
  );
};

GrantLoadingState.displayName = "GrantLoadingState";
