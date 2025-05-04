"use client";

import { createContext, useContext, ReactNode } from 'react';
import usePageLoading from '../lib/hooks/usePageLoading';

// Create context for loading state
type LoadingContextType = {
  isLoading: boolean;
  startLoading: (path: string) => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

// Hook to use the loading context
export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === null) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Provider component
export default function LoadingProvider({ children }: { children: ReactNode }) {
  const loadingState = usePageLoading();
  
  return (
    <LoadingContext.Provider value={loadingState}>
      {children}
    </LoadingContext.Provider>
  );
} 