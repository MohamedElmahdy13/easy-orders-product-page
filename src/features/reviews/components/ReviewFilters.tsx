import type { ReactNode } from 'react';
import { Checkbox } from '@/shared/ui/Checkbox';
import { DashedBox } from '@/shared/ui/DashedBox';
import { Divider } from '@/shared/ui/Divider';
import { ChevronDownIcon, StarIcon } from '@/shared/ui/icons';
import { REVIEW_TOPICS } from '../utils/reviews';

type ReviewFiltersProps = {
  ratings: number[];
  topics: string[];
  onToggleRating: (rating: number) => void;
  onToggleTopic: (topic: string) => void;
};

// Mobile uses the same sizes as the rest of the mobile reviews (12px text, 16px titles)
const optionClass =
  'flex items-center gap-2 text-xs leading-[1.6] font-semibold text-cool-gray lg:text-base';

// A group that opens and closes, with <details> so it needs no state
function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open className="group flex flex-col">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm leading-[1.4] font-semibold tracking-[-0.2px] text-ink lg:text-base [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDownIcon className="size-3 group-open:rotate-180" />
      </summary>
      <div className="mt-2 flex flex-col gap-2 lg:mt-3 lg:gap-3">{children}</div>
    </details>
  );
}

export function ReviewFilters({
  ratings,
  topics,
  onToggleRating,
  onToggleTopic,
}: ReviewFiltersProps) {
  return (
    <DashedBox className="p-4 lg:p-6">
      <aside aria-label="Reviews filter" className="flex flex-col gap-3 lg:gap-4">
        <h3 className="text-base leading-[1.4] font-semibold tracking-[-0.2px] text-ink lg:text-[20px] lg:text-heading">
          Reviews Filter
        </h3>
        <Divider />

        <div className="flex flex-col gap-4 pt-1 lg:gap-6 lg:pt-2">
          <FilterGroup title="Rating">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className={optionClass}>
                <Checkbox
                  checked={ratings.includes(rating)}
                  onChange={() => onToggleRating(rating)}
                />
                <span className="sr-only">{rating} stars</span>
                <span aria-hidden="true" className="flex items-center gap-1">
                  <StarIcon className="size-4 text-star lg:size-4.5" />
                  {rating}
                </span>
              </label>
            ))}
          </FilterGroup>

          <Divider />

          <FilterGroup title="Review Topics">
            {REVIEW_TOPICS.map((topic) => (
              <label key={topic} className={optionClass}>
                <Checkbox checked={topics.includes(topic)} onChange={() => onToggleTopic(topic)} />
                {topic}
              </label>
            ))}
          </FilterGroup>
        </div>
      </aside>
    </DashedBox>
  );
}
