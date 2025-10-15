/**
 * FormField Compound Component
 *
 * Complete form field with label, input, error, helper text.
 * Tight state coupling via Context API (label highlights on focus, error shows/hides, helper text changes).
 * Layout: Vertical stack (label → input → helper/error).
 * Spacing: space-y-1.5 (6px between elements, 8-point grid half-step).
 * Error message: text-blue-700 text-sm with error icon (warm red from design system).
 * Helper text: text-gray-600 text-sm.
 * Accessibility: Label association, aria-invalid, aria-describedby.
 */

'use client';

import { createContext, useContext, useId, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/atoms/Label';
import { Input, type InputProps } from '@/components/atoms/Input';

// Error icon
const ErrorIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

// Context for sharing state between sub-components
interface FormFieldContextValue {
  fieldId: string;
  error?: string;
  helperId: string;
  errorId: string;
}

const FormFieldContext = createContext<FormFieldContextValue | undefined>(undefined);

const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('FormField sub-components must be used within FormField');
  }
  return context;
};

// Root component
export interface FormFieldProps {
  /** Child components */
  children: React.ReactNode;
  /** Error message (triggers error state) */
  error?: string;
  /** Additional wrapper class */
  className?: string;
}

export const FormField = ({ children, error, className }: FormFieldProps) => {
  const generatedId = useId();
  const fieldId = `field-${generatedId}`;
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;

  const contextValue = useMemo(
    () => ({
      fieldId,
      error,
      helperId,
      errorId,
    }),
    [fieldId, error, helperId, errorId]
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <div className={cn("space-y-1.5", className)}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
};

// Label sub-component
interface FormFieldLabelProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> {
  /** Label text */
  children: React.ReactNode;
  /** Show required indicator */
  required?: boolean;
}

FormField.Label = Object.assign(
  function FormFieldLabel({
    children,
    required,
    className,
    ...props
  }: FormFieldLabelProps) {
    const { fieldId } = useFormFieldContext();

    return (
      <Label
        htmlFor={fieldId}
        required={required}
        className={className}
        {...props}
      >
        {children}
      </Label>
    );
  },
  { displayName: "FormField.Label" }
);

// Input sub-component
type FormFieldInputProps = Omit<InputProps, 'id' | 'error' | 'aria-invalid' | 'aria-describedby'>;

FormField.Input = Object.assign(
  function FormFieldInput({
    className,
    ...props
  }: FormFieldInputProps) {
    const { fieldId, error, helperId, errorId } = useFormFieldContext();

    const ariaDescribedBy = error ? errorId : helperId;

    return (
      <Input
        id={fieldId}
        error={!!error}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy}
        className={className}
        {...props}
      />
    );
  },
  { displayName: "FormField.Input" }
);

// Helper text sub-component
interface FormFieldHelperProps {
  /** Helper text */
  children: React.ReactNode;
  /** Additional class */
  className?: string;
}

FormField.Helper = Object.assign(
  function FormFieldHelper({
    children,
    className,
  }: FormFieldHelperProps) {
    const { helperId, error } = useFormFieldContext();

    // Hide helper when error is shown
    if (error) return null;

    return (
      <p
        id={helperId}
        className={cn("font-inter text-sm text-gray-600", className)}
      >
        {children}
      </p>
    );
  },
  { displayName: "FormField.Helper" }
);

// Error message sub-component
interface FormFieldErrorProps {
  /** Additional class */
  className?: string;
}

FormField.Error = Object.assign(
  function FormFieldError({
    className,
  }: FormFieldErrorProps) {
    const { errorId, error } = useFormFieldContext();

    // Only show when error exists
    if (!error) return null;

    return (
      <div
        id={errorId}
        role="alert"
        className={cn("flex items-center gap-2 font-inter text-sm text-blue-700", className)}
      >
        <ErrorIcon className="w-4 h-4 flex-shrink-0" />
        <span>{error}</span>
      </div>
    );
  },
  { displayName: "FormField.Error" }
);

FormField.displayName = "FormField";
