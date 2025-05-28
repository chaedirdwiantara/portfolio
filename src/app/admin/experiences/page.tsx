'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/app/lib/supabase/client';

type Experience = {
  id: number;
  created_at: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
};

export default function ExperiencesAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const supabase = createBrowserClient();
      
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setExperiences(data || []);
    } catch (err: any) {
      console.error('Error fetching experiences:', err);
      setError(err.message || 'Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) {
      return;
    }
    
    try {
      const supabase = createBrowserClient();
      
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setExperiences(prev => prev.filter(exp => exp.id !== id));
    } catch (err: any) {
      console.error('Error deleting experience:', err);
      alert(`Failed to delete experience: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="p-4">Loading experiences...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Experiences</h1>
        <Link 
          href="/admin/experiences/new" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Add New Experience
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading experiences</p>
          <p>{error}</p>
        </div>
      )}
      
      {experiences.length === 0 && !loading ? (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-lg text-gray-600 dark:text-gray-300">No experiences found.</p>
          <p className="mt-2">
            <Link href="/admin/experiences/new" className="text-blue-600 hover:underline">
              Add your first experience
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {experience.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {experience.company}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {experience.location} • {experience.period}
                  </p>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Link
                    href={`/admin/experiences/${experience.id}`}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300 rounded-md text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteExperience(experience.id)}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {experience.description && experience.description.length > 0 && (
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {experience.description.join(' ').length > 200 
                    ? `${experience.description.join(' ').substring(0, 200)}...` 
                    : experience.description.join(' ')}
                </p>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500">
                  Created: {new Date(experience.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 