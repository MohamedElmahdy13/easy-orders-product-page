import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProductGallery } from '@/features/product-details/components/ProductGallery';

const images = ['a.jpg', 'b.jpg', 'c.jpg'];

function renderGallery(list = images) {
  render(<ProductGallery images={list} productName="Boot" />);
}

describe('ProductGallery', () => {
  it('shows the first image and changes it when a thumbnail is clicked', async () => {
    const user = userEvent.setup();
    renderGallery();

    expect(screen.getByAltText('Boot, image 1 of 3')).toHaveAttribute('src', 'a.jpg');

    await user.click(screen.getByRole('button', { name: 'Show image 2' }));
    expect(screen.getByAltText('Boot, image 2 of 3')).toHaveAttribute('src', 'b.jpg');
  });

  it('goes around when using the next and previous buttons', async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.click(screen.getByRole('button', { name: 'Previous image' }));
    expect(screen.getByAltText('Boot, image 3 of 3')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next image' }));
    expect(screen.getByAltText('Boot, image 1 of 3')).toBeInTheDocument();
  });

  it('zooms in and out, and zooms out when another image is chosen', async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByRole('button', { name: 'Zoom out' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Zoom out' }));
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Zoom in' }));
    await user.click(screen.getByRole('button', { name: 'Show image 2' }));
    expect(screen.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument();
  });

  it('moves the zoom point with the pointer, so a finger can move the zoomed image', async () => {
    const user = userEvent.setup();
    renderGallery();
    const zoomButton = screen.getByRole('button', { name: 'Zoom in' });
    // jsdom has no layout, so give the button a 400 x 600 box at the top left
    zoomButton.getBoundingClientRect = () => ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;
    const image = screen.getByAltText('Boot, image 1 of 3');

    await user.click(zoomButton);
    expect(zoomButton).toHaveClass('touch-none');

    fireEvent.pointerMove(zoomButton, { clientX: 100, clientY: 450 });
    expect(image).toHaveStyle({ transformOrigin: '25% 75%' });

    fireEvent.pointerMove(zoomButton, { clientX: 300, clientY: 150 });
    expect(image).toHaveStyle({ transformOrigin: '75% 25%' });
  });

  it('zooms in where the shopper touched, and does not block page scroll when not zoomed', () => {
    renderGallery();
    const zoomButton = screen.getByRole('button', { name: 'Zoom in' });
    zoomButton.getBoundingClientRect = () => ({ left: 0, top: 0, width: 400, height: 600 }) as DOMRect;

    expect(zoomButton).not.toHaveClass('touch-none');

    fireEvent.pointerDown(zoomButton, { clientX: 400, clientY: 0 });
    expect(screen.getByAltText('Boot, image 1 of 3')).toHaveStyle({ transformOrigin: '100% 0%' });
  });

  it('hides the previous and next buttons when there is only one image', () => {
    renderGallery(['a.jpg']);
    expect(screen.queryByRole('button', { name: 'Next image' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Previous image' })).not.toBeInTheDocument();
  });

  it('shows an empty box when there are no images', () => {
    renderGallery([]);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Zoom in' })).not.toBeInTheDocument();
  });
});
