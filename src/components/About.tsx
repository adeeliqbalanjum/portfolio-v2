'use client';

const skills = ['WordPress', 'WooCommerce', 'Elementor', 'ACF', 'PHP', 'CSS', 'React', 'GSAP'];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div><span className="tag tag-orange">About</span><h2 className="display-lg">I build clean, fast, polished WordPress experiences.</h2><p className="body-lg text-muted">I help businesses launch premium websites with strong visual hierarchy, responsive layouts, refined sections, and smooth animated interactions.</p><div className="skill-list">{skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></div>
        <div className="about-card"><strong>3+ Years</strong><span>50+ Projects</span></div>
      </div>
    </section>
  );
}
