export default function Logo({ size = 44 }) {
  return (
    <img
      className="logo"
      src="/images/igagasi-logo.png"
      alt="Igagasi Primary School crest"
      height={size}
      style={{ height: size, width: 'auto' }}
    />
  )
}
