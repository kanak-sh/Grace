// Saved/progress state for hobbies.
// Today this lives in localStorage; the interface is shaped so a
// backend fetch can slot in later without touching the UI.
export interface HobbyState {
  progress: Record<string, number> // hobby value (lowercase) -> 0..100
  saved: Record<string, string[]> // hobby value (lowercase) -> saved item ids
}

const STORAGE_KEY = 'grace-hobbies'
const CHANGE_EVENT = 'grace-hobbies-changed'

export const EMPTY_STATE: HobbyState = { progress: {}, saved: {} }

export function loadHobbyState(): HobbyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_STATE
    const parsed = JSON.parse(raw) as HobbyState
    return {
      progress: parsed.progress ?? {},
      saved: parsed.saved ?? {},
    }
  } catch {
    return EMPTY_STATE
  }
}

function saveHobbyState(state: HobbyState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function setHobbyProgress(hobby: string, progress: number) {
  const state = loadHobbyState()
  const clamped = Math.max(0, Math.min(100, Math.round(progress)))
  saveHobbyState({ ...state, progress: { ...state.progress, [hobby.toLowerCase()]: clamped } })
}

export function toggleSavedItem(hobby: string, itemId: string) {
  const state = loadHobbyState()
  const key = hobby.toLowerCase()
  const current = state.saved[key] ?? []
  const next = current.includes(itemId)
    ? current.filter((id) => id !== itemId)
    : [...current, itemId]
  saveHobbyState({ ...state, saved: { ...state.saved, [key]: next } })
}

export function subscribeHobbyState(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}
