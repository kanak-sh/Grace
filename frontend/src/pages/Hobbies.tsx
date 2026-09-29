import SectionHeader from '../components/grace/SectionHeader'
import FeatureCard from '../components/grace/FeatureCard'
import EmptyState from '../components/grace/EmptyState'
import Button from '../components/ui/Button'

const hobbies = [
  { icon: '🎨', title: 'Art & Design', description: 'Express yourself through visual creativity', color: 'accent' as const },
  { icon: '📚', title: 'Reading', description: 'Books, articles, and stories that inspire', color: 'lavender' as const },
  { icon: '🌱', title: 'Gardening', description: 'Grow your own plants and green space', color: 'lavender' as const },
  { icon: '🎵', title: 'Music', description: 'Instruments, singing, and music discovery', color: 'gold' as const },
  { icon: '🏃', title: 'Running', description: 'Track your pace, distance, and progress', color: 'primary' as const },
  { icon: '📷', title: 'Photography', description: 'Capture moments and explore perspectives', color: 'lavender' as const },
]

export default function Hobbies() {
  return (
    <div>
      <SectionHeader
        title="Hobbies"
        subtitle="Explore the things you love"
      />
      <div className="home-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
        {hobbies.map((hobby) => (
          <FeatureCard
            key={hobby.title}
            icon={hobby.icon}
            title={hobby.title}
            description={hobby.description}
            color={hobby.color}
          />
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <EmptyState
          icon="✿"
          title="Suggestions for you"
          description="Grace will recommend new hobbies based on your interests and activity."
          action={<Button variant="secondary" size="sm">Explore suggestions</Button>}
        />
      </div>
    </div>
  )
}
