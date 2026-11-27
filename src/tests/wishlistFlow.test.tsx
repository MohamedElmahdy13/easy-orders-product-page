import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from '@/features/cart';
import { useWishlistStore } from '@/features/wishlist';
import type { WishlistItem } from '@/features/wishlist';
import { MainLayout } from '@/layouts/MainLayout';

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

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
  useWishlistStore.setState({ items: [shoe], isOpen: false });
  localStorage.clear();
});

describe('moving a wishlist item to the cart', () => {
  it('adds it to the cart and removes it from the wishlist', async () => {
    const user = userEvent.setup();
    render(<MainLayout>page</MainLayout>);

    await user.click(screen.getAllByRole('button', { name: 'Wishlist, 1 items' })[0]);
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Move Achilles Pro to cart' }));

    expect(useCartStore.getState().items).toEqual([{ ...shoe, quantity: 1 }]);
    expect(useWishlistStore.getState().items).toEqual([]);
  });

  it('adds one more when the same variant is already in the cart', async () => {
    const user = userEvent.setup();
    useCartStore.setState({ items: [{ ...shoe, quantity: 2 }] });
    render(<MainLayout>page</MainLayout>);

    await user.click(screen.getAllByRole('button', { name: 'Wishlist, 1 items' })[0]);
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Move Achilles Pro to cart' }));

    expect(useCartStore.getState().items).toEqual([{ ...shoe, quantity: 3 }]);
  });
});
