export default function WaveDivider({ flip = false, color = '#0b3556', className = '' }) {
  return (
    <div className={`wave-divider ${flip ? 'wave-divider--flip' : ''} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path
          d="M0,32 C150,80 350,0 600,32 C850,64 1050,0 1200,32 L1200,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
