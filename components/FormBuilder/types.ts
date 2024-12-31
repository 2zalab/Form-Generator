export interface FormElement {
    id: number;
    type: string;
    label: string;
    required?: boolean;
    options?: string[];
    acceptedTypes?: string;
  }
  
  export interface Form {
    id: number;
    name: string;
    elements: FormElement[];
  }

  export interface FileUploadProps {
    label: string;
    required?: boolean;
    acceptedTypes?: string;
    onChange?: (files: FileList | null) => void;
  }
  
