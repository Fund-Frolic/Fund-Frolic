/**
 * GrantCard Component
 *
 * Displays a single grant recommendation with all relevant details.
 * Shows name, description, fit explanation, eligibility, and application link.
 */

'use client';

import { cn } from '@/lib/utils';
import { Grant } from '@/types/grants';
import { forwardRef } from 'react';

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
  /**
   * Whether the card is expanded (accordion mode)
   */
  isExpanded?: boolean;
  /**
   * Callback when accordion is toggled
   */
  onToggle?: () => void;
}

export const GrantCard = forwardRef<HTMLDivElement, GrantCardProps>(({
  grant,
  className,
  rank,
  isExpanded = true,
  onToggle,
  ...props
}, ref) => {
  const isAccordionMode = onToggle !== undefined;
  const truncatedDescription = grant.description.length > 120
    ? grant.description.substring(0, 120) + '...'
    : grant.description;
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(37,99,235,0.15),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(59,130,246,0.12),0_20px_40px_-8px_rgba(37,99,235,0.08),0_24px_48px_rgba(59,130,246,0.08)] backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-[0_2px_4px_rgba(37,99,235,0.18),0_6px_12px_rgba(37,99,235,0.16),0_12px_24px_rgba(59,130,246,0.14),0_24px_48px_rgba(59,130,246,0.10)] hover:scale-[1.02]",
        isAccordionMode && "cursor-pointer",
        className
      )}
      onClick={isAccordionMode ? onToggle : undefined}
      {...props}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 space-y-6">
        {/* Header with expand button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 flex items-start gap-3">
            {/* Rank badge - inline with title */}
            {rank && (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold-100/80 backdrop-blur-sm flex items-center justify-center shadow-[0_1px_3px_rgba(251,191,36,0.3)] mt-1">
                <span className="font-display text-sm font-bold text-gold-800">
                  {rank}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">
                {grant.name}
              </h3>
              {isAccordionMode && !isExpanded && (
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                  {truncatedDescription}
                </p>
              )}
            </div>
          </div>
          {isAccordionMode && (
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300"
              aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            >
              <svg
                className={cn(
                  "w-5 h-5 text-primary transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>

        {/* Expandable content */}
        {(!isAccordionMode || isExpanded) && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
});

GrantCard.displayName = "GrantCard";
