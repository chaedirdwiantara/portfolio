"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

type ProfileAvatarProps = {
  name: string;
};

export default function ProfileAvatar({ name }: ProfileAvatarProps) {
  return (
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
                <Image
                  src="/assets/images/chaedir.jpg"
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
              
              {/* Modern atmospheric glow effects */}
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-purple-400/10 dark:bg-purple-400/5 blur-2xl"></div>
              <div className="absolute top-1/3 left-1/3 w-24 h-24 rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-xl"></div>
            </div>
          </div>
          
          {/* Additional depth elements */}
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-indigo-400/5 dark:bg-indigo-400/5 rounded-full blur-2xl"></div>
          <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-400/5 dark:bg-blue-400/5 rounded-full blur-2xl"></div>
        </div>
      </div>
    </motion.div>
  );
} 