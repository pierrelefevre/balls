import React, { useEffect } from "react";

export default function ActionButton(props) {
    useEffect(() => {
        // Setup on click hooks
        const keyUpListener = event => {
            // Escape if inputting player names
            if (document.activeElement === props.playerInput.current || document.activeElement === props.actionButtonRef.current) {
                return
            }

            if (event.code === 'Space') {
                actionButton()
                return
            }
        }

        const keyDownListener = event => {
            // Escape if inputting player names
            if (document.activeElement === props.playerInput.current) {
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
        switch (props.gameState) {
            case "not started":
                if (props.players.length > 1) {
                    sessionStorage.setItem("players", JSON.stringify(props.players))
                    props.setGameState("choose colors");
                    props.setAction("");
                    const player = props.players[props.activePlayer];
                    props.setInfo(player.name + ", choose color")
                    props.setPlayersVisible(false)
                } else {
                    props.setInfo("Please add players");
                }
                break;

            case "game started":
                if (props.activePlayer >= props.players.length - 1) {
                    console.log(props.players);
                    props.setInfo(props.players[0].name + ", your turn");
                    props.setActivePlayer(0);
                }
                else {
                    props.setInfo(props.players[props.activePlayer + 1].name + ", your turn");
                    props.setActivePlayer(props.activePlayer + 1);
                }
                break;

            case "game over":
                window.location.reload(false);
                break;
            default:
                props.setInfo("Illegal click");
        }
    }

    return (
        <button
            className="action"
            onClick={actionButton}
            style={props.action === "" ? { display: "none" } : null}
            ref={props.actionButtonRef}>
            {props.action}
        </button>
    )
}