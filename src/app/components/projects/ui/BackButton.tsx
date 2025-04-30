import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => (
  <button 
    onClick={onClick} 
    className="absolute top-4 left-4 z-20 p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
    aria-label="Back to all projects"
  >
    <FaArrowLeft className="text-gray-500 dark:text-gray-400" size={16} />
  </button>
);

export default BackButton; 