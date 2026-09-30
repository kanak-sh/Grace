import { Outlet } from 'react-router'
import { OnboardingProvider as Provider } from '../../contexts/OnboardingContext'

export default function OnboardingProviderWrapper() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  )
}
