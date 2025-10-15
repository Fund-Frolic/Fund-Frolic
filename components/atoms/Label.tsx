/**
 * Label Component
 *
 * Form field labels using design system.
 * Typography: Inter text-sm font-medium. Color: gray-700.
 * Required indicator: blue-600 asterisk (design system, not generic red).
 * Spacing: 6px gap to input (mb-[6px], half 8-point grid step).
 */

import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Show required indicator (asterisk) */
  required?: boolean;
  /** Associated input ID - required for accessibility */
  htmlFor: string;
  /** Optional hint text shown below label */
  hint?: string;
}

export const Label = ({
  children,
  required = false,
  htmlFor,
  hint,
  className,
  ...props
}: LabelProps) => {
  // Generate hint ID for aria-describedby association
  const hintId = hint ? `${htmlFor}-hint` : undefined;

  if (hint) {
    return (
      <div className="mb-[6px]">
        <label
          htmlFor={htmlFor}
          className={cn(
            "font-inter text-sm font-medium text-gray-700 block",
            className
          )}
          {...props}
        >
          {children}
          {required && (
            <span className="text-blue-600 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
        {hint && (
          <p id={hintId} className="text-xs text-gray-600 mt-1">
            {hint}
          </p>
        )}
      </div>
    );
  }

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "font-inter text-sm font-medium text-gray-700 mb-[6px] block",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-blue-600 ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

Label.displayName = "Label";
