"use client";

import { motion } from "framer-motion";
import { useSkills } from "@/app/lib/hooks/useSkills";
import { SkillsSkeleton } from "../components/common/LoadingSkeleton";
import ErrorState from "../components/common/ErrorState";

export default function SkillsPage() {
  const { groupedSkills, loading, error } = useSkills();

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

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 2: return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      case 3: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 4: return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 5: return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Skeleton */}
            <div className="text-center mb-16">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse w-1/2 mx-auto mb-4"></div>
              <div className="w-20 h-1 bg-gray-200 dark:bg-gray-700 mx-auto mb-6 animate-pulse"></div>
              <div className="space-y-2 max-w-2xl mx-auto">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mx-auto"></div>
              </div>
            </div>

            {/* Skills Skeleton */}
            <SkillsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to Load Skills"
        message={`Error loading skills: ${error}`}
        type="error"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Skills & Technologies
            </h1>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills, tools, and technologies I work with, 
              organized by category and proficiency level.
            </p>
          </motion.div>

          {/* Skills Grid */}
          {groupedSkills.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300">
              No skills data available.
            </div>
          ) : (
            <div className="space-y-12">
              {groupedSkills.map((skillCategory, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                    {skillCategory.category}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                      ({skillCategory.skills.length} skills)
                    </span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillCategory.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 * skillIndex }}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                            {skill.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(skill.level)}`}>
                            {getLevelText(skill.level)}
                          </span>
                        </div>
                        
                        {/* Skill Level Indicator */}
                        <div className="flex items-center space-x-1 mt-3">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-3 h-3 rounded-full ${
                                level <= skill.level
                                  ? 'bg-blue-600 dark:bg-blue-400'
                                  : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            {skill.level}/5
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Proficiency Levels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { level: 1, text: 'Beginner', description: 'Basic understanding, learning' },
                { level: 2, text: 'Intermediate', description: 'Can work with guidance' },
                { level: 3, text: 'Advanced', description: 'Can work independently' },
                { level: 4, text: 'Expert', description: 'Can mentor others' },
                { level: 5, text: 'Master', description: 'Deep expertise, thought leader' }
              ].map((item) => (
                <div key={item.level} className="text-center">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getLevelColor(item.level)} mb-2`}>
                    {item.text}
                  </span>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
