import { useSyncExternalStore } from 'react'
import { useProfile } from './useProfile'
import { profileStorage } from '../services/profileStorage'
import {
  getContinueItems,
  getForYouItems,
  getHobbyContent,
  hobbyCatalog,
  type ContinueItem,
  type ForYouItem,
  type HobbyContent,
} from '../services/hobbyData'
import {
  loadHobbyState,
  setHobbyProgress,
  subscribeHobbyState,
  toggleSavedItem,
  type HobbyState,
} from '../services/hobbyStorage'

const MAX_HOBBIES = 5

let cachedState: HobbyState | null = null
let lastRaw: string | null = null

function getStateSnapshot(): HobbyState {
  try {
    const raw = localStorage.getItem('grace-hobbies')
    if (raw === lastRaw && cachedState) return cachedState
    lastRaw = raw
    cachedState = loadHobbyState()
    return cachedState
  } catch {
    return loadHobbyState()
  }
}

export interface UseHobbiesResult {
  hobbies: string[]
  maxHobbies: number
  canAddMore: boolean
  addableHobbies: { value: string; label: string; icon: string }[]
  addHobby: (value: string) => void
  removeHobby: (value: string) => void
  content: HobbyContent[]
  continueItems: ContinueItem[]
  forYou: ForYouItem[]
  savedIds: Record<string, string[]>
  advanceProgress: (hobby: string, amount?: number) => void
  toggleSaved: (hobby: string, itemId: string) => void
}

export function useHobbies(): UseHobbiesResult {
  const profile = useProfile()
  const state = useSyncExternalStore(subscribeHobbyState, getStateSnapshot)

  const hobbies = profile?.hobbies?.length ? profile.hobbies : ['reading', 'yoga', 'crochet']

  const addHobby = (value: string) => {
    if (!profile || profile.hobbies.length >= MAX_HOBBIES) return
    if (profile.hobbies.some((h) => h.toLowerCase() === value.toLowerCase())) return
    profileStorage.save({ ...profile, hobbies: [...profile.hobbies, value] })
  }

  const removeHobby = (value: string) => {
    if (!profile) return
    profileStorage.save({
      ...profile,
      hobbies: profile.hobbies.filter((h) => h !== value),
    })
  }

  const continueItems = getContinueItems(hobbies, state.progress)
  const forYou = getForYouItems(hobbies, profile?.interests ?? [], profile?.likes ?? [])
  const content = hobbies.map((h) => getHobbyContent(h))

  const addableHobbies = hobbyCatalog
    .filter((entry) => !hobbies.some((h) => h.toLowerCase() === entry.value))
    .map(({ value, label, icon }) => ({ value, label, icon }))

  return {
    hobbies,
    maxHobbies: MAX_HOBBIES,
    canAddMore: hobbies.length < MAX_HOBBIES,
    addableHobbies,
    addHobby,
    removeHobby,
    content,
    continueItems,
    forYou,
    savedIds: state.saved,
    advanceProgress: (hobby, amount = 10) => {
      const current =
        state.progress[hobby.toLowerCase()] ??
        getHobbyContent(hobby).continueSeed.progress
      setHobbyProgress(hobby, current >= 100 ? 0 : current + amount)
    },
    toggleSaved: toggleSavedItem,
  }
}
