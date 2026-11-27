import { DashedBox } from '@/shared/ui/DashedBox';
import { StarIcon } from '@/shared/ui/icons';
import { StarRating } from './StarRating';

type ReviewSummaryProps = {
  average: number;
  total: number;
  counts: Record<number, number>;
};

// The ring is drawn at 84px with a 3px line (64px on mobile, it scales). The orange part shows the average out of 5.
const RING_SIZE = 84;
const RING_STROKE = 3;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function RatingRing({ average }: { average: number }) {
  return (
    <div className="relative size-16 shrink-0 lg:size-21">
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        className="absolute inset-0 size-full"
      >
        <circle
          cx="42"
          cy="42"
          r={RING_RADIUS}
          fill="none"
          stroke="var(--color-track)"
          strokeWidth={RING_STROKE}
        />
        <circle
          cx="42"
          cy="42"
          r={RING_RADIUS}
          fill="none"
          stroke="var(--color-star)"
          strokeWidth={RING_STROKE}
          strokeDasharray={`${(average / 5) * RING_LENGTH} ${RING_LENGTH}`}
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center text-[18px] leading-[1.4] font-semibold tracking-[-0.2px] text-black-soft lg:text-[20px] lg:tracking-normal">
        {average.toFixed(1)}
      </p>
    </div>
  );
}

// Average rating on the left and one bar per star count on the right
export function ReviewSummary({ average, total, counts }: ReviewSummaryProps) {
  return (
    <DashedBox className="flex flex-col gap-6 py-4 pr-[23px] pl-[17px] lg:flex-row lg:items-start lg:gap-30 lg:p-6">
      <div className="flex items-center gap-4">
        <RatingRing average={average} />
        <div className="flex flex-col gap-1 lg:gap-2">
          <StarRating value={Math.round(average)} />
          <p className="text-xs leading-[1.6] font-medium text-black-soft lg:text-base lg:font-normal lg:text-link">
            from {total} reviews
          </p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {[5, 4, 3, 2, 1].map((star) => (
          <li
            key={star}
            className="flex items-center gap-3 text-xs leading-[1.6] font-medium text-black-soft lg:gap-6 lg:text-base"
          >
            <span className="flex shrink-0 items-center lg:gap-1">
              <span className="w-6 lg:w-auto">{star}.0</span>
              <StarIcon className="size-4 text-star lg:size-5" />
            </span>
            <span className="h-2 flex-1 rounded-lg bg-track">
              <span
                className="block h-full rounded-lg bg-heading"
                style={{ width: total === 0 ? 0 : `${(counts[star] / total) * 100}%` }}
              />
            </span>
            <span className="w-[30px] shrink-0 text-right lg:w-[39px] lg:text-left">{counts[star]}</span>
          </li>
        ))}
      </ul>
    </DashedBox>
  );
}
