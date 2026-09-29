import './MoodChip.css'

type MoodChipProps = {
  label: string
  icon?: string
  selected?: boolean
  onClick?: () => void
  color?: 'primary' | 'accent' | 'lavender' | 'gold'
}

export default function MoodChip({
  label,
  icon,
  selected = false,
  onClick,
  color = 'primary',
}: MoodChipProps) {
  return (
    <button
      type="button"
      className={[
        'grace-mood-chip',
        `grace-mood-chip--${color}`,
        selected ? 'grace-mood-chip--selected' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      aria-pressed={selected}
    >
      {icon && <span className="grace-mood-chip-icon" aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </button>
  )
}
