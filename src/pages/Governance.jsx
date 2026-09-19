import PageHero from '../components/PageHero.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useLightbox } from '../hooks/useLightbox.js'
import { schoolInfo } from '../data/schoolInfo.js'

const photos = schoolInfo.leadershipPhotos || {}

const leadershipEntries = [
  { src: photos.principal, alt: schoolInfo.principal, caption: schoolInfo.principal },
  { src: photos.smt, alt: 'School Management Team', caption: 'School Management Team' },
  { src: photos.administration, alt: 'Administration Staff', caption: 'Administration Staff' },
  { src: photos.sgb, alt: 'School Governing Body', caption: 'School Governing Body' },
]

const lightboxItems = leadershipEntries.filter((entry) => entry.src)

function LeadershipPhoto({ src, alt, placeholderLabel, variant = 'portrait', onOpen }) {
  if (src) {
    return (
      <button
        type="button"
        className={`leadership-photo-trigger leadership-photo-trigger--${variant}`}
        onClick={onOpen}
        aria-label={`View larger photo: ${alt}`}
      >
        <img className={`leadership-photo leadership-photo--${variant}`} src={src} alt={alt} />
      </button>
    )
  }
  return <PhotoPlaceholder label={placeholderLabel} className={`photo-placeholder--${variant}`} />
}

export default function Governance() {
  const lightbox = useLightbox(lightboxItems)

  function openPhoto(src) {
    const index = lightboxItems.findIndex((item) => item.src === src)
    if (index !== -1) lightbox.open(index)
  }

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
            <LeadershipPhoto
              src={photos.principal}
              alt={schoolInfo.principal}
              placeholderLabel="Principal's photo reserved"
              onOpen={() => openPhoto(photos.principal)}
            />
            <div className="principal-spotlight__info">
              <span className="eyebrow">School Leadership</span>
              <h2>{schoolInfo.principal}</h2>
              <p className="principal-spotlight__title">Principal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container three-col">
          <div className="gov-card">
            <LeadershipPhoto
              src={photos.smt}
              alt="School Management Team"
              placeholderLabel="Photo reserved"
              variant="wide"
              onOpen={() => openPhoto(photos.smt)}
            />
            <span className="eyebrow">School Management Team</span>
            <h2>SMT</h2>
          </div>

          <div className="gov-card">
            <LeadershipPhoto
              src={photos.administration}
              alt="Administration Staff"
              placeholderLabel="Photo reserved"
              variant="wide"
              onOpen={() => openPhoto(photos.administration)}
            />
            <span className="eyebrow">Administration Staff</span>
            <h2>AA</h2>
          </div>

          <div className="gov-card">
            <LeadershipPhoto
              src={photos.sgb}
              alt="School Governing Body"
              placeholderLabel="Photo reserved"
              variant="wide"
              onOpen={() => openPhoto(photos.sgb)}
            />
            <span className="eyebrow">School Governing Body</span>
            <h2>SGB</h2>
          </div>
        </div>
      </section>

      <section className="section section--navy contact-cta">
        <div className="container contact-cta__inner">
          <h2>Support Our School</h2>
          <p>
            Your generosity helps us continue motivating and inspiring every learner at Igagasi
            Primary School. To make a donation to the school, please contact the school office.
          </p>
          <a className="btn btn--primary" href={`mailto:${schoolInfo.email}`}>
            Contact the School Office
          </a>
        </div>
      </section>

      <Lightbox
        item={lightbox.item}
        onClose={lightbox.close}
        onNavigate={lightbox.navigate}
        hasMultiple={lightbox.hasMultiple}
      />
    </>
  )
}
