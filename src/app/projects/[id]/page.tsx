'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createBrowserClient } from '@/app/lib/supabase/client';

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

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const projectId = params.id ? parseInt(params.id as string, 10) : null;
  
  useEffect(() => {
    if (!projectId) {
      setError('Invalid project ID');
      setLoading(false);
      return;
    }
    
    const fetchProjectDetails = async () => {
      try {
        const supabase = createBrowserClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();
          
        if (error) throw error;
        
        setProject(data);
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectDetails();
  }, [projectId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">{error || 'Project not found'}</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">The project you are looking for could not be found or doesn't exist.</p>
          <Link 
            href="/projects" 
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to projects
          </Link>
        </div>
      </div>
    );
  }
  
  // Convert technologies string to array if it exists
  const technologies = project.technologies
    ? project.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
    : [];
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/projects"
          className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all projects
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Project header with image */}
          <div className="relative w-full h-[400px]">
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-xl">No image available</span>
              </div>
            )}
            
            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                Featured Project
              </div>
            )}
            
            {/* Platform badge */}
            {project.is_mobile_app && (
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Mobile App
              </div>
            )}
          </div>
          
          {/* Project content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h1>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p>{project.description}</p>
            </div>
            
            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action buttons - only show if URLs exist */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {/* Web specific buttons */}
              {!project.is_mobile_app && project.live_url && (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Demo
                </Link>
              )}
              
              {/* Mobile app buttons */}
              {project.is_mobile_app && (
                <>
                  {project.ios_url && (
                    <Link
                      href={project.ios_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-black transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.586 15.586a1 1 0 01-1.414-1.414L10.586 12 9 10.414a1 1 0 011.414-1.414L12 10.586l1.586-1.586a1 1 0 111.414 1.414L13.414 12l1.586 1.586a1 1 0 01-1.414 1.414L12 13.414l-1.586 1.586z" />
                      </svg>
                      Download on App Store
                    </Link>
                  )}
                  
                  {project.android_url && (
                    <Link
                      href={project.android_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.2 16.839a1.193 1.193 0 01-1.2-1.178V8.339c0-.65.537-1.178 1.2-1.178.662 0 1.2.528 1.2 1.178v7.322c0 .65-.538 1.178-1.2 1.178zm9.6 0a1.193 1.193 0 01-1.2-1.178V8.339c0-.65.537-1.178 1.2-1.178.662 0 1.2.528 1.2 1.178v7.322c0 .65-.538 1.178-1.2 1.178zM4.8 7.161v9.678c0 .65.538 1.178 1.2 1.178h1.2v2.744c0 .65.538 1.178 1.2 1.178s1.2-.528 1.2-1.178v-2.744h4.8v2.744c0 .65.537 1.178 1.2 1.178.662 0 1.2-.528 1.2-1.178v-2.744h1.2c.662 0 1.2-.528 1.2-1.178V7.161H4.8z" />
                        <path d="M2.4 7.161c-.662 0-1.2.528-1.2 1.178v4.322c0 .65.538 1.178 1.2 1.178.663 0 1.2-.528 1.2-1.178V8.339c0-.65-.537-1.178-1.2-1.178zm19.2 0c-.663 0-1.2.528-1.2 1.178v4.322c0 .65.537 1.178 1.2 1.178.662 0 1.2-.528 1.2-1.178V8.339c0-.65-.538-1.178-1.2-1.178zM16.788 2.448l.923-1.598a.593.593 0 00-.219-.81.596.596 0 00-.816.217l-.936 1.62a7.15 7.15 0 00-3.48 0l-.936-1.62a.596.596 0 00-.816-.217.593.593 0 00-.219.81l.923 1.598C9.678 3.238 8.4 4.815 8.4 6.661c0 .074.006.147.007.221h11.187c.001-.074.007-.147.007-.221 0-1.846-1.278-3.423-2.813-4.213z" />
                      </svg>
                      Get on Google Play
                    </Link>
                  )}
                </>
              )}
              
              {/* Source code button - common for both types */}
              {project.source_url && (
                <Link
                  href={project.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  View Source Code
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 