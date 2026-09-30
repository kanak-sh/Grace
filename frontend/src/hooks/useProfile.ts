import { useSyncExternalStore } from 'react'
import { profileStorage, type ProfileData } from '../services/profileStorage'

let cachedProfile: ProfileData | null = null
let lastRaw: string | null = null

function subscribe(callback: () => void) {
  window.addEventListener('grace-profile-changed', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('grace-profile-changed', callback)
    window.removeEventListener('storage', callback)
  }
}

function getSnapshot(): ProfileData | null {
  try {
    const raw = localStorage.getItem('grace-profile')
    if (raw === lastRaw) {
      return cachedProfile
    }
    lastRaw = raw
    cachedProfile = raw ? JSON.parse(raw) : null
    return cachedProfile
  } catch {
    return null
  }
}

export function useProfile(): ProfileData | null {
  return useSyncExternalStore(subscribe, getSnapshot)
}
