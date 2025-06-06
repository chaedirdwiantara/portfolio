"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaMobile } from 'react-icons/fa';
import PhoneFrame from './ui/PhoneFrame';
import TechBadge from './ui/TechBadge';
import { Project, projectAnimations } from '../../types/project';

interface ProjectGridItemProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectGridItem({ project, index, onClick }: ProjectGridItemProps) {
  const isMobile = project.isMobileApp;
  const isStringUrl = typeof project.image === 'string';
  
  return (
    <motion.div
      key={project.id}
      initial={projectAnimations.fadeInUp.initial}
      animate={projectAnimations.fadeInUp.animate}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-gray-700 flex flex-col"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {/* Project Image */}
      <div className={`relative w-full h-56 overflow-hidden ${isMobile ? 'py-2 bg-gray-100 dark:bg-gray-700/50' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10" />
        
        {isMobile ? (
          // Mobile app with device frame
          <PhoneFrame 
            image={project.image}
            alt={project.title}
            platforms={project.platforms}
            priority={index < 3}
          />
        ) : (
          // Standard web project image
          <div className="relative w-full h-full">
            {isStringUrl ? (
              <img
                src={project.image as string}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            )}
          </div>
        )}
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Featured
          </div>
        )}
      </div>
      
      {/* Project Content */}
      <div className="p-5 flex flex-col flex-grow min-h-[200px]">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          {isMobile && <FaMobile className="text-blue-500 dark:text-blue-400" size={14} />}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} technology={tech} />
          ))}
        </div>
        
        {/* This will push to the bottom because of flex-grow above */}
        <div className="text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:underline flex items-center gap-1 mt-auto pt-2">
          <span>Click to view details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
} 