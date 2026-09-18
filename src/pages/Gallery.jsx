import PageHero from '../components/PageHero.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'

// Photos are managed by the school admin via /admin (Decap CMS), one JSON
// file per photo under src/content/gallery. New files just show up here
// after the next deploy — no code changes needed.
const galleryModules = import.meta.glob('/src/content/gallery/*.json', { eager: true })

const photoItems = Object.values(galleryModules)
  .map((mod) => mod.default ?? mod)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const targetGridSize = 6
const placeholderCount = Math.max(0, targetGridSize - photoItems.length)

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Scholar & Curriculum Achievements"
        subtitle="A growing home for the photos and milestones that make Igagasi proud."
      />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our School</span>
            <h2>Around the Campus</h2>
          </div>
          <div className="photo-grid">
            {photoItems.map((item) => (
              <figure className="photo-card" key={item.image}>
                <img src={item.image} alt={item.caption} loading="lazy" />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {placeholderCount > 0 && (
        <section className="section section--cream">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Coming Soon</span>
              <h2>Reserved for Achievements &amp; Events</h2>
              <p className="section-heading__lead">
                This space is reserved for photos of scholar achievements, prize-giving ceremonies,
                sports days, curriculum projects and school events. Check back soon as we add new
                memories throughout the year.
              </p>
            </div>
            <div className="photo-grid photo-grid--placeholders">
              {Array.from({ length: placeholderCount }).map((_, i) => (
                <PhotoPlaceholder key={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
