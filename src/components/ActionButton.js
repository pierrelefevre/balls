import React, { useEffect, useContext } from "react";
import { GameContext } from '../App';

export default function ActionButton() {
    const game = useContext(GameContext);

    useEffect(() => {
        // Setup on click hooks
        const keyUpListener = event => {
            // Escape if inputting player names
            if (document.activeElement === game.playerInput.current || document.activeElement === game.actionButtonRef.current) {
                return
            }

            if (event.code === 'Space') {
                actionButton()
                return
            }
        }

        const keyDownListener = event => {
            // Escape if inputting player names
            if (document.activeElement === game.playerInput.current) {
                return
            }
        }
        document.addEventListener('keyup', keyUpListener)
        document.addEventListener('keydown', keyDownListener)
        return _ => {
            document.removeEventListener('keyup', keyUpListener)
            document.removeEventListener('keydown', keyDownListener)
        }
    })


    const actionButton = () => {
        switch (game.gameState) {
            case "not started":
                if (game.players.length > 1) {
                    sessionStorage.setItem("players", JSON.stringify(game.players))
                    game.setGameState("choose colors");
                    game.setAction("");
                    const player = game.players[game.activePlayer];
                    game.setInfo(player.name + ", choose color")
                    game.setPlayersVisible(false)
                } else {
                    game.setInfo("Please add players");
                }
                break;

            case "game started":
                if (game.activePlayer >= game.players.length - 1) {
                    console.log(game.players);
                    game.setInfo(game.players[0].name + ", your turn");
                    game.setActivePlayer(0);
                }
                else {
                    game.setInfo(game.players[game.activePlayer + 1].name + ", your turn");
                    game.setActivePlayer(game.activePlayer + 1);
                }
                break;

            case "game over":
                window.location.reload(false);
                break;
            default:
                game.setInfo("Illegal click");
        }
    }

    return (
        <button
            className="action"
            onClick={actionButton}
            style={game.action === "" ? { display: "none" } : null}
            ref={game.actionButtonRef}>
            {game.action}
        </button>
    )
}