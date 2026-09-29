import SectionHeader from '../components/grace/SectionHeader'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

export default function Settings() {
  return (
    <div>
      <SectionHeader
        title="Settings"
        subtitle="Customize your experience"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <Card padding="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 'var(--text-h3)' }}>Theme</h3>
            <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--text-body-sm)' }}>Switch between light and dark mode</p>
          </div>
          <Badge variant="primary" dot>Light</Badge>
        </Card>
        <Card padding="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 'var(--text-h3)' }}>Notifications</h3>
            <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--text-body-sm)' }}>Manage your reminders and alerts</p>
          </div>
          <Badge variant="lavender" dot>Enabled</Badge>
        </Card>
        <Card padding="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 'var(--text-h3)' }}>Privacy</h3>
            <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--text-body-sm)' }}>Control your data and visibility</p>
          </div>
          <Badge variant="gold" dot>Standard</Badge>
        </Card>
        <Card padding="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 'var(--text-h3)' }}>Account</h3>
            <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)', fontSize: 'var(--text-body-sm)' }}>Manage your account settings</p>
          </div>
          <Button variant="secondary" size="sm">Manage</Button>
        </Card>
      </div>
    </div>
  )
}
