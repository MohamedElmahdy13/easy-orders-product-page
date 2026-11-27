import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

// The width of each button comes from its padding (the design hugs the text), so no fixed width is needed
const variants = {
  primary: 'bg-ink px-[99px] text-white hover:bg-charcoal lg:px-[80px] xl:px-[93px]',
  outline: 'border border-border-strong bg-white px-[35px] text-charcoal lg:px-[30px] hover:bg-surface',
};

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-14 shrink-0 items-center justify-center rounded-md text-lg font-semibold whitespace-nowrap transition-colors lg:h-14.5 lg:rounded-lg lg:text-label',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
        'disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
