import './ComputerScreen.css'
import { useState, useRef, useEffect, useEffectEvent } from 'react'

function ComputerScreen({ audio, screenControl, helpRequest, setHelpRequest }) {

  //Allows access to the input element
  const inputRef = useRef(null);

  //Allows access to terminal div element
  const terminalRef = useRef()

  //        .-"""-.__     ltb
  //     /      ' o'\
  //  ,-;  '.  :   _c
  // :_."\._ ) ::-"
  //        ""m "m

  const starterText = `
  _____ _     _                         ____   _____ 
 / ____| |   (_)                       / __ \\ / ____|  }      .-"""-.__
| (___ | |__  ___   ____ _ _ __ ___   | |  | | (___    }     /      ' o'\\
 \\___ \\| '_ \\| \\ \\ / / _\` | '_ \` _ \\  | |  | |\\___ \\   }  ,-;  '.  :   _c 
 ____) | | | | |\\ V / (_| | | | | | | | |__| |____) |  } :_."\\._ ) ::-"
|_____/|_| |_|_| \\_/ \\__,_|_| |_| |_|  \\____/|_____/   }        ""m "m      

              S H I V A M _ O S
              -----------------
                 Version 1.0

[    ${(Math.random()).toFixed(5)}] Shivam_OS kernel starting...
[    ${(Math.random()).toFixed(5)}] Memory detected: 16384 MB
[    ${(Math.random()).toFixed(5)}] Initializing keyboard...       [ OK ]
[    ${(Math.random()).toFixed(5)}] Mounting filesystem...         [ OK ]
[    ${(Math.random()).toFixed(5)}] Starting Shivam Shell...       [ OK ]
[    ${(Math.random()).toFixed(5)}] System initialization complete.

Welcome to shivam_os v1.0.
Type 'help' to see available commands.
Type 'exit', or press Ctrl + D (or ⌘ + D on Mac) to shut down.`

  //Tracks display of console
  const [displayLines, setDisplayLines] = useState([{ type: 'output', content: <span style={{ whiteSpace: "pre-wrap" }}>{starterText}</span> }]);

  //Invisible History of console
  const [history, setHistory] = useState([{ type: 'command', content: "" }]);

  //Tracks current input
  const [input, setInput] = useState('');

  //Tracks command index
  const [commandIndex, setCommandIndex] = useState(0);

  //Variable for screen color theme
  const [theme, setTheme] = useState("amber")

  //Function to process commands and  return string
  function processCommand(input) {

    //Handle differently for multi-word commands
    if (input.includes(" ")) {
      //Fix input
      input = input.replace(/\s+/g, " ").trim().toLowerCase();

      let wordList = input.split(" ");

      if (wordList[0] === "theme") {
        switch (wordList[1]) {

          case "cyberpunk":
            setTheme("cyberpunk");
            return (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {"[ OK ]"} Loading theme module: 'cyberpunk'... <br></br>
                {"[ OK ]"} CRT filter modified.

              </div>
            )
          case "phosphor":
            setTheme("phosphor");
            return (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {"[ OK ]"} Loading theme module: 'phosphor'... <br></br>
                {"[ OK ]"} CRT filter modified.

              </div>
            )
          case "amber":
            setTheme("amber");
            return (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {"[ OK ]"} Loading theme module: 'amber'... <br></br>
                {"[ OK ]"} CRT filter modified.

              </div>
            )
          case "synthwave":
            setTheme("synthwave");
            return (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {"[ OK ]"} Loading theme module: 'synthwave'... <br></br>
                {"[ OK ]"} CRT filter modified.

              </div>
            )


          default:
            return (<div style={{ whiteSpace: "pre-wrap" }}>

              theme: '{wordList[1]}' is not a valid theme. <br></br>
              Try 'theme' for a list of available palettes.
            </div>)

        }

      }

      else {
        return (<div>
          Command Not Found {":("}
        </div>)
      }
    }

    else {
      switch (input) {
        case 'help':
          return <div style={{ whiteSpace: "pre-wrap" }}>
            AVAILABLE COMMANDS:<br></br>
            help      -Display this message<br></br>
            contact   -Get Contact Info <br></br>
            whoami    -Brief Introduction and bio<br></br>
            resume    -Download my resume<br></br>
            theme     -Modify Terminal Color Theme <br></br>
            projects  -View some cool creations <br></br>
            puzzle    -Challenge yourself<br></br>
            clear     -Clear Screen <br></br>
            exit      -Shut Down
          </div>

        case 'whoami':
          return <div>
            Name: Shivam Murawala<br></br>
            Status: High School Senior at Woburn Collegiate Institute<br></br>
            Interests: Math Problemsolving, Business/DECA, Programming, Art, NBA/Basketball, Distance Running<br></br>

          </div>

        case 'resume':

          return <div>
            {"[ OK ]"} Fetching file: Shivam_Murawala_Highschool_Dev.pdf... <br></br>
            {"[ OK ]"} Initiating Download sequence... <br></br>
            <a rel="noopener noreferrer" target="_blank" href="./resume.pdf" style={{ color: "inherit" }}>Click to Download</a>
          </div>

        case 'contact':
          return <div style={{ whiteSpace: "pre-wrap" }}>
            <br></br>
            {">"} Initiating handshake configurations... <br></br>
            Email:    <a style={{ color: "inherit" }} target="_blank" href='mailto:shivammurawala2810@gmail.com'>shivammurawala2810@gmail.com</a><br></br>
            Github:   <a style={{ color: "inherit" }} target="_blank" href='https://github.com/broken-proof'>github.com/broken-proof</a><br></br>
            LinkedIn: <a style={{ color: "inherit" }} target="_blank" href='https://www.linkedin.com/in/shivam-murawala-b9141829b/'>linkedin.com/in/shivam-murawala-b9141829b/</a>
          </div>

        case 'projects':
          return <div style={{ whiteSpace: "pre-wrap" }}>
            {"<<<"} PROJECT CATALOG {">>>"} <br></br>

            Click Project to View:<br></br>
            <ul>
              <li><a style={{ color: "inherit" }} target="_blank" href='https://github.com/broken-proof/Raylib-Game-of-Life-Simulator'>Game_Of_Life_Simulator</a>  - Cellular Automaton made with C++ and Raylib</li>
              <li><a style={{ color: "inherit" }} target="_blank" href='https://github.com/broken-proof/Refurnish'>Refurnish</a>               - Design your room like it's a 3D model</li>
              <li><a style={{ color: "inherit" }} target="_blank" href='https://github.com/broken-proof/personal-portfolio'>Shivam_os</a>               - Cool portfolio site made with React</li>
            </ul>
            <br></br>
          </div>

        case 'theme':
          return <div style={{ whiteSpace: "pre-wrap" }}>
            {"<<<"} SYSTEM DISPLAY MANAGER {">>>"} <br></br>
            Current Theme: [{theme}]<br></br>
            Available Themes:<br></br>
            <ul>
              <li>amber     - Monochrome Yellowish Orange</li>
              <li>phosphor  - Classic P1 Green CRT</li>
              <li>cyberpunk - Electric Cyan</li>
              <li>synthwave - Neon Purple</li>
            </ul>
            <br></br>
            Usage: theme {"<color_name>"} <br></br>
            Example: theme synthwave
          </div>


        case 'exit':
          screenControl("off");
          audio.playPowerOff();
          if (audio.bootControls.sound) audio.bootControls.stop();


        default:
          return <div>
            Command Not Found {":("}
          </div>
      }
    }
  }

  //Function to handle user inputs for input field
  function handleInput(element) {
    let newDisplay = [];

    const r = Math.floor(Math.random() * 7);
    switch (r) {
      case 1:
        audio.playKeyA()
        break;
      case 2:
        audio.playKeyB()
        break;
      case 3:
        audio.playKeyC()
        break;

    }


    if (element.key === "Enter") {
      console.log(history);
      const fixedInput = input.trim().toLowerCase();

      if (fixedInput === 'clear') {
        newDisplay = [{ type: 'output', content: "Welcome to shivam_os v1.0.\n Type 'help' to see available commands. \n Type 'exit', or press Ctrl + D (or ⌘ + D on Mac) to shut down." }]
      }

      else if (!fixedInput) {
        //Add to display always
        //Always add input to new display first
        newDisplay = [...displayLines, { type: 'command', content: fixedInput }]

      }
      else {
        //Always add input to new History first
        newDisplay = [...displayLines, { type: 'command', content: fixedInput }]

        //Add to command history
        setHistory([...history, { type: 'command', content: fixedInput }])

        //Process the non-empty input
        const output = processCommand(fixedInput);

        //If a proper output was generated, then add to the history
        if (output) {
          newDisplay.push({ type: 'output', content: output })
        }

      }

      //Update history and input usestates
      setDisplayLines(newDisplay);
      setInput("");
    }

    else if (element.key === "ArrowDown") {
      element.preventDefault();

      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;

        setCommandIndex(newIndex);

        if (newIndex === 0) {
          setInput("");
        } else {
          setInput(history[history.length - newIndex].content);
        }
      }

    }

    else if (element.key == "ArrowUp") {
      element.preventDefault();

      if (commandIndex < history.length) {
        const newIndex = commandIndex + 1;

        setCommandIndex(newIndex);
        setInput(history[history.length - newIndex].content);
      }
    }

    else if ((element.ctrlKey || element.metaKey) && (element.key === 'd' || element.key === 'D')) {
      // Stop the browser from bookmarking the page
      element.preventDefault();
      screenControl("off")
      if (audio.bootControls.sound) audio.bootControls.stop();
      audio.playPowerOff()


    }
  }

  //Function for help button in main screen
  const showHelp = useEffectEvent(() => {
    const helpFunction = () => {
      const helpInput = "help";
      const newCommand = { type: 'command', content: helpInput };
      const output = processCommand(helpInput);
      const newOutput = { type: 'output', content: output };

      //MOTD starter text
      setDisplayLines([{ type: 'output', content: <span style={{ whiteSpace: "pre-wrap" }}>{starterText}</span> },
        newCommand,
        newOutput
      ]);

      //Wipe out previous history
      setHistory({ type: 'command', content: "" });

      if (inputRef.current) inputRef.current.focus();

      //Reset trigger to avoid delays
      setHelpRequest(0);
    };

    helpFunction();
  }, [helpRequest, setHelpRequest]);

  useEffect(() => {
    if (helpRequest > 0) showHelp();
  }, [helpRequest]);

  //Function to focus back on input when any part of the terminal is clicked
  function focusOnInput() {
    inputRef.current.focus();
  }

  //Helper function to give a delay before scrolling down
  function timer() {
    let scroller = setTimeout(() => {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 50)
    return scroller;
  }

  //Scroll back into view whenever history changes
  useEffect(() => {
    requestAnimationFrame(() => {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      });
    })
  }, [displayLines])

  function handleTerminalPresses(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
      // Stop the browser from bookmarking the page
      e.preventDefault();
      screenControl("off")
      if (audio.bootControls.sound) audio.bootControls.stop();
      audio.playPowerOff()


    }
  }

  return (

    <div className="monitor">
      <div data-theme={theme} className="glass" >

        <div className="crt">

          <div onKeyDown={handleTerminalPresses} ref={terminalRef} className="terminal" onClick={focusOnInput}>

            {/* Render all lines within the history */}
            {
              displayLines.map((line, index) => (
                <div key={index} >
                  {
                    line.type === 'command' ? (
                      // Output with prefix if it is a command
                      <span className='output_line'><span className='output_line'>guest@shivam-os:$ </span>{line.content} </span>
                    ) : (
                      // Output standard content if not a command
                      <span> {line.content}</span>
                    )
                  }
                </div>

              ))
            }

            {/* Render Active Input  */}
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <span className='output_line'>guest@shivam-os:$ </span>
              <input ref={inputRef} onKeyDown={handleInput} className="current_input" type="text" value={input} autoFocus spellCheck="false" autoComplete="off" onChange={(element) => setInput(element.target.value)}></input>
            </div>
          </div>

        </div>



        <div className="scan_effecta"></div>
      </div>


    </div>
  )
}

export default ComputerScreen;