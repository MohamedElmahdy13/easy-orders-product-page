import { useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShareIcon } from '@/shared/ui/icons';
import { useTemporaryMessage } from '@/shared/hooks/useTemporaryMessage';
import { IconButton } from '@/shared/ui/IconButton';
import { cn } from '@/shared/utils/cn';
import { getNextIndex } from '../utils/gallery';

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  // Where the zoom is centered, in percent of the image
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  // Short message next to the share button, for example "Link copied"
  const [shareMessage, showShareMessage] = useTemporaryMessage();

  function selectImage(index: number) {
    setSelectedIndex(index);
    setIsZoomed(false);
  }

  // Works for the mouse and for a finger, so the zoomed image can be moved on touch screens too
  function moveZoom(event: PointerEvent<HTMLButtonElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
  }

  // Left and right arrows change the image and Escape zooms out. This only works while the focus is
  // inside the gallery, and up and down are left alone so the page can still be scrolled.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Alt or Cmd with an arrow is the browser's back and forward, so do not touch it
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    if (event.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    } else if (images.length > 1 && event.key === 'ArrowLeft') {
      event.preventDefault();
      selectImage(getNextIndex(selectedIndex, images.length, -1));
    } else if (images.length > 1 && event.key === 'ArrowRight') {
      event.preventDefault();
      selectImage(getNextIndex(selectedIndex, images.length, 1));
    }
  }

  async function handleShare() {
    const url = window.location.href;

    // The share sheet of the phone or browser shows its own feedback
    if (navigator.share) {
      await navigator.share({ title: productName, url }).catch(() => {});
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showShareMessage('Link copied');
    } catch {
      showShareMessage('Could not copy the link');
    }
  }

  if (images.length === 0) {
    return <div className="aspect-458/610 w-full rounded-lg bg-surface" />;
  }

  return (
    <div role="group" aria-label="Product images" onKeyDown={handleKeyDown} className="flex flex-col gap-5 lg:gap-6">
      <div className="flex gap-3 lg:gap-[35px]">
        <button
          type="button"
          onClick={() => setIsZoomed((zoomed) => !zoomed)}
          onPointerDown={moveZoom}
          onPointerMove={isZoomed ? moveZoom : undefined}
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          className={cn(
            'aspect-458/610 min-w-0 flex-1 overflow-hidden rounded-lg bg-surface',
            // touch-none: while zoomed, dragging moves the image instead of scrolling the page
            isZoomed ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in'
          )}
        >
          <img
            key={images[selectedIndex]}
            src={images[selectedIndex]}
            alt={`${productName}, image ${selectedIndex + 1} of ${images.length}`}
            style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
            className={cn(
              'size-full animate-fade-in object-contain transition-transform duration-200 motion-reduce:animate-none motion-reduce:transition-none',
              isZoomed && 'scale-200'
            )}
          />
        </button>

        {/* Buttons column as tall as the image: share and wishlist on top, arrows at the bottom */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <div className="relative">
              <IconButton aria-label="Share" onClick={handleShare}>
                <ShareIcon />
              </IconButton>
              {/* Always on the page so screen readers announce the message. It sits on the left, over the image. */}
              <p
                role="status"
                className={cn(
                  'absolute top-1/2 right-full z-10 mr-2 -translate-y-1/2 rounded-md bg-ink px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white',
                  !shareMessage && 'hidden'
                )}
              >
                {shareMessage}
              </p>
            </div>
            <IconButton aria-label="Add to wishlist">
              <HeartIcon />
            </IconButton>
          </div>

          {images.length > 1 && (
            <div className="flex flex-col gap-4 lg:gap-5">
              <IconButton
                aria-label="Previous image"
                onClick={() => selectImage(getNextIndex(selectedIndex, images.length, -1))}
              >
                <ChevronLeftIcon className="rotate-90" />
              </IconButton>
              <IconButton
                aria-label="Next image"
                onClick={() => selectImage(getNextIndex(selectedIndex, images.length, 1))}
              >
                <ChevronRightIcon className="rotate-90" />
              </IconButton>
            </div>
          )}
        </div>
      </div>

      {/* p-1 and -m-1 leave room for the selected ring, which overflow-x would cut off */}
      <ul className="-m-1 flex gap-3.5 overflow-x-auto p-1 lg:gap-5">
        {images.map((image, index) => (
          <li key={image} className="shrink-0">
            <button
              type="button"
              onClick={() => selectImage(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === selectedIndex}
              className={cn(
                'block h-[73px] w-[55px] overflow-hidden rounded-md bg-surface lg:h-[101px] lg:w-[76px] lg:rounded-lg',
                index === selectedIndex && 'ring-1 ring-charcoal ring-offset-2'
              )}
            >
              <img src={image} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
