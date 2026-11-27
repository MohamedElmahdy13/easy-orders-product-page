import type { ReactNode } from 'react';
import { CartDrawer, useCartStore } from '@/features/cart';
import { WishlistDrawer, useWishlistStore } from '@/features/wishlist';
import type { WishlistItem } from '@/features/wishlist';
import { AnnouncementBar } from '@/layouts/AnnouncementBar';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';

export function MainLayout({ children }: { children: ReactNode }) {
  const addToCart = useCartStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);

  // The layout is the only place that knows both features, so they do not import each other
  function moveToCart(item: WishlistItem) {
    addToCart({ ...item, quantity: 1 });
    removeFromWishlist(item.id);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer onMoveToCart={moveToCart} />
    </div>
  );
}
