import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-cream-100">
      {/* Background accent glow */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="container-x relative grid items-center gap-8 py-16 md:py-24 lg:grid-cols-2 lg:gap-12">
        {/* Left content */}
        <div className="order-2 lg:order-1 max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream-100/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-300">
            <Sparkles className="h-3.5 w-3.5" />
            New Season 2026
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Step Into
            <br />
            <span className="text-accent-400">Your Style</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-cream-100/70">
            Discover footwear that moves with you. From boardroom-ready formals to street-ready
            sneakers — find your perfect pair at prices you'll love.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#trending"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 text-sm font-semibold text-ink-900 transition-all hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/30 active:scale-95"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#styles"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-100/30 px-8 py-3.5 text-sm font-semibold text-cream-100 transition-all hover:border-cream-100/60 hover:bg-cream-100/5 active:scale-95"
            >
              Explore Styles
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-8 border-t border-cream-100/10 pt-6">
            {[
              { value: '500+', label: 'Styles' },
              { value: '50%', label: 'Max Off' },
              { value: '4.8★', label: 'Rated' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-accent-400">{stat.value}</div>
                <div className="text-xs text-cream-100/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="order-1 lg:order-2 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <img
              src="https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&h=900&w=700"
              alt="Premium white sneakers showcased in dramatic studio lighting"
              className="w-full rounded-2xl object-cover shadow-2xl"
              loading="eager"
            />
            {/* Floating price tag */}
            <div className="absolute -bottom-4 -left-2 sm:left-6 rounded-xl bg-cream-50 px-5 py-3 shadow-xl">
              <div className="text-xs text-ink-400 font-medium">Starting at</div>
              <div className="text-xl font-extrabold text-ink-900">₹2,999</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
