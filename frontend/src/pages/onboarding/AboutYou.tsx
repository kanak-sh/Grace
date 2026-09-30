import { useNavigate } from 'react-router'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import { Button, Input } from '../../components/ui'
import { useOnboarding } from '../../contexts/OnboardingContext'
import './OnboardingSteps.css'

const AGE_RANGES = [
  'Under 18',
  '18–24',
  '25–34',
  '35–44',
  '45–54',
  '55+',
  'Prefer not to say',
]

const CHARACTER_PREFERENCES = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'no-preference', label: 'No preference' },
]

export default function AboutYou() {
  const navigate = useNavigate()
  const { data, dispatch } = useOnboarding()

  const canContinue = data.name.trim().length > 0

  function handleContinue() {
    if (!canContinue) return
    navigate('/onboarding/interests')
  }

  return (
    <OnboardingLayout step={1}>
      <div className="onboarding-step">
        <span className="onboarding-eyebrow">About you</span>

        <h2 className="onboarding-heading">What should I call you?</h2>

        <p className="onboarding-subtext">
          Just a first name or nickname — whatever feels right.
        </p>

        <div className="onboarding-form">
          <Input
            name="name"
            placeholder="Your name"
            value={data.name}
            onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            autoFocus
            autoComplete="given-name"
          />
        </div>

        <div className="onboarding-field">
          <span className="onboarding-field-label">Your age range</span>
          <div className="onboarding-chip-group">
            {AGE_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                className={[
                  'onboarding-chip',
                  data.ageRange === range ? 'onboarding-chip--selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => dispatch({ type: 'SET_AGE_RANGE', payload: range })}
                aria-pressed={data.ageRange === range}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="onboarding-field">
          <span className="onboarding-field-label">Character preference</span>
          <p className="onboarding-field-hint">
            Choose how Grace should appear to you. Everything else stays the same.
          </p>
          <div className="onboarding-chip-group">
            {CHARACTER_PREFERENCES.map((pref) => (
              <button
                key={pref.value}
                type="button"
                className={[
                  'onboarding-chip',
                  data.characterPreference === pref.value
                    ? 'onboarding-chip--selected'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() =>
                  dispatch({ type: 'SET_CHARACTER_PREFERENCE', payload: pref.value })
                }
                aria-pressed={data.characterPreference === pref.value}
              >
                {pref.label}
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
            disabled={!canContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
