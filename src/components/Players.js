import { useState, useContext } from "react";
import PlayerRow from "./PlayerRow";
import { GameContext } from '../App';

export default function Players() {
    const game = useContext(GameContext);

    const [nameInput, setNameInput] = useState([]);

    const handleChange = (e) => {
        setNameInput(e.target.value);
    }

    const addPlayer = (e) => {
        if (e.key === "Enter") {
            game.players.push(
                {
                    name: nameInput,
                    id: Math.random(),
                }
            )
            game.setPlayers(game.players);
            setNameInput("");
        }
    }

    const clearPlayers = () => {
        game.setPlayers([])
        sessionStorage.removeItem("players")
    }

    const removePlayer = (player) => {
        let filteredPlayers = game.players.filter(p => { return p.id !== player.id })
        game.setPlayers(filteredPlayers)

        console.log("Removed player: " + player.name)
        console.log(game.players)
        sessionStorage.setItem("players", JSON.stringify(filteredPlayers))
    }

    return (
        <div className={"players" + (!game.playersVisible ? ' hide' : '')}>
            <div className="players-header">
                <h1>Players</h1>
                {game.gameState === "not started" ?
                    <button onClick={clearPlayers}>
                        Clear
                    </button>
                    : null}
            </div>
            {game.gameState === "not started" ?

                <input type="text" placeholder="Name then [Enter]" value={nameInput} ref={game.playerInput} onChange={handleChange} onKeyDown={addPlayer} />

                : null
            }

            {
                game.players !== null ?
                    game.players.map((player, index) => {
                        return (<PlayerRow
                            player={player}
                            index={index}
                            removePlayer={removePlayer}
                            key={player.id}
                        />)
                    }) : null
            }
        </div>
    )
}