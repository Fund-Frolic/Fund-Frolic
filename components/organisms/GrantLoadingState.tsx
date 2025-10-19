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
        {/* Animated Logo */}
        <div className="relative">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-gold-400/40 via-gold-500/30 to-transparent blur-2xl animate-pulse"></div>

          {/* Logo with animations */}
          <svg
            className="relative w-24 h-24 animate-[spin_3s_ease-in-out_infinite]"
            viewBox="0 0 126.19 108.67"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.4))'
            }}
          >
            <path
              className="animate-pulse"
              fill="#fbbf24"
              d="M124.91,9.41c-.09-.08-.18-.15-.27-.23-1.1-.94-2.14-1.75-3.13-2.43-5.16-3.56-10.29-5.72-15.39-6.46-5.11-.75-9.91-.05-14.42,2.1-4.51,2.15-8.54,5.8-12.1,10.95l-1.44,2.09-8.71-6.02c-1.69-1.17-4.02-.75-5.19.95l-5.68,8.22c-1.17,1.69-.75,4.02.95,5.19l8.62,5.95-26.29,38.05-11.78-8.14c-1.69-1.17-4.02-.75-5.19.95l-5.68,8.22c-1.17,1.69-.75,4.02.95,5.19l11.78,8.14-1.44,2.09c-2.37,3.44-5.1,5.28-8.16,5.51-3.07.24-6.4-.88-10-3.37-.57-.39-1.19-.85-1.86-1.38,0,0-.01-.01-.02-.02-1.16-.91-2.84-.71-3.68.51l-6.11,8.85c-1.08,1.56-.82,3.69.61,4.93.09.08.18.15.27.23,1.1.94,2.14,1.75,3.13,2.43,5.16,3.56,10.29,5.72,15.39,6.46,5.11.75,9.91.05,14.42-2.1,4.51-2.15,8.54-5.8,12.1-10.95l1.44-2.09,8.71,6.02c1.69,1.17,4.02.75,5.19-.95l5.68-8.22c1.17-1.69.75-4.02-.95-5.19l-8.62-5.95,26.29-38.05,11.78,8.14c1.69,1.17,4.02.75,5.19-.95l5.68-8.22c1.17-1.69.75-4.02-.95-5.19l-11.78-8.14,1.44-2.09c2.37-3.44,5.1-5.28,8.16-5.51,3.07-.24,6.4.88,10,3.37.57.39,1.19.85,1.86,1.38,0,0,.01.01.02.02,1.16.91,2.84.71,3.68-.51l6.11-8.85c1.08-1.56.82-3.69-.61-4.93Z"
            />
          </svg>
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
