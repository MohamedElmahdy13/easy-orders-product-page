import { Drawer } from '@/shared/ui/Drawer';
import { formatPrice } from '@/shared/utils/formatPrice';
import { selectCartTotal, useCartStore } from '../store/cartStore';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);

  const isEmpty = items.length === 0;

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      title="Your Cart"
      footer={
        !isEmpty && (
          <div className="flex items-center justify-between text-label font-semibold text-heading">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        )
      }
    >
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </Drawer>
  );
}
