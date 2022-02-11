import Players from './components/Players';
import React, { useState } from "react";
import StartingBalls from './InitalBalls.json';
import BallsHolder from './components/BallsHolder';
import Controls from './components/Controls';
import Header from './components/Header';

function App() {

  const maybePlayers = JSON.parse(sessionStorage.getItem("players"))
  const [players, setPlayers] = useState(maybePlayers === null ? [] : maybePlayers);
  const [balls, setBalls] = useState(StartingBalls);
  const [action, setAction] = useState("Start game");
  const [info, setInfo] = useState("Add players, then start the game");
  const [activePlayer, setActivePlayer] = useState(0);
  const [gameState, setGameState] = useState("not started");
  const [playersVisible, setPlayersVisible] = useState(true);
  const playerInput = React.useRef(null)
  const actionButtonRef = React.useRef(null)

  return (
    <div className="App">
      <Header
        playersVisible={playersVisible} setPlayersVisible={setPlayersVisible}
      />

      <main>
        <BallsHolder
          balls={balls} setBalls={setBalls}
          players={players} setPlayers={setPlayers}
          action={action} setAction={setAction}
          info={info} setInfo={setInfo}
          activePlayer={activePlayer} setActivePlayer={setActivePlayer}
          gameState={gameState} setGameState={setGameState}
          playerInput={playerInput}
          actionButtonRef={actionButtonRef}
          playersVisible={playersVisible}
        />

        <Players
          visible={playersVisible}
          players={players}
          gameState={gameState}
          setPlayers={setPlayers}
          playerInput={playerInput}
        />

        <Controls
          balls={balls} setBalls={setBalls}
          players={players} setPlayers={setPlayers}
          action={action} setAction={setAction}
          info={info} setInfo={setInfo}
          activePlayer={activePlayer} setActivePlayer={setActivePlayer}
          gameState={gameState} setGameState={setGameState}
          playerInput={playerInput}
          actionButtonRef={actionButtonRef}
          playersVisible={playersVisible} setPlayersVisible={setPlayersVisible}
        />

      </main>
    </div>
  )
}


export default App;
