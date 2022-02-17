import { Delete, Visibility, VisibilityOff } from "@material-ui/icons"
import { useState, useContext } from "react"
import { GameContext } from "../App"

export default function PlayerRow(props) {
    const [visible, setVisible] = useState(false)
    const game = useContext(GameContext)

    return (
        <div className="player-row">
            <span key={"player" + props.index}>
                {visible && game.gameState === "game started" ? props.player.name + " is " + props.player.color : props.player.name}
            </span>
            <div className="player-row-buttons">
                {game.gameState === "game started" ?
                    !visible ?
                        <Visibility onClick={() => setVisible(true)} />
                        :
                        <VisibilityOff onClick={() => setVisible(false)} />
                    :
                    null
                }
                {game.gameState === "not started" ?
                    <Delete className="delete" onClick={() => props.removePlayer(props.player)} />
                    : null}
            </div>
        </div>
    )
}