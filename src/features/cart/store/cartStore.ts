import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../cart.types';

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

// Keep the quantity between 1 and the max for that item
function clampQuantity(quantity: number, max: number) {
  return Math.max(1, Math.min(quantity, max));
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            // Use the stock the product page has now, not the one saved earlier
            existing.maxQuantity = item.maxQuantity;
            existing.quantity = clampQuantity(existing.quantity + item.quantity, existing.maxQuantity);
          } else {
            state.items.push({ ...item, quantity: clampQuantity(item.quantity, item.maxQuantity) });
          }
        }),

      setQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) item.quantity = clampQuantity(quantity, item.maxQuantity);
        }),

      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((i) => i.id !== id);
        }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    })),
    {
      name: 'cart',
      // Only the items are saved, the drawer should always start closed
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Count and total are calculated from the items, not stored
export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
