
import { Outlet } from 'react-router'
import BottomNav from './BottomNav'
import { useTheme } from '../theme/ThemeContext'

export default function AppLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-logo">grace.</span>

        <div className="header-actions">
          <span className="app-header-label">
            Your personal space
          </span>

          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'light'
                ? 'Switch to dark mode'
                : 'Switch to light mode'
            }
          >
            {theme === 'light' ? '☾' : '☀'}
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