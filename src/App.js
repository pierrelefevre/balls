import Players from './components/Players';
import BallsHolder from './components/BallsHolder';
import Controls from './components/Controls';
import Header from './components/Header';
import React, { createContext, useRef, useState } from "react";
import StartingBalls from './InitalBalls.json';
export const GameContext = createContext(null);

function App() {

  const maybePlayers = JSON.parse(sessionStorage.getItem("players"))
  const [players, setPlayers] = useState(maybePlayers === null ? [] : maybePlayers);
  const [balls, setBalls] = useState(StartingBalls);
  const [action, setAction] = useState("Start game");
  const [info, setInfo] = useState("Add players, then start the game");
  const [activePlayer, setActivePlayer] = useState(0);
  const [gameState, setGameState] = useState("not started");
  const [playersVisible, setPlayersVisible] = useState(true);
  const playerInput = useRef(null)
  const actionButtonRef = useRef(null)

  const game = {

    players,
    setPlayers,
    balls,
    setBalls,
    action,
    setAction,
    info,
    setInfo,
    activePlayer,
    setActivePlayer,
    gameState,
    setGameState,
    playersVisible,
    setPlayersVisible,
    playerInput,
    actionButtonRef
  }



  return (
    <GameContext.Provider value={game}>
      <div className="App">
        <Header />
        <main>
          <BallsHolder />
          <Players />
          <Controls />
        </main>
      </div>
    </GameContext.Provider>
  )
}


export default App;
