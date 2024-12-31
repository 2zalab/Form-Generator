import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from './types';
import FormPreview from './FormPreview';

interface FormViewProps {
  form: Form;
  onDelete: (id: number) => void;
  onBack: () => void;
  onNew: () => void;
}

const FormView = ({ form, onDelete, onBack, onNew }: FormViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Retour à la liste
        </Button>
        <Button 
          variant="outline"
          onClick={onNew}
        >
          Nouveau formulaire
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{form.name}</h2>
            <Button 
              variant="destructive"
              onClick={() => onDelete(form.id)}
            >
              Supprimer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <FormPreview elements={form.elements} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FormView;