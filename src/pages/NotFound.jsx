import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container">
        <h1>404</h1>
        <p>The page you are looking for could not be found.</p>
        <Link to="/" className="btn btn--primary">Back to Home</Link>
      </div>
    </section>
  )
}
