import { useNavigate } from 'react-router'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import { Button } from '../../components/ui'
import { useOnboarding } from '../../contexts/OnboardingContext'
import './OnboardingSteps.css'
import './Interests.css'

const INTERESTS = [
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'art', label: 'Art', icon: '🎨' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'food', label: 'Food & Cooking', icon: '🍳' },
  { value: 'books', label: 'Books', icon: '📚' },
  { value: 'movies', label: 'Movies & TV', icon: '🎬' },
  { value: 'gaming', label: 'Gaming', icon: '🎮' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'fashion', label: 'Fashion', icon: '👗' },
  { value: 'science', label: 'Science', icon: '🔬' },
  { value: 'photography', label: 'Photography', icon: '📷' },
  { value: 'fitness', label: 'Fitness', icon: '💪' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'crafts', label: 'Crafts', icon: '🧶' },
]

export default function Interests() {
  const navigate = useNavigate()
  const { data, dispatch } = useOnboarding()

  function handleToggle(value: string) {
    dispatch({ type: 'TOGGLE_INTEREST', payload: value })
  }

  function handleContinue() {
    navigate('/onboarding/hobbies')
  }

  return (
    <OnboardingLayout step={2}>
      <div className="onboarding-step">
        <span className="onboarding-eyebrow">Interests</span>

        <h2 className="onboarding-heading">What do you enjoy?</h2>

        <p className="onboarding-subtext">
          Pick anything that feels like you.
        </p>

        <div className="onboarding-chip-group onboarding-chip-group--large">
          {INTERESTS.map((interest) => (
            <button
              key={interest.value}
              type="button"
              className={[
                'onboarding-chip onboarding-chip--interactive',
                data.interests.includes(interest.value)
                  ? 'onboarding-chip--selected'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleToggle(interest.value)}
              aria-pressed={data.interests.includes(interest.value)}
            >
              <span className="onboarding-chip-icon" aria-hidden="true">
                {interest.icon}
              </span>
              {interest.label}
            </button>
          ))}
        </div>

        <div className="onboarding-actions">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
