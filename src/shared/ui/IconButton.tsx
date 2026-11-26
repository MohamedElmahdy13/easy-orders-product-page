import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // Required so screen readers know what the button does
  'aria-label': string;
};

// 52x52 grey square from the Figma (share, wishlist, gallery arrows)
export function IconButton({ type = 'button', className, ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex size-13 shrink-0 items-center justify-center rounded-lg bg-surface text-ink transition-colors',
        'hover:bg-surface-selected focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className
      )}
      {...props}
    />
  );
}
