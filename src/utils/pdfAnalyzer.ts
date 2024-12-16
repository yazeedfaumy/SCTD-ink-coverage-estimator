import { getDocument } from 'pdfjs-dist';
import { initializePdfWorker } from './pdfWorker';
import { analyzeColorPixel, analyzeGrayscalePixel, calculateInkUsage } from './colorAnalysis';
import { renderPageToCanvas } from './canvasUtils';
import { PageData, DocumentType } from './types';

// Initialize PDF.js worker
initializePdfWorker();

export async function analyzePDF(file: File, documentType: DocumentType): Promise<PageData[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const totalPages = pdf.numPages;
  const pages: PageData[] = [];

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const { context } = await renderPageToCanvas(page);
    
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const pixels = imageData.data;
    
    let totalPixels = pixels.length / 4; // Each pixel has RGBA components
    const colorTotals = { c: 0, m: 0, y: 0, k: 0 };

    // Analyze pixels
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      
      // Include white pixels by analyzing them as part of the ink usage calculation
      if (documentType === 'color') {
        analyzeColorPixel(r, g, b, colorTotals);
      } else {
        analyzeGrayscalePixel(r, g, b, colorTotals);
      }
    }

    const inkUsage = calculateInkUsage(colorTotals, totalPixels, documentType === 'color');
    pages.push({ pageNumber: pageNum, inkUsage });
  }

  return pages;
}
