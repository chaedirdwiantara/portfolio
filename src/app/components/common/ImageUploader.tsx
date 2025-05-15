'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  initialImage?: string | null;
  onImageChange: (file: File | null) => void;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  maxSizeMB?: number;
  label?: string;
  height?: string;
  width?: string;
}

export default function ImageUploader({
  initialImage = null,
  onImageChange,
  className = '',
  aspectRatio = 'landscape',
  maxSizeMB = 5,
  label = 'Upload Image',
  height = 'h-36',
  width = 'w-full',
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialImage);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const validateFile = (file: File): boolean => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return false;
    }
    
    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
    if (file.size > maxSize) {
      setError(`Image size must be less than ${maxSizeMB}MB`);
      return false;
    }
    
    return true;
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    
    if (validateFile(file)) {
      // Create a preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageChange(file);
      
      // Clean up the URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      e.target.value = '';
      onImageChange(null);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) {
      return;
    }
    
    if (validateFile(file)) {
      // Create a preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageChange(file);
      
      // Clean up the URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  };
  
  // Determine border radius based on aspect ratio
  let roundedClass = 'rounded-lg';
  if (aspectRatio === 'square') {
    roundedClass = 'rounded-lg';
  } else if (aspectRatio === 'portrait') {
    roundedClass = 'rounded-lg';
  } else if (aspectRatio === 'landscape') {
    roundedClass = 'rounded-lg';
  }
  
  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      <motion.div
        className={`${height} ${width} overflow-hidden border-2 border-dashed cursor-pointer ${roundedClass} ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className={`${height} ${width} object-cover`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 space-y-2">
            <svg
              className="h-10 w-10 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Click or drag and drop an image
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              Max size: {maxSizeMB}MB
            </p>
          </div>
        )}
      </motion.div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
      />
    </div>
  );
} 