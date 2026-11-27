import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { makeProduct } from '@/tests/productFixture';
import { ColorOptions } from '@/features/product-details/components/ColorOptions';
import { SizeOptions } from '@/features/product-details/components/SizeOptions';

const [colors, sizes] = makeProduct().variations;

describe('ColorOptions', () => {
  it('marks the selected color and tells which one was clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ColorOptions variation={colors} selected="brown" onSelect={onSelect} isAvailable={() => true} />);

    expect(screen.getByRole('button', { name: 'Brown' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Black' })).toHaveAttribute('aria-pressed', 'false');

    await user.click(screen.getByRole('button', { name: 'Black' }));
    expect(onSelect).toHaveBeenCalledWith('black');
  });

  it('does not allow an unavailable color to be picked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ColorOptions variation={colors} selected="brown" onSelect={onSelect} isAvailable={(name) => name !== 'black'} />,
    );

    expect(screen.getByRole('button', { name: 'Black' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Black' }));
    expect(onSelect).not.toHaveBeenCalled();
  });
});

describe('SizeOptions', () => {
  it('marks the selected size and tells which one was clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SizeOptions variation={sizes} selected="38" onSelect={onSelect} isAvailable={() => true} />);

    expect(screen.getByRole('button', { name: '38' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: '40' }));
    expect(onSelect).toHaveBeenCalledWith('40');
  });

  it('does not allow an unavailable size to be picked, and shows no selection when none is chosen', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SizeOptions variation={sizes} onSelect={onSelect} isAvailable={(name) => name !== '38'} />);

    expect(screen.getByRole('button', { name: '38' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '40' })).toHaveAttribute('aria-pressed', 'false');

    await user.click(screen.getByRole('button', { name: '38' }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('opens the size chart', async () => {
    const user = userEvent.setup();
    render(<SizeOptions variation={sizes} selected="38" onSelect={() => {}} isAvailable={() => true} />);

    await user.click(screen.getByRole('button', { name: 'View Size Chart' }));

    const chart = await screen.findByRole('dialog');
    expect(within(chart).getByRole('table')).toBeInTheDocument();
  });
});
