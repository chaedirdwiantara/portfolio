"use client";

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-8 h-14 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center items-start p-2">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"
          />
        </div>
        <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">Scroll</p>
      </motion.div>
    </motion.div>
  );
} 