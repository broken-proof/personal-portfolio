import SpaceBackground from "./background/SpaceBackground"
import ComputerScreen from "./ComputerScreen/ComputerScreen"
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
      {started && <ToolBar isMuted={isMuted} setIsMuted={setIsMuted} onHelp={handleHelpRequest}></ToolBar>}

      <SpaceBackground audio={audio} screen={screen} screenControl={screenControl} />
      {screen === "on" && (
        <ComputerScreen
          audio={audio}
          screenControl={screenControl}
          helpRequest={helpRequest}
          setHelpRequest={setHelpRequest}
        />
      )}

      {/* Credits for 3D model and SFX */}
      <div style={{ whiteSpace: "pre-wrap", position: "absolute", bottom: "8px", left: "10px", fontSize: "12px", color: "white", zIndex: 8 }}>
        CREDITS: {"Model>"} "Retro computer" <a href='https://skfb.ly/ou69O'>https://skfb.ly/ou69O</a> by Urpo is licensed under Creative Commons Attribution <a href='http://creativecommons.org/licenses/by/4.0/'>(http://creativecommons.org/licenses/by/4.0/)</a>  ,
        {"   SFX>"} <a href='https://pixabay.com/'>(https://pixabay.com/)</a>

      </div>"
    </>
  )
}

export default App;