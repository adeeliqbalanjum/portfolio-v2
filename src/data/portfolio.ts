export type Project = {
  id: number;
  slug: string;
  number: string;
  title: string;
  category: string;
  industry: string;
  summary: string;
  stack: string[];
  bgFrom: string;
  bgTo: string;
  accent: string;
  year: string;
  image: string;
  liveUrl: string;
  caseUrl: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'griffin-it',
    number: '01',
    title: 'Griffin IT',
    category: 'IT Services',
    industry: 'Technology',
    summary: 'Complete digital presence for an IT services company with a service catalog, lead generation landing pages, and a high-performance WordPress build that cut load time by 60%.',
    stack: ['WordPress', 'Elementor Pro', 'WooCommerce', 'SEO Optimization'],
    bgFrom: '#0A1628',
    bgTo: '#1A3A5C',
    accent: '#3B82F6',
    year: '2024',
    image: '/screens/griffin-it.svg',
    liveUrl: '#contact',
    caseUrl: '#work'
  },
  {
    id: 2,
    slug: 'desert-safari-dubai',
    number: '02',
    title: 'Desert Safari Dubai',
    category: 'Travel & Booking',
    industry: 'Tourism',
    summary: 'Premium booking system for desert safari experiences with real-time availability, tiered group pricing, add-ons management, and UAE payment gateway integration including Telr.',
    stack: ['WordPress', 'Custom PHP Plugin', 'WooCommerce', 'Telr Gateway'],
    bgFrom: '#1C0A00',
    bgTo: '#5C2A00',
    accent: '#FF9500',
    year: '2024',
    image: '/screens/desert-safari.svg',
    liveUrl: '#contact',
    caseUrl: '#work'
  },
  {
    id: 3,
    slug: 'artisan-technologies',
    number: '03',
    title: 'Artisan Technologies',
    category: 'Corporate Website',
    industry: 'Technology',
    summary: 'Modern corporate website with animated product showcases, team profiles, and a custom Elementor Pro build optimized for lead conversion and brand trust.',
    stack: ['WordPress', 'Elementor Pro', 'Custom CSS', 'GSAP'],
    bgFrom: '#120A28',
    bgTo: '#2D1A5C',
    accent: '#7C3AED',
    year: '2023',
    image: '/screens/artisan-technologies.svg',
    liveUrl: '#contact',
    caseUrl: '#work'
  },
  {
    id: 4,
    slug: 'book-my-holidays',
    number: '04',
    title: 'Book My Holidays',
    category: 'Travel Booking',
    industry: 'Tourism',
    summary: 'Full-featured travel booking platform with package listings, inquiry forms, WhatsApp integration, and a conversion-optimized layout for tour operators.',
    stack: ['WordPress', 'WooCommerce', 'Booking Plugin', 'Elementor Pro'],
    bgFrom: '#051A14',
    bgTo: '#0A3D2B',
    accent: '#10B981',
    year: '2023',
    image: '/screens/book-my-holidays.svg',
    liveUrl: '#contact',
    caseUrl: '#work'
  },
  {
    id: 5,
    slug: 'kk-travels-tours',
    number: '05',
    title: 'KK Travels & Tours',
    category: 'Travel Agency',
    industry: 'Tourism',
    summary: 'Premium travel agency website with curated tour packages, itinerary detail pages, and trust-building design elements that drive direct inquiries and WhatsApp bookings.',
    stack: ['WordPress', 'Elementor Pro', 'Contact Form 7', 'WP Rocket'],
    bgFrom: '#0A0A1C',
    bgTo: '#1C1A3A',
    accent: '#6366F1',
    year: '2023',
    image: '/screens/kk-travels.svg',
    liveUrl: '#contact',
    caseUrl: '#work'
  },
  {
    id: 6,
    slug: 'fastdocnow',
    number: '06',
    title: 'FastDocNow',
    category: 'Healthcare Platform',
    industry: 'Healthcare',
    summary: 'Patient-facing telemedicine website with appointment booking, provider profiles, insurance information, and HIPAA-conscious design built for speed and trust.',
    stack: ['WordPress', 'Amelia Booking', 'Elementor Pro', 'Stripe'],
    bgFrom: '#041420',
    bgTo: '#083050',
    accent: '#06B6D4',
    year: '2024',
    image: '/screens/fastdocnow.svg',
    liveUrl: '#contact',
    caseUrl: '#work'
  },
  {
    id: 7,
    slug: 'griffin-resources',
    number: '07',
    title: 'Griffin Resources',
    category: 'Recruitment Portal',
    industry: 'HR & Staffing',
    summary: 'Job board and recruitment website with filterable listings, candidate applications, employer dashboard, and a clean editorial design that positions the brand as premium.',
    stack: ['WordPress', 'WP Job Manager', 'Elementor Pro', 'ACF Pro'],
    bgFrom: '#1A0808',
    bgTo: '#3D1212',
    accent: '#EF4444',
    year: '2024',
    image: '/screens/griffin-resources.svg',
    liveUrl: '#contact',
    caseUrl: '#work'
  },
  {
    id: 8,
    slug: 'getcaremd',
    number: '08',
    title: 'GetCareMD',
    category: 'Medical Services',
    industry: 'Healthcare',
    summary: 'Direct primary care platform with membership plan showcase, online appointment scheduling, physician bios, and a conversion-focused design that builds patient confidence.',
    stack: ['WordPress', 'WooCommerce Memberships', 'Elementor Pro', 'Latepoint'],
    bgFrom: '#051418',
    bgTo: '#0A2A2E',
    accent: '#14B8A6',
    year: '2024',
    image: '/screens/getcaremd.svg',
    liveUrl: '#contact',
    caseUrl: '#work'
  }
];

export const services = [
  { icon: '⌁', title: 'Figma to WordPress', summary: 'Pixel-aware WordPress builds from approved designs with responsive sections, clean spacing, and premium frontend polish.', metric: 'Design to live site' },
  { icon: '◈', title: 'WooCommerce Websites', summary: 'Product pages, checkout journeys, add-ons, booking logic, emails, and conversion-focused eCommerce layouts.', metric: 'Stores that convert' },
  { icon: '✦', title: 'Booking & Travel Websites', summary: 'Tour, travel, appointment, and lead-generation booking interfaces with premium forms and clear package structure.', metric: 'Lead-ready flows' },
  { icon: '⚡', title: 'WordPress Performance', summary: 'Speed cleanup, layout shift reduction, image optimization, responsive fixes, and frontend performance improvements.', metric: 'Faster UX' },
  { icon: '✳', title: 'Custom WordPress Development', summary: 'Custom PHP features, ACF structures, shortcode systems, plugin customization, and WordPress admin improvements.', metric: 'Custom systems' },
  { icon: '◎', title: 'Premium Frontend Motion', summary: 'GSAP-powered reveals, smooth scrolling, hover interactions, scroll stories, and polished motion systems.', metric: 'Animated polish' }
];

export const processItems = [
  { number: '01', title: 'Discover', summary: 'We define goals, references, pages, conversion paths, and the exact premium direction before building.', image: '/process/discover.svg' },
  { number: '02', title: 'Structure', summary: 'I map the site architecture, key sections, responsive layout logic, and conversion-focused content flow.', image: '/process/structure.svg' },
  { number: '03', title: 'Build', summary: 'The website is developed with clean components, responsive styling, WordPress-ready logic, and stable interactions.', image: '/process/build.svg' },
  { number: '04', title: 'Polish', summary: 'Spacing, mobile behavior, loading, micro-interactions, animations, and perceived quality are refined carefully.', image: '/process/polish.svg' },
  { number: '05', title: 'Launch', summary: 'Final checks, speed review, deployment support, contact flows, and post-launch improvements are completed.', image: '/process/launch.svg' }
];

export const skills = ['WordPress', 'WooCommerce', 'Elementor Pro', 'ACF Pro', 'PHP', 'Custom CSS', 'React', 'Next.js', 'GSAP', 'Lenis', 'Responsive UI', 'Booking Systems'];
