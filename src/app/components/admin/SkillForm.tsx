'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/app/lib/supabase/client';

// Define the skill type
type Skill = {
  id?: number;
  category: string;
  name: string;
  level: number;
};

interface SkillFormProps {
  skillId?: number;
}

export default function SkillForm({ skillId }: SkillFormProps) {
  const [skill, setSkill] = useState<Skill>({
    category: '',
    name: '',
    level: 1,
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  // Common skill categories
  const commonCategories = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Mobile',
    'Design',
    'Tools',
    'Languages',
    'Frameworks',
    'Cloud',
    'Testing',
    'Other'
  ];
  
  // Fetch skill data if editing
  useEffect(() => {
    if (!skillId) return;
    
    const fetchSkill = async () => {
      setLoading(true);
      try {
        const supabase = createBrowserClient();
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .eq('id', skillId)
          .single();
          
        if (error) throw error;
        
        setSkill(data);
      } catch (err: any) {
        console.error('Error fetching skill:', err);
        setError(err.message || 'Failed to load skill');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkill();
  }, [skillId]);
  
  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setSkill(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!skill.name.trim()) {
        throw new Error('Skill name is required');
      }
      
      if (!skill.category.trim()) {
        throw new Error('Skill category is required');
      }
      
      if (skill.level < 1 || skill.level > 5) {
        throw new Error('Skill level must be between 1 and 5');
      }
      
      const supabase = createBrowserClient();
      
      // Prepare data for saving
      const skillData = {
        category: skill.category.trim(),
        name: skill.name.trim(),
        level: skill.level
      };
      
      if (skillId) {
        // Update existing skill
        const { error } = await supabase
          .from('skills')
          .update(skillData)
          .eq('id', skillId);
          
        if (error) throw error;
      } else {
        // Create new skill
        const { error } = await supabase
          .from('skills')
          .insert(skillData);
          
        if (error) throw error;
      }
      
      // Navigate back to skills list
      router.push('/admin/skills');
      router.refresh();
    } catch (err: any) {
      console.error('Error saving skill:', err);
      setError(err.message || 'Failed to save skill');
    } finally {
      setSaving(false);
    }
  };
  
  const getLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      case 5: return 'Master';
      default: return 'Unknown';
    }
  };
  
  if (loading) {
    return <div className="p-4">Loading skill data...</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Skill Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skill Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={skill.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., React, Node.js, PostgreSQL"
          />
        </div>
        
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <div className="space-y-2">
            <select
              id="category"
              name="category"
              value={skill.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a category</option>
              {commonCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Or type a custom category in the field above
            </p>
            <input
              type="text"
              name="category"
              value={skill.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Or enter custom category"
            />
          </div>
        </div>
        
        {/* Level */}
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skill Level *
          </label>
          <div className="space-y-3">
            <select
              id="level"
              name="level"
              value={skill.level}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  {level} - {getLevelText(level)}
                </option>
              ))}
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Current selection:</strong> {getLevelText(skill.level)} ({skill.level}/5)</p>
              <div className="mt-2 space-y-1 text-xs">
                <p><strong>1 - Beginner:</strong> Basic understanding, learning</p>
                <p><strong>2 - Intermediate:</strong> Can work with guidance</p>
                <p><strong>3 - Advanced:</strong> Can work independently</p>
                <p><strong>4 - Expert:</strong> Can mentor others</p>
                <p><strong>5 - Master:</strong> Deep expertise, thought leader</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/skills')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : (skillId ? 'Update Skill' : 'Create Skill')}
          </button>
        </div>
      </form>
    </div>
  );
} 