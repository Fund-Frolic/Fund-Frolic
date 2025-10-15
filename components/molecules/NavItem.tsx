/**
 * NavItem Molecule
 *
 * Navigation links with active state indicators.
 * Default: text-gray-700, hover: blue-600.
 * Active: blue-700 font-medium with border-b-2 blue-600.
 * Transitions: 150ms ease-out. Typography: Inter text-base.
 * Touch target: 44×44px minimum (mobile-friendly).
 * Accessibility: aria-current="page" for active state.
 */

import { cn } from '@/lib/utils';

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Active state (current page) */
  active?: boolean;
  /** Optional icon before text (16px recommended) */
  icon?: React.ReactNode;
  /** Children (link text) */
  children: React.ReactNode;
}

export const NavItem = ({
  active = false,
  icon,
  children,
  className,
  href = '#',
  ...props
}: NavItemProps) => {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        // Base styles
        "inline-flex items-center gap-2 font-inter text-base transition-colors duration-150 ease-out",
        // Touch target (44×44px minimum on mobile)
        "py-3 px-4",
        // Border for active state (bottom border)
        "border-b-2",
        // Active state
        active && "text-blue-700 font-medium border-blue-600",
        // Default/hover state
        !active && "text-gray-700 hover:text-blue-600 border-transparent",
        className
      )}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      {children}
    </a>
  );
};

NavItem.displayName = "NavItem";
