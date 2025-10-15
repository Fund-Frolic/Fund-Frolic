/**
 * Breadcrumb Molecule
 *
 * Navigation breadcrumbs for deep pages.
 * Link: text-gray-600, hover: blue-600, text-sm (14px).
 * Current page: text-gray-900 font-medium (not a link).
 * Separator: ChevronRight icon (8px), text-gray-400.
 * Container: flex items-center gap-2 (8-point grid).
 * Accessibility: nav with aria-label, ol/li structure, aria-current="page".
 */

import { cn } from '@/lib/utils';

// ChevronRight icon for separator
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export interface BreadcrumbItemProps {
  /** Link URL (omit for current page) */
  href?: string;
  /** Breadcrumb label */
  label: string;
  /** Hide separator (automatically set for last item) */
  isLast?: boolean;
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItemProps[];
  /** Additional wrapper class */
  className?: string;
}

export const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("", className)}>
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = !item.href || isLast;

          return (
            <li key={index} className="flex items-center gap-2">
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="font-inter text-sm font-medium text-gray-900"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="font-inter text-sm text-gray-600 hover:text-blue-600 transition-colors duration-150 ease-out"
                >
                  {item.label}
                </a>
              )}

              {!isLast && (
                <ChevronRightIcon className="w-2 h-2 text-gray-400 flex-shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = "Breadcrumb";
