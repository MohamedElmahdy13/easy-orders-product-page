# Wishlist

A heart on the product page that saves the selected color and size, and a drawer in the header that lists the saved items.

**Files:** `src/features/wishlist/` (`store/wishlistStore.ts`, `components/`, `wishlist.types.ts`, `index.ts`). The feature exports `WishlistToggle`, `WishlistButton`, `WishlistDrawer`, `useWishlistStore` and the `WishlistItem` type.

## Store

Zustand with Immer and `persist`, same pattern as the cart.

| Action / selector | What it does |
| --- | --- |
| `toggleItem(item)` | Saves the item, or removes it when this exact variant is already saved. |
| `removeItem(id)` | Removes the line. |
| `clearWishlist()` | Removes every line. |
| `openWishlist()` / `closeWishlist()` | Shows or hides the drawer. |
| `selectWishlistCount` | Number of saved lines. |
| `selectIsWishlisted(id)` | Whether one variant is saved. |

Each line is one product with one color and size (`id` is `productId:variantId`, like the cart). It keeps a snapshot of the name, image, unit price, color, size and stock (`maxQuantity`) from when it was saved, so no API call is needed. The count is calculated, not stored.

## Persistence

Saved in `localStorage` under the key `wishlist`. Only `items` is saved, so the drawer is always closed after a reload. Like the cart, the saved data is treated as untrusted: if the browser blocks or cannot write `localStorage` the wishlist still works and is just not saved, and when loading anything that is not a list of valid items is ignored.

## Components

| Component | What it does |
| --- | --- |
| `WishlistToggle` | The heart in the gallery. It saves the selected color and size. Uses `aria-pressed` and its label changes between "Add to wishlist" and "Remove from wishlist". The heart is filled when this variant is saved. |
| `WishlistButton` | The heart with a badge showing the count (hidden at 0). Its label is "Wishlist, N items" and it opens the drawer. `variant="icon"` is the header heart, `variant="menu"` adds the "Wishlist" text for the mobile menu, and `onOpen` lets the menu close first. The header only renders it, all the wishlist logic stays in the feature. |
| `WishlistDrawer` | The drawer: list of items and a "Clear wishlist" link in the footer, or the empty state. Rendered once in `MainLayout`. |
| `WishlistItem` | Image, name, color and size, price, a remove button and a small underlined "Move to cart" link, styled like "View Size Chart" (disabled and shown as "Sold out" when the saved stock is 0). |
| `EmptyWishlist` | "Your wishlist is empty" message. |

## Wishlist and cart

They are two separate lists, so the same variant can be in both. The wishlist does not import the cart: `WishlistDrawer` gets an `onMoveToCart` prop, and `MainLayout` (which knows both features) adds one unit to the cart and removes the line from the wishlist. If the variant is already in the cart its quantity goes up by one, up to the stock limit.

On mobile the header heart is hidden, so the "Wishlist" entry in the menu closes the menu and opens the drawer.

## Tests

`wishlistStore.test.ts` (store and persistence), `Wishlist.test.tsx` (toggle, header button and drawer), `wishlistFlow.test.tsx` (moving an item to the cart through `MainLayout`) and the wishlist test in `e2e/cart.spec.ts` (two variants, reload, move to cart).
