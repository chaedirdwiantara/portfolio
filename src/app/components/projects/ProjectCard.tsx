"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaGlobe, FaMobile, FaAppStore, FaGooglePlay } from 'react-icons/fa';
import PhoneFrame from './ui/PhoneFrame';
import TechBadge from './ui/TechBadge';
import { Project, projectAnimations } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isMobile = project.isMobileApp;
  
  return (
    <motion.div
      initial={projectAnimations.fadeInUp.initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
    >
      {/* Project Image */}
      <div className={`relative w-full ${isMobile ? 'h-64' : 'h-64'} overflow-hidden ${isMobile ? 'py-2 bg-gray-100 dark:bg-gray-700/50' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        
        {isMobile ? (
          // Mobile app with device frame
          <PhoneFrame 
            image={project.image}
            alt={project.title}
            platforms={project.platforms}
          />
        ) : (
          // Standard web project image
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
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
            <TechBadge key={tech} technology={tech} bordered={false} />
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {isMobile ? (
            // Mobile app action buttons
            <>
              {project.appStoreUrl && (
                <a 
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <FaAppStore size={14} />
                  <span>App Store</span>
                </a>
              )}
              
              {project.playStoreUrl && (
                <a 
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <FaGooglePlay size={14} />
                  <span>Play Store</span>
                </a>
              )}
            </>
          ) : (
            // Web project action buttons
            project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <FaGlobe size={14} />
                <span>Live Demo</span>
              </a>
            )
          )}
          
          {/* Source code link for both types */}
          {project.sourceUrl && (
            <a 
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <FaGithub size={14} />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
} 