import { useEffect } from 'react'

export default function Lightbox({ item, onClose, onNavigate, hasMultiple }) {
  useEffect(() => {
    if (!item) return

    function handleKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }

    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose, onNavigate])

  if (!item) return null

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.alt}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        &times;
      </button>

      {hasMultiple && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(-1)
          }}
          aria-label="Previous photo"
        >
          &lsaquo;
        </button>
      )}

      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} />
        {item.caption && <figcaption>{item.caption}</figcaption>}
      </figure>

      {hasMultiple && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(1)
          }}
          aria-label="Next photo"
        >
          &rsaquo;
        </button>
      )}
    </div>
  )
}
