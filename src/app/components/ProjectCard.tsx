'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

type ProjectCardProps = {
  title: string;
  description: string;
  image: string | null;
  technologies: string | string[] | null;
  // Web specific
  liveUrl?: string | null;
  sourceUrl?: string | null;
  // Mobile specific
  iosUrl?: string | null;
  androidUrl?: string | null;
  // Common
  featured?: boolean;
  isMobileApp?: boolean;
};

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  sourceUrl,
  iosUrl,
  androidUrl,
  featured = false,
  isMobileApp = false,
}: ProjectCardProps) {
  // Convert technologies string to array if needed
  const techArray = Array.isArray(technologies)
    ? technologies
    : typeof technologies === 'string' 
      ? technologies.split(',').map((tech: string) => tech.trim()).filter(Boolean) 
      : [];

  // Format description to a certain length
  const formattedDescription =
    description.length > 150 ? `${description.substring(0, 150)}...` : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 h-full flex flex-col ${
        featured ? 'border-2 border-yellow-400 dark:border-yellow-600' : 'border border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Project image */}
      <div className="relative overflow-hidden w-full h-56">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">No image</span>
          </div>
        )}
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        
        {/* Platform badge */}
        {isMobileApp && (
          <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Mobile App
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{formattedDescription}</p>
        
        {/* Technologies */}
        {techArray.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {techArray.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Action buttons - conditionally rendered */}
        <div className="mt-auto pt-4 flex flex-wrap gap-3">
          {/* Web specific buttons */}
          {!isMobileApp && (
            <>
              {liveUrl && (
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Demo
                </Link>
              )}
            </>
          )}
          
          {/* Mobile app buttons */}
          {isMobileApp && (
            <>
              {iosUrl && (
                <Link
                  href={iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-black transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.586 15.586a1 1 0 01-1.414-1.414L10.586 12 9 10.414a1 1 0 011.414-1.414L12 10.586l1.586-1.586a1 1 0 111.414 1.414L13.414 12l1.586 1.586a1 1 0 01-1.414 1.414L12 13.414l-1.586 1.586z" />
                  </svg>
                  App Store
                </Link>
              )}
              
              {androidUrl && (
                <Link
                  href={androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.2 16.839a1.193 1.193 0 01-1.2-1.178V8.339c0-.65.537-1.178 1.2-1.178.662 0 1.2.528 1.2 1.178v7.322c0 .65-.538 1.178-1.2 1.178zm9.6 0a1.193 1.193 0 01-1.2-1.178V8.339c0-.65.537-1.178 1.2-1.178.662 0 1.2.528 1.2 1.178v7.322c0 .65-.538 1.178-1.2 1.178zM4.8 7.161v9.678c0 .65.538 1.178 1.2 1.178h1.2v2.744c0 .65.538 1.178 1.2 1.178s1.2-.528 1.2-1.178v-2.744h4.8v2.744c0 .65.537 1.178 1.2 1.178.662 0 1.2-.528 1.2-1.178v-2.744h1.2c.662 0 1.2-.528 1.2-1.178V7.161H4.8z" />
                    <path d="M2.4 7.161c-.662 0-1.2.528-1.2 1.178v4.322c0 .65.538 1.178 1.2 1.178.663 0 1.2-.528 1.2-1.178V8.339c0-.65-.537-1.178-1.2-1.178zm19.2 0c-.663 0-1.2.528-1.2 1.178v4.322c0 .65.537 1.178 1.2 1.178.662 0 1.2-.528 1.2-1.178V8.339c0-.65-.538-1.178-1.2-1.178zM16.788 2.448l.923-1.598a.593.593 0 00-.219-.81.596.596 0 00-.816.217l-.936 1.62a7.15 7.15 0 00-3.48 0l-.936-1.62a.596.596 0 00-.816-.217.593.593 0 00-.219.81l.923 1.598C9.678 3.238 8.4 4.815 8.4 6.661c0 .074.006.147.007.221h11.187c.001-.074.007-.147.007-.221 0-1.846-1.278-3.423-2.813-4.213z" />
                  </svg>
                  Play Store
                </Link>
              )}
            </>
          )}
          
          {/* Source code button - common for both types */}
          {sourceUrl && (
            <Link
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white text-sm font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Source Code
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
} 