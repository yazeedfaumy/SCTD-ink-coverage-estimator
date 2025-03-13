port React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { PDFViewer } from '.PDFViewer';

export function FileAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF file');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {!selectedFile ? (
        <div className="flex items-center justify-center min-h-screen">
          <label className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors">
            <Upload className="w-12 h-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">Upload PDF</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={onFileSelect}
            />
          </label>
        </div>
      ) : (
        <PDFViewer file={selectedFile} />
      )}
    </div>
  );
}

export default FileAnalysis;