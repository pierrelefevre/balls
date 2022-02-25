import React, { useContext } from "react";
import { GameContext } from "../App";
import UndoIcon from '@material-ui/icons/Undo';

export default function UndoButton() {
    const game = useContext(GameContext);

    const undoClicked = () => {
        const lastStateStr = game.states.pop();
        if (lastStateStr !== undefined) {

            const lastState = JSON.parse(lastStateStr)
            game.setPlayers(lastState.players)
            game.setBalls(lastState.balls)
            game.setAction(lastState.action)
            game.setInfo(lastState.info)
            game.setActivePlayer(lastState.activePlayer)
            game.setGameState(lastState.gameState)
            game.setPlayersVisible(lastState.playersVisible)
        }
    }

    return (
        <>
            {game.states.length > 0 && game.gameState !== "game over" ?

                <div onClick={undoClicked}>
                    <UndoIcon />
                </div>
                :
                null
            }
        </>
    )
}