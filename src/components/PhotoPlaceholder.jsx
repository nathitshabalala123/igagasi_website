export default function PhotoPlaceholder({ label = 'Photo coming soon', className = '' }) {
  return (
    <div className={`photo-placeholder ${className}`} aria-hidden="true">
      <span className="photo-placeholder__icon">
        <svg viewBox="0 0 48 48" width="32" height="32">
          <rect x="4" y="10" width="40" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="16" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M4 34l12-10 8 7 8-6 12 9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{label}</span>
    </div>
  )
}
