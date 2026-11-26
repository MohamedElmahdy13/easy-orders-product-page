import { cn } from '@/shared/utils/cn';
import type { Variation } from '../product.types';

type ColorOptionsProps = {
  variation: Variation;
  selected: string;
  onSelect: (option: string) => void;
};

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function ColorOptions({ variation, selected, onSelect }: ColorOptionsProps) {
  return (
    <div className="flex flex-col gap-[18px]">
      <p className="text-label leading-[1.2] font-medium text-subtle">
        Color: <span className="font-semibold text-heading">{capitalize(selected)}</span>
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
                aria-label={capitalize(option.name)}
                className={cn(
                  'block h-10 w-[75px] overflow-hidden rounded-lg',
                  isSelected && 'border border-ink bg-white p-[5px]'
                )}
              >
                <img src={option.value} alt="" className={cn('size-full object-cover', isSelected && 'rounded-md')} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
