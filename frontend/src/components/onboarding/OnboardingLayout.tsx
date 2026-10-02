import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useOnboarding } from '../../contexts/OnboardingContext'
import './OnboardingLayout.css'

const STEPS = [
  'Welcome',
  'About You',
  'Interests',
  'Hobbies',
  'Likes & Dislikes',
  'Personalization',
  'Finish',
]

interface OnboardingLayoutProps {
  step: number
  children: ReactNode
  showBack?: boolean
  onBack?: () => void
}

export default function OnboardingLayout({
  step,
  children,
  showBack = true,
  onBack,
}: OnboardingLayoutProps) {
  const navigate = useNavigate()
  const { dispatch } = useOnboarding()

  function handleBack() {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  function handleSkip() {
    dispatch({ type: 'RESET' })
    navigate('/')
  }

  return (
    <main className="onboarding-layout">
      <div className="onboarding-progress">
        <div className="onboarding-progress-bar">
          <div
            className="onboarding-progress-fill"
            style={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
        <span className="onboarding-progress-label">
          {STEPS[step]}
        </span>
      </div>

      <div className="onboarding-content">{children}</div>

      <div className="onboarding-nav">
        {showBack && (
          <button
            type="button"
            className="onboarding-back"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button
          type="button"
          className="onboarding-skip"
          onClick={handleSkip}
        >
          Skip for now
        </button>
      </div>
    </main>
  )
}
