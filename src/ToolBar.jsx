import volon from './assets/icons/volumeon.png'
import voloff from './assets/icons/volumeoff.png'
import fullscreenon from './assets/icons/fullscreenon.png'
import fullscreenoff from './assets/icons/fullscreenoff.png'
import questionmark from './assets/icons/helpmark.png'
import { useState } from 'react'

function ToolBar({ setIsMuted, isMuted, onHelp }) {

  //Boolean state to detect when screen is fullscreen
  const [fullscreen, setFullScreen] = useState(false);

  const toggleFullscreen = () => {
    // If the site is not fullscreen then request it
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Error attempting to enable fullscreen:", err.message);
      });
      setFullScreen(true);
    }
    // If it is in fullscreen, exit full screen mode
    else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };

  return (<div className="settings_icons">

    {/* Mute/UnMute button */}
    <button className="toolbar_button"
      onClick={() => { setIsMuted(!isMuted) }}>
      {/* Conditional Rendering based on isMuted State */}
      {isMuted ?
        <img src={voloff} alt="volume off" className="pixel_icon" />
        : <img src={volon} alt="volume on" className="pixel_icon" />}
    </button>

    {/* Fullscreen button */}
    <button className="toolbar_button"
      onClick={() => { toggleFullscreen() }}>
      {/* Conditional maximize/minimize icons based on fullscreen state */}
      {fullscreen ?
        <img src={fullscreenoff} alt="Fullscreen Off" className="pixel_icon" />
        : <img src={fullscreenon} alt="Fullscreen On" className="pixel_icon" />
      }
    </button>

    {/* Help button always stays */}
    <button className="toolbar_button" onClick={onHelp}>
      <img src={questionmark} alt="help" className="pixel_icon" />
    </button>

  </div>)
}

export default ToolBar;