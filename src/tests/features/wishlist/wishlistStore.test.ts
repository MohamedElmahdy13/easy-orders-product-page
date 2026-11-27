import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  selectIsWishlisted,
  selectWishlistCount,
  useWishlistStore,
} from '@/features/wishlist/store/wishlistStore';
import type { WishlistItem } from '@/features/wishlist';

const shoe: WishlistItem = {
  id: 'p1:v1',
  productId: 'p1',
  name: 'Achilles Pro',
  image: 'shoe.jpg',
  price: 100,
  color: 'brown',
  size: '38',
  maxQuantity: 5,
};

const otherSize: WishlistItem = { ...shoe, id: 'p1:v2', size: '40' };

const { toggleItem, removeItem, clearWishlist, openWishlist, closeWishlist } = useWishlistStore.getState();

function saveToStorage(items: unknown) {
  localStorage.setItem('wishlist', JSON.stringify({ state: { items }, version: 0 }));
}

beforeEach(() => {
  useWishlistStore.setState({ items: [], isOpen: false });
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('wishlistStore', () => {
  it('adds an item and removes it when toggled again', () => {
    toggleItem(shoe);
    expect(useWishlistStore.getState().items).toEqual([shoe]);

    toggleItem(shoe);
    expect(useWishlistStore.getState().items).toEqual([]);
  });

  it('keeps each color and size as its own line', () => {
    toggleItem(shoe);
    toggleItem(otherSize);

    const state = useWishlistStore.getState();
    expect(selectWishlistCount(state)).toBe(2);
    expect(selectIsWishlisted('p1:v1')(state)).toBe(true);
    expect(selectIsWishlisted('p1:v3')(state)).toBe(false);
  });

  it('removes one item', () => {
    toggleItem(shoe);
    toggleItem(otherSize);
    removeItem(shoe.id);

    expect(useWishlistStore.getState().items).toEqual([otherSize]);
  });

  it('clears the whole wishlist', () => {
    toggleItem(shoe);
    toggleItem(otherSize);
    clearWishlist();

    expect(useWishlistStore.getState().items).toEqual([]);
  });

  it('opens and closes the drawer', () => {
    openWishlist();
    expect(useWishlistStore.getState().isOpen).toBe(true);

    closeWishlist();
    expect(useWishlistStore.getState().isOpen).toBe(false);
  });
});

describe('wishlist persistence', () => {
  it('restores the items after a reload', async () => {
    saveToStorage([shoe]);

    await useWishlistStore.persist.rehydrate();

    expect(useWishlistStore.getState().items).toEqual([shoe]);
  });

  it('saves only the items, not the open drawer', () => {
    toggleItem(shoe);
    openWishlist();

    const saved = JSON.parse(localStorage.getItem('wishlist') ?? 'null');
    expect(saved.state.items).toHaveLength(1);
    expect(saved.state).not.toHaveProperty('isOpen');
  });

  it('ignores saved lines that are not valid items', async () => {
    saveToStorage([shoe, { id: 5 }, null]);
    await useWishlistStore.persist.rehydrate();
    expect(useWishlistStore.getState().items).toEqual([shoe]);

    saveToStorage('oops');
    await useWishlistStore.persist.rehydrate();
    expect(useWishlistStore.getState().items).toEqual([]);
  });

  it('starts empty when the saved text is not valid JSON', async () => {
    localStorage.setItem('wishlist', '{not json');
    await useWishlistStore.persist.rehydrate();
    expect(useWishlistStore.getState().items).toEqual([]);
  });

  it('keeps working when the browser cannot save', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('full');
    });

    toggleItem(shoe);

    expect(useWishlistStore.getState().items).toEqual([shoe]);
  });
});
