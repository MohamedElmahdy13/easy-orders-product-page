import { describe, expect, it } from 'vitest';
import type { Product, Variant } from '../product.types';
import {
  findVariant,
  getDefaultSelection,
  getCategoryNames,
  getMaxQuantity,
  getPrices,
  isInStock,
  isOptionAvailable,
  MAX_QUANTITY_WITHOUT_STOCK,
} from './variants';

function makeVariant(color: string, size: string, overrides: Partial<Variant> = {}): Variant {
  return {
    id: `${color}-${size}`,
    price: 190,
    sale_price: 0,
    quantity: 0,
    variation_props: [
      { variation: 'color', variation_prop: color },
      { variation: 'size', variation_prop: size },
    ],
    ...overrides,
  };
}

const product: Product = {
  id: 'p1',
  name: 'Achilles Pro',
  slug: 'Sneakers12',
  description: '',
  price: 190,
  sale_price: 160,
  thumb: '',
  images: [],
  quantity: 0,
  track_stock: false,
  variations: [
    {
      id: 'v1',
      name: 'color',
      type: 'image',
      props: [
        { id: 'c1', name: 'brown', value: 'brown.webp' },
        { id: 'c2', name: 'black', value: 'black.webp' },
      ],
    },
    {
      id: 'v2',
      name: 'size',
      type: 'button',
      props: [
        { id: 's1', name: '38' },
        { id: 's2', name: '40' },
      ],
    },
  ],
  categories: [],
  variants: [
    makeVariant('brown', '38'),
    makeVariant('brown', '40'),
    makeVariant('black', '38'),
    makeVariant('black', '40'),
  ],
};

describe('getDefaultSelection', () => {
  it('picks the first option of every variation', () => {
    expect(getDefaultSelection(product)).toEqual({ color: 'brown', size: '38' });
  });

  it('returns an empty selection when the product has no variations', () => {
    expect(getDefaultSelection({ ...product, variations: [] })).toEqual({});
  });
});

describe('findVariant', () => {
  it('finds the variant that matches the selected color and size', () => {
    expect(findVariant(product, { color: 'black', size: '40' })?.id).toBe('black-40');
  });

  it('returns undefined when nothing matches', () => {
    expect(findVariant(product, { color: 'red', size: '40' })).toBeUndefined();
  });

  it('returns undefined when the product has no variants', () => {
    expect(findVariant({ ...product, variants: [] }, {})).toBeUndefined();
  });
});

describe('getPrices', () => {
  it('uses the product sale price when the variant has no sale price', () => {
    const variant = makeVariant('brown', '38');
    expect(getPrices(product, variant)).toEqual({ price: 160, oldPrice: 190 });
  });

  it('uses the variant sale price when it has one', () => {
    const variant = makeVariant('brown', '38', { sale_price: 150 });
    expect(getPrices(product, variant)).toEqual({ price: 150, oldPrice: 190 });
  });

  it('uses the variant price as the old price', () => {
    const variant = makeVariant('brown', '38', { price: 200 });
    expect(getPrices(product, variant)).toEqual({ price: 160, oldPrice: 200 });
  });

  it('falls back to the product prices when there is no variant', () => {
    expect(getPrices(product)).toEqual({ price: 160, oldPrice: 190 });
  });

  it('shows no old price when there is no sale', () => {
    expect(getPrices({ ...product, sale_price: 0 })).toEqual({ price: 190, oldPrice: null });
  });

  it('ignores a sale price that is not lower than the regular price', () => {
    expect(getPrices({ ...product, sale_price: 190 })).toEqual({ price: 190, oldPrice: null });
  });
});

describe('getMaxQuantity and isInStock', () => {
  it('caps the quantity when stock is not tracked, even if quantity is 0', () => {
    const variant = makeVariant('brown', '38');
    expect(getMaxQuantity(product, variant)).toBe(MAX_QUANTITY_WITHOUT_STOCK);
    expect(isInStock(product, variant)).toBe(true);
  });

  it('uses the variant stock when stock is tracked', () => {
    const tracked = { ...product, track_stock: true };
    const variant = makeVariant('brown', '38', { quantity: 4 });
    expect(getMaxQuantity(tracked, variant)).toBe(4);
    expect(isInStock(tracked, variant)).toBe(true);
  });

  it('is out of stock when tracked stock is 0', () => {
    const tracked = { ...product, track_stock: true };
    const variant = makeVariant('brown', '38', { quantity: 0 });
    expect(isInStock(tracked, variant)).toBe(false);
  });

  it('uses the product stock when tracked and there is no variant', () => {
    expect(getMaxQuantity({ ...product, track_stock: true, quantity: 7 })).toBe(7);
  });
});

describe('isOptionAvailable', () => {
  const tracked: Product = {
    ...product,
    track_stock: true,
    variants: [
      makeVariant('brown', '38', { quantity: 2 }),
      makeVariant('brown', '40', { quantity: 0 }),
      makeVariant('black', '38', { quantity: 0 }),
      makeVariant('black', '40', { quantity: 5 }),
    ],
  };

  it('is always available when stock is not tracked', () => {
    expect(isOptionAvailable(product, { color: 'brown', size: '38' }, 'size', '40')).toBe(true);
  });

  it('disables a size that is out of stock for the selected color', () => {
    const selection = { color: 'brown', size: '38' };
    expect(isOptionAvailable(tracked, selection, 'size', '38')).toBe(true);
    expect(isOptionAvailable(tracked, selection, 'size', '40')).toBe(false);
  });

  it('disables a color that is out of stock for the selected size', () => {
    const selection = { color: 'brown', size: '38' };
    expect(isOptionAvailable(tracked, selection, 'color', 'black')).toBe(false);
  });

  it('is not available when no variant matches', () => {
    expect(isOptionAvailable(tracked, { color: 'brown', size: '38' }, 'size', '44')).toBe(false);
  });
});

describe('getCategoryNames', () => {
  it('lists each category name once', () => {
    const withCategories = {
      ...product,
      categories: [
        { id: '1', name: 'Mules' },
        { id: '2', name: 'Mules' },
        { id: '3', name: 'Sneakers' },
      ],
    };
    expect(getCategoryNames(withCategories)).toEqual(['Mules', 'Sneakers']);
  });
});
