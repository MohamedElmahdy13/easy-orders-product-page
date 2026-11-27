# Shared

Code in `src/shared` does not know about any feature.

## UI (`shared/ui`)

| Component | What it does |
| --- | --- |
| `Button` | `primary` and `outline` variants with a fixed height. Owns its width and padding. |
| `IconButton` | Grey square button for icons (share, wishlist, gallery arrows). Needs an `aria-label`. |
| `DashedBox` | Box with the design's dashed border (0.8px, 6px dashes, 4px radius on mobile and 8px on desktop), drawn as an SVG. Used by the reviews summary and filter. |
| `Checkbox` | 24px checkbox from the design. A real input, so labels and the keyboard work. |
| `QuantitySelector` | Minus, value and plus buttons. Props: `value`, `onChange`, `min`, `max`, `size` (`md`, `sm`). |
| `Drawer` | Slide-in panel from the right (Headless UI Dialog): focus trap, Escape to close, scroll lock. Props: `open`, `onClose`, `title`, `footer`. |
| `Dropdown` | Button with a menu (Headless UI Menu). Props: `button`, `items`, `selected`, `anchor`. The menu does not lock page scroll. |
| `Breadcrumb` | Trail of items. Items without `href` are plain text, and the last one is the current page. |
| `Divider` | The dashed separator from the design (0.5px, 6px dash and gap). |
| `Badge` | Small counter. Hidden at 0, shows `99+` above 99. |
| `Skeleton` | Loading placeholder. |
| `icons` | SVG icons. |

## Utils (`shared/utils`)

| Function | What it does |
| --- | --- |
| `cn(...classes)` | Joins class names and skips empty values. |
| `formatPrice(amount)` | Formats a number like `$28.00`. |
| `capitalize(text)` | Upper-cases the first letter. |
| `safeStorage` | `localStorage` for Zustand `persist` that never throws when the browser blocks or fills it. Used by the cart and the wishlist stores. |

## Hooks (`shared/hooks`)

| Hook | What it does |
| --- | --- |
| `useTemporaryMessage(duration = 2000)` | Returns `[message, showMessage]`. `showMessage('Link copied')` shows the text and clears it after `duration` ms. Showing a message again restarts the timer, and the timer stops when the component is removed. Used for "Added to cart" and the share message. |
