'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { CustomCursor } from '@/components/custom-cursor';
import { GlobalBackground } from '@/components/global-background';
import { ScrollProgress } from '@/components/scroll-progress';
import { AnnouncementBar } from '@/components/announcement-bar';
import { Loader } from '@/components/loader';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { BackToTop } from '@/components/back-to-top';
import { FloatingBackButton } from '@/components/floating-back-button';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within Providers');
  return ctx;
}

interface WishlistContextType {
  items: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within Providers');
  return ctx;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem: CartContextType['addItem'] = (item) => {
    const qty = item.quantity ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id: string, quantity: number) =>
    setItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  const toggle = (id: string) =>
    setItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  const has = (id: string) => items.includes(id);

  return (
    <WishlistContext.Provider value={{ items, toggle, has, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isCollections = pathname === '/collections';
  const isProductDetail = pathname.startsWith('/shop/');
  const isWishlist = pathname === '/wishlist';
  const isAbout = pathname === '/about';
  const isContact = pathname === '/contact';
  const isLegal = pathname === '/legal';
  const isSocial = pathname === '/social';

  // Navbar / announcement bar / footer are hidden on the "branded" pages that
  // navigate through floating buttons instead.
  const hideChrome = isHome || isCollections || isWishlist || isAbout || isContact || isLegal || isSocial || isProductDetail;

  // The animated ambient background is decorative — keep it off the
  // shopping/checkout pages so those stay fast, especially on mobile.
  const showAmbient = isHome || isCollections || isAbout || isContact || isLegal || isSocial;

  useEffect(() => {
    if (sessionStorage.getItem('vx_loaded')) return;
    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('vx_loaded', '1');
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <CartProvider>
        <WishlistProvider>
          <div className="custom-cursor-active relative min-h-screen overflow-x-hidden">
            {showAmbient && <GlobalBackground />}
            {!isHome && <ScrollProgress />}
            <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
            <CustomCursor />
            {!hideChrome && <AnnouncementBar />}
            {!hideChrome && <Navbar />}
            {hideChrome && !isHome && <FloatingBackButton key={pathname} />}
            <PageTransition>{children}</PageTransition>
            {!hideChrome && <Footer />}
            <CartDrawer />
            {!hideChrome && <BackToTop />}
          </div>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
