import { Drawer } from '@/shared/ui/Drawer';
import { useWishlistStore } from '../store/wishlistStore';
import type { WishlistItem as WishlistItemType } from '../wishlist.types';
import { EmptyWishlist } from './EmptyWishlist';
import { WishlistItem } from './WishlistItem';

type WishlistDrawerProps = {
  // The wishlist does not know about the cart, so the layout decides what "move to cart" does
  onMoveToCart: (item: WishlistItemType) => void;
};

export function WishlistDrawer({ onMoveToCart }: WishlistDrawerProps) {
  const isOpen = useWishlistStore((state) => state.isOpen);
  const closeWishlist = useWishlistStore((state) => state.closeWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const items = useWishlistStore((state) => state.items);

  return (
    <Drawer
      open={isOpen}
      onClose={closeWishlist}
      title="Your Wishlist"
      footer={
        items.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-sm leading-[1.2] font-medium text-link underline hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Clear wishlist
          </button>
        )
      }
    >
      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <WishlistItem key={item.id} item={item} onMoveToCart={onMoveToCart} />
          ))}
        </ul>
      )}
    </Drawer>
  );
}
