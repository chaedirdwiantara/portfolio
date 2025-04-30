"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaGlobe, FaArrowLeft, FaCode, FaMobile, FaApple, FaAndroid, FaAppStore, FaGooglePlay } from 'react-icons/fa';
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
    isMobileApp?: boolean;
    appStoreUrl?: string;
    playStoreUrl?: string;
    platforms?: ('ios' | 'android')[];
  } | null;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  if (!project) return null;
  
  const isMobile = project.isMobileApp;

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
        {isMobile ? (
          // Mobile app detail view
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Mobile app preview */}
            <div className="flex justify-center items-center py-16 bg-gray-100 dark:bg-gray-900/60">
              <div className="relative h-[500px]" style={{ width: '240px' }}>
                {/* Phone frame */}
                <div className="absolute inset-0 rounded-[36px] border-[12px] border-gray-800 dark:border-gray-600 overflow-hidden shadow-xl">
                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10"></div>
                  
                  {/* App screenshot */}
                  <div className="absolute inset-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover rounded-[24px]"
                      sizes="(max-width: 768px) 80vw, 240px"
                      priority
                    />
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white rounded-full z-10"></div>
                </div>
              </div>
            </div>
            
            {/* Project info */}
            <div className="p-8 md:py-16 md:pr-16 md:pl-0">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300">
                  {project.title}
                </h2>
                <FaMobile className="text-blue-500 dark:text-blue-400" size={20} />
              </div>
              
              {/* Platform badges */}
              {project.platforms && (
                <div className="flex gap-2 mb-6">
                  {project.platforms.includes('ios') && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-black text-white rounded-full">
                      <FaApple size={12} />
                      <span>iOS</span>
                    </span>
                  )}
                  {project.platforms.includes('android') && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-green-700 text-white rounded-full">
                      <FaAndroid size={12} />
                      <span>Android</span>
                    </span>
                  )}
                </div>
              )}
              
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
                {project.appStoreUrl && (
                  <a 
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-black hover:to-gray-800 text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    <FaAppStore size={16} />
                    <span>App Store</span>
                  </a>
                )}
                
                {project.playStoreUrl && (
                  <a 
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    <FaGooglePlay size={16} />
                    <span>Play Store</span>
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
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Web project detail view - original layout
          <>
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
          </>
        )}
      </div>
    </motion.div>
  );
} 