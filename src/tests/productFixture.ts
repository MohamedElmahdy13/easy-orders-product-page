import type { Product } from '@/features/product-details/product.types';

// A small product for component tests: 2 colors x 2 sizes, stock not tracked
const colors = ['brown', 'black'];
const sizes = ['38', '40'];

export function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'p1',
    name: 'Achilles Pro',
    slug: 'achilles-pro',
    description: '<p>Nice shoes</p>',
    price: 100,
    sale_price: 80,
    thumb: 'thumb.jpg',
    images: [],
    quantity: 0,
    track_stock: false,
    categories: [],
    variations: [
      {
        id: 'v-color',
        name: 'color',
        type: 'image',
        props: colors.map((name) => ({ id: name, name, value: `${name}.jpg` })),
      },
      { id: 'v-size', name: 'size', type: 'button', props: sizes.map((name) => ({ id: name, name })) },
    ],
    variants: colors.flatMap((color) =>
      sizes.map((size) => ({
        id: `${color}-${size}`,
        price: 100,
        sale_price: 0,
        quantity: 0,
        variation_props: [
          { variation: 'color', variation_prop: color },
          { variation: 'size', variation_prop: size },
        ],
      })),
    ),
    ...overrides,
  };
}
