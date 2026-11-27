import { useEffect, useRef, useState } from 'react';
import logo from '@/assets/logo.png';
import { CartButton } from '@/features/cart';
import { WishlistButton } from '@/features/wishlist';
import { ChevronDownIcon, MenuIcon, SearchIcon, UserIcon } from '@/shared/ui/icons';
import { Drawer } from '@/shared/ui/Drawer';
import { Dropdown } from '@/shared/ui/Dropdown';
import { cn } from '@/shared/utils/cn';

// The API only returns the categories of one product, so the menu uses a fixed list
const categories = ['Mules', 'Women heels', 'Moc Toe Boots', 'Sneakers', 'Sandals'];

const textLinkClass = 'hidden items-center gap-1 text-base leading-[1.6] font-medium lg:flex';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The shadow only shows once the header is stuck to the top, so it does not sit on the page's divider
  const headerRef = useRef<HTMLElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    function updateStuck() {
      const top = headerRef.current?.getBoundingClientRect().top ?? 1;
      setIsStuck(window.scrollY > 0 && top <= 0);
    }

    updateStuck();
    window.addEventListener('scroll', updateStuck, { passive: true });
    return () => window.removeEventListener('scroll', updateStuck);
  }, []);

  return (
    <>
      {/* Sticky: stays in the page flow (no spacing change) and stays on top while scrolling */}
      <header
        ref={headerRef}
        className={cn(
          'sticky top-0 z-30 bg-white py-7.75 transition-shadow duration-200',
          isStuck && 'shadow-[0_4px_12px_rgba(0,0,0,0.06)]',
        )}
      >
        <div className="container-page flex items-center justify-between">
          <a href="/">
            <img src={logo} alt="John Lewis & Partners" className="h-[26px] w-[140px] lg:h-8 lg:w-[170px]" />
          </a>

          <nav aria-label="Main" className="flex items-center gap-5 lg:gap-8">
            <button type="button" aria-label="Search" className="-m-2.5 p-2.5">
              <SearchIcon />
            </button>

            <Dropdown
              className="hidden lg:block"
              buttonClassName="flex items-center gap-1 text-base leading-[1.6] font-medium"
              anchor="bottom end"
              button={
                <>
                  Categories
                  <ChevronDownIcon />
                </>
              }
              items={categories.map((name) => ({ label: name }))}
            />

            <a className={textLinkClass}>
              <UserIcon />
              Sign in
            </a>

            <WishlistButton className="hidden lg:block" />

            <CartButton />

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              className="-m-2.5 p-2.5 lg:hidden"
            >
              <MenuIcon />
            </button>
          </nav>
        </div>
      </header>

      <Drawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} title="Menu">
        <nav aria-label="Mobile" className="flex flex-col gap-6 text-label font-medium text-heading">
          <div>
            <p className="text-sm text-subtle">Categories</p>
            <ul className="mt-2 flex flex-col gap-3">
              {categories.map((name) => (
                <li key={name}>
                  <a>{name}</a>
                </li>
              ))}
            </ul>
          </div>

          <a className="flex items-center gap-2">
            <UserIcon />
            Sign in
          </a>

          <WishlistButton variant="menu" onOpen={() => setIsMenuOpen(false)} />
        </nav>
      </Drawer>
    </>
  );
}
