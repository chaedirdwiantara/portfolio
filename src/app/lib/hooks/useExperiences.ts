'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '../supabase/client';

export type Experience = {
  id: number;
  created_at: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
};

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setExperiences(data || []);
    } catch (err: any) {
      console.error('Error fetching experiences:', err);
      setError(err.message || 'Failed to fetch experiences');
    } finally {
      setLoading(false);
    }
  };

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences
  };
} 