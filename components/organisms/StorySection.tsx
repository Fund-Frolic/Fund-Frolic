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
  const sectionRef = useRef<HTMLElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  // TEMPORARILY DISABLED - Testing performance without animations
  // useEffect(() => {
  //   // Cache measurements that don't change during scroll
  //   let cachedSectionTop = 0;
  //   let cachedSectionHeight = 0;
  //   let cachedWindowHeight = 0;

  //   const updateMeasurements = () => {
  //     if (sectionRef.current) {
  //       cachedSectionTop = sectionRef.current.offsetTop;
  //       cachedSectionHeight = sectionRef.current.offsetHeight;
  //       cachedWindowHeight = window.innerHeight;
  //     }
  //   };

  //   updateMeasurements();

  //   const updateSun = () => {
  //     if (!sectionRef.current || !sunRef.current) {
  //       rafRef.current = requestAnimationFrame(updateSun);
  //       return;
  //     }

  //     // Only read scrollY each frame - everything else is cached
  //     const scrollY = window.scrollY;
  //     const scrolledIntoSection = scrollY + cachedWindowHeight - cachedSectionTop;
  //     const progress = Math.max(0, Math.min(1, scrolledIntoSection / cachedSectionHeight));

  //     // Directly update DOM
  //     sunRef.current.style.transform = `translate(calc(${progress * 85}vw - ${progress * 600}px), calc(-${progress * 100}vh + ${progress * 600}px))`;

  //     // Keep the loop going
  //     rafRef.current = requestAnimationFrame(updateSun);
  //   };

  //   // Update measurements on resize
  //   const handleResize = () => updateMeasurements();
  //   window.addEventListener('resize', handleResize);

  //   // Start the animation loop
  //   rafRef.current = requestAnimationFrame(updateSun);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     if (rafRef.current) {
  //       cancelAnimationFrame(rafRef.current);
  //     }
  //   };
  // }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className={cn(
        "relative w-full py-12 sm:py-16 md:py-20 lg:py-24 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* TEMPORARILY DISABLED - Rising Sun - bottom-left to top-right */}
      {/* <div
        ref={sunRef}
        className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] lg:w-[480px] lg:h-[480px] xl:w-[600px] xl:h-[600px] pointer-events-none"
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(252, 211, 77, 0.2)) drop-shadow(0 8px 24px rgba(252, 211, 77, 0.15))',
          transform: 'translate(calc(85vw - 200px), calc(-100vh + 200px))'
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FCD34D" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.85" />
            </radialGradient>

            <filter id="rayGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="100" cy="100" r="42" fill="url(#sunGradient)" />

          <g stroke="#FCD34D" strokeWidth="3.5" strokeLinecap="round" opacity="0.55" filter="url(#rayGlow)">
            <line x1="100" y1="25" x2="100" y2="48" />
            <line x1="100" y1="152" x2="100" y2="175" />
            <line x1="25" y1="100" x2="48" y2="100" />
            <line x1="152" y1="100" x2="175" y2="100" />
            <line x1="38" y1="38" x2="54" y2="54" />
            <line x1="146" y1="146" x2="162" y2="162" />
            <line x1="38" y1="162" x2="54" y2="146" />
            <line x1="146" y1="54" x2="162" y2="38" />
          </g>

          <circle cx="95" cy="92" r="10" fill="#FEF3C7" opacity="0.3" />
        </svg>
      </div> */}

      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
            Meet Your Funding Crew
          </h2>
          <p className="font-body text-base sm:text-lg md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span className="lg:hidden">The team helping startups find funding without giving up equity.</span>
            <span className="hidden lg:inline">Turns out the money's been here all along - these two just handed you the treasure map (no soul-selling or stock trading required). Meet Guenevere, Meet Logan</span>
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center">
            <Avatar
              src=""
              alt="Team Member 1"
              fallback="GB"
              size="2xl"
              ring
              className="mb-4 sm:mb-6 !w-20 !h-20 sm:!w-24 sm:!h-24"
            />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
              Guenevere Blanchard
            </h3>
            <p className="font-body text-sm sm:text-base text-primary font-medium mb-3 sm:mb-4">
              Co-Founder & Grant Strategist
            </p>
            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md px-4 sm:px-0">
              After launching 22+ companies across wildly different industries, I learned one truth: every great founder deserves funding that doesn't cost them their dream. I turn complex grant applications into clear, compelling stories that get noticed—and funded. Bring your big idea, I'll bring the strategy.
            </p>
            <a
              href="https://www.linkedin.com/in/guenevere-blanchard-a25aba201/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 font-body text-sm sm:text-base text-link hover:text-primary-hover transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center">
            <Avatar
              src=""
              alt="Team Member 2"
              fallback="LB"
              size="2xl"
              ring
              className="mb-4 sm:mb-6 !w-20 !h-20 sm:!w-24 sm:!h-24"
            />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
              Logan Bell
            </h3>
            <p className="font-body text-sm sm:text-base text-primary font-medium mb-3 sm:mb-4">
              Founding Developer
            </p>
            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md px-4 sm:px-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

StorySection.displayName = "StorySection";
