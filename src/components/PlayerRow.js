import { Delete, Visibility, VisibilityOff } from "@material-ui/icons"
import { useState } from "react"

export default function PlayerRow(props) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="player-row">
            <span key={"player" + props.index}>
                {visible && props.gameState === "game started" ? props.player.name + " is " + props.player.color : props.player.name}
            </span>
            <div className="player-row-buttons">
                {props.gameState === "game started" ?
                    !visible ?
                        <Visibility onClick={() => setVisible(true)} />
                        :
                        <VisibilityOff onClick={() => setVisible(false)} />
                    :
                    null
                }
                {props.gameState === "not started" ?
                    <Delete className="delete" onClick={() => props.removePlayer(props.player)} />
                    : null}
            </div>
        </div>
    )
}