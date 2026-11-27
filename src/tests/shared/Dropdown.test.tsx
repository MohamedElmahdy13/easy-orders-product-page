import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Dropdown } from '@/shared/ui/Dropdown';

describe('Dropdown', () => {
  it('opens on click, calls onSelect and closes', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown button="Currency" items={[{ label: 'USD', onSelect }, { label: 'EUR' }]} />);

    expect(screen.queryByRole('menuitem', { name: 'USD' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Currency' }));
    await user.click(await screen.findByRole('menuitem', { name: 'USD' }));

    expect(onSelect).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'EUR' })).not.toBeInTheDocument());
  });
});
