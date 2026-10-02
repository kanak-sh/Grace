
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Companion from './pages/Companion'
import Health from './pages/Health'
import Hobbies from './pages/Hobbies'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Music from './pages/Music'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import More from './pages/More'
import Welcome from './pages/onboarding/Welcome'
import AboutYou from './pages/onboarding/AboutYou'
import Interests from './pages/onboarding/Interests'
import HobbiesOnboarding from './pages/onboarding/Hobbies'
import LikesDislikes from './pages/onboarding/LikesDislikes'
import Personalization from './pages/onboarding/Personalization'
import Finish from './pages/onboarding/Finish'
import OnboardingProviderWrapper from './components/onboarding/OnboardingProvider'

import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OnboardingProviderWrapper />}>
          <Route path="/onboarding" element={<Welcome />} />
          <Route path="/onboarding/about-you" element={<AboutYou />} />
          <Route path="/onboarding/interests" element={<Interests />} />
          <Route path="/onboarding/hobbies" element={<HobbiesOnboarding />} />
          <Route path="/onboarding/likes-dislikes" element={<LikesDislikes />} />
          <Route path="/onboarding/personalization" element={<Personalization />} />
          <Route path="/onboarding/finish" element={<Finish />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="companion" element={<Companion />} />
          <Route path="health" element={<Health />} />
          <Route path="hobbies" element={<Hobbies />} />
          <Route path="notes" element={<Notes />} />
          <Route path="create" element={<Create />} />
          <Route path="music" element={<Music />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="more" element={<More />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
