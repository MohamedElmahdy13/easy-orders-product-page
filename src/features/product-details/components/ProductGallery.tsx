import { useState } from 'react';
import type { MouseEvent } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShareIcon } from '@/shared/ui/icons';
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

  function selectImage(index: number) {
    setSelectedIndex(index);
    setIsZoomed(false);
  }

  function moveZoom(event: MouseEvent<HTMLButtonElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
  }

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title: productName, url }).catch(() => {});
    } else {
      await navigator.clipboard?.writeText(url);
    }
  }

  if (images.length === 0) {
    return <div className="aspect-458/610 w-full rounded-lg bg-surface" />;
  }

  return (
    <div className="relative lg:flex lg:gap-[35px]">
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <button
          type="button"
          onClick={() => setIsZoomed((zoomed) => !zoomed)}
          onMouseMove={isZoomed ? moveZoom : undefined}
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
          className={cn(
            'aspect-458/610 w-full overflow-hidden rounded-lg bg-surface',
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          )}
        >
          <img
            src={images[selectedIndex]}
            alt={`${productName}, image ${selectedIndex + 1} of ${images.length}`}
            style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
            className={cn('size-full object-cover transition-transform duration-200', isZoomed && 'scale-200')}
          />
        </button>

        {/* p-1 and -m-1 leave room for the selected ring, which overflow-x would cut off */}
        <ul className="-m-1 flex gap-5 overflow-x-auto p-1">
          {images.map((image, index) => (
            <li key={image} className="shrink-0">
              <button
                type="button"
                onClick={() => selectImage(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === selectedIndex}
                className={cn(
                  'block h-[101px] w-[76px] overflow-hidden rounded-lg bg-surface',
                  index === selectedIndex && 'ring-1 ring-charcoal ring-offset-2'
                )}
              >
                <img src={image} alt="" className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* On mobile the buttons sit on top of the image. On desktop they are a column next to it. */}
      <div className="absolute top-3 right-3 flex flex-col gap-3 lg:static lg:h-[610px] lg:justify-between lg:gap-0">
        <div className="flex flex-col gap-3 lg:gap-5">
          <IconButton aria-label="Share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="Add to wishlist">
            <HeartIcon />
          </IconButton>
        </div>

        {images.length > 1 && (
          <div className="hidden flex-col gap-5 lg:flex">
            <IconButton aria-label="Previous image" onClick={() => selectImage(getNextIndex(selectedIndex, images.length, -1))}>
              <ChevronLeftIcon className="rotate-90" />
            </IconButton>
            <IconButton aria-label="Next image" onClick={() => selectImage(getNextIndex(selectedIndex, images.length, 1))}>
              <ChevronRightIcon className="rotate-90" />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
