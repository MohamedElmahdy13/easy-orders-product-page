import { cn } from '@/shared/utils/cn'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-surface', className)} aria-hidden="true" />
}
