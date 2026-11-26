import { cn } from '@/shared/utils/cn';
import type { Variation } from '../product.types';

type SizeOptionsProps = {
  variation: Variation;
  selected: string;
  onSelect: (option: string) => void;
};

export function SizeOptions({ variation, selected, onSelect }: SizeOptionsProps) {
  return (
    <div className="flex flex-col gap-[18px]">
      <p className="text-label leading-[1.2] font-medium text-subtle">
        Size: <span className="font-semibold text-heading">{selected}</span>
      </p>

      <ul className="flex flex-wrap gap-3.5">
        {variation.props.map((option) => {
          const isSelected = option.name === selected;

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onSelect(option.name)}
                aria-pressed={isSelected}
                className={cn(
                  'h-10 w-[75px] rounded-lg border text-label leading-[1.2] font-semibold',
                  isSelected ? 'border-charcoal bg-surface-selected text-ink' : 'border-border text-link hover:border-charcoal'
                )}
              >
                {option.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
