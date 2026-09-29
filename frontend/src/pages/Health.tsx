import SectionHeader from '../components/grace/SectionHeader'
import StatCard from '../components/grace/StatCard'
import EmptyState from '../components/grace/EmptyState'
import Button from '../components/ui/Button'

export default function Health() {
  return (
    <div>
      <SectionHeader
        title="Health"
        subtitle="Your health and daily activity"
      />
      <div className="home-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
        <StatCard icon="♡" label="Heart rate" value="72 bpm" color="primary" />
        <StatCard icon="👟" label="Steps" value="6,842" trend="+12%" trendDirection="up" color="lavender" />
        <StatCard icon="☾" label="Sleep" value="7h 24m" color="gold" />
        <StatCard icon="💧" label="Water" value="5 / 8" color="accent" />
      </div>
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <EmptyState
          icon="📊"
          title="No health data yet"
          description="Connect a device or start logging your activity to see insights here."
          action={<Button variant="primary" size="sm">Log activity</Button>}
        />
      </div>
    </div>
  )
}
