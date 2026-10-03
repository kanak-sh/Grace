export interface Note {
  id: string
  title: string
  content: string
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
}

const STORAGE_KEY = 'grace-notes'
const CHANGE_EVENT = 'grace-notes-changed'

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Note[]) : []
  } catch {
    return []
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function createNote(title: string, content: string): Note {
  const now = new Date().toISOString()
  const note: Note = {
    id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    content,
    createdAt: now,
    updatedAt: now,
  }
  saveNotes([note, ...loadNotes()])
  return note
}

export function updateNote(id: string, patch: { title?: string; content?: string }): Note | null {
  const notes = loadNotes()
  const index = notes.findIndex((n) => n.id === id)
  if (index === -1) return null
  const updated: Note = {
    ...notes[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  }
  notes[index] = updated
  saveNotes(notes)
  return updated
}

export function deleteNote(id: string) {
  saveNotes(loadNotes().filter((n) => n.id !== id))
}

export function subscribeNotes(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}
