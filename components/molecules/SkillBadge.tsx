/**
 * SkillBadge Molecule
 *
 * Display skills with proficiency indicators.
 * Container: flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md.
 * Icon: Technology icon (20px), text-gray-700.
 * Label: font-inter text-sm font-medium text-gray-900.
 * Proficiency: Optional dot indicator (1-3 dots for beginner/intermediate/expert).
 * Hover: Subtle background change (hover:bg-gray-200).
 * Accessibility: Proficiency aria-label for screen readers.
 */

import { cn } from '@/lib/utils';

const proficiencyLabels = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Expert',
} as const;

export interface SkillBadgeProps {
  /** Technology icon */
  icon: React.ReactNode;
  /** Skill name */
  label: string;
  /** Optional skill level (1-3) */
  proficiency?: 1 | 2 | 3;
  /** Additional class */
  className?: string;
}

export const SkillBadge = ({
  icon,
  label,
  proficiency,
  className,
}: SkillBadgeProps) => {
  const proficiencyLabel = proficiency ? proficiencyLabels[proficiency] : null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200 transition-colors duration-[150ms] ease-[cubic-bezier(0.33,1,0.68,1)]",
        className
      )}
    >
      {/* Icon */}
      <span className="flex-shrink-0 w-5 h-5 text-gray-700" aria-hidden="true">
        {icon}
      </span>

      {/* Label */}
      <span className="font-inter text-sm font-medium text-gray-900">
        {label}
      </span>

      {/* Proficiency dots */}
      {proficiency && (
        <div
          className="flex items-center gap-1 ml-1"
          aria-label={`Proficiency: ${proficiencyLabel}`}
          role="img"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                index < proficiency ? "bg-blue-600" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      )}

      {/* Screen reader text */}
      <span className="sr-only">
        {proficiencyLabel && `, ${proficiencyLabel} level`}
      </span>
    </div>
  );
};

SkillBadge.displayName = "SkillBadge";
