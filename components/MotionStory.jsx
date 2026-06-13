const storyCards = [
  {
    number: '01',
    title: 'Clean product-style background',
    text: 'Soft cream gradients, calm spacing, glass panels, and subtle depth so the portfolio feels mature instead of noisy.'
  },
  {
    number: '02',
    title: 'Scroll-based storytelling',
    text: 'Sections reveal with GSAP, cards drift upward, screenshots move with parallax, and important CTAs feel alive.'
  },
  {
    number: '03',
    title: 'Case studies that sell',
    text: 'Projects are presented as client outcomes, not just screenshots — role, challenge, solution, result, and live site.'
  }
];

export default function MotionStory() {
  return (
    <section className="motion-story section-pad" id="motion">
      <div className="container motion-story-grid">
        <div className="motion-story-copy" data-reveal>
          <span className="eyebrow">Motion system</span>
          <h2>Calm like a premium product. Animated like a creative studio.</h2>
          <p>
            The redesign uses soft Nudge-style backgrounds and premium GSAP interaction layers:
            intro reveals, scroll transitions, hover tilt, parallax screenshots, magnetic buttons,
            and a refined page rhythm across desktop and mobile.
          </p>
        </div>
        <div className="motion-story-cards" aria-label="Motion and background improvements">
          {storyCards.map((item) => (
            <article className="motion-card" key={item.number} data-motion-card>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
