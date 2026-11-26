import { describe, expect, it } from 'vitest';
import type { Product } from '../product.types';
import { getGalleryImages, getNextIndex } from './gallery';

const baseProduct = { thumb: 'a.webp', images: ['b.webp'] } as Product;

describe('getGalleryImages', () => {
  it('puts the thumb first, then the other images', () => {
    expect(getGalleryImages(baseProduct)).toEqual(['a.webp', 'b.webp']);
  });

  it('removes repeated and empty urls', () => {
    const product = { thumb: 'a.webp', images: ['a.webp', '', 'b.webp'] } as Product;
    expect(getGalleryImages(product)).toEqual(['a.webp', 'b.webp']);
  });

  it('returns an empty list when the product has no images', () => {
    expect(getGalleryImages({ thumb: '', images: [] } as unknown as Product)).toEqual([]);
  });
});

describe('getNextIndex', () => {
  it('moves forward and backward', () => {
    expect(getNextIndex(1, 5, 1)).toBe(2);
    expect(getNextIndex(1, 5, -1)).toBe(0);
  });

  it('goes around at the ends', () => {
    expect(getNextIndex(4, 5, 1)).toBe(0);
    expect(getNextIndex(0, 5, -1)).toBe(4);
  });
});
