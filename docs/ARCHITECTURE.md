# Architecture

A small feature-based setup: four features (`product-details`, `cart`, `wishlist` and `reviews`), a `shared` layer, layouts and one page.

```
src/
  main.tsx
  app/                 App.tsx, providers.tsx
  pages/               ProductDetailsPage.tsx
  layouts/             MainLayout, AnnouncementBar, Header, Footer
  features/
    product-details/
      api/             product.api.ts          getProductBySlug (fetch + VITE_API_URL)
      components/      ProductDetails, ProductGallery, ProductInfo, ...
      hooks/           useProduct, useVariantSelection
      utils/           variants.ts, categories.ts, gallery.ts, description.ts
      product.types.ts
      index.ts
    cart/
      components/      CartButton, CartDrawer, CartItem, EmptyCart
      store/           cartStore.ts
      cart.types.ts
    reviews/
      components/      ProductReviews, ReviewSummary, ReviewFilters, ReviewCard, ReviewPagination, StarRating
      utils/           reviews.ts, exampleReviews.ts
      reviews.types.ts
    wishlist/
      components/      WishlistToggle, WishlistButton, WishlistDrawer, WishlistItem, EmptyWishlist
      store/           wishlistStore.ts
      wishlist.types.ts
      index.ts
  shared/
    ui/                generic components
    utils/             cn, formatPrice, capitalize
  styles/index.css     Tailwind @theme tokens and fonts
  tests/               all tests, same folders as the code they test
e2e/cart.spec.ts       Playwright
```

Page responsibilities: `App` (providers) > `MainLayout` (header, footer, announcement bar, cart drawer, wishlist drawer) > `ProductDetailsPage` (breadcrumb, the product and the reviews section) > `ProductDetails` (loading, error, selection) > `ProductGallery` and `ProductInfo`.

## Rules

- `shared` never imports from a feature. A feature never reaches into another feature's files, only its `index.ts` (`cart` and `wishlist` do not import `product-details`).
- Layouts and pages use features through their `index.ts` only.
- Generic components in `shared/ui` own their sizing and styling (variants), not the places that use them.
- A container only sets the width and `margin: auto` (`container-page`). Vertical spacing is padding on the section around it.
- The dashed line is one shared `Divider` component used everywhere.
- All tests live in `src/tests` (and `e2e/`), not next to the code.
- Derived values (variant, price, stock, cart count and total) are calculated, never stored.

## Why there is no memoization

Nothing in the page is expensive, the lists are tiny, and no slow render was measured. `memo`, `useMemo` and `useCallback` would add code without a real gain, so they are not used. Images use `loading="lazy"`, and the product request is cached by React Query.

## Things we did not build

A generic API client, a services layer, a router, axios, a global product store, checkout and auth. The task does not need them.
