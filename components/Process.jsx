import { processSteps } from '@/data/services';

export default function Process() {
  return (
    <section className="process-section section-pad" id="process">
      <div className="container section-heading split-heading">
        <div>
          <span className="eyebrow">Process</span>
          <h2>A structured workflow that keeps the project clean from first call to launch.</h2>
        </div>
        <p>
          Premium clients care about clarity. This process helps prevent confusion, missed details,
          poor responsiveness, and rushed launches.
        </p>
      </div>

      <div className="container process-line">
        {processSteps.map((step) => (
          <article className="process-card" key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
