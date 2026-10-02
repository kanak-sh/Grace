import { useSyncExternalStore } from 'react'
import { loadMood, subscribeMood } from '../services/moodStorage'

let cached: string | null = null
let lastRaw: string | null = null

function getSnapshot(): string | null {
  try {
    const raw = localStorage.getItem('grace-mood')
    if (raw === lastRaw) return cached
    lastRaw = raw
    cached = loadMood()?.mood ?? null
    return cached
  } catch {
    return null
  }
}

export function useMood(): string | null {
  return useSyncExternalStore(subscribeMood, getSnapshot)
}
