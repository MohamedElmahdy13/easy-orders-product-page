# App shell, page and layouts

## `app/`

- `App.tsx`: `Providers` > `MainLayout` > `ProductDetailsPage`.
- `providers.tsx`: the React Query client (one retry for failed requests).

## `pages/ProductDetailsPage.tsx`

The only page. It renders the dashed `Divider`, the breadcrumb and `ProductDetails`, then a second section with a `Divider` and `ProductReviews`. The breadcrumb is `Homepage`, then the product categories, then the product name (or "Loading..." and "Product unavailable"). It uses the same `useProduct` query as `ProductDetails`, so there is a single request.

## `layouts/`

| Component         | What it does                                                                                                                                                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MainLayout`      | Announcement bar, header, `main`, footer, and the `CartDrawer` and `WishlistDrawer` (rendered once for the whole app). It also handles "Move to cart" (`moveToCart`), because it is the only place that knows both features.                                                              |
| `AnnouncementBar` | Black bar with the promo text. The timer text is static.                                                                                                                                                                                                                                  |
| `Header`          | Logo, search, Categories dropdown, sign in, `WishlistButton`, `CartButton`. Sticky at the top, with a light shadow once it is stuck. On mobile the icons collapse into a menu button that opens a drawer with the categories, sign in and the wishlist (`WishlistButton variant="menu"`). |
| `Footer`          | Link columns, newsletter field, social links, language and currency dropdowns, and the copyright line under the shared `Divider`.                                                                                                                                                         |

Demo only: search, sign in, the newsletter form, and the language and currency menus (they only change their own label). The Categories list is fixed because the API only returns the categories of one product.

The header and footer put the vertical padding on `<header>` and `<footer>`, and use `container-page` only for the width.
