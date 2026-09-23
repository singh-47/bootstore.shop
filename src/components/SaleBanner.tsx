import { ArrowRight } from 'lucide-react';
import { useShop } from '@/store/shop';

export default function SaleBanner() {
  const { setFilter } = useShop();

  function handleShopSale() {
    setFilter('sale');
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <section className="container-x py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-ink-900">
        <div className="pointer-events-none absolute -left-10 top-0 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

        <div className="grid items-center gap-6 lg:grid-cols-2">
          {/* Text */}
          <div className="order-2 lg:order-1 p-8 sm:p-12 md:p-16 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">
              Limited Time
            </span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-cream-100 sm:text-5xl lg:text-6xl">
              Step Into The Sale
            </h2>
            <div className="mt-4 text-5xl font-extrabold text-accent-400 sm:text-6xl lg:text-7xl">
              UP TO 50% OFF
            </div>
            <p className="mt-5 text-cream-100/70 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
              Refresh your wardrobe with unbeatable deals on premium footwear. Hurry — selected styles only.
            </p>
            <button
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 text-sm font-semibold text-ink-900 transition-all hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/30 active:scale-95"
              onClick={handleShopSale}
            >
              Shop Sale
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative h-64 sm:h-80 lg:h-full min-h-[320px]">
            <img
              src="https://images.pexels.com/photos/5698848/pexels-photo-5698848.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200"
              alt="Trendy sneakers on display at a footwear store sale"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/30 to-transparent lg:from-ink-900/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
