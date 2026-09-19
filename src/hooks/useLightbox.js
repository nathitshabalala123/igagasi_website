import { useState } from 'react'

// items: array of { src, alt, caption? }
export function useLightbox(items) {
  const [activeIndex, setActiveIndex] = useState(null)

  return {
    item: activeIndex === null ? null : items[activeIndex],
    hasMultiple: items.length > 1,
    open: (index) => setActiveIndex(index),
    close: () => setActiveIndex(null),
    navigate: (delta) => setActiveIndex((i) => (i === null ? null : (i + delta + items.length) % items.length)),
  }
}
