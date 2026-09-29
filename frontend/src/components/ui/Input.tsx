import type { InputHTMLAttributes, ReactNode } from 'react'
import './Input.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  icon?: ReactNode
}

export default function Input({
  label,
  hint,
  error,
  icon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const classes = [
    'grace-input-wrapper',
    error ? 'grace-input-wrapper--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label && (
        <label className="grace-input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="grace-input-field">
        {icon && <span className="grace-input-icon" aria-hidden="true">{icon}</span>}
        <input
          id={inputId}
          className="grace-input"
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
      </div>
      {error && (
        <p className="grace-input-error" id={`${inputId}-error`} role="alert">
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="grace-input-hint" id={`${inputId}-hint`}>
          {hint}
        </p>
      )}
    </div>
  )
}
