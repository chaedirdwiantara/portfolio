"use client";

import { motion } from "framer-motion";
import { useSkills } from "@/app/lib/hooks/useSkills";

type SkillTechnology = {
  name: string;
  level: number;
};

type SkillCategoryDisplay = {
  category: string;
  technologies: SkillTechnology[];
};

export default function SkillsSection() {
  const { groupedSkills, loading, error } = useSkills();

  // Convert grouped skills to display format with percentage levels
  const skillsForDisplay: SkillCategoryDisplay[] = groupedSkills.map(category => ({
    category: category.category,
    technologies: category.skills.map(skill => ({
      name: skill.name,
      level: skill.level * 20 // Convert 1-5 to 20-100
    }))
  }));

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-green-50 dark:bg-green-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-lg text-gray-600 dark:text-gray-300">Loading skills...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-20 bg-green-50 dark:bg-green-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-lg text-red-600 dark:text-red-400">Error loading skills: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-green-50 dark:bg-green-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Skills & Technologies
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            A showcase of my technical skills and technologies I work with.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {skillsForDisplay.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300">
              No skills data available.
            </div>
          ) : (
            skillsForDisplay.map((skillCategory, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                className="mb-12 last:mb-0"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                  {skillCategory.category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skillCategory.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{tech.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{tech.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + (0.1 * techIndex) }}
                          className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}