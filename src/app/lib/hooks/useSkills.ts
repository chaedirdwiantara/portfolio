import { useState, useEffect } from 'react';

export type Skill = {
  id: number;
  created_at: string;
  category: string;
  name: string;
  level: number;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [groupedSkills, setGroupedSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/skills');
      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }
      
      const skillsData: Skill[] = await response.json();
      setSkills(skillsData);
      
      // Group skills by category
      const grouped = skillsData.reduce((acc, skill) => {
        const existingCategory = acc.find(cat => cat.category === skill.category);
        
        if (existingCategory) {
          existingCategory.skills.push(skill);
        } else {
          acc.push({
            category: skill.category,
            skills: [skill]
          });
        }
        
        return acc;
      }, [] as SkillCategory[]);
      
      setGroupedSkills(grouped);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching skills:', err);
      setError(err.message || 'Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills,
    groupedSkills,
    loading,
    error,
    refetch: fetchSkills
  };
} 