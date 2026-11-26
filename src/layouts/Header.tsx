import logo from '@/assets/logo.png';
import {
  CartIcon,
  ChevronDownIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from '@/shared/ui/icons';

const textLinkClass = 'hidden items-center gap-1 text-base leading-[1.6] font-medium lg:flex';

export function Header() {
  return (
    <header className="container-page pt-6 lg:pt-[31px]">
      <div className="flex items-center justify-between">
        <a href="/">
          <img src={logo} alt="John Lewis & Partners" className="h-[26px] w-[140px] lg:h-8 lg:w-[170px]" />
        </a>

        <nav aria-label="Main" className="flex items-center gap-5 lg:gap-8">
          <button type="button" aria-label="Search">
            <SearchIcon />
          </button>

          <button type="button" className={textLinkClass}>
            Categories
            <ChevronDownIcon />
          </button>

          <a href="#" className={textLinkClass}>
            <UserIcon />
            Sign in
          </a>

          <a href="#" aria-label="Wishlist" className="hidden lg:block">
            <HeartIcon />
          </a>

          {/* Replaced by CartButton (with the item count badge) in the cart feature */}
          <button type="button" aria-label="Cart">
            <CartIcon />
          </button>

          <button type="button" aria-label="Open menu" className="lg:hidden">
            <MenuIcon />
          </button>
        </nav>
      </div>

      <hr className="mt-6 border-0 border-t-[0.5px] border-dashed border-divider lg:mt-[31px]" />
    </header>
  );
}
