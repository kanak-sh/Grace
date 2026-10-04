import { useSyncExternalStore } from 'react'
import {
  SONGS,
  createPlaylist,
  deletePlaylist,
  getSong,
  loadMusic,
  recordPlay,
  removeFromRecent,
  subscribeMusic,
  toggleFavoriteId,
  type Playlist,
  type Song,
} from '../services/musicStorage'

let cachedRaw: string | null = null
let cachedSnapshot: ReturnType<typeof loadMusic> | null = null

function getSnapshot() {
  try {
    const raw = localStorage.getItem('grace-music')
    if (raw === cachedRaw && cachedSnapshot) return cachedSnapshot
    cachedRaw = raw
    cachedSnapshot = loadMusic()
    return cachedSnapshot
  } catch {
    return loadMusic()
  }
}

export interface RecentSong extends Song {
  playedAt: string
}

export interface UseMusicResult {
  songs: Song[]
  playlists: Playlist[]
  favoriteSongs: Song[]
  recentSongs: RecentSong[]
  forYouPlaylists: Playlist[]
  isFavorite: (songId: string) => boolean
  toggleFavorite: (songId: string) => void
  createPlaylist: (title: string) => Playlist
  deletePlaylist: (id: string) => void
  playSong: (songId: string) => Song | null
  removeFromRecent: (songId: string) => void
  songsByMood: Record<string, Song[]>
  songsByGenre: Record<string, Song[]>
}

export function useMusic(): UseMusicResult {
  const data = useSyncExternalStore(subscribeMusic, getSnapshot)

  const favoriteSongs = data.favorites
    .map((id) => getSong(id))
    .filter((s): s is Song => Boolean(s))

  const recentSongs: RecentSong[] = data.recentlyPlayed
    .map((entry) => {
      const song = getSong(entry.songId)
      return song ? { ...song, playedAt: entry.playedAt } : null
    })
    .filter((s): s is RecentSong => s !== null)

  const songsByMood: Record<string, Song[]> = {}
  const songsByGenre: Record<string, Song[]> = {}
  for (const song of SONGS) {
    ;(songsByMood[song.mood] ??= []).push(song)
    ;(songsByGenre[song.genre] ??= []).push(song)
  }

  return {
    songs: SONGS,
    playlists: data.playlists,
    favoriteSongs,
    recentSongs,
    forYouPlaylists: data.playlists.slice(0, 4),
    isFavorite: (songId) => data.favorites.includes(songId),
    toggleFavorite: toggleFavoriteId,
    createPlaylist,
    deletePlaylist,
    playSong: (songId) => {
      const song = getSong(songId)
      if (song) recordPlay(songId)
      return song ?? null
    },
    removeFromRecent,
    songsByMood,
    songsByGenre,
  }
}
