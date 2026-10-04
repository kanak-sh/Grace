import { useEffect, useRef, useState } from 'react'
import { useCreations } from '../hooks/useCreations'
import { useProfile } from '../hooks/useProfile'
import { type Creation } from '../services/creationStorage'
import createBoy from '../assets/Create_boy.png'
import './Create.css'

const COLORS = ['#2b3350', '#f26d6d', '#f7b6b0', '#f6c453', '#9fdcb8', '#8fc3f0', '#ad98df']

const CANVAS_W = 960
const CANVAS_H = 620

export default function Create() {
  const { creations, saveCreation, deleteCreation } = useCreations()
  const profile = useProfile()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawing = useRef(false)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)

  const [tool, setTool] = useState<'brush' | 'eraser'>('brush')
  const [color, setColor] = useState(COLORS[0])
  const [size, setSize] = useState(6)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeTitle, setActiveTitle] = useState('Untitled')
  const [dirty, setDirty] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveTitle, setSaveTitle] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Creation | null>(null)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)
  const creationsRef = useRef<HTMLDivElement | null>(null)

  // Blank white canvas on first mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }, [])

  const getPoint = (e: React.PointerEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
    }
  }

  const startStroke = (e: React.PointerEvent) => {
    e.preventDefault()
    ;(e.target as Element).setPointerCapture(e.pointerId)
    drawing.current = true
    lastPoint.current = getPoint(e)
  }

  const moveStroke = (e: React.PointerEvent) => {
    if (!drawing.current || !lastPoint.current) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const point = getPoint(e)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = size
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = '#ffffff'
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = color
    }
    ctx.beginPath()
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
    lastPoint.current = point
    setDirty(true)
  }

  const endStroke = () => {
    drawing.current = false
    lastPoint.current = null
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) ctx.globalCompositeOperation = 'source-over'
  }

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
    setDirty(true)
  }

  const newCanvas = () => {
    clearCanvas()
    setActiveId(null)
    setActiveTitle('Untitled')
  }

  const openCreation = (creation: Creation) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.onload = () => {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
      ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H)
      setActiveId(creation.id)
      setActiveTitle(creation.title)
      setDirty(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    img.src = creation.dataUrl
    setMenuOpenId(null)
  }

  const doSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const title = saveTitle.trim() || activeTitle || 'Untitled'
    saveCreation(title, canvas.toDataURL('image/png'), activeId ?? undefined)
    setSaveOpen(false)
    setSaveTitle('')
    setDirty(false)
  }

  return (
    <div className="create-page">
      <header className="create-head">
        <div>
          <h1>Create</h1>
          <p>Draw, doodle and bring your ideas to life ❤️</p>
        </div>
        <button
          type="button"
          className="create-my"
          onClick={() => creationsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          🖼️ My creations ›
        </button>
      </header>

      <section className="create-intro">
        <div>
          <h2>✦ Your creative space</h2>
          <p>
            Sketch, doodle, plan or just have fun! There are no rules — create
            whatever makes you happy.
          </p>
        </div>
        {profile?.characterPreference === 'male' ? (
          <img className="create-mascot" src={createBoy} alt="Creative companion" />
        ) : (
          <span className="create-mascot" aria-hidden="true">🖍️</span>
        )}
      </section>

      <div className="create-canvas-head">
        <h2>🎨 New canvas {activeTitle !== 'Untitled' && <span className="create-active-title">— {activeTitle}</span>}</h2>
        <button type="button" className="create-new" onClick={newCanvas}>
          + New canvas
        </button>
      </div>

      <div className="create-studio">
        <div className="create-tools">
          <button
            type="button"
            className={`create-tool${tool === 'brush' ? ' is-active' : ''}`}
            onClick={() => setTool('brush')}
          >
            <span aria-hidden="true">🖌️</span>
            Brush
          </button>
          <button
            type="button"
            className={`create-tool${tool === 'eraser' ? ' is-active' : ''}`}
            onClick={() => setTool('eraser')}
          >
            <span aria-hidden="true">🩹</span>
            Eraser
          </button>
          <label className="create-tool">
            <span aria-hidden="true">🎨</span>
            Colors
            <input
              type="color"
              className="create-color-input"
              value={color}
              onChange={(e) => { setColor(e.target.value); setTool('brush') }}
              aria-label="Custom color"
            />
          </label>
          <span className="create-tool create-tool-static">
            <span aria-hidden="true">〰</span>
            Size
          </span>
        </div>

        <canvas
          ref={canvasRef}
          className="create-canvas"
          width={CANVAS_W}
          height={CANVAS_H}
          onPointerDown={startStroke}
          onPointerMove={moveStroke}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
          aria-label="Drawing canvas"
        />

        <div className="create-side">
          <button type="button" className="create-side-btn" onClick={clearCanvas}>
            <span aria-hidden="true">🗑️</span>
            Clear
          </button>
          <button
            type="button"
            className="create-side-btn create-side-save"
            disabled={!dirty}
            onClick={() => { setSaveTitle(activeTitle === 'Untitled' ? '' : activeTitle); setSaveOpen(true) }}
          >
            <span aria-hidden="true">💾</span>
            Save
          </button>
        </div>
      </div>

      <div className="create-palette-row">
        <div className="create-palette">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`create-swatch${color === c && tool === 'brush' ? ' is-active' : ''}`}
              style={{ background: c }}
              aria-label={`Color ${c}`}
              onClick={() => { setColor(c); setTool('brush') }}
            />
          ))}
        </div>
        <input
          type="range"
          min={2}
          max={24}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="create-size"
          aria-label="Brush size"
        />
      </div>

      <section ref={creationsRef}>
        <div className="create-row-head">
          <h2>🖼️ Your creations</h2>
        </div>
        {creations.length === 0 ? (
          <p className="create-empty">Saved drawings will appear here.</p>
        ) : (
          <div className="create-grid">
            {creations.map((creation) => (
              <article key={creation.id} className="creation-card">
                <button type="button" className="creation-thumb" onClick={() => openCreation(creation)} aria-label={`Open ${creation.title}`}>
                  <img src={creation.dataUrl} alt={creation.title} />
                </button>
                <div className="creation-meta">
                  <h3>{creation.title}</h3>
                  <p>{new Date(creation.updatedAt).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <button
                  type="button"
                  className="creation-menu-btn"
                  aria-label={`Options for ${creation.title}`}
                  onClick={() => setMenuOpenId(menuOpenId === creation.id ? null : creation.id)}
                >
                  ⋯
                </button>
                {menuOpenId === creation.id && (
                  <div className="creation-menu" role="menu">
                    <button type="button" onClick={() => openCreation(creation)}>Open</button>
                    <button type="button" className="creation-menu-danger" onClick={() => { setMenuOpenId(null); setDeleteTarget(creation) }}>
                      Delete
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {saveOpen && (
        <div className="create-modal-backdrop" role="dialog" aria-modal="true" aria-label="Save creation">
          <div className="create-modal">
            <h3>Save creation</h3>
            <input
              className="create-modal-input"
              placeholder="Title"
              value={saveTitle}
              onChange={(e) => setSaveTitle(e.target.value)}
              autoFocus
            />
            <div className="create-modal-actions">
              <button type="button" className="create-modal-cancel" onClick={() => setSaveOpen(false)}>Cancel</button>
              <button type="button" className="create-modal-confirm" onClick={doSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="create-modal-backdrop" role="dialog" aria-modal="true" aria-label="Delete creation?">
          <div className="create-modal">
            <h3>Delete creation?</h3>
            <p>“{deleteTarget.title}” will be permanently deleted.</p>
            <div className="create-modal-actions">
              <button type="button" className="create-modal-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button type="button" className="create-modal-delete" onClick={() => { deleteCreation(deleteTarget.id); setDeleteTarget(null) }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
