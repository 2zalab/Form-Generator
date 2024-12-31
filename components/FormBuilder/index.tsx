'use client'
import React, { useState, useEffect } from 'react';
import BuilderPage from './BuilderPage';
import FormsList from './FormsList';
import FormView from './FormView';

interface FormElement {
  id: number;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
}

interface Form {
  id: number;
  name: string;
  elements: FormElement[];
}

const FormBuilder = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [currentView, setCurrentView] = useState<'builder' | 'list' | 'view'>('builder');
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  useEffect(() => {
    const savedForms = localStorage.getItem('savedForms');
    if (savedForms) {
      setForms(JSON.parse(savedForms));
    }
  }, []);

  const saveForm = (name: string, elements: FormElement[]) => {
    const newForm: Form = {
      id: Date.now(),
      name,
      elements
    };
    const updatedForms = [...forms, newForm];
    setForms(updatedForms);
    localStorage.setItem('savedForms', JSON.stringify(updatedForms));
    setCurrentView('list');
  };

  const deleteForm = (formId: number) => {
    const updatedForms = forms.filter(form => form.id !== formId);
    setForms(updatedForms);
    localStorage.setItem('savedForms', JSON.stringify(updatedForms));
    setCurrentView('list');
  };

  const handleViewForm = (form: Form) => {
    setSelectedForm(form);
    setCurrentView('view');
  };

  const renderView = () => {
    switch (currentView) {
      case 'builder':
        return <BuilderPage onSave={saveForm} />;
      case 'list':
        return <FormsList forms={forms} onView={handleViewForm} />;
      case 'view':
        return selectedForm && (
          <FormView 
            form={selectedForm} 
            onDelete={deleteForm}
            onBack={() => setCurrentView('list')}
            onNew={() => setCurrentView('builder')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Gestionnaire de formulaires</h1>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentView('builder')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Nouveau formulaire
              </button>
              <button
                onClick={() => setCurrentView('list')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Liste des formulaires
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
    </div>
  );
};

export default FormBuilder;