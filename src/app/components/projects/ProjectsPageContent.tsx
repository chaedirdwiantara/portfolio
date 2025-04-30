"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../data/portfolio-data';
import ProjectDetail from './ProjectDetail';
import ProjectSearch from './ProjectSearch';
import ProjectGridItem from './ProjectGridItem';
import { Project } from '../../types/project';

export default function ProjectsPageContent() {
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  // Get unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => project.technologies)
    )
  );

  // Filter projects based on selected technology and search query
  const filteredProjects = projects.filter(project => {
    // Filter by technology if a filter is selected
    const matchesTech = filter ? project.technologies.includes(filter) : true;
    
    // Filter by search query
    const matchesSearch = searchQuery 
      ? project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesTech && matchesSearch;
  });

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle project selection for detailed view
  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
    // Scroll to top to show selected project
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get selected project data
  const selectedProjectData: Project | null = selectedProject 
    ? projects.find(p => p.id === selectedProject) || null
    : null;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-blue-50/40 via-white to-gray-50/70 dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-950 relative">
      {/* Subtle background accent elements for visual interest */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/3 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* If a project is selected, show detailed view */}
        <AnimatePresence>
          {selectedProjectData && (
            <ProjectDetail 
              project={selectedProjectData} 
              onBack={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>

        {!selectedProject && (
          <>
            {/* Search and filter controls */}
            <ProjectSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filter={filter}
              onFilterChange={setFilter}
              technologies={allTechnologies}
            />

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ProjectGridItem
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => handleProjectClick(project.id)}
                  />
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    No projects found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setFilter(null);
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 