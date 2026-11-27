import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCartStore } from '@/features/cart';
import { makeProduct } from '@/tests/productFixture';
import { ProductDetails } from '@/features/product-details/components/ProductDetails';

function renderProduct() {
  // No retries, so a failed request shows the error right away
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <ProductDetails slug="achilles-pro" />
    </QueryClientProvider>,
  );
}

function respondWith(product: unknown) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => product }));
}

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ProductDetails', () => {
  it('shows a loading state until the product arrives', () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));
    const { container } = renderProduct();

    // The skeleton placeholders are on the page, and neither the product nor an error is
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the product when the request works', async () => {
    respondWith(makeProduct());
    renderProduct();

    expect(await screen.findByRole('heading', { level: 1, name: 'Achilles Pro' })).toBeInTheDocument();
    expect(screen.getByText('$80.00')).toBeInTheDocument();
  });

  it('shows an error and loads the product when the shopper tries again', async () => {
    const user = userEvent.setup();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    renderProduct();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('We could not load this product');

    respondWith(makeProduct());
    await user.click(within(alert).getByRole('button', { name: 'Try again' }));

    expect(await screen.findByRole('heading', { level: 1, name: 'Achilles Pro' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('lowers the quantity when the new variant has less stock', async () => {
    const user = userEvent.setup();
    const stock: Record<string, number> = { 'brown-38': 5, 'brown-40': 5, 'black-38': 2, 'black-40': 2 };
    const base = makeProduct();
    respondWith({
      ...base,
      track_stock: true,
      variants: base.variants.map((variant) => ({ ...variant, quantity: stock[variant.id] })),
    });
    renderProduct();

    for (let i = 0; i < 4; i++) {
      await user.click(await screen.findByRole('button', { name: 'Increase quantity' }));
    }
    expect(screen.getByRole('group', { name: 'Quantity' })).toHaveTextContent('5');

    await user.click(screen.getByRole('button', { name: 'Black' }));
    expect(screen.getByRole('group', { name: 'Quantity' })).toHaveTextContent('2');
  });
});
