'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '../supabase/client';

export type PersonalInfo = {
  id: number;
  created_at: string;
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
};

export function usePersonalInfo() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        throw error;
      }

      setPersonalInfo(data);
    } catch (err: any) {
      console.error('Error fetching personal info:', err);
      setError(err.message || 'Failed to fetch personal information');
    } finally {
      setLoading(false);
    }
  };

  return {
    personalInfo,
    loading,
    error,
    refetch: fetchPersonalInfo
  };
} 