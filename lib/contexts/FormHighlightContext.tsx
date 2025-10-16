/**
 * FormHighlightContext
 *
 * Manages the highlight state for the grant finder form.
 * Used to trigger visual emphasis when users click CTA buttons.
 */

'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface FormHighlightContextType {
  isHighlighted: boolean;
  triggerHighlight: () => void;
}

const FormHighlightContext = createContext<FormHighlightContextType | undefined>(undefined);

export function FormHighlightProvider({ children }: { children: ReactNode }) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const triggerHighlight = useCallback(() => {
    setIsHighlighted(true);
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setIsHighlighted(false);
    }, 4000);
  }, []);

  return (
    <FormHighlightContext.Provider value={{ isHighlighted, triggerHighlight }}>
      {children}
    </FormHighlightContext.Provider>
  );
}

export function useFormHighlight() {
  const context = useContext(FormHighlightContext);
  if (context === undefined) {
    throw new Error('useFormHighlight must be used within a FormHighlightProvider');
  }
  return context;
}
