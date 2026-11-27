import type { ReactNode } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { cn } from '@/shared/utils/cn';

export type DropdownItem = {
  label: string;
  onSelect?: () => void;
};

type DropdownProps = {
  button: ReactNode;
  items: DropdownItem[];
  selected?: string; // label of the chosen item, shown in bold
  anchor?: 'bottom start' | 'bottom end' | 'top start' | 'top end';
  className?: string; // for the wrapper
  buttonClassName?: string;
};

// Button that opens a list. Headless UI handles keyboard, Escape and closing when clicking outside.
export function Dropdown({
  button,
  items,
  selected,
  anchor = 'bottom start',
  className,
  buttonClassName,
}: DropdownProps) {
  return (
    <Menu as="div" className={cn('relative', className)}>
      <MenuButton
        className={cn(
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
          buttonClassName,
        )}
      >
        {button}
      </MenuButton>

      <MenuItems
        transition
        modal={false}
        anchor={anchor}
        className="z-40 min-w-40 rounded-lg border border-border bg-white p-1 shadow-lg transition duration-150 [--anchor-gap:8px] focus:outline-none data-closed:scale-95 data-closed:opacity-0 motion-reduce:transition-none"
      >
        {items.map((item) => (
          <MenuItem key={item.label}>
            <button
              type="button"
              onClick={item.onSelect}
              className={cn(
                'block w-full rounded-md px-3 py-2 text-start text-body text-charcoal data-focus:bg-surface',
                item.label === selected && 'font-semibold text-ink',
              )}
            >
              {item.label}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
