'use client';

import { projects } from '@/data/portfolio';

export default function StoryScroll() {
  return (
    <section className="story-scroll" id="work">
      <div className="story-section-header"><span className="tag tag-orange">Selected Work</span><h2 className="display-lg">Story-scroll project chapters.</h2></div>
      {projects.map((project) => (
        <article className="story-project" key={project.slug}>
          <div className="story-project-inner">
            <div className="story-project-info"><span className="story-num">{String(project.id).padStart(2, '0')}</span><span className="story-category">{project.category}</span><h3 className="story-title">{project.title}</h3><p className="story-summary">{project.summary}</p><div className="story-stack">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div><div className="story-ctas"><a className="btn btn-primary btn-sm" href="#contact">View Case Study</a><a className="btn btn-ghost btn-sm" href={project.liveUrl || '#contact'}>Live Site</a></div></div>
            <div className="story-visual" style={{ background: `linear-gradient(135deg, ${project.bgFrom}, ${project.bgTo})` }}><div className="story-visual-grid" /><div className="story-visual-label">{project.title}</div><div className="story-visual-accent" style={{ background: project.accent }} /></div>
          </div>
        </article>
      ))}
    </section>
  );
}
