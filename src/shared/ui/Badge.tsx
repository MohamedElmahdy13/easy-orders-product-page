import { cn } from '@/shared/utils/cn';

type BadgeProps = {
  count: number;
  className?: string;
};

// Small black counter from the Figma cart icon (13px circle, 8px text)
export function Badge({ count, className }: BadgeProps) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        'inline-flex h-3.25 min-w-3.25 items-center justify-center rounded-full bg-ink px-[3px] text-[8px] leading-none font-medium text-white',
        className,
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
