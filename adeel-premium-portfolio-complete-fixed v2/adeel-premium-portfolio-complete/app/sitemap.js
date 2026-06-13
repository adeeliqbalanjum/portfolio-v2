export const dynamic = 'force-static';
export const revalidate = false;

import { projects } from '@/data/projects';
import { site } from '@/lib/site';

export default function sitemap() {
  const now = new Date();

  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1
    },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    }))
  ];
}
