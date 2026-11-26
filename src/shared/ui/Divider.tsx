import { cn } from '@/shared/utils/cn';

type DividerProps = {
  className?: string;
};

// Dashed line from the design: 0.5px thick, 6px dash and 6px gap
export function Divider({ className }: DividerProps) {
  return (
    <div
      role="separator"
      className={cn('h-[0.5px] w-full', className)}
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, var(--color-divider) 0 6px, transparent 6px 12px)',
      }}
    />
  );
}
