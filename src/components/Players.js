import { useState } from "react";
import PlayerRow from "./PlayerRow";

export default function Players(props) {

    const [nameInput, setNameInput] = useState([]);

    const handleChange = (e) => {
        setNameInput(e.target.value);
    }

    const addPlayer = (e) => {
        if (e.key === "Enter") {
            props.players.push(
                {
                    name: nameInput,
                    id: Math.random(),
                }
            )
            props.setPlayers(props.players);
            setNameInput("");
        }
    }

    const clearPlayers = () => {
        props.setPlayers([])
        sessionStorage.removeItem("players")
    }

    const removePlayer = (player) => {
        let filteredPlayers = props.players.filter(p => { return p.id !== player.id })
        props.setPlayers(filteredPlayers)
        console.log("Removed player: " + player.name)
        console.log(props.players)
        sessionStorage.setItem("players", JSON.stringify(filteredPlayers))
    }

    return (
        <div className={"players" + (!props.visible ? ' hide' : '')}>
            <div className="players-header">
                <h1>Players</h1>
                {props.gameState === "not started" ?
                    <button onClick={clearPlayers}>
                        Clear
                    </button>
                    : null}
            </div>
            {props.gameState === "not started" ?

                <input type="text" placeholder="Name then [Enter]" value={nameInput} ref={props.playerInput} onChange={handleChange} onKeyDown={addPlayer} />

                : null}


            {
                props.players !== null ?
                    props.players.map((player, index) => {
                        return (<PlayerRow
                            player={player}
                            index={index}
                            removePlayer={removePlayer}
                            gameState={props.gameState}
                            key={player.id}
                            playersVisible={props.playersVisible} />)
                    }) : null
            }
        </div>
    )
}