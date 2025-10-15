/**
 * Link Component
 *
 * Navigation using design system colors (terracotta + neutral).
 * Transitions: 300ms ease-out. Underlines for affordance (WCAG). External icons: 16px.
 * Focus ring: blue-600 with 4px border radius (rounded-sm).
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const linkVariants = cva(
  "transition-colors duration-[300ms] ease-[cubic-bezier(0.33,1,0.68,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm",
  {
    variants: {
      variant: {
        default: "text-blue-600 underline decoration-blue-600/30 hover:text-blue-700 hover:decoration-blue-700",
        nav: "text-gray-700 hover:text-blue-600 aria-[current=page]:text-blue-700 aria-[current=page]:font-medium",
        external: "text-blue-600 underline decoration-blue-600/30 hover:text-blue-700 hover:decoration-blue-700 inline-flex items-center gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /** Whether this nav link is currently active (for nav variant) */
  active?: boolean;
  /** External link - adds icon, target="_blank", rel="noopener noreferrer" */
  external?: boolean;
}

// External link icon
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
      clipRule="evenodd"
    />
  </svg>
);

export const Link = ({
  className,
  variant,
  active = false,
  external = false,
  children,
  href,
  ...props
}: LinkProps) => {
  // If external prop is true, automatically set variant to external
  const effectiveVariant = external ? 'external' : variant;

  // External links get additional props
  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${children} (Opens in new window)`,
      }
    : {};

  // Active nav links get aria-current
  const navProps = variant === 'nav' && active ? { 'aria-current': 'page' as const } : {};

  return (
    <a
      href={href}
      className={cn(linkVariants({ variant: effectiveVariant }), className)}
      {...externalProps}
      {...navProps}
      {...props}
    >
      {children}
      {external && <ExternalLinkIcon />}
    </a>
  );
};

Link.displayName = "Link";
