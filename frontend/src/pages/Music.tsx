import SectionHeader from '../components/grace/SectionHeader'
import FeatureCard from '../components/grace/FeatureCard'
import EmptyState from '../components/grace/EmptyState'
import Button from '../components/ui/Button'

const playlists = [
  { icon: '☀', title: 'Morning Rise', description: 'Gentle tunes to start your day', color: 'gold' as const },
  { icon: '◎', title: 'Deep Focus', description: 'Ambient sounds for concentration', color: 'lavender' as const },
  { icon: '♡', title: 'Feel Good', description: 'Uplifting tracks for a boost', color: 'primary' as const },
  { icon: '☾', title: 'Night Wind', description: 'Calm melodies for unwinding', color: 'lavender' as const },
]

export default function Music() {
  return (
    <div>
      <SectionHeader
        title="Music"
        subtitle="Your music, your mood"
        action={<Button variant="primary" size="sm">New playlist</Button>}
      />
      <div className="home-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
        {playlists.map((playlist) => (
          <FeatureCard
            key={playlist.title}
            icon={playlist.icon}
            title={playlist.title}
            description={playlist.description}
            color={playlist.color}
          />
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <EmptyState
          icon="♪"
          title="Your listening history"
          description="Songs and playlists you enjoy will show up here for quick access."
        />
      </div>
    </div>
  )
}
