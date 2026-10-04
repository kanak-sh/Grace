export interface Creation {
  id: string
  title: string
  dataUrl: string // PNG data URL of the canvas
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
}

const STORAGE_KEY = 'grace-creations'
const CHANGE_EVENT = 'grace-creations-changed'
const MAX_CREATIONS = 24

export function loadCreations(): Creation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Creation[]) : []
  } catch {
    return []
  }
}

function saveAll(creations: Creation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creations))
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function getCreation(id: string): Creation | null {
  return loadCreations().find((c) => c.id === id) ?? null
}

export function saveCreation(title: string, dataUrl: string, id?: string): Creation {
  const now = new Date().toISOString()
  const creations = loadCreations()
  if (id) {
    const index = creations.findIndex((c) => c.id === id)
    if (index !== -1) {
      const updated: Creation = { ...creations[index], title, dataUrl, updatedAt: now }
      creations[index] = updated
      saveAll(creations)
      return updated
    }
  }
  const creation: Creation = {
    id: `creation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    dataUrl,
    createdAt: now,
    updatedAt: now,
  }
  saveAll([creation, ...creations].slice(0, MAX_CREATIONS))
  return creation
}

export function deleteCreation(id: string) {
  saveAll(loadCreations().filter((c) => c.id !== id))
}

export function subscribeCreations(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}
