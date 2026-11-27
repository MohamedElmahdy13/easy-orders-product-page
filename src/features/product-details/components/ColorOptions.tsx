import { capitalize } from '@/shared/utils/capitalize';
import { cn } from '@/shared/utils/cn';
import type { Variation } from '../product.types';

type ColorOptionsProps = {
  variation: Variation;
  selected: string;
  onSelect: (option: string) => void;
  isAvailable: (option: string) => boolean;
};

export function ColorOptions({ variation, selected, onSelect, isAvailable }: ColorOptionsProps) {
  return (
    <div className="flex flex-col gap-[18px]">
      <p className="text-lg leading-[1.2] font-medium text-subtle lg:text-label">
        Color: <span className="font-semibold text-heading">{capitalize(selected)}</span>
      </p>

      <ul className="flex flex-wrap gap-[13.4px] lg:gap-3.5">
        {variation.props.map((option) => {
          const isSelected = option.name === selected;

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onSelect(option.name)}
                disabled={!isAvailable(option.name)}
                aria-pressed={isSelected}
                aria-label={capitalize(option.name)}
                className={cn(
                  'block h-[39px] w-[73.7px] overflow-hidden rounded-md lg:h-10 lg:w-[75px] lg:rounded-lg',
                  isSelected && 'border border-ink bg-white p-[5px]',
                  !isAvailable(option.name) && 'opacity-30',
                )}
              >
                <img
                  src={option.value}
                  alt=""
                  loading="lazy"
                  className={cn('size-full object-cover', isSelected && 'rounded-sm lg:rounded-md')}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
