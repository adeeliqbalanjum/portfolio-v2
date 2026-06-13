'use client';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div><span className="tag tag-orange">Contact</span><h2 className="display-lg">Let’s work together.</h2><p className="body-lg text-muted">Send your project details and timeline.</p><div className="contact-card"><a href="https://wa.me/923054829714">WhatsApp</a><a href="mailto:adeeliqbalajum@gmail.com">Email</a><a href="https://linkedin.com/in/adeelatwork/">LinkedIn</a></div></div>
        <form className="contact-form"><input placeholder="Name" /><input placeholder="Email" /><textarea placeholder="Message" rows={5} /><button className="btn btn-primary" type="button">Submit Project</button></form>
      </div>
    </section>
  );
}
