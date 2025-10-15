/**
 * StorySection Component
 *
 * Team member profiles with avatars and bios.
 * Showcases the people behind Fund Frolic.
 */

'use client';

import { cn } from '@/lib/utils';
import { Avatar } from '@/components/atoms/Avatar';
import { useEffect, useState, useRef } from 'react';

export interface StorySectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export const StorySection = ({
  className,
  ...props
}: StorySectionProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled into the section
      const scrolledIntoSection = scrollY + windowHeight - sectionTop;

      // Progress from 0 to 1 as section comes into view
      const progress = Math.max(0, Math.min(1, scrolledIntoSection / sectionHeight));

      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className={cn(
        "relative w-full min-h-screen flex items-center px-6 md:px-12 bg-background overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Rising Sun - bottom-left to top-right */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(calc(${scrollProgress * 85}vw - ${scrollProgress * 600}px), calc(-${scrollProgress * 100}vh + ${scrollProgress * 600}px))`,
          filter: 'drop-shadow(0 4px 12px rgba(252, 211, 77, 0.2)) drop-shadow(0 8px 24px rgba(252, 211, 77, 0.15))'
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Subtle radial gradient for sun orb */}
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FCD34D" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.85" />
            </radialGradient>

            {/* Glow filter for rays */}
            <filter id="rayGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main sun orb with subtle gradient */}
          <circle cx="100" cy="100" r="42" fill="url(#sunGradient)" />

          {/* Simplified sun rays - 8 primary */}
          <g stroke="#FCD34D" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" filter="url(#rayGlow)">
            {/* 8 rays around the sun */}
            <line x1="100" y1="25" x2="100" y2="48" />
            <line x1="100" y1="152" x2="100" y2="175" />
            <line x1="25" y1="100" x2="48" y2="100" />
            <line x1="152" y1="100" x2="175" y2="100" />
            <line x1="38" y1="38" x2="54" y2="54" />
            <line x1="146" y1="146" x2="162" y2="162" />
            <line x1="38" y1="162" x2="54" y2="146" />
            <line x1="146" y1="54" x2="162" y2="38" />
          </g>

          {/* Inner highlight for subtle depth */}
          <circle cx="95" cy="92" r="10" fill="#FEF3C7" opacity="0.3" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Your Funding Crew
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The folks who'll help you raise your barn
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center">
            <Avatar
              src=""
              alt="Team Member 1"
              fallback="JD"
              size="2xl"
              ring
              className="mb-6"
            />
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Jane Doe
            </h3>
            <p className="font-body text-base text-primary font-medium mb-4">
              Co-Founder & Grant Strategist
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center">
            <Avatar
              src=""
              alt="Team Member 2"
              fallback="JS"
              size="2xl"
              ring
              className="mb-6"
            />
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              John Smith
            </h3>
            <p className="font-body text-base text-primary font-medium mb-4">
              Co-Founder & Grant Writer
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

StorySection.displayName = "StorySection";
