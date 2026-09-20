import { sprites } from '../sprites'
import './PixelSprite.css'

// Draws a sprite from src/sprites/index.js at an integer `scale` (keeps every source pixel crisp).
function PixelSprite({ name, scale = 4, label = '', className = '' }) {
  const sprite = sprites[name]
  if (!sprite) return null

  const { src, file, frameWidth, frameHeight, frames, frameMs, alwaysAnimate } = sprite
  const width = frameWidth * scale
  const height = frameHeight * scale
  const classes = `pixel_sprite ${className}`.trim()
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }

  // No art yet: labelled box so the layout can be checked
  if (!src) {
    return (
      <div className={`${classes} pixel_sprite_placeholder`} style={{ width, height }} {...a11y}>
        <span>{file}</span>
      </div>
    )
  }

  const style = {
    width,
    height,
    backgroundImage: `url(${src})`,
    backgroundSize: `${frames * width}px ${height}px`,
    '--sprite-end': `${-frames * width}px`,
  }

  if (frames > 1) {
    style.animationDuration = `${frames * frameMs}ms`
    style.animationTimingFunction = `steps(${frames})`
  }

  return <div className={`${classes}${frames > 1 ? ' pixel_sprite_animated' : ''}${alwaysAnimate ? ' pixel_sprite_always' : ''}`} style={style} {...a11y} />
}

export default PixelSprite
