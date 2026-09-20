import PixelSprite from '../../components/PixelSprite'
import './HeroAvatar.css'

function HeroAvatar() {
  return (
    <div className="hero_avatar">
      <PixelSprite name="avatar" scale={4} label="Pixel art avatar of Shivam" />
      <div className="hero_avatar_ground" aria-hidden="true" />
    </div>
  )
}

export default HeroAvatar
