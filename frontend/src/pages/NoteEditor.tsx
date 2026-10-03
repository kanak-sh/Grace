import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useNotes } from '../hooks/useNotes'
import './Notes.css'

export default function NoteEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notes, createNote, updateNote } = useNotes()

  const existing = useMemo(() => notes.find((n) => n.id === id) ?? null, [notes, id])
  const isEdit = Boolean(id && existing)

  const [title, setTitle] = useState(existing?.title ?? '')
  const [content, setContent] = useState(existing?.content ?? '')

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const canSave = title.trim().length > 0 || content.trim().length > 0

  useEffect(() => {
    if (id && !existing) navigate('/notes', { replace: true })
  }, [id, existing, navigate])

  if (id && !existing) return null

  function handleSave() {
    if (!canSave) return
    if (isEdit && existing) {
      updateNote(existing.id, { title: title.trim(), content: content.trim() })
    } else {
      createNote(title.trim(), content.trim())
    }
    navigate('/notes')
  }

  return (
    <div className="note-editor">
      <header className="note-editor-head">
        <button type="button" className="note-editor-back" onClick={() => navigate('/notes')}>
          ← {isEdit ? 'Edit note' : 'New note'}
        </button>
        <button type="button" className="notes-new" onClick={handleSave} disabled={!canSave}>
          Save
        </button>
      </header>

      <label className="note-editor-label" htmlFor="note-title">Title</label>
      <input
        id="note-title"
        className="note-editor-title"
        type="text"
        placeholder="Project ideas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="note-editor-content"
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={14}
      />

      <p className="note-editor-count">{wordCount} words</p>
    </div>
  )
}
