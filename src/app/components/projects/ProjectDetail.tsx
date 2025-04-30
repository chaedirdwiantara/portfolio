"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaGlobe, FaArrowLeft, FaCode } from 'react-icons/fa';
import { StaticImageData } from 'next/image';

interface ProjectDetailProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    technologies: string[];
    liveUrl?: string;
    sourceUrl?: string;
    featured?: boolean;
  } | null;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="mb-16"
    >
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors duration-200"
      >
        <FaArrowLeft size={14} />
        <span>Back to all projects</span>
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />
          
          {/* Project image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            priority
          />
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
              Featured Project
            </div>
          )}
        </div>
        
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300 mb-4">
            {project.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-10">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                <FaGlobe size={16} />
                <span>View Live Demo</span>
              </a>
            )}
            
            {project.sourceUrl && (
              <a 
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium"
              >
                <FaGithub size={16} />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 