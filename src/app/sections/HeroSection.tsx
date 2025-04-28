"use client";

import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolio-data';
import HeroBackground from '../components/hero/HeroBackground';
import HeroContent from '../components/hero/HeroContent';
import ProfileAvatar from '../components/hero/ProfileAvatar';
import ScrollIndicator from '../components/hero/ScrollIndicator';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
      {/* Background Elements */}
      <HeroBackground mousePosition={mousePosition} />

      {/* Main content container */}
      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <HeroContent />
          
          {/* Profile image */}
          <ProfileAvatar name={personalInfo.name} />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
} 