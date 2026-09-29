import type { ReactNode } from 'react'
import Card from '../ui/Card'
import './AIInsightCard.css'

type AIInsightCardProps = {
  icon?: ReactNode
  title: string
  children: ReactNode
  action?: ReactNode
  mood?: 'positive' | 'neutral' | 'gentle'
}

export default function AIInsightCard({
  icon = '✦',
  title,
  children,
  action,
  mood = 'neutral',
}: AIInsightCardProps) {
  return (
    <Card className={`grace-ai-card grace-ai-card--${mood}`} padding="lg">
      <div className="grace-ai-card-header">
        <span className="grace-ai-card-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="grace-ai-card-label">Grace AI</span>
      </div>
      <h3 className="grace-ai-card-title">{title}</h3>
      <div className="grace-ai-card-body">{children}</div>
      {action && <div className="grace-ai-card-action">{action}</div>}
    </Card>
  )
}
