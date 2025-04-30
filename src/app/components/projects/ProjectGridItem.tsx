"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCode, FaMobile, FaApple, FaAndroid } from 'react-icons/fa';
import { StaticImageData } from 'next/image';

interface ProjectGridItemProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    technologies: string[];
    featured?: boolean;
    isMobileApp?: boolean;
    platforms?: ('ios' | 'android')[];
  };
  index: number;
  onClick: () => void;
}

export default function ProjectGridItem({ project, index, onClick }: ProjectGridItemProps) {
  const isMobile = project.isMobileApp;
  
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-gray-700"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {/* Project Image */}
      <div className={`relative w-full ${isMobile ? 'h-64' : 'h-64'} overflow-hidden ${isMobile ? 'py-2 bg-gray-100 dark:bg-gray-700/50' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
        
        {isMobile ? (
          // Mobile app with device frame
          <div className="relative h-full mx-auto" style={{ width: '45%' }}>
            {/* Phone frame */}
            <div className="absolute inset-0 rounded-[24px] border-[8px] border-gray-800 dark:border-gray-600 z-20 overflow-hidden shadow-lg">
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-black z-30"></div>
              
              {/* App screenshot */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-[16px]"
                  sizes="200px"
                  priority={index < 3}
                />
              </div>
              
              {/* Home indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white rounded-full z-30"></div>
            </div>
            
            {/* Platform indicators */}
            {project.platforms && (
              <div className="absolute top-2 right-2 z-30 flex gap-1">
                {project.platforms.includes('ios') && (
                  <div className="bg-black/80 p-1 rounded-full">
                    <FaApple className="text-white" size={12} />
                  </div>
                )}
                {project.platforms.includes('android') && (
                  <div className="bg-black/80 p-1 rounded-full">
                    <FaAndroid className="text-white" size={12} />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // Standard web project image
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
        )}
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Featured
          </div>
        )}
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          {isMobile && <FaMobile className="text-blue-500 dark:text-blue-400" size={14} />}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:underline flex items-center gap-1">
          <span>Click to view details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
} 