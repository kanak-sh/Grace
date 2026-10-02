import { useEffect, useRef, useState } from 'react'
import Avatar from '../components/ui/Avatar'
import { useProfile } from '../hooks/useProfile'
import { useMood } from '../hooks/useMood'
import { getCompanionImage } from '../services/avatarImages'
import { getGraceReply, type ChatMessage } from '../services/companion'
import './Companion.css'

let nextId = 1

export default function Companion() {
  const profile = useProfile()
  const mood = useMood()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId++, from: 'grace', text: `Hi${profile?.name ? ` ${profile.name}` : ''}! I'm Grace. How are you feeling today? You can talk to me about your mood, hobbies, health, or anything on your mind.` },
  ])
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((m) => [...m, { id: nextId++, from: 'user', text }])
    setDraft('')
    const reply = getGraceReply(text, {
      name: profile?.name,
      mood,
      interests: profile?.interests,
      hobbies: profile?.hobbies,
    })
    setTimeout(() => {
      setMessages((m) => [...m, { id: nextId++, from: 'grace', text: reply }])
    }, 600)
  }

  return (
    <div className="companion-page">
      <header className="health-head">
        <h1>Grace</h1>
        <p>
          Your personal companion
          {mood ? ` · feeling ${mood.toLowerCase()} today` : ''}
        </p>
      </header>

      <div className="chat-window" ref={listRef}>
        {messages.map((message) => (
          <div key={message.id} className={`chat-row chat-row--${message.from}`}>
            {message.from === 'grace' && <Avatar name="Grace" size="sm" src={getCompanionImage(profile?.characterPreference)} zoom={1.12} />}
            <p className={`chat-bubble chat-bubble--${message.from}`}>{message.text}</p>
          </div>
        ))}
      </div>

      <form
        className="chat-input-row"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <input
          className="chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Talk to Grace…"
          aria-label="Message Grace"
        />
        <button type="submit" className="chat-send" aria-label="Send">
          →
        </button>
      </form>
    </div>
  )
}
