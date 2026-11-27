import { MinusIcon, PlusIcon } from '@/shared/ui/icons';
import { cn } from '@/shared/utils/cn';

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'md' | 'sm';
  className?: string;
};

const sizes = {
  md: { box: 'h-10', button: 'size-10', text: 'min-w-10 text-label' },
  sm: { box: 'h-8', button: 'size-8', text: 'min-w-8 text-body' },
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = Infinity,
  size = 'md',
  className,
}: QuantitySelectorProps) {
  const styles = sizes[size];
  const buttonClass = cn(
    styles.button,
    'inline-flex items-center justify-center text-ink transition-colors hover:bg-surface',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink',
    'disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent',
  );

  return (
    <div
      className={cn('inline-flex items-center rounded-lg border border-border', styles.box, className)}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        className={cn(buttonClass, 'rounded-l-lg')}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon className="size-4" />
      </button>

      <span className={cn(styles.text, 'text-center font-semibold')} aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        className={cn(buttonClass, 'rounded-r-lg')}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
