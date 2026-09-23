import { ArrowRight } from 'lucide-react';
import { useShop } from '@/store/shop';

export default function FootwearStyles() {
  const { categories, setFilter } = useShop();

  function handleCategoryClick(categoryTitle: string) {
    setFilter(categoryTitle);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <section id="styles" className="container-x py-16 md:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Shop by Style
        </h2>
        <p className="mt-3 text-ink-400 max-w-lg mx-auto">
          Whatever the occasion, we've got the perfect pair for you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="group relative overflow-hidden rounded-2xl bg-cream-200 aspect-[3/4] text-left"
            onClick={() => handleCategoryClick(cat.title)}
            aria-label={`Browse ${cat.title} footwear`}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4">
              <span className="text-sm font-bold text-cream-100 sm:text-base">{cat.title}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-100/90 text-ink-900 transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
