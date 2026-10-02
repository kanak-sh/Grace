import { useHealth } from '../hooks/useHealth'
import { formatSleep, stepProgress } from '../services/healthData'
import './Health.css'

export default function Health() {
  const { today, goals, history } = useHealth()

  const cards = [
    { icon: '👟', label: 'Steps', value: today.steps.toLocaleString(), sub: `Goal ${goals.steps.toLocaleString()} · ${stepProgress(today.steps, goals.steps)}%`, tone: 'peach' },
    { icon: '🌙', label: 'Sleep', value: formatSleep(today.sleepMinutes), sub: `Goal ${formatSleep(goals.sleepMinutes)}`, tone: 'lavender' },
    { icon: '💧', label: 'Water', value: `${today.waterGlasses} / ${goals.waterGlasses}`, sub: 'glasses today', tone: 'blue' },
    { icon: '❤️', label: 'Heart rate', value: `${today.heartRate} bpm`, sub: 'Resting', tone: 'rose' },
  ]

  const sections = [
    {
      title: 'Steps',
      icon: '👟',
      value: today.steps.toLocaleString(),
      detail: `${stepProgress(today.steps, goals.steps)}% of your ${goals.steps.toLocaleString()} goal`,
      progress: stepProgress(today.steps, goals.steps),
    },
    {
      title: 'Sleep',
      icon: '🌙',
      value: formatSleep(today.sleepMinutes),
      detail: `Goal ${formatSleep(goals.sleepMinutes)}`,
      progress: stepProgress(today.sleepMinutes, goals.sleepMinutes),
    },
    {
      title: 'Water',
      icon: '💧',
      value: `${today.waterGlasses} / ${goals.waterGlasses}`,
      detail: `${goals.waterGlasses - today.waterGlasses} glasses to go`,
      progress: stepProgress(today.waterGlasses, goals.waterGlasses),
    },
    {
      title: 'Heart rate',
      icon: '❤️',
      value: `${today.heartRate} bpm`,
      detail: 'Resting heart rate, looking steady',
      progress: 100,
    },
  ]

  return (
    <div className="health-page">
      <header className="health-head">
        <h1>Health</h1>
        <p>Your health and daily activity — {today.date}</p>
      </header>

      <section>
        <h2 className="health-section-title">Today's overview</h2>
        <div className="health-stats">
          {cards.map((card) => (
            <div key={card.label} className={`health-stat health-tone--${card.tone}`}>
              <span className="health-stat-icon" aria-hidden="true">{card.icon}</span>
              <p className="health-stat-value">{card.value}</p>
              <p className="health-stat-label">{card.label}</p>
              <p className="health-stat-sub">{card.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="health-section-title">Details</h2>
        <div className="health-details">
          {sections.map((s) => (
            <div key={s.title} className="health-detail-card">
              <div className="health-detail-head">
                <span className="health-detail-icon" aria-hidden="true">{s.icon}</span>
                <h3>{s.title}</h3>
                <span className="health-detail-value">{s.value}</span>
              </div>
              <p className="health-detail-meta">{s.detail}</p>
              <div className="health-progress">
                <span style={{ width: `${s.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="health-section-title">History</h2>
        <div className="health-history">
          {history.map((day) => (
            <div key={day.date} className="health-history-row">
              <span className="health-history-date">{day.date}</span>
              <span>👟 {day.steps.toLocaleString()}</span>
              <span>🌙 {formatSleep(day.sleepMinutes)}</span>
              <span>💧 {day.waterGlasses}/{goals.waterGlasses}</span>
              <span>❤️ {day.heartRate}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
