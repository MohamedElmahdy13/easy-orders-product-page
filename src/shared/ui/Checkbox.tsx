import type { InputHTMLAttributes } from 'react';
import { CheckIcon } from '@/shared/ui/icons';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

// 24px checkbox from the design: rounded square with a grey border, black with a white tick when checked.
// It is a real input, so the label, keyboard and screen readers work as usual.
export function Checkbox(props: CheckboxProps) {
  return (
    <span className="relative flex size-6 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        className="peer size-5 cursor-pointer appearance-none rounded-[5px] border-[1.5px] border-control checked:border-ink checked:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        {...props}
      />
      <CheckIcon className="pointer-events-none absolute hidden size-5 text-white peer-checked:block" />
    </span>
  );
}
