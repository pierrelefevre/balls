import Ball from './components/Ball';
import Players from './components/Players';
import React, { useEffect, useState } from "react";

function App() {
  const startingBalls = [
    {
      number: 1,
      color: 'yellow',
      striped: false,
      active: true,
      hovered: false,
    },
    {
      number: 2,
      color: 'blue',
      striped: false,
      active: true,
      hovered: false,
    },
    {
      number: 3,
      color: 'red',
      striped: false,
      active: true,
      hovered: false,
    },
    {
      number: 4,
      color: 'purple',
      striped: false,
      active: true,
      hovered: false,
    },
    {
      number: 5,
      color: 'orange',
      striped: false,
      active: true,
      hovered: false,
    },
    {
      number: 6,
      color: 'green',
      striped: false,
      active: true,
      hovered: false,
    },
    {
      number: 7,
      color: 'darkred',
      striped: false,
      active: true,
      hovered: false,
    },
    {
      number: 8,
      color: 'black',
      striped: false,
      active: true,
      hovered: false,
    },
    {
      number: 9,
      color: 'yellow',
      striped: true,
      active: true,
      hovered: false,
    },
    {
      number: 10,
      color: 'blue',
      striped: true,
      active: true,
      hovered: false,
    },
    {
      number: 11,
      color: 'red',
      striped: true,
      active: true,
      hovered: false,
    },
    {
      number: 12,
      color: 'purple',
      striped: true,
      active: true,
      hovered: false,
    },
    {
      number: 13,
      color: 'orange',
      striped: true,
      active: true,
      hovered: false,
    },
    {
      number: 14,
      color: 'green',
      striped: true,
      active: true,
      hovered: false,
    },
    {
      number: 15,
      color: 'darkred',
      striped: true,
      active: true,
      hovered: false,
    }
  ]

  const [players, setPlayers] = useState(JSON.parse(sessionStorage.getItem("players")));
  const [balls, setBalls] = useState(startingBalls);
  const [action, setAction] = useState("Start game");
  const [info, setInfo] = useState("Add players, then start the game");
  const [activePlayer, setActivePlayer] = useState(0);
  const [gameState, setGameState] = useState("not started");
  const playerInput = React.useRef(null)


  useEffect(() => {
    // Setup on click hooks
    const keyUpListener = event => {
      // Escape if inputting player names
      if (document.activeElement === playerInput.current) {
        return
      }

      if (event.code === 'Space') {
        actionButton()
        return
      }

      if (event.code.includes('Digit')) {
        let ballNumber = parseInt(event.code.substr('Digit'.length))
        if (ballNumber === 0) {
          ballNumber = 10
        }
        if (event.shiftKey) {
          ballNumber += 10
        }
        let ball = balls.find(b => b.number === ballNumber)
        if (ball !== undefined) {
          ball.hovered = false
          ballClicked(ball)
        }
      }
    }
    const keyDownListener = event => {

      // Escape if inputting player names
      if (document.activeElement === playerInput.current) {
        return
      }

      if (event.code.includes('Digit')) {
        let ballNumber = parseInt(event.code.substr('Digit'.length))
        if (ballNumber === 0) {
          ballNumber = 10
        }
        if (event.shiftKey) {
          ballNumber += 10
        }
        balls.forEach(b => {
          if (b.number === ballNumber) {
            let alreadyHovered = balls.find(otherB => otherB.hovered)
            if (alreadyHovered === undefined) {
              b.hovered = true
              const theBalls = balls
              setBalls([])
              setBalls(theBalls)
            }
          }
        })
      }
    }
    document.addEventListener('keyup', keyUpListener)
    document.addEventListener('keydown', keyDownListener)
    return _ => {
      document.removeEventListener('keyup', keyUpListener)
      document.removeEventListener('keydown', keyDownListener)
    }
  })

  const ballClicked = (ball) => {
    if (gameState === "choose colors") {
      players[activePlayer].color = ball.color;

      if (activePlayer >= players.length - 1) {
        setGameState("game started");
        setAction("Next player")
        setActivePlayer(0);
        setInfo(players[0].name + ", start the game");
      }
      else {
        setAction("");
        const player = players[activePlayer + 1];
        setActivePlayer(activePlayer + 1);

        setInfo(player.name + ", choose color")
      }
    }
    if (gameState === "game started") {
      console.log(players)


      // Mark the selected ball as taken
      balls.forEach(b => {
        if (b.number === ball.number) {
          b.active = false
        }
      })

      console.log(balls)
      var removePlayers = new Set()

      players.forEach(player => {
        // If the ball and players have the same color
        if (player.color === ball.color) {
          var count = 0;

          // Check if there is more than 1 ball with that color
          balls.forEach(b => {
            if (b.color === ball.color && b.active)
              count++;
          })

          // Remove player
          if (count === 0) {
            setInfo(player.name + " has been destroyed by " + players[activePlayer].name)
            removePlayers.add(player.name);
          }
        }

      })

      // Remove all players that were eliminated this round

      const activeLast = players[activePlayer]
      const filteredPlayers = players.filter(p => !removePlayers.has(p.name))
      setPlayers(filteredPlayers);

      console.log(filteredPlayers)

      // If there is only 1 players left, game is over
      if (filteredPlayers.length <= 1) {
        setInfo(activeLast.name + " has won the game!")

        setAction("Restart");
        setGameState("game over");
      }
    }
  }

  const actionButton = () => {
    switch (gameState) {
      case "not started":
        if (players.length > 1) {
          sessionStorage.setItem("players", JSON.stringify(players))
          setGameState("choose colors");
          setAction("");
          const player = players[activePlayer];
          setInfo(player.name + ", choose color")
        } else {
          setInfo("Please add players");
        }
        break;

      case "game started":
        if (activePlayer >= players.length - 1) {
          console.log(players);
          setInfo(players[0].name + ", your turn");
          setActivePlayer(0);
        }
        else {
          setInfo(players[activePlayer + 1].name + ", your turn");
          setActivePlayer(activePlayer + 1);
        }
        break;
      case "game over":
        window.location.reload(false);
        break;
      default:
        setInfo("Illegal click");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src='/android-chrome-384x384.png' alt="Logo" className="logo" />
        <h1>Color Balls</h1>
      </header>
      <main>
        <div className={"balls-holder" + (gameState === 'game started' ? ' hide' : '')}>
          {
            balls.map(ball => {
              return (<Ball clicked={ballClicked} key={ball.number} number={ball.number} color={ball.color} striped={ball.striped} active={ball.active} hovered={ball.hovered} />)
            })
          }
        </div>

        <Players hidden={gameState === 'game started'} players={players} setPlayers={setPlayers} nameInputRef={playerInput} />

        <div className="controls">
          <button className="action" onClick={actionButton} style={action === "" ? { display: "none" } : null}>
            {action}
          </button>
          <h1>{info}</h1>
        </div>
      </main>
    </div>
  )
}


export default App;
