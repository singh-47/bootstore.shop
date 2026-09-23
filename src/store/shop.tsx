import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import {
  allProducts as fallbackProducts,
  filterProducts,
  mapProductRow,
  type Product,
  type ProductRow,
  type CategoryRow,
  type FilterType,
} from '@/data/products';
import { supabase } from '@/lib/supabase';
import type { LucideIcon } from 'lucide-react';
import {
  PersonStanding,
  Sparkles,
  Footprints,
  Shirt,
  Activity,
  Coffee,
} from 'lucide-react';

export interface CartItem {
  productId: string;
  quantity: number;
}

const categoryIcons: Record<string, LucideIcon> = {
  formal: PersonStanding,
  chunky: Sparkles,
  sneakers: Footprints,
  boots: Shirt,
  running: Activity,
  casual: Coffee,
};

export interface CategoryDisplay {
  id: string;
  title: string;
  image: string;
  icon: LucideIcon;
}

interface ShopState {
  // catalog (from DB)
  products: Product[];
  categories: CategoryDisplay[];
  trendingProducts: Product[];
  topSellingProducts: Product[];
  preOrderProduct: Product | null;
  loading: boolean;

  // cart
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // favourites
  favourites: string[];
  toggleFavourite: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
  favouriteCount: number;
  favouriteProducts: Product[];

  // search & filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: FilterType;
  setFilter: (f: FilterType) => void;
  filteredProducts: Product[];
  isFiltering: boolean;
  clearFilters: () => void;

  // drawers
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  favOpen: boolean;
  setFavOpen: (v: boolean) => void;

  // toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = 'bootcart_cart';
const FAV_KEY = 'bootcart_favourites';

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [categories, setCategories] = useState<CategoryDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => loadStored(CART_KEY, []));
  const [favourites, setFavourites] = useState<string[]>(() => loadStored(FAV_KEY, []));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // fetch catalog from Supabase
  useEffect(() => {
    let cancelled = false;

    async function fetchCatalog() {
      try {
        const [prodRes, catRes] = await Promise.all([
          supabase
            .from('products')
            .select('*')
            .order('sort_order', { ascending: true }),
          supabase
            .from('categories')
            .select('*')
            .order('sort_order', { ascending: true }),
        ]);

        if (cancelled) return;

        if (prodRes.data && prodRes.data.length > 0) {
          setProducts(prodRes.data.map((r) => mapProductRow(r as ProductRow)));
        }

        if (catRes.data && catRes.data.length > 0) {
          setCategories(
            (catRes.data as CategoryRow[]).map((c) => ({
              id: c.id,
              title: c.title,
              image: c.image,
              icon: categoryIcons[c.id] ?? Shirt,
            }))
          );
        }
      } catch {
        // keep fallback data on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCatalog();
    return () => {
      cancelled = true;
    };
  }, []);

  // persist cart & favourites
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // toast auto-dismiss
  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // cart actions
  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // favourites
  const toggleFavourite = useCallback((productId: string) => {
    setFavourites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isFavourite = useCallback(
    (productId: string) => favourites.includes(productId),
    [favourites]
  );

  // derived product lists
  const trendingProducts = useMemo(
    () => products.filter((p) => p.id.startsWith('t')),
    [products]
  );
  const topSellingProducts = useMemo(
    () => products.filter((p) => p.id.startsWith('s')),
    [products]
  );
  const preOrderProduct = useMemo(
    () => products.find((p) => p.id === 'p1') ?? null,
    [products]
  );

  // cart derived
  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [cart, products]);

  const favouriteProducts = useMemo(
    () =>
      favourites
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean) as Product[],
    [favourites, products]
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, { search: searchQuery, filter: activeFilter }),
    [products, searchQuery, activeFilter]
  );

  const isFiltering = searchQuery.trim() !== '' || (activeFilter !== 'all' && activeFilter !== '');

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveFilter('all');
  }, []);

  const setFilter = useCallback((f: FilterType) => {
    setActiveFilter(f);
  }, []);

  const value: ShopState = {
    products,
    categories,
    trendingProducts,
    topSellingProducts,
    preOrderProduct,
    loading,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    favourites,
    toggleFavourite,
    isFavourite,
    favouriteCount: favourites.length,
    favouriteProducts,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setFilter,
    filteredProducts,
    isFiltering,
    clearFilters,
    cartOpen,
    setCartOpen,
    favOpen,
    setFavOpen,
    toast,
    showToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}
