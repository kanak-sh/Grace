import { useNavigate } from 'react-router'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import { Button } from '../../components/ui'
import { useOnboarding } from '../../contexts/OnboardingContext'
import './OnboardingSteps.css'
import './Hobbies.css'

const HOBBIES = [
  { value: 'reading', label: 'Reading', icon: '📖' },
  { value: 'painting', label: 'Painting', icon: '🎨' },
  { value: 'cooking', label: 'Cooking', icon: '🍳' },
  { value: 'gardening', label: 'Gardening', icon: '🌱' },
  { value: 'photography', label: 'Photography', icon: '📷' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'dancing', label: 'Dancing', icon: '💃' },
  { value: 'hiking', label: 'Hiking', icon: '🥾' },
  { value: 'yoga', label: 'Yoga', icon: '🧘' },
  { value: 'instruments', label: 'Instruments', icon: '🎸' },
  { value: 'crafting', label: 'Crafting', icon: '🧶' },
  { value: 'gaming', label: 'Gaming', icon: '🎮' },
]

const MIN_HOBBIES = 1
const MAX_HOBBIES = 4

export default function Hobbies() {
  const navigate = useNavigate()
  const { data, dispatch } = useOnboarding()

  function handleToggle(value: string) {
    if (data.hobbies.includes(value)) {
      dispatch({ type: 'TOGGLE_HOBBY', payload: value })
    } else if (data.hobbies.length < MAX_HOBBIES) {
      dispatch({ type: 'TOGGLE_HOBBY', payload: value })
    }
  }

  const canContinue = data.hobbies.length >= MIN_HOBBIES

  function handleContinue() {
    if (!canContinue) return
    navigate('/onboarding/likes-dislikes')
  }

  return (
    <OnboardingLayout step={3}>
      <div className="onboarding-step">
        <span className="onboarding-eyebrow">Hobbies</span>

        <h2 className="onboarding-heading">
          What do you like doing in your free time?
        </h2>

        <p className="onboarding-subtext">
          Choose at least {MIN_HOBBIES} and up to {MAX_HOBBIES}.
        </p>

        <div className="onboarding-chip-group onboarding-chip-group--large">
          {HOBBIES.map((hobby) => {
            const isSelected = data.hobbies.includes(hobby.value)
            const isDisabled = !isSelected && data.hobbies.length >= MAX_HOBBIES

            return (
              <button
                key={hobby.value}
                type="button"
                className={[
                  'onboarding-chip onboarding-chip--interactive',
                  isSelected ? 'onboarding-chip--selected' : '',
                  isDisabled ? 'onboarding-chip--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleToggle(hobby.value)}
                disabled={isDisabled}
                aria-pressed={isSelected}
              >
                <span className="onboarding-chip-icon" aria-hidden="true">
                  {hobby.icon}
                </span>
                {hobby.label}
              </button>
            )
          })}
        </div>

        <p className="onboarding-hint">
          {data.hobbies.length === 0
            ? `Select at least ${MIN_HOBBIES} to continue`
            : `${data.hobbies.length} of ${MAX_HOBBIES} selected`}
        </p>

        <div className="onboarding-actions">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
