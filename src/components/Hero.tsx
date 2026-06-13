'use client';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <p className="hero-kicker label text-orange">WordPress and WooCommerce Developer</p>
          <h1 className="display-xl">Premium WordPress websites for modern businesses.</h1>
          <p className="body-lg hero-sub">Fast, responsive, polished WordPress websites built for trust, leads, and conversion.</p>
          <div className="hero-ctas"><a className="btn btn-primary" href="#work">View Work</a><a className="btn btn-ghost" href="#contact">Start Project</a></div>
        </div>
        <div className="hero-card"><div className="hero-card-screen">Featured Build</div></div>
      </div>
    </section>
  );
}
