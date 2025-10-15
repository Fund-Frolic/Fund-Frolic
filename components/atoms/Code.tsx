/**
 * Code Component
 *
 * Inline and block code using design system.
 * Font: JetBrains Mono (monospace), Colors: blue-700 inline, gray-900 block.
 * 8-point grid spacing, border radius per design system tokens.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const codeVariants = cva(
  "font-jetbrains-mono",
  {
    variants: {
      inline: {
        true: "px-2 py-1 text-sm bg-gray-100 text-blue-700 rounded-sm",
        false: "block p-4 text-sm bg-gray-900 text-gray-50 rounded-md overflow-x-auto",
      },
    },
    defaultVariants: {
      inline: true,
    },
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  /** Programming language (for future syntax highlighting) */
  language?: string;
}

export const Code = ({
  inline = true,
  language,
  className,
  children,
  ...props
}: CodeProps) => {
  if (inline) {
    return (
      <code
        className={cn(codeVariants({ inline: true }), className)}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <pre className={cn(codeVariants({ inline: false }), className)} {...props}>
      <code>{children}</code>
    </pre>
  );
};

Code.displayName = "Code";
