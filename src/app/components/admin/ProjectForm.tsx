'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/app/lib/supabase/client';
import { uploadProjectImage, uploadMultipleImages } from '@/app/lib/supabase/uploadImage';
import LoadMoreButton from '@/app/components/common/LoadMoreButton';
import ImageUploader from '@/app/components/common/ImageUploader';
import MultiImageUploader from '@/app/components/common/MultiImageUploader';

// Define the project type
type Project = {
  id?: number;
  title: string;
  description: string;
  image_url: string | null;
  images_urls: string[] | null;
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

interface ProjectFormProps {
  projectId?: number;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    image_url: null,
    images_urls: null,
    technologies: '',
    live_url: '',
    source_url: '',
    ios_url: '',
    android_url: '',
    featured: false,
    is_mobile_app: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [multipleImageFiles, setMultipleImageFiles] = useState<File[]>([]);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);
  const router = useRouter();
  
  // Fetch project data if editing
  useEffect(() => {
    if (!projectId) return;
    
    const fetchProject = async () => {
      setLoading(true);
      try {
        const supabase = createBrowserClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
          
        if (error) throw error;
        
        setProject(data);
        if (data.images_urls) {
          setAdditionalImageUrls(data.images_urls);
        }
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError(err.message || 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [projectId]);
  
  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setProject(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));
  };
  
  // Handle image selection
  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  // Handle multiple image selection
  const handleMultipleImagesChange = (files: File[], urls: string[]) => {
    setMultipleImageFiles(files);
    setAdditionalImageUrls(urls.filter(url => !url.startsWith('blob:')));
  };

  // Toggle mobile app status
  const handleMobileToggle = (isMobile: boolean) => {
    setProject(prev => ({
      ...prev,
      is_mobile_app: isMobile
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!project.title.trim()) {
        throw new Error('Project title is required');
      }
      
      // Upload image if provided
      let imageUrl = project.image_url;
      if (imageFile) {
        imageUrl = await uploadProjectImage(imageFile, 'project-images', project.image_url);
      }
      
      // Upload additional images if provided
      let imagesUrls = additionalImageUrls;
      if (multipleImageFiles.length > 0) {
        imagesUrls = await uploadMultipleImages(multipleImageFiles, 'project-images', additionalImageUrls);
      }
      
      // Format technologies as a proper PostgreSQL array
      const formattedTechnologies = project.technologies ? 
        (typeof project.technologies === 'string' 
          ? project.technologies.split(',')
              .map(tech => tech.trim())
              .filter(tech => tech.length > 0) 
          : project.technologies) 
        : [];
      
      const supabase = createBrowserClient();
      
      // Prepare data for saving
      const projectData = {
        ...project,
        image_url: imageUrl,
        images_urls: imagesUrls,
        technologies: formattedTechnologies
      };
      
      if (projectId) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);
          
        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert(projectData);
          
        if (error) throw error;
      }
      
      // Navigate back to projects list
      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      console.error('Error saving project:', err);
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <div className="p-4">Loading project data...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex space-x-6 mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="type-web"
                name="project_type"
                checked={!project.is_mobile_app}
                onChange={() => handleMobileToggle(false)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700"
              />
              <label htmlFor="type-web" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Web Project
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="type-mobile"
                name="project_type"
                checked={project.is_mobile_app}
                onChange={() => handleMobileToggle(true)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700"
              />
              <label htmlFor="type-mobile" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Mobile App
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={project.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Featured Project
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={project.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white caret-blue-500"
                placeholder="Project title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={project.description || ''}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white caret-blue-500"
                placeholder="Project description"
              />
            </div>
            
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Technologies
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={project.technologies || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white caret-blue-500"
                placeholder="React, Node.js, Tailwind CSS"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Comma-separated list of technologies used
              </p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <ImageUploader
              initialImage={project.image_url}
              onImageChange={handleImageChange}
              label="Main Project Image"
              aspectRatio="landscape"
              height="h-48"
              width="w-full"
              maxSizeMB={2}
            />
            
            <MultiImageUploader
              initialImages={project.images_urls || []}
              onImagesChange={handleMultipleImagesChange}
              label="Additional Project Images (Gallery)"
              maxSizeMB={2}
            />
            
            {/* Web-specific URLs */}
            {!project.is_mobile_app && (
              <>
                <div>
                  <label htmlFor="live_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    id="live_url"
                    name="live_url"
                    value={project.live_url || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white caret-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="source_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Source Code URL
                  </label>
                  <input
                    type="url"
                    id="source_url"
                    name="source_url"
                    value={project.source_url || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white caret-blue-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </>
            )}
            
            {/* Mobile-specific URLs */}
            {project.is_mobile_app && (
              <>
                <div>
                  <label htmlFor="ios_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    App Store URL (iOS)
                  </label>
                  <input
                    type="url"
                    id="ios_url"
                    name="ios_url"
                    value={project.ios_url || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white caret-blue-500"
                    placeholder="https://apps.apple.com/app/id123456789"
                  />
                </div>
                
                <div>
                  <label htmlFor="android_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Play Store URL (Android)
                  </label>
                  <input
                    type="url"
                    id="android_url"
                    name="android_url"
                    value={project.android_url || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white caret-blue-500"
                    placeholder="https://play.google.com/store/apps/details?id=com.example.app"
                  />
                </div>
                
                {/* Optional source code URL for mobile apps too */}
                <div>
                  <label htmlFor="source_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Source Code URL (Optional)
                  </label>
                  <input
                    type="url"
                    id="source_url"
                    name="source_url"
                    value={project.source_url || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800 dark:border-gray-700 dark:text-white caret-blue-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {saving ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
} 