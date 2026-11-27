import { StarIcon } from '@/shared/ui/icons';

type StarRatingProps = {
  value: number; // whole number from 0 to 5
};

// Five 20px stars with a 4px gap, the first `value` of them filled
export function StarRating({ value }: StarRatingProps) {
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} className={star <= value ? 'size-5 text-star' : 'size-5 text-track'} />
      ))}
    </span>
  );
}
