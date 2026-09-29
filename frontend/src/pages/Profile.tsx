import SectionHeader from '../components/grace/SectionHeader'
import Avatar from '../components/ui/Avatar'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Profile() {
  return (
    <div>
      <SectionHeader
        title="My Profile"
        subtitle="Make Grace your own"
      />
      <Card padding="lg" style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
        <Avatar name="Grace User" size="xl" status="online" />
        <div>
          <h2 style={{ margin: 0, fontSize: 'var(--text-h2)' }}>Grace User</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)' }}>grace@example.com</p>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
            <Badge variant="primary" dot>Active</Badge>
            <Badge variant="gold">Premium</Badge>
          </div>
        </div>
      </Card>
      <Card padding="lg">
        <h3 style={{ margin: '0 0 var(--space-lg)', fontSize: 'var(--text-h3)' }}>Personal details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Input label="Display name" defaultValue="Grace User" />
          <Input label="Email" type="email" defaultValue="grace@example.com" />
          <Input label="Pronouns" placeholder="e.g. she/her, he/him, they/them" hint="This helps Grace personalize your experience" />
          <Button variant="primary" fullWidth>Save changes</Button>
        </div>
      </Card>
    </div>
  )
}
