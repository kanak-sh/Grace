
import { NavLink } from 'react-router'

const navigation = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Grace AI', path: '/companion', icon: '✦' },
  { label: 'Health', path: '/health', icon: '♡' },
  { label: 'Hobbies', path: '/hobbies', icon: '✿' },
  { label: 'Notes', path: '/notes', icon: '▤' },
  { label: 'More', path: '/more', icon: '•••' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}