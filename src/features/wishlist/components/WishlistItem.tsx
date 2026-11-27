import { TrashIcon } from '@/shared/ui/icons';
import { formatPrice } from '@/shared/utils/formatPrice';
import { useWishlistStore } from '../store/wishlistStore';
import type { WishlistItem as WishlistItemType } from '../wishlist.types';

type WishlistItemProps = {
  item: WishlistItemType;
  onMoveToCart: (item: WishlistItemType) => void;
};

export function WishlistItem({ item, onMoveToCart }: WishlistItemProps) {
  const removeItem = useWishlistStore((state) => state.removeItem);

  const options = [item.color, item.size].filter(Boolean).join(' / ');
  const isSoldOut = item.maxQuantity < 1;

  return (
    <li className="flex gap-4 py-4">
      <img src={item.image} alt={item.name} className="h-24 w-18 shrink-0 rounded-md object-cover" />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-body font-semibold text-heading">{item.name}</p>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from wishlist`}
            className="shrink-0 text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
          >
            <TrashIcon />
          </button>
        </div>

        {options && <p className="text-sm text-muted capitalize">{options}</p>}

        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="text-body font-semibold text-heading">{formatPrice(item.price)}</p>
          <button
            type="button"
            onClick={() => onMoveToCart(item)}
            disabled={isSoldOut}
            aria-label={`Move ${item.name} to cart`}
            className="-my-2 py-2 text-sm leading-[1.2] font-medium text-link underline hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:no-underline disabled:opacity-40"
          >
            {isSoldOut ? 'Sold out' : 'Move to cart'}
          </button>
        </div>
      </div>
    </li>
  );
}
