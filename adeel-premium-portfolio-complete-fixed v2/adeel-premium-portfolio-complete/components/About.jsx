import { asset, site } from '@/lib/site';

const highlights = [
  'WordPress, Elementor Pro, ACF, WPBakery, Divi, Oxygen, Astra',
  'WooCommerce, checkout optimization, payment gateway integration',
  'LiteSpeed Cache, WP Rocket, Cloudflare, Core Web Vitals',
  'Custom plugins, custom post types, PHP, HTML, CSS, JavaScript',
  'Figma to WordPress, PSD to WordPress, migrations, cPanel workflows'
];

export default function About() {
  return (
    <section className="about-section section-pad" id="about">
      <div className="container about-grid">
        <div className="about-media">
          <img src={asset('/images/adeel-portrait.webp')} alt="Muhammad Adeel Iqbal" />
          <div className="about-badge">
            <strong>50+</strong>
            <span>projects delivered</span>
          </div>
        </div>

        <div className="about-copy">
          <span className="eyebrow">About</span>
          <h2>WordPress performance and WooCommerce specialist with a business-first approach.</h2>
          <p>
            I transform slow, underperforming WordPress websites into fast, high-converting
            platforms. My work covers business websites, WooCommerce stores, custom plugin logic,
            booking systems, migrations, performance optimization, and responsive Elementor builds.
          </p>
          <p>
            I have worked across tourism, healthcare, HR, e-commerce, technology, education, and
            government-level WordPress projects, including custom PHP and CPT-based systems.
          </p>

          <div className="about-highlights">
            {highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="about-actions">
            <a className="btn btn-primary" href={asset(site.resume)} target="_blank" rel="noreferrer">
              View resume
            </a>
            <a className="btn btn-secondary" href={site.github} target="_blank" rel="noreferrer">
              GitHub profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
