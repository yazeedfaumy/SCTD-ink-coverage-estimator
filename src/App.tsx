import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DocumentTypeSelector } from './components/DocumentTypeSelector';
import { InkUsageTable } from './components/InkUsageTable';
import { CostCalculatorModal } from './components/CostCalculatorModal';
import { FileWarning, Loader2, Calculator } from 'lucide-react';
import { analyzePDF } from './utils/pdfAnalyzer';
import { PageData, DocumentType } from './utils/types';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [isOverallCostModalOpen, setIsOverallCostModalOpen] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setDocumentType(null);
    setPages([]);
    setSelectedPage(null);
    setError(null);
  };

  const handleDocumentTypeSelect = async (type: 'color' | 'grayscale') => {
    if (!file) return;
    
    setDocumentType(type);
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const analyzedPages = await analyzePDF(file, type);
      setPages(analyzedPages);
    } catch (err) {
      setError('Error analyzing PDF. Please try a different file.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSelectedPageInkUsage = () => {
    if (!selectedPage) return 0;
    const page = pages.find((p) => p.pageNumber === selectedPage);
    if (!page) return 0;

    if (documentType === 'color') {
      const { cyan = 0, magenta = 0, yellow = 0, black = 0 } = page.inkUsage;
      return (cyan + magenta + yellow + black) / 4;
    }
    return page.inkUsage.black;
  };

  const getPagesForOverallCalculation = () => {
    return pages.map(page => ({
      inkUsage: documentType === 'color'
        ? ((page.inkUsage.cyan || 0) + (page.inkUsage.magenta || 0) + 
           (page.inkUsage.yellow || 0) + page.inkUsage.black) / 4
        : page.inkUsage.black
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ink Coverage Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate ink usage and printing costs for your PDF documents
          </p>
        </div>

        <div className="space-y-8">
          {!file && (
            <div className="flex justify-center">
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          )}

          {file && !documentType && !error && (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg font-medium text-gray-900">
                Selected file: {file.name}
              </p>
              <DocumentTypeSelector onSelect={handleDocumentTypeSelect} />
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-lg text-gray-600">Analyzing document...</p>
            </div>
          )}

          {file && documentType && pages.length > 0 && (
            <div className="space-y-8">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOverallCostModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate Overall Cost
                </button>
              </div>

              <InkUsageTable
                pages={pages}
                isColor={documentType === 'color'}
                onPageSelect={(pageNum) => {
                  setSelectedPage(pageNum);
                  setIsCostModalOpen(true);
                }}
              />

              <CostCalculatorModal
                isOpen={isCostModalOpen}
                onClose={() => setIsCostModalOpen(false)}
                inkUsage={getSelectedPageInkUsage()}
                isColor={documentType === 'color'}
              />

              <CostCalculatorModal
                isOpen={isOverallCostModalOpen}
                onClose={() => setIsOverallCostModalOpen(false)}
                inkUsage={0}
                isColor={documentType === 'color'}
                isOverall={true}
                pages={getPagesForOverallCalculation()}
              />
            </div>
          )}

          {error && (
            <div className="text-center p-8">
              <FileWarning className="mx-auto h-12 w-12 text-red-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Error
              </h3>
              <p className="mt-1 text-sm text-red-500">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;