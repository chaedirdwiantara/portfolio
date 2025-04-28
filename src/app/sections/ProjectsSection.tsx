"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-purple-50 dark:bg-purple-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            My Projects
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Explore a selection of my recent work and projects.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative h-48 bg-purple-200 dark:bg-purple-900">
              <div className="absolute inset-0 flex items-center justify-center text-purple-500 dark:text-purple-300 font-medium">
                Project Image
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Project Title 1</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Brief description of the project that explains what it does and the technologies used.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  React
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  Next.js
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  Tailwind
                </span>
              </div>
              <div className="flex justify-between">
                <Link 
                  href="#" 
                  className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                >
                  View Project
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-600 dark:text-gray-400 font-medium hover:underline"
                >
                  Code
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Project Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative h-48 bg-purple-200 dark:bg-purple-900">
              <div className="absolute inset-0 flex items-center justify-center text-purple-500 dark:text-purple-300 font-medium">
                Project Image
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Project Title 2</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Brief description of the project that explains what it does and the technologies used.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  TypeScript
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  MongoDB
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  Express
                </span>
              </div>
              <div className="flex justify-between">
                <Link 
                  href="#" 
                  className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                >
                  View Project
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-600 dark:text-gray-400 font-medium hover:underline"
                >
                  Code
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Project Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative h-48 bg-purple-200 dark:bg-purple-900">
              <div className="absolute inset-0 flex items-center justify-center text-purple-500 dark:text-purple-300 font-medium">
                Project Image
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Project Title 3</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Brief description of the project that explains what it does and the technologies used.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  React Native
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  Firebase
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                  Redux
                </span>
              </div>
              <div className="flex justify-between">
                <Link 
                  href="#" 
                  className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                >
                  View Project
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-600 dark:text-gray-400 font-medium hover:underline"
                >
                  Code
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
