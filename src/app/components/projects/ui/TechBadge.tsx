interface TechBadgeProps {
  technology: string;
  size?: 'sm' | 'md';
  bordered?: boolean;
}

/**
 * Reusable component for displaying technology tags/badges
 */
export default function TechBadge({ 
  technology, 
  size = 'sm',
  bordered = true 
}: TechBadgeProps) {
  const sizeClasses = size === 'sm' 
    ? 'text-xs px-3 py-1' 
    : 'text-sm px-4 py-1.5';
  
  const borderClasses = bordered 
    ? 'border border-gray-200 dark:border-gray-600' 
    : '';
  
  return (
    <span 
      className={`inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-full ${sizeClasses} ${borderClasses}`}
    >
      {technology}
    </span>
  );
} 