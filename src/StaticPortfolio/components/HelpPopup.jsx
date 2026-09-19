import { useEffect, useRef } from 'react'
import PixelPanel from '../../components/PixelPanel'
import PixelButton from '../../components/PixelButton'
import { helpTips } from '../data/helpTips'
import './HelpPopup.css'

function HelpPopup({ onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="help_popup_backdrop" onClick={onClose}>
      <PixelPanel
        className="help_popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help_popup_title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="help_popup_title">How to navigate</h2>
        <ul>
          {helpTips.map(({ label, text }) => (
            <li key={label}>
              <strong>{label}</strong> {text}
            </li>
          ))}
        </ul>
        <PixelButton as="button" type="button" variant="primary" ref={closeRef} onClick={onClose}>
          Got it
        </PixelButton>
      </PixelPanel>
    </div>
  )
}

export default HelpPopup
