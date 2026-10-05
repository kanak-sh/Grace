import { useState } from 'react'
import { Link } from 'react-router'
import { useHobbies } from '../hooks/useHobbies'
import { useProfile } from '../hooks/useProfile'
import { exploreCategories, getHobbyMeta, getHobbyLabel } from '../services/hobbyData'
import hobbyBoy from '../assets/Hobby_boy.png'
import {
  BooksStackIcon,
  MatIcon,
  YarnNeedlesIcon,
  PaletteIcon,
  HeadphonesIcon,
  PlayVideoIcon,
  BooksTwoIcon,
  BookmarkIcon,
  RedSparkleIcon,
  TealLeafIcon,
  TealClockIcon,
  OpenBookIcon,
  AddCircleIcon,
} from './hobbiesIcons'
import './Hobbies.css'

const quickResources = [
  { icon: <PlayVideoIcon />, title: 'Tutorials', subtitle: 'Learn step by step', path: '/hobbies', tone: 'peach' },
  { icon: <BooksTwoIcon />, title: 'Free books', subtitle: 'By genre', path: '/hobbies', tone: 'lavender' },
  { icon: <PlayVideoIcon />, title: 'YouTube links', subtitle: 'Curated for you', path: '/hobbies', tone: 'yellow' },
  { icon: <BookmarkIcon />, title: 'Saved', subtitle: 'Your collection', path: '/hobbies', tone: 'mint' },
] as const

export default function Hobbies() {
  const {
    hobbies,
    canAddMore,
    addableHobbies,
    addHobby,
    removeHobby,
    continueItems,
    forYou,
  } = useHobbies()
  const profile = useProfile()
  const [addOpen, setAddOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const q = searchQuery.trim().toLowerCase()

  const visibleExplore = exploreCategories.filter((c) => !q || c.toLowerCase().includes(q))
  const visibleForYou = forYou.filter(
    (rec) => !q || rec.label.toLowerCase().includes(q) || rec.title.toLowerCase().includes(q),
  )
  const visibleResources = quickResources.filter(
    (r) => !q || r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q),
  )
  const visibleContinue = continueItems.filter(
    (item) => !q || item.label.toLowerCase().includes(q) || item.title.toLowerCase().includes(q),
  )

  const hasSearchResults =
    visibleExplore.length > 0 ||
    visibleForYou.length > 0 ||
    visibleResources.length > 0 ||
    visibleContinue.length > 0

  return (
    <div className="hobbies-page">
      {/* Header */}
      <header className="hobbies-head">
        <div>
          <h1>Hobbies</h1>
          <p>Explore, learn and enjoy the things you love 💗</p>
        </div>
        <button type="button" className="hobbies-search" aria-label="Search hobbies" onClick={() => setSearchOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {searchOpen && (
        <input
          type="search"
          className="hobbies-search-input"
          placeholder="Search hobbies, resources…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search hobbies"
          autoFocus
        />
      )}

      {searchOpen && q && !hasSearchResults && <p className="hobbies-no-results">No results found.</p>}

      {/* Your hobbies */}
      <section className="hobbies-your">
        <div className="hobbies-your-text">
          <h2><RedSparkleIcon /> Your hobbies</h2>
          <p>
            Here are the hobbies you're exploring. You can add, remove or
            change them anytime.
          </p>
          <div className="hobbies-chips">
            {hobbies.map((hobby, i) => {
              const meta = getHobbyMeta(hobby, i)
              return (
                <span key={hobby} className={`hobby-chip hobby-chip--${meta.tone}`}>
                  {hobby.toLowerCase() === 'reading' ? (
                    <OpenBookIcon />
                  ) : hobby.toLowerCase() === 'crochet' ? (
                    <YarnNeedlesIcon />
                  ) : (
                    <span aria-hidden="true">{meta.icon}</span>
                  )}{' '}
                  {getHobbyLabel(hobby)}
                  <button
                    type="button"
                    className="hobby-chip-remove"
                    aria-label={`Remove ${getHobbyLabel(hobby)}`}
                    onClick={() => removeHobby(hobby)}
                  >
                    ×
                  </button>
                </span>
              )
            })}
            {canAddMore && (
              <button type="button" className="hobby-add" onClick={() => setAddOpen((o) => !o)}>
                <AddCircleIcon /> Add hobby
              </button>
            )}
          </div>

          {addOpen && canAddMore && (
            <div className="hobby-add-picker">
              {addableHobbies.map((entry) => (
                <button
                  key={entry.value}
                  type="button"
                  className="hobby-add-option"
                  onClick={() => {
                    addHobby(entry.value)
                    setAddOpen(false)
                  }}
                >
                  <span aria-hidden="true">{entry.icon}</span> {entry.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="hobbies-your-art" aria-hidden="true">
          {profile?.characterPreference === 'male' ? (
            <img className="hobbies-avatar" src={hobbyBoy} alt="" />
          ) : (
            <span className="hobbies-mascot">🧘</span>
          )}
        </div>
      </section>

      {/* Explore */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2><TealLeafIcon /> Explore hobbies</h2>
          <span className="hobbies-more">See all ›</span>
        </header>
        <div className="explore-rail">
          {visibleExplore.map((category) => {
            const meta = getHobbyMeta(category, exploreCategories.indexOf(category))
            return (
              <Link
                key={category}
                to="/hobbies"
                className={`explore-card explore-card--${meta.tone}`}
              >
                <span className="explore-card-icon" aria-hidden="true">
                  {category === 'Reading' ? (
                    <BooksStackIcon />
                  ) : category === 'Yoga' ? (
                    <MatIcon />
                  ) : category === 'Crochet' ? (
                    <YarnNeedlesIcon />
                  ) : category === 'Art' ? (
                    <PaletteIcon />
                  ) : category === 'Music' ? (
                    <HeadphonesIcon />
                  ) : (
                    meta.icon
                  )}
                </span>
                <span className="explore-card-name">
                  {category} <span aria-hidden="true">›</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* For you */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2>❤️ For you today</h2>
          <span className="hobbies-more">View more ›</span>
        </header>
        <div className="recommend-grid">
          {visibleForYou.map((rec) => (
            <article key={`${rec.hobby}-${rec.title}`} className={`recommend-card recommend-card--${rec.tone}`}>
              <div>
                <p className="recommend-kicker">{rec.label.toUpperCase()}</p>
                <h3>{rec.title}</h3>
                <p className="recommend-meta">{rec.meta}</p>
                <p className="recommend-reason">{rec.reason}</p>
                <Link to="/hobbies" className="recommend-cta">
                  {rec.label.toLowerCase().includes('crochet') ? 'Explore now' : 'View details'} ›
                </Link>
              </div>
              <span className="recommend-art" aria-hidden="true">{rec.icon}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Quick resources */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2>💡 Quick resources</h2>
          <span className="hobbies-more">See all ›</span>
        </header>
        <div className="resource-grid">
          {visibleResources.map((resource) => (
            <Link
              key={resource.title}
              to={resource.path}
              className={`resource-card resource-card--${resource.tone}`}
            >
              <span className="resource-icon" aria-hidden="true">{resource.icon}</span>
              <span className="resource-title">{resource.title}</span>
              <span className="resource-sub">{resource.subtitle}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Continue */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2><TealClockIcon /> Continue where you left off</h2>
          <span className="hobbies-more">See all ›</span>
        </header>
        <div className="continue-rail">
          {visibleContinue.map((item) => (
            <article key={item.hobby} className="continue-card">
              <span className={`continue-thumb continue-thumb--${item.tone}`} aria-hidden="true">
                {item.icon}
                <span className="continue-play">▶</span>
              </span>
              <div className="continue-body">
                <p className={`continue-hobby continue-hobby--${item.tone}`}>{item.label}</p>
                <h3>{item.title}</h3>
                <p className="continue-meta">{item.meta}</p>
                <div className="continue-progress">
                  <span style={{ width: `${item.progress}%` }} />
                </div>
                <p className="continue-percent">{item.progress}%</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
