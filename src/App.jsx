import SpaceBackground from "./background/SpaceBackground"
import ComputerScreen from "./ComputerScreen/ComputerScreen"
import StaticPortfolio from "./StaticPortfolio/StaticPortfolio"
import { useEffect, useState } from 'react'
import { useAudioManager } from "./Sounds"
import './App.css'
import { Howler } from 'howler'
import ToolBar from "./ToolBar"
import startbut from "./assets/icons/startbutton.png"

function App() {
  //Variable for conditional rendering of Computer Screen Component
  const [screen, screenControl] = useState("off")

  //Variable for rendering screen when help button is pressed
  const [helpRequest, setHelpRequest] = useState(0)

  //Display mode for the overall experience
  const [viewMode, setViewMode] = useState("console")

  //Object for all Audio Controls
  const audio = useAudioManager()

  //Start browser audio right away if allowed, otherwise it'll turn on after start button
  audio.playEmpty()

  //Variable for rendering after start button is pressed
  const [started, setStarted] = useState(false);

  //Mute Button variable
  const [isMuted, setIsMuted] = useState(false);

  //Mute system when isMuted variable changes
  useEffect(() => { Howler.mute(isMuted) }, [isMuted])

  //Function for Help Button
  function handleHelpRequest() {
    if (screen === "off") {
      audio.playPowerOn();
    }

    screenControl("on")
    setHelpRequest(request => request + 1)
  }

  function handleViewModeChange(nextMode) {
    if (nextMode === viewMode) return;

    setViewMode(nextMode);

    if (nextMode === "static" && screen === "on") {
      screenControl("off");
    }
  }

  return (
    <>
      {/* Starter Screen */}
      {!started && (
        <div className="startscreen">
          <button className="startbutton"
            onClick={() => {
              setStarted(true)
              audio.playEmpty();
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
    </>
  )
}

export default App;