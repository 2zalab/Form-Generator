import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from './types';

interface FormsListProps {
  forms: Form[];
  onView: (form: Form) => void;
}

const FormsList = ({ forms, onView }: FormsListProps) => {
  if (forms.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">Aucun formulaire enregistré</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {forms.map(form => (
        <Card key={form.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">{form.name}</h3>
            <p className="text-sm text-gray-500">
              {form.elements.length} élément{form.elements.length > 1 ? 's' : ''}
            </p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => onView(form)}
              className="w-full"
            >
              Voir le formulaire
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FormsList;