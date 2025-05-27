"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createBrowserClient } from '../../lib/supabase/client';
import ProjectDetail from './ProjectDetail';
import ProjectSearch from './ProjectSearch';
import ProjectGridItem from './ProjectGridItem';
import ProjectSkeletonLoader from './ProjectSkeletonLoader';
import LoadMoreButton from '../common/LoadMoreButton';
import { Project } from '../../types/project';
import { usePathname } from 'next/navigation';
import { filterProjects, getUniqueTechnologies } from '../../lib/utils/projectUtils';

// Number of projects to load per batch
const PROJECTS_PER_PAGE = 6;

// Type for projects from Supabase
type SupabaseProject = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  image_url: string | null;
  images_urls: string[] | null;
  technologies: string[] | null;
  live_url: string | null;
  source_url: string | null;
  featured: boolean;
  is_mobile_app: boolean;
  ios_url: string | null;
  android_url: string | null;
};

// Convert Supabase project to app Project type
const convertSupabaseProject = (project: SupabaseProject): Project => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image_url || '/images/placeholder-project.jpg',
    images_urls: project.images_urls || [],
    technologies: project.technologies || [],
    liveUrl: project.live_url || undefined,
    sourceUrl: project.source_url || undefined,
    featured: project.featured,
    isMobileApp: project.is_mobile_app,
    appStoreUrl: project.ios_url || undefined,
    playStoreUrl: project.android_url || undefined,
    platforms: getProjectPlatforms(project.ios_url, project.android_url),
  };
};

// Helper to determine platforms from URLs
const getProjectPlatforms = (iosUrl: string | null, androidUrl: string | null): ('ios' | 'android')[] => {
  const platforms: ('ios' | 'android')[] = [];
  if (iosUrl) platforms.push('ios');
  if (androidUrl) platforms.push('android');
  return platforms;
};

export default function ProjectsPageContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pathname = usePathname();
  
  // Get unique technologies from all projects
  const allTechnologies = getUniqueTechnologies(projects);

  // Effect to fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const supabase = createBrowserClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false })
          .range(0, PROJECTS_PER_PAGE - 1);
          
        if (error) {
          console.error('Error fetching projects:', error);
          return;
        }
        
        // Convert Supabase projects to app Project type
        const convertedProjects = data.map(convertSupabaseProject);
        setProjects(convertedProjects);
        
        // Check if there are more projects to load
        setHasMore(data.length === PROJECTS_PER_PAGE);
        setPage(1);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [pathname]);

  // Filter projects based on selected technology and search query
  const filteredProjects = filterProjects(projects, filter, searchQuery);

  // Handle project selection for detailed view
  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
    // Scroll to top to show selected project
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle loading more projects
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    try {
      const supabase = createBrowserClient();
      const from = page * PROJECTS_PER_PAGE;
      const to = from + PROJECTS_PER_PAGE - 1;
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) {
        console.error('Error fetching more projects:', error);
        return;
      }
      
      if (data.length > 0) {
        // Convert and append new projects
        const newProjects = data.map(convertSupabaseProject);
        setProjects(prev => [...prev, ...newProjects]);
        
        // Update pagination state
        setPage(prev => prev + 1);
        setHasMore(data.length === PROJECTS_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more projects:', err);
    } finally {
      setIsLoadingMore(false);
    }
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

            {/* Show skeleton loader while loading */}
            {isLoading ? (
              <ProjectSkeletonLoader />
            ) : (
              <>
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
                
                {/* Load more button */}
                {hasMore && filteredProjects.length > 0 && (
                  <LoadMoreButton 
                    onClick={handleLoadMore} 
                    isLoading={isLoadingMore}
                  >
                    Load More Projects
                  </LoadMoreButton>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
} 