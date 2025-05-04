"use client";

import { useState, useEffect } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  initialItemsPerPage: number;
  dependencies?: any[];
}

interface UsePaginationResult<T> {
  visibleItems: T[];
  loadMore: () => void;
  hasMore: boolean;
  resetPagination: () => void;
}

/**
 * Custom hook for implementing pagination with a "load more" pattern
 * @param items The array of items to paginate
 * @param initialItemsPerPage Number of items to show initially
 * @param dependencies Optional array of dependencies to reset pagination
 */
export default function usePagination<T>({
  items,
  initialItemsPerPage,
  dependencies = []
}: UsePaginationProps<T>): UsePaginationResult<T> {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  
  // Reset pagination when dependencies change
  useEffect(() => {
    setItemsPerPage(initialItemsPerPage);
  }, dependencies);
  
  // Get only the items to be displayed based on current pagination
  const visibleItems = items.slice(0, itemsPerPage);
  
  // Check if there are more items to load
  const hasMore = itemsPerPage < items.length;
  
  // Function to load more items
  const loadMore = () => {
    setItemsPerPage(prev => prev + initialItemsPerPage);
  };
  
  // Function to reset pagination to initial state
  const resetPagination = () => {
    setItemsPerPage(initialItemsPerPage);
  };
  
  return {
    visibleItems,
    loadMore,
    hasMore,
    resetPagination
  };
}
