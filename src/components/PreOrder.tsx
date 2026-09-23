import { Calendar, ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useShop } from '@/store/shop';

export default function PreOrder() {
  const { showToast, preOrderProduct } = useShop();
  const [ordered, setOrdered] = useState(false);

  function handlePreOrder() {
    setOrdered(true);
    showToast(`Pre-order placed for ${preOrderProduct?.name}!`);
  }

  if (!preOrderProduct) return null;

  return (
    <section className="container-x py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-72 sm:h-96 lg:h-full min-h-[360px]">
            <img
              src={preOrderProduct.image}
              alt={preOrderProduct.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent lg:bg-gradient-to-r" />
            <span className="absolute left-4 top-4 rounded-full bg-accent-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink-900">
              Coming Soon
            </span>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12 md:p-14">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent-600">
              {preOrderProduct.category}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
              {preOrderProduct.name}
            </h2>
            <p className="mt-4 text-ink-400 leading-relaxed">
              The next generation of everyday performance. Engineered with ultra-light cushioning
              and breathable mesh — be the first to own them before the official drop.
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-ink-900">
                ₹{preOrderProduct.price.toLocaleString('en-IN')}
              </span>
              <span className="text-lg text-ink-400 line-through">
                ₹{preOrderProduct.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Availability */}
            <div className="mt-6 space-y-3 rounded-xl bg-cream-200/70 p-4">
              <div className="flex items-center gap-3 text-sm text-ink-700">
                <Calendar className="h-4.5 w-4.5 text-accent-500 shrink-0" />
                <span>
                  Available <strong className="font-bold text-ink-900">October 15, 2026</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-ink-700">
                <Check className="h-4.5 w-4.5 text-accent-500 shrink-0" />
                <span>Free shipping · 30-day returns · Pre-order guarantee</span>
              </div>
            </div>

            {ordered ? (
              <div className="mt-8 flex items-center gap-3 rounded-xl bg-accent-50 border border-accent-200 px-5 py-4 animate-fade-in">
                <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-ink-900">Pre-order confirmed!</p>
                  <p className="text-xs text-ink-500">
                    We'll notify you when {preOrderProduct.name} ships.
                  </p>
                </div>
              </div>
            ) : (
              <button
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-8 py-3.5 text-sm font-semibold text-cream-100 transition-all hover:bg-accent-500 hover:text-ink-900 active:scale-95"
                onClick={handlePreOrder}
              >
                Pre-Order Now
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
