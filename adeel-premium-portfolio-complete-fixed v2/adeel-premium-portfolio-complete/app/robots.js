export const dynamic = 'force-static';
export const revalidate = false;

import { site } from '@/lib/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${site.url}/sitemap.xml`
  };
}
