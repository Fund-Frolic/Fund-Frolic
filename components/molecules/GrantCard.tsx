/**
 * GrantCard Component
 *
 * Displays a single grant recommendation with all relevant details.
 * Shows name, description, fit explanation, eligibility, and application link.
 */

'use client';

import { cn } from '@/lib/utils';
import { Grant } from '@/types/grants';

export interface GrantCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grant data to display
   */
  grant: Grant;
  /**
   * Optional custom className for styling
   */
  className?: string;
  /**
   * Optional rank number to display (1st, 2nd, 3rd match)
   */
  rank?: number;
}

export const GrantCard = ({
  grant,
  className,
  rank,
  ...props
}: GrantCardProps) => {
  return (
    <div
      className={cn(
        "relative w-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(37,99,235,0.15),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(59,130,246,0.12),0_20px_40px_-8px_rgba(37,99,235,0.08),0_24px_48px_rgba(59,130,246,0.08)] backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-[0_2px_4px_rgba(37,99,235,0.18),0_6px_12px_rgba(37,99,235,0.16),0_12px_24px_rgba(59,130,246,0.14),0_24px_48px_rgba(59,130,246,0.10)] hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 space-y-6">
        {/* Header with rank badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">
              {grant.name}
            </h3>
          </div>
          {rank && (
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shadow-[0_2px_8px_rgba(251,191,36,0.25)]">
              <span className="font-display text-lg font-bold text-gold-800">
                {rank}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            About This Grant
          </h4>
          <p className="font-body text-base text-foreground leading-relaxed">
            {grant.description}
          </p>
        </div>

        {/* Why Good Fit */}
        <div className="space-y-2">
          <h4 className="font-body text-sm font-semibold text-primary uppercase tracking-wide">
            Why It's a Great Match
          </h4>
          <p className="font-body text-base text-foreground leading-relaxed">
            {grant.whyGoodFit}
          </p>
        </div>

        {/* Eligibility Requirements */}
        <div className="space-y-3">
          <h4 className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Key Eligibility Requirements
          </h4>
          <ul className="space-y-2">
            {grant.eligibility.map((requirement, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gold-800 mt-0.5"
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
                <span className="font-body text-sm text-foreground flex-1">
                  {requirement}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Application Link */}
        <div className="pt-4 border-t border-border/50">
          <a
            href={grant.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[16px] font-body font-semibold text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_3px_rgba(37,99,235,0.25),0_4px_8px_rgba(37,99,235,0.20),0_8px_16px_rgba(59,130,246,0.15)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.30),0_6px_12px_rgba(37,99,235,0.25),0_12px_24px_rgba(59,130,246,0.18)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View Grant Details</span>
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

GrantCard.displayName = "GrantCard";
