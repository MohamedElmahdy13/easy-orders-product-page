import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProductDescription } from '@/features/product-details/components/ProductDescription';

describe('ProductDescription', () => {
  it('shows a short description without a toggle', () => {
    render(<ProductDescription html="<p>Nice shoes</p>" />);

    expect(screen.getByText('Nice shoes')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows nothing when the description is empty', () => {
    const { container } = render(<ProductDescription html="<p><br></p>" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('expands and collapses a long description', async () => {
    const user = userEvent.setup();
    render(<ProductDescription html={`<p>${'word '.repeat(100)}</p>`} />);

    const toggle = screen.getByRole('button', { name: 'See More...' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'See Less' })).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'See Less' }));
    expect(screen.getByRole('button', { name: 'See More...' })).toHaveAttribute('aria-expanded', 'false');
  });
});
