import './ComputerScreen.css'
import { useState, useRef, useEffect, useEffectEvent } from 'react'

function ComputerScreen({ audio, screenControl, helpRequest, setHelpRequest }) {

  //Allows access to the input element
  const inputRef = useRef(null);


  //Puzzle Strings
  const puzzleAName = "Dogarithms";
  const puzzleBName = "Pawdio";
  const puzzleCName = "Underdog";

  const puzzleAAnswer = "Frisco"
  const puzzleBAnswer = "Toby"
  const puzzleCAnswer = "Chase"

  const puzzleA = `
If a dog

  chases one fox,
  lets out three barks,
  has three friends,
  owns four mansions,
  performs five magic tricks,
  and has two toys,

then what is the dog's name?
  `;
  const puzzleB = `
If a dog

  finds the golf tee in the yard,
  sweetly says "oh" when pet,
  chases away every bee near the tree,
  and always tilts its head and wonders why at bath time,

then what is the dog's name?
  `;
  const puzzleC = `
If a dog

  chases whatever says 'meow',
  always wears a device to listen to music, 
  steals the red fruit that keeps the doctor away,
  howls at the five-pointed light at night,
  and guards the nest until something hatches,

then what is the dog's name?
  `;

  const puzzleHints = `
Dogarithm> The number tells you which letter to pluck.
Pawdio> Forget spelling, this one's about how the words sound out loud.
Underdog> List out the things being described.
  `

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

  //Matrix rain animation state
  const [rainActive, setRainActive] = useState(false)
  const [rainColumns, setRainColumns] = useState([])
  const rainTimeoutRef = useRef(null)

  function generateMatrixRainFrame() {
    const columns = 35;
    const rows = 36;
    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array.from({ length: columns }, (_, columnIndex) => {
      const visibleRows = 10 + Math.floor(Math.random() * (rows - 10));
      const column = Array.from({ length: rows }, (_, rowIndex) => {
        if (rowIndex > visibleRows && Math.random() > 0.3) {
          return ' ';
        }

        return characters[Math.floor(Math.random() * characters.length)];
      });

      return { id: `${columnIndex}-${Math.random()}`, chars: column };
    });
  }

  function startRainSequence(previousDisplayLines, previousHistory) {
    if (rainTimeoutRef.current) {
      clearTimeout(rainTimeoutRef.current);
    }

    setRainActive(true);
    setDisplayLines([]);
    setHistory([{ type: 'command', content: "" }]);
    setInput('');
    setCommandIndex(0);

    rainTimeoutRef.current = setTimeout(() => {
      setRainActive(false);
      setDisplayLines(previousDisplayLines);
      setHistory(previousHistory);

      requestAnimationFrame(() => {
        terminalRef.current?.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: 'smooth'
        });
      });

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 5000);
  }

  useEffect(() => {
    if (!rainActive) return;

    setRainColumns(generateMatrixRainFrame());

    const intervalId = setInterval(() => {
      setRainColumns(generateMatrixRainFrame());
    }, 110);

    return () => clearInterval(intervalId);
  }, [rainActive]);

  useEffect(() => {
    return () => {
      if (rainTimeoutRef.current) {
        clearTimeout(rainTimeoutRef.current);
      }
    };
  }, []);

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
      //Puzzle Attempt/Display flow
      else if (wordList[0] === "puzzle") {
        if (wordList[1] === "display") {
          if (wordList.length != 3) {
            return (<div style={{ whiteSpace: "pre-wrap" }}>
              Invalid Command. <br></br>
              Try 'puzzle display {"<puzzle_name>"}' or 'puzzle' for a list of available puzzles.
            </div>)
          }
          else {
            switch (wordList[2].toLowerCase()) {
              case (puzzleAName.toLowerCase()):
                return (<div style={{ whiteSpace: "pre-wrap" }}>
                  {puzzleA} <br></br>
                  {`To Attempt the Puzzle, try 'puzzle attempt ${puzzleAName} <your_answer>'`}
                </div>)
              case (puzzleBName.toLowerCase()):
                return (<div style={{ whiteSpace: "pre-wrap" }}>{puzzleB} <br></br>
                  {`To Attempt the Puzzle, try 'puzzle attempt ${puzzleBName} <your_answer>'`}
                </div>)
              case (puzzleCName.toLowerCase()):
                return (<div style={{ whiteSpace: "pre-wrap" }}>{puzzleC} <br></br>
                  {`To Attempt the Puzzle, try 'puzzle attempt ${puzzleCName} <your_answer>'`}
                </div>)
              default:
                return (<div style={{ whiteSpace: "pre-wrap" }}>
                  '{wordList[2]}' is not an available puzzle. <br></br>
                  Try 'puzzle' for a list of available puzzles.
                </div>)
            }
          }
        }

        else if (wordList[1] === "hint" && wordList.length === 2) {
          return (<div style={{ whiteSpace: "pre-wrap" }}>
            {puzzleHints}
          </div>)
        }

        else if (wordList[1] === "attempt") {

          if (wordList.length != 4) {
            return (<div style={{ whiteSpace: "pre-wrap" }}>
              Invalid Command. <br></br>
              Try 'puzzle attempt {"<puzzle_name> <your_answer>"} ' or 'puzzle' for a list of available puzzles.
            </div>)
          }

          else {
            let answer;
            switch (wordList[2]) {
              case (puzzleAName.toLowerCase()): answer = puzzleAAnswer.toLowerCase(); break;
              case (puzzleBName.toLowerCase()): answer = puzzleBAnswer.toLowerCase(); break;
              case (puzzleCName.toLowerCase()): answer = puzzleCAnswer.toLowerCase(); break;
              default:
                return (<div style={{ whiteSpace: "pre-wrap" }}>
                  '{wordList[2]}' is not an available puzzle. <br></br>
                  Try 'puzzle' for a list of available puzzles.
                </div>)
            }

            if (answer === wordList[3].toLowerCase()) {
              return (<div style={{ whiteSpace: "pre-wrap" }}>
                '{wordList[3]}' is Correct!. <br></br>
              </div>)
            }
            else {
              return ((<div style={{ whiteSpace: "pre-wrap" }}>
                '{wordList[3]}' is Incorrect {':('}. <br></br>
                Try 'puzzle hint' for a list of hints if your are stuck.
              </div>))
            }
          }

        }

        else {

          return (<div style={{ whiteSpace: "pre-wrap" }}>
            Invalid Command. <br></br>
            Try 'puzzle'
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
            rain      -A message from the matrix<br></br>
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

        case 'rain':
          return <div style={{ whiteSpace: "pre-wrap" }}>
            {"[ ~ ]"} Signal detected in the static... <br></br>
            Something in the machine is awake.
          </div>

        case 'puzzle':
          return (
            <div style={{ whiteSpace: "pre-wrap" }}>
              Available Puzzles:<br></br>
              <ul>
                <li>{puzzleAName}</li>
                <li>{puzzleBName}</li>
                <li>{puzzleCName}</li>
              </ul>
              <br></br>

              Usage:<br></br>
              puzzle attempt {"<puzzle_name> <your_answer>"}<br></br>
              puzzle display {"<puzzle_name>"}

              <br></br>
              <br></br>
              Examples: <br></br>
              puzzle display {puzzleAName} <br></br>
              puzzle attempt {puzzleAName} myAnswer
            </div>
          )


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
      const fixedInput = input.trim().toLowerCase();

      if (fixedInput === 'rain') {
        const nextDisplay = [...displayLines, { type: 'command', content: fixedInput }];
        const nextHistory = [...history, { type: 'command', content: fixedInput }];

        setDisplayLines(nextDisplay);
        setHistory(nextHistory);
        setInput('');
        setCommandIndex(0);

        startRainSequence(nextDisplay, nextHistory);
        return;
      }

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
      setHistory([{ type: 'command', content: "" }]);

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

            {rainActive ? (
              <div className="matrix-rain" aria-label="matrix rain animation">
                {rainColumns.map((column, columnIndex) => (
                  <div key={column.id} className="matrix-column">
                    {column.chars.map((char, rowIndex) => (
                      <span
                        key={`${column.id}-${rowIndex}`}
                        className={rowIndex === 0 ? 'matrix-char matrix-head' : 'matrix-char'}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <>
                {displayLines.map((line, index) => (
                  <div key={index} >
                    {
                      line.type === 'command' ? (
                        <span className='output_line'><span className='output_line'>guest@shivam-os:$ </span>{line.content} </span>
                      ) : (
                        <span> {line.content}</span>
                      )
                    }
                  </div>

                ))}

                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <span className='output_line'>guest@shivam-os:$ </span>
                  <input ref={inputRef} onKeyDown={handleInput} className="current_input" type="text" value={input} autoFocus spellCheck="false" autoComplete="off" onChange={(element) => setInput(element.target.value)}></input>
                </div>
              </>
            )}
          </div>

        </div>



        <div className="scan_effecta"></div>
      </div>


    </div>
  )
}

export default ComputerScreen;