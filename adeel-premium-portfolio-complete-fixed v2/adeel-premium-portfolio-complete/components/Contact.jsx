import { site } from '@/lib/site';

const projectTypes = [
  'Figma to WordPress',
  'WooCommerce Website',
  'Booking / Travel Website',
  'Website Redesign',
  'Speed Optimization',
  'Custom WordPress Development',
  'Next.js / Motion Portfolio'
];

export default function Contact() {
  return (
    <section className="contact-section section-pad" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Start a project</span>
          <h2>Have a serious website project? Let’s build a premium WordPress experience.</h2>
          <p>
            Share the pages, reference design, deadline, and goal. I’ll reply with clear direction,
            estimated scope, and the fastest path to launch.
          </p>
          <div className="contact-cards">
            <a href={`mailto:${site.email}`}>
              <span>Email</span>
              <strong>{site.email}</strong>
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
              <span>WhatsApp</span>
              <strong>{site.phone}</strong>
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>linkedin.com/in/adeelatwork</strong>
            </a>
          </div>
        </div>

        <form className="contact-form" action={site.formEndpoint} method="POST">
          <input type="hidden" name="_subject" value="New portfolio inquiry from adeeliqbalanjum.github.io" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={`${site.url}/?sent=1#contact`} />
          <input type="text" name="_honey" className="hidden-field" tabIndex="-1" autoComplete="off" />

          <div className="form-row">
            <label>
              Name
              <input name="name" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="you@email.com" required />
            </label>
          </div>
          <label>
            Website / Business
            <input name="website" placeholder="Business name or website link" />
          </label>
          <div className="form-row">
            <label>
              Project Type
              <select name="project_type" defaultValue={projectTypes[0]}>
                {projectTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              Budget Range
              <select name="budget" defaultValue="$700 - $1,500">
                <option>Under $300</option>
                <option>$300 - $700</option>
                <option>$700 - $1,500</option>
                <option>$1,500 - $3,000</option>
                <option>$3,000+</option>
              </select>
            </label>
          </div>
          <label>
            Message
            <textarea
              name="message"
              placeholder="Tell me about the pages, reference design, deadline, and goals..."
              rows="6"
              required
            />
          </label>
          <div className="form-actions-row">
            <button className="btn btn-primary" type="submit">
              Send inquiry
            </button>
            <a className="form-fallback" href={`mailto:${site.email}`}>
              Email directly
            </a>
          </div>
          <p className="form-note">
            The first FormSubmit message may ask you to confirm your email once. After activation,
            inquiries will arrive directly in your inbox.
          </p>
        </form>
      </div>
    </section>
  );
}
