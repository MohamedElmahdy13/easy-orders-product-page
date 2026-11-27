# Product gallery

Shows the product images and lets the shopper browse and zoom them.

**Files:** `features/product-details/components/ProductGallery.tsx` and `utils/gallery.ts`.

## Behavior

- Main image plus a row of thumbnails. Clicking a thumbnail shows that image.
- Previous and next buttons go around at both ends (the last image goes back to the first). They only show when there is more than one image.
- Click the main image to zoom in (2x) or out. While zoomed, moving the mouse changes the zoom point.
- A short fade animation runs when the image changes, and the zoom resets. Animations are off when the user prefers reduced motion.
- Share button: uses the native share sheet when the browser has it, otherwise copies the page link. There is no confirmation message yet.
- The wishlist heart is only part of the design and does nothing yet.
- With no images, a grey placeholder with the same ratio is shown.

## Props

`ProductGallery({ images, productName })`: `images` is a list of urls. `productName` is used for the `alt` text and the share title.

## Helpers (`utils/gallery.ts`)

- `getGalleryImages(product)`: the main `thumb` first, then the other images, without empty or repeated urls.
- `getNextIndex(current, total, step)`: the next or previous index, wrapping around.

## Accessibility

Every button has an `aria-label`. The zoom button changes its label between "Zoom in" and "Zoom out", the thumbnails use `aria-current`, and each image has descriptive `alt` text ("Name, image 2 of 5").

## Tests

`src/tests/features/product-details/ProductGallery.test.tsx` and `gallery.test.ts`.
