"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function usePageLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  
  // Reset loading state when pathname changes
  useEffect(() => {
    if (previousPath && previousPath !== pathname) {
      // Short timeout to allow smooth transition
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
    
    setPreviousPath(pathname);
  }, [pathname, previousPath]);
  
  // Function to trigger loading state
  const startLoading = (path: string) => {
    if (pathname !== path) {
      setIsLoading(true);
      setPreviousPath(pathname);
    }
  };
  
  return {
    isLoading,
    startLoading
  };
} 