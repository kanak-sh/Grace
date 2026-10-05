
import { NavLink } from 'react-router'

const navigation = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Companion', path: '/companion', icon: '✦' },
  { label: 'Grace', path: '/companion', icon: '☺', center: true },
  { label: 'Hobbies', path: '/hobbies', icon: '♡' },
  { label: 'More', path: '/more', icon: '▦' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navigation.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `nav-item ${item.center ? 'nav-grace' : ''} ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}