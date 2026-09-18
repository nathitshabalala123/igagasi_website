import PageHero from '../components/PageHero.jsx'
import { schoolInfo } from '../data/schoolInfo.js'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story"
        subtitle="Getting to know Igagasi Primary School, its history, and its people."
      />

      <section className="section">
        <div className="container about__grid">
          <div className="about__history">
            <span className="eyebrow">Our History</span>
            <h2>A School Named After the Wave</h2>
            <p>
              Igagasi Primary School opened its doors on <strong>{schoolInfo.established}</strong>{' '}
              in Spruitview, and has since grown into a pillar of the community. The name{' '}
              <em>Igagasi</em>, meaning &ldquo;wave,&rdquo; reflects our belief that every learner
              carries within them the power to rise, gather momentum, and reach further than they
              imagined &mdash; captured in the wave motifs on our school badge and entrance mosaic.
            </p>
            <p>
              Today the school proudly caters for learners from <strong>{schoolInfo.grades}</strong>,
              guided by our motto, <strong>&ldquo;{schoolInfo.motto}.&rdquo;</strong> We are grateful
              for the ongoing support of the {schoolInfo.supportProgramme}, which continues to invest
              in our facilities and our scholars.
            </p>
          </div>
          <div className="about__facts">
            <h3>Quick Facts</h3>
            <ul className="fact-list">
              <li><span>Established</span><strong>{schoolInfo.established}</strong></li>
              <li><span>Grades Offered</span><strong>{schoolInfo.grades}</strong></li>
              <li><span>Principal</span><strong>{schoolInfo.principal}</strong></li>
              <li><span>Address</span><strong>{schoolInfo.address}</strong></li>
              <li><span>Motto</span><strong>{schoolInfo.motto}</strong></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container vision-mission__grid">
          <div className="vision-mission__card">
            <span className="eyebrow">Our Vision</span>
            <h3>Rising Like the Wave</h3>
            <p>
              To be a school where every learner from Grade R to Grade 7 is motivated and inspired
              to reach their full academic and personal potential.
            </p>
          </div>
          <div className="vision-mission__card">
            <span className="eyebrow">Our Mission</span>
            <h3>Motivate. Inspire. Achieve.</h3>
            <p>
              To provide quality, curriculum-aligned education in a safe and supportive environment,
              built on strong partnerships between staff, the School Management Team, the School
              Governing Body, parents and the community.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Leadership</span>
            <h2>A Message From the Principal</h2>
          </div>
          <div className="principal-card">
            <div className="principal-card__avatar" aria-hidden="true">PDM</div>
            <div>
              <p>&ldquo;{schoolInfo.principalMessage.quote}&rdquo;</p>
              <strong>{schoolInfo.principal}</strong>
              <span>{schoolInfo.principalMessage.title}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
