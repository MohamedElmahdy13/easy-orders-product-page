import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Providers } from '@/app/providers';
import { CartButton, CartDrawer, useCartStore } from '@/features/cart';
import { ProductDetails } from '@/features/product-details';
import type { Product } from '@/features/product-details/product.types';

// A small product: 2 colors x 2 sizes, no stock tracking, sale price $80
const sizes = ['38', '40'];
const colors = ['brown', 'black'];

const product: Product = {
  id: 'p1',
  name: 'Achilles Pro',
  slug: 'achilles-pro',
  description: '<p>Nice shoes</p>',
  price: 100,
  sale_price: 80,
  thumb: 'thumb.jpg',
  images: [],
  quantity: 0,
  track_stock: false,
  categories: [],
  variations: [
    {
      id: 'v-color',
      name: 'color',
      type: 'image',
      props: colors.map((name) => ({ id: name, name, value: `${name}.jpg` })),
    },
    {
      id: 'v-size',
      name: 'size',
      type: 'button',
      props: sizes.map((name) => ({ id: name, name })),
    },
  ],
  variants: colors.flatMap((color) =>
    sizes.map((size) => ({
      id: `${color}-${size}`,
      price: 100,
      sale_price: 0,
      quantity: 0,
      variation_props: [
        { variation: 'color', variation_prop: color },
        { variation: 'size', variation_prop: size },
      ],
    })),
  ),
};

function renderPage() {
  render(
    <Providers>
      <CartButton />
      <ProductDetails slug="achilles-pro" />
      <CartDrawer />
    </Providers>,
  );
}

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => product }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('cart flow', () => {
  it('adds products, shows them in the drawer and updates quantity and total', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole('button', { name: 'Add To Cart' }));
    expect(screen.getByText('Added to cart ✓')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Cart, 1 item/ })).toBeInTheDocument();

    // A different size is a separate line in the cart
    await user.click(screen.getByRole('button', { name: '40' }));
    await user.click(screen.getByRole('button', { name: 'Add To Cart' }));
    expect(screen.getByRole('button', { name: /^Cart, 2 item/ })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^Cart, 2 item/ }));
    const drawer = await screen.findByRole('dialog');
    expect(within(drawer).getAllByRole('listitem')).toHaveLength(2);
    expect(within(drawer).getByText('$160.00')).toBeInTheDocument(); // total: 2 x $80

    // Raise the quantity of the first line
    await user.click(within(drawer).getAllByRole('button', { name: 'Increase quantity' })[0]);
    expect(within(drawer).getByText('$240.00')).toBeInTheDocument();
    // The page behind the open drawer is hidden from screen readers, so look for it with hidden: true
    expect(screen.getByRole('button', { name: /^Cart, 3 item/, hidden: true })).toBeInTheDocument();

    // Remove both lines and the empty state shows up
    await user.click(within(drawer).getAllByRole('button', { name: /^Remove Achilles Pro/ })[0]);
    expect(within(drawer).getAllByRole('listitem')).toHaveLength(1);
    await user.click(within(drawer).getByRole('button', { name: /^Remove Achilles Pro/ }));
    expect(within(drawer).getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('adds the product and opens the drawer on Checkout Now', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole('button', { name: 'Checkout Now' }));

    const drawer = await screen.findByRole('dialog');
    expect(within(drawer).getByText('Achilles Pro')).toBeInTheDocument();
  });

  it('stops adding when the cart already has the max quantity of that variant', async () => {
    const user = userEvent.setup();
    useCartStore.setState({
      items: [
        {
          id: 'p1:brown-38',
          productId: 'p1',
          name: 'Achilles Pro',
          image: 'thumb.jpg',
          price: 80,
          color: 'brown',
          size: '38',
          quantity: 10,
          maxQuantity: 10,
        },
      ],
    });
    renderPage();

    const addButton = await screen.findByRole('button', { name: 'Add To Cart' });
    expect(addButton).toBeDisabled();
    expect(screen.getByText('You already have the maximum quantity in your cart')).toBeInTheDocument();

    // Another size is a different variant, so it can still be added
    await user.click(screen.getByRole('button', { name: '40' }));
    expect(screen.getByRole('button', { name: 'Add To Cart' })).toBeEnabled();
  });
});
