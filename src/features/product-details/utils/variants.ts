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

// The first variation (color) is the main choice. The others (size) depend on it.
function getMainVariationName(product: Product): string {
  return product.variations[0]?.name ?? '';
}

// Does the variant have every option in `wanted`?
function hasOptions(variant: Variant, wanted: Selection): boolean {
  return Object.entries(wanted).every(([variationName, option]) =>
    variant.variation_props.some((prop) => prop.variation === variationName && prop.variation_prop === option),
  );
}

// A color is available when one of its variants can be bought.
// A size is available when it can be bought together with the selected color.
export function isOptionAvailable(product: Product, selection: Selection, variationName: string, option: string): boolean {
  const mainName = getMainVariationName(product);
  const mainOption = selection[mainName];

  const wanted: Selection =
    variationName === mainName || !mainOption
      ? { [variationName]: option }
      : { [mainName]: mainOption, [variationName]: option };

  return product.variants.some((variant) => isPurchasable(product, variant) && hasOptions(variant, wanted));
}

// The selection after the shopper picks an option. When the color changes, a chosen size that does
// not exist for the new color is cleared, so the shopper picks another one.
export function getSelectionAfterPick(product: Product, selection: Selection, variationName: string, option: string): Selection {
  const next = { ...selection, [variationName]: option };
  if (variationName !== getMainVariationName(product)) return next;

  for (const variation of product.variations.slice(1)) {
    const chosen = next[variation.name];
    if (chosen && !isOptionAvailable(product, next, variation.name, chosen)) {
      delete next[variation.name];
    }
  }

  return next;
}
