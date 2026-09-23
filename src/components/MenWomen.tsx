import { ArrowRight } from 'lucide-react';
import { useShop } from '@/store/shop';
import type { FilterType } from '@/data/products';

const collections: {
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  filter: FilterType;
}[] = [
  {
    title: "Men's Collection",
    subtitle: 'Refined & rugged footwear for every step',
    image: 'https://images.pexels.com/photos/12031206/pexels-photo-12031206.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    cta: 'Shop Men',
    filter: 'Men',
  },
  {
    title: "Women's Collection",
    subtitle: 'Elegant designs that turn heads',
    image: 'https://images.pexels.com/photos/3682290/pexels-photo-3682290.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    cta: 'Shop Women',
    filter: 'Women',
  },
];

export default function MenWomen() {
  const { setFilter } = useShop();

  function handleClick(filter: FilterType) {
    setFilter(filter);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <section className="container-x py-16 md:py-20">
      <div className="grid gap-5 md:gap-6 md:grid-cols-2">
        {collections.map((col) => (
          <button
            key={col.title}
            className="group relative overflow-hidden rounded-3xl aspect-[16/10] md:aspect-[16/9] text-left"
            onClick={() => handleClick(col.filter)}
            aria-label={`Browse ${col.title}`}
          >
            <img
              src={col.image}
              alt={col.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="text-2xl font-extrabold text-cream-100 sm:text-3xl">{col.title}</h3>
              <p className="mt-1 text-sm text-cream-100/70 sm:text-base">{col.subtitle}</p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-all group-hover:gap-3 group-hover:bg-accent-400">
                {col.cta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
