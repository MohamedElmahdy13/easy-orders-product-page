import { useState } from 'react';
import { ThumbDownIcon, ThumbUpIcon } from '@/shared/ui/icons';
import { cn } from '@/shared/utils/cn';
import type { Review } from '../reviews.types';
import { StarRating } from './StarRating';

// "July 2, 2020 03:29 PM", in UTC so everybody sees the same date
function formatDate(date: string) {
  const options = { timeZone: 'UTC' } as const;
  const day = new Date(date).toLocaleDateString('en-US', { ...options, month: 'long', day: 'numeric', year: 'numeric' });
  const time = new Date(date).toLocaleTimeString('en-US', { ...options, hour: '2-digit', minute: '2-digit' });
  return `${day} ${time}`;
}

// Small on mobile (32px high), bigger on desktop (50px), as in the design
const voteButtonClass = cn(
  'flex h-8 items-center justify-center rounded-md border border-track text-xs leading-[1.6] text-ink transition-colors hover:bg-surface',
  'lg:h-[50px] lg:rounded-lg lg:p-3 lg:text-base',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
);

export function ReviewCard({ review }: { review: Review }) {
  // The shopper's own vote, only kept on this page (there is no API for it)
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const likes = review.likes + (vote === 'up' ? 1 : 0);

  function toggleVote(next: 'up' | 'down') {
    setVote((current) => (current === next ? null : next));
  }

  return (
    // Mobile: text on top, then the author and the votes on one row.
    // Desktop: the votes move to the right, at the bottom of the card.
    <li className="grid grid-cols-[1fr_auto] items-center gap-4 lg:gap-y-6">
      <div className="col-span-2 flex flex-col gap-3 lg:col-span-1 lg:gap-4">
        <StarRating value={review.rating} />

        <div className="flex flex-col gap-0.5 lg:gap-1">
          <h4 className="text-sm leading-[1.4] font-semibold tracking-[-0.2px] text-ink lg:text-[18px]">
            {review.title}
          </h4>
          {review.text && <p className="text-xs leading-[1.6] text-link lg:text-base">{review.text}</p>}
          <p className="text-xs leading-[1.6] text-cool-gray lg:text-base">{formatDate(review.date)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:col-start-1 lg:gap-3">
        <span
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-track text-xs font-semibold text-heading lg:size-8 lg:text-sm"
        >
          {review.author.charAt(0)}
        </span>
        <p className="text-xs leading-[1.6] font-medium text-black-soft lg:text-base">{review.author}</p>
      </div>

      <div className="flex gap-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:gap-4 lg:self-end">
        <button
          type="button"
          aria-label={`Helpful, ${likes} likes`}
          aria-pressed={vote === 'up'}
          onClick={() => toggleVote('up')}
          className={cn(voteButtonClass, 'gap-1 px-2.5 lg:min-w-20 lg:gap-2')}
        >
          <ThumbUpIcon className={cn('size-5 lg:size-6', vote === 'up' && 'fill-ink')} />
          {likes}
        </button>
        <button
          type="button"
          aria-label="Not helpful"
          aria-pressed={vote === 'down'}
          onClick={() => toggleVote('down')}
          className={cn(voteButtonClass, 'w-8 lg:w-auto')}
        >
          <ThumbDownIcon className={cn('size-5 lg:size-6', vote === 'down' && 'fill-ink')} />
        </button>
      </div>
    </li>
  );
}
