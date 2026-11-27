import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem } from '../cart.types';

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

// Keep the quantity between 1 and the max for that item
function clampQuantity(quantity: number, max: number) {
  return Math.max(1, Math.min(quantity, max));
}

// localStorage can be blocked or full. The cart must keep working, it just will not be saved.
const safeStorage = createJSONStorage(() => ({
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      // not saved, nothing else to do
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // nothing to remove
    }
  },
}));

// What was saved in the browser could be old or edited, so only keep lines that look like cart items
function isCartItem(value: unknown): value is CartItem {
  const item = value as Partial<CartItem> | null;
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    typeof item.maxQuantity === 'number'
  );
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

      clearCart: () =>
        set((state) => {
          state.items = [];
        }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    })),
    {
      name: 'cart',
      storage: safeStorage,
      // Only the items are saved, the drawer should always start closed
      partialize: (state) => ({ items: state.items }),
      merge: (saved, current) => {
        const items = (saved as { items?: unknown } | undefined)?.items;
        return { ...current, items: Array.isArray(items) ? items.filter(isCartItem) : [] };
      },
    },
  ),
);

// Count and total are calculated from the items, not stored
export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
