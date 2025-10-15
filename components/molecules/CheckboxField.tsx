/**
 * CheckboxField Molecule
 *
 * Checkbox with label and description.
 * Layout: Horizontal (checkbox left, label/description right).
 * Checkbox: 20px (w-5 h-5), aligned to top of text.
 * Label: font-inter text-base font-medium text-gray-900.
 * Description: text-gray-600 text-sm mt-0.5 (optional).
 * Spacing: gap-3 (12px between checkbox and text, 8-point grid).
 * Large click area: Entire label area clickable.
 * Accessibility: Label association via id/htmlFor, aria-describedby for description.
 */

'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox, type CheckboxProps } from '@/components/atoms/Checkbox';

export interface CheckboxFieldProps extends Omit<CheckboxProps, 'id' | 'aria-describedby'> {
  /** Label text */
  label: string;
  /** Optional description below label */
  description?: string;
  /** Additional wrapper class */
  className?: string;
}

export const CheckboxField = ({
  label,
  description,
  className,
  checked,
  onChange,
  disabled,
  ...props
}: CheckboxFieldProps) => {
  const generatedId = useId();
  const checkboxId = `checkbox-${generatedId}`;
  const descriptionId = description ? `${checkboxId}-description` : undefined;

  return (
    <div className={cn("flex gap-3 items-start", className)}>
      {/* Checkbox */}
      <Checkbox
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-describedby={descriptionId}
        className="mt-0.5"
        {...props}
      />

      {/* Label + Description */}
      <div className="flex-1">
        <label
          htmlFor={checkboxId}
          className={cn(
            "font-inter text-base font-medium text-gray-900 cursor-pointer select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </label>
        {description && (
          <p
            id={descriptionId}
            className={cn(
              "font-inter text-sm text-gray-600 mt-0.5",
              disabled && "opacity-50"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

CheckboxField.displayName = "CheckboxField";
