"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaGlobe, FaArrowLeft, FaMobile, FaApple, FaAndroid, FaAppStore, FaGooglePlay } from 'react-icons/fa';
import PhoneFrame from './ui/PhoneFrame';
import TechBadge from './ui/TechBadge';
import { Project, projectAnimations } from '../../types/project';

interface ProjectDetailProps {
  project: Project | null;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  if (!project) return null;
  
  const isMobile = project.isMobileApp;

  return (
    <motion.div
      initial={projectAnimations.fadeInUp.initial}
      animate={projectAnimations.fadeInUp.animate}
      exit={projectAnimations.fadeInUp.exit}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 relative">
        {/* Repositioned back button */}
        <button 
          onClick={onBack} 
          className="absolute top-4 left-4 z-20 p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
          aria-label="Back to all projects"
        >
          <FaArrowLeft className="text-gray-500 dark:text-gray-400" size={16} />
        </button>
        
        {isMobile ? (
          // Mobile app detail view
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 min-h-[560px]">
            {/* Mobile app preview */}
            <div className="flex justify-center items-center py-8 bg-gray-100 dark:bg-gray-900/60 min-h-[460px]">
              <PhoneFrame 
                image={project.image}
                alt={project.title}
                platforms={project.platforms}
                priority={true}
                frameSize={{ width: '220px', height: '460px' }}
                imageSize="(max-width: 768px) 80vw, 220px"
                showPlatformBadges={false}
              />
            </div>
            
            {/* Project info */}
            <div className="p-5 md:py-10 md:pr-8 md:pl-0 flex flex-col justify-center min-h-[460px]">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300">
                  {project.title}
                </h2>
                <FaMobile className="text-blue-500 dark:text-blue-400" size={20} />
              </div>
              
              {/* Platform badges */}
              {project.platforms && (
                <div className="flex gap-2 mb-8">
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
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} technology={tech} size="md" />
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
          // Web project detail view - updated to match mobile layout
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 min-h-[560px]">
            {/* Web project preview */}
            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900/60 flex items-center justify-center min-h-[460px]">
              <div className="relative w-full h-64 md:h-[360px] lg:h-[420px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                    Featured Project
                  </div>
                )}
              </div>
            </div>
            
            {/* Project info */}
            <div className="p-6 md:py-10 md:px-8 flex flex-col justify-center min-h-[460px]">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300 mb-5">
                {project.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} technology={tech} size="md" />
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
        )}
      </div>
    </motion.div>
  );
} 