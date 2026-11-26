import type { Product } from '../product.types';

const API_URL = import.meta.env.VITE_API_URL;

export async function getProductBySlug(slug: string, signal?: AbortSignal): Promise<Product> {
  const response = await fetch(`${API_URL}/products/slug/clear-theme/${slug}?join=reviews`, { signal });

  if (!response.ok) {
    throw new Error(`Could not load the product (${response.status})`);
  }

  return response.json();
}
