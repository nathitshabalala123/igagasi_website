import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { schoolInfo, navLinks } from '../data/schoolInfo.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <div className="footer__brand">
            <Logo size={40} />
            <div>
              <strong>{schoolInfo.name}</strong>
              <p>{schoolInfo.motto}</p>
            </div>
          </div>
          <p className="footer__note">
            Proudly supported by the {schoolInfo.supportProgramme}.
          </p>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li>{schoolInfo.address}</li>
            <li>Tel: {schoolInfo.phone}</li>
            <li>
              <a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Office Hours</h4>
          <ul>
            <li>Monday - Friday</li>
            <li>07:00 - 15:00</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; {new Date().getFullYear()} {schoolInfo.name}. All rights reserved.</p>
        <p>Grade R - Grade 7 &middot; Est. {schoolInfo.established}</p>
        <a
          className="footer__credit"
          href="https://nduna.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/nduna-logo.png" alt="" aria-hidden="true" />
          Powered by Nduna AI
        </a>
      </div>
    </footer>
  )
}
