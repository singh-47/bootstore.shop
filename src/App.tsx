import { ShopProvider } from '@/store/shop';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FootwearStyles from '@/components/FootwearStyles';
import MenWomen from '@/components/MenWomen';
import SaleBanner from '@/components/SaleBanner';
import TrendingNow from '@/components/TrendingNow';
import TopSelling from '@/components/TopSelling';
import PreOrder from '@/components/PreOrder';
import FilterResults from '@/components/FilterResults';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FavouritesDrawer from '@/components/FavouritesDrawer';
import Toast from '@/components/Toast';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <main>
          <Hero />
          <FootwearStyles />
          <MenWomen />
          <SaleBanner />
          <FilterResults />
          <TrendingNow />
          <TopSelling />
          <PreOrder />
        </main>
        <Footer />
        <CartDrawer />
        <FavouritesDrawer />
        <Toast />
      </div>
    </ShopProvider>
  );
}
