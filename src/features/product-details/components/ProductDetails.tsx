import { Button } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useProduct } from '../hooks/useProduct';
import { useVariantSelection } from '../hooks/useVariantSelection';
import type { Product } from '../product.types';
import { getGalleryImages } from '../utils/gallery';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';

const pageGrid = 'grid gap-8 lg:grid-cols-2 xl:grid-cols-[545px_520px] xl:gap-[135px]';

// Owns what the shopper picked, so the gallery and the info stay in sync
export function ProductDetails({ slug }: { slug: string }) {
  const { data: product, isPending, isError, refetch } = useProduct(slug);

  if (isPending) {
    return (
      <div className={pageGrid}>
        <Skeleton className="aspect-458/610 w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-label">We could not load this product.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return <ProductContent product={product} />;
}

// Separate component so the selection hook only runs once the product is loaded
function ProductContent({ product }: { product: Product }) {
  const { selection, variant, selectOption, quantity, setQuantity } = useVariantSelection(product);

  // The cart feature will replace these two
  function handleAddToCart() {}
  function handleCheckout() {}

  return (
    <div className={pageGrid}>
      <ProductGallery images={getGalleryImages(product)} productName={product.name} />
      <ProductInfo
        product={product}
        variant={variant}
        selection={selection}
        onSelectOption={selectOption}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
