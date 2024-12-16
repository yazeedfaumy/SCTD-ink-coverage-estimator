import { GlobalWorkerOptions } from 'pdfjs-dist';

// Import the worker directly from node_modules
import worker from 'pdfjs-dist/build/pdf.worker.min?url';

export function initializePdfWorker() {
  GlobalWorkerOptions.workerSrc = worker;
}