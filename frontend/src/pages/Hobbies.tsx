import { Link } from 'react-router'
import { useProfile } from '../hooks/useProfile'
import {
  getHobbyMeta,
  getRecommendation,
  getContinueItems,
  exploreCategories,
} from '../services/hobbyData'
import './Hobbies.css'

const quickResources = [
  { icon: '🎓', title: 'Tutorials', subtitle: 'Learn step-by-step', path: '/hobbies', tone: 'peach' },
  { icon: '📚', title: 'Free books', subtitle: 'By genre', path: '/notes', tone: 'yellow' },
  { icon: '▶️', title: 'YouTube', subtitle: 'Curated for you', path: '/music', tone: 'blue' },
  { icon: '🔖', title: 'Saved', subtitle: 'Your collection', path: '/notes', tone: 'lavender' },
] as const

export default function Hobbies() {
  const profile = useProfile()
  const hobbies = profile?.hobbies?.length
    ? profile.hobbies
    : ['Reading', 'Yoga', 'Crochet']

  const recommendations = hobbies.slice(0, 2).map((hobby) => ({
    hobby,
    ...getRecommendation(hobby),
  }))
  const continueItems = getContinueItems(hobbies)

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
            change them anytime.
          </p>
          <div className="hobbies-chips">
            {hobbies.map((hobby, i) => {
              const meta = getHobbyMeta(hobby, i)
              return (
                <span key={hobby} className={`hobby-chip hobby-chip--${meta.tone}`}>
                  <span aria-hidden="true">{meta.icon}</span> {hobby}
                </span>
              )
            })}
            <button type="button" className="hobby-add">+ Add hobby</button>
          </div>
        </div>
        <div className="hobbies-your-art" aria-hidden="true">
          <span className="hobbies-mascot">🧘</span>
        </div>
      </section>

      {/* Explore */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2>🌿 Explore hobbies</h2>
          <button type="button" className="hobbies-more">See all ›</button>
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

      {/* For you today */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2>❤️ For you today</h2>
          <button type="button" className="hobbies-more">View more ›</button>
        </header>
        <div className="recommend-grid">
          {recommendations.map((rec) => {
            const meta = getHobbyMeta(rec.hobby)
            return (
              <article key={rec.hobby} className={`recommend-card recommend-card--${meta.tone}`}>
                <div>
                  <p className="recommend-kicker">{rec.kicker}</p>
                  <h3>{rec.title}</h3>
                  <p className="recommend-highlight">{rec.highlight}</p>
                  <p className="recommend-meta">{rec.meta}</p>
                  <button type="button" className="recommend-cta">
                    {rec.cta} →
                  </button>
                </div>
                <span className="recommend-art" aria-hidden="true">{meta.icon}</span>
              </article>
            )
          })}
        </div>
      </section>

      {/* Quick resources */}
      <section className="hobbies-section">
        <header className="hobbies-section-head">
          <h2>💡 Quick resources</h2>
          <button type="button" className="hobbies-more">See all ›</button>
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
          <button type="button" className="hobbies-more">See all ›</button>
        </header>
        <div className="continue-rail">
          {continueItems.map((item) => (
            <article key={item.hobby} className="continue-card">
              <span className={`continue-thumb continue-thumb--${item.tone}`} aria-hidden="true">
                {item.icon}
              </span>
              <p className="continue-hobby">{item.hobby}</p>
              <h3>{item.title}</h3>
              <p className="continue-meta">{item.meta}</p>
              <div className="continue-progress">
                <span style={{ width: `${item.progress}%` }} />
              </div>
              <p className="continue-percent">{item.progress}%</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
