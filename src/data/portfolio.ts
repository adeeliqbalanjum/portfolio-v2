export type Project = {
  number: string;
  title: string;
  category: string;
  industry: string;
  summary: string;
  stack: string[];
  image: string;
  liveUrl: string;
  caseUrl: string;
};

export const projects: Project[] = [
  { number: '01', title: 'Griffin IT', category: 'Corporate WordPress', industry: 'IT Services', summary: 'A polished business website system with premium layouts, clear service positioning, responsive sections, and conversion-focused contact paths.', stack: ['WordPress', 'Elementor', 'Custom CSS', 'Performance'], image: '/screens/griffin-it.svg', liveUrl: '#contact', caseUrl: '#work' },
  { number: '02', title: 'Desert Safari Dubai', category: 'Travel Booking Website', industry: 'Tourism', summary: 'A travel booking experience with premium orange branding, product-level booking flows, responsive form UI, emails, and payment-ready structure.', stack: ['WordPress', 'WooCommerce', 'PHP', 'Booking UI'], image: '/screens/desert-safari.svg', liveUrl: '#contact', caseUrl: '#work' },
  { number: '03', title: 'Artisan Technologies', category: 'Agency Website', industry: 'Technology', summary: 'A modern agency-style interface focused on trust, service clarity, premium cards, and responsive frontend polish.', stack: ['Frontend', 'WordPress', 'GSAP', 'Responsive'], image: '/screens/artisan-technologies.svg', liveUrl: '#contact', caseUrl: '#work' },
  { number: '04', title: 'Book My Holidays', category: 'Booking Platform', industry: 'Travel', summary: 'A booking-focused layout with structured packages, clean detail pages, lead capture, and mobile-first browsing behavior.', stack: ['WordPress', 'Booking UX', 'ACF', 'SEO Structure'], image: '/screens/book-my-holidays.svg', liveUrl: '#contact', caseUrl: '#work' },
  { number: '05', title: 'KK Travels & Tours', category: 'Tour Website', industry: 'Travel Agency', summary: 'A responsive travel website with service hierarchy, destination storytelling, inquiry CTAs, and performance-friendly sections.', stack: ['WordPress', 'Elementor', 'Custom CSS', 'Mobile UX'], image: '/screens/kk-travels.svg', liveUrl: '#contact', caseUrl: '#work' },
  { number: '06', title: 'FastDocNow', category: 'Healthcare Website', industry: 'Medical', summary: 'A credibility-first healthcare interface with clean information flow, service cards, fast loading structure, and lead-ready forms.', stack: ['WordPress', 'UX Design', 'Speed', 'Forms'], image: '/screens/fastdocnow.svg', liveUrl: '#contact', caseUrl: '#work' },
  { number: '07', title: 'Griffin Resources', category: 'Resource Platform', industry: 'Business Resources', summary: 'A resource-driven WordPress experience designed around clarity, content hierarchy, and a premium editorial browsing pattern.', stack: ['WordPress', 'Content UX', 'ACF', 'Responsive'], image: '/screens/griffin-resources.svg', liveUrl: '#contact', caseUrl: '#work' },
  { number: '08', title: 'GetCareMD', category: 'Medical Frontend', industry: 'Healthcare', summary: 'A clean healthcare website direction with trust-building layouts, fast page sections, and conversion-focused contact flows.', stack: ['Frontend', 'WordPress', 'Performance', 'Accessibility'], image: '/screens/getcaremd.svg', liveUrl: '#contact', caseUrl: '#work' }
];

export const services = [
  { title: 'Figma to WordPress', summary: 'Pixel-aware WordPress builds from approved designs with responsive sections, clean spacing, and premium frontend polish.', metric: 'Design to live site' },
  { title: 'WooCommerce Websites', summary: 'Product pages, checkout journeys, add-ons, booking logic, emails, and conversion-focused eCommerce layouts.', metric: 'Stores that convert' },
  { title: 'Booking & Travel Websites', summary: 'Tour, travel, appointment, and lead-generation booking interfaces with premium forms and clear package structure.', metric: 'Lead-ready flows' },
  { title: 'WordPress Performance', summary: 'Speed cleanup, layout shift reduction, image optimization, responsive fixes, and frontend performance improvements.', metric: 'Faster UX' },
  { title: 'Custom WordPress Development', summary: 'Custom PHP features, ACF structures, shortcode systems, plugin customization, and WordPress admin improvements.', metric: 'Custom systems' },
  { title: 'Premium Frontend Motion', summary: 'GSAP-powered reveals, smooth scrolling, hover interactions, scroll stories, and polished motion systems.', metric: 'Animated polish' }
];

export const processItems = [
  { number: '01', title: 'Discover', summary: 'We define goals, references, pages, conversion paths, and the exact premium direction before building.', image: '/process/discover.svg' },
  { number: '02', title: 'Structure', summary: 'I map the site architecture, key sections, responsive layout logic, and conversion-focused content flow.', image: '/process/structure.svg' },
  { number: '03', title: 'Build', summary: 'The website is developed with clean components, responsive styling, WordPress-ready logic, and stable interactions.', image: '/process/build.svg' },
  { number: '04', title: 'Polish', summary: 'Spacing, mobile behavior, loading, micro-interactions, animations, and perceived quality are refined carefully.', image: '/process/polish.svg' },
  { number: '05', title: 'Launch', summary: 'Final checks, speed review, deployment support, contact flows, and post-launch improvements are completed.', image: '/process/launch.svg' }
];

export const skills = ['WordPress', 'WooCommerce', 'Elementor', 'ACF', 'PHP', 'Custom CSS', 'React', 'Next.js', 'GSAP', 'Responsive UI', 'Performance', 'Booking Systems'];
