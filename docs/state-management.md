# State management

| State                                                      | Where                                                       | Why                                                                                                                                     |
| ---------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Product from the API                                       | TanStack Query (`useProduct`, `staleTime` 5 min, one retry) | Server data: caching, loading and error states for free. The page and `ProductDetails` use the same query key, so there is one request. |
| Cart items, drawer open/closed                             | Zustand store with Immer and `persist`                      | Shared by the header badge, the product page and the drawer. Immer keeps the updates readable.                                          |
| Selected color, size, quantity                             | `useVariantSelection` (`useState`)                          | Only the product page needs it.                                                                                                         |
| Reviews tab, filters and page                              | `ProductReviews` (`useState`)                               | Only the reviews section needs it. The summary and the filtered list are calculated.                                                    |
| Header shadow, drawers opened from local buttons, zoom     | Component `useState`                                        | Temporary UI state that nothing else reads.                                                                                             |
| Wishlist items, drawer open/closed                         | Zustand store with Immer and `persist`                      | Shared by the heart on the product page, the header counter and the drawer. Same pattern as the cart.                                   |
| Variant, prices, max quantity, stock, cart count and total | Calculated                                                  | Derived values are never stored, so they cannot get out of sync.                                                                        |

## Cart store

`src/features/cart/store/cartStore.ts`. See [the cart feature](features/cart.md) for how it is used.

- Actions: `addItem`, `setQuantity`, `removeItem`, `clearCart`, `openCart`, `closeCart`. Selectors: `selectCartCount`, `selectCartTotal`.
- Item id is `${product.id}:${variant?.id ?? 'default'}`, so every variant is its own line.
- The quantity is always kept between 1 and the item's `maxQuantity`.
- `persist` saves under the key `cart` and uses `partialize` to keep only `items`. The shared `safeStorage` (`shared/utils/safeStorage.ts`, also used by the wishlist) and a `merge` that keeps only valid lines protect against blocked, full or edited storage.
- Cart items are snapshots: the name, image, price and `maxQuantity` are copied when the item is added, and `maxQuantity` is refreshed when the same variant is added again. Count and total are derived from the items.

## Variant selection

`utils/variants.ts` holds the logic as plain functions and `useVariantSelection` only keeps the state. See [variations](features/variations.md).

## Product request

`useProduct(slug)` wraps `getProductBySlug` in `useQuery`. React Query handles caching, the loading flag, the error flag and `refetch` (used by "Try again").
