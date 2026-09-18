import { Link } from 'react-router-dom'
import WaveDivider from '../components/WaveDivider.jsx'
import { schoolInfo } from '../data/schoolInfo.js'

const highlights = [
  {
    title: 'Grade R - Grade 7',
    text: 'A full primary phase journey, building strong foundations from the very first year of school.',
  },
  {
    title: `Established ${schoolInfo.established}`,
    text: 'Decades of serving the Spruitview community with pride and purpose.',
  },
  {
    title: 'Motivate. Inspire.',
    text: 'The values painted on our school walls guide everything we do, in and out of the classroom.',
  },
]

const pillars = [
  {
    title: 'Academic Excellence',
    text: 'A curriculum-aligned programme from Grade R to Grade 7 that builds literacy, numeracy and a love of learning.',
  },
  {
    title: 'Strong Governance',
    text: 'Guided by a dedicated School Management Team and School Governing Body working hand in hand.',
  },
  {
    title: 'Community Partnership',
    text: `Proudly supported by the ${schoolInfo.supportProgramme}, strengthening our school for every learner.`,
  },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: "url('/images/school-badge-wall.jpg')" }} />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <span className="eyebrow eyebrow--light">Igagasi Primary School &middot; Spruitview</span>
          <h1>{schoolInfo.homepage.heroTitle}</h1>
          <p>{schoolInfo.homepage.heroSubtitle}</p>
          <div className="hero__actions">
            <Link to="/about" className="btn btn--primary">Discover Our School</Link>
            <Link to="/gallery" className="btn btn--ghost">View Gallery</Link>
          </div>
        </div>
        <WaveDivider color="var(--cream)" />
      </section>

      <section className="section highlights">
        <div className="container highlights__grid">
          {highlights.map((h) => (
            <div className="highlight-card" key={h.title}>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--navy welcome">
        <div className="container welcome__grid">
          <div className="welcome__text">
            <span className="eyebrow">A Message From Our Principal</span>
            <h2>Building Waves of Excellence, One Learner at a Time</h2>
            <p>{schoolInfo.homepage.welcomeMessage}</p>
            <p className="welcome__signature">
              &mdash; {schoolInfo.principal}, Principal
            </p>
            <Link to="/governance" className="btn btn--outline-light">Meet Our Leadership</Link>
          </div>
          <div className="welcome__quote-card">
            <p>&ldquo;{schoolInfo.homepage.quote}&rdquo;</p>
            <span>{schoolInfo.homepage.quoteCaption}</span>
          </div>
        </div>
      </section>

      <section className="section pillars">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why Igagasi</span>
            <h2>What Makes Our School Strong</h2>
          </div>
          <div className="pillars__grid">
            {pillars.map((p) => (
              <div className="pillar-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream gallery-teaser">
        <div className="container gallery-teaser__grid">
          <div className="gallery-teaser__text">
            <span className="eyebrow">Scholar &amp; Curriculum Achievements</span>
            <h2>Celebrating Every Milestone</h2>
            <p>
              From classroom projects to sports days and prize-giving ceremonies, our gallery is
              growing into a home for the moments that make Igagasi proud. Visit the gallery page
              to see our learners in action.
            </p>
            <Link to="/gallery" className="btn btn--primary">Visit the Gallery</Link>
          </div>
          <div className="gallery-teaser__preview">
            <img src="/images/school-entrance.webp" alt="Igagasi Primary School entrance mosaic sign" />
          </div>
        </div>
      </section>
    </>
  )
}
