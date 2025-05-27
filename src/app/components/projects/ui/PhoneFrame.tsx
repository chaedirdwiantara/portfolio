import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { FaApple, FaAndroid } from 'react-icons/fa';

interface PhoneFrameProps {
  image: StaticImageData | string;
  alt: string;
  platforms?: ('ios' | 'android')[];
  priority?: boolean;
  imageSize?: string;
  frameSize?: string | { width: string, height: string };
  showPlatformBadges?: boolean;
}

/**
 * A reusable phone frame component for displaying mobile app screenshots
 */
export default function PhoneFrame({
  image,
  alt,
  platforms,
  priority = false,
  imageSize = "200px",
  frameSize = "45%",
  showPlatformBadges = true
}: PhoneFrameProps) {
  const isStringUrl = typeof image === 'string';
  
  return (
    <div className="relative h-full mx-auto" style={typeof frameSize === 'string' ? { width: frameSize } : { width: frameSize.width, height: frameSize.height }}>
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[24px] border-[8px] border-gray-800 dark:border-gray-600 z-20 overflow-hidden shadow-lg">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-black z-30"></div>
        
        {/* App screenshot with subtle overlay for consistency */}
        <div className="absolute inset-0">
          {isStringUrl ? (
            <img
              src={image as string}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
            />
          ) : (
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover rounded-[16px]"
              sizes={imageSize}
              priority={priority}
            />
          )}
          {/* Subtle overlay inside phone frame for consistency */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
        </div>
      </div>
      
      {/* Platform indicators */}
      {showPlatformBadges && platforms && (
        <div className="absolute top-2 right-2 z-30 flex gap-1">
          {platforms.includes('ios') && (
            <div className="bg-black/80 p-1 rounded-full">
              <FaApple className="text-white" size={12} />
            </div>
          )}
          {platforms.includes('android') && (
            <div className="bg-black/80 p-1 rounded-full">
              <FaAndroid className="text-white" size={12} />
            </div>
          )}
        </div>
      )}
    </div>
  );
} 