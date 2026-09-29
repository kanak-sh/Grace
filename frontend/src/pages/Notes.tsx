import SectionHeader from '../components/grace/SectionHeader'
import EmptyState from '../components/grace/EmptyState'
import Button from '../components/ui/Button'

export default function Notes() {
  return (
    <div>
      <SectionHeader
        title="Notes"
        subtitle="Capture your thoughts and ideas"
        action={<Button variant="primary" size="sm">New note</Button>}
      />
      <EmptyState
        icon="▤"
        title="No notes yet"
        description="Start capturing your thoughts and ideas — they'll appear here."
        action={<Button variant="primary" size="sm">Create your first note</Button>}
      />
    </div>
  )
}
