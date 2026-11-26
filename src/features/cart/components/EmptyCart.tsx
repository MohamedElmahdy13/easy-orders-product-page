import { CartIcon } from '@/shared/ui/icons';

export function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <CartIcon />
      <p className="text-label font-semibold text-heading">Your cart is empty</p>
      <p className="text-sm text-muted">Add a product and it will show up here.</p>
    </div>
  );
}
