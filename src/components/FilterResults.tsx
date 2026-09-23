import { X, Search } from 'lucide-react';
import { useShop } from '@/store/shop';
import ProductCard from './ProductCard';

export default function FilterResults() {
  const {
    isFiltering,
    filteredProducts,
    clearFilters,
    activeFilter,
    searchQuery,
  } = useShop();

  if (!isFiltering) return null;

  const heading = searchQuery.trim()
    ? `Results for "${searchQuery.trim()}"`
    : activeFilter === 'sale'
    ? 'On Sale'
    : activeFilter === 'Men' || activeFilter === 'Women'
    ? `${activeFilter}'s Footwear`
    : activeFilter;

  return (
    <section id="results" className="container-x py-16 md:py-20 animate-fade-in">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-accent-500" />
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
            {heading}
          </h2>
          <span className="rounded-full bg-cream-300 px-3 py-0.5 text-sm font-semibold text-ink-600">
            {filteredProducts.length}
          </span>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-full border border-ink-900/15 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-accent-400 hover:text-accent-500"
          onClick={clearFilters}
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-ink-900/10 bg-cream-50 py-20 text-center">
          <Search className="h-10 w-10 text-ink-300" />
          <p className="text-lg font-semibold text-ink-700">No products found</p>
          <p className="text-sm text-ink-400">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
