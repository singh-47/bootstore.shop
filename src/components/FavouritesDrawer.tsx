import { X, Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '@/store/shop';

export default function FavouritesDrawer() {
  const {
    favOpen,
    setFavOpen,
    favouriteProducts,
    toggleFavourite,
    addToCart,
    showToast,
  } = useShop();

  if (!favOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-ink-900/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setFavOpen(false)}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl animate-fade-in"
        role="dialog"
        aria-label="Favourites"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent-500" />
            <h2 className="text-lg font-bold text-ink-900">
              Favourites {favouriteProducts.length > 0 && `(${favouriteProducts.length})`}
            </h2>
          </div>
          <button
            className="rounded-full p-1.5 text-ink-600 transition-colors hover:bg-cream-200 hover:text-ink-900"
            onClick={() => setFavOpen(false)}
            aria-label="Close favourites"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {favouriteProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <Heart className="h-12 w-12 text-ink-300" />
              <p className="text-ink-400 font-medium">No favourites yet</p>
              <p className="text-sm text-ink-400/70">Tap the heart on any product to save it here.</p>
              <button
                className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-cream-100 transition-colors hover:bg-accent-500 hover:text-ink-900"
                onClick={() => setFavOpen(false)}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {favouriteProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 rounded-xl border border-ink-900/10 bg-cream-100 p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-ink-900">{product.name}</h3>
                        <span className="text-xs text-ink-400">{product.category}</span>
                      </div>
                      <button
                        className="text-accent-500 transition-colors hover:text-accent-600"
                        onClick={() => toggleFavourite(product.id)}
                        aria-label={`Remove ${product.name} from favourites`}
                      >
                        <Heart className="h-4 w-4 fill-accent-500" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-extrabold text-ink-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        className="flex items-center gap-1.5 rounded-full bg-ink-900 px-3.5 py-2 text-xs font-semibold text-cream-100 transition-colors hover:bg-accent-500 hover:text-ink-900"
                        onClick={() => {
                          addToCart(product.id);
                          showToast(`${product.name} added to cart`);
                        }}
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
