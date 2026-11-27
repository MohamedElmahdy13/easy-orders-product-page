import { describe, expect, it } from 'vitest';
import type { Review } from '@/features/reviews/reviews.types';
import { exampleReviews } from '@/features/reviews/utils/exampleReviews';
import { filterReviews, getRatingSummary, paginate, toggleValue } from '@/features/reviews/utils/reviews';

const review = (overrides: Partial<Review>): Review => ({
  id: 'r',
  rating: 5,
  title: 'Title',
  date: '2020-01-01',
  author: 'Author',
  likes: 0,
  hasMedia: false,
  topics: [],
  ...overrides,
});

const all = { tab: 'all' as const, ratings: [], topics: [] };

describe('filterReviews', () => {
  const reviews = [
    review({ id: 'a', rating: 5, hasMedia: true, topics: ['Shipment'] }),
    review({ id: 'b', rating: 4, text: 'Nice', topics: ['Product Price'] }),
    review({ id: 'c', rating: 1, topics: ['Shipment', 'Product Price'] }),
  ];
  const ids = (list: Review[]) => list.map((r) => r.id);

  it('keeps everything when nothing is chosen', () => {
    expect(ids(filterReviews(reviews, all))).toEqual(['a', 'b', 'c']);
  });

  it('filters by tab', () => {
    expect(ids(filterReviews(reviews, { ...all, tab: 'media' }))).toEqual(['a']);
    expect(ids(filterReviews(reviews, { ...all, tab: 'description' }))).toEqual(['b']);
  });

  it('keeps reviews that match any chosen rating', () => {
    expect(ids(filterReviews(reviews, { ...all, ratings: [5, 1] }))).toEqual(['a', 'c']);
  });

  it('keeps reviews that match any chosen topic', () => {
    expect(ids(filterReviews(reviews, { ...all, topics: ['Shipment'] }))).toEqual(['a', 'c']);
  });

  it('combines the tab, the ratings and the topics', () => {
    expect(ids(filterReviews(reviews, { tab: 'all', ratings: [1], topics: ['Product Price'] }))).toEqual(['c']);
    expect(filterReviews(reviews, { tab: 'media', ratings: [1], topics: [] })).toEqual([]);
  });
});

describe('getRatingSummary', () => {
  it('calculates the average, the total and the count per star', () => {
    const summary = getRatingSummary([review({ rating: 5 }), review({ rating: 5 }), review({ rating: 2 })]);

    expect(summary.total).toBe(3);
    expect(summary.average).toBeCloseTo(4);
    expect(summary.counts).toEqual({ 5: 2, 4: 0, 3: 0, 2: 1, 1: 0 });
  });

  it('handles no reviews', () => {
    expect(getRatingSummary([]).average).toBe(0);
  });

  it('counts every example review', () => {
    expect(getRatingSummary(exampleReviews).total).toBe(exampleReviews.length);
  });
});

describe('paginate and toggleValue', () => {
  it('returns one page of items', () => {
    expect(paginate([1, 2, 3, 4, 5], 1, 2)).toEqual([1, 2]);
    expect(paginate([1, 2, 3, 4, 5], 3, 2)).toEqual([5]);
  });

  it('adds a missing value and removes an existing one', () => {
    expect(toggleValue([1], 2)).toEqual([1, 2]);
    expect(toggleValue([1, 2], 1)).toEqual([2]);
  });
});
