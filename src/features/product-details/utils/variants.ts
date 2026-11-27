import type { Product, Variant } from '../product.types';

// Selected option for each variation, e.g. { color: 'brown', size: '38' }
export type Selection = Record<string, string>;

// When the product does not track stock we still need a limit for the quantity selector
export const MAX_QUANTITY_WITHOUT_STOCK = 10;

// Can this variant be bought? Without stock tracking every variant can.
function isPurchasable(product: Product, variant: Variant): boolean {
  return !product.track_stock || variant.quantity > 0;
}

function selectionFromVariant(variant: Variant): Selection {
  return Object.fromEntries(variant.variation_props.map((prop) => [prop.variation, prop.variation_prop]));
}

// Start with the first variant that can be bought, or the first option of every variation
export function getDefaultSelection(product: Product): Selection {
  const firstPurchasable = product.variants.find((variant) => isPurchasable(product, variant));
  if (firstPurchasable) return selectionFromVariant(firstPurchasable);

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
  // The selected options do not match any variant, so there is nothing to buy
  if (product.variants.length > 0 && !variant) return 0;
  if (!product.track_stock) return MAX_QUANTITY_WITHOUT_STOCK;

  return variant ? variant.quantity : product.quantity;
}

export function isInStock(product: Product, variant?: Variant): boolean {
  return getMaxQuantity(product, variant) > 0;
}

// An option is available when at least one variant with that option can be bought
export function isOptionAvailable(product: Product, variationName: string, option: string): boolean {
  return product.variants.some(
    (variant) =>
      isPurchasable(product, variant) &&
      variant.variation_props.some((prop) => prop.variation === variationName && prop.variation_prop === option),
  );
}

// The selection after the shopper picks an option. If that option does not exist with the other
// selected options (or is sold out), switch the others to the first variant that has it.
export function selectOption(product: Product, selection: Selection, variationName: string, option: string): Selection {
  const wanted = { ...selection, [variationName]: option };
  const variant = findVariant(product, wanted);
  if (variant && isPurchasable(product, variant)) return wanted;

  const alternative = product.variants.find(
    (candidate) =>
      isPurchasable(product, candidate) &&
      candidate.variation_props.some((prop) => prop.variation === variationName && prop.variation_prop === option),
  );

  return alternative ? selectionFromVariant(alternative) : wanted;
}

// The API can send the same category twice (with different ids), so list each name once
export function getCategoryNames(product: Product): string[] {
  return [...new Set(product.categories.map((category) => category.name))];
}
