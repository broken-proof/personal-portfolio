import volon from './assets/volumeon.png'
import voloff from './assets/volumeoff.png'
import fullscreenon from './assets/fullscreenon.png'
import fullscreenoff from './assets/fullscreenoff.png'
import questionmark from './assets/helpmark.png'
import { useState } from 'react'

function ToolBar({ setIsMuted, isMuted, onHelp }) {

  const [fullscreen, setFullScreen] = useState(false);

  const toggleFullscreen = () => {
    // If the site is NOT in fullscreen, request it
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Error attempting to enable fullscreen:", err.message);
      });
      setFullScreen(true);
    }
    // If it IS in fullscreen, exit it
    else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };

  return (<div className="settings_icons">
    <button className="toolbar_button"
      onClick={() => { setIsMuted(!isMuted) }}>
      {isMuted ?
        <img src={voloff} alt="volume off" className="pixel_icon" />
        : <img src={volon} alt="volume on" className="pixel_icon" />}
    </button>
    <button className="toolbar_button"
      onClick={() => { toggleFullscreen() }}>
      {fullscreen ?
        <img src={fullscreenoff} alt="Fullscreen Off" className="pixel_icon" />
        : <img src={fullscreenon} alt="Fullscreen On" className="pixel_icon" />
      }
    </button>

    <button className="toolbar_button" onClick={onHelp}>
      <img src={questionmark} alt="help" className="pixel_icon" />
    </button>

  </div>)
}

export default ToolBar;