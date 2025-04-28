"use client";

import { motion } from 'framer-motion';

type HeroBackgroundProps = {
  mousePosition: {
    x: number;
    y: number;
  };
};

export default function HeroBackground({ mousePosition }: HeroBackgroundProps) {
  return (
    <>
      {/* Modern background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M54.627,0.684 L59.267,5.327 L53.827,10.767 L58.733,15.673 L54.627,19.78 L49.78,14.933 L44.78,19.933 L39.933,15.087 L35.033,19.987 L30.093,15.047 L24.973,20.167 L20.18,15.373 L15.38,20.173 L10.587,15.38 L5.327,20.64 L0.687,16 L5.267,11.42 L0.733,6.887 L5.327,2.293 L9.953,6.92 L15.047,1.827 L19.84,6.62 L24.9,1.56 L29.9,6.56 L35.047,1.413 L39.713,6.08 L44.58,1.213 L49.267,5.9 Z' fill='%23000000' fill-opacity='0.4'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlays with improved aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-blue-50/20 to-transparent dark:from-gray-950/90 dark:via-blue-950/10 dark:to-transparent opacity-90" />
      
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
      
      {/* Subtle floating particles for depth and visual interest */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500/30 rounded-full hidden lg:block" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-purple-500/30 rounded-full hidden lg:block" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-blue-500/30 rounded-full hidden lg:block" />
      <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-indigo-500/30 rounded-full hidden lg:block" />
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-1/5 left-1/3 w-2 h-2 bg-cyan-500/30 rounded-full hidden lg:block"
      />
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-rose-500/30 rounded-full hidden lg:block"
      />
    </>
  );
} 