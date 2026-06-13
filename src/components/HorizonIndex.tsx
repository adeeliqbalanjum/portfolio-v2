'use client';

import { projects } from '@/data/portfolio';

export default function HorizonIndex() {
  return (
    <section className="horizon">
      <div className="horizon-header"><span className="tag tag-orange">Horizon Index</span><h2 className="display-lg">Visual project index.</h2></div>
      <div className="horizon-track">
        {projects.map((project) => <article className="horizon-card" key={project.slug}><div className="horizon-card-bg" /><div className="horizon-card-overlay" /><div className="horizon-card-content"><div className="horizon-card-num">{String(project.id).padStart(2, '0')}</div><h3 className="horizon-card-title">{project.title}</h3><p className="horizon-card-cat">{project.industry}</p></div></article>)}
      </div>
    </section>
  );
}
