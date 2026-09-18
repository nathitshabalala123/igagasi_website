import settings from '../content/settings.json'

// Editable by the school admin via /admin (Decap CMS) — see src/content/settings.json
export const schoolInfo = settings

// Site navigation/structure — not exposed to the CMS, edit here in code
export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/governance', label: 'Leadership' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]
