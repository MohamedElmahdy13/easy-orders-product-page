import { HeartIcon } from '@/shared/ui/icons';
import { IconButton } from '@/shared/ui/IconButton';
import { selectIsWishlisted, useWishlistStore } from '../store/wishlistStore';
import type { WishlistItem } from '../wishlist.types';

type WishlistToggleProps = {
  item: WishlistItem;
};

// Heart button of the product page: saves the selected color and size, or removes it
export function WishlistToggle({ item }: WishlistToggleProps) {
  const isWishlisted = useWishlistStore(selectIsWishlisted(item.id));
  const toggleItem = useWishlistStore((state) => state.toggleItem);

  return (
    <IconButton
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={isWishlisted}
      onClick={() => toggleItem(item)}
    >
      <HeartIcon className={isWishlisted ? 'fill-current' : undefined} />
    </IconButton>
  );
}
