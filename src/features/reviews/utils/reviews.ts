import type { Review } from '../reviews.types';

export const REVIEWS_PER_PAGE = 4;

export const REVIEW_TOPICS = [
  'Product Quality',
  'Seller Services',
  'Product Price',
  'Shipment',
  'Match with Description',
];

export type ReviewTab = 'all' | 'media' | 'description';

export type ReviewFilters = {
  tab: ReviewTab;
  ratings: number[]; // empty means every rating
  topics: string[]; // empty means every topic
};

// A review is shown when it matches the tab, one of the chosen ratings and one of the chosen topics
export function filterReviews(
  reviews: Review[],
  { tab, ratings, topics }: ReviewFilters
): Review[] {
  return reviews.filter((review) => {
    if (tab === 'media' && !review.hasMedia) return false;
    if (tab === 'description' && !review.text) return false;
    if (ratings.length > 0 && !ratings.includes(review.rating)) return false;
    if (topics.length > 0 && !review.topics.some((topic) => topics.includes(topic))) return false;
    return true;
  });
}

// Average, total and how many reviews each star count has. Calculated, never stored.
export function getRatingSummary(reviews: Review[]) {
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const review of reviews) counts[review.rating] += 1;

  const total = reviews.length;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return { average: total === 0 ? 0 : sum / total, total, counts };
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  return items.slice((page - 1) * pageSize, page * pageSize);
}

// Adds the value to the list, or removes it when it is already there
export function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}
