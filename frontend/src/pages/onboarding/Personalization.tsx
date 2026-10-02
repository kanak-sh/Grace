import { useNavigate } from 'react-router'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import { Button } from '../../components/ui'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { useTheme } from '../../components/theme/ThemeContext'
import './OnboardingSteps.css'
import './Personalization.css'

const CHARACTERS = [
  { value: 'grace', label: 'Grace', description: 'Warm and calm', icon: '✦' },
  { value: 'sunny', label: 'Sunny', description: 'Bright and cheerful', icon: '☀️' },
  { value: 'luna', label: 'Luna', description: 'Gentle and dreamy', icon: '🌙' },
  { value: 'river', label: 'River', description: 'Flowing and relaxed', icon: '🌊' },
]

const THEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'auto', label: 'System', icon: '💻' },
] as const

export default function Personalization() {
  const navigate = useNavigate()
  const { data, dispatch } = useOnboarding()
  const { setTheme } = useTheme()

  function handleTheme(value: 'light' | 'dark' | 'auto') {
    dispatch({ type: 'SET_THEME', payload: value })
    setTheme(value === 'auto' ? 'system' : value)
  }

  function handleContinue() {
    navigate('/onboarding/finish')
  }

  return (
    <OnboardingLayout step={5}>
      <div className="onboarding-step">
        <span className="onboarding-eyebrow">Personalization</span>

        <h2 className="onboarding-heading">Make it yours</h2>

        <p className="onboarding-subtext">
          Set your theme and pick the character that feels right to you.
          Everything else stays the same.
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
                onClick={() => handleTheme(option.value)}
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

        <div className="onboarding-field">
          <span className="onboarding-field-label">Character</span>
          <div className="onboarding-character-grid">
            {CHARACTERS.map((char) => (
              <button
                key={char.value}
                type="button"
                className={[
                  'onboarding-character-card',
                  data.character === char.value
                    ? 'onboarding-character-card--selected'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => dispatch({ type: 'SET_CHARACTER', payload: char.value })}
                aria-pressed={data.character === char.value}
              >
                <span className="onboarding-character-icon" aria-hidden="true">
                  {char.icon}
                </span>
                <span className="onboarding-character-name">{char.label}</span>
                <span className="onboarding-character-desc">{char.description}</span>
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
