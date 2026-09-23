import { useState, type FormEvent } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X, ShoppingBag } from 'lucide-react';
import { useShop } from '@/store/shop';
import type { FilterType } from '@/data/products';

const navLinks: { label: string; filter?: FilterType; href?: string }[] = [
  { label: 'New Arrivals', href: '#trending' },
  { label: 'Men', filter: 'Men' },
  { label: 'Women', filter: 'Women' },
  { label: 'Sale', filter: 'sale', href: '#results' },
  { label: 'Collections', href: '#styles' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const {
    setSearchQuery,
    setFilter,
    setCartOpen,
    setFavOpen,
    cartCount,
    favouriteCount,
    clearFilters,
  } = useShop();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setSearchQuery(localSearch);
    setMobileOpen(false);
    // scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  function handleNavClick(link: (typeof navLinks)[number]) {
    setMobileOpen(false);
    if (link.filter) {
      setFilter(link.filter);
      setTimeout(() => {
        document.getElementById(link.href?.slice(1) ?? 'results')?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 50);
    } else if (link.href) {
      clearFilters();
      setTimeout(() => {
        document.getElementById(link.href!.slice(1))?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 50);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-cream-50/90 backdrop-blur-md">
      {/* Announcement bar */}
      <div className="bg-ink-900 text-cream-100 text-center text-xs sm:text-sm py-2 font-medium tracking-wide">
        Free shipping on orders over ₹2,999 · Use code BOOTCART10 for 10% off
      </div>

      <nav className="container-x flex items-center justify-between gap-4 py-4" aria-label="Main navigation">
        {/* Logo */}
        <button
          className="flex items-center gap-2 shrink-0"
          aria-label="BootCart home"
          onClick={() => {
            clearFilters();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <ShoppingBag className="h-7 w-7 text-accent-500" strokeWidth={2.2} />
          <span className="text-xl font-extrabold tracking-tight text-ink-900">BootCart</span>
        </button>

        {/* Desktop search */}
        <form className="hidden md:flex flex-1 max-w-md" onSubmit={handleSearch}>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search for shoes, brands, styles…"
              className="w-full rounded-full border border-ink-900/15 bg-cream-200 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
              aria-label="Search products"
            />
          </div>
        </form>

        {/* Desktop icons */}
        <div className="hidden md:flex items-center gap-5">
          <button
            className="flex flex-col items-center gap-1 text-ink-700 transition-colors hover:text-accent-500 group relative"
            aria-label={`Favourites (${favouriteCount})`}
            onClick={() => setFavOpen(true)}
          >
            <Heart className="h-5 w-5 transition-transform group-hover:scale-110" strokeWidth={1.8} />
            {favouriteCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-ink-900">
                {favouriteCount}
              </span>
            )}
            <span className="text-xs font-medium">Favourites</span>
          </button>
          <button
            className="flex flex-col items-center gap-1 text-ink-700 transition-colors hover:text-accent-500 group relative"
            aria-label={`Cart (${cartCount})`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-ink-900">
                {cartCount}
              </span>
            )}
            <span className="text-xs font-medium">Cart</span>
          </button>
          <button
            className="flex flex-col items-center gap-1 text-ink-700 transition-colors hover:text-accent-500 group"
            aria-label="Profile"
          >
            <User className="h-5 w-5 transition-transform group-hover:scale-110" strokeWidth={1.8} />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ink-900 p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Desktop category links */}
      <div className="hidden md:block border-t border-ink-900/10">
        <div className="container-x flex items-center gap-8 py-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                link.label === 'Sale' ? 'text-accent-600' : 'text-ink-700'
              }`}
              onClick={() => handleNavClick(link)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-900/10 bg-cream-50 animate-fade-in">
          <div className="container-x py-4 space-y-4">
            {/* Mobile search */}
            <form className="relative" onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search for shoes…"
                className="w-full rounded-full border border-ink-900/15 bg-cream-200 py-2.5 pl-10 pr-4 text-sm focus:border-accent-400 focus:outline-none"
                aria-label="Search products"
              />
            </form>

            {/* Mobile nav links */}
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className={`py-2.5 text-left text-base font-medium border-b border-ink-900/5 ${
                    link.label === 'Sale' ? 'text-accent-600' : 'text-ink-700'
                  }`}
                  onClick={() => handleNavClick(link)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile icons row */}
            <div className="flex items-center justify-around pt-2">
              <button
                className="flex flex-col items-center gap-1 text-ink-700 relative"
                onClick={() => {
                  setFavOpen(true);
                  setMobileOpen(false);
                }}
              >
                <Heart className="h-5 w-5" strokeWidth={1.8} />
                {favouriteCount > 0 && (
                  <span className="absolute -top-1 right-3 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-ink-900">
                    {favouriteCount}
                  </span>
                )}
                <span className="text-xs font-medium">Favourites</span>
              </button>
              <button
                className="flex flex-col items-center gap-1 text-ink-700 relative"
                onClick={() => {
                  setCartOpen(true);
                  setMobileOpen(false);
                }}
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 right-3 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-ink-900">
                    {cartCount}
                  </span>
                )}
                <span className="text-xs font-medium">Cart</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-ink-700">
                <User className="h-5 w-5" strokeWidth={1.8} />
                <span className="text-xs font-medium">Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
