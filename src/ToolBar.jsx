import { useState } from 'react'
import PixelButton from './components/PixelButton'
import PixelIcon from './components/PixelIcon'

function ToolBar({ setIsMuted, isMuted, onHelp, viewMode, setViewMode }) {

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

  return (<aside className="settings_icons" aria-label="System controls">
    {/* Mute/UnMute button */}
    <PixelButton as="button" type="button" variant="icon"
      aria-label={isMuted ? 'Turn sound on' : 'Mute sound'}
      title={isMuted ? 'Turn sound on' : 'Mute sound'}
      onClick={() => { setIsMuted(!isMuted) }}>
      <PixelIcon name={isMuted ? 'volumeOff' : 'volumeOn'} />
    </PixelButton>

    {/* Fullscreen button */}
    <PixelButton as="button" type="button" variant="icon"
      aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      onClick={() => { toggleFullscreen() }}>
      <PixelIcon name={fullscreen ? 'fullscreenExit' : 'fullscreenEnter'} />
    </PixelButton>

    <PixelButton as="button" type="button" variant="icon"
      active={viewMode === 'console'}
      aria-pressed={viewMode === 'console'}
      aria-label="Console view"
      title="Console view"
      onClick={() => setViewMode('console')}
    >
      <PixelIcon name="console" />
    </PixelButton>

    <PixelButton as="button" type="button" variant="icon"
      active={viewMode === 'static'}
      aria-pressed={viewMode === 'static'}
      aria-label="Static view"
      title="Static view"
      onClick={() => setViewMode('static')}
    >
      <PixelIcon name="page" />
    </PixelButton>

    {/* Help button always stays */}
    <PixelButton as="button" type="button" variant="icon" aria-label="Open help" title="Open help" onClick={onHelp}>
      <PixelIcon name="help" />
    </PixelButton>

  </aside>)
}

export default ToolBar;
