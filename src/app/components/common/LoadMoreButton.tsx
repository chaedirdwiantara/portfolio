"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function LoadMoreButton({
  onClick,
  isLoading = false,
  className = '',
  children = 'Load More'
}: LoadMoreButtonProps) {
  return (
    <div className="mt-12 text-center">
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
        disabled={isLoading}
        className={`px-8 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg text-base font-medium flex items-center gap-2 mx-auto ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        } ${className}`}
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    </div>
  );
}
