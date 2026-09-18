import PageHero from '../components/PageHero.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import { schoolInfo } from '../data/schoolInfo.js'

export default function Governance() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Leadership"
        subtitle="The teams that guide Igagasi Primary School's management and governance."
      />

      <section className="section">
        <div className="container">
          <div className="principal-spotlight">
            <PhotoPlaceholder label="Principal's photo reserved" className="photo-placeholder--portrait" />
            <div className="principal-spotlight__info">
              <span className="eyebrow">School Leadership</span>
              <h2>{schoolInfo.principal}</h2>
              <p className="principal-spotlight__title">Principal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container two-col">
          <div className="gov-card">
            <PhotoPlaceholder label="Photo reserved" className="photo-placeholder--portrait" />
            <span className="eyebrow">School Management Team</span>
            <h2>SMT</h2>
          </div>

          <div className="gov-card">
            <PhotoPlaceholder label="Photo reserved" className="photo-placeholder--portrait" />
            <span className="eyebrow">School Governing Body</span>
            <h2>SGB</h2>
          </div>
        </div>
      </section>

      <section className="section section--navy contact-cta">
        <div className="container contact-cta__inner">
          <h2>Want to Get Involved?</h2>
          <p>
            Parents and community members interested in the School Governing Body are welcome to
            contact the school office for more information.
          </p>
          <a className="btn btn--primary" href={`mailto:${schoolInfo.email}`}>
            Contact the School Office
          </a>
        </div>
      </section>
    </>
  )
}
