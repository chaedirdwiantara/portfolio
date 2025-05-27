import { StaticImageData } from 'next/image';

/**
 * Represents a project, either web or mobile app
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  image: StaticImageData | string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  isMobileApp?: boolean;
  appStoreUrl?: string;
  playStoreUrl?: string;
  platforms?: ('ios' | 'android')[];
}

/**
 * Common animation and transition settings
 */
export const projectAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  }
}; 