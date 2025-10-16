/**
 * ContactSuccess Component
 *
 * Success state shown after user submits contact information.
 * Confirms receipt and next steps for grant writing assistance.
 */

'use client';

import { cn } from '@/lib/utils';
import { GrantResult } from '@/types/grants';

export interface ContactSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grant results to display grant names in confirmation
   */
  results: GrantResult;
  /**
   * Callback to find more grants (resets to form view)
   */
  onFindMoreGrants?: () => void;
  /**
   * Optional custom className for styling
   */
  className?: string;
}

export const ContactSuccess = ({
  results,
  onFindMoreGrants,
  className,
  ...props
}: ContactSuccessProps) => {
  const grantNames = results.grants.map(g => g.name);

  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500",
        className
      )}
      {...props}
    >
      <div className="relative w-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(251,191,36,0.25),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(251,191,36,0.20),0_20px_40px_-8px_rgba(37,99,235,0.08),0_24px_48px_rgba(251,191,36,0.12)] backdrop-blur-md overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-12 text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-success/20 blur-2xl rounded-full"></div>
              <svg
                className="relative w-20 h-20 sm:w-24 sm:h-24 text-success animate-in zoom-in duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Thank you! We've received your information.
            </h2>
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our team will review your grant matches and contact you shortly to discuss how we can help you with:
            </p>
          </div>

          {/* Grant List */}
          <div className="bg-background/60 rounded-[16px] p-6 space-y-3 max-w-xl mx-auto">
            {grantNames.map((name, index) => (
              <div key={index} className="flex items-start gap-3 text-left">
                <svg className="flex-shrink-0 w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-body text-sm sm:text-base text-foreground font-medium">{name}</span>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <p className="font-body text-sm sm:text-base text-muted-foreground">
              We'll reach out within 1-2 business days to discuss your grant application strategy.
            </p>

            {/* Reference Info */}
            <div className="pt-4 border-t border-border/50">
              <p className="font-body text-xs sm:text-sm text-muted-foreground">
                Reference ID: <span className="font-mono font-semibold text-foreground">{results.searchId}</span>
              </p>
            </div>
          </div>

          {/* Find More Grants Button */}
          {onFindMoreGrants && (
            <div className="pt-4">
              <button
                onClick={onFindMoreGrants}
                className="inline-flex items-center gap-2 px-6 py-3 bg-background/60 hover:bg-background/90 text-foreground rounded-[16px] font-body font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_2px_rgba(59,130,246,0.06)] hover:shadow-[0_2px_4px_rgba(59,130,246,0.10)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Find More Grants</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ContactSuccess.displayName = "ContactSuccess";
