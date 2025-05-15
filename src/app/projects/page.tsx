import { Metadata } from 'next';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Projects | Chaedir - Full Stack Developer',
  description: 'Explore my portfolio of web development projects including React, Next.js, and other modern technologies.',
};

'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/app/lib/supabase/client';
import ProjectCard from '@/app/components/ProjectCard';
import LoadMoreButton from '@/app/components/common/LoadMoreButton';

type Project = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string | null;
  // Web specific
  live_url: string | null;
  source_url: string | null;
  // Mobile specific
  ios_url: string | null;
  android_url: string | null;
  // Common
  featured: boolean;
  is_mobile_app: boolean;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile'>('all');
  const pageSize = 6;

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async (pageNumber: number = 1, append: boolean = false) => {
    const isInitialLoad = pageNumber === 1 && !append;
    
    if (isInitialLoad) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const supabase = createBrowserClient();
      
      // Calculate pagination
      const from = (pageNumber - 1) * pageSize;
      const to = from + pageSize - 1;
      
      // Build query
      let query = supabase
        .from('projects')
        .select('*', { count: 'exact' })
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      // Apply filter if needed
      if (filter === 'web') {
        query = query.eq('is_mobile_app', false);
      } else if (filter === 'mobile') {
        query = query.eq('is_mobile_app', true);
      }
      
      // Apply pagination
      query = query.range(from, to);
      
      const { data, error, count } = await query;
      
      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }
      
      // Update projects state
      if (append && data) {
        setProjects(prev => [...prev, ...data]);
      } else if (data) {
        setProjects(data);
      }
      
      // Check if there are more projects to load
      setHasMore(count ? from + data.length < count : false);
      setPage(pageNumber);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchProjects(page + 1, true);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            My Projects
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my portfolio of web applications and mobile apps. Each project showcases different skills and technologies.
          </p>
          
          {/* Filter tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                } border border-gray-300 dark:border-gray-600`}
              >
                All Projects
              </button>
              <button
                onClick={() => setFilter('web')}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === 'web'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                } border-t border-b border-r border-gray-300 dark:border-gray-600`}
              >
                Web Projects
              </button>
              <button
                onClick={() => setFilter('mobile')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  filter === 'mobile'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                } border-t border-b border-r border-gray-300 dark:border-gray-600`}
              >
                Mobile Apps
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No projects found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image_url}
                technologies={project.technologies}
                liveUrl={project.live_url}
                sourceUrl={project.source_url}
                iosUrl={project.ios_url}
                androidUrl={project.android_url}
                featured={project.featured}
                isMobileApp={project.is_mobile_app}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <LoadMoreButton
            onClick={handleLoadMore}
            isLoading={loadingMore}
          />
        )}
      </div>
    </section>
  );
}
