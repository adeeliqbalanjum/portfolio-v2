import { asset, site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a className="footer-brand" href={asset('/')}>
            Muhammad Adeel Iqbal
          </a>
          <p>
            Premium WordPress, WooCommerce, Elementor, custom PHP, performance optimization, and
            modern frontend portfolio experiences.
          </p>
        </div>
        <div>
          <span>Navigation</span>
          <a href={asset('/#work')}>Work</a>
          <a href={asset('/#services')}>Services</a>
          <a href={asset('/#process')}>Process</a>
          <a href={asset('/#about')}>About</a>
        </div>
        <div>
          <span>Connect</span>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div>
          <span>Availability</span>
          <p>Open to freelance projects, WordPress redesigns, WooCommerce builds, and performance fixes.</p>
          <a className="footer-cta" href={asset('/#contact')}>Start a project</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} Muhammad Adeel Iqbal. All rights reserved.</span>
        <span>Built with Next.js, GSAP, and Three.js.</span>
      </div>
    </footer>
  );
}
