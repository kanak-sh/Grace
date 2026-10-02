import { useState } from 'react'
import { useNavigate } from 'react-router'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import { Button, Input } from '../../components/ui'
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
  const [otherOpen, setOtherOpen] = useState(false)
  const [otherText, setOtherText] = useState('')
  const { data, dispatch } = useOnboarding()

  function handleToggle(value: string) {
    dispatch({ type: 'TOGGLE_INTEREST', payload: value })
  }

  const knownValues = INTERESTS.map((i) => i.value)
  const customInterests = data.interests.filter((i) => !knownValues.includes(i))

  function handleAddOther() {
    const value = otherText.trim()
    if (!value) return
    const key = value.toLowerCase()
    if (!data.interests.includes(key) && !data.interests.includes(value)) {
      dispatch({ type: 'TOGGLE_INTEREST', payload: value })
    }
    setOtherText('')
    setOtherOpen(false)
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
              {interest.label}
            </button>
          ))}

          <button
            type="button"
            className={[
              'onboarding-chip onboarding-chip--interactive',
              otherOpen ? 'onboarding-chip--selected' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setOtherOpen((open) => !open)}
            aria-pressed={otherOpen}
          >
            Other
          </button>
        </div>

        {customInterests.length > 0 && (
          <div className="onboarding-chip-group onboarding-chip-group--large">
            {customInterests.map((interest) => (
              <button
                key={interest}
                type="button"
                className="onboarding-chip onboarding-chip--selected"
                onClick={() => handleToggle(interest)}
                aria-pressed="true"
              >
                {interest} ✕
              </button>
            ))}
          </div>
        )}

        {otherOpen && (
          <div className="onboarding-field" style={{ marginTop: 'var(--space-md)' }}>
            <Input
              label="Your interest"
              placeholder="e.g. Bird watching"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddOther()
                }
              }}
              autoFocus
            />
            <Button variant="secondary" size="sm" onClick={handleAddOther} disabled={!otherText.trim()}>
              Add interest
            </Button>
          </div>
        )}

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
