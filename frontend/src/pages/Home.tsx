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
  { label: 'Productive', icon: '📈', tone: 'green' },
  { label: 'Tired', icon: '😴', tone: 'blue' },
] as const

const exploreItems = [
  { icon: '🎨', title: 'Hobbies', tone: 'peach', path: '/hobbies' },
  { icon: '📝', title: 'Notes', tone: 'lavender', path: '/notes' },
  { icon: '🎵', title: 'Music', tone: 'blue', path: '/music' },
  { icon: '✨', title: 'Create', tone: 'yellow', path: '/create' },
] as const

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
    { icon: '👟', value: health.today.steps.toLocaleString(), label: 'steps', tone: 'peach' },
    { icon: '🌙', value: formatSleep(health.today.sleepMinutes), label: 'sleep', tone: 'lavender' },
    { icon: '💧', value: `${health.today.waterGlasses}/${health.goals.waterGlasses}`, label: 'glasses', tone: 'blue' },
    { icon: '❤️', value: String(health.today.heartRate), label: 'bpm', tone: 'rose' },
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
        <div className="home-sunrise" aria-hidden="true">
          <span className="sunrise-sun" />
          <span className="sunrise-peach" />
          <span className="sunrise-pink" />
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
          <h2>📊 Your day</h2>
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
              {interests.map((interest) => (
                <Link key={interest} to={routeForTag(interest)} className="tag tag--lavender">
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
              {hobbies.map((hobby) => (
                <Link key={hobby} to={routeForTag(hobby)} className="tag tag--green">
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
