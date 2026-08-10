import type { MetadataRoute } from 'next';

const BASE_URL = 'https://dresxo.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/shop', '/collections', '/about', '/contact', '/social', '/legal'];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }));
}
