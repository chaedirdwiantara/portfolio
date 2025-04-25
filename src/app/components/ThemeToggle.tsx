"use client";

import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 360 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute"
      >
        {theme === 'dark' ? (
          <MoonIcon className="h-5 w-5 text-gray-300" />
        ) : (
          <SunIcon className="h-5 w-5 text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
} 