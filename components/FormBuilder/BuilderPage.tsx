'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FormElement } from './types';
import FormPreview from './FormPreview';

interface BuilderPageProps {
  onSave: (name: string, elements: FormElement[]) => void;
}

const BuilderPage = ({ onSave }: BuilderPageProps) => {
  const [formName, setFormName] = useState('');
  const [elements, setElements] = useState<FormElement[]>([]);
  const [label, setLabel] = useState('');
  const [selectedType, setSelectedType] = useState('input');
  const [options, setOptions] = useState('');
  const [required, setRequired] = useState(false);

  const addElement = () => {
    if (!label) return;
    
    const newElement: FormElement = {
      id: Date.now(),
      type: selectedType,
      label,
      required,
      options: (selectedType === 'select' || selectedType === 'radio' || selectedType === 'checkbox') 
        ? options.split(',').map(opt => opt.trim())
        : undefined
    };

    setElements([...elements, newElement]);
    setLabel('');
    setOptions('');
    setRequired(false);
  };

  const handleSave = () => {
    if (!formName || elements.length === 0) return;
    onSave(formName, elements);
    setFormName('');
    setElements([]);
  };

  const handleCancel = () => {
    setFormName('');
    setElements([]);
    setLabel('');
    setOptions('');
    setRequired(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Créer un nouveau formulaire
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ajoutez des éléments pour construire votre formulaire
          </p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="text-base">Nom du formulaire</Label>
              <Input 
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Entrez le nom du formulaire"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-base">Type d&apos;élément</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="input">Champ texte</SelectItem>
                  <SelectItem value="textarea">Zone de texte</SelectItem>
                  <SelectItem value="select">Liste déroulante</SelectItem>
                  <SelectItem value="radio">Boutons radio</SelectItem>
                  <SelectItem value="checkbox">Cases à cocher</SelectItem>
                  <SelectItem value="file">Upload de fichier</SelectItem>
                  <SelectItem value="submit">Bouton de soumission</SelectItem>
                </SelectContent>
              </Select>
            </div>
          
            <div>
              <Label className="text-base">Label</Label>
              <Input 
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Entrez le label"
                className="mt-1"
              />
            </div>

            {(selectedType === 'select' || selectedType === 'radio' || selectedType === 'checkbox') && (
              <div className="sm:col-span-2">
                <Label className="text-base">Options (séparées par des virgules)</Label>
                <Input
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  placeholder="Option1, Option2, Option3"
                  className="mt-1"
                />
              </div>
            )}

            {selectedType === 'file' && (
              <div className="sm:col-span-2">
                <Label className="text-base">Types de fichiers acceptés</Label>
                <Input
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  placeholder=".pdf,.doc,.docx"
                  className="mt-1"
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="required"
                  checked={required}
                  onCheckedChange={(checked) => setRequired(checked as boolean)}
                />
                <Label htmlFor="required" className="text-base">Champ obligatoire</Label>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={addElement} className="flex-1">
              Ajouter l&apos;élément
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>

      {elements.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Aperçu du formulaire
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <FormPreview elements={elements} />
            <div className="mt-6 flex gap-4">
              <Button onClick={handleSave} className="flex-1">
                Sauvegarder le formulaire
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex-1">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BuilderPage;