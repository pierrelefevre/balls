import { useState } from "react";

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
                }
            )
            props.setPlayers(props.players);
            setNameInput("");
        }
    }

    const clearPlayers = () =>{
        props.setPlayers([])
    }

    return (
        <div className={"players" + (props.hidden ? ' hide' : '')}>
            <div className="players-header">
                <h1>Players</h1>
                <button onClick={clearPlayers}>
                    Clear
                </button>
            </div>
            <input type="text" placeholder="Name then [Enter]" value={nameInput} ref={props.nameInputRef} onChange={handleChange} onKeyDown={addPlayer} />

            {
                props.players !== null ?
                    props.players.map((player, index) => {
                        return (<span key={"player" + index}>{player.name}</span>)
                    }) : null
            }
        </div>
    )
}