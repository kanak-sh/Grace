import SectionHeader from '../components/grace/SectionHeader'
import AIInsightCard from '../components/grace/AIInsightCard'
import EmptyState from '../components/grace/EmptyState'
import Button from '../components/ui/Button'

export default function Companion() {
  return (
    <div>
      <SectionHeader
        title="Grace AI"
        subtitle="Your personal companion, always here to listen"
      />
      <AIInsightCard
        icon="✦"
        title="Start a conversation"
        mood="gentle"
        action={
          <Button variant="primary" size="sm">
            Chat with Grace
          </Button>
        }
      >
        Grace learns your patterns and preferences over time to offer
        personalized support, suggestions, and a friendly presence throughout
        your day.
      </AIInsightCard>
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <EmptyState
          icon="✦"
          title="No conversations yet"
          description="Your chat history with Grace will appear here once you start talking."
        />
      </div>
    </div>
  )
}
