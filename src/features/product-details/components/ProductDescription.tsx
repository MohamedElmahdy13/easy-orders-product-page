import { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import { cleanDescription } from '../utils/description';

// Descriptions shorter than this fit in the collapsed height
const SHORT_DESCRIPTION_LENGTH = 300;

export function ProductDescription({ html }: { html: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = cleanDescription(html);

  if (!description) return null;

  const isLong = description.length > SHORT_DESCRIPTION_LENGTH;

  return (
    <section className="flex flex-col gap-2.5">
      <h2 className="font-raleway text-lg font-bold text-heading lg:text-label">Description:</h2>

      <div
        id="product-description"
        className={cn(
          'text-sm leading-[1.3] text-muted lg:text-body',
          '[&_a]:underline [&_li]:mt-1 [&_p]:mt-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5',
          isLong && !isExpanded && 'line-clamp-5 lg:line-clamp-4',
        )}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {isLong && (
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          aria-controls="product-description"
          className="self-start text-sm font-medium text-muted hover:text-ink lg:text-body"
        >
          {isExpanded ? 'See Less' : 'See More...'}
        </button>
      )}
    </section>
  );
}
