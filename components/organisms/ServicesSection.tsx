/**
 * ServicesSection Component
 *
 * Displays service offerings, target audience, and CTA for discovery call.
 * Three-column layout with clear information hierarchy.
 * Includes scroll-animated clouds that cluster behind content.
 */

'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { useEffect, useState, useRef } from 'react';

export interface ServicesSectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export const ServicesSection = ({
  className,
  ...props
}: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cloud1Ref = useRef<SVGSVGElement>(null);
  const cloud2Ref = useRef<SVGSVGElement>(null);
  const cloud3Ref = useRef<SVGSVGElement>(null);
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

  //   const updateClouds = () => {
  //     if (!sectionRef.current || !cloud1Ref.current || !cloud2Ref.current || !cloud3Ref.current) {
  //       rafRef.current = requestAnimationFrame(updateClouds);
  //       return;
  //     }

  //     // Only read scrollY each frame - everything else is cached
  //     const scrollY = window.scrollY;
  //     const scrolledIntoSection = scrollY + cachedWindowHeight - cachedSectionTop;
  //     const progress = Math.max(0, Math.min(1, scrolledIntoSection / (cachedSectionHeight * 0.6)));

  //     // Use transform instead of left/right to avoid layout recalculation
  //     const opacity = Math.min(1, progress * 1.5).toString();
  //     cloud1Ref.current.style.transform = `translateX(${-600 + progress * 1000}px)`;
  //     cloud1Ref.current.style.opacity = opacity;
  //     cloud2Ref.current.style.transform = `translateX(${800 - progress * 1200}px)`;
  //     cloud2Ref.current.style.opacity = opacity;
  //     cloud3Ref.current.style.transform = `translateX(${-500 + progress * 900}px)`;
  //     cloud3Ref.current.style.opacity = opacity;

  //     // Keep the loop going
  //     rafRef.current = requestAnimationFrame(updateClouds);
  //   };

  //   // Update measurements on resize
  //   const handleResize = () => updateMeasurements();
  //   window.addEventListener('resize', handleResize);

  //   // Start the animation loop
  //   rafRef.current = requestAnimationFrame(updateClouds);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     if (rafRef.current) {
  //       cancelAnimationFrame(rafRef.current);
  //     }
  //   };
  // }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={cn(
        "relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-br from-blue-50 via-background to-gold-50 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Scroll-animated clouds - behind content */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Cloud 1 */}
        <svg
          ref={cloud1Ref}
          className="absolute top-[35%] left-[10%] w-[200px] sm:w-[300px] lg:w-[400px] h-auto"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.15)) drop-shadow(0 8px 16px rgba(59, 130, 246, 0.1))',
            opacity: 1
          }}
          viewBox="0 0 739.57 406.11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M715.09,332.98c-29.88,47.77-77.55,66.15-105.61,73.13H95.57c-17-5.07-36.41-14.3-53.88-31-7.79-7.45-50.67-48.44-39.99-105.69,6.22-33.36,29.11-64.1,62.84-78.55,24.62-10.55,47.87-9.34,63.87-6.12,3.26-11.05,9.22-25.17,20.39-38.87,26.11-32.02,61.75-38.52,72.13-39.99,13.04-1.85,24.97-1.24,35.28.53,5.03-14.53,14.18-34.33,31.13-53.37C326.26,9.33,377.16,2.3,390.17.92c17.72-1.89,67.7-4.25,113.54,30.7,32.79,25,47.76,57.11,54.6,79.15,9.25-1.69,20.22-2.89,32.52-2.74,14.54.19,48.61,1.04,82.13,22.21,53.86,34.01,64.05,93.82,64.98,99.91,8.02,52.15-15.67,91.34-22.85,102.83Z"
            fill="#DBEAFE"
            opacity="0.70"
          />
        </svg>

        {/* Cloud 2 */}
        <svg
          ref={cloud2Ref}
          className="absolute top-[25%] right-[8%] w-[280px] sm:w-[420px] lg:w-[560px] h-auto"
          style={{
            filter: 'drop-shadow(0 6px 12px rgba(59, 130, 246, 0.18)) drop-shadow(0 12px 24px rgba(59, 130, 246, 0.12))',
            opacity: 1
          }}
          viewBox="0 0 803.62 418.38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M791.97,383.81c-14.72,23.22-38.18,31.84-46.9,34.57H64.71c-16.49-9.66-37.57-26.05-51.18-52.5-28.39-55.14-8.99-124.24,29.38-164.91,20.78-22.03,44.33-32.74,58.91-37.93.68-14.02,4.19-36.53,18.81-58.74,31.89-48.41,88.02-51.91,92.88-52.13,31.27-1.42,55.7,10.14,69.85,19.11,8.7-12.09,23.02-28.72,44.69-42.99,15.24-10.03,56.36-33.54,111.47-27.23,21.86,2.51,66.32,12.04,101.69,50.99,30.75,33.86,38.23,71.91,40.22,90.48,11.97.18,28.08,2.3,44.87,10.42,43.42,21,57.4,65.68,61.1,81.24,8.68.27,19.22,1.47,30.79,4.7,12.08,3.37,46.94,13.11,68.08,45.95,15.1,23.48,27.23,65.02,5.7,98.97Z"
            fill="#BFDBFE"
            opacity="0.65"
          />
        </svg>

        {/* Cloud 3 */}
        <svg
          ref={cloud3Ref}
          className="absolute top-[55%] left-[15%] w-[160px] sm:w-[240px] lg:w-[320px] h-auto"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(251, 191, 36, 0.2)) drop-shadow(0 8px 16px rgba(251, 191, 36, 0.12))',
            opacity: 1
          }}
          viewBox="0 0 771.72 406.13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M769.54,335.56c-7.6,33.23-32.28,51.32-37.95,55.26-13.04,9.07-26.2,13.33-36.64,15.31H57.99c-15.9-7.56-34.76-20.87-46.84-43.94-20.28-38.72-11.8-86.56,16.64-117.19,21.63-23.3,48.95-30.33,67.35-32.25-1.76-16.77-1.91-46.73,13.88-78.28,25.77-51.46,74.37-68.03,84.57-71.24,43.22-13.62,80.56-2.84,98.83,4.59,6.04-8.88,13.99-18.59,24.35-27.9C331.41,26.76,367.95-.92,419.97.02c62.8,1.13,101.73,43.12,110.53,53.22,17.77,20.38,27.4,42.22,32.59,60.95,10.44-1.7,23.42-2.48,37.99-.36,9.25,1.35,40.21,6.31,66.59,31.96,26.95,26.21,33.31,58.68,34.81,75.53,8.73,2.94,18.69,7.59,28.44,15.03,27.15,20.73,47.72,59.44,38.62,99.21Z"
            fill="#FDE68A"
            opacity="0.75"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ready to Raise Your Funding Barn?
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Think barn-raising, but for your startup. We help you claim millions in grants, keep 100% of your equity, and actually have fun doing it.
          </p>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Block 1: What We Deliver */}
          <div className="relative bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl lg:rounded-[24px] p-5 sm:p-6 lg:p-8 shadow-[0_1px_3px_rgba(37,99,235,0.12),0_8px_16px_-4px_rgba(37,99,235,0.10),0_20px_40px_-8px_rgba(37,99,235,0.08)] backdrop-blur-md overflow-hidden">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

            <div className="relative">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                What We Bring to the Barn-Raising
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="font-body text-base font-semibold text-foreground mb-2">
                    Your Custom Funding Blueprint
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    A tailored roadmap showing exactly which grants fit your stage, industry, and vision — no guesswork.
                  </p>
                </div>

                <div>
                  <h4 className="font-body text-base font-semibold text-foreground mb-2">
                    Full-Service Grant Writing
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    We handle the research, writing, compliance, and submission. You focus on building your company.
                  </p>
                </div>

                <div>
                  <h4 className="font-body text-base font-semibold text-foreground mb-2">
                    Always-On Funding Pipeline
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    We continuously track new opportunities across federal, state, and private sources so you never miss out.
                  </p>
                </div>

                <div>
                  <h4 className="font-body text-base font-semibold text-foreground mb-2">
                    Post-Award Support
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Impact reporting and documentation that keeps you eligible for future funding rounds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Built for Founders */}
          <div className="relative bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl lg:rounded-[24px] p-5 sm:p-6 lg:p-8 shadow-[0_1px_3px_rgba(37,99,235,0.12),0_8px_16px_-4px_rgba(37,99,235,0.10),0_20px_40px_-8px_rgba(37,99,235,0.08)] backdrop-blur-md overflow-hidden">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

            <div className="relative">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Your Funding Crew, Coast to Coast
              </h3>

              <p className="font-body text-base text-muted-foreground leading-relaxed">
                From scrappy early-stage startups to growing social ventures, we've got founders covered in all 50 states. Building climate tech in Colorado? Launching health innovation in New York? We help you claim the funding that's already out there waiting for you — no equity required.
              </p>
            </div>
          </div>

          {/* Block 3: Let's Build Your Engine */}
          <div className="relative bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl lg:rounded-[24px] p-5 sm:p-6 lg:p-8 shadow-[0_1px_3px_rgba(37,99,235,0.12),0_8px_16px_-4px_rgba(37,99,235,0.10),0_20px_40px_-8px_rgba(37,99,235,0.08)] backdrop-blur-md overflow-hidden">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

            <div className="relative">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Let's Get Your Barn Raised
              </h3>

              <p className="font-body text-base text-muted-foreground mb-6">
                Jump on a discovery call and we'll map out:
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Which grants you qualify for right now (spoiler: probably more than you think)
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    How to weave grants into your capital stack without the headaches
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    The fastest route to your first (or next) funded project
                  </p>
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full">
                Book Your Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ServicesSection.displayName = "ServicesSection";
