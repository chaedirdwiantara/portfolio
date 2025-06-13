import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: (string | any)[];
  currentIndex: number;
  alt: string;
}

const ImageModal = ({ isOpen, onClose, images, currentIndex, alt }: ImageModalProps) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
      // Hide navigation
      const navigation = document.querySelector('header');
      if (navigation) {
        (navigation as HTMLElement).style.opacity = '0';
        (navigation as HTMLElement).style.visibility = 'hidden';
        (navigation as HTMLElement).style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
      }
      // Re-enable pointer events for the modal
      const modalElement = document.querySelector('[data-modal="image-modal"]');
      if (modalElement) {
        (modalElement as HTMLElement).style.pointerEvents = 'auto';
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'auto';
      // Show navigation
      const navigation = document.querySelector('header');
      if (navigation) {
        (navigation as HTMLElement).style.opacity = '1';
        (navigation as HTMLElement).style.visibility = 'visible';
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'auto';
      // Ensure navigation is visible on cleanup
      const navigation = document.querySelector('header');
      if (navigation) {
        (navigation as HTMLElement).style.opacity = '1';
        (navigation as HTMLElement).style.visibility = 'visible';
      }
    };
  }, [isOpen]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImage = images[activeIndex];
  const isStringUrl = typeof currentImage === 'string';

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm" 
      style={{ zIndex: 99999, pointerEvents: 'auto' }}
      data-modal="image-modal"
    >
      {/* Top control buttons */}
      <div className="absolute top-4 right-4 z-[100] flex gap-2">
        {/* Zoom toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Zoom button clicked, current zoom:', isZoomed);
            setIsZoomed(!isZoomed);
          }}
          className="p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-all duration-200 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          title={isZoomed ? 'Zoom Out' : 'Zoom In'}
        >
          <FaExpand size={18} />
        </button>
        
        {/* Close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            onClose();
          }}
          className="p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-all duration-200 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          title="Close"
        >
          <FaTimes size={18} />
        </button>
      </div>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Previous button clicked');
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[100] p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-all duration-200 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Next button clicked');
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[100] p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-all duration-200 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}

      {/* Image container */}
      <div 
        className={`relative max-w-[95vw] max-h-[95vh] transition-all duration-300 ${
          isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomed(!isZoomed);
        }}
      >
        {isStringUrl ? (
          <img
            src={currentImage}
            alt={`${alt} - Image ${activeIndex + 1}`}
            className="max-w-full h-[95vh] object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <div className="relative w-full h-[95vh]">
            <Image
              src={currentImage}
              alt={`${alt} - Image ${activeIndex + 1}`}
              fill
              className="object-contain rounded-lg shadow-2xl"
              priority
            />
          </div>
        )}
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
          {activeIndex + 1} / {images.length}
        </div>
      )}

      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
};

export default ImageModal; 