import { useSyncExternalStore } from 'react'
import { DEFAULT_SETTINGS, type SettingsData } from '../services/settingsStorage'

let cachedSettings: SettingsData = DEFAULT_SETTINGS
let lastRaw: string | null = null

function subscribe(callback: () => void) {
  window.addEventListener('grace-settings-changed', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('grace-settings-changed', callback)
    window.removeEventListener('storage', callback)
  }
}

function getSnapshot(): SettingsData {
  try {
    const raw = localStorage.getItem('grace-settings')
    if (raw === lastRaw) {
      return cachedSettings
    }
    lastRaw = raw
    if (!raw) {
      cachedSettings = DEFAULT_SETTINGS
      return cachedSettings
    }
    const parsed = JSON.parse(raw) as Partial<SettingsData>
    cachedSettings = {
      usePersonalization: parsed.usePersonalization ?? DEFAULT_SETTINGS.usePersonalization,
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...(parsed.notifications ?? {}),
      },
    }
    return cachedSettings
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function useSettings(): SettingsData {
  return useSyncExternalStore(subscribe, getSnapshot)
}
