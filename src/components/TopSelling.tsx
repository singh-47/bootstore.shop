import ProductCard from './ProductCard';
import { useShop } from '@/store/shop';

export default function TopSelling() {
  const { topSellingProducts } = useShop();

  return (
    <section className="container-x py-16 md:py-20">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent-600">
            Customer Favourites
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Top Selling
          </h2>
        </div>
        <a
          href="#"
          className="hidden shrink-0 text-sm font-semibold text-ink-700 transition-colors hover:text-accent-500 sm:inline-flex"
        >
          View All →
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
        {topSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
