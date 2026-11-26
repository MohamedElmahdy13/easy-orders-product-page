import type { ReactNode } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CloseIcon } from '@/shared/ui/icons'

type DrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

// Slide-in panel from the right. Headless UI handles focus trap, Escape and scroll lock.
export function Drawer({ open, onClose, title, children, footer }: DrawerProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-ink/40 transition-opacity duration-300 data-closed:opacity-0"
      />

      <div className="fixed inset-y-0 right-0 flex w-full max-w-[420px]">
        <DialogPanel
          transition
          className="flex w-full flex-col bg-white transition-transform duration-300 ease-out data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <DialogTitle className="text-label font-semibold text-heading">{title}</DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-ink"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

          {footer && <div className="border-t border-border px-6 py-5">{footer}</div>}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
