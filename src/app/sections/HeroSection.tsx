"use client";

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolio-data';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      const offsetFactor = 20; // Increased for more subtle effect
      setMousePosition({
        x: moveX / offsetFactor,
        y: moveY / offsetFactor,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950">
      {/* Modern background pattern - TEST UPDATE */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M54.627,0.684 L59.267,5.327 L53.827,10.767 L58.733,15.673 L54.627,19.78 L49.78,14.933 L44.78,19.933 L39.933,15.087 L35.033,19.987 L30.093,15.047 L24.973,20.167 L20.18,15.373 L15.38,20.173 L10.587,15.38 L5.327,20.64 L0.687,16 L5.267,11.42 L0.733,6.887 L5.327,2.293 L9.953,6.92 L15.047,1.827 L19.84,6.62 L24.9,1.56 L29.9,6.56 L35.047,1.413 L39.713,6.08 L44.58,1.213 L49.267,5.9 Z' fill='%23000000' fill-opacity='0.4'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Gradient overlays with improved aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-blue-50/20 to-transparent dark:from-gray-950/90 dark:via-blue-950/10 dark:to-transparent opacity-90"></div>
      
      {/* Enhanced gradient orbs with better parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large blue gradient orb */}
        <motion.div
          animate={{ 
            x: mousePosition.x * -0.3, 
            y: mousePosition.y * -0.3 
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.7 }}
          className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0) 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Purple gradient orb */}
        <motion.div
          animate={{ 
            x: mousePosition.x * 0.4, 
            y: mousePosition.y * 0.4 
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.7 }}
          className="absolute bottom-[-30%] left-[-10%] w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0) 70%)',
            filter: 'blur(50px)',
          }}
        />
        
        {/* Accent orange gradient */}
        <motion.div
          animate={{ 
            x: mousePosition.x * 0.2, 
            y: mousePosition.y * 0.2 
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.7 }}
          className="absolute top-[30%] right-[20%] w-[500px] h-[500px] rounded-full blur-3xl opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, rgba(249,115,22,0) 70%)',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Extra cyan accent for visual interest */}
        <motion.div
          animate={{ 
            x: mousePosition.x * -0.15, 
            y: mousePosition.y * -0.15 
          }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.7 }}
          className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, rgba(6,182,212,0) 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Main content container with improved spacing */}
      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text content column with enhanced animations */}
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

              {/* Social links with refined animations */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-8 pt-2"
              >
                <motion.a 
                  whileHover={{ y: -5, scale: 1.15, transition: { duration: 0.2 } }}
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -5, scale: 1.15, transition: { duration: 0.2 } }}
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -5, scale: 1.15, transition: { duration: 0.2 } }}
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                </motion.a>
              </motion.div>
              
              {/* Call to action buttons with sophisticated styling */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-5 pt-6"
              >
                <Link 
                  href="/projects"
                  className="group relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-xl text-base font-medium"
                >
                  <span className="relative z-10">View My Work</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 inline-block"
                  >
                    <FaArrowRight size={14} />
                  </motion.span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link 
                  href="/contact"
                  className="relative overflow-hidden flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 text-base font-medium group"
                >
                  <span className="relative z-10 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">Contact Me</span>
                  <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Profile image with modern glass effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Glass effect card with sophisticated styling */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.5)] border border-white/20 dark:border-gray-800/40">
                {/* Multi-layer gradient border */}
                <div className="absolute inset-0 p-0.5 rounded-3xl bg-gradient-to-br from-blue-500/40 via-indigo-500/40 to-purple-600/40 opacity-70">
                  <div className="w-full h-full rounded-[calc(1.5rem-2px)] bg-white/90 dark:bg-gray-900/90"></div>
                </div>
                
                {/* Content area with subtle texture */}
                <div className="absolute inset-[3px] rounded-[calc(1.5rem-3px)] overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  ></div>
                  
                  {/* Profile image or placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Modern avatar placeholder */}
                      <div className="relative z-10 text-center">
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.7 }}
                          className="relative w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center mb-6 border-4 border-white dark:border-gray-800 shadow-inner overflow-hidden"
                        >
                          <span className="text-blue-600 dark:text-blue-400 text-6xl font-bold">C</span>
                          {/* Animated background elements */}
                          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl"></div>
                          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-xl"></div>
                        </motion.div>
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="text-gray-600 dark:text-gray-300 text-base font-medium"
                        >
                          Add your photo here
                        </motion.p>
                      </div>
                    </div>
                    
                    {/* Uncomment when you have a profile image */}
                    {/* 
                    <Image
                      src="/images/profile.jpg"
                      alt={personalInfo.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                    */}
                  </div>
                </div>
                
                {/* Modern atmospheric glow effects */}
                <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-purple-400/10 dark:bg-purple-400/5 blur-2xl"></div>
                <div className="absolute top-1/3 left-1/3 w-24 h-24 rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-xl"></div>
              </div>
              
              {/* Additional depth elements */}
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-indigo-400/5 dark:bg-indigo-400/5 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-400/5 dark:bg-blue-400/5 rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Modern scroll indicator with subtle animation */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-8 h-14 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center items-start p-2">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">Scroll</p>
        </motion.div>
      </motion.div>
      
      {/* Subtle floating particles for depth and visual interest */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500/30 rounded-full hidden lg:block"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-purple-500/30 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-500/30 rounded-full hidden lg:block"></div>
      <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-indigo-500/30 rounded-full hidden lg:block"></div>
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-1/5 left-1/3 w-2 h-2 bg-cyan-500/30 rounded-full hidden lg:block"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-rose-500/30 rounded-full hidden lg:block"
      ></motion.div>
    </section>
  );
} 