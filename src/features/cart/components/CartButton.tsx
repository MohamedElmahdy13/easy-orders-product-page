import { Badge } from '@/shared/ui/Badge';
import { CartIcon } from '@/shared/ui/icons';
import { selectCartCount, useCartStore } from '../store/cartStore';

// Cart icon for the header: shows how many items are in the cart and opens the drawer
export function CartButton() {
  const count = useCartStore(selectCartCount);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Cart, ${count} items`}
      className="relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <CartIcon />
      <Badge count={count} className="absolute -top-1 -right-1.5" />
    </button>
  );
}
