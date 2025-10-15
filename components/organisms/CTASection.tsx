/**
 * CTASection Component
 *
 * Call-to-action section encouraging users to book a discovery call.
 * Positioned after team section as final conversion point.
 */

'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';

export interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export const CTASection = ({
  className,
  ...props
}: CTASectionProps) => {
  return (
    <section
      id="cta"
      className={cn(
        "relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      <div className="relative max-w-4xl mx-auto w-full text-center">
        {/* Main CTA Card */}
        <div className="relative bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-8 sm:p-10 lg:p-12 xl:p-16 shadow-[0_1px_3px_rgba(37,99,235,0.12),0_8px_16px_-4px_rgba(37,99,235,0.10),0_20px_40px_-8px_rgba(37,99,235,0.08),0_32px_64px_-16px_rgba(37,99,235,0.06)] backdrop-blur-md overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none" />

          <div className="relative">
            {/* Heading */}
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Ready to Raise Your Funding Barn?
            </h2>

            {/* Subheading */}
            <p className="font-body text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto">
              Jump on a discovery call and we'll map out your path to funded growth:
            </p>

            {/* Benefits List */}
            <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto">
              <div className="flex items-start gap-3 sm:gap-4 text-left">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Which grants you qualify for right now (spoiler: probably more than you think)
                </p>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 text-left">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                  How to weave grants into your capital stack without the headaches
                </p>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 text-left">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                  The fastest route to your first (or next) funded project
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button variant="primary" size="lg" className="w-full sm:w-auto sm:min-w-[280px]">
              Book Your Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

CTASection.displayName = "CTASection";
