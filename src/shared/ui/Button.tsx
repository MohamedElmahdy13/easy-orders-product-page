import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

const variants = {
  primary: 'bg-ink text-white hover:bg-charcoal',
  outline: 'border border-charcoal bg-white text-charcoal hover:bg-surface',
};

export function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-14.5 items-center justify-center rounded-lg px-6 text-label font-semibold transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
        'disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
