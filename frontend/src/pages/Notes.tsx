import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useNotes } from '../hooks/useNotes'
import { type Note } from '../services/noteStorage'
import './Notes.css'

function startOfDay(date: Date): number {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function groupOf(note: Note): 'Today' | 'Yesterday' | 'This week' | 'Older' {
  const now = Date.now()
  const created = new Date(note.createdAt).getTime()
  const dayDiff = Math.floor((startOfDay(new Date(now)) - startOfDay(new Date(created))) / 86_400_000)
  if (dayDiff <= 0) return 'Today'
  if (dayDiff === 1) return 'Yesterday'
  if (dayDiff < 7) return 'This week'
  return 'Older'
}

function formatMeta(note: Note): string {
  const date = new Date(note.createdAt)
  const group = groupOf(note)
  if (group === 'Today') {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  }
  if (group === 'Yesterday') return 'Yesterday'
  if (group === 'This week') {
    return date.toLocaleDateString([], { weekday: 'long' })
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const GROUP_ORDER = ['Today', 'Yesterday', 'This week', 'Older'] as const

export default function Notes() {
  const { notes, deleteNote, searchNotes } = useNotes()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null)

  const visible = useMemo(() => searchNotes(query), [searchNotes, query])

  const grouped = useMemo(() => {
    const map = new Map<string, Note[]>()
    for (const note of visible) {
      const group = groupOf(note)
      map.set(group, [...(map.get(group) ?? []), note])
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      label: g,
      notes: (map.get(g) ?? []).sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      ),
    }))
  }, [visible])

  return (
    <div className="notes-page">
      <header className="notes-head">
        <div>
          <h1>Notes</h1>
          <p>Capture your thoughts, ideas and little moments ❤️</p>
        </div>
        <div className="notes-head-actions">
          <button type="button" className="notes-icon-btn" aria-label="Search notes" onClick={() => document.getElementById('notes-search')?.focus()}>
            🔍
          </button>
          <button type="button" className="notes-new" onClick={() => navigate('/notes/new')}>
            + New
          </button>
        </div>
      </header>

      <section className="notes-intro">
        <div>
          <h2>A space for you</h2>
          <p>Write, save and organise your thoughts.</p>
          <p className="notes-intro-sub">
            Text today — images, voice notes and more as we build Grace together.
          </p>
        </div>
        <span className="notes-mascot" aria-hidden="true">📔</span>
      </section>

      <div className="notes-search-row">
        <input
          id="notes-search"
          className="notes-search"
          type="search"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      </div>

      {grouped.length === 0 && (
        <div className="notes-empty">
          {notes.length === 0 ? (
            <>
              <p className="notes-empty-title">No notes yet</p>
              <p>Tap “+ New” to write your first note.</p>
            </>
          ) : (
            <p>No notes match “{query}”.</p>
          )}
        </div>
      )}

      {grouped.map((group) => (
        <section key={group.label} className="notes-group">
          <h2>{group.label}</h2>
          {group.notes.map((note) => (
            <article key={note.id} className="note-card">
              <Link to={`/notes/${note.id}`} className="note-card-main">
                <div className="note-card-body">
                  <h3>{note.title || 'Untitled'}</h3>
                  <p className="note-preview">{note.content || 'No content yet…'}</p>
                  <p className="note-meta">{formatMeta(note)}</p>
                </div>
              </Link>
              <div className="note-card-menu">
                <button
                  type="button"
                  className="note-menu-btn"
                  aria-label={`Options for ${note.title || 'note'}`}
                  onClick={() => setMenuOpenId(menuOpenId === note.id ? null : note.id)}
                >
                  ⋯
                </button>
                {menuOpenId === note.id && (
                  <div className="note-menu" role="menu">
                    <button type="button" onClick={() => { setMenuOpenId(null); navigate(`/notes/${note.id}`) }}>Open</button>
                    <button type="button" onClick={() => { setMenuOpenId(null); navigate(`/notes/${note.id}?edit=1`) }}>Edit</button>
                    <button type="button" className="note-menu-danger" onClick={() => { setMenuOpenId(null); setDeleteTarget(note) }}>Delete</button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      ))}

      {deleteTarget && (
        <div className="notes-modal-backdrop" role="dialog" aria-modal="true" aria-label="Delete note?">
          <div className="notes-modal">
            <h3>Delete note?</h3>
            <p>This note will be permanently deleted.</p>
            <div className="notes-modal-actions">
              <button type="button" className="notes-modal-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button
                type="button"
                className="notes-modal-delete"
                onClick={() => { deleteNote(deleteTarget.id); setDeleteTarget(null) }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
