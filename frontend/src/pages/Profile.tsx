import { useEffect, useState } from 'react'
import Avatar from '../components/ui/Avatar'
import { getUserAvatar } from '../services/avatarImages'
import { useProfile } from '../hooks/useProfile'
import { profileStorage, type ProfileData } from '../services/profileStorage'
import { useTheme } from '../components/theme/ThemeContext'
import { getHobbyLabel } from '../services/hobbyData'
import './Profile.css'

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+', 'Prefer not to say']

const CHARACTER_PREFERENCES = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'no-preference', label: 'No preference' },
]

const CHARACTERS = [
  { value: 'grace', label: 'Grace', icon: '✦' },
  { value: 'sunny', label: 'Sunny', icon: '☀️' },
  { value: 'luna', label: 'Luna', icon: '🌙' },
  { value: 'river', label: 'River', icon: '🌊' },
]

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'auto', label: 'System', icon: '💻' },
] as const

export default function Profile() {
  const profile = useProfile()
  const { setTheme } = useTheme()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<ProfileData | null>(profile)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!editing) setDraft(profile)
  }, [profile, editing])

  if (!profile || !draft) {
    return (
      <div className="profile-page">
        <h1>My Profile</h1>
        <p className="profile-muted">No profile yet — finish onboarding to set yours up.</p>
      </div>
    )
  }

  const patch = (p: Partial<ProfileData>) => setDraft({ ...draft, ...p })

  const toggleListItem = (key: 'interests' | 'hobbies' | 'likes' | 'dislikes', value: string) => {
    const list = draft[key]
    patch({
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    } as Partial<ProfileData>)
  }

  const addListItem = (key: 'interests' | 'hobbies' | 'likes' | 'dislikes', value: string) => {
    const v = value.trim()
    if (!v) return
    if (!draft[key].some((item) => item.toLowerCase() === v.toLowerCase())) {
      patch({ [key]: [...draft[key], v] } as Partial<ProfileData>)
    }
  }

  const save = () => {
    profileStorage.save(draft)
    setTheme(draft.theme === 'auto' ? 'system' : draft.theme)
    setEditing(false)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  const cancel = () => {
    setDraft(profile)
    setEditing(false)
  }

  return (
    <div className="profile-page">
      <header className="profile-head">
        <div>
          <h1>My Profile</h1>
          <p>Make Grace your own</p>
        </div>
        {editing ? (
          <div className="profile-head-actions">
            <button type="button" className="profile-cancel" onClick={cancel}>Cancel</button>
            <button type="button" className="profile-save" onClick={save} disabled={!draft.name.trim()}>Save changes</button>
          </div>
        ) : (
          <button type="button" className="profile-edit" onClick={() => setEditing(true)}>Edit profile</button>
        )}
      </header>

      {saved && <p className="profile-saved" role="status">Profile saved ✓</p>}

      <section className="profile-card profile-identity">
        <Avatar name={draft.name || 'Grace User'} size="xl" status="online" src={getUserAvatar(draft.characterPreference)} zoom={1.12} />
        <div>
          <h2>{draft.name || 'Grace User'}</h2>
          <p>{draft.ageRange || 'Age not set'} · Grace is {CHARACTERS.find((c) => c.value === draft.character)?.label ?? 'Grace'}</p>
        </div>
      </section>

      <section className="profile-card">
        <h3>Personal details</h3>
        <label className="profile-field">
          <span>Display name</span>
          <input
            value={draft.name}
            disabled={!editing}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="Your name"
          />
        </label>
        <div className="profile-field">
          <span>Age range</span>
          <ChipRow
            options={AGE_RANGES.map((r) => ({ value: r, label: r }))}
            selected={draft.ageRange ? [draft.ageRange] : []}
            enabled={editing}
            onToggle={(v) => patch({ ageRange: v })}
          />
        </div>
        <div className="profile-field">
          <span>Character preference</span>
          <ChipRow
            options={CHARACTER_PREFERENCES}
            selected={draft.characterPreference ? [draft.characterPreference] : []}
            enabled={editing}
            onToggle={(v) => patch({ characterPreference: v })}
          />
        </div>
      </section>

      <section className="profile-card">
        <h3>Interests</h3>
        <ChipRow
          options={draft.interests.map((i) => ({ value: i, label: i }))}
          selected={draft.interests}
          enabled={editing}
          onToggle={(v) => toggleListItem('interests', v)}
        />
        {editing && <AddChip onAdd={(v) => addListItem('interests', v)} placeholder="Add an interest" />}
      </section>

      <section className="profile-card">
        <h3>Hobbies</h3>
        <ChipRow
          options={draft.hobbies.map((h) => ({ value: h, label: getHobbyLabel(h) }))}
          selected={draft.hobbies}
          enabled={editing}
          onToggle={(v) => toggleListItem('hobbies', v)}
        />
        {editing && <AddChip onAdd={(v) => addListItem('hobbies', v)} placeholder="Add a hobby" />}
      </section>

      <section className="profile-card">
        <h3>Likes</h3>
        <ChipRow
          options={draft.likes.map((l) => ({ value: l, label: l }))}
          selected={draft.likes}
          enabled={editing}
          onToggle={(v) => toggleListItem('likes', v)}
        />
        {editing && <AddChip onAdd={(v) => addListItem('likes', v)} placeholder="Add a like" />}
      </section>

      <section className="profile-card">
        <h3>Dislikes</h3>
        <ChipRow
          options={draft.dislikes.map((d) => ({ value: d, label: d }))}
          selected={draft.dislikes}
          enabled={editing}
          onToggle={(v) => toggleListItem('dislikes', v)}
        />
        {editing && <AddChip onAdd={(v) => addListItem('dislikes', v)} placeholder="Add a dislike" />}
      </section>

      <section className="profile-card">
        <h3>Theme & Grace</h3>
        <div className="profile-field">
          <span>Theme</span>
          <ChipRow
            options={THEME_OPTIONS.map((t) => ({ value: t.value, label: `${t.icon} ${t.label}` }))}
            selected={[draft.theme]}
            enabled={editing}
            onToggle={(v) => patch({ theme: v as ProfileData['theme'] })}
          />
        </div>
        <div className="profile-field">
          <span>Your Grace character</span>
          <ChipRow
            options={CHARACTERS.map((c) => ({ value: c.value, label: `${c.icon} ${c.label}` }))}
            selected={[draft.character]}
            enabled={editing}
            onToggle={(v) => patch({ character: v })}
          />
        </div>
      </section>
    </div>
  )
}

function ChipRow({
  options,
  selected,
  enabled,
  onToggle,
}: {
  options: { value: string; label: string }[]
  selected: string[]
  enabled: boolean
  onToggle: (value: string) => void
}) {
  if (options.length === 0) {
    return <p className="profile-muted">None yet.</p>
  }
  return (
    <div className="profile-chips">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={!enabled}
          className={`profile-chip${selected.includes(option.value) ? ' is-selected' : ''}`}
          aria-pressed={selected.includes(option.value)}
          onClick={() => onToggle(option.value)}
        >
          {option.label}
          {enabled && selected.includes(option.value) ? ' ×' : ''}
        </button>
      ))}
    </div>
  )
}

function AddChip({ onAdd, placeholder }: { onAdd: (value: string) => void; placeholder: string }) {
  const [value, setValue] = useState('')
  return (
    <form
      className="profile-add"
      onSubmit={(e) => {
        e.preventDefault()
        onAdd(value)
        setValue('')
      }}
    >
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
      <button type="submit">Add</button>
    </form>
  )
}
