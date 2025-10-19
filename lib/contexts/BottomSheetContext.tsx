/**
 * BottomSheetContext
 *
 * Manages the bottom sheet state for mobile forms (grant finder and contact).
 * Allows any component to open/close the bottom sheets on mobile.
 */

'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface BottomSheetContextType {
  // Grant finder form bottom sheet
  isBottomSheetOpen: boolean;
  isBottomSheetClosing: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  // Contact form bottom sheet
  isContactBottomSheetOpen: boolean;
  isContactBottomSheetClosing: boolean;
  openContactBottomSheet: () => void;
  closeContactBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export function BottomSheetProvider({ children }: { children: ReactNode }) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetClosing, setIsBottomSheetClosing] = useState(false);
  const [isContactBottomSheetOpen, setIsContactBottomSheetOpen] = useState(false);
  const [isContactBottomSheetClosing, setIsContactBottomSheetClosing] = useState(false);

  const openBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsBottomSheetClosing(true);
    setTimeout(() => {
      setIsBottomSheetOpen(false);
      setIsBottomSheetClosing(false);
    }, 400); // Match animation duration
  }, []);

  const openContactBottomSheet = useCallback(() => {
    setIsContactBottomSheetOpen(true);
  }, []);

  const closeContactBottomSheet = useCallback(() => {
    setIsContactBottomSheetClosing(true);
    setTimeout(() => {
      setIsContactBottomSheetOpen(false);
      setIsContactBottomSheetClosing(false);
    }, 400); // Match animation duration
  }, []);

  return (
    <BottomSheetContext.Provider value={{
      isBottomSheetOpen,
      isBottomSheetClosing,
      openBottomSheet,
      closeBottomSheet,
      isContactBottomSheetOpen,
      isContactBottomSheetClosing,
      openContactBottomSheet,
      closeContactBottomSheet
    }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
}
