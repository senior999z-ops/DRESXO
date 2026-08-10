import type { MetadataRoute } from 'next';

const BASE_URL = 'https://dresxo.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cart', '/checkout', '/wishlist'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
