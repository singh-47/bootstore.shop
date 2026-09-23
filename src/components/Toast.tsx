import { useShop } from '@/store/shop';

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 animate-fade-up">
      <div className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-cream-100 shadow-xl">
        {toast}
      </div>
    </div>
  );
}
