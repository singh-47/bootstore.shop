import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useShop } from '@/store/shop';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    clearCart,
    showToast,
    products,
  } = useShop();

  if (!cartOpen) return null;

  const items = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as { productId: string; quantity: number; product: import('@/data/products').Product }[];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-ink-900/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl animate-fade-in"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent-500" />
            <h2 className="text-lg font-bold text-ink-900">
              Cart {cartCount > 0 && `(${cartCount})`}
            </h2>
          </div>
          <button
            className="rounded-full p-1.5 text-ink-600 transition-colors hover:bg-cream-200 hover:text-ink-900"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingBag className="h-12 w-12 text-ink-300" />
              <p className="text-ink-400 font-medium">Your cart is empty</p>
              <button
                className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-cream-100 transition-colors hover:bg-accent-500 hover:text-ink-900"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity, productId }) => (
                <div
                  key={productId}
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
                        className="text-ink-400 transition-colors hover:text-accent-600"
                        onClick={() => removeFromCart(productId)}
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 rounded-full border border-ink-900/15 px-2 py-1">
                        <button
                          className="rounded-full p-0.5 text-ink-700 transition-colors hover:bg-cream-300 disabled:opacity-40"
                          onClick={() => updateQuantity(productId, quantity - 1)}
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-semibold text-ink-900">
                          {quantity}
                        </span>
                        <button
                          className="rounded-full p-0.5 text-ink-700 transition-colors hover:bg-cream-300"
                          onClick={() => updateQuantity(productId, quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold text-ink-900">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                className="text-sm font-medium text-ink-400 transition-colors hover:text-accent-600"
                onClick={() => {
                  clearCart();
                  showToast('Cart cleared');
                }}
              >
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-ink-900/10 px-5 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-ink-900">Subtotal</span>
              <span className="text-xl font-extrabold text-ink-900">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-ink-400">Shipping & taxes calculated at checkout.</p>
            <button
              className="w-full rounded-full bg-ink-900 py-3.5 text-sm font-semibold text-cream-100 transition-all hover:bg-accent-500 hover:text-ink-900 active:scale-95"
              onClick={() => {
                showToast('Checkout is not available in this demo');
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
