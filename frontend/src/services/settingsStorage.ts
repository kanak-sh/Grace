export interface NotificationPreferences {
  dailyReminders: boolean
  moodCheckins: boolean
  hobbyReminders: boolean
  graceSuggestions: boolean
}

export interface SettingsData {
  usePersonalization: boolean
  notifications: NotificationPreferences
}

export const DEFAULT_SETTINGS: SettingsData = {
  usePersonalization: true,
  notifications: {
    dailyReminders: true,
    moodCheckins: true,
    hobbyReminders: true,
    graceSuggestions: true,
  },
}

const STORAGE_KEY = 'grace-settings'
const CHANGE_EVENT = 'grace-settings-changed'

// All Grace-owned local keys, cleared by clearGraceLocalData().
const DATA_KEYS = [
  'grace-profile',
  'grace-notes',
  'grace-hobbies',
  'grace-music',
  'grace-creations',
  'grace-mood',
  'grace-settings',
]

const CHANGE_EVENTS = [
  'grace-profile-changed',
  'grace-notes-changed',
  'grace-hobbies-changed',
  'grace-music-changed',
  'grace-creations-changed',
  'grace-mood-changed',
  'grace-settings-changed',
]

export function loadSettings(): SettingsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<SettingsData>
    return {
      usePersonalization: parsed.usePersonalization ?? DEFAULT_SETTINGS.usePersonalization,
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...(parsed.notifications ?? {}),
      },
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(data: SettingsData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function clearGraceLocalData(): void {
  DATA_KEYS.forEach((key) => localStorage.removeItem(key))
  CHANGE_EVENTS.forEach((event) => window.dispatchEvent(new CustomEvent(event)))
}
