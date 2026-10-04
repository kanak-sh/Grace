import { useSyncExternalStore } from 'react'
import {
  deleteCreation,
  getCreation,
  loadCreations,
  saveCreation,
  subscribeCreations,
  type Creation,
} from '../services/creationStorage'

let cachedCreations: Creation[] | null = null
let lastRaw: string | null = null

function getSnapshot(): Creation[] {
  try {
    const raw = localStorage.getItem('grace-creations')
    if (raw === lastRaw && cachedCreations) return cachedCreations
    lastRaw = raw
    cachedCreations = loadCreations()
    return cachedCreations
  } catch {
    return loadCreations()
  }
}

export interface UseCreationsResult {
  creations: Creation[]
  saveCreation: (title: string, dataUrl: string, id?: string) => Creation
  deleteCreation: (id: string) => void
  getCreation: (id: string) => Creation | null
}

export function useCreations(): UseCreationsResult {
  const creations = useSyncExternalStore(subscribeCreations, getSnapshot)
  return { creations, saveCreation, deleteCreation, getCreation }
}
