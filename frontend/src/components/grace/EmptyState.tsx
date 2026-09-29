import type { ReactNode } from 'react'
import './EmptyState.css'

type EmptyStateProps = {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({
  icon = '✿',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="grace-empty-state">
      <span className="grace-empty-state-icon" aria-hidden="true">
        {icon}
      </span>
      <h3 className="grace-empty-state-title">{title}</h3>
      {description && (
        <p className="grace-empty-state-desc">{description}</p>
      )}
      {action && <div className="grace-empty-state-action">{action}</div>}
    </div>
  )
}
