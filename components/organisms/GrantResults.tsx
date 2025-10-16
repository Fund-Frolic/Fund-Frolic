/**
 * GrantResults Component
 *
 * Displays the AI-generated grant recommendations.
 * Shows 3 grant cards and optional CTA for grant writing assistance.
 */

'use client';

import { cn } from '@/lib/utils';
import { GrantResult } from '@/types/grants';
import { GrantCard } from '@/components/molecules/GrantCard';
import { Badge } from '@/components/atoms/Badge';
import { useState } from 'react';

export interface GrantResultsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'results'> {
  /**
   * Grant results from API
   */
  results: GrantResult;
  /**
   * Callback when user wants to get help with grant writing
   */
  onRequestHelp?: () => void;
  /**
   * Optional custom className for styling
   */
  className?: string;
}

export const GrantResults = ({
  results,
  onRequestHelp,
  className,
  ...props
}: GrantResultsProps) => {
  const [showingTransition, setShowingTransition] = useState(false);

  const handleRequestHelp = () => {
    setShowingTransition(true);
    // Show confirmation briefly, then transition
    setTimeout(() => {
      if (onRequestHelp) {
        onRequestHelp();
      }
    }, 1500);
  };
  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20",
        className
      )}
      {...props}
    >
      <div className="space-y-8 sm:space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <Badge variant="success" size="md" className="font-semibold tracking-wide">
            GRANTS FOUND
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            We found 3 perfect matches for your project
          </h2>

          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our AI analyzed thousands of grants and selected these top opportunities that align with your project goals and eligibility requirements.
          </p>
        </div>

        {/* Grant Cards */}
        <div className="space-y-6 sm:space-y-8">
          {results.grants.map((grant, index) => (
            <GrantCard
              key={index}
              grant={grant}
              rank={index + 1}
            />
          ))}
        </div>

        {/* Help CTA Section */}
        <div className="relative w-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(251,191,36,0.25),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(251,191,36,0.20),0_20px_40px_-8px_rgba(37,99,235,0.08),0_24px_48px_rgba(251,191,36,0.12)] backdrop-blur-md overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-12 text-center space-y-6">
            {showingTransition ? (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="flex justify-center">
                  <svg className="w-16 h-16 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  Perfect! Your grant matches have been saved.
                </h3>
                <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Let's get your contact information so we can help you apply...
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    Need help with your grant applications?
                  </h3>
                  <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    Grant writing can be complex and time-consuming. Let our experts help you craft compelling applications that win funding.
                  </p>
                </div>

                <button
                  onClick={handleRequestHelp}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_3px_rgba(37,99,235,0.25),0_4px_8px_rgba(37,99,235,0.20),0_8px_16px_rgba(59,130,246,0.15),0_12px_24px_-2px_rgba(37,99,235,0.10)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.30),0_6px_12px_rgba(37,99,235,0.25),0_12px_24px_rgba(59,130,246,0.18),0_16px_32px_-2px_rgba(37,99,235,0.15)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Get Expert Help</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                <p className="font-body text-sm text-muted-foreground">
                  No obligation. Just share your contact info and we'll reach out.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Search Info */}
        <div className="text-center space-y-2">
          <p className="font-body text-sm text-muted-foreground">
            Search ID: {results.searchId}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Generated on {new Date(results.timestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

GrantResults.displayName = "GrantResults";
