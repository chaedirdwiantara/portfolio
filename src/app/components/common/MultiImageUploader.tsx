'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface MultiImageUploaderProps {
  initialImages?: string[];
  onImagesChange: (files: File[], urls: string[]) => void;
  className?: string;
  maxSizeMB?: number;
  label?: string;
}

export default function MultiImageUploader({
  initialImages = [],
  onImagesChange,
  className = '',
  maxSizeMB = 5,
  label = 'Project Images',
}: MultiImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>(initialImages || []);
  const [files, setFiles] = useState<File[]>([]);
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;
    
    const validFiles: File[] = [];
    const newPreviews: string[] = [...previews];
    
    selectedFiles.forEach(file => {
      if (validateFile(file)) {
        validFiles.push(file);
        const objectUrl = URL.createObjectURL(file);
        newPreviews.push(objectUrl);
      }
    });
    
    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      setPreviews(newPreviews);
      onImagesChange(updatedFiles, newPreviews);
    }
    
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
    
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    if (droppedFiles.length === 0) return;
    
    const validFiles: File[] = [];
    const newPreviews: string[] = [...previews];
    
    droppedFiles.forEach(file => {
      if (validateFile(file)) {
        validFiles.push(file);
        const objectUrl = URL.createObjectURL(file);
        newPreviews.push(objectUrl);
      }
    });
    
    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      setPreviews(newPreviews);
      onImagesChange(updatedFiles, newPreviews);
    }
  };
  
  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    
    // If it's a new file (not an initial image), remove it from files array
    if (index >= initialImages.length) {
      const newFiles = [...files];
      newFiles.splice(index - initialImages.length, 1);
      setFiles(newFiles);
      onImagesChange(newFiles, newPreviews);
    } else {
      // It's an initial image that was removed
      onImagesChange(files, newPreviews);
    }
  };
  
  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={preview}
              alt={`Project image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Remove image"
            >
              <FaTimes size={12} />
            </button>
          </div>
        ))}
        
        <motion.div
          className={`h-40 overflow-hidden border-2 border-dashed cursor-pointer rounded-lg flex items-center justify-center ${
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
          <div className="flex flex-col items-center justify-center p-4 space-y-2">
            <FaPlus className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Add image
            </p>
          </div>
        </motion.div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        className="sr-only"
      />
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {previews.length > 0 
          ? `${previews.length} image${previews.length > 1 ? 's' : ''} selected. Drag to reorder.` 
          : 'Add multiple images for your project gallery.'
        }
      </p>
    </div>
  );
} 