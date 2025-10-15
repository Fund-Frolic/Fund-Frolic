/**
 * TextArea Molecule
 *
 * Multi-line text input with character counter.
 * Matches Input styling (border, focus, error).
 * Min height: 120px (h-30), resizable vertically.
 * Character counter: text-gray-600 text-xs text-right mt-1.5.
 * Max length indicator: Changes to blue-600 when 90% reached.
 * Accessibility: aria-live="polite" counter, aria-describedby association.
 */

'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const textareaVariants = cva(
  "w-full font-inter text-base text-gray-900 placeholder:text-gray-500 transition-colors duration-[300ms] ease-[cubic-bezier(0.33,1,0.68,1)] focus-visible:outline-none disabled:opacity-[0.5] disabled:cursor-not-allowed disabled:pointer-events-none resize-y",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20",
        error: "bg-white border border-blue-700 text-blue-900 hover:border-blue-800 focus:border-blue-700 focus:ring-2 focus:ring-blue-600/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'>,
    VariantProps<typeof textareaVariants> {
  /** Error state */
  error?: boolean;
  /** Show character counter */
  showCounter?: boolean;
  /** Auto-resize with content */
  autoResize?: boolean;
}

export const TextArea = ({
  className,
  variant,
  error = false,
  showCounter = false,
  autoResize = false,
  maxLength,
  value,
  onChange,
  id,
  disabled,
  ...props
}: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(0);
  const effectiveVariant = error ? 'error' : variant;

  // Update character count
  useEffect(() => {
    if (textareaRef.current) {
      setCharCount(textareaRef.current.value.length);
    }
  }, [value]);

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      // Reset height to auto to get correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value, autoResize]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  // Check if approaching max length (90%)
  const isApproachingLimit = maxLength && charCount >= maxLength * 0.9;
  const counterId = id ? `${id}-counter` : undefined;

  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        id={id}
        className={cn(
          textareaVariants({ variant: effectiveVariant }),
          "min-h-[120px] px-4 py-3 rounded-md",
          autoResize && "resize-none",
          className
        )}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-describedby={showCounter && counterId ? counterId : undefined}
        {...props}
      />

      {showCounter && (
        <div
          id={counterId}
          className={cn(
            "font-inter text-xs text-right mt-1.5 transition-colors duration-[150ms] ease-[cubic-bezier(0.33,1,0.68,1)]",
            isApproachingLimit ? "text-blue-600 font-medium" : "text-gray-600"
          )}
          aria-live="polite"
          aria-atomic="true"
        >
          {charCount}
          {maxLength && ` / ${maxLength}`} character{charCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

TextArea.displayName = "TextArea";
