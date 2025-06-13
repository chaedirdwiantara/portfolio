import React from 'react';
import { FaMobile, FaAppStore, FaGooglePlay, FaGithub } from 'react-icons/fa';
import PhoneFrame from './ui/PhoneFrame';
import { Project } from '../../types/project';
import { TechBadges, PlatformBadges } from './ui/ProjectBadges';
import ActionButton from './ui/ActionButton';
import ImageModal from './ui/ImageModal';

interface MobileProjectViewProps {
  project: Project;
}

const MobileProjectView = ({ project }: MobileProjectViewProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  const hasMultipleImages = project.images_urls && project.images_urls.length > 0;
  
  // Prepare images array for the modal
  const modalImages = hasMultipleImages
    ? project.images_urls || []
    : [project.image];

  const handleImageClick = (index: number = 0) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 min-h-[560px]">
      {/* Mobile app preview */}
      <div className="flex justify-center items-center py-8 bg-gray-100 dark:bg-gray-900/60 min-h-[460px]">
        <div onClick={() => handleImageClick(0)} className="cursor-pointer">
          <PhoneFrame 
            image={project.image}
            images={hasMultipleImages ? project.images_urls : undefined}
            alt={project.title}
            platforms={project.platforms}
            priority={true}
            frameSize={{ width: '220px', height: '460px' }}
            imageSize="(max-width: 768px) 80vw, 220px"
            showPlatformBadges={false}
          />
        </div>
      </div>
      
      {/* Project info */}
      <div className="p-5 md:py-10 md:pr-8 md:pl-0 flex flex-col h-full min-h-[460px]">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-800 dark:from-white dark:to-blue-300">
              {project.title}
            </h2>
            <FaMobile className="text-blue-500 dark:text-blue-400" size={20} />
          </div>
          
          <PlatformBadges platforms={project.platforms} />
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            {project.description}
          </p>
          
          <TechBadges technologies={project.technologies} />
        </div>
        
        <div className="flex flex-wrap gap-4 mt-auto">
          {project.appStoreUrl && (
            <ActionButton 
              href={project.appStoreUrl}
              icon={<FaAppStore size={16} />}
              label="App Store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-black hover:to-gray-800 text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            />
          )}
          
          {project.playStoreUrl && (
            <ActionButton 
              href={project.playStoreUrl}
              icon={<FaGooglePlay size={16} />}
              label="Play Store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
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
        images={modalImages}
        currentIndex={currentImageIndex}
        alt={project.title}
      />
    </div>
  );
};

export default MobileProjectView; 