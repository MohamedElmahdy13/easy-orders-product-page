import { Badge } from '@/shared/ui/Badge';
import { HeartIcon } from '@/shared/ui/icons';
import { cn } from '@/shared/utils/cn';
import { selectWishlistCount, useWishlistStore } from '../store/wishlistStore';

type WishlistButtonProps = {
  className?: string;
};

// Heart icon for the header: shows how many items are saved and opens the drawer
export function WishlistButton({ className }: WishlistButtonProps) {
  const count = useWishlistStore(selectWishlistCount);
  const openWishlist = useWishlistStore((state) => state.openWishlist);

  return (
    <button
      type="button"
      onClick={openWishlist}
      aria-label={`Wishlist, ${count} items`}
      className={cn(
        '-m-2.5 p-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
        className
      )}
    >
      <span className="relative block">
        <HeartIcon />
        <Badge count={count} className="absolute -top-1 -right-1.5" />
      </span>
    </button>
  );
}
