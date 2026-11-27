# Variations (color and size)

Lets the shopper choose a color and a size. Only combinations that exist and can be bought are selectable.

**Files:** `ColorOptions.tsx`, `SizeOptions.tsx`, `SizeChartDrawer.tsx`, `hooks/useVariantSelection.ts` and `utils/variants.ts` (in `features/product-details`).

## How it works

- A **variant** is one combination, for example brown / 38. It has its own price and stock.
- **Color is the main variation** (the first one in the product). **Sizes depend on the selected color.**
- The default selection is the first variant that can be bought.
- A **color** is available when at least one variant with that color can be bought. A **size** is available when it can be bought together with the selected color. Unavailable options are disabled.
- When the shopper picks another color and the chosen size does not exist for it, the size is cleared and "Select a size" is shown until they pick another one.
- Products with no variations work too (there is just no selection).

## Pieces

| Piece | Role |
| --- | --- |
| `useVariantSelection(product)` | Keeps the selection and the quantity. The variant and the max quantity are calculated from them. |
| `findVariant` | The variant that matches every selected option. |
| `isOptionAvailable` | Whether a color or size can be picked now. |
| `selectOption` | The new selection after a pick (clears a size that no longer fits). |
| `ColorOptions` | Swatches with the selected color name. `aria-pressed` marks the selected one. |
| `SizeOptions` | Size buttons, unavailable ones are crossed out. Has a "View Size Chart" link. |
| `SizeChartDrawer` | Drawer with a size table. The values are examples (the drawer says so) because the API has no size chart. |

## Tests

`variants.test.ts` includes a check that every purchasable variant can be reached by clicking options. `VariationOptions.test.tsx` and the integration test `cartFlow.test.tsx` cover the buttons.
