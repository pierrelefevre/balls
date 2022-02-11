import Ball from './Ball';
import React, { useEffect } from "react";

export default function BallsHolder(props) {

    useEffect(() => {
        // Setup on click hooks
        const keyUpListener = event => {
            // Escape if inputting player names
            if (document.activeElement === props.playerInput.current || document.activeElement === props.actionButtonRef.current) {
                return
            }

            if (event.code.includes('Digit')) {
                let ballNumber = parseInt(event.code.substr('Digit'.length))
                if (ballNumber === 0) {
                    ballNumber = 10
                }
                if (event.shiftKey) {
                    ballNumber += 10
                }
                let ball = props.balls.find(b => b.number === ballNumber)
                if (ball !== undefined) {
                    ball.hovered = false
                    ballClicked(ball)
                }
            }
        }

        const keyDownListener = event => {
            // Escape if inputting player names
            if (document.activeElement === props.playerInput.current) {
                return
            }

            if (event.code.includes('Digit')) {
                let ballNumber = parseInt(event.code.substr('Digit'.length))
                if (ballNumber === 0) {
                    ballNumber = 10
                }
                if (event.shiftKey) {
                    ballNumber += 10
                }
                props.balls.forEach(b => {
                    if (b.number === ballNumber) {
                        let alreadyHovered = props.balls.find(otherB => otherB.hovered)
                        if (alreadyHovered === undefined) {
                            b.hovered = true
                            const theBalls = props.balls
                            props.setBalls([...theBalls])
                        }
                    }
                })
            }
        }
        document.addEventListener('keyup', keyUpListener)
        document.addEventListener('keydown', keyDownListener)
        return _ => {
            document.removeEventListener('keyup', keyUpListener)
            document.removeEventListener('keydown', keyDownListener)
        }
    })

    const ballClicked = (ball) => {
        console.log("Ball was clicked! " + ball.number)
        if (props.gameState === "choose colors") {
            props.players[props.activePlayer].color = ball.color;

            if (props.activePlayer >= props.players.length - 1) {
                props.setGameState("game started");
                props.setAction("Next player")
                props.setActivePlayer(0);
                props.setInfo(props.players[0].name + ", start the game");
            }
            else {
                props.setAction("");
                const player = props.players[props.activePlayer + 1];
                props.setActivePlayer(props.activePlayer + 1);

                props.setInfo(player.name + ", choose color")
            }
        }
        if (props.gameState === "game started") {
            console.log(props.players)


            // Mark the selected ball as taken
            props.balls.forEach(b => {
                if (b.number === ball.number) {
                    b.active = false
                }
            })

            console.log(props.balls)
            var removePlayers = new Set()

            // Check if it was the last ball
            let count = 0
            props.balls.forEach(b => {
                if (b.color === ball.color && b.active) {
                    count++
                }
            })
            if (count === 0) {
                // If ball is destroyed, check if any player had it
                const destroyedPlayers = props.players.filter(p => p.color === ball.color)

                console.log("Number of destroyed players: " + destroyedPlayers.length)

                if (destroyedPlayers.length === 1) {
                    const player = destroyedPlayers[0]
                    console.log("Destroyed player: " + player.name)

                    if (player.id === props.players[props.activePlayer].id) {
                        props.setInfo(player.name + " destroyed itself. " + props.players[(props.activePlayer + 1) % props.players.length].name + ', your turn')
                    } else {
                        props.setInfo(player.name + " has been destroyed. " + props.players[props.activePlayer].name + " may now change color.")
                        // setGameState('change color')
                    }
                } else if (destroyedPlayers.length >= 1) {
                    // View all players that was destroyed
                    let destroyedPlayersString = destroyedPlayers.map(dp => dp.name).join(', ')
                    const destroyedItself = destroyedPlayers.find(dp => dp.id === props.players[props.activePlayer].id) !== undefined
                    const endString = destroyedItself ? 'No color change' : (props.players[props.activePlayer].name + ' may now change color')
                    props.setInfo(destroyedPlayersString + " were destroyed. " + endString)
                }

                destroyedPlayers.forEach(dp => {
                    removePlayers.add(dp.id);
                })
            }

            // Remove all players that were eliminated this round
            const activeLast = props.players[props.activePlayer]
            const filteredPlayers = props.players.filter(p => !removePlayers.has(p.id))
            props.setPlayers(filteredPlayers);

            console.log(filteredPlayers)

            // If there is only 1 players left, game is over
            if (filteredPlayers.length <= 1) {
                if (filteredPlayers.length === 1) {
                    props.setInfo(filteredPlayers[0].name + " has won the game!")
                } else {
                    props.setInfo(activeLast.name + " has won the game!")
                }

                props.setAction("Restart");
                props.setGameState("game over");
            }
        }
    }

    return (
        <div className={"balls-holder" + (!props.playersVisible ? ' hide' : '')}>
            {
                props.balls.map(ball => {
                    return (<Ball clicked={ballClicked} key={ball.number} number={ball.number} color={ball.color} striped={ball.striped} active={ball.active} hovered={ball.hovered} />)
                })
            }
        </div >)
}