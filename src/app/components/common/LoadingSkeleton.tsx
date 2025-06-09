"use client";

import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  type?: 'card' | 'profile' | 'list' | 'custom';
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function LoadingSkeleton({ 
  type = 'card', 
  count = 1, 
  className = '',
  children 
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const renderCardSkeleton = (index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700"
    >
      <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-6 w-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );

  const renderProfileSkeleton = (index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 min-h-[85vh] flex flex-col">
          <div className="lg:flex flex-1">
            {/* Image skeleton */}
            <div className="lg:w-1/2 xl:w-2/5">
              <div className="h-80 lg:h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
            
            {/* Content skeleton */}
            <div className="lg:w-1/2 xl:w-3/5 flex items-center">
              <div className="w-full p-8 lg:p-12 xl:p-16 pt-12 lg:pt-16 xl:pt-20">
                <div className="max-w-2xl mx-auto lg:mx-0 space-y-6">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/2"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-8">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer skeleton */}
          <div className="px-8 py-4 lg:px-12 xl:px-16 bg-slate-50/90 dark:bg-slate-700/50 border-t border-slate-200/50 dark:border-slate-600/50">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4 mt-2 sm:mt-0"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderListSkeleton = (index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-start mb-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-1 mt-3">
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse" />
              ))}
              <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ml-2"></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  if (children) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={className}>
      {type === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletons.map(renderCardSkeleton)}
        </div>
      )}
      
      {type === 'profile' && skeletons.map(renderProfileSkeleton)}
      
      {type === 'list' && (
        <div className="space-y-12">
          {skeletons.map(renderListSkeleton)}
        </div>
      )}
    </div>
  );
}

// Specific skeleton components for easy use
export const ProjectsSkeleton = () => <LoadingSkeleton type="card" count={6} />;
export const AboutSkeleton = () => <LoadingSkeleton type="profile" count={1} />;
export const SkillsSkeleton = () => <LoadingSkeleton type="list" count={3} />; 