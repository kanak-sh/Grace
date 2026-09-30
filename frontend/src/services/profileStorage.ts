export interface ProfileData {
  name: string
  ageRange: string
  characterPreference: string
  interests: string[]
  hobbies: string[]
  likes: string[]
  dislikes: string[]
  theme: 'light' | 'dark' | 'auto'
  character: string
  onboardingCompleted: boolean
}

export interface ProfileStorage {
  load(): ProfileData | null
  save(data: ProfileData): void
  clear(): void
}

const STORAGE_KEY = 'grace-profile'
const CHANGE_EVENT = 'grace-profile-changed'

export function notifyProfileChanged() {
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

class LocalStorageProfileStorage implements ProfileStorage {
  load(): ProfileData | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      return JSON.parse(raw) as ProfileData
    } catch {
      return null
    }
  }

  save(data: ProfileData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    notifyProfileChanged()
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY)
    notifyProfileChanged()
  }
}

export const profileStorage: ProfileStorage = new LocalStorageProfileStorage()
