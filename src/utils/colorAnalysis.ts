import convert from 'color-convert';

interface ColorTotals {
  c: number;
  m: number;
  y: number;
  k: number;
}

export function analyzeColorPixel(r: number, g: number, b: number, colorTotals: ColorTotals): void {
  const cmyk = convert.rgb.cmyk([r, g, b]);
  colorTotals.c += cmyk[0];
  colorTotals.m += cmyk[1];
  colorTotals.y += cmyk[2];
  colorTotals.k += cmyk[3];
}

export function analyzeGrayscalePixel(r: number, g: number, b: number, colorTotals: ColorTotals): void {
  const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
  colorTotals.k += (255 - grayscale) / 255 * 100;
}

export function calculateInkUsage(colorTotals: ColorTotals, totalPixels: number, isColor: boolean) {
  const normalizedTotal = totalPixels || 1; // Prevent division by zero
  
  return isColor ? {
    cyan: colorTotals.c / normalizedTotal,
    magenta: colorTotals.m / normalizedTotal,
    yellow: colorTotals.y / normalizedTotal,
    black: colorTotals.k / normalizedTotal,
  } : {
    black: colorTotals.k / normalizedTotal,
  };
}