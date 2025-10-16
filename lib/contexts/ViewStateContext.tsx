/**
 * ViewStateContext
 *
 * Shared context for managing the grant finder application view state.
 * Allows page-level control of which sections are visible.
 */

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GrantResult } from '@/types/grants';

export type ViewState = 'form' | 'loading' | 'results' | 'contact' | 'success';

interface ViewStateContextType {
  viewState: ViewState;
  setViewState: (state: ViewState) => void;
  grantResults: GrantResult | null;
  setGrantResults: (results: GrantResult | null) => void;
}

const ViewStateContext = createContext<ViewStateContextType | undefined>(undefined);

export function ViewStateProvider({ children }: { children: ReactNode }) {
  const [viewState, setViewState] = useState<ViewState>('form');
  const [grantResults, setGrantResults] = useState<GrantResult | null>(null);

  return (
    <ViewStateContext.Provider
      value={{
        viewState,
        setViewState,
        grantResults,
        setGrantResults,
      }}
    >
      {children}
    </ViewStateContext.Provider>
  );
}

export function useViewState() {
  const context = useContext(ViewStateContext);
  if (context === undefined) {
    throw new Error('useViewState must be used within a ViewStateProvider');
  }
  return context;
}
