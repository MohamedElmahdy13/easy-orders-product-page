import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProductReviews } from '@/features/reviews/components/ProductReviews';
import { exampleReviews } from '@/features/reviews/utils/exampleReviews';
import { REVIEWS_PER_PAGE } from '@/features/reviews/utils/reviews';

describe('ProductReviews', () => {
  it('shows the summary and the first page of reviews', () => {
    render(<ProductReviews />);

    expect(screen.getByText(`from ${exampleReviews.length} reviews`)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').filter((item) => item.querySelector('h4'))).toHaveLength(REVIEWS_PER_PAGE);
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
  });

  it('changes page', async () => {
    const user = userEvent.setup();
    render(<ProductReviews />);

    await user.click(screen.getByRole('button', { name: 'Page 2' }));

    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument();
  });

  it('filters by rating and goes back to the first page', async () => {
    const user = userEvent.setup();
    render(<ProductReviews />);

    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    await user.click(screen.getByRole('checkbox', { name: '2 stars' }));

    expect(screen.getByText('The size chart was off for me.')).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Reviews pages' })).not.toBeInTheDocument();
  });

  it('filters by tab and shows a message when nothing matches', async () => {
    const user = userEvent.setup();
    render(<ProductReviews />);

    await user.click(screen.getByRole('button', { name: 'With Photo & Video' }));
    expect(screen.getByRole('button', { name: 'With Photo & Video' })).toHaveAttribute('aria-pressed', 'true');

    // No example review has a photo and only 1 star
    await user.click(screen.getByRole('checkbox', { name: '1 stars' }));
    expect(within(screen.getByRole('status')).getByText('No reviews match these filters.')).toBeInTheDocument();
  });

  it('adds and removes the shopper like on a review', async () => {
    const user = userEvent.setup();
    render(<ProductReviews />);

    await user.click(screen.getByRole('button', { name: 'Helpful, 128 likes' }));
    expect(screen.getByRole('button', { name: 'Helpful, 129 likes' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Helpful, 129 likes' }));
    expect(screen.getByRole('button', { name: 'Helpful, 128 likes' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('opens the mobile filters from the funnel button', async () => {
    const user = userEvent.setup();
    render(<ProductReviews />);
    const button = screen.getByRole('button', { name: 'Filter reviews' });

    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    // jsdom has no CSS, so the desktop box and the mobile box are both in the page
    expect(screen.getAllByRole('complementary', { name: 'Reviews filter' })).toHaveLength(2);
  });

  it('shows only the next arrow on the first page', () => {
    render(<ProductReviews />);

    expect(screen.queryByRole('button', { name: 'Previous page' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument();
  });
});
