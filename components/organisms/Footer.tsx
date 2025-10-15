/**
 * Footer Component
 *
 * Simple footer with branding and copyright.
 * Uses design system tokens for consistent styling.
 */

import { cn } from '@/lib/utils';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export const Footer = ({
  className,
  ...props
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full py-12 px-6 md:px-12 bg-background border-t border-border",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary via-blue-600 to-blue-700 rounded-[10px] flex items-center justify-center shadow-[0_1px_2px_rgba(37,99,235,0.25),0_4px_8px_rgba(37,99,235,0.20)]">
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Fund Frolic
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground text-center md:text-left">
              Your funding barn-raising crew
            </p>
          </div>

          {/* Copyright */}
          <div className="font-body text-sm text-muted-foreground text-center md:text-right">
            © {currentYear} Fund Frolic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
