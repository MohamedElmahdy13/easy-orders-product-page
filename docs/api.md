# API

`GET {VITE_API_URL}/products/slug/clear-theme/{slug}?join=reviews`

Code: `features/product-details/api/product.api.ts`. A response that is not 2xx throws, and React Query shows the error state with a "Try again" button. `VITE_API_URL` has no fallback: set it in `.env` locally and in the Vercel project settings.

The slug (`Sneakers12`) is set in `ProductDetailsPage.tsx`.

## Typed fields

Only the fields the page uses are typed, in `product.types.ts`:

- **Product:** `id`, `name`, `slug`, `description` (HTML), `price`, `sale_price`, `thumb`, `images`, `quantity`, `track_stock`, `variations`, `variants`, `categories`.
- **Variation:** `id`, `name` (`color` or `size`), `type`, `props` (each with `id`, `name` and, for colors, an image `value`).
- **Variant:** `id`, `price`, `sale_price`, `quantity`, `variation_props` (which option of each variation it is).
- **Category:** `id`, `name`.

## Assumptions about the data

- A variant `sale_price` of `0` means "no sale on this variant", so the product `sale_price` is used.
- When `track_stock` is `false`, the maximum quantity is 10 (our own limit).
- The first variation is the main one (color). Sizes depend on the selected color.
- The description is HTML from the store owner, so it is cleaned with DOMPurify before it is shown.
- The images from the API do not match the color swatches, so choosing a color does not change the gallery.
- Categories come as a flat list and may repeat, so duplicates are removed and the API order is kept.
- The API has no size chart data, so the size chart shows example values.

## Known limits

- The response is trusted: its shape is not validated at runtime (no validation library on purpose). A response with a very different shape would show an error or break the page.
- Only the supplied product is covered. Products with other variation names than `color` and `size` are not designed for.
