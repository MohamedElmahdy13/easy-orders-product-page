# Architecture (final, agreed 2026-11-26)

A practical, feature-based setup with two features (product-details and cart), a shared layer, and layouts.

```
src/
  main.tsx
  app/            App.tsx, providers.tsx
  pages/          ProductDetailsPage.tsx              composes the page sections
  layouts/        MainLayout, AnnouncementBar, Header, Footer
  features/
    product-details/
      api/product.api.ts                    getProductBySlug(slug, signal) with native fetch + VITE_API_URL
      components/  ProductDetails (owns useVariantSelection), ProductGallery,
                   ProductInfo, ProductDescription, ColorOptions, SizeOptions, StockStatus, AddToCartActions, ProductReviews (bonus)
      hooks/       useProduct.ts, useVariantSelection.ts
      utils/       variants.ts (+ variants.test.ts), gallery.ts
      product.types.ts
      index.ts
    cart/
      components/  CartButton, CartDrawer, CartItem, EmptyCart
      cart.store.ts (+ cart.store.test.ts)   Zustand + Immer + persist (partialize: items only)
      cart.selectors.ts
      cart.types.ts
      index.ts
  components/product/   ProductCard, ProductCollection   (reusable page sections, mock data)
  shared/
    ui/      Button, IconButton, QuantitySelector, Drawer, Badge, Skeleton
    utils/   formatPrice.ts, cn.ts
  styles/index.css      Tailwind @theme tokens + fonts
  assets/
  test/    setup.ts, fixtures/product.json, renderWithProviders.tsx
e2e/cart.spec.ts
```

## Not doing (no real need)
Generic API client, services/repository layer, query key factory, router, axios, global product/variant store, checkout or auth features.

## Rules
- `shared` never imports from features. Layouts and pages import features through `index.ts` only.
- Server state lives in TanStack Query. Local selection uses useState in custom hooks. The cart is global in Zustand. Derived values (variant, price, availability, subtotal) are **computed, never stored**.
- `useVariantSelection` lives in **ProductDetails**, the common parent of Gallery and Info.
- Cart item id: `${product.id}:${variant?.id ?? 'default'}`. Only `items` is persisted, not `isOpen`.
- Every component is responsive from the start, mobile first.
- Unit tests sit next to the file they test.
- Mock data for related/popular products is clearly labeled. No fake reviews: the reviews section shows an empty state.

- Inside a feature use direct imports; across features only via index.ts.
- No `any`, no unnecessary memo, no premature abstractions, semantic HTML, keyboard-accessible controls.

## Page responsibilities
App (providers) > MainLayout (header, footer, announcement, CartDrawer) > ProductDetailsPage (fetch, loading/error, sections) > ProductDetails (variant selection) > ProductGallery / ProductInfo (UI).

## Assumptions (write these in the README)
- Variant `sale_price: 0` means the variant has no sale of its own, so it falls back to the product's `sale_price`.
- Max quantity is the stock when `track_stock` is true. Otherwise it's capped at 10, which is our own assumption.

## Branches
| Branch | Scope |
|---|---|
| `chore/project-setup` | structure, alias, providers, env, tokens + fonts, test setup |
| `feat/product-details` | API, types, gallery, variants, price, description, responsive |
| `feat/cart` | store + tests, persistence, drawer, CartButton, integration test |
| `feat/page-layout` | header, footer, announcement bar, breadcrumb, related/popular, reviews |
| `test/quality-assurance` | e2e, accessibility, edge cases |
| `docs/readme` | README, build, Vercel deploy |
