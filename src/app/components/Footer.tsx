"use client";

import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { socialLinks, personalInfo } from '../data/portfolio-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div>
            <div className="font-bold text-xl text-gray-900 dark:text-white mb-2">{personalInfo.name}</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {personalInfo.bio.split('.')[0]}.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Email: <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a></p>
              <p className="mt-1">Location: {personalInfo.location}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 