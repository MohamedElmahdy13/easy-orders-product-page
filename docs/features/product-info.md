# Product info

The right side of the product page: name, price, stock status and description.

**Files:** `ProductInfo.tsx`, `StockStatus.tsx`, `ProductDescription.tsx` (in `features/product-details/components`), `utils/variants.ts` (prices and stock) and `utils/description.ts`.

## Name and price

`ProductInfo` shows the product name as the page `h1` and the price from `getPrices(product, variant)`:

- The regular price is the variant price (or the product price when there is no variant).
- The sale price is the variant `sale_price`, or the product `sale_price` when the variant has `0`.
- When there is a real sale (a sale price that is lower than the regular price), the old price is shown with a line through it next to the sale price.

Prices follow the selected variant, so choosing another color or size can change them.

## Stock status

`StockStatus` shows one of:

| Text          | When                                                            |
| ------------- | --------------------------------------------------------------- |
| In stock      | The product can be bought                                       |
| Only N left   | Stock is tracked and N is 5 or less                             |
| Out of stock  | The maximum quantity is 0                                       |
| Select a size | There are variants, but the chosen options do not match one yet |

When stock is not tracked, the product is always in stock (see the [cart limits](add-to-cart.md)).

## Description

`ProductDescription` shows the description from the store owner. The HTML is cleaned by `cleanDescription` (DOMPurify): only basic tags are kept (paragraphs, lists, bold, italic, headings and links), links open in a new tab, and the empty lines the editor adds are removed.

Long descriptions (more than 300 characters) are cut to a few lines with a "See More..." button that toggles "See Less". The button uses `aria-expanded`. An empty description shows nothing.

## Tests

`ProductDescription.test.tsx`, `description.test.ts`, `variants.test.ts` and `ProductDetails.test.tsx` in `src/tests/features/product-details/`.
