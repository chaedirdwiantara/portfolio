"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { useLoading } from '../LoadingProvider';

export default function CTAButtons() {
  const { startLoading } = useLoading();
  
  const handleProjectsClick = () => {
    startLoading('/projects');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-5 pt-6"
    >
      <Link 
        href="/projects"
        prefetch={true}
        onClick={handleProjectsClick}
        className="group relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-xl text-base font-medium"
      >
        <span className="relative z-10">View My Work</span>
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 inline-block"
        >
          <FaArrowRight size={14} />
        </motion.span>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <Link 
        href="/contact"
        className="relative overflow-hidden flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 text-base font-medium group"
      >
        <span className="relative z-10 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">Contact Me</span>
        <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
      </Link>
    </motion.div>
  );
} 