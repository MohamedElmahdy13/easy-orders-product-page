import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { QuantitySelector } from '@/shared/ui/QuantitySelector';

describe('QuantitySelector', () => {
  it('asks for one more or one less', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector value={2} onChange={onChange} max={5} />);

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }));
    expect(onChange).toHaveBeenLastCalledWith(3);

    await user.click(screen.getByRole('button', { name: 'Decrease quantity' }));
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it('cannot go below the minimum', () => {
    render(<QuantitySelector value={1} onChange={() => {}} max={5} />);
    expect(screen.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase quantity' })).toBeEnabled();
  });

  it('cannot go above the maximum', () => {
    render(<QuantitySelector value={5} onChange={() => {}} max={5} />);
    expect(screen.getByRole('button', { name: 'Increase quantity' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Decrease quantity' })).toBeEnabled();
  });
});
