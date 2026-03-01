import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/r/', // Shareable result pages - dynamic and not useful as search results
        '/developers/spec', // API spec - intended for registered users
      ],
    },
    sitemap: 'https://timemeaning.com/sitemap.xml',
  }
}
