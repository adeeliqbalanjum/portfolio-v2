'use client';

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services-inner">
        <aside className="services-sticky"><div className="services-big-num">50+</div><div className="services-big-label">Completed projects</div></aside>
        <div className="services-right"><span className="tag tag-orange">Services</span><h2 className="display-lg services-heading">Premium website services.</h2><div className="services-grid"><article className="service-card"><div className="service-icon">01</div><h3 className="service-title">Figma to WordPress</h3><p className="service-desc">Clean responsive development with refined interface details.</p></article><article className="service-card"><div className="service-icon">02</div><h3 className="service-title">WooCommerce Websites</h3><p className="service-desc">Modern online stores with polished product and checkout screens.</p></article><article className="service-card"><div className="service-icon">03</div><h3 className="service-title">Frontend Motion</h3><p className="service-desc">Smooth page reveals, hover motion, and scroll-based interactions.</p></article></div></div>
      </div>
    </section>
  );
}
