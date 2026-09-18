import PageHero from '../components/PageHero.jsx'

// Announcements are managed by the school admin via /admin (Decap CMS), one
// JSON file per notice under src/content/announcements. New/edited files
// just show up here after the next deploy — no code changes needed.
const announcementModules = import.meta.glob('/src/content/announcements/*.json', { eager: true })

const announcements = Object.values(announcementModules)
  .map((mod) => mod.default ?? mod)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

function formatDate(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString || ''
  return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderParagraphs(text) {
  return (text || '')
    .split(/\n+/)
    .filter(Boolean)
    .map((paragraph, i) => <p key={i}>{paragraph}</p>)
}

export default function Announcements() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Announcements"
        subtitle="The latest notices and updates from Igagasi Primary School."
      />

      <section className="section">
        <div className="container">
          {announcements.length > 0 ? (
            <div className="announcement-list">
              {announcements.map((item) => (
                <article className="announcement-card" key={item.title + item.date}>
                  <time className="announcement-card__date" dateTime={item.date}>
                    {formatDate(item.date)}
                  </time>
                  <div className="announcement-card__body">
                    <h2>{item.title}</h2>
                    {renderParagraphs(item.body)}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="announcement-empty">No announcements yet — check back soon.</p>
          )}
        </div>
      </section>
    </>
  )
}
