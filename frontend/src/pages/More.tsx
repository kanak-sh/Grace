
import { Link } from 'react-router'

const destinations = [
  { name: 'Create', path: '/create' },
  { name: 'Music', path: '/music' },
  { name: 'Profile', path: '/profile' },
  { name: 'Settings', path: '/settings' },
]

export default function More() {
  return (
    <section>
      <h1>Explore Grace</h1>
      <p>Everything you need, in one personal space.</p>

      <div className="more-grid">
        {destinations.map((item) => (
          <Link className="more-card" to={item.path} key={item.path}>
            {item.name} <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}