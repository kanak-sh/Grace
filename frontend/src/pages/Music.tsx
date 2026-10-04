import { useEffect, useMemo, useRef, useState } from 'react'
import { useMusic, type RecentSong } from '../hooks/useMusic'
import { type Playlist, type Song } from '../services/musicStorage'
import './Music.css'

const CHIPS = [
  { id: 'forYou', label: 'For you', icon: '♡' },
  { id: 'playlists', label: 'Playlists', icon: '🎵' },
  { id: 'moods', label: 'Moods', icon: '☀' },
  { id: 'genres', label: 'Genres', icon: '▮▮' },
  { id: 'favorites', label: 'Favorites', icon: '★' },
] as const

type ChipId = (typeof CHIPS)[number]['id']

function timeAgo(iso: string): string {
  const diff = Date.now() - +new Date(iso)
  const min = Math.floor(diff / 60_000)
  if (min < 1) return 'Just now'
  if (min < 60) return `${min} min ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return hr === 1 ? '1 hour ago' : `${hr} hours ago`
  const day = Math.floor(hr / 24)
  return day === 1 ? 'Yesterday' : `${day} days ago`
}

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Music() {
  const {
    songs,
    playlists,
    favoriteSongs,
    recentSongs,
    forYouPlaylists,
    isFavorite,
    toggleFavorite,
    createPlaylist,
    deletePlaylist,
    playSong,
    removeFromRecent,
    songsByMood,
    songsByGenre,
  } = useMusic()

  const [chip, setChip] = useState<ChipId>('forYou')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Playlist | null>(null)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

  const [nowPlaying, setNowPlaying] = useState<Song | null>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (playing && nowPlaying) {
      timer.current = window.setInterval(() => setElapsed((e) => e + 1), 1000)
    }
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [playing, nowPlaying])

  useEffect(() => {
    if (nowPlaying && elapsed >= nowPlaying.durationSec) {
      setElapsed(0)
    }
  }, [elapsed, nowPlaying])

  const q = query.trim().toLowerCase()
  const matchSong = (s: Song) =>
    !q || s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
  const matchPlaylist = (p: Playlist) =>
    !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)

  const visibleRecent = useMemo(
    () => recentSongs.filter(matchSong),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recentSongs, q],
  )

  const startSong = (song: Song) => {
    const played = playSong(song.id)
    if (played) {
      setNowPlaying(played)
      setPlaying(true)
      setElapsed(0)
    }
  }

  const skip = (dir: 1 | -1) => {
    if (!nowPlaying) return
    const index = songs.findIndex((s) => s.id === nowPlaying.id)
    const next = songs[(index + dir + songs.length) % songs.length]
    startSong(next)
  }

  return (
    <div className="music-page">
      <header className="music-head">
        <div>
          <h1>Music</h1>
          <p>Your sound, your mood, your moment ❤️</p>
        </div>
        <div className="music-head-actions">
          <button
            type="button"
            className="music-icon-btn"
            aria-label="Search music"
            onClick={() => setSearchOpen((o) => !o)}
          >
            🔍
          </button>
          <button type="button" className="music-new" onClick={() => setCreateOpen(true)}>
            + New playlist
          </button>
        </div>
      </header>

      <section className="music-intro">
        <div>
          <h2>✦ A little music for you</h2>
          <p>
            Relax, focus, or just enjoy. Here are some songs and playlists picked
            for you based on your mood and interests.
          </p>
        </div>
        <span className="music-mascot" aria-hidden="true">🎧</span>
      </section>

      <div className="music-chips" role="tablist" aria-label="Music views">
        {CHIPS.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={chip === c.id}
            className={`music-chip${chip === c.id ? ' is-active' : ''}`}
            onClick={() => setChip(c.id)}
          >
            <span aria-hidden="true">{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {searchOpen && (
        <input
          className="music-search"
          type="search"
          placeholder="Search songs, artists, playlists…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search music"
          autoFocus
        />
      )}

      {chip === 'forYou' && (
        <>
          <section>
            <div className="music-row-head">
              <h2>✦ For you today</h2>
              <button type="button" className="music-see-all" onClick={() => setChip('playlists')}>
                See all ›
              </button>
            </div>
            <div className="music-hscroll">
              {forYouPlaylists.filter(matchPlaylist).map((pl) => (
                <article key={pl.id} className="music-card">
                  <div className={`music-cover tone-${pl.tone}`}>
                    <span aria-hidden="true">{pl.emoji}</span>
                    <button
                      type="button"
                      className="music-play-fab"
                      aria-label={`Play ${pl.title}`}
                      onClick={() => {
                        const first = pl.songIds[0]
                        const song = songs.find((s) => s.id === first)
                        if (song) startSong(song)
                      }}
                    >
                      ▶
                    </button>
                  </div>
                  <h3>{pl.title}</h3>
                  <p>{pl.description}</p>
                  <p className="music-count">{pl.songIds.length} songs</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="music-row-head">
              <h2>🎵 Your playlists</h2>
              <button type="button" className="music-see-all" onClick={() => setChip('playlists')}>
                See all ›
              </button>
            </div>
            <div className="music-playlist-grid">
              <button type="button" className="music-create" onClick={() => setCreateOpen(true)}>
                <span className="music-create-plus" aria-hidden="true">＋</span>
                Create playlist
              </button>
              {playlists.slice(0, 4).filter(matchPlaylist).map((pl) => (
                <PlaylistTile
                  key={pl.id}
                  playlist={pl}
                  onPlay={() => {
                    const first = pl.songIds[0]
                    const song = songs.find((s) => s.id === first)
                    if (song) startSong(song)
                  }}
                  menuOpen={menuOpenId === pl.id}
                  onToggleMenu={() => setMenuOpenId(menuOpenId === pl.id ? null : pl.id)}
                  onDelete={() => { setMenuOpenId(null); setDeleteTarget(pl) }}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="music-row-head">
              <h2>🕘 Recently played</h2>
            </div>
            {visibleRecent.length === 0 ? (
              <p className="music-empty">Songs you play will show up here.</p>
            ) : (
              visibleRecent.slice(0, 6).map((song) => (
                <SongRow
                  key={song.id}
                  song={song}
                  meta={timeAgo(song.playedAt)}
                  isFavorite={isFavorite(song.id)}
                  onPlay={() => startSong(song)}
                  onToggleFavorite={() => toggleFavorite(song.id)}
                  onRemove={() => removeFromRecent(song.id)}
                  menuOpen={menuOpenId === song.id}
                  onToggleMenu={() => setMenuOpenId(menuOpenId === song.id ? null : song.id)}
                />
              ))
            )}
          </section>
        </>
      )}

      {chip === 'playlists' && (
        <section>
          <h2 className="music-section-title">🎵 Your playlists</h2>
          <div className="music-playlist-grid">
            <button type="button" className="music-create" onClick={() => setCreateOpen(true)}>
              <span className="music-create-plus" aria-hidden="true">＋</span>
              Create playlist
            </button>
            {playlists.filter(matchPlaylist).map((pl) => (
              <PlaylistTile
                key={pl.id}
                playlist={pl}
                onPlay={() => {
                  const first = pl.songIds[0]
                  const song = songs.find((s) => s.id === first)
                  if (song) startSong(song)
                }}
                menuOpen={menuOpenId === pl.id}
                onToggleMenu={() => setMenuOpenId(menuOpenId === pl.id ? null : pl.id)}
                onDelete={() => { setMenuOpenId(null); setDeleteTarget(pl) }}
              />
            ))}
          </div>
        </section>
      )}

      {chip === 'moods' && (
        <section>
          <h2 className="music-section-title">☀ Browse by mood</h2>
          {Object.entries(songsByMood).map(([mood, list]) => {
            const visible = list.filter(matchSong)
            if (visible.length === 0) return null
            return (
              <div key={mood} className="music-group">
                <h3>{mood}</h3>
                {visible.map((song) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    meta={`${song.artist} · ${formatDuration(song.durationSec)}`}
                    isFavorite={isFavorite(song.id)}
                    onPlay={() => startSong(song)}
                    onToggleFavorite={() => toggleFavorite(song.id)}
                    menuOpen={menuOpenId === song.id}
                    onToggleMenu={() => setMenuOpenId(menuOpenId === song.id ? null : song.id)}
                  />
                ))}
              </div>
            )
          })}
        </section>
      )}

      {chip === 'genres' && (
        <section>
          <h2 className="music-section-title">▮▮ Browse by genre</h2>
          {Object.entries(songsByGenre).map(([genre, list]) => {
            const visible = list.filter(matchSong)
            if (visible.length === 0) return null
            return (
              <div key={genre} className="music-group">
                <h3>{genre}</h3>
                {visible.map((song) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    meta={`${song.artist} · ${formatDuration(song.durationSec)}`}
                    isFavorite={isFavorite(song.id)}
                    onPlay={() => startSong(song)}
                    onToggleFavorite={() => toggleFavorite(song.id)}
                    menuOpen={menuOpenId === song.id}
                    onToggleMenu={() => setMenuOpenId(menuOpenId === song.id ? null : song.id)}
                  />
                ))}
              </div>
            )
          })}
        </section>
      )}

      {chip === 'favorites' && (
        <section>
          <h2 className="music-section-title">★ Your favorites</h2>
          {favoriteSongs.filter(matchSong).length === 0 ? (
            <p className="music-empty">
              Tap the ♡ on any song to save it here.
            </p>
          ) : (
            favoriteSongs.filter(matchSong).map((song) => (
              <SongRow
                key={song.id}
                song={song}
                meta={`${song.artist} · ${formatDuration(song.durationSec)}`}
                isFavorite
                onPlay={() => startSong(song)}
                onToggleFavorite={() => toggleFavorite(song.id)}
                menuOpen={menuOpenId === song.id}
                onToggleMenu={() => setMenuOpenId(menuOpenId === song.id ? null : song.id)}
              />
            ))
          )}
        </section>
      )}

      {nowPlaying && (
        <div className="music-player" role="status" aria-label="Now playing">
          <div className={`music-player-art tone-${nowPlaying.tone}`} aria-hidden="true">
            {nowPlaying.emoji}
          </div>
          <div className="music-player-meta">
            <h3>{nowPlaying.title}</h3>
            <p>{nowPlaying.artist}</p>
            <div className="music-progress">
              <span style={{ width: `${Math.min(100, (elapsed / nowPlaying.durationSec) * 100)}%` }} />
            </div>
            <p className="music-player-time">
              {formatDuration(Math.min(elapsed, nowPlaying.durationSec))} / {formatDuration(nowPlaying.durationSec)}
            </p>
          </div>
          <div className="music-player-controls">
            <button type="button" aria-label="Previous" onClick={() => skip(-1)}>⏮</button>
            <button
              type="button"
              className="music-player-play"
              aria-label={playing ? 'Pause' : 'Play'}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? '❚❚' : '▶'}
            </button>
            <button type="button" aria-label="Next" onClick={() => skip(1)}>⏭</button>
            <button
              type="button"
              aria-label="Toggle favorite"
              aria-pressed={isFavorite(nowPlaying.id)}
              onClick={() => toggleFavorite(nowPlaying.id)}
            >
              {isFavorite(nowPlaying.id) ? '❤️' : '♡'}
            </button>
          </div>
        </div>
      )}

      {createOpen && (
        <div className="music-modal-backdrop" role="dialog" aria-modal="true" aria-label="New playlist">
          <div className="music-modal">
            <h3>New playlist</h3>
            <input
              className="music-modal-input"
              placeholder="Playlist name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div className="music-modal-actions">
              <button type="button" className="music-modal-cancel" onClick={() => { setCreateOpen(false); setNewTitle('') }}>
                Cancel
              </button>
              <button
                type="button"
                className="music-modal-confirm"
                disabled={!newTitle.trim()}
                onClick={() => {
                  createPlaylist(newTitle.trim())
                  setCreateOpen(false)
                  setNewTitle('')
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="music-modal-backdrop" role="dialog" aria-modal="true" aria-label="Delete playlist?">
          <div className="music-modal">
            <h3>Delete playlist?</h3>
            <p>“{deleteTarget.title}” will be permanently deleted.</p>
            <div className="music-modal-actions">
              <button type="button" className="music-modal-cancel" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="music-modal-delete"
                onClick={() => { deletePlaylist(deleteTarget.id); setDeleteTarget(null) }}
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

function PlaylistTile({
  playlist,
  onPlay,
  menuOpen,
  onToggleMenu,
  onDelete,
}: {
  playlist: Playlist
  onPlay: () => void
  menuOpen: boolean
  onToggleMenu: () => void
  onDelete: () => void
}) {
  return (
    <article className="music-playlist-tile">
      <div className={`music-pl-cover tone-${playlist.tone}`}>
        <span aria-hidden="true">{playlist.emoji}</span>
        <button type="button" className="music-pl-play" aria-label={`Play ${playlist.title}`} onClick={onPlay}>
          ▶
        </button>
        <button
          type="button"
          className="music-pl-menu-btn"
          aria-label={`Options for ${playlist.title}`}
          onClick={onToggleMenu}
        >
          ⋮
        </button>
        {menuOpen && (
          <div className="music-menu" role="menu">
            <button type="button" onClick={() => { onToggleMenu(); onPlay() }}>Play</button>
            <button type="button" className="music-menu-danger" onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
      <h3>{playlist.title}</h3>
      <p>{playlist.songIds.length} songs</p>
    </article>
  )
}

function SongRow({
  song,
  meta,
  isFavorite,
  onPlay,
  onToggleFavorite,
  onRemove,
  menuOpen,
  onToggleMenu,
}: {
  song: Song | RecentSong
  meta: string
  isFavorite: boolean
  onPlay: () => void
  onToggleFavorite: () => void
  onRemove?: () => void
  menuOpen: boolean
  onToggleMenu: () => void
}) {
  return (
    <article className="song-row">
      <button type="button" className={`song-art tone-${song.tone}`} aria-label={`Play ${song.title}`} onClick={onPlay}>
        <span aria-hidden="true">{song.emoji}</span>
      </button>
      <button type="button" className="song-main" onClick={onPlay}>
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </button>
      <span className="song-meta">{meta}</span>
      <div className="song-actions">
        <button
          type="button"
          className="song-heart"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
          onClick={onToggleFavorite}
        >
          {isFavorite ? '❤️' : '♡'}
        </button>
        <button type="button" className="song-menu-btn" aria-label={`Options for ${song.title}`} onClick={onToggleMenu}>
          ⋯
        </button>
        {menuOpen && (
          <div className="music-menu" role="menu">
            <button type="button" onClick={() => { onToggleMenu(); onPlay() }}>Play</button>
            <button type="button" onClick={() => { onToggleMenu(); onToggleFavorite() }}>
              {isFavorite ? 'Remove favorite' : 'Add to favorites'}
            </button>
            {onRemove && (
              <button type="button" className="music-menu-danger" onClick={() => { onToggleMenu(); onRemove() }}>
                Remove from history
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
