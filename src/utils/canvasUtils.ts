export async function renderPageToCanvas(page: any, scale = 1.0) {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  
  if (!context) {
    throw new Error('Could not get canvas context');
  }
  
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  await page.render({
    canvasContext: context,
    viewport,
  }).promise;
  
  return { canvas, context };
}