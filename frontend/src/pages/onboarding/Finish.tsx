import { useNavigate } from 'react-router'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import { Button } from '../../components/ui'
import { useOnboarding } from '../../contexts/OnboardingContext'
import './OnboardingSteps.css'
import './Finish.css'

export default function Finish() {
  const navigate = useNavigate()
  const { data, dispatch } = useOnboarding()

  function handleFinish() {
    dispatch({ type: 'COMPLETE' })
    navigate('/')
  }

  const characterLabel =
    data.character === 'sunny' ? 'Sunny' :
    data.character === 'luna' ? 'Luna' :
    data.character === 'river' ? 'River' : 'Grace'

  return (
    <OnboardingLayout step={6} showBack={false}>
      <div className="onboarding-step onboarding-finish">
        <div className="onboarding-finish-icon" aria-hidden="true">
          ✦
        </div>

        <h2 className="onboarding-heading">
          You're all set{data.name ? `, ${data.name}` : ''}!
        </h2>

        <p className="onboarding-subtext">
          I'm {characterLabel}, and I'm ready to get to know you better.
          Let's start your journey together.
        </p>

        <div className="onboarding-summary">
          {data.interests.length > 0 && (
            <div className="onboarding-summary-item">
              <span className="onboarding-summary-label">Interests</span>
              <span className="onboarding-summary-value">
                {data.interests.slice(0, 4).join(', ')}
                {data.interests.length > 4 && ` +${data.interests.length - 4}`}
              </span>
            </div>
          )}
          {data.hobbies.length > 0 && (
            <div className="onboarding-summary-item">
              <span className="onboarding-summary-label">Hobbies</span>
              <span className="onboarding-summary-value">
                {data.hobbies.slice(0, 4).join(', ')}
                {data.hobbies.length > 4 && ` +${data.hobbies.length - 4}`}
              </span>
            </div>
          )}
          {data.likes.length > 0 && (
            <div className="onboarding-summary-item">
              <span className="onboarding-summary-label">Likes</span>
              <span className="onboarding-summary-value">
                {data.likes.slice(0, 3).join(', ')}
                {data.likes.length > 3 && ` +${data.likes.length - 3}`}
              </span>
            </div>
          )}
        </div>

        <div className="onboarding-actions">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleFinish}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
