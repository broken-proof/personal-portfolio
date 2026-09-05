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
      <SpaceBackground />
      {screen === "on" && (<ComputerScreen screenControl={screenControl} />)}

    </>
  )
}

export default App;