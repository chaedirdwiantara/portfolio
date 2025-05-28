"use client";

import { motion } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useRef, useState, useCallback } from 'react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const scrollSpeedRef = useRef<number>(0.5); // pixels per frame
  const scrollDirectionRef = useRef<1 | -1>(1); // 1 for right, -1 for left
  
  // Check scroll position to show/hide indicators
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftScroll(scrollLeft > 10);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    
    // Change direction if we hit an edge
    if (scrollLeft <= 0) {
      scrollDirectionRef.current = 1; // Change to scroll right
    } else if (scrollLeft >= scrollWidth - clientWidth - 2) {
      scrollDirectionRef.current = -1; // Change to scroll left
    }
  };

  // Handle scroll button clicks
  const scrollHandler = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
    scrollContainerRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };
  
  // Auto scroll animation
  const autoScroll = useCallback(() => {
    if (!scrollContainerRef.current || isPaused) return;
    
    const now = performance.now();
    const elapsed = now - lastScrollTimeRef.current;
    
    if (elapsed > 16) { // Aim for ~60fps
      scrollContainerRef.current.scrollLeft += scrollSpeedRef.current * scrollDirectionRef.current;
      lastScrollTimeRef.current = now;
      
      // Check if we need to change direction
      handleScroll();
    }
    
    animationRef.current = requestAnimationFrame(autoScroll);
  }, [isPaused]);
  
  // Start or stop auto scrolling
  useEffect(() => {
    // Start auto scrolling
    if (!isPaused) {
      lastScrollTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(autoScroll);
    }
    
    // Cleanup animation
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, autoScroll]);

  // Check initial scroll state on mount and set up observers
  useEffect(() => {
    handleScroll();
    
    // Resize observer to check if scroll indicators are needed
    const observer = new ResizeObserver(() => {
      handleScroll();
    });
    
    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto mb-6">
      {/* Search input - centered and proper width */}
      <div className="flex justify-center mb-5">
        <div className="w-full max-w-md relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 z-10">
            <FaSearch size={16} />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
            style={{ paddingLeft: '3rem' }}
          />
        </div>
      </div>
      
      {/* Horizontal scrolling filter container with indicators */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left scroll indicator */}
        {showLeftScroll && (
          <button 
            onClick={() => scrollHandler('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-gradient-to-r from-blue-50/90 via-blue-50/70 to-blue-50/0 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-900/0 flex items-center justify-start pl-1 rounded-full"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-gray-500 dark:text-gray-400" size={14} />
          </button>
        )}
        
        {/* Filter buttons in scrollable container */}
        <motion.div 
          ref={scrollContainerRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onScroll={handleScroll}
          className="flex gap-3 py-2 px-4 overflow-x-auto hide-scrollbar relative"
        >
          <button 
            onClick={() => onFilterChange(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              filter === null 
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700'
            }`}
          >
            All
          </button>
          
          {technologies.map((tech) => (
            <button 
              key={tech}
              onClick={() => onFilterChange(filter === tech ? null : tech)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                filter === tech 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700'
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>
        
        {/* Right scroll indicator */}
        {showRightScroll && (
          <button 
            onClick={() => scrollHandler('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-gradient-to-l from-blue-50/90 via-blue-50/70 to-blue-50/0 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-900/0 flex items-center justify-end pr-1 rounded-full"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-gray-500 dark:text-gray-400" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

