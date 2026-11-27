# Easy Orders: Product Detail Page

A responsive, mobile-first product detail page with variations and a persistent cart drawer, built for the Easy Orders frontend assessment.

**Demo:** https://easy-orders-product-page.vercel.app/

## Tech stack

React 19 and TypeScript (strict), Vite, Tailwind CSS v4, Zustand with Immer and `persist` for the cart, TanStack Query for the product request, Headless UI for the drawers and dropdowns, DOMPurify for the product description. Tests use Vitest with React Testing Library, plus Playwright for end-to-end.

## Features

- **Gallery:** thumbnails, previous/next buttons with wrap-around, click to zoom (move the mouse to pan), fade transition between images, share button (native share, or copies the link).
- **Product info:** name, regular and sale price, stock status ("In stock", "Only N left", "Out of stock"), sanitized description with See More / See Less.
- **Variations:** color and size. Color is the main variation, and sizes depend on it, so a combination that does not exist or has no stock cannot be picked. The price and stock follow the selected variant.
- **Add to cart:** quantity selector limited by stock, "Added to cart" message, and the cart badge in the header. The cart never goes above the maximum for a variant.
- **Reviews:** a section under the product with the rating summary, rating and topic filters, tabs and pagination. The API has no reviews, so it shows example reviews and says so.
- **Wishlist:** the heart on the product page saves the selected color and size. The header heart shows a counter and opens a drawer where you can remove items or move them to the cart. It is saved in `localStorage`.
- **Cart drawer:** opens from the header or from "Checkout Now". Change the quantity, remove an item, see the total, and an empty state. The cart is saved in `localStorage` and survives a reload.
- **Responsive:** mobile first, two columns from tablet width, fixed 1200px layout on desktop.
- **Errors and loading:** skeleton while loading, and an error message with "Try again" when the request fails.

## Getting started

Requirements: Node 24 (see `.nvmrc`) and npm.

```bash
npm install
cp .env.example .env     # sets VITE_API_URL
npm run dev              # http://localhost:5173
```

### Environment

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the Easy Orders API, for example `https://api.easy-orders.net/api/v1`. There is no fallback, so the app needs it to load the product. |

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server |
| `npm run build` | Type-checks and builds to `dist/` |
| `npm run preview` | Serves the production build |
| `npm run lint` | Runs ESLint |
| `npm test` / `npm run test:run` | Runs the unit and component tests (watch / once) |
| `npm run test:e2e` | Runs the Playwright tests (first time only: `npx playwright install chromium`) |

## Project structure

```
src/
  app/                 providers (React Query) and App
  pages/               ProductDetailsPage
  layouts/             MainLayout, AnnouncementBar, Header, Footer
  features/
    product-details/   api, components, hooks, utils, types
    cart/              store, components, types
    wishlist/          store, components
    reviews/           components, example data, filter helpers
  shared/
    ui/                Button, Drawer, Dropdown, QuantitySelector, ...
    utils/             cn, formatPrice, capitalize
  styles/              Tailwind theme tokens and fonts
  tests/               all unit, component and integration tests
e2e/                   Playwright tests
docs/                  architecture, state and component reference
```

Features export only through their `index.ts`, and `shared` never imports from a feature.

## State management

| Kind of state | Where it lives |
| --- | --- |
| Product data (server) | TanStack Query, cached for 5 minutes |
| Cart | Zustand store with Immer, only `items` is persisted |
| Selected color, size and quantity | `useVariantSelection` (local state) |
| Variant, price, stock, cart count and total | Calculated from the above, never stored |

Details and the reasoning are in [docs/state-management.md](docs/state-management.md).

## API

The page loads one product: `GET {VITE_API_URL}/products/slug/clear-theme/Sneakers12?join=reviews`. The slug is set in `ProductDetailsPage.tsx`. Only the fields the page uses are typed, in `product.types.ts`.

## Testing

- **Unit:** variant logic (`variants`), gallery and description helpers, `formatPrice`, and the cart store, including saving to and restoring from `localStorage`.
- **Component:** gallery, color and size options, description, quantity selector, dropdown, and the product page.
- **Integration:** `src/tests/cartFlow.test.tsx` covers choosing a variant, adding to the cart, the badge, the drawer, and the quantity limits.
- **End to end:** `e2e/cart.spec.ts` runs in Chromium against a mocked API. It covers choosing a variant, adding to the cart, the badge, changing the quantity, reloading, removing the item and the empty state, plus the error and retry flow.

## Documentation

The `docs/` folder has the full documentation, see [docs/README.md](docs/README.md).

- [Architecture](docs/ARCHITECTURE.md), [state management](docs/state-management.md), [API](docs/api.md), [testing](docs/testing.md)
- [App, page and layouts](docs/app.md) and [shared components](docs/shared.md)
- Features: [gallery](docs/features/product-gallery.md), [product info](docs/features/product-info.md), [variations](docs/features/variations.md), [add to cart](docs/features/add-to-cart.md), [cart](docs/features/cart.md), [wishlist](docs/features/wishlist.md), [reviews](docs/features/reviews.md)

## Deployment (Vercel)

1. Import the repository in Vercel. The Vite preset works as is (build command `npm run build`, output directory `dist`).
2. Add the environment variable `VITE_API_URL` for Production (and Preview).
3. Deploy, and put the link at the top of this file.

## Assumptions and limitations

- A variant `sale_price` of `0` means the variant has no sale of its own, so the product's `sale_price` is used.
- When a product does not track stock, the maximum quantity is 10. This limit is our own choice.
- The product has no size chart data in the API, so the size chart shows example values.
- The API returns no reviews, so the reviews section shows example reviews (labelled as such on the page).
- The images from the API do not match the color swatches, so selecting a color changes the swatch and the price, not the gallery.
- Categories are shown in the breadcrumb in the order the API returns them (duplicates removed).
- Cart items keep the price and the stock limit from the moment they were added.
- The API response is not validated at runtime, and only this product (colors and sizes) is covered.
- On a 320px wide phone the Add To Cart button can be 1px wider than the screen (its width comes from the design).
- The grey label color (`#8f8f8f`) comes from the design and is below the 4.5:1 text contrast ratio.
- Search, Sign in, the language and currency menus, and the newsletter form are only there to match the design and do not do anything yet.
- No memoization (`memo`, `useMemo`, `useCallback`): the page is small, nothing was measured as slow, and it keeps the code simple.
- Touch targets: the header icons have a 40px tap area. Quantity buttons and options keep the sizes from the Figma design.
