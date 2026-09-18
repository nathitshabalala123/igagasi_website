import PageHero from '../components/PageHero.jsx'
import { schoolInfo } from '../data/schoolInfo.js'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="We would love to hear from you. Reach out with any enquiries."
      />

      <section className="section">
        <div className="container contact__grid">
          <div className="contact__details">
            <h2>School Details</h2>
            <ul className="contact-list">
              <li>
                <strong>Address</strong>
                <span>{schoolInfo.address}</span>
              </li>
              <li>
                <strong>Telephone</strong>
                <span>{schoolInfo.phone}</span>
              </li>
              <li>
                <strong>Email</strong>
                <span><a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a></span>
              </li>
              <li>
                <strong>Enquiries</strong>
                <span>{schoolInfo.principal} (Principal)</span>
              </li>
              <li>
                <strong>Office Hours</strong>
                <span>Monday - Friday, 07:00 - 15:00</span>
              </li>
            </ul>
          </div>

          <div className="contact__map">
            <iframe
              title="Igagasi Primary School Location"
              src="https://www.google.com/maps?q=1+Sekete+Avenue,+Spruitview,+1425&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Send a Message</span>
            <h2 className="on-navy">Send Us an Enquiry</h2>
          </div>
          <form
            className="contact-form"
            action={`mailto:${schoolInfo.email}`}
            method="post"
            encType="text/plain"
          >
            <div className="contact-form__row">
              <label>
                Full Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email Address
                <input type="email" name="email" required />
              </label>
            </div>
            <label>
              Message
              <textarea name="message" rows="5" required></textarea>
            </label>
            <button type="submit" className="btn btn--primary">Send Message</button>
          </form>
        </div>
      </section>
    </>
  )
}
