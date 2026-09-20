import SpaceBackground from "./background/SpaceBackground"
import ComputerScreen from "./ComputerScreen/ComputerScreen"
import StaticPortfolio from "./StaticPortfolio/StaticPortfolio"
import { useEffect, useState } from 'react'
import { useAudioManager } from "./Sounds"
import './App.css'
import { Howler } from 'howler'
import ToolBar from "./ToolBar"
import HelpPopup from "./StaticPortfolio/components/HelpPopup"
import startbut from "./assets/icons/startbutton.png"

function App() {
  //Variable for conditional rendering of Computer Screen Component
  const [screen, screenControl] = useState("off")

  //Variable for rendering screen when help button is pressed
  const [helpRequest, setHelpRequest] = useState(0)

  //Whether the static view's help popup is showing
  const [staticHelpOpen, setStaticHelpOpen] = useState(false)

  //Display mode for the overall experience
  const [viewMode, setViewMode] = useState("console")

  //Terminal-only sound effects (power, boot, keys) play in console view and are off in static view
  const [terminalSfxOn, setTerminalSfxOn] = useState(true)

  //Object for all Audio Controls
  //(The looping background sound starts itself once inside useAudioManager)
  const audio = useAudioManager(terminalSfxOn)

  //Variable for rendering after start button is pressed
  const [started, setStarted] = useState(false);

  //Mute Button variable
  const [isMuted, setIsMuted] = useState(false);

  //Mute system when isMuted variable changes
  useEffect(() => { Howler.mute(isMuted) }, [isMuted])

  //Click sound for every button on the page (Howler.mute above silences it when muted).
  //Elements marked data-silent-click (the mute button) are skipped so muting doesn't make a click.
  const { playClick } = audio
  useEffect(() => {
    const handleClick = (event) => {
      const button = event.target.closest?.('button, .pixel_button')
      if (button && !button.closest('[data-silent-click]')) playClick()
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [playClick])

  //Function for Help Button
  function handleHelpRequest() {
    //In static view there is no terminal, so help opens the navigation popup instead
    if (viewMode === "static") {
      setStaticHelpOpen(open => !open)
      return;
    }

    if (screen === "off") {
      audio.playPowerOn();
    }

    screenControl("on")
    setHelpRequest(request => request + 1)
  }

  function handleViewModeChange(nextMode) {
    if (nextMode === viewMode) return;

    //Power off sound must play before terminal sounds are switched off below
    if (nextMode === "static" && screen === "on") {
      if (audio.bootControls.sound) audio.bootControls.stop();
      audio.playPowerOff();
      screenControl("off");
    }

    setViewMode(nextMode);
    setTerminalSfxOn(nextMode === "console");
    setStaticHelpOpen(false);
  }

  return (
    <>
      {/* Starter Screen */}
      {!started && (
        <div className="startscreen">
          <button className="startbutton"
            onClick={() => {
              setStarted(true)
              audio.startNoise();
            }}
          >
            <img src={startbut} alt="volume off" className="start_icon" />
          </button>
        </div>
      )}

      {/* Make toolbar only if started */}
      {started && (
        <ToolBar
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onHelp={handleHelpRequest}
          viewMode={viewMode}
          setViewMode={handleViewModeChange}
        />
      )}

      <SpaceBackground
        audio={audio}
        screen={screen}
        screenControl={screenControl}
        viewMode={viewMode}
      />

      {started && viewMode === "static" && (
        <div className="static_view_overlay" aria-hidden="true" />
      )}

      {screen === "on" && (
        <ComputerScreen
          audio={audio}
          screenControl={screenControl}
          helpRequest={helpRequest}
          setHelpRequest={setHelpRequest}
        />
      )}

      {started && viewMode === "console" && (
        <div className="console_credits">
          <span>MODEL // “Retro computer” by Urpo</span>
          <a href="https://skfb.ly/ou69O" target="_blank" rel="noreferrer">Sketchfab</a>
          <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a>
          <span>SFX // </span>
          <a href="https://pixabay.com/" target="_blank" rel="noreferrer">Pixabay</a>
        </div>
      )}

      {started && viewMode === "static" && <StaticPortfolio />}

      {started && viewMode === "static" && staticHelpOpen && (
        <HelpPopup onClose={() => setStaticHelpOpen(false)} />
      )}
    </>
  )
}

export default App;