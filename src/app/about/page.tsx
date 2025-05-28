'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/app/lib/supabase/client';

type PersonalInfo = {
  id: number;
  created_at: string;
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  profile_image_url?: string;
};

export default function AboutPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      const supabase = createBrowserClient();
      
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        setPersonalInfo(data);
      }
    } catch (err: any) {
      console.error('Error fetching personal info:', err);
      setError(err.message || 'Failed to load personal information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Something went wrong</h1>
          <p className="text-slate-600 dark:text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About</h1>
          <p className="text-slate-600 dark:text-slate-400">No personal information available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Main Content Section - Full Height */}
      <div className="min-h-screen flex items-center justify-center py-4 lg:py-8 pt-12 lg:pt-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 min-h-[85vh] flex flex-col">
            
            {/* Content Layout */}
            <div className="lg:flex flex-1">
              {/* Image Side */}
              {personalInfo.profile_image_url && (
                <div className="lg:w-1/2 xl:w-2/5">
                  <div className="h-80 lg:h-full relative">
                    <img 
                      src={personalInfo.profile_image_url} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/5 lg:to-black/20"></div>
                  </div>
                </div>
              )}
              
              {/* Content Side */}
              <div className={`${personalInfo.profile_image_url ? 'lg:w-1/2 xl:w-3/5' : 'w-full'} flex items-center`}>
                <div className="w-full p-8 lg:p-12 xl:p-16 pt-12 lg:pt-16 xl:pt-20">
                  <div className="max-w-2xl mx-auto lg:mx-0">
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white mb-6 lg:mb-8 leading-tight">
                      About Me
                    </h1>
                    
                    <div className="prose prose-lg lg:prose-xl prose-slate dark:prose-invert max-w-none">
                      <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-base lg:text-lg">
                        {personalInfo.bio}
                      </div>
                    </div>
                    
                    {/* Additional Info Section */}
                    <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-slate-200 dark:border-slate-600">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            Current Role
                          </h3>
                          <p className="text-base lg:text-lg font-medium text-slate-900 dark:text-white">
                            {personalInfo.title}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            Location
                          </h3>
                          <p className="text-base lg:text-lg font-medium text-slate-900 dark:text-white">
                            {personalInfo.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-4 lg:px-12 xl:px-16 bg-slate-50/90 dark:bg-slate-700/50 border-t border-slate-200/50 dark:border-slate-600/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                <p className="font-medium">
                  Last updated: {new Date(personalInfo.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Available for opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 