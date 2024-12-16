import React from 'react';
import { Palette, FileText } from 'lucide-react';

interface DocumentTypeSelectorProps {
  onSelect: (type: 'color' | 'grayscale') => void;
}

export function DocumentTypeSelector({ onSelect }: DocumentTypeSelectorProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onSelect('color')}
        className="flex flex-col items-center p-4 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
      >
        <Palette className="w-8 h-8 mb-2 text-blue-500" />
        <span className="text-sm font-medium">Color Document</span>
      </button>
      <button
        onClick={() => onSelect('grayscale')}
        className="flex flex-col items-center p-4 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
      >
        <FileText className="w-8 h-8 mb-2 text-gray-600" />
        <span className="text-sm font-medium">Grayscale Document</span>
      </button>
    </div>
  );
}