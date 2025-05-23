import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import Button from './Button';

interface ImageUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  preview?: string;
  onChange?: (file: File | null) => void;
  onPreviewChange?: (preview: string | null) => void;
}

const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  ({
    className,
    label,
    error,
    preview,
    onChange,
    onPreviewChange,
    ...props
  }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreviewUrl(result);
          onPreviewChange?.(result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
        onPreviewChange?.(null);
      }
      
      if (onChange) {
        onChange(file);
      }
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onChange?.(null);
      onPreviewChange?.(null);
    };

    return (
      <div className={cn('flex flex-col space-y-1.5', className)}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div 
          onClick={handleClick}
          className={cn(
            'relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors',
            previewUrl ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100',
            error && 'border-red-300'
          )}
        >
          {previewUrl ? (
            <div className="relative w-full h-full">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-md" 
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="mt-2 text-sm text-gray-500">Clique para adicionar imagem</span>
              <span className="mt-1 text-xs text-gray-400">JPG, PNG, GIF</span>
            </>
          )}
        </div>
        <input
          type="file"
          ref={mergeRefs(ref, fileInputRef)}
          onChange={handleChange}
          className="hidden"
          accept="image/*"
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

// Utility function to merge refs
function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T>).current = value;
      }
    });
  };
}

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;