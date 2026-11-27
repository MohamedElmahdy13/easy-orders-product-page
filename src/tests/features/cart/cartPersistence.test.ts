import { beforeEach, describe, expect, it } from 'vitest';
import type { CartItem } from '@/features/cart/cart.types';
import { selectCartCount, selectCartTotal, useCartStore } from '@/features/cart/store/cartStore';

const shoe: CartItem = {
  id: 'p1:v1',
  productId: 'p1',
  name: 'Achilles Pro',
  image: 'shoe.jpg',
  price: 100,
  color: 'brown',
  size: '38',
  quantity: 2,
  maxQuantity: 5,
};

// Same key and shape that zustand persist writes to localStorage
function saveToStorage(items: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify({ state: { items }, version: 0 }));
}

function readFromStorage() {
  return JSON.parse(localStorage.getItem('cart') ?? 'null');
}

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
  localStorage.clear();
});

describe('cart persistence', () => {
  it('restores the items after a reload', async () => {
    saveToStorage([shoe]);

    // Same thing the store does when the page opens
    await useCartStore.persist.rehydrate();

    const state = useCartStore.getState();
    expect(state.items).toEqual([shoe]);
    expect(selectCartCount(state)).toBe(2);
    expect(selectCartTotal(state)).toBe(200);
  });

  it('saves only the items, not the open drawer', () => {
    useCartStore.getState().addItem(shoe);
    useCartStore.getState().openCart();

    const saved = readFromStorage();
    expect(saved.state.items).toHaveLength(1);
    expect(saved.state).not.toHaveProperty('isOpen');
  });

  it('stays empty after removing the last item and reloading', async () => {
    useCartStore.getState().addItem(shoe);
    useCartStore.getState().removeItem(shoe.id);

    await useCartStore.persist.rehydrate();

    expect(useCartStore.getState().items).toEqual([]);
  });
});
