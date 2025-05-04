"use client";

import { motion } from 'framer-motion';

export default function ProjectSkeletonLoader() {
  // Create an array of 6 items to represent skeleton cards
  const skeletons = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skeletons.map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700"
        >
          {/* Skeleton image */}
          <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          
          {/* Skeleton content */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-3/4"></div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
            </div>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 