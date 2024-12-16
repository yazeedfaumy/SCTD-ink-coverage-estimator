export interface InkUsage {
  cyan?: number;
  magenta?: number;
  yellow?: number;
  black: number;
}

export interface PageData {
  pageNumber: number;
  inkUsage: InkUsage;
}

export type DocumentType = 'color' | 'grayscale' | null;