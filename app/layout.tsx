import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://dresxo.vercel.app'),
  title: 'DRESXO — Premium Menswear | Tracksuits, Shirts & Trousers',
  description: 'Sharp, modern menswear built to move. Tracksuits, shirts and trousers. Delivered across Pakistan with Cash on Delivery.',
  keywords: ['DRESXO', 'menswear Pakistan', 'tracksuits Pakistan', 'shirts Pakistan', 'trousers Pakistan', 'men\'s fashion Pakistan'],
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon-180.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'DRESXO — Premium Menswear',
    description: 'Sharp, modern menswear built to move. Tracksuits, shirts and trousers. Delivered across Pakistan with Cash on Delivery.',
    url: 'https://dresxo.vercel.app',
    siteName: 'DRESXO',
    images: ['/brand/logo-full.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DRESXO — Premium Menswear',
    description: 'Sharp, modern menswear built to move. Delivered across Pakistan with Cash on Delivery.',
    images: ['/brand/logo-full.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} ${mono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
