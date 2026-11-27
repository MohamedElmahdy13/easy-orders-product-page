import { Badge } from '@/shared/ui/Badge';
import { HeartIcon } from '@/shared/ui/icons';
import { cn } from '@/shared/utils/cn';
import { selectWishlistCount, useWishlistStore } from '../store/wishlistStore';

type WishlistButtonProps = {
  // icon: the header heart. menu: heart and "Wishlist" text, for the mobile menu.
  variant?: 'icon' | 'menu';
  className?: string;
  onOpen?: () => void; // e.g. close the mobile menu before the drawer opens
};

const variantClass = {
  icon: '-m-2.5 p-2.5',
  menu: 'flex items-center gap-2',
};

// Shows how many items are saved and opens the wishlist drawer
export function WishlistButton({ variant = 'icon', className, onOpen }: WishlistButtonProps) {
  const count = useWishlistStore(selectWishlistCount);
  const openWishlist = useWishlistStore((state) => state.openWishlist);

  function handleClick() {
    onOpen?.();
    openWishlist();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Wishlist, ${count} items`}
      className={cn(
        variantClass[variant],
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
        className
      )}
    >
      <span className="relative block">
        <HeartIcon />
        <Badge count={count} className="absolute -top-1 -right-1.5" />
      </span>
      {variant === 'menu' && 'Wishlist'}
    </button>
  );
}
