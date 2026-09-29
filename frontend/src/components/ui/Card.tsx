import type { HTMLAttributes, ReactNode } from 'react'
import './Card.css'

type CardVariant = 'elevated' | 'outlined' | 'filled'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Card({
  variant = 'elevated',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) {
  const classes = [
    'grace-card',
    `grace-card--${variant}`,
    `grace-card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
