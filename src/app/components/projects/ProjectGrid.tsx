"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '../../data/portfolio-data';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Get unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => project.technologies)
    )
  );
  
  // Filter projects based on selected technology
  const filteredProjects = filter 
    ? projects.filter(project => project.technologies.includes(filter))
    : projects;

  return (
    <>
      {/* Filter buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        <button 
          onClick={() => setFilter(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            filter === null 
              ? 'bg-blue-600 text-white dark:bg-blue-500' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        
        {allTechnologies.map((tech) => (
          <button 
            key={tech}
            onClick={() => setFilter(tech)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === tech 
                ? 'bg-blue-600 text-white dark:bg-blue-500' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {tech}
          </button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
      
      {/* Show more button */}
      <div className="mt-16 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 font-medium"
        >
          View All Projects
        </Link>
      </div>
    </>
  );
} 