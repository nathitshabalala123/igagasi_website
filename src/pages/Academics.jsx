import PageHero from '../components/PageHero.jsx'

const phases = [
  {
    name: 'Foundation Phase',
    grades: 'Grade R - Grade 3',
    text: 'Building the essential foundations of literacy, numeracy and life skills through play-based and structured learning.',
    subjects: ['Home Language', 'First Additional Language', 'Mathematics', 'Life Skills'],
  },
  {
    name: 'Intermediate Phase',
    grades: 'Grade 4 - Grade 6',
    text: 'Broadening subject knowledge and developing independent learning, critical thinking and study skills.',
    subjects: ['Home Language', 'First Additional Language', 'Mathematics', 'Natural Sciences & Technology', 'Social Sciences', 'Life Skills'],
  },
  {
    name: 'Senior Phase Entry',
    grades: 'Grade 7',
    text: 'Preparing learners for the transition to high school with a strengthened academic and personal foundation.',
    subjects: ['Home Language', 'First Additional Language', 'Mathematics', 'Natural Sciences', 'Social Sciences', 'Technology', 'Life Orientation'],
  },
]

const support = [
  {
    title: 'Curriculum-Aligned Teaching',
    text: "Lessons are planned and delivered in line with South Africa's CAPS curriculum for every grade.",
  },
  {
    title: 'Assessment & Reporting',
    text: 'Regular formal and informal assessments track progress, with reports issued to parents each term.',
  },
  {
    title: 'Learner Support',
    text: 'Additional support is provided to learners who need extra help to keep pace with the curriculum.',
  },
  {
    title: 'Life Skills & Values',
    text: 'Beyond academics, learners are guided in values, sport and life skills that shape well-rounded citizens.',
  },
]

export default function Academics() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Our Curriculum"
        subtitle="A structured journey of learning from Grade R through to Grade 7."
      />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Phases of Learning</span>
            <h2>From Grade R to Grade 7</h2>
          </div>
          <div className="phase-grid">
            {phases.map((phase) => (
              <div className="phase-card" key={phase.name}>
                <span className="phase-card__grades">{phase.grades}</span>
                <h3>{phase.name}</h3>
                <p>{phase.text}</p>
                <div className="phase-card__subjects">
                  {phase.subjects.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">How We Support Learning</span>
            <h2 className="on-navy">Beyond the Classroom</h2>
          </div>
          <div className="support-grid">
            {support.map((item) => (
              <div className="support-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
