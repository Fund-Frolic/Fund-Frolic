/**
 * SocialLink Molecule
 *
 * Social media links with icons and tooltips.
 * Icon: 20px (w-5 h-5), gray-700 default, blue-600 on hover.
 * Tooltip: bg-gray-900, text-white, text-xs, px-2 py-1, rounded-sm.
 * Transitions: 150ms ease-out. External link with proper rel attributes.
 * Accessibility: aria-label, tooltip on focus (not just hover).
 */

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

// GitHub icon
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
  </svg>
);

// LinkedIn icon
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
  </svg>
);

// Twitter (X) icon
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.9 8.6L19.3 0h-1.7l-6.5 7.4L6.4 0H0l7.8 11.3L0 20.3h1.7l6.8-7.8 5.5 7.8H20L11.9 8.6zm-2.4 2.8l-.8-1.1L2.3 1.3h2.7l5.2 7.4.8 1.1 6.6 9.4h-2.7l-5.5-7.8z" />
  </svg>
);

// Email icon
const EmailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const platformIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  email: EmailIcon,
};

const platformLabels = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  email: 'Email',
};

export interface SocialLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Social media platform */
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  /** Link URL */
  href: string;
  /** Tooltip text (defaults to platform name) */
  label?: string;
}

export const SocialLink = ({
  platform,
  href,
  label,
  className,
  ...props
}: SocialLinkProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const IconComponent = platformIcons[platform];
  const tooltipText = label || platformLabels[platform];
  const ariaLabel = `Visit my ${tooltipText} profile`;

  return (
    <div className="relative inline-flex">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={cn(
          "inline-flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-600 transition-colors duration-150 ease-out rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        <IconComponent className="w-5 h-5" />
      </a>

      {/* Tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-sm whitespace-nowrap pointer-events-none"
        >
          {tooltipText}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

SocialLink.displayName = "SocialLink";
