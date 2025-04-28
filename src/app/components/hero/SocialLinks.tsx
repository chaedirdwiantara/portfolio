"use client";

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

type SocialLinksProps = {
  github: string;
  linkedin: string;
  twitter: string;
};

export default function SocialLinks({ github, linkedin, twitter }: SocialLinksProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex items-center gap-8 pt-2"
    >
      <motion.a 
        whileHover={{ y: -5, scale: 1.15, transition: { duration: 0.2 } }}
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
        aria-label="GitHub"
      >
        <FaGithub size={24} />
      </motion.a>
      <motion.a 
        whileHover={{ y: -5, scale: 1.15, transition: { duration: 0.2 } }}
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={24} />
      </motion.a>
      <motion.a 
        whileHover={{ y: -5, scale: 1.15, transition: { duration: 0.2 } }}
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors duration-200"
        aria-label="Twitter"
      >
        <FaTwitter size={24} />
      </motion.a>
    </motion.div>
  );
} 