# Add to cart

Choosing a quantity and putting the selected variant in the cart.

**Files:** `ProductDetails.tsx` (the logic, in `ProductContent`), `AddToCartActions.tsx`, `shared/ui/QuantitySelector.tsx` and `utils/variants.ts`.

## Quantity rules

- The maximum for a variant is its stock when stock is tracked. When it is not tracked, the maximum is 10. When the chosen options do not match a variant, it is 0.
- The quantity is never below 1 or above what can still be added: **the maximum minus what is already in the cart** for that variant.
- If the cart already has the maximum, "Add To Cart" is disabled and the message "You already have the maximum quantity in your cart" is shown.
- If the product or variant is out of stock, both buttons are disabled.
- Changing the variant can lower the maximum, and the quantity is lowered with it.

## Buttons

- **Add To Cart** adds the item and shows "Added to cart ✓" for 2 seconds (`useTemporaryMessage`). Clicking again restarts the 2 seconds, so the message does not disappear too early. The message sits under the buttons, so the page does not move, and it is announced to screen readers (`role="status"`).
- **Checkout Now** adds the item and opens the cart drawer. There is no checkout step in this project.

The item sent to the cart has the id `product.id:variant.id`, the product name and image, the unit price of the selected variant, the chosen color and size, the quantity and the maximum quantity.

## Tests

`src/tests/cartFlow.test.tsx` (adding, badge, maximum in cart, remaining quantity), `QuantitySelector.test.tsx`, `ProductDetails.test.tsx` and `e2e/cart.spec.ts`.
