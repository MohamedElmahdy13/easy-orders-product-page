import { Fragment, useState } from 'react';
import { Divider } from '@/shared/ui/Divider';
import { FilterIcon } from '@/shared/ui/icons';
import { cn } from '@/shared/utils/cn';
import { exampleReviews } from '../utils/exampleReviews';
import {
  REVIEWS_PER_PAGE,
  filterReviews,
  getRatingSummary,
  paginate,
  toggleValue,
  type ReviewTab,
} from '../utils/reviews';
import { ReviewCard } from './ReviewCard';
import { ReviewFilters } from './ReviewFilters';
import { ReviewPagination } from './ReviewPagination';
import { ReviewSummary } from './ReviewSummary';

const tabs: { id: ReviewTab; label: string }[] = [
  { id: 'all', label: 'All Reviews' },
  { id: 'media', label: 'With Photo & Video' },
  { id: 'description', label: 'With Description' },
];

export function ProductReviews() {
  const [tab, setTab] = useState<ReviewTab>('all');
  const [ratings, setRatings] = useState<number[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  // On mobile the filter box is hidden until the funnel button opens it
  const [showFilters, setShowFilters] = useState(false);

  // The summary always counts every review. The list follows the filters.
  const summary = getRatingSummary(exampleReviews);
  const filtered = filterReviews(exampleReviews, { tab, ratings, topics });
  const pageCount = Math.max(1, Math.ceil(filtered.length / REVIEWS_PER_PAGE));
  const visible = paginate(filtered, page, REVIEWS_PER_PAGE);

  // A new filter can leave fewer pages, so always go back to the first one
  function selectTab(next: ReviewTab) {
    setTab(next);
    setPage(1);
  }

  function toggleRating(rating: number) {
    setRatings((current) => toggleValue(current, rating));
    setPage(1);
  }

  function toggleTopic(topic: string) {
    setTopics((current) => toggleValue(current, topic));
    setPage(1);
  }

  const filters = (
    <ReviewFilters
      ratings={ratings}
      topics={topics}
      onToggleRating={toggleRating}
      onToggleTopic={toggleTopic}
    />
  );

  return (
    <section aria-labelledby="reviews-title" className="flex flex-col gap-9 lg:gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:gap-6">
          <h2
            id="reviews-title"
            className="text-2xl leading-[1.4] font-semibold tracking-[-0.2px] text-ink lg:text-[28px] lg:leading-[1.2] lg:tracking-normal"
          >
            Product Reviews
          </h2>

          <ReviewSummary {...summary} />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          {/* Desktop: the filter box sits on the left of the list */}
          <div className="hidden lg:block lg:w-[278px] lg:shrink-0 lg:self-start">{filters}</div>

          <div className="flex flex-col gap-8 lg:w-[882px] lg:gap-[34px]">
            <div className="flex flex-col gap-4">
              <h3 className="text-base leading-[1.4] font-semibold tracking-[-0.2px] text-ink lg:text-[20px] lg:text-heading">
                Review Lists
              </h3>

              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {tabs.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={tab === id}
                      onClick={() => selectTab(id)}
                      className={cn(
                        'h-8 rounded-md border px-2.5 text-xs leading-[1.6] font-medium text-ink transition-colors',
                        'lg:h-auto lg:rounded-lg lg:py-[9px] lg:text-sm',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
                        tab === id
                          ? 'border-charcoal bg-surface-selected lg:px-5'
                          : 'border-track hover:bg-surface lg:border-border lg:px-4'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Mobile only: opens the same filters under the tabs */}
                <button
                  type="button"
                  aria-label="Filter reviews"
                  aria-expanded={showFilters}
                  onClick={() => setShowFilters((open) => !open)}
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-track text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:hidden"
                >
                  <FilterIcon className="size-5" />
                </button>
              </div>

              {showFilters && <div className="lg:hidden">{filters}</div>}
            </div>

            {visible.length === 0 ? (
              <p role="status" className="py-10 text-center text-base text-muted">
                No reviews match these filters.
              </p>
            ) : (
              <ul className="flex flex-col gap-6 lg:gap-8">
                {visible.map((review, index) => (
                  <Fragment key={review.id}>
                    {/* Dashed line between reviews, as in the design */}
                    {index > 0 && (
                      <li aria-hidden="true">
                        <Divider />
                      </li>
                    )}
                    <ReviewCard review={review} />
                  </Fragment>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <ReviewPagination page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
