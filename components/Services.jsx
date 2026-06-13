import { services } from '@/data/services';

export default function Services() {
  return (
    <section className="services-section section-pad" id="services">
      <div className="container section-heading center-heading">
        <span className="eyebrow">Services</span>
        <h2>What I can build for clients who need a serious web presence.</h2>
        <p>
          Clear deliverables, premium execution, and business-first thinking for websites that need
          to look professional and generate real inquiries.
        </p>
      </div>

      <div className="container services-grid">
        {services.map((service, index) => (
          <article className="service-card" key={service.title}>
            <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
            <span>{service.eyebrow}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
