/**
 * StatCard Molecule
 *
 * Display metrics with icon and label.
 * Container: bg-white border border-gray-200 rounded-lg p-6 text-center.
 * Icon: 32px, text-blue-600 (brand color).
 * Number: font-display text-4xl font-bold text-gray-900.
 * Label: text-gray-600 text-sm mt-2.
 * Centered: All content center-aligned.
 * Accessibility: Icon decorative (aria-hidden), number announced as text.
 */

import { cn } from '@/lib/utils';

export interface StatCardProps {
  /** Icon (decorative) */
  icon: React.ReactNode;
  /** Metric value */
  value: string | number;
  /** Description label */
  label: string;
  /** Additional wrapper class */
  className?: string;
}

export const StatCard = ({
  icon,
  value,
  label,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-lg p-6 text-center",
        className
      )}
    >
      {/* Icon */}
      <div
        className="flex justify-center mb-4"
        aria-hidden="true"
      >
        <div className="w-8 h-8 text-blue-600">
          {icon}
        </div>
      </div>

      {/* Value */}
      <p className="font-display text-4xl font-bold text-gray-900">
        {value}
      </p>

      {/* Label */}
      <p className="font-inter text-sm text-gray-600 mt-2">
        {label}
      </p>
    </div>
  );
};

StatCard.displayName = "StatCard";
