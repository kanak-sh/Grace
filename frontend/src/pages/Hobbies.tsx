import { useState } from 'react'
import { Link } from 'react-router'
import { useHobbies } from '../hooks/useHobbies'
import { exploreCategories, getHobbyMeta, getHobbyLabel } from '../services/hobbyData'
import './Hobbies.css'

const quickResources = [
  { icon: '🎓', title: 'Tutorials', subtitle: 'Learn step-by-step', path: '/hobbies', tone: 'peach' },
  { icon: '📚', title: 'Free books', subtitle: 'By genre', path: '/notes', tone: 'yellow' },
  { icon: '▶️', title: 'YouTube', subtitle: 'Curated for you', path: '/music', tone: 'blue' },
  { icon: '🔖', title: 'Saved', subtitle: 'Your collection', path: '/notes', tone: 'lavender' },
] as const

export default function Hobbies() {
  const {
    hobbies,
    maxHobbies,
    canAddMore,
    addableHobbies,
    addHobby,
    removeHobby,
    content,
    continueItems,
    forYou,
    savedIds,
    advanceProgress,
    toggleSaved,
  } = useHobbies()
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div className="hobbies-page">
      {/* Header */}
      <header className="hobbies-head">
        <div>
          <h1>Hobbies</h1>
          <p>Explore, learn and enjoy the things you love ❤️</p>
        </div>
        <button type="button" className="hobbies-search" aria-label="Search hobbies">
          🔍
        </button>
      </header>

      {/* Your hobbies */}
      <section className="hobbies-your">
        <div className="hobbies-your-text">
          <h2>✦ Your hobbies</h2>
          <p>
            Here are the hobbies you're exploring. You can add, remove or
            change them anytime (up to {maxHobbies}).
          </p>
          <div className="hobbies-chips">
            {hobbies.map((hobby, i) => {
              const meta = getHobbyMeta(hobby, i)
              return (
                <span key={hobby} className={`hobby-chip hobby-chip--${meta.tone}`}>
                  <span aria-hidden="true">{meta.icon}</span> {getHobbyLabel(hobby)}
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
                + Add
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
          <span className="hobbies-mascot">🧘</span>
        </div>
      </section>

      {/* Hobby spaces */}
      {content.map((hobby) => {
        const saved = savedIds[hobby.value] ?? []
        const cont = continueItems.find((c) => c.hobby.toLowerCase() === hobby.value)
        return (
          <section key={hobby.value} className="hobbies-section">
            <header className="hobbies-section-head">
              <h2>
                {hobby.icon} {hobby.label}
              </h2>
              <span className="hobbies-tagline">{hobby.tagline}</span>
            </header>

            <article className={`hobby-space hobby-space--${hobby.tone}`}>
              <div className="hobby-space-progress">
                <p className="hobby-space-continue-title">{cont?.title}</p>
                <p className="hobby-space-continue-meta">{cont?.meta}</p>
                <div className="continue-progress">
                  <span style={{ width: `${cont?.progress ?? 0}%` }} />
                </div>
                <div className="hobby-space-actions">
                  <span className="continue-percent">{cont?.progress ?? 0}%</span>
                  <button
                    type="button"
                    className="recommend-cta"
                    onClick={() => advanceProgress(hobby.value)}
                  >
                    Continue →
                  </button>
                </div>
              </div>

              <div className="hobby-space-sections">
                {hobby.sections.map((section) => (
                  <div key={section.title} className="hobby-section">
                    <h4>{section.title}</h4>
                    <ul>
                      {section.items.map((item) => {
                        const isSaved = saved.includes(item.id)
                        return (
                          <li key={item.id}>
                            <div>
                              <p className="hobby-item-title">{item.title}</p>
                              {item.subtitle && <p className="hobby-item-sub">{item.subtitle}</p>}
                            </div>
                            <button
                              type="button"
                              className={`hobby-save ${isSaved ? 'hobby-save--on' : ''}`}
                              aria-pressed={isSaved}
                              aria-label={`${isSaved ? 'Unsave' : 'Save'} ${item.title}`}
                              onClick={() => toggleSaved(hobby.value, item.id)}
                            >
                              {isSaved ? '🔖' : '🏷️'}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </section>
        )
      })}

      {/* For you */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2>❤️ For you today</h2>
        </header>
        <div className="recommend-grid">
          {forYou.map((rec) => (
            <article key={`${rec.hobby}-${rec.title}`} className={`recommend-card recommend-card--${rec.tone}`}>
              <div>
                <p className="recommend-kicker">{rec.label.toUpperCase()}</p>
                <h3>{rec.title}</h3>
                <p className="recommend-meta">{rec.meta}</p>
                <p className="recommend-reason">{rec.reason}</p>
              </div>
              <span className="recommend-art" aria-hidden="true">{rec.icon}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Explore */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2>🌿 Explore hobbies</h2>
        </header>
        <div className="explore-rail">
          {exploreCategories.map((category, i) => {
            const meta = getHobbyMeta(category, i)
            return (
              <Link
                key={category}
                to="/hobbies"
                className={`explore-card explore-card--${meta.tone}`}
              >
                <span className="explore-card-icon" aria-hidden="true">{meta.icon}</span>
                <span className="explore-card-name">
                  {category} <span aria-hidden="true">›</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Quick resources */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2>💡 Quick resources</h2>
        </header>
        <div className="resource-grid">
          {quickResources.map((resource) => (
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
          <h2>◷ Continue where you left off</h2>
        </header>
        <div className="continue-rail">
          {continueItems.map((item) => (
            <article key={item.hobby} className="continue-card">
              <span className={`continue-thumb continue-thumb--${item.tone}`} aria-hidden="true">
                {item.icon}
              </span>
              <p className="continue-hobby">{item.label}</p>
              <h3>{item.title}</h3>
              <p className="continue-meta">{item.meta}</p>
              <div className="continue-progress">
                <span style={{ width: `${item.progress}%` }} />
              </div>
              <div className="hobby-space-actions">
                <p className="continue-percent">{item.progress}%</p>
                <button
                  type="button"
                  className="recommend-cta"
                  onClick={() => advanceProgress(item.hobby)}
                >
                  Continue
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
