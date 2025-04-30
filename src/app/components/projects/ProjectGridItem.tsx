"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCode } from 'react-icons/fa';
import { StaticImageData } from 'next/image';

interface ProjectGridItemProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    technologies: string[];
    featured?: boolean;
  };
  index: number;
  onClick: () => void;
}

export default function ProjectGridItem({ project, index, onClick }: ProjectGridItemProps) {
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
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
        
        {/* Image is now always displayed */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3} // Load first few images with priority
        />
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Featured
          </div>
        )}
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
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