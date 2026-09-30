import { useNavigate } from 'react-router'
import { Button } from '../../components/ui'
import { useOnboarding } from '../../contexts/OnboardingContext'
import './Welcome.css'

export default function Welcome() {
  const navigate = useNavigate()
  const { dispatch } = useOnboarding()

  function handleStart() {
    dispatch({ type: 'RESET' })
    navigate('/onboarding/about-you')
  }

  return (
    <main className="onboarding-welcome">
      <div className="welcome-decoration welcome-decoration--teal" />
      <div className="welcome-decoration welcome-decoration--coral" />
      <div className="welcome-decoration welcome-decoration--lavender" />

      <div className="welcome-content">
        <div className="welcome-brand">
          <span className="welcome-brand-mark">✦</span>
          <span>grace.</span>
        </div>

        <div className="welcome-copy">
          <h1>
            Hey, I'm <span>Grace.</span>
          </h1>

          <p>I'd love to know a little about you.</p>
        </div>

        <div className="welcome-actions">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleStart}
          >
            Let's get started
          </Button>

          <p className="welcome-note">It only takes a few minutes.</p>
        </div>
      </div>
    </main>
  )
}
