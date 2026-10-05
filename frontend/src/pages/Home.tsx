import { Link } from 'react-router'
import Avatar from '../components/ui/Avatar'
import { useProfile } from '../hooks/useProfile'
import { useMood } from '../hooks/useMood'
import { getUserAvatar, getCompanionImage } from '../services/avatarImages'
import { saveMood } from '../services/moodStorage'
import { useHealth } from '../hooks/useHealth'
import { formatSleep } from '../services/healthData'
import './Home.css'

const moods = [
  { label: 'Happy', icon: '😊', tone: 'peach' },
  { label: 'Calm', icon: '😌', tone: 'lavender' },
  { label: 'Energetic', icon: '⚡', tone: 'yellow' },
  { label: 'Productive', icon: '🌱', tone: 'green' },
  { label: 'Tired', icon: '😪', tone: 'blue' },
] as const

const exploreItems = [
  { icon: <PaletteIcon />, title: 'Hobbies', tone: 'peach', path: '/hobbies' },
  { icon: <NotebookIcon />, title: 'Notes', tone: 'lavender', path: '/notes' },
  { icon: <MusicIcon />, title: 'Music', tone: 'yellow', path: '/music' },
  { icon: <BulbIcon />, title: 'Create', tone: 'green', path: '/create' },
] as const

const TAG_TONES = ['tag--peach', 'tag--lavender', 'tag--mint', 'tag--yellow'] as const

const tagRoutes: Record<string, string> = {
  music: '/music',
  notes: '/notes',
  create: '/create',
  art: '/create',
  crochet: '/create',
  reading: '/notes',
  yoga: '/hobbies',
  travel: '/hobbies',
  technology: '/hobbies',
  hobbies: '/hobbies',
}

function routeForTag(tag: string): string {
  return tagRoutes[tag.toLowerCase()] ?? '/hobbies'
}

function SneakerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="#2e9e8f" d="M2.5 16.5c0-1.2.8-1.8 1.9-2.4l3.4-2 1.9-3.1 2.1 2.4 4.2 2.1c2 .9 5 1.9 5 3.9v1.1H2.5v-1.5z" />
      <path fill="#fff" d="M9.8 9.4l1-1.4 2 1.9-1-1.5 2-1 1.6 2.6-1.4 1.2z" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="#8a6fc9" d="M20 13.2A8.2 8.2 0 1 1 10.8 4 6.6 6.6 0 0 0 20 13.2z" />
    </svg>
  )
}

function DropIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="#4aa3e0" d="M12 2.8s6.2 6.7 6.2 11.2a6.2 6.2 0 1 1-12.4 0C5.8 9.5 12 2.8 12 2.8z" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="#e05a5a" d="M12 20.7S3.5 15.6 3.5 9.6A4.6 4.6 0 0 1 12 7.2a4.6 4.6 0 0 1 8.5 2.4c0 6-8.5 11.1-8.5 11.1z" />
    </svg>
  )
}

function PaletteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
      <path fill="#d76a8a" d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 1.6-2-.5-1.3.4-2.2 1.8-2.2H17a4.2 4.2 0 0 0 4.2-4.2C21.2 7.1 17.3 3 12 3z" />
      <circle cx="7.5" cy="10.5" r="1.3" fill="#fde4e1" />
      <circle cx="12" cy="7.5" r="1.3" fill="#faf0d9" />
      <circle cx="16.5" cy="10.5" r="1.3" fill="#dceaf5" />
    </svg>
  )
}

function NotebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2.5" fill="#7b5fd0" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
      <path fill="#e8923c" d="M9 17.5V6l10-2.2V15h-2V6.6l-6 1.4v9.5a3 3 0 1 1-2-2.8V17.5z" />
      <circle cx="7" cy="17.5" r="2.6" fill="#e8923c" />
      <circle cx="17" cy="15" r="2.6" fill="#e8923c" />
    </svg>
  )
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
      <path fill="#2e9e8f" d="M12 3a6 6 0 0 1 3.6 10.8c-.8.7-1.1 1.3-1.1 2.2h-5c0-.9-.3-1.5-1.1-2.2A6 6 0 0 1 12 3z" />
      <rect x="9.2" y="17.5" width="5.6" height="1.8" rx="0.9" fill="#2e9e8f" />
      <rect x="10.2" y="20" width="3.6" height="1.6" rx="0.8" fill="#2e9e8f" />
    </svg>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const selectedMood = useMood()
  const profile = useProfile()
  const health = useHealth()

  const displayName = profile?.name || 'Kanak'
  const interests = profile?.interests?.length
    ? profile.interests
    : ['Music', 'Art', 'Travel', 'Technology']
  const hobbies = profile?.hobbies?.length
    ? profile.hobbies
    : ['Reading', 'Yoga', 'Crochet']

  const dayStats = [
    { icon: <SneakerIcon />, value: health.today.steps.toLocaleString(), label: 'steps', tone: 'green' },
    { icon: <MoonIcon />, value: formatSleep(health.today.sleepMinutes), label: 'sleep', tone: 'lavender' },
    { icon: <DropIcon />, value: `${health.today.waterGlasses}/${health.goals.waterGlasses}`, label: 'glasses', tone: 'blue' },
    { icon: <HeartIcon />, value: String(health.today.heartRate), label: 'bpm', tone: 'rose' },
  ] as const

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="home-page">
      {/* Greeting */}
      <section className="home-greeting">
        <div className="home-greeting-avatar">
          <Avatar name={displayName} size="2xl" status="online" src={getUserAvatar(profile?.characterPreference)} alt={`${displayName} avatar`} zoom={1.12} />
        </div>
        <div className="home-greeting-text">
          <p className="home-greeting-date">{today}</p>
          <h1 className="home-greeting-name">
            Hey, {displayName} <span className="home-greeting-sparkle">✦</span>
          </h1>
          <p className="home-greeting-time">{getGreeting()}</p>
        </div>
      </section>

      {/* Grace AI insight */}
      <section className="ai-card">
        <div className="ai-card-body">
          <div className="ai-card-head">
            <span className="ai-card-sparkle" aria-hidden="true">✦</span>
            <div>
              <p className="ai-card-title">Grace AI</p>
              <p className="ai-card-subtitle">Your daily insight</p>
            </div>
          </div>
          <p className="ai-card-message">
            You've been exploring ideas and creativity lately. It's a great day
            to keep that momentum going! ✨
          </p>
          <Link to="/companion" className="ai-card-cta">
            Chat with Grace <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="ai-card-art" aria-hidden="true">
          <span className="ai-mascot-clip">
            <img className="ai-mascot" src={getCompanionImage(profile?.characterPreference)} alt="" />
          </span>
        </div>
      </section>

      {/* Feeling */}
      <section className="home-card">
        <header className="home-card-head">
          <h2>❤️ How are you feeling?</h2>
          <button type="button" className="home-card-more">
            Today ›
          </button>
        </header>
        <div className="mood-grid">
          {moods.map((mood) => (
            <button
              key={mood.label}
              type="button"
              className={`mood-tile mood-tile--${mood.tone} ${
                selectedMood === mood.label ? 'is-selected' : ''
              }`}
              aria-pressed={selectedMood === mood.label}
              onClick={() =>
                saveMood(selectedMood === mood.label ? null : mood.label)
              }
            >
              <span className="mood-tile-icon" aria-hidden="true">
                {mood.icon}
              </span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Your day */}
      <section className="home-card">
        <header className="home-card-head">
          <h2><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style={{ verticalAlign: '-4px', marginRight: 8 }}><rect x="4" y="12" width="4" height="8" rx="1.5" fill="#36a89b" /><rect x="10" y="7" width="4" height="13" rx="1.5" fill="#36a89b" /><rect x="16" y="3" width="4" height="17" rx="1.5" fill="#36a89b" /></svg>Your day</h2>
          <Link to="/health" className="ontrack-pill">🟢 On track ›</Link>
        </header>
        <div className="day-grid">
          {dayStats.map((stat) => (
            <Link
              to="/health"
              key={stat.label}
              className={`day-tile day-tile--${stat.tone}`}
            >
              <span className="day-tile-icon" aria-hidden="true">
                {stat.icon}
              </span>
              <p className="day-tile-value">{stat.value}</p>
              <p className="day-tile-label">{stat.label}</p>
              <span className="day-tile-chart" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {/* Quick explore */}
      <section className="home-section">
        <header className="section-head">
          <h2>✦ Quick explore</h2>
          <button type="button" className="home-card-more">
            See all ›
          </button>
        </header>
        <div className="explore-grid">
          {exploreItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={`explore-card explore-card--${item.tone}`}
            >
              <span className="explore-card-blob" aria-hidden="true" />
              <span className="explore-card-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="explore-card-title">
                {item.title} <span aria-hidden="true">›</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Personalization */}
      <section className="home-section">
        <header className="section-head">
          <h2>👤 Based on what you told me…</h2>
        </header>
        <div className="personal-grid">
          <div className="home-card">
            <div className="personal-head">
              <span>❤️ Your interests</span>
              <Link to="/companion" className="home-card-more">›</Link>
            </div>
            <div className="tag-row">
              {interests.map((interest, index) => (
                <Link
                  key={interest}
                  to={routeForTag(interest)}
                  className={`tag ${TAG_TONES[index % TAG_TONES.length]}`}
                >
                  {interest}
                </Link>
              ))}
            </div>
          </div>
          <div className="home-card">
            <div className="personal-head">
              <span>🌱 Your hobbies</span>
              <Link to="/hobbies" className="home-card-more">›</Link>
            </div>
            <div className="tag-row">
              {hobbies.map((hobby, index) => (
                <Link
                  key={hobby}
                  to={routeForTag(hobby)}
                  className={`tag ${TAG_TONES[index % TAG_TONES.length]}`}
                >
                  {hobby}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
