import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './IconButton.css'

type IconButtonVariant = 'primary' | 'secondary' | 'ghost'
type IconButtonSize = 'sm' | 'md' | 'lg'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IconButtonVariant
  size?: IconButtonSize
  label: string
  children: ReactNode
}

export default function IconButton({
  variant = 'secondary',
  size = 'md',
  label,
  children,
  className = '',
  ...props
}: IconButtonProps) {
  const classes = [
    'grace-icon-btn',
    `grace-icon-btn--${variant}`,
    `grace-icon-btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} aria-label={label} {...props}>
      {children}
    </button>
  )
}
