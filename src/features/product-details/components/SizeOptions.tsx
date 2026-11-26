import { useState } from 'react';
import { cn } from '@/shared/utils/cn';
import type { Variation } from '../product.types';
import { SizeChartDrawer } from './SizeChartDrawer';

type SizeOptionsProps = {
  variation: Variation;
  selected: string;
  onSelect: (option: string) => void;
};

export function SizeOptions({ variation, selected, onSelect }: SizeOptionsProps) {
  const [isChartOpen, setIsChartOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex items-center justify-between">
        <p className="text-lg leading-[1.2] font-medium text-subtle lg:text-label">
          Size: <span className="font-semibold text-heading">{selected}</span>
        </p>
        <button
          type="button"
          onClick={() => setIsChartOpen(true)}
          className="text-body leading-[1.2] font-medium text-link underline hover:text-ink"
        >
          View Size Chart
        </button>
      </div>

      <ul className="flex flex-wrap gap-x-3.5 gap-y-[22px] lg:gap-y-3.5">
        {variation.props.map((option) => {
          const isSelected = option.name === selected;

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onSelect(option.name)}
                aria-pressed={isSelected}
                className={cn(
                  'h-[39px] w-[74px] rounded-md border text-label leading-[1.2] font-semibold lg:h-10 lg:w-[75px] lg:rounded-lg',
                  isSelected ? 'border-charcoal bg-surface-selected text-ink' : 'border-border text-link hover:border-charcoal'
                )}
              >
                {option.name}
              </button>
            </li>
          );
        })}
      </ul>

      <SizeChartDrawer
        open={isChartOpen}
        onClose={() => setIsChartOpen(false)}
        sizes={variation.props.map((option) => option.name)}
        selected={selected}
      />
    </div>
  );
}
