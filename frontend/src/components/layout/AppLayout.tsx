
import { Outlet } from 'react-router'
import BottomNav from './BottomNav'
import { useTheme } from '../theme/ThemeContext'

export default function AppLayout() {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <div className="app-shell">
      <div className="app-blobs" aria-hidden="true">
        <span className="blob blob-teal" />
        <span className="blob blob-lavender-left" />
        <span className="blob blob-blue" />
        <span className="blob blob-peach" />
      </div>

      <header className="app-header">
        <span className="app-logo">
          grace<span className="app-logo-dot">.</span>
        </span>

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
            {resolvedTheme === 'light' ? '☾' : '☀'}
          </button>

          <button className="bell-button" type="button" aria-label="Notifications">
            🔔
          </button>
        </div>
      </header>

      <main className="app-content" id="main-content">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  )
}