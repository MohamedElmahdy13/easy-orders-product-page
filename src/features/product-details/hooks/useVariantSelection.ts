import { useState } from 'react';
import type { Product } from '../product.types';
import { findVariant, getDefaultSelection, getMaxQuantity } from '../utils/variants';
import type { Selection } from '../utils/variants';

// Keeps what the shopper picked (color, size, quantity).
// The variant and the max quantity are worked out from it, not stored.
export function useVariantSelection(product: Product) {
  const [selection, setSelection] = useState<Selection>(() => getDefaultSelection(product));
  const [quantity, setQuantity] = useState(1);

  const variant = findVariant(product, selection);
  const maxQuantity = getMaxQuantity(product, variant);

  function selectOption(variationName: string, option: string) {
    setSelection((current) => ({ ...current, [variationName]: option }));
  }

  return {
    selection,
    variant,
    selectOption,
    // A smaller stock on the new size must not leave a bigger quantity selected
    quantity: Math.max(1, Math.min(quantity, maxQuantity)),
    setQuantity,
  };
}
