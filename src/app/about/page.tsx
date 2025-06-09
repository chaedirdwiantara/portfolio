'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/app/lib/supabase/client';
import { AboutSkeleton } from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';

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
    return <AboutSkeleton />;
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to Load"
        message={error}
        onRetry={fetchPersonalInfo}
        type="error"
      />
    );
  }

  if (!personalInfo) {
    return (
      <ErrorState 
        title="About"
        message="No personal information available yet."
        type="not-found"
      />
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