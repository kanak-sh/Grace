import type { ReactNode } from 'react'
import './SectionHeader.css'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="grace-section-header">
      <div className="grace-section-header-text">
        <h2 className="grace-section-header-title">{title}</h2>
        {subtitle && <p className="grace-section-header-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="grace-section-header-action">{action}</div>}
    </div>
  )
}
