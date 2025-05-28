'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '../lib/supabase/client';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const supabase = createBrowserClient();
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to get user:", error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const supabase = createBrowserClient();
        
        // Get projects count - handle potential errors gracefully
        let projectsCount = 0;
        try {
          const { count, error } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true });
            
          if (error) throw error;
          projectsCount = count || 0;
        } catch (err) {
          console.error("Projects count error:", err);
        }
        
        // Get skills count
        let skillsCount = 0;
        try {
          const { count, error } = await supabase
            .from('skills')
            .select('*', { count: 'exact', head: true });
            
          if (error) throw error;
          skillsCount = count || 0;
        } catch (err) {
          console.error("Skills count error:", err);
        }
        
        // Get experiences count
        let experiencesCount = 0;
        try {
          const { count, error } = await supabase
            .from('experiences')
            .select('*', { count: 'exact', head: true });
            
          if (error) throw error;
          experiencesCount = count || 0;
        } catch (err) {
          console.error("Experiences count error:", err);
        }
        
        setStats({
          projects: projectsCount,
          skills: skillsCount,
          experiences: experiencesCount
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setError("Could not load data from Supabase");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-4">Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error loading dashboard</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">Note: Make sure your Supabase tables are created correctly.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {user && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-lg">Welcome, <span className="font-medium">{user.email}</span></p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-2">Projects</h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.projects}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-2">Skills</h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.skills}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium mb-2">Experiences</h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.experiences}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/personal-info" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
            Manage Profile
          </a>
          <a href="/admin/projects/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Add New Project
          </a>
          <a href="/admin/skills/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Add New Skill
          </a>
          <a href="/admin/experiences/new" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Add New Experience
          </a>
        </div>
      </div>
    </div>
  );
} 