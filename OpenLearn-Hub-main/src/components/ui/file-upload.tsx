import * as React from 'react';
import { useState, useCallback } from 'react';
import { Upload, X, FileText, Image, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  error?: string;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  if (type.includes('pdf') || type.includes('document')) return FileText;
  return File;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FileUpload = ({
  value,
  onChange,
  accept = '.pdf,.doc,.docx,.txt,.png,.jpg,.jpeg',
  maxSize = 10,
  className,
  error,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      const maxBytes = maxSize * 1024 * 1024;
      if (file.size > maxBytes) {
        return `File size must be less than ${maxSize}MB`;
      }
      return null;
    },
    [maxSize]
  );

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setDragError(validationError);
        return;
      }
      setDragError(null);
      onChange(file);
    },
    [onChange, validateFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    onChange(null);
    setDragError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onChange]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const FileIcon = value ? getFileIcon(value.type) : Upload;

  return (
    <div className={cn('space-y-2', className)}>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200',
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-muted/50',
          (error || dragError) && 'border-destructive bg-destructive/5',
          value && 'border-primary/30 bg-primary/5'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {value ? (
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
              <FileIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{value.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(value.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div
              className={cn(
                'flex items-center justify-center w-14 h-14 rounded-full transition-colors',
                isDragging ? 'bg-primary/20' : 'bg-muted'
              )}
            >
              <Upload
                className={cn(
                  'w-6 h-6 transition-colors',
                  isDragging ? 'text-primary' : 'text-muted-foreground'
                )}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                <span className="text-primary">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOC, TXT, PNG, JPG (max {maxSize}MB)
              </p>
            </div>
          </>
        )}
      </div>

      {(error || dragError) && (
        <p className="text-sm text-destructive">{error || dragError}</p>
      )}
    </div>
  );
};
