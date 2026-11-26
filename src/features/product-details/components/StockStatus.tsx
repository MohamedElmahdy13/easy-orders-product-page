import { cn } from '@/shared/utils/cn';
import type { Product, Variant } from '../product.types';
import { getMaxQuantity, isInStock } from '../utils/variants';

const LOW_STOCK_LIMIT = 5;

export function StockStatus({ product, variant }: { product: Product; variant?: Variant }) {
  const inStock = isInStock(product, variant);
  const left = getMaxQuantity(product, variant);
  const isLow = product.track_stock && inStock && left <= LOW_STOCK_LIMIT;

  let label = 'In stock';
  if (!inStock) label = 'Out of stock';
  else if (isLow) label = `Only ${left} left`;

  return (
    <p className="flex items-center gap-2 text-body font-medium text-muted" role="status">
      <span className={cn('size-2 rounded-full', inStock ? (isLow ? 'bg-star' : 'bg-green-600') : 'bg-red-600')} />
      {label}
    </p>
  );
}
