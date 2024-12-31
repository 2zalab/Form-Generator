'use client'
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormElement } from './types';
import FileUpload from './FileUpload';

interface FormPreviewProps {
  elements: FormElement[];
}

const FormPreview = ({ elements }: FormPreviewProps) => {
  const renderFormElement = (element: FormElement) => {
    switch (element.type) {
      case 'input':
        return (
          <div key={element.id} className="space-y-2">
            <Label className="text-base">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <Input required={element.required} placeholder={`Entrez ${element.label.toLowerCase()}`} />
          </div>
        );

      case 'textarea':
        return (
          <div key={element.id} className="space-y-2">
            <Label className="text-base">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea 
              required={element.required} 
              placeholder={`Entrez ${element.label.toLowerCase()}`}
              className="min-h-[100px]"
            />
          </div>
        );

      case 'select':
        return (
          <div key={element.id} className="space-y-2">
            <Label className="text-base">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <Select required={element.required}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                {element.options?.map((opt, idx) => (
                  <SelectItem key={idx} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'radio':
        return (
          <div key={element.id} className="space-y-2">
            <Label className="text-base">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <RadioGroup className="space-y-2">
              {element.options?.map((opt, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <RadioGroupItem value={opt} id={`${element.id}-${idx}`} />
                  <Label 
                    htmlFor={`${element.id}-${idx}`}
                    className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'checkbox':
        return (
          <div key={element.id} className="space-y-2">
            <div className="flex items-center space-x-3">
              <Checkbox id={`checkbox-${element.id}`} required={element.required} />
              <Label 
                htmlFor={`checkbox-${element.id}`}
                className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {element.label} {element.required && <span className="text-red-500">*</span>}
              </Label>
            </div>
            {element.options && (
              <div className="ml-6 space-y-2">
                {element.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <Checkbox id={`${element.id}-${idx}`} />
                    <Label 
                      htmlFor={`${element.id}-${idx}`}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {opt}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={element.id} className="space-y-2">
            <FileUpload
              label={element.label}
              required={element.required}
              acceptedTypes={element.options?.[0]}
            />
          </div>
        );

      case 'submit':
        return (
          <div key={element.id} className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {element.label || 'Envoyer'}
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Annuler
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {elements.map(renderFormElement)}
    </form>
  );
};

export default FormPreview;