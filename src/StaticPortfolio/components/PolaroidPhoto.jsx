import frame from '../../assets/icons/pixelframe.png'
import './PolaroidPhoto.css'

// A photo shown inside the pixel polaroid frame. All fitting numbers live in PolaroidPhoto.css.
function PolaroidPhoto({ src, alt }) {
  return (
    <figure className="polaroid" style={{ backgroundImage: `url(${frame})` }}>
      <img className="polaroid_photo" src={src} alt={alt} />
    </figure>
  )
}

export default PolaroidPhoto
