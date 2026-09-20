import PixelButton from '../../components/PixelButton'
import PixelIcon from '../../components/PixelIcon'
import { socials } from '../data/socials'
import './SocialLinks.css'

function SocialLinks() {
  return (
    <div className="socials">
      <h3>Socials</h3>
      <div className="social_links">
        {socials.map(({ label, href, icon }) => (
          <PixelButton
            key={label}
            href={href}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <PixelIcon name={icon} />
            {label}
          </PixelButton>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks
