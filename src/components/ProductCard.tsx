import { Heart, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '@/data/products';
import { useShop } from '@/store/shop';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleFavourite, isFavourite, addToCart, showToast } = useShop();
  const fav = isFavourite(product.id);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-cream-50 transition-all hover:shadow-xl hover:shadow-ink-900/5">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Discount badge */}
        <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-xs font-bold text-ink-900">
          {product.badge ?? `-${discount}%`}
        </span>
        {/* Favourite */}
        <button
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 transition-all active:scale-90 ${
            fav
              ? 'text-accent-600'
              : 'text-ink-700 hover:bg-cream-50 hover:text-accent-600'
          }`}
          aria-label={`${fav ? 'Remove' : 'Add'} ${product.name} ${fav ? 'from' : 'to'} favourites`}
          aria-pressed={fav}
          onClick={() => {
            toggleFavourite(product.id);
            showToast(fav ? `${product.name} removed from favourites` : `${product.name} added to favourites`);
          }}
        >
          <Heart
            className={`h-4.5 w-4.5 ${fav ? 'fill-accent-500' : ''}`}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-accent-600">
          {product.category}
        </span>
        <h3 className="mt-1 text-base font-bold text-ink-900">{product.name}</h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
            <span className="text-sm font-semibold text-ink-800">{product.rating}</span>
          </div>
          <span className="text-xs text-ink-400">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-ink-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-ink-400 line-through">
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Add to cart */}
        <button
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink-900 py-2.5 text-sm font-semibold text-cream-100 transition-all hover:bg-accent-500 hover:text-ink-900 active:scale-95"
          onClick={() => {
            addToCart(product.id);
            showToast(`${product.name} added to cart`);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
