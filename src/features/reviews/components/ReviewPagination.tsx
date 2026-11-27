import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/ui/icons';
import { cn } from '@/shared/utils/cn';

type ReviewPaginationProps = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
};

const focusClass =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';
const arrowClass = cn(
  'flex size-9 items-center justify-center rounded-md text-ink hover:bg-surface lg:size-11 lg:rounded-lg',
  focusClass
);

// Like the design: page buttons, and an arrow only where there is a page to go to
export function ReviewPagination({ page, pageCount, onChange }: ReviewPaginationProps) {
  if (pageCount <= 1) return null;

  return (
    // The left padding comes from the design: 24px on mobile, 300px on desktop to sit under the review list
    <div className="flex justify-center">
      <nav aria-label="Reviews pages" className="flex gap-1.5 pl-6 lg:gap-2 lg:pl-[300px]">
        {page > 1 && (
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => onChange(page - 1)}
            className={arrowClass}
          >
            <ChevronLeftIcon className="size-6" />
          </button>
        )}

        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            type="button"
            aria-label={`Page ${number}`}
            aria-current={number === page ? 'page' : undefined}
            onClick={() => onChange(number)}
            className={cn(
              'flex size-9 items-center justify-center rounded-md border bg-white text-xs leading-[1.6] font-medium hover:bg-surface',
              'lg:size-11 lg:rounded-lg lg:text-sm',
              focusClass,
              number === page ? 'border-charcoal text-ink' : 'border-track text-page-number'
            )}
          >
            {number}
          </button>
        ))}

        {page < pageCount && (
          <button
            type="button"
            aria-label="Next page"
            onClick={() => onChange(page + 1)}
            className={arrowClass}
          >
            <ChevronRightIcon className="size-6" />
          </button>
        )}
      </nav>
    </div>
  );
}
