import { HeartIcon } from '@/shared/ui/icons';

export function EmptyWishlist() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <HeartIcon />
      <p className="text-label font-semibold text-heading">Your wishlist is empty</p>
      <p className="text-sm text-muted">Tap the heart on a product and it will show up here.</p>
    </div>
  );
}
