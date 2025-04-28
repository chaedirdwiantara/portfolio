"use client";

import { motion } from 'framer-motion';
import { personalInfo, socialLinks } from '../../data/portfolio-data';
import SocialLinks from './SocialLinks';
import CTAButtons from './CTAButtons';

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-7 space-y-10"
    >
      {/* Staggered content animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-8"
      >
        {/* Title badge with refined styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="inline-block py-1.5 px-4 text-sm tracking-wide font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full ring-1 ring-blue-100 dark:ring-blue-800">
            {personalInfo.title}
          </span>
        </motion.div>
        
        {/* Main headline with enhanced gradient typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="block text-gray-900 dark:text-white mb-2">Hi, I'm</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 inline-block pb-2">
              {personalInfo.name}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
            I create elegant, high-performance web applications with modern technologies,
            focusing on exceptional user experiences and clean, maintainable code.
          </p>
        </motion.div>

        {/* Social Links */}
        <SocialLinks 
          github={socialLinks.github}
          linkedin={socialLinks.linkedin}
          twitter={socialLinks.twitter}
        />
        
        {/* Call to action buttons */}
        <CTAButtons />
      </motion.div>
    </motion.div>
  );
} 