import React from 'react';
import Image from 'next/image';
import { FaGlobe, FaGithub } from 'react-icons/fa';
import { Project } from '../../types/project';
import { TechBadges } from './ui/ProjectBadges';
import ActionButton from './ui/ActionButton';
import ImageSlider from './ui/ImageSlider';
import ImageModal from './ui/ImageModal';

interface WebProjectViewProps {
  project: Project;
}

const WebProjectView = ({ project }: WebProjectViewProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  const isStringUrl = typeof project.image === 'string';
  const hasMultipleImages = project.images_urls && project.images_urls.length > 0;
  
  // Prepare images array for the slider
  const sliderImages = hasMultipleImages
    ? project.images_urls || []
    : [project.image];

  const handleImageClick = (index: number = 0) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {/* Web project preview */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900/60 md:col-span-2 rounded-xl shadow-md">
        {hasMultipleImages ? (
          <div onClick={() => handleImageClick(0)} className="cursor-pointer">
            <ImageSlider 
              images={sliderImages} 
              alt={project.title}
              priority={true}
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
        ) : (
          <div className="w-full h-full overflow-hidden cursor-pointer" onClick={() => handleImageClick(0)}>
            {isStringUrl ? (
              <img
                src={project.image as string}
                alt={project.title}
                className="w-full h-full object-contain block"
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            )}
          </div>
        )}
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
            Featured Project
          </div>
        )}
      </div>
      
      {/* Project info */}
      <div className="group p-6 md:py-8 md:px-8 flex flex-col md:col-span-1 bg-white/50 dark:bg-gray-900/30 rounded-xl shadow-sm">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300 mb-5">
            {project.title}
          </h2>
          
          <div className="relative mb-6">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-h-[12.25rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
              {project.description}
            </p>
            {/* Scroll indicator gradient */}
            <div className="absolute bottom-0 left-0 right-2 h-4 bg-gradient-to-t from-white/80 dark:from-gray-900/80 to-transparent pointer-events-none opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
          </div>
          
          <TechBadges technologies={project.technologies} />
        </div>
        
        <div className="flex flex-wrap gap-4 mt-auto">
          {project.liveUrl && (
            <ActionButton 
              href={project.liveUrl}
              icon={<FaGlobe size={16} />}
              label="Live Demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            />
          )}
          
          {project.sourceUrl && (
            <ActionButton 
              href={project.sourceUrl}
              icon={<FaGithub size={16} />}
              label="Source Code"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium"
            />
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={sliderImages}
        currentIndex={currentImageIndex}
        alt={project.title}
      />
    </div>
  );
};

export default WebProjectView; 