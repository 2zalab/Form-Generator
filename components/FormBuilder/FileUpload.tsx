/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { FileUploadProps } from './types';

const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  required = false, 
  acceptedTypes = '',
  onChange 
}) => {
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onChange?.(files);
    }
  };

  return (
    <div className="w-full space-y-2">
      <Label className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="flex flex-col items-center justify-center w-full">
        <label 
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
            </p>
            {acceptedTypes && (
              <p className="text-xs text-gray-500">
                Formats acceptés : {acceptedTypes}
              </p>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={acceptedTypes}
            onChange={handleChange}
            required={required}
          />
        </label>
        
        {fileName && (
          <div className="mt-2 text-sm text-gray-500">
            Fichier sélectionné: {fileName}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;