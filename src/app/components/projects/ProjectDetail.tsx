"use client";

import { motion } from 'framer-motion';
import { Project, projectAnimations } from '../../types/project';
import BackButton from './ui/BackButton';
import MobileProjectView from './MobileProjectView';
import WebProjectView from './WebProjectView';

interface ProjectDetailProps {
  project: Project | null;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  if (!project) return null;
  
  return (
    <motion.div
      initial={projectAnimations.fadeInUp.initial}
      animate={projectAnimations.fadeInUp.animate}
      exit={projectAnimations.fadeInUp.exit}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 relative">
        <BackButton onClick={onBack} />
        
        {project.isMobileApp ? (
          <MobileProjectView project={project} />
        ) : (
          <WebProjectView project={project} />
        )}
      </div>
    </motion.div>
  );
} 