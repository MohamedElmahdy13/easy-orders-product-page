import type { Product } from '../product.types';

// Main thumbnail first, then the other images, without empty or repeated urls
export function getGalleryImages(product: Product): string[] {
  const all = [product.thumb, ...product.images].filter(Boolean);

  return [...new Set(all)];
}

// Previous / next image, going around at the ends
export function getNextIndex(current: number, total: number, step: 1 | -1): number {
  return (current + step + total) % total;
}
