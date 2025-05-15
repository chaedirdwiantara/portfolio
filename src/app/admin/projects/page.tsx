'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/app/lib/supabase/client';
import LoadMoreButton from '@/app/components/common/LoadMoreButton';

type Project = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string | null;
  live_url: string | null;
  source_url: string | null;
  ios_url: string | null;
  android_url: string | null;
  featured: boolean;
  is_mobile_app: boolean;
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();
  const pageSize = 10;

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
      
      const { data, error, count } = await supabase
        .from('projects')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
        
      if (error) throw error;
      
      // Update projects state
      if (append && data) {
        setProjects(prev => [...prev, ...data]);
      } else if (data) {
        setProjects(data);
      }
      
      // Check if there are more projects to load
      setHasMore(count ? from + data.length < count : false);
      setPage(pageNumber);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchProjects(page + 1, true);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    
    try {
      setLoading(true);
      const supabase = createBrowserClient();
      
      // Delete the project
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Remove the project from the state
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err: any) {
      console.error('Error deleting project:', err);
      alert(`Failed to delete project: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id: number, currentFeatured: boolean) => {
    try {
      const supabase = createBrowserClient();
      
      // Update the featured status
      const { error } = await supabase
        .from('projects')
        .update({ featured: !currentFeatured })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update the project in the state
      setProjects(prev => prev.map(project => 
        project.id === id ? { ...project, featured: !currentFeatured } : project
      ));
    } catch (err: any) {
      console.error('Error updating featured status:', err);
      alert(`Failed to update featured status: ${err.message}`);
    }
  };

  if (loading && !projects.length) {
    return <div className="p-4">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Link 
          href="/admin/projects/new" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Add New Project
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading projects</p>
          <p>{error}</p>
        </div>
      )}
      
      {projects.length === 0 && !loading ? (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-lg text-gray-600 dark:text-gray-300">No projects found.</p>
          <p className="mt-2">
            <Link href="/admin/projects/new" className="text-blue-600 hover:underline">
              Create your first project
            </Link>
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="h-16 w-24 object-cover rounded"
                      />
                    ) : (
                      <div className="h-16 w-24 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded">
                        <span className="text-xs text-gray-500 dark:text-gray-400">No image</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {project.technologies}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {project.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {project.featured && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                          Featured
                        </span>
                      )}
                      {project.is_mobile_app && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                          Mobile App
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleFeatured(project.id, project.featured)}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          project.featured
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-100 dark:hover:bg-yellow-700'
                        }`}
                      >
                        {project.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-xs font-medium dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-xs font-medium dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {hasMore && (
        <LoadMoreButton
          onClick={handleLoadMore}
          isLoading={loadingMore}
        />
      )}
    </div>
  );
} 