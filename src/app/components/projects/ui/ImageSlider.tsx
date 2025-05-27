'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

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
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        autoplay={autoplay ? { delay: speed, disableOnInteraction: false } : false}
        loop={true}
        className="h-full w-full"
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
      
      {/* Custom pagination indicator */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5">
        {images.map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider; 