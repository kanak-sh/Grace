import type { HTMLAttributes, ReactNode } from 'react'
import './Badge.css'

type BadgeVariant = 'primary' | 'accent' | 'lavender' | 'gold' | 'success' | 'warning' | 'error' | 'neutral'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  dot?: boolean
  children: ReactNode
}

export default function Badge({
  variant = 'neutral',
  dot = false,
  children,
  className = '',
  ...props
}: BadgeProps) {
  const classes = [
    'grace-badge',
    `grace-badge--${variant}`,
    dot ? 'grace-badge--dot' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...props}>
      {dot && <span className="grace-badge-dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
