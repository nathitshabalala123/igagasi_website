import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import { schoolInfo, navLinks } from '../data/schoolInfo.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <Logo size={46} />
          <span className="navbar__brand-text">
            <strong>{schoolInfo.name}</strong>
            <em>{schoolInfo.motto}</em>
          </span>
        </NavLink>

        <button
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar__nav ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
