import React from 'react';
import { cn } from '../../lib/utils';

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = 'default', 
    icon, 
    title,
    description,
    action,
    children,
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-gray-50 border-gray-200 text-gray-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-md border p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex-shrink-0 mt-0.5">{icon}</div>
          )}
          <div className="flex-grow">
            {title && (
              <h5 className="mb-1 font-medium">{title}</h5>
            )}
            {description && (
              <div className="text-sm opacity-90">{description}</div>
            )}
            {children}
          </div>
          {action && (
            <div className="flex-shrink-0">{action}</div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;