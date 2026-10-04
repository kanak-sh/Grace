export interface Song {
  id: string
  title: string
  artist: string
  durationSec: number
  emoji: string
  tone: 'gold' | 'lavender' | 'blue' | 'accent' | 'primary'
  mood: string
  genre: string
}

export interface Playlist {
  id: string
  title: string
  description: string
  emoji: string
  tone: 'gold' | 'lavender' | 'blue' | 'accent' | 'primary'
  songIds: string[]
}

export interface RecentEntry {
  songId: string
  playedAt: string // ISO timestamp
}

interface MusicData {
  playlists: Playlist[]
  favorites: string[]
  recentlyPlayed: RecentEntry[]
}

const STORAGE_KEY = 'grace-music'
const CHANGE_EVENT = 'grace-music-changed'

export const SONGS: Song[] = [
  { id: 'song-sunflower', title: 'Sunflower', artist: 'Post Malone, Swae Lee', durationSec: 158, emoji: '🌻', tone: 'gold', mood: 'Feel Good', genre: 'Pop' },
  { id: 'song-until', title: 'Until I Found You', artist: 'Stephen Sanchez', durationSec: 192, emoji: '☁️', tone: 'lavender', mood: 'Cozy Evenings', genre: 'Indie' },
  { id: 'song-another', title: 'Another Love', artist: 'Tom Odell', durationSec: 234, emoji: '🌙', tone: 'blue', mood: 'Chill', genre: 'Soul' },
  { id: 'song-river', title: 'River Flows', artist: 'Echo Vale', durationSec: 201, emoji: '🌊', tone: 'blue', mood: 'Calm', genre: 'Ambient' },
  { id: 'song-golden', title: 'Golden Hour', artist: 'Sunny Hills', durationSec: 184, emoji: '🌅', tone: 'gold', mood: 'Feel Good', genre: 'Pop' },
  { id: 'song-paper', title: 'Paper Planes', artist: 'Fox & Friends', durationSec: 172, emoji: '✈️', tone: 'accent', mood: 'Energy', genre: 'Indie' },
  { id: 'song-night', title: 'Night Drive', artist: 'Neon Parade', durationSec: 246, emoji: '🚗', tone: 'lavender', mood: 'Night', genre: 'Synthwave' },
  { id: 'song-bloom', title: 'Bloom', artist: 'Meadow Lane', durationSec: 165, emoji: '🌷', tone: 'accent', mood: 'Calm', genre: 'Acoustic' },
  { id: 'song-rain', title: 'Cozy Rain', artist: 'Window Seats', durationSec: 210, emoji: '🌧️', tone: 'blue', mood: 'Focus', genre: 'Ambient' },
  { id: 'song-sunset', title: 'Sunset Meadow', artist: 'Golden Field', durationSec: 178, emoji: '🌄', tone: 'gold', mood: 'Feel Good', genre: 'Acoustic' },
  { id: 'song-study', title: 'Midnight Study', artist: 'Lo-Fi Library', durationSec: 187, emoji: '📖', tone: 'primary', mood: 'Focus', genre: 'Lo-Fi' },
  { id: 'song-alive', title: 'Feel Alive', artist: 'Bright Ways', durationSec: 169, emoji: '✨', tone: 'accent', mood: 'Energy', genre: 'Pop' },
]

export function getSong(id: string): Song | undefined {
  return SONGS.find((s) => s.id === id)
}

function minutesAgo(min: number): string {
  return new Date(Date.now() - min * 60_000).toISOString()
}

function seedData(): MusicData {
  return {
    playlists: [
      { id: 'pl-morning', title: 'Morning Rise', description: 'Gentle tunes to start your day', emoji: '☀️', tone: 'gold', songIds: ['song-sunflower', 'song-golden', 'song-sunset'] },
      { id: 'pl-focus', title: 'Deep Focus', description: 'Ambient sounds for concentration', emoji: '🎧', tone: 'lavender', songIds: ['song-rain', 'song-study', 'song-river'] },
      { id: 'pl-feelgood', title: 'Feel Good', description: 'Uplifting tracks for a boost', emoji: '♡', tone: 'accent', songIds: ['song-alive', 'song-sunflower', 'song-golden'] },
      { id: 'pl-night', title: 'Night Wind', description: 'Calm melodies for unwinding', emoji: '☾', tone: 'blue', songIds: ['song-night', 'song-another', 'song-river'] },
      { id: 'pl-fav', title: 'My Favorites', description: 'Songs close to your heart', emoji: '❤️', tone: 'accent', songIds: ['song-until', 'song-another'] },
      { id: 'pl-study', title: 'Study Time', description: 'Beats for deep work', emoji: '📚', tone: 'primary', songIds: ['song-study', 'song-rain'] },
      { id: 'pl-chill', title: 'Chill Vibes', description: 'Slow down and breathe', emoji: '🌴', tone: 'primary', songIds: ['song-bloom', 'song-river'] },
      { id: 'pl-selfcare', title: 'Self Care', description: 'Soft songs for you', emoji: '🕯️', tone: 'lavender', songIds: ['song-bloom', 'song-until'] },
    ],
    favorites: ['song-sunflower', 'song-until'],
    recentlyPlayed: [
      { songId: 'song-sunflower', playedAt: minutesAgo(2) },
      { songId: 'song-until', playedAt: minutesAgo(15) },
      { songId: 'song-another', playedAt: minutesAgo(65) },
    ],
  }
}

function saveData(data: MusicData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT))
}

export function loadMusic(): MusicData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedData()
      saveData(seeded)
      return seeded
    }
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      Array.isArray(parsed.playlists) &&
      Array.isArray(parsed.favorites) &&
      Array.isArray(parsed.recentlyPlayed)
    ) {
      return parsed as MusicData
    }
    return seedData()
  } catch {
    return seedData()
  }
}

export function createPlaylist(title: string): Playlist {
  const playlist: Playlist = {
    id: `pl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    description: 'Your playlist',
    emoji: '🎵',
    tone: 'primary',
    songIds: [],
  }
  const data = loadMusic()
  saveData({ ...data, playlists: [playlist, ...data.playlists] })
  return playlist
}

export function deletePlaylist(id: string) {
  const data = loadMusic()
  saveData({ ...data, playlists: data.playlists.filter((p) => p.id !== id) })
}

export function toggleFavoriteId(songId: string) {
  const data = loadMusic()
  const favorites = data.favorites.includes(songId)
    ? data.favorites.filter((id) => id !== songId)
    : [songId, ...data.favorites]
  saveData({ ...data, favorites })
}

export function recordPlay(songId: string) {
  const data = loadMusic()
  const recentlyPlayed = [
    { songId, playedAt: new Date().toISOString() },
    ...data.recentlyPlayed.filter((r) => r.songId !== songId),
  ].slice(0, 20)
  saveData({ ...data, recentlyPlayed })
}

export function removeFromRecent(songId: string) {
  const data = loadMusic()
  saveData({
    ...data,
    recentlyPlayed: data.recentlyPlayed.filter((r) => r.songId !== songId),
  })
}

export function subscribeMusic(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}
