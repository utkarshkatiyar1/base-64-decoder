import { MetadataRoute } from 'next'

export const dynamic = "force-static"; // 👈 ensures static export

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://base64converter.dev'
  
  return [
    {
      url: baseUrl,
      lastModified: '2025-01-01', // 👈 use fixed ISO date
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/basic`,
      lastModified: '2025-01-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advanced`,
      lastModified: '2025-01-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/batch`,
      lastModified: '2025-01-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
