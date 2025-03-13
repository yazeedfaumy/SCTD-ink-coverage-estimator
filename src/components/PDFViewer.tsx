import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Upload, File, Check, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
}

interface PageData {
  pageNumber: number;
  colorMode: 'color' | 'grayscale';
  dpi: number;
  dimensions: {
    width: number;
    height: number;
  };
  cmyk?: {
    cyan: number;
    magenta: number;
    yellow: number;
    key: number;
  };
  grayscale?: {
    key: number;
  };
}

export function PDFViewer({ file: initialFile }: PDFViewerProps) {
  const [file, setFile] = useState<File | null>(initialFile);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'color' | 'greyscale' | 'cyan' | 'magenta' | 'yellow' | 'key'>('color');
  const [activePage, setActivePage] = useState<string>('all');
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string }>({ name: '', size: '' });
  const [colorMode, setColorMode] = useState<'color' | 'grayscale'>('color');
  const [pageData, setPageData] = useState<PageData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  useEffect(() => {
    if (file) {
      setFileInfo({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
      setError(null);
    }
  }, [file]);

  const analyzePage = async (pageNumber: number, pdf: any) => {
    try {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.0 });
      const canvas = canvasRef.current;
      if (!canvas) return null;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');
      if (!context) return null;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      let totalPixels = canvas.width * canvas.height;
      let cTotal = 0, mTotal = 0, yTotal = 0, kTotal = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i] / 255;
        const g = pixels[i + 1] / 255;
        const b = pixels[i + 2] / 255;

        const k = 1 - Math.max(r, g, b);
        const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
        const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
        const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

        cTotal += c;
        mTotal += m;
        yTotal += y;
        kTotal += k;
      }

      const cmyk = {
        cyan: (cTotal / totalPixels) * 100,
        magenta: (mTotal / totalPixels) * 100,
        yellow: (yTotal / totalPixels) * 100,
        key: (kTotal / totalPixels) * 100,
      };

      const grayscale = {
        key: (kTotal / totalPixels) * 100,
      };

      const dpi = Math.round((viewport.width * 72) / page.getViewport({ scale: 1.0 }).width);

      return {
        pageNumber,
        colorMode: 'color',
        dpi,
        dimensions: {
          width: viewport.width,
          height: viewport.height,
        },
        cmyk,
        grayscale,
      };
    } catch (error) {
      console.error(`Error analyzing page ${pageNumber}:`, error);
      return null;
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    try {
      const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
      const numPages = pdf.numPages;
      setNumPages(numPages);
      
      const pagesData: PageData[] = [];
      for (let i = 1; i <= numPages; i++) {
        const pageAnalysis = await analyzePage(i, pdf);
        if (pageAnalysis) {
          pagesData.push(pageAnalysis);
        }
      }
      
      setPageData(pagesData);
      setError(null);
    } catch (error) {
      console.error('Error analyzing document:', error);
      setError('Failed to analyze the PDF. Please try a different file.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getChartData = () => {
    return pageData.map(page => ({
      name: `Page ${page.pageNumber}`,
      ...(colorMode === 'color' && page.cmyk
        ? page.cmyk
        : { key: page.grayscale?.key || 0 }),
    }));
  };

  if (!file) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-green-800">File Analysis</h1>
        <div
          className={`border-2 border-dashed rounded-lg p-10 text-center ${
            isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="h-12 w-12 text-green-600" />
            <h2 className="text-xl font-medium text-gray-900">
              Upload a File for Analysis
            </h2>
            <p className="text-gray-500 max-w-md">
              Drag and drop your PDF file here, or click to browse your files
            </p>