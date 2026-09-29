import SectionHeader from '../components/grace/SectionHeader'
import FeatureCard from '../components/grace/FeatureCard'
import EmptyState from '../components/grace/EmptyState'
import Button from '../components/ui/Button'

const projects = [
  { icon: '✏️', title: 'Writing', description: 'Stories, poems, journal entries', color: 'primary' as const },
  { icon: '🎨', title: 'Art', description: 'Sketches, designs, illustrations', color: 'accent' as const },
  { icon: '🎬', title: 'Video', description: 'Short films, vlogs, animations', color: 'lavender' as const },
  { icon: '🧵', title: 'Crafts', description: 'DIY projects and handmade creations', color: 'lavender' as const },
]

export default function Create() {
  return (
    <div>
      <SectionHeader
        title="Create"
        subtitle="Your creative space"
        action={<Button variant="primary" size="sm">New project</Button>}
      />
      <div className="home-features" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
        {projects.map((project) => (
          <FeatureCard
            key={project.title}
            icon={project.icon}
            title={project.title}
            description={project.description}
            color={project.color}
          />
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <EmptyState
          icon="✨"
          title="Your creations"
          description="Projects you start will appear here, ready to pick up where you left off."
        />
      </div>
    </div>
  )
}
