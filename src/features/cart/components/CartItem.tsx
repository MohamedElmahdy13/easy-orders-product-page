import { QuantitySelector } from '@/shared/ui/QuantitySelector';
import { TrashIcon } from '@/shared/ui/icons';
import { formatPrice } from '@/shared/utils/formatPrice';
import type { CartItem as CartItemType } from '../cart.types';
import { useCartStore } from '../store/cartStore';

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const options = [item.color, item.size].filter(Boolean).join(' / ');

  return (
    <li className="flex gap-4 py-4">
      <img src={item.image} alt={item.name} className="h-24 w-18 shrink-0 rounded-md object-cover" />

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-body font-semibold text-heading">{item.name}</p>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name}`}
            className="shrink-0 text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-ink"
          >
            <TrashIcon />
          </button>
        </div>

        {options && <p className="text-sm text-muted capitalize">{options}</p>}

        <div className="mt-auto flex items-center justify-between">
          <QuantitySelector
            size="sm"
            value={item.quantity}
            max={item.maxQuantity}
            onChange={(quantity) => setQuantity(item.id, quantity)}
          />
          <p className="text-body font-semibold text-heading">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </li>
  );
}
