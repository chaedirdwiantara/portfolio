'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSliderProps {
  images: (StaticImageData | string)[];
  alt: string;
  aspectRatio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  autoplay?: boolean;
  speed?: number;
}

const ImageSlider = ({ 
  images, 
  alt, 
  aspectRatio = 'aspect-video',
  className = '', 
  sizes = '(max-width: 768px) 100vw, 66vw',
  priority = false,
  autoplay = true,
  speed = 3000
}: ImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Add custom swiper styles
  useEffect(() => {
    // Add custom styles for Swiper navigation and pagination
    const style = document.createElement('style');
    style.innerHTML = `
      .swiper-button-next, .swiper-button-prev {
        background-color: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(4px);
        width: 40px !important;
        height: 40px !important;
        border-radius: 50%;
        color: white !important;
        transition: all 0.3s ease;
      }
      
      .swiper-button-next:hover, .swiper-button-prev:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
      
      .swiper-button-next:after, .swiper-button-prev:after {
        font-size: 16px !important;
        font-weight: bold;
      }
      
      .swiper-pagination-bullet {
        width: 8px !important;
        height: 8px !important;
        background-color: white !important;
        opacity: 0.5 !important;
        transition: all 0.3s ease;
      }
      
      .swiper-pagination-bullet-active {
        opacity: 1 !important;
        transform: scale(1.2);
        background-color: white !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Don't render the slider if there's only one image or no images
  if (!images || images.length === 0) {
    return null;
  }
  
  // If there's only one image, render it directly without slider
  if (images.length === 1) {
    const image = images[0];
    const isStringUrl = typeof image === 'string';
    
    return (
      <div className={`w-full ${aspectRatio} overflow-hidden ${className}`}>
        {isStringUrl ? (
          <img
            src={image as string}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            priority={priority}
          />
        )}
      </div>
    );
  }
  
  return (
    <div className={`relative w-full ${aspectRatio} overflow-hidden ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
          bulletClass: 'swiper-pagination-bullet'
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        autoplay={autoplay ? { delay: speed, disableOnInteraction: false } : false}
        loop={true}
        className="h-full w-full group"
      >
        {images.map((image, index) => {
          const isStringUrl = typeof image === 'string';
          
          return (
            <SwiperSlide key={index} className="h-full w-full">
              {isStringUrl ? (
                <img
                  src={image as string}
                  alt={`${alt} - slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={image}
                    alt={`${alt} - slide ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes={sizes}
                    priority={index === 0 && priority}
                  />
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageSlider; 