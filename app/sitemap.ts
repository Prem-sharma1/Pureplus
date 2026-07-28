import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pureplush.in';

  const routes = [
    '',
    '/shop',
    '/category/soaps',
    '/category/shampoo',
    '/category/powders',
    '/category/others',
    '/blog',
    '/blog/how-to-use-shampoo-bar',
    '/blog/powder-facewash-guide',
    '/blog/how-to-make-soap-last-longer',
    '/blog/weekly-facepack-ritual',
    '/ingredients',
    '/contact-us',
    '/about',
    '/privacy-policy',
    '/shipping-policy',
    '/refund-policy',
    '/terms-and-conditions',
    '/product/26',
    '/product/28',
    '/product/101',
    '/product/102',
    '/product/103',
    '/product/104',
    '/product/105',
    '/product/107',
    '/product/108',
    '/product/109',
    '/product/110',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/shop' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/product') ? 0.8 : 0.6,
  }));
}
