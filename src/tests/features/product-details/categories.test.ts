import { describe, expect, it } from 'vitest';
import type { Product } from '@/features/product-details/product.types';
import { getCategoryNames } from '@/features/product-details/utils/categories';

describe('getCategoryNames', () => {
  it('lists each category name once', () => {
    const product = {
      categories: [
        { id: '1', name: 'Mules' },
        { id: '2', name: 'Mules' },
        { id: '3', name: 'Sneakers' },
      ],
    } as Product;

    expect(getCategoryNames(product)).toEqual(['Mules', 'Sneakers']);
  });
});
