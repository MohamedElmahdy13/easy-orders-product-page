# Cart

A persistent cart with a badge in the header and a drawer.

**Files:** `src/features/cart/` (`store/cartStore.ts`, `components/`, `cart.types.ts`, `index.ts`). The feature exports `CartButton`, `CartDrawer`, `useCartStore` and the `CartItem` type.

## Store

Zustand with Immer and `persist`.

| Action / selector | What it does |
| --- | --- |
| `addItem(item)` | Adds a line, or adds to the quantity when the same variant is already there. Refreshes `maxQuantity` with the current stock. |
| `setQuantity(id, quantity)` | Sets the quantity, kept between 1 and `maxQuantity`. |
| `removeItem(id)` | Removes the line. |
| `openCart()` / `closeCart()` | Shows or hides the drawer. |
| `selectCartCount` | Total number of units. |
| `selectCartTotal` | Sum of price times quantity. |

The count and the total are calculated from the items, not stored. Prices in the cart are the unit price when the item was added.

## Persistence

The store is saved in `localStorage` under the key `cart`. Only `items` is saved (`partialize`), so the drawer is always closed after a reload.

## Components

| Component | What it does |
| --- | --- |
| `CartButton` | Header icon with a badge showing the count (hidden at 0). Its label is "Cart, N items". Opens the drawer. |
| `CartDrawer` | The drawer: list of items and the total in the footer, or the empty state. Rendered once in `MainLayout`. |
| `CartItem` | Image, name, color and size, quantity selector (limited by `maxQuantity`), line price and a remove button. |
| `EmptyCart` | "Your cart is empty" message. |

## Tests

`cartStore.test.ts` (store), `cartPersistence.test.ts` (saving and restoring), `cartFlow.test.tsx` (integration) and `e2e/cart.spec.ts` (browser, including a reload).
