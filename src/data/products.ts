import {
  Footprints,
  PersonStanding,
  Sparkles,
  Activity,
  Coffee,
  Shirt,
  type LucideIcon,
} from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  gender: 'Men' | 'Women' | 'Unisex';
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

export type FilterType = 'all' | 'Men' | 'Women' | 'sale' | string;

export interface ProductRow {
  id: string;
  name: string;
  category: string;
  gender: string;
  price: number;
  original_price: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  section: string;
  sort_order: number;
  is_preorder: boolean;
  release_date: string | null;
}

export interface CategoryRow {
  id: string;
  title: string;
  image: string;
  sort_order: number;
}

export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    gender: row.gender as Product['gender'],
    price: row.price,
    originalPrice: row.original_price,
    rating: Number(row.rating),
    reviews: row.reviews,
    image: row.image,
    badge: row.badge ?? undefined,
  };
}

export interface CategoryCard {
  id: string;
  title: string;
  image: string;
  icon: LucideIcon;
}

export const categories: CategoryCard[] = [
  {
    id: 'formal',
    title: 'Formal',
    image: 'https://images.pexels.com/photos/4161710/pexels-photo-4161710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: PersonStanding,
  },
  {
    id: 'chunky',
    title: 'Chunky',
    image: 'https://images.pexels.com/photos/27204281/pexels-photo-27204281.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Sparkles,
  },
  {
    id: 'sneakers',
    title: 'Sneakers',
    image: 'https://images.pexels.com/photos/11513443/pexels-photo-11513443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Footprints,
  },
  {
    id: 'boots',
    title: 'Boots',
    image: 'https://images.pexels.com/photos/2112753/pexels-photo-2112753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Shirt,
  },
  {
    id: 'running',
    title: 'Running',
    image: 'https://images.pexels.com/photos/29342144/pexels-photo-29342144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Activity,
  },
  {
    id: 'casual',
    title: 'Casual',
    image: 'https://images.pexels.com/photos/4296075/pexels-photo-4296075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Coffee,
  },
];

export const trendingProducts: Product[] = [
  {
    id: 't1',
    name: 'Cloudstep Pro',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 342,
    image: 'https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: '-38%',
  },
  {
    id: 't2',
    name: 'Urban Drift LX',
    category: 'Chunky',
    gender: 'Unisex',
    price: 6499,
    originalPrice: 10999,
    rating: 4.6,
    reviews: 187,
    image: 'https://images.pexels.com/photos/27516985/pexels-photo-27516985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: '-41%',
  },
  {
    id: 't3',
    name: 'Velocity Runner',
    category: 'Running',
    gender: 'Men',
    price: 3799,
    originalPrice: 5999,
    rating: 4.7,
    reviews: 256,
    image: 'https://images.pexels.com/photos/19577864/pexels-photo-19577864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: '-37%',
  },
  {
    id: 't4',
    name: 'Classic Oxford',
    category: 'Formal',
    gender: 'Men',
    price: 8999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 412,
    image: 'https://images.pexels.com/photos/31785887/pexels-photo-31785887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: '-31%',
  },
];

export const topSellingProducts: Product[] = [
  {
    id: 's1',
    name: 'Azure Blaze',
    category: 'Running',
    gender: 'Men',
    price: 5299,
    originalPrice: 8499,
    rating: 4.5,
    reviews: 198,
    image: 'https://images.pexels.com/photos/29342147/pexels-photo-29342147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: '-38%',
  },
  {
    id: 's2',
    name: 'Noir Street',
    category: 'Sneakers',
    gender: 'Unisex',
    price: 3999,
    originalPrice: 6999,
    rating: 4.6,
    reviews: 273,
    image: 'https://images.pexels.com/photos/19845610/pexels-photo-19845610.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: '-43%',
  },
  {
    id: 's3',
    name: 'Lavender Bloom',
    category: 'Casual',
    gender: 'Women',
    price: 3499,
    originalPrice: 5499,
    rating: 4.4,
    reviews: 121,
    image: 'https://images.pexels.com/photos/29699304/pexels-photo-29699304.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: '-36%',
  },
  {
    id: 's4',
    name: 'Heritage Loafer',
    category: 'Formal',
    gender: 'Women',
    price: 7499,
    originalPrice: 11999,
    rating: 4.8,
    reviews: 301,
    image: 'https://images.pexels.com/photos/27256413/pexels-photo-27256413.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    badge: '-38%',
  },
];

export const allProducts: Product[] = [...trendingProducts, ...topSellingProducts];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function isOnSale(p: Product): boolean {
  return p.originalPrice > p.price;
}

export function filterProducts(
  products: Product[],
  opts: { search?: string; filter?: FilterType }
): Product[] {
  let result = products;
  if (opts.search && opts.search.trim()) {
    const q = opts.search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
    );
  }
  if (opts.filter && opts.filter !== 'all') {
    if (opts.filter === 'sale') {
      result = result.filter((p) => isOnSale(p));
    } else if (opts.filter === 'Men' || opts.filter === 'Women') {
      result = result.filter((p) => p.gender === opts.filter || p.gender === 'Unisex');
    } else {
      result = result.filter((p) => p.category === opts.filter);
    }
  }
  return result;
}

export const preOrderProduct = {
  name: 'Aero Glide X1',
  category: 'Limited Edition',
  price: 12999,
  originalPrice: 17999,
  releaseDate: 'October 15, 2026',
  image: 'https://images.pexels.com/photos/18368124/pexels-photo-18368124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};
