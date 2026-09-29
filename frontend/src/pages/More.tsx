import { Link } from 'react-router'
import SectionHeader from '../components/grace/SectionHeader'
import FeatureCard from '../components/grace/FeatureCard'

const destinations = [
  { icon: '✦', name: 'Create', path: '/create', color: 'accent' as const, description: 'Your creative space' },
  { icon: '♪', name: 'Music', path: '/music', color: 'gold' as const, description: 'Your music, your mood' },
  { icon: '♡', name: 'Profile', path: '/profile', color: 'primary' as const, description: 'Make Grace your own' },
  { icon: '⚙', name: 'Settings', path: '/settings', color: 'lavender' as const, description: 'Customize your experience' },
]

export default function More() {
  return (
    <div>
      <SectionHeader
        title="Explore Grace"
        subtitle="Everything you need, in one personal space"
      />
      <div className="home-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
        {destinations.map((item) => (
          <Link to={item.path} key={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeatureCard
              icon={item.icon}
              title={item.name}
              description={item.description}
              color={item.color}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
