import type { ReactNode } from 'react'
import Card from '../ui/Card'
import './FeatureCard.css'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
  color?: 'primary' | 'accent' | 'lavender' | 'gold'
  onClick?: () => void
  children?: ReactNode
}

export default function FeatureCard({
  icon,
  title,
  description,
  color = 'primary',
  onClick,
  children,
}: FeatureCardProps) {
  return (
    <Card
      className={`grace-feature-card grace-feature-card--${color}`}
      padding="lg"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="grace-feature-card-icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="grace-feature-card-title">{title}</h3>
      <p className="grace-feature-card-desc">{description}</p>
      {children}
    </Card>
  )
}
