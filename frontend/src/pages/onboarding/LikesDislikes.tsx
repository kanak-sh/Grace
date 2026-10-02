import { useState } from 'react'
import { useNavigate } from 'react-router'
import OnboardingLayout from '../../components/onboarding/OnboardingLayout'
import { Button, Input } from '../../components/ui'
import { useOnboarding } from '../../contexts/OnboardingContext'
import './OnboardingSteps.css'
import './LikesDislikes.css'

const SUGGESTED_LIKES = [
  'Coffee', 'Rainy days', 'Dogs', 'Music', 'Cooking',
  'Walking', 'Sunsets', 'Books', 'Laughter', 'Quiet mornings',
]

const SUGGESTED_DISLIKES = [
  'Loud noise', 'Crowds', 'Cold weather', 'Waiting', 'Spicy food',
  'Early mornings', 'Clutter', 'Slow wifi', 'Cilantro', 'Hot weather',
]

export default function LikesDislikes() {
  const navigate = useNavigate()
  const { data, dispatch } = useOnboarding()
  const [likeInput, setLikeInput] = useState('')
  const [dislikeInput, setDislikeInput] = useState('')

  function handleAddLike(value: string) {
    const trimmed = value.trim()
    if (!trimmed) return
    dispatch({ type: 'ADD_LIKE', payload: trimmed })
    setLikeInput('')
  }

  function handleAddDislike(value: string) {
    const trimmed = value.trim()
    if (!trimmed) return
    dispatch({ type: 'ADD_DISLIKE', payload: trimmed })
    setDislikeInput('')
  }

  function handleLikeKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddLike(likeInput)
    }
  }

  function handleDislikeKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddDislike(dislikeInput)
    }
  }

  function handleContinue() {
    navigate('/onboarding/personalization')
  }

  return (
    <OnboardingLayout step={4}>
      <div className="onboarding-step">
        <span className="onboarding-eyebrow">Likes & dislikes</span>

        <h2 className="onboarding-heading">What do you love and loathe?</h2>

        <p className="onboarding-subtext">
          Add a few things — it helps Grace understand your vibe.
        </p>

        {/* Likes */}
        <div className="onboarding-field">
          <span className="onboarding-field-label">Things you like</span>
          <div className="onboarding-tag-input">
            <Input
              name="like-input"
              placeholder="Type and press Enter…"
              value={likeInput}
              onChange={(e) => setLikeInput(e.target.value)}
              onKeyDown={handleLikeKeyDown}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleAddLike(likeInput)}
              disabled={!likeInput.trim()}
            >
              Add
            </Button>
          </div>
          {data.likes.length > 0 && (
            <div className="onboarding-tag-list">
              {data.likes.map((like) => (
                <span key={like} className="onboarding-tag onboarding-tag--like">
                  {like}
                  <button
                    type="button"
                    className="onboarding-tag-remove"
                    onClick={() => dispatch({ type: 'REMOVE_LIKE', payload: like })}
                    aria-label={`Remove ${like}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="onboarding-suggestions">
            {SUGGESTED_LIKES.filter((s) => !data.likes.includes(s)).slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="onboarding-suggestion"
                onClick={() => handleAddLike(suggestion)}
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Dislikes */}
        <div className="onboarding-field">
          <span className="onboarding-field-label">Things you dislike</span>
          <div className="onboarding-tag-input">
            <Input
              name="dislike-input"
              placeholder="Type and press Enter…"
              value={dislikeInput}
              onChange={(e) => setDislikeInput(e.target.value)}
              onKeyDown={handleDislikeKeyDown}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleAddDislike(dislikeInput)}
              disabled={!dislikeInput.trim()}
            >
              Add
            </Button>
          </div>
          {data.dislikes.length > 0 && (
            <div className="onboarding-tag-list">
              {data.dislikes.map((dislike) => (
                <span key={dislike} className="onboarding-tag onboarding-tag--dislike">
                  {dislike}
                  <button
                    type="button"
                    className="onboarding-tag-remove"
                    onClick={() => dispatch({ type: 'REMOVE_DISLIKE', payload: dislike })}
                    aria-label={`Remove ${dislike}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="onboarding-suggestions">
            {SUGGESTED_DISLIKES.filter((s) => !data.dislikes.includes(s)).slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="onboarding-suggestion"
                onClick={() => handleAddDislike(suggestion)}
              >
                + {suggestion}
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
