import SpaceBackground from "./background/SpaceBackground"
import ComputerScreen from "./ComputerScreen/ComputerScreen"
import { useEffect, useState } from 'react'
import { useAudioManager } from "./Sounds"
import './App.css'
import { Howler } from 'howler'
import ToolBar from "./ToolBar"

function App() {
  const [screen, screenControl] = useState("off")
  const [helpRequest, setHelpRequest] = useState(0)
  const audio = useAudioManager()
  audio.playEmpty()

  //Mute Button
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => { Howler.mute(isMuted) }, [isMuted])

  function handleHelpRequest() {
    if (screen === "off") {
      audio.playPowerOn();
    }

    screenControl("on")
    setHelpRequest(request => request + 1)
  }

  return (
    <>
      <ToolBar isMuted={isMuted} setIsMuted={setIsMuted} onHelp={handleHelpRequest}></ToolBar>

      <SpaceBackground audio={audio} screen={screen} screenControl={screenControl} />
      {screen === "on" && (
        <ComputerScreen
          audio={audio}
          screenControl={screenControl}
          helpRequest={helpRequest}
          setHelpRequest={setHelpRequest}
        />
      )}

      <div style={{ position: "absolute", bottom: "8px", left: "10px", fontSize: "12px", color: "white", zIndex: 8 }}>
        CREDIT: "Retro computer" <a href='https://skfb.ly/ou69O'>https://skfb.ly/ou69O</a> by Urpo is licensed under Creative Commons Attribution <a href='http://creativecommons.org/licenses/by/4.0/'>(http://creativecommons.org/licenses/by/4.0/)</a>
      </div>"
    </>
  )
}

export default App;