import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionProvider from '@/components/MotionProvider';
import { projects } from '@/data/projects';
import { asset, site } from '@/lib/site';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: `Project not found — ${site.name}`
    };
  }

  return {
    title: `${project.title} Case Study — ${site.name}`,
    description: `${project.summary} Role: ${project.role}.`,
    openGraph: {
      title: `${project.title} Case Study — ${site.name}`,
      description: project.summary,
      images: project.thumb ? [asset(project.thumb)] : [asset('/images/og-image.webp')]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} Case Study — ${site.name}`,
      description: project.summary,
      images: project.thumb ? [asset(project.thumb)] : [asset('/images/og-image.webp')]
    }
  };
}

export default async function ProjectCaseStudy({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <main>
      <MotionProvider />
      <Header />
      <section className="case-hero">
        <div className="container case-hero-grid">
          <div className="case-hero-copy">
            <a className="case-back" href={asset('/#work')}>← Back to selected work</a>
            <div className="project-meta case-meta">
              <span>{project.category}</span>
              <span>{project.industry}</span>
            </div>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <div className="case-actions">
              <a className="btn btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                Visit live website
              </a>
              {project.reference && (
                <a className="btn btn-secondary" href={project.reference} target="_blank" rel="noreferrer">
                  View reference direction
                </a>
              )}
            </div>
          </div>

          <div className="case-hero-media">
            {project.image ? (
              <img src={asset(project.image)} alt={`${project.title} full website preview`} />
            ) : (
              <div className="project-placeholder">{project.title}</div>
            )}
          </div>
        </div>
      </section>

      <section className="case-details section-pad">
        <div className="container case-details-grid">
          <aside className="case-sidebar">
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>Industry</span>
              <strong>{project.industry}</strong>
            </div>
            <div>
              <span>Build Type</span>
              <strong>{project.category}</strong>
            </div>
            <div>
              <span>Stack</span>
              <div className="case-stack">
                {project.stack.map((item) => (
                  <em key={item}>{item}</em>
                ))}
              </div>
            </div>
          </aside>

          <div className="case-story">
            <div className="case-story-block" data-reveal>
              <span className="eyebrow">Challenge</span>
              <h2>What the project needed</h2>
              <p>{project.challenge}</p>
            </div>

            <div className="case-story-block" data-reveal>
              <span className="eyebrow">Solution</span>
              <h2>How I approached the build</h2>
              <p>{project.solution}</p>
            </div>

            <div className="case-story-block" data-reveal>
              <span className="eyebrow">Outcome</span>
              <h2>What the final website delivers</h2>
              <p>{project.outcome}</p>
            </div>

            <div className="case-highlight-grid" data-reveal>
              {project.highlights.map((item, index) => (
                <div className="case-highlight" key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-next section-pad">
        <div className="container section-heading split-heading">
          <div>
            <span className="eyebrow">More case studies</span>
            <h2>Explore more selected builds.</h2>
          </div>
          <p>Each project focuses on responsive implementation, trust-building structure, and conversion-focused presentation.</p>
        </div>
        <div className="container mini-project-grid">
          {relatedProjects.map((item) => (
            <a href={asset(`/projects/${item.slug}/`)} key={item.slug}>
              <strong>{item.title}</strong>
              <span>{item.category} · {item.industry}</span>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
