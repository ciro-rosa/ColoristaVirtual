import React from 'react';
import { cn } from '../../lib/utils';
import { getInitials } from '../../lib/utils';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ 
    className, 
    size = 'md', 
    src, 
    alt, 
    name,
    fallback,
    ...props 
  }, ref) => {
    const [error, setError] = React.useState(false);
    
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };
    
    const fontSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    };
    
    const handleError = () => {
      setError(true);
    };
    
    return (
      <div className={cn('relative rounded-full overflow-hidden flex items-center justify-center bg-blue-100', sizes[size], className)}>
        {!error && src ? (
          <img
            ref={ref}
            src={src}
            alt={alt || name || 'Avatar'}
            className="h-full w-full object-cover"
            onError={handleError}
            {...props}
          />
        ) : (
          <div className={cn('flex items-center justify-center text-blue-700 font-medium', fontSizes[size])}>
            {fallback || (name ? getInitials(name) : 'UN')}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;