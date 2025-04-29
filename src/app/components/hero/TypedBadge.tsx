"use client";

import { useState, useEffect, useRef } from 'react';

interface TypedBadgeProps {
  titles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBeforeDelete?: number;
}

/**
 * TypedBadge - A component that displays a badge with typing effect.
 * 
 * @param titles - Array of text strings to cycle through
 * @param typingSpeed - Speed of typing in milliseconds (default: 200)
 * @param deletingSpeed - Speed of text deletion in milliseconds (default: 100)
 * @param delayBeforeDelete - Time to wait before deleting text in milliseconds (default: 2000)
 */
const TypedBadge = ({ 
  titles, 
  typingSpeed = 200, 
  deletingSpeed = 100, 
  delayBeforeDelete = 2000 
}: TypedBadgeProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(typingSpeed);
  
  // Reference to track if component is mounted (prevent memory leaks)
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      // Get current title based on loop count
      const i = loopNum % titles.length;
      const fullText = titles[i];

      // Handle typing or deleting logic
      setDisplayText(isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1)
      );

      // Manage typing states and speeds
      if (!isDeleting && displayText === fullText) {
        // Pause at end of word before deleting
        setTimeout(() => {
          if (isMounted.current) setIsDeleting(true);
        }, delayBeforeDelete);
        setCurrentSpeed(deletingSpeed);
      } else if (isDeleting && displayText === '') {
        // Move to next word when current word is fully deleted
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setCurrentSpeed(typingSpeed);
      }
    };

    // Set timer based on current typing speed
    const timer = setTimeout(handleTyping, currentSpeed);
    
    // Clean up timer
    return () => clearTimeout(timer);
  }, [
    displayText, 
    isDeleting, 
    loopNum, 
    titles, 
    currentSpeed,
    typingSpeed,
    deletingSpeed,
    delayBeforeDelete
  ]);

  return (
    <span className="inline-flex items-center py-1.5 px-4 text-sm tracking-wide font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full ring-1 ring-blue-100 dark:ring-blue-800 min-w-[180px]">
      <span className="inline-block">{displayText}</span>
      <span className="inline-block w-[2px] h-[14px] bg-blue-700 dark:bg-blue-300 ml-1 animate-blink"></span>
    </span>
  );
};

export default TypedBadge; 