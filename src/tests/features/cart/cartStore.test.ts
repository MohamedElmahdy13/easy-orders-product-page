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
  quantity: 1,
  maxQuantity: 5,
};

const otherShoe: CartItem = { ...shoe, id: 'p1:v2', size: '40', price: 50 };

const { addItem, setQuantity, removeItem, openCart, closeCart } = useCartStore.getState();

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
});

describe('cartStore', () => {
  it('adds a new item', () => {
    addItem(shoe);
    expect(useCartStore.getState().items).toEqual([shoe]);
  });

  it('adds to the quantity when the same variant is added again', () => {
    addItem(shoe);
    addItem({ ...shoe, quantity: 2 });

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it('keeps different variants as separate lines', () => {
    addItem(shoe);
    addItem(otherShoe);
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it('does not go over the max quantity', () => {
    addItem({ ...shoe, quantity: 4 });
    addItem({ ...shoe, quantity: 4 });
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('uses the newest max quantity when the same variant is added again', () => {
    addItem({ ...shoe, quantity: 2, maxQuantity: 10 });
    addItem({ ...shoe, quantity: 2, maxQuantity: 3 }); // stock dropped to 3

    const item = useCartStore.getState().items[0];
    expect(item.maxQuantity).toBe(3);
    expect(item.quantity).toBe(3);
  });

  it('sets the quantity between 1 and the max', () => {
    addItem(shoe);

    setQuantity(shoe.id, 3);
    expect(useCartStore.getState().items[0].quantity).toBe(3);

    setQuantity(shoe.id, 0);
    expect(useCartStore.getState().items[0].quantity).toBe(1);

    setQuantity(shoe.id, 99);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('removes an item', () => {
    addItem(shoe);
    addItem(otherShoe);
    removeItem(shoe.id);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(otherShoe.id);
  });

  it('calculates the count and the total', () => {
    addItem({ ...shoe, quantity: 2 }); // 2 x 100
    addItem({ ...otherShoe, quantity: 3 }); // 3 x 50

    const state = useCartStore.getState();
    expect(selectCartCount(state)).toBe(5);
    expect(selectCartTotal(state)).toBe(350);
  });

  it('opens and closes the drawer', () => {
    openCart();
    expect(useCartStore.getState().isOpen).toBe(true);
    closeCart();
    expect(useCartStore.getState().isOpen).toBe(false);
  });

  it('saves only the items in localStorage', () => {
    addItem(shoe);
    openCart();

    const saved = JSON.parse(localStorage.getItem('cart') ?? '{}');
    expect(saved.state.items).toHaveLength(1);
    expect(saved.state.isOpen).toBeUndefined();
  });
});
