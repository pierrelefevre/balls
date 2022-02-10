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

    return (
        <div className="players">
            <h1>Players</h1>
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