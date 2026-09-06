import SpaceBackground from "./background/SpaceBackground"
import ComputerScreen from "./ComputerScreen/ComputerScreen"
import { useState } from 'react'

function App() {
  const [screen, screenControl] = useState("off")

  return (
    <>
      <button onClick={() => {
        if (screen === "off") {
          screenControl("on");
        } else {
          screenControl("off")
        }
      }}>Power</button>
      <SpaceBackground screen={screen} screenControl={screenControl} />
      {screen === "on" && (<ComputerScreen screenControl={screenControl} />)}

      <div style={{ position: "absolute", bottom: "8px", left: "10px", fontSize: "20px", color: "white", zIndex: 100 }}>
        "Retro computer" <a href='https://skfb.ly/ou69O'>https://skfb.ly/ou69O</a> by Urpo is licensed under Creative Commons Attribution <a href='http://creativecommons.org/licenses/by/4.0/'>(http://creativecommons.org/licenses/by/4.0/)</a>
      </div>"
    </>
  )
}

export default App;