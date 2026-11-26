import { useEffect, useState } from 'react';
import { useCartStore } from '@/features/cart';
import { Button } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useProduct } from '../hooks/useProduct';
import { useVariantSelection } from '../hooks/useVariantSelection';
import type { Product } from '../product.types';
import { getGalleryImages } from '../utils/gallery';
import { getMaxQuantity, getPrices } from '../utils/variants';
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

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [justAdded, setJustAdded] = useState(false);

  // How many of this exact variant are already in the cart
  const itemId = `${product.id}:${variant?.id ?? 'default'}`;
  const maxQuantity = getMaxQuantity(product, variant);
  const quantityInCart = useCartStore((state) => state.items.find((item) => item.id === itemId)?.quantity ?? 0);
  const isMaxInCart = quantityInCart >= maxQuantity;

  let message = '';
  if (justAdded) message = 'Added to cart ✓';
  else if (isMaxInCart) message = 'You already have the maximum quantity in your cart';

  // Hide the "Added to cart" message after 2 seconds
  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 2000);
    return () => clearTimeout(timer);
  }, [justAdded]);

  function addToCart() {
    addItem({
      id: itemId,
      productId: product.id,
      name: product.name,
      image: product.thumb,
      price: getPrices(product, variant).price,
      color: selection.color,
      size: selection.size,
      quantity,
      maxQuantity,
    });
  }

  function handleAddToCart() {
    addToCart();
    setJustAdded(true);
  }

  function handleCheckout() {
    addToCart();
    openCart();
  }

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
        addDisabled={isMaxInCart}
        message={message}
      />
    </div>
  );
}
