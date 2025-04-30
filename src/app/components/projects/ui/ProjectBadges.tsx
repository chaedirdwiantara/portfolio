import React from 'react';
import { FaApple, FaAndroid } from 'react-icons/fa';
import TechBadge from './TechBadge';

// Container for tech badges
export const TechBadges = ({ technologies }: { technologies: string[] }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {technologies.map((tech) => (
      <TechBadge key={tech} technology={tech} size="md" />
    ))}
  </div>
);

// Platform badges for mobile apps
export const PlatformBadges = ({ platforms }: { platforms?: string[] }) => {
  if (!platforms) return null;
  
  return (
    <div className="flex gap-2 mb-6">
      {platforms.includes('ios') && (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-black text-white rounded-full">
          <FaApple size={12} />
          <span>iOS</span>
        </span>
      )}
      {platforms.includes('android') && (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-green-700 text-white rounded-full">
          <FaAndroid size={12} />
          <span>Android</span>
        </span>
      )}
    </div>
  );
}; 