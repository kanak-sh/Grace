import type { ReactNode } from 'react'
import './StatCard.css'

type StatCardProps = {
  icon?: ReactNode
  label: string
  value: string | number
  trend?: string
  trendDirection?: 'up' | 'down' | 'neutral'
  color?: 'primary' | 'accent' | 'lavender' | 'gold'
}

export default function StatCard({
  icon,
  label,
  value,
  trend,
  trendDirection = 'neutral',
  color = 'primary',
}: StatCardProps) {
  return (
    <div className={`grace-stat-card grace-stat-card--${color}`}>
      {icon && <div className="grace-stat-card-icon" aria-hidden="true">{icon}</div>}
      <div className="grace-stat-card-content">
        <p className="grace-stat-card-label">{label}</p>
        <p className="grace-stat-card-value">{value}</p>
        {trend && (
          <p className={`grace-stat-card-trend grace-stat-card-trend--${trendDirection}`}>
            {trend}
          </p>
        )}
      </div>
    </div>
  )
}
