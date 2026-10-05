import { useState } from 'react'
import SectionHeader from '../components/grace/SectionHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useTheme } from '../components/theme/ThemeContext'
import { useSettings } from '../hooks/useSettings'
import {
  clearGraceLocalData,
  saveSettings,
  type NotificationPreferences,
  type SettingsData,
} from '../services/settingsStorage'
import './Settings.css'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const

const NOTIFICATION_ITEMS: { key: keyof NotificationPreferences; label: string; description: string }[] = [
  { key: 'dailyReminders', label: 'Daily reminders', description: 'A gentle nudge each day' },
  { key: 'moodCheckins', label: 'Mood check-ins', description: 'Ask how your day is going' },
  { key: 'hobbyReminders', label: 'Hobby reminders', description: 'Remind you about your hobbies' },
  { key: 'graceSuggestions', label: 'Grace suggestions', description: 'Ideas and inspiration from Grace' },
]

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const settings = useSettings()
  const [confirmingClear, setConfirmingClear] = useState(false)
  const [dataCleared, setDataCleared] = useState(false)

  const update = (patch: Partial<SettingsData>) => {
    saveSettings({ ...settings, ...patch })
  }

  const toggleNotification = (key: keyof NotificationPreferences) => {
    update({
      notifications: { ...settings.notifications, [key]: !settings.notifications[key] },
    })
  }

  const clearData = () => {
    clearGraceLocalData()
    setConfirmingClear(false)
    setDataCleared(true)
    window.setTimeout(() => setDataCleared(false), 3000)
  }

  return (
    <div className="settings-page">
      <SectionHeader
        title="Settings"
        subtitle="How do you want Grace to work?"
      />

      <section className="settings-section">
        <h2>Appearance</h2>
        <Card padding="lg">
          <div className="settings-row">
            <div>
              <h3>Theme</h3>
              <p>Choose how Grace looks to you</p>
            </div>
            <div className="settings-theme-options" role="radiogroup" aria-label="Theme">
              {THEME_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={theme === option.value}
                  className={`settings-theme-option${theme === option.value ? ' is-selected' : ''}`}
                  onClick={() => setTheme(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="settings-section">
        <h2>Grace</h2>
        <Card padding="lg">
          <ToggleRow
            label="Use personalization"
            description="Let Grace use your interests, hobbies and mood"
            value={settings.usePersonalization}
            onToggle={() => update({ usePersonalization: !settings.usePersonalization })}
          />
        </Card>
      </section>

      <section className="settings-section">
        <h2>Notifications</h2>
        <Card padding="lg">
          <div className="settings-rows">
            {NOTIFICATION_ITEMS.map((item) => (
              <ToggleRow
                key={item.key}
                label={item.label}
                description={item.description}
                value={settings.notifications[item.key]}
                onToggle={() => toggleNotification(item.key)}
              />
            ))}
          </div>
        </Card>
      </section>

      <section className="settings-section">
        <h2>Privacy &amp; Data</h2>
        <Card padding="lg">
          <div className="settings-privacy">
            <p>Your data is currently stored locally on this device.</p>
            {dataCleared && <p className="settings-cleared" role="status">Local data cleared ✓</p>}
            {confirmingClear ? (
              <div className="settings-confirm">
                <p>
                  Clear local data? This will remove your profile, notes, hobbies,
                  music data, and creations from this device.
                </p>
                <div className="settings-confirm-actions">
                  <Button variant="ghost" size="sm" onClick={() => setConfirmingClear(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" size="sm" onClick={clearData}>
                    Clear data
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => setConfirmingClear(true)}>
                Clear local data
              </Button>
            )}
          </div>
        </Card>
      </section>

      <section className="settings-section">
        <h2>About</h2>
        <Card padding="lg">
          <div className="settings-about">
            <h3>Grace</h3>
            <p className="settings-version">Version 0.1.0</p>
            <p>A personal space for your day, ideas, hobbies and moments.</p>
            <p className="settings-made">Made with care ✦</p>
          </div>
        </Card>
      </section>
    </div>
  )
}

function ToggleRow({
  label,
  description,
  value,
  onToggle,
}: {
  label: string
  description: string
  value: boolean
  onToggle: () => void
}) {
  return (
    <div className="settings-row">
      <div>
        <h3>{label}</h3>
        <p>{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        className={`settings-switch${value ? ' is-on' : ''}`}
        onClick={onToggle}
      >
        <span className="settings-switch-thumb" />
      </button>
    </div>
  )
}
