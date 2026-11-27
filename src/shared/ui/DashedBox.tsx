import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

type DashedBoxProps = {
  className?: string;
  children: ReactNode;
};

// Box with the design's dashed border: 0.8px, 6px dash and 6px gap.
// Radius from the design: 4px on mobile, 8px on desktop (the SVG uses the CSS rx property, so it can change too).
// A CSS dashed border cannot set the dash length, so the border is an SVG drawn over the box.
export function DashedBox({ className, children }: DashedBoxProps) {
  return (
    <div className={cn('relative rounded lg:rounded-lg', className)}>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible">
        <rect
          x="0.4"
          y="0.4"
          fill="none"
          className="[rx:4px] lg:[rx:8px]"
          stroke="var(--color-border-strong)"
          strokeWidth="0.8"
          strokeDasharray="6 6"
          style={{ width: 'calc(100% - 0.8px)', height: 'calc(100% - 0.8px)' }}
        />
      </svg>
      {children}
    </div>
  );
}
