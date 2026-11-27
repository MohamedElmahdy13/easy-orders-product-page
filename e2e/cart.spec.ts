import { expect, test, type Page } from '@playwright/test';

// A small product: 2 colors x 2 sizes. Black / 40 is out of stock.
const image = (color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='458' height='610'><rect width='100%' height='100%' fill='${color}'/></svg>`)}`;

const colors = [
  { name: 'brown', color: '#8b5a2b' },
  { name: 'black', color: '#222' },
];
const sizes = ['38', '40'];

const product = {
  id: 'p1',
  name: 'Achilles Pro',
  slug: 'Sneakers12',
  description: '<p>Nice shoes</p>',
  price: 100,
  sale_price: 80,
  thumb: image('#ccc'),
  images: [],
  quantity: 0,
  track_stock: true,
  categories: [],
  variations: [
    { id: 'v-color', name: 'color', type: 'image', props: colors.map((c) => ({ id: c.name, name: c.name, value: image(c.color) })) },
    { id: 'v-size', name: 'size', type: 'button', props: sizes.map((name) => ({ id: name, name })) },
  ],
  variants: colors.flatMap((c) =>
    sizes.map((size) => ({
      id: `${c.name}-${size}`,
      price: 100,
      sale_price: 0,
      quantity: c.name === 'black' && size === '40' ? 0 : 5,
      variation_props: [
        { variation: 'color', variation_prop: c.name },
        { variation: 'size', variation_prop: size },
      ],
    })),
  ),
};

function mockProduct(page: Page, status = 200) {
  return page.route('**/products/slug/**', (route) =>
    status === 200 ? route.fulfill({ json: product }) : route.fulfill({ status, body: 'error' }),
  );
}

test('shopper picks a variant, adds it to the cart and keeps it after a reload', async ({ page }) => {
  await mockProduct(page);
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Achilles Pro' })).toBeVisible();

  // Black / 40 is out of stock, so that size cannot be picked
  await page.getByRole('button', { name: 'Black' }).click();
  await expect(page.getByRole('button', { name: '40', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '38', exact: true }).click();

  await page.getByRole('button', { name: 'Add To Cart' }).click();
  await expect(page.getByText('Added to cart')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();

  // Change the quantity inside the cart drawer
  await page.getByRole('button', { name: 'Cart, 1 items' }).click();
  const drawer = page.getByRole('dialog');
  await expect(drawer.getByText('Achilles Pro')).toBeVisible();
  await expect(drawer.getByText('$80.00')).toHaveCount(2); // line price and total
  await drawer.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(drawer.getByText('$160.00')).toHaveCount(2);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Cart, 2 items' })).toBeVisible();

  // The cart is saved in the browser
  await page.reload();
  await expect(page.getByRole('button', { name: 'Cart, 2 items' })).toBeVisible();

  // Remove the item and see the empty state
  await page.getByRole('button', { name: 'Cart, 2 items' }).click();
  await page.getByRole('button', { name: 'Remove Achilles Pro' }).click();
  await expect(page.getByText('Your cart is empty')).toBeVisible();
});

test('shows an error and lets the shopper try again when the product fails to load', async ({ page }) => {
  await mockProduct(page, 500);
  await page.goto('/');

  await expect(page.getByRole('alert')).toContainText('We could not load this product');

  await page.unroute('**/products/slug/**');
  await mockProduct(page);
  await page.getByRole('button', { name: 'Try again' }).click();

  await expect(page.getByRole('heading', { level: 1, name: 'Achilles Pro' })).toBeVisible();
});

test('shopper saves a variant to the wishlist, moves it to the cart and the wishlist survives a reload', async ({ page }) => {
  await mockProduct(page);
  await page.goto('/');

  // Save brown / 38, then the other size is a different line
  await page.getByRole('button', { name: 'Add to wishlist' }).click();
  await expect(page.getByRole('button', { name: 'Remove from wishlist' })).toBeVisible();
  await page.getByRole('button', { name: '40', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Add to wishlist' })).toBeVisible();
  await page.getByRole('button', { name: 'Add to wishlist' }).click();
  await expect(page.getByRole('button', { name: 'Wishlist, 2 items' })).toBeVisible();

  // The wishlist is saved in the browser
  await page.reload();
  await page.getByRole('button', { name: 'Wishlist, 2 items' }).click();
  const drawer = page.getByRole('dialog');
  await expect(drawer.getByRole('listitem')).toHaveCount(2);

  // Move one line to the cart
  await drawer.getByRole('button', { name: 'Move Achilles Pro to cart' }).first().click();
  await expect(drawer.getByRole('listitem')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Wishlist, 1 items' })).toBeVisible();
});
