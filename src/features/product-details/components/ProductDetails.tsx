import { useCartStore } from '@/features/cart';
import { useTemporaryMessage } from '@/shared/hooks/useTemporaryMessage';
import { Button } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useProduct } from '../hooks/useProduct';
import { useVariantSelection } from '../hooks/useVariantSelection';
import type { Product } from '../product.types';
import { getGalleryImages } from '../utils/gallery';
import { getMaxQuantity, getPrices } from '../utils/variants';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';

const pageGrid = 'grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-[545px_520px] xl:gap-[135px]';

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
  const [addedMessage, showAddedMessage] = useTemporaryMessage();

  // How many of this exact variant are already in the cart
  const itemId = `${product.id}:${variant?.id ?? 'default'}`;
  const maxQuantity = getMaxQuantity(product, variant);
  const quantityInCart = useCartStore((state) => state.items.find((item) => item.id === itemId)?.quantity ?? 0);
  const isMaxInCart = quantityInCart > 0 && quantityInCart >= maxQuantity;

  // What the shopper can still add: the limit minus what is already in the cart
  const remaining = Math.max(maxQuantity - quantityInCart, 0);
  const quantityToAdd = Math.max(1, Math.min(quantity, remaining));

  // "Added to cart" goes away by itself. The maximum message stays while it is true.
  let message = addedMessage;
  if (!message && isMaxInCart) message = 'You already have the maximum quantity in your cart';

  // What the cart and the wishlist save for the selected color and size
  const itemToSave = {
    id: itemId,
    productId: product.id,
    name: product.name,
    image: product.thumb,
    price: getPrices(product, variant).price,
    color: selection.color,
    size: selection.size,
    maxQuantity,
  };

  function addToCart() {
    addItem({ ...itemToSave, quantity: quantityToAdd });
  }

  function handleAddToCart() {
    addToCart();
    showAddedMessage('Added to cart ✓');
  }

  function handleCheckout() {
    addToCart();
    openCart();
  }

  return (
    <div className={pageGrid}>
      <ProductGallery wishlistItem={itemToSave} images={getGalleryImages(product)} productName={product.name} />
      <ProductInfo
        product={product}
        variant={variant}
        selection={selection}
        onSelectOption={selectOption}
        quantity={quantityToAdd}
        maxQuantity={remaining}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
        onCheckout={handleCheckout}
        addDisabled={isMaxInCart}
        message={message}
      />
    </div>
  );
}
