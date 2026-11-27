# Testing

All tests are in `src/tests` (same folders as the code) and `e2e/`.

| Level       | Where                                                            | What it covers                                                                                                                                             |
| ----------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit        | `src/tests/features/**`, `src/tests/shared/**`                   | Variant logic, gallery and description helpers, review filters and summary, `formatPrice`, the cart and wishlist stores and their persistence              |
| Component   | `src/tests/features/product-details`, `src/tests/shared`         | Gallery, color and size options, description, quantity selector, dropdown, product page                                                                    |
| Integration | `src/tests/cartFlow.test.tsx`, `src/tests/wishlistFlow.test.tsx` | Choosing a variant, adding to the cart, the badge, the drawer, quantity limits, moving a wishlist item to the cart                                         |
| End to end  | `e2e/cart.spec.ts`                                               | In Chromium with a mocked API: choose a variant, add, change the quantity, reload, remove, empty state, error and retry, wishlist, move to cart and reload |

## Running

```bash
npm run test:run                    # unit, component and integration, once
npm test                            # watch mode
npx playwright install chromium     # first time only
npm run test:e2e                    # end to end
```

Shared setup is in `src/tests/setup.ts`, and `src/tests/productFixture.ts` has a small product (2 colors, 2 sizes) for the tests.

The end-to-end test answers the product request itself, so it does not need the real API or an internet connection. It starts its own dev server on port 5174.
