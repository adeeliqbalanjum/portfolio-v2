import './globals.css';
import './hero-fixes.css';
import { site } from '@/lib/site';

export const metadata = {
  metadataBase: new URL('https://adeeliqbalanjum.github.io'),
  title: 'Muhammad Adeel Iqbal — Premium WordPress & WooCommerce Developer',
  description:
    'Premium WordPress, WooCommerce, Elementor, Figma to WordPress, custom PHP, booking systems, and performance-focused website development by Muhammad Adeel Iqbal.',
  keywords: [
    'Muhammad Adeel Iqbal',
    'WordPress Developer',
    'WooCommerce Developer',
    'Elementor Developer',
    'Figma to WordPress',
    'Reference to WordPress',
    'WordPress Speed Optimization',
    'Custom WordPress Development',
    'Freelance WordPress Developer'
  ],
  alternates: {
    canonical: '/Portfolio/'
  },
  openGraph: {
    title: 'Muhammad Adeel Iqbal — Premium WordPress & WooCommerce Developer',
    description: site.subheadline,
    url: '/Portfolio/',
    siteName: 'Muhammad Adeel Iqbal Portfolio',
    type: 'website',
    images: [
      {
        url: '/Portfolio/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Muhammad Adeel Iqbal premium WordPress portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Adeel Iqbal — Premium WordPress & WooCommerce Developer',
    description: site.subheadline,
    images: ['/Portfolio/images/og-image.webp']
  }
};

const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('portfolio-theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved === 'dark' || saved === 'light' ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
