import { useState } from 'react'
import './Avatar.css'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

type AvatarProps = {
  src?: string
  alt?: string
  name: string
  size?: AvatarSize
  status?: 'online' | 'away' | 'offline'
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
}

export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const px = sizeMap[size]
  const showImage = src && !imgError

  return (
    <div
      className="grace-avatar"
      style={{ width: px, height: px }}
      role="img"
      aria-label={alt || name}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name}
          className="grace-avatar-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="grace-avatar-fallback">{getInitials(name)}</span>
      )}
      {status && (
        <span className={`grace-avatar-status grace-avatar-status--${status}`} />
      )}
    </div>
  )
}
