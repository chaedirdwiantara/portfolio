"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-yellow-50 dark:bg-yellow-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Me
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-yellow-500 dark:bg-yellow-400 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Learn more about my background and experience.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                My Story
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula nisl in metus rutrum, at feugiat ex scelerisque. Morbi at est convallis, placerat nisi et, tincidunt nibh.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Nunc fringilla, erat id feugiat ultricies, lectus nisi fermentum erat, a placerat nulla lacus at quam. Maecenas rhoncus, orci id finibus rhoncus, massa augue molestie massa.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Education & Experience
              </h3>
              <div className="space-y-6">
                <div className="border-l-2 border-yellow-500 dark:border-yellow-400 pl-4">
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">2018 - Present</span>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Senior Web Developer</h4>
                  <p className="text-gray-600 dark:text-gray-300">Company Name</p>
                </div>
                <div className="border-l-2 border-yellow-500 dark:border-yellow-400 pl-4">
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">2015 - 2018</span>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Frontend Developer</h4>
                  <p className="text-gray-600 dark:text-gray-300">Company Name</p>
                </div>
                <div className="border-l-2 border-yellow-500 dark:border-yellow-400 pl-4">
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">2011 - 2015</span>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Computer Science Degree</h4>
                  <p className="text-gray-600 dark:text-gray-300">University Name</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
