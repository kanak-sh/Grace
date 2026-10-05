
import { useState } from 'react'
import { Outlet } from 'react-router'
import BottomNav from './BottomNav'
import { useTheme } from '../theme/ThemeContext'

export default function AppLayout() {
  const { resolvedTheme, toggleTheme } = useTheme()
  // Menu bar opens as a dropdown anchored under the header
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-left">
          <button
            type="button"
            className="hamburger-button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <span className="app-logo">
            grace<span className="app-logo-dot">.</span>
          </span>
        </div>

        <div className="header-actions">
          <span className="app-header-label">
            Your personal space
          </span>

          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={
              resolvedTheme === 'light'
                ? 'Switch to dark mode'
                : 'Switch to light mode'
            }
          >
            {resolvedTheme === 'light' ? (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M20.2 14.2A8.5 8.5 0 1 1 9.8 3.8a7 7 0 0 0 10.4 10.4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="currentColor" d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM11 2h2v3h-2V2zm0 17h2v3h-2v-3zM2 11h3v2H2v-2zm17 0h3v2h-3v-2zM4.9 4.9l2.1 2.1-1.4 1.4-2.1-2.1 1.4-1.4zm12.7 12.7l2.1 2.1-1.4 1.4-2.1-2.1 1.4-1.4zM4.9 19.1l2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4zM17.6 7l2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4z" />
              </svg>
            )}
          </button>

          <button className="bell-button" type="button" aria-label="Notifications">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M6 9.5a6 6 0 0 1 12 0c0 5 2 6.5 2 6.5H4s2-1.5 2-6.5zM10 20a2.2 2.2 0 0 0 4 0" />
            </svg>
          </button>
        </div>
      </header>

      <main className="app-content" id="main-content">
        <Outlet />
      </main>

      {menuOpen && <BottomNav />}
    </div>
  )
}
