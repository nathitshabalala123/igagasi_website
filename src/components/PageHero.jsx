import WaveDivider from './WaveDivider.jsx'

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__content">
        {eyebrow && <span className="eyebrow eyebrow--light">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <WaveDivider color="var(--cream)" />
    </section>
  )
}
