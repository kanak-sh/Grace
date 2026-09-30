import { useNavigate } from 'react-router'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import { Button } from '../../components/ui'
import { useOnboarding } from '../../contexts/OnboardingContext'
import './OnboardingSteps.css'
import './Preferences.css'

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'auto', label: 'Auto', icon: '🔄' },
] as const

export default function Preferences() {
  const navigate = useNavigate()
  const { data, dispatch } = useOnboarding()

  function handleContinue() {
    navigate('/onboarding/personalization')
  }

  return (
    <OnboardingLayout step={5}>
      <div className="onboarding-step">
        <span className="onboarding-eyebrow">Preferences</span>

        <h2 className="onboarding-heading">How do you like things?</h2>

        <p className="onboarding-subtext">
          Set the vibe — you can always change this later.
        </p>

        <div className="onboarding-field">
          <span className="onboarding-field-label">Theme</span>
          <div className="onboarding-card-group">
            {THEME_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={[
                  'onboarding-card-option',
                  data.theme === option.value
                    ? 'onboarding-card-option--selected'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => dispatch({ type: 'SET_THEME', payload: option.value })}
                aria-pressed={data.theme === option.value}
              >
                <span className="onboarding-card-icon" aria-hidden="true">
                  {option.icon}
                </span>
                <span className="onboarding-card-label">{option.label}</span>
              </button>
            ))}
          </div>
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
