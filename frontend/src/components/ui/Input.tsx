import type { InputHTMLAttributes } from 'react'
import './Input.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
}

export default function Input({
  label,
  error,
  hint,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name || label

  return (
    <div className="grace-input-wrapper">
      {label && (
        <label className="grace-input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'grace-input',
          error ? 'grace-input--error' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {error && <p className="grace-input-error">{error}</p>}
      {!error && hint && <p className="grace-input-hint">{hint}</p>}
    </div>
  )
}
