import { QuantitySelector } from '@/shared/ui/QuantitySelector';
import { formatPrice } from '@/shared/utils/formatPrice';
import type { Product, Variant } from '../product.types';
import { getMaxQuantity, getPrices, isInStock } from '../utils/variants';
import type { Selection } from '../utils/variants';
import { AddToCartActions } from './AddToCartActions';
import { ColorOptions } from './ColorOptions';
import { ProductDescription } from './ProductDescription';
import { SizeOptions } from './SizeOptions';
import { StockStatus } from './StockStatus';

type ProductInfoProps = {
  product: Product;
  variant?: Variant;
  selection: Selection;
  onSelectOption: (variationName: string, option: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onCheckout: () => void;
};

export function ProductInfo({
  product,
  variant,
  selection,
  onSelectOption,
  quantity,
  onQuantityChange,
  onAddToCart,
  onCheckout,
}: ProductInfoProps) {
  const { price, oldPrice } = getPrices(product, variant);
  const inStock = isInStock(product, variant);
  const colors = product.variations.find((variation) => variation.name === 'color');
  const sizes = product.variations.find((variation) => variation.name === 'size');

  return (
    <div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <h1 className="text-title font-semibold text-heading">{product.name}</h1>

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <div className="flex items-center gap-4">
              {oldPrice && <span className="text-old-price font-medium text-muted line-through">{formatPrice(oldPrice)}</span>}
              <span className="text-price font-semibold text-ink">{formatPrice(price)}</span>
            </div>
            <StockStatus product={product} variant={variant} />
          </div>
        </div>

        <hr className="border-0 border-t-[0.5px] border-dashed border-divider" />

        <div className="flex flex-col gap-10">
          <ProductDescription html={product.description} />

          {colors && (
            <ColorOptions
              variation={colors}
              selected={selection.color}
              onSelect={(option) => onSelectOption('color', option)}
            />
          )}
          {sizes && (
            <SizeOptions
              variation={sizes}
              selected={selection.size}
              onSelect={(option) => onSelectOption('size', option)}
            />
          )}

          <div className="flex flex-col gap-[18px]">
            <p className="text-label leading-[1.2] font-medium text-subtle">Quantity:</p>
            <QuantitySelector
              value={quantity}
              onChange={onQuantityChange}
              max={getMaxQuantity(product, variant)}
              className="self-start"
            />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <AddToCartActions disabled={!inStock} onAddToCart={onAddToCart} onCheckout={onCheckout} />
      </div>
    </div>
  );
}
