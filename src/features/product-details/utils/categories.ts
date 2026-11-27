import type { Product } from '../product.types';

// The API can send the same category twice (with different ids), so list each name once
export function getCategoryNames(product: Product): string[] {
  return [...new Set(product.categories.map((category) => category.name))];
}
