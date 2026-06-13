import { techStack } from '@/data/services';

export default function TechStack() {
  return (
    <section className="tech-section section-pad" aria-label="Technology stack">
      <div className="container section-heading center-heading">
        <span className="eyebrow">Tech stack</span>
        <h2>Tools and technologies I use to build fast, flexible websites.</h2>
      </div>
      <div className="container tech-marquee">
        {[...techStack, ...techStack].map((tech, index) => (
          <span key={`${tech}-${index}`}>{tech}</span>
        ))}
      </div>
    </section>
  );
}
