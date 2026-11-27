import { Divider } from '@/shared/ui/Divider';
import { QuantitySelector } from '@/shared/ui/QuantitySelector';
import { formatPrice } from '@/shared/utils/formatPrice';
import type { Product, Variant } from '../product.types';
import { getCategoryNames, getPrices, isInStock, isOptionAvailable } from '../utils/variants';
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
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onCheckout: () => void;
  addDisabled: boolean;
  message: string;
};

export function ProductInfo({
  product,
  variant,
  selection,
  onSelectOption,
  quantity,
  maxQuantity,
  onQuantityChange,
  onAddToCart,
  onCheckout,
  addDisabled,
  message,
}: ProductInfoProps) {
  const { price, oldPrice } = getPrices(product, variant);
  const inStock = isInStock(product, variant);
  const categories = getCategoryNames(product);
  const colors = product.variations.find((variation) => variation.name === 'color');
  const sizes = product.variations.find((variation) => variation.name === 'size');

  return (
    <div>
      <div className="flex flex-col gap-6 lg:gap-7">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3.5 lg:gap-5">
            <h1 className="text-[23px] leading-[1.2] font-semibold tracking-[-0.005em] text-heading lg:text-title">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <div className="flex items-center gap-4">
                {oldPrice && (
                  <span className="text-sm font-medium text-muted line-through lg:text-old-price">{formatPrice(oldPrice)}</span>
                )}
                <span className="text-[20px] leading-[1.2] font-semibold text-ink lg:text-price">{formatPrice(price)}</span>
              </div>
              <StockStatus product={product} variant={variant} />
            </div>
          </div>

          <Divider />
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          <ProductDescription html={product.description} />

          {colors && (
            <ColorOptions
              variation={colors}
              selected={selection.color}
              onSelect={(option) => onSelectOption('color', option)}
              isAvailable={(option) => isOptionAvailable(product, selection, 'color', option)}
            />
          )}
          {sizes && (
            <SizeOptions
              variation={sizes}
              selected={selection.size}
              onSelect={(option) => onSelectOption('size', option)}
              isAvailable={(option) => isOptionAvailable(product, selection, 'size', option)}
            />
          )}

          <div className="flex flex-col gap-[18px]">
            <p className="text-lg leading-[1.2] font-medium text-subtle lg:text-label">Quantity:</p>
            <QuantitySelector
              value={quantity}
              onChange={onQuantityChange}
              max={maxQuantity}
              className="self-start"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-14">
        <AddToCartActions
          disabled={!inStock}
          onAddToCart={onAddToCart}
          onCheckout={onCheckout}
          addDisabled={addDisabled}
          message={message}
        />
      </div>

      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-body font-medium text-subtle">Categories:</span>
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category} className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-muted">
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
