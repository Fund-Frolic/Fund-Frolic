/**
 * CTASection Component
 *
 * Call-to-action section encouraging users to book a discovery call.
 * Positioned after team section as final conversion point.
 */

'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { useFormHighlight } from '@/lib/contexts/FormHighlightContext';
import { useBottomSheet } from '@/lib/contexts/BottomSheetContext';

export interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export const CTASection = ({
  className,
  ...props
}: CTASectionProps) => {
  const { triggerHighlight } = useFormHighlight();
  const { openBottomSheet } = useBottomSheet();

  return (
    <section
      id="cta"
      className={cn(
        "relative w-full py-12 sm:py-16 md:py-20 lg:py-24 flex items-center px-4 sm:px-6 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      <div className="relative max-w-4xl mx-auto w-full text-center">
        {/* Main CTA Card */}
        <div className="relative bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-8 sm:p-10 lg:p-12 xl:p-16 shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(251,191,36,0.25),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(251,191,36,0.20),0_20px_40px_-8px_rgba(37,99,235,0.08),0_24px_48px_rgba(251,191,36,0.12)] backdrop-blur-md overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent_70%)] pointer-events-none" />

          <div className="relative">
            {/* Heading */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              <span className="lg:hidden">Your Grants Are Waiting</span>
              <span className="hidden lg:inline">Still Scrolling? Your Grants Are Waiting.</span>
            </h2>

            {/* Subheading */}
            <p className="font-body text-base sm:text-lg md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto">
              <span className="lg:hidden">Join 500+ founders who found grants in under a minute.</span>
              <span className="hidden lg:inline">Join 500+ founders who found their perfect grants in under a minute.</span>
            </p>

            {/* Benefits List */}
            <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <span className="lg:hidden">Get 3 personalized grant matches</span>
                  <span className="hidden lg:inline">Get 3 personalized grant matches tailored to your project</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <span className="lg:hidden">See why each grant fits your business</span>
                  <span className="hidden lg:inline">See why each grant is a perfect fit for your business</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gold-100 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <span className="lg:hidden">Get direct links to start applying</span>
                  <span className="hidden lg:inline">Start your application with direct links to each opportunity</span>
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-[280px]"
              onClick={() => {
                // On mobile (below 640px), open bottom sheet instead
                if (window.innerWidth < 640) {
                  openBottomSheet();
                } else {
                  // On desktop, scroll and highlight form
                  const element = document.getElementById('home');
                  if (element) {
                    const offset = 120;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    triggerHighlight();
                  }
                }
              }}
            >
              Find My Grants Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

CTASection.displayName = "CTASection";
