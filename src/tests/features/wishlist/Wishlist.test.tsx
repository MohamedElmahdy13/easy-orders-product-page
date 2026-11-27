import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  WishlistButton,
  WishlistDrawer,
  WishlistToggle,
  useWishlistStore,
} from '@/features/wishlist';
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

beforeEach(() => {
  useWishlistStore.setState({ items: [], isOpen: false });
  localStorage.clear();
});

describe('WishlistToggle', () => {
  it('switches its label and pressed state when clicked', async () => {
    const user = userEvent.setup();
    render(<WishlistToggle item={shoe} />);

    const button = screen.getByRole('button', { name: 'Add to wishlist' });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);
    expect(screen.getByRole('button', { name: 'Remove from wishlist' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Remove from wishlist' }));
    expect(screen.getByRole('button', { name: 'Add to wishlist' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('is pressed only for the variant that is saved', () => {
    useWishlistStore.setState({ items: [shoe] });
    render(<WishlistToggle item={{ ...shoe, id: 'p1:v2', size: '40' }} />);

    expect(screen.getByRole('button', { name: 'Add to wishlist' })).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('WishlistButton and WishlistDrawer', () => {
  it('shows the count and opens the drawer', async () => {
    const user = userEvent.setup();
    useWishlistStore.setState({ items: [shoe] });
    render(
      <>
        <WishlistButton />
        <WishlistDrawer onMoveToCart={vi.fn()} />
      </>
    );

    await user.click(screen.getByRole('button', { name: 'Wishlist, 1 items' }));

    const drawer = screen.getByRole('dialog');
    expect(within(drawer).getByText('Achilles Pro')).toBeInTheDocument();
    expect(within(drawer).getByText('brown / 38')).toBeInTheDocument();
  });

  it('shows the empty state', () => {
    useWishlistStore.setState({ isOpen: true });
    render(<WishlistDrawer onMoveToCart={vi.fn()} />);

    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
  });

  it('removes an item', async () => {
    const user = userEvent.setup();
    useWishlistStore.setState({ items: [shoe], isOpen: true });
    render(<WishlistDrawer onMoveToCart={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Remove Achilles Pro from wishlist' }));

    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
  });

  it('clears the whole wishlist', async () => {
    const user = userEvent.setup();
    useWishlistStore.setState({ items: [shoe, { ...shoe, id: 'p1:v2', size: '40' }], isOpen: true });
    render(<WishlistDrawer onMoveToCart={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Clear wishlist' }));

    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear wishlist' })).not.toBeInTheDocument();
  });

  it('hands the item to onMoveToCart', async () => {
    const user = userEvent.setup();
    const onMoveToCart = vi.fn();
    useWishlistStore.setState({ items: [shoe], isOpen: true });
    render(<WishlistDrawer onMoveToCart={onMoveToCart} />);

    await user.click(screen.getByRole('button', { name: 'Move Achilles Pro to cart' }));

    expect(onMoveToCart).toHaveBeenCalledWith(shoe);
  });

  it('does not let a sold out item move to the cart', () => {
    useWishlistStore.setState({ items: [{ ...shoe, maxQuantity: 0 }], isOpen: true });
    render(<WishlistDrawer onMoveToCart={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Move Achilles Pro to cart' })).toBeDisabled();
  });
});
