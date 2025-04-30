"use client";

import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

interface ProjectSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: string | null;
  onFilterChange: (filter: string | null) => void;
  technologies: string[];
}

export default function ProjectSearch({ 
  searchQuery, 
  onSearchChange, 
  filter, 
  onFilterChange, 
  technologies 
}: ProjectSearchProps) {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      {/* Search input - centered and proper width */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            <FaSearch size={16} />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
          />
        </div>
      </div>
      
      {/* Filter buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <button 
          onClick={() => onFilterChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            filter === null 
              ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-md' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        
        {technologies.map((tech) => (
          <button 
            key={tech}
            onClick={() => onFilterChange(tech)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === tech 
                ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-md' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {tech}
          </button>
        ))}
      </motion.div>
    </div>
  );
} 