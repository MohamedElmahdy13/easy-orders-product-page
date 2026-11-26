import type { Product, Variant } from '../product.types';

// Selected option for each variation, e.g. { color: 'brown', size: '38' }
export type Selection = Record<string, string>;

// When the product does not track stock we still need a limit for the quantity selector
export const MAX_QUANTITY_WITHOUT_STOCK = 10;

// Start with the first option of every variation (first color, first size)
export function getDefaultSelection(product: Product): Selection {
  const selection: Selection = {};

  for (const variation of product.variations) {
    selection[variation.name] = variation.props[0].name;
  }

  return selection;
}

// The variant whose options match every selected option. Products without variations have none.
export function findVariant(product: Product, selection: Selection): Variant | undefined {
  return product.variants.find((variant) =>
    variant.variation_props.every((prop) => selection[prop.variation] === prop.variation_prop),
  );
}

export function getPrices(product: Product, variant?: Variant) {
  const regularPrice = variant?.price ?? product.price;
  // A variant sale_price of 0 means the variant has no sale of its own, so use the product's
  const salePrice = variant?.sale_price || product.sale_price;
  const hasSale = salePrice > 0 && salePrice < regularPrice;

  return {
    price: hasSale ? salePrice : regularPrice,
    oldPrice: hasSale ? regularPrice : null,
  };
}

export function getMaxQuantity(product: Product, variant?: Variant): number {
  if (!product.track_stock) return MAX_QUANTITY_WITHOUT_STOCK;

  return variant ? variant.quantity : product.quantity;
}

export function isInStock(product: Product, variant?: Variant): boolean {
  return getMaxQuantity(product, variant) > 0;
}

// Can this option still be bought together with the other selected options?
// Without stock tracking everything is available.
export function isOptionAvailable(product: Product, selection: Selection, variationName: string, option: string): boolean {
  if (!product.track_stock) return true;

  const wanted = { ...selection, [variationName]: option };
  const variant = findVariant(product, wanted);

  return variant ? variant.quantity > 0 : false;
}

// The API can send the same category twice (with different ids), so list each name once
export function getCategoryNames(product: Product): string[] {
  return [...new Set(product.categories.map((category) => category.name))];
}
