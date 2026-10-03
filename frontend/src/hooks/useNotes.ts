import { useSyncExternalStore } from 'react'
import {
  createNote,
  deleteNote,
  loadNotes,
  subscribeNotes,
  updateNote,
  type Note,
} from '../services/noteStorage'

let cachedNotes: Note[] | null = null
let lastRaw: string | null = null

function getSnapshot(): Note[] {
  try {
    const raw = localStorage.getItem('grace-notes')
    if (raw === lastRaw && cachedNotes) return cachedNotes
    lastRaw = raw
    cachedNotes = loadNotes()
    return cachedNotes
  } catch {
    return loadNotes()
  }
}

export function searchNotes(notes: Note[], query: string): Note[] {
  const q = query.trim().toLowerCase()
  if (!q) return notes
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q),
  )
}

export interface UseNotesResult {
  notes: Note[]
  createNote: (title: string, content: string) => Note
  updateNote: (id: string, patch: { title?: string; content?: string }) => Note | null
  deleteNote: (id: string) => void
  searchNotes: (query: string) => Note[]
}

// Notes.tsx and NoteEditor.tsx only talk to this hook — they never
// touch localStorage directly, so storage can move to an API later.
export function useNotes(): UseNotesResult {
  const notes = useSyncExternalStore(subscribeNotes, getSnapshot)

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes: (query: string) => searchNotes(notes, query),
  }
}
