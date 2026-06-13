import { projects } from '@/data/projects';
import { asset } from '@/lib/site';

export default function SelectedWork() {
  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);

  return (
    <section className="work-section section-pad" id="work">
      <div className="container section-heading split-heading">
        <div>
          <span className="eyebrow">Selected work</span>
          <h2>Real business websites built for trust, speed, and conversion.</h2>
        </div>
        <p>
          A mix of Figma-to-WordPress builds and reference-inspired implementations across B2B,
          travel, healthcare, HR, smart home technology, and local service industries.
        </p>
      </div>

      <div className="container project-grid">
        {featured.map((project, index) => (
          <article className="project-card" id={`project-${project.slug}`} key={project.slug}>
            <a className="project-image" href={asset(`/projects/${project.slug}/`)}>
              {project.thumb ? (
                <img src={asset(project.thumb)} alt={`${project.title} website preview`} />
              ) : (
                <div className="project-placeholder">{project.title}</div>
              )}
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
            </a>
            <div className="project-content">
              <div className="project-meta">
                <span>{project.category}</span>
                <span>{project.industry}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="project-result">{project.result}</div>
              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={asset(`/projects/${project.slug}/`)}>View case study</a>
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit live site
                </a>
                {project.reference && (
                  <a href={project.reference} target="_blank" rel="noreferrer">
                    Reference direction
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="container additional-work">
        <span className="eyebrow">More projects</span>
        <div className="mini-project-grid">
          {additional.map((project) => (
            <a href={asset(`/projects/${project.slug}/`)} key={project.slug}>
              <strong>{project.title}</strong>
              <span>{project.category} · {project.industry}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
