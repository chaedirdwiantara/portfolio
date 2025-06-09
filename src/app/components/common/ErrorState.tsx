"use client";

import { motion } from 'framer-motion';

interface ErrorStateProps {
  message?: string;
  title?: string;
  onRetry?: () => void;
  type?: 'error' | 'not-found' | 'network';
}

export default function ErrorState({ 
  message = 'Something went wrong', 
  title = 'Oops!',
  onRetry,
  type = 'error'
}: ErrorStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'not-found':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'network':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'not-found':
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
      case 'network':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-md mx-auto px-6"
      >
        <div className={`w-16 h-16 mx-auto mb-6 ${getIconColor()} rounded-full flex items-center justify-center`}>
          {getIcon()}
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          {title}
        </h1>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {message}
        </p>

        {onRetry && (
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
} 