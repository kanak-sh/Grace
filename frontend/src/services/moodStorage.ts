export interface MoodEntry {
  mood: string
  date: string // YYYY-MM-DD
}

const STORAGE_KEY = 'grace-mood'
const CHANGE_EVENT = 'grace-mood-changed'

export function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export function loadMood(): MoodEntry | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as MoodEntry
    // Only restore a mood checked in today
    if (parsed.date !== getTodayKey()) return null
    return parsed
  } catch {
    return null
  }
}

export function saveMood(mood: string | null): void {
  if (mood === null) {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    const entry: MoodEntry = { mood, date: getTodayKey() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry))
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function subscribeMood(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}
