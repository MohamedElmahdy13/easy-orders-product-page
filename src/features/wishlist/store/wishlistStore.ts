import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/utils/safeStorage';
import type { WishlistItem } from '../wishlist.types';

type WishlistState = {
  items: WishlistItem[];
  isOpen: boolean;
  toggleItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
};

// What was saved in the browser could be old or edited, so only keep lines that look like wishlist items
function isWishlistItem(value: unknown): value is WishlistItem {
  const item = value as Partial<WishlistItem> | null;
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.productId === 'string' &&
    typeof item.name === 'string' &&
    typeof item.image === 'string' &&
    typeof item.price === 'number' &&
    typeof item.maxQuantity === 'number'
  );
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    immer((set) => ({
      items: [],
      isOpen: false,

      // Adds the item, or removes it when this exact variant is already saved
      toggleItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) {
            state.items = state.items.filter((i) => i.id !== item.id);
          } else {
            state.items.push(item);
          }
        }),

      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((i) => i.id !== id);
        }),

      clearWishlist: () =>
        set((state) => {
          state.items = [];
        }),

      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),
    })),
    {
      name: 'wishlist',
      storage: safeStorage,
      // Only the items are saved, the drawer should always start closed
      partialize: (state) => ({ items: state.items }),
      merge: (saved, current) => {
        const items = (saved as { items?: unknown } | undefined)?.items;
        return { ...current, items: Array.isArray(items) ? items.filter(isWishlistItem) : [] };
      },
    },
  ),
);

// The count is calculated from the items, not stored
export const selectWishlistCount = (state: WishlistState) => state.items.length;

export const selectIsWishlisted = (id: string) => (state: WishlistState) =>
  state.items.some((item) => item.id === id);
