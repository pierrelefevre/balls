import Ball from './Ball';
import React, { useEffect, useContext } from "react";
import { GameContext } from '../App';

export default function BallsHolder() {

    const game = useContext(GameContext);

    useEffect(() => {
        // Setup on click hooks
        const keyUpListener = event => {
            // Escape if inputting player names
            if (document.activeElement === game.playerInput.current || document.activeElement === game.actionButtonRef.current) {
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
                let ball = game.balls.find(b => b.number === ballNumber)
                if (ball !== undefined) {
                    ball.hovered = false
                    ballClicked(ball)
                }
            }
        }

        const keyDownListener = event => {
            // Escape if inputting player names
            if (document.activeElement === game.playerInput.current) {
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
                game.balls.forEach(b => {
                    if (b.number === ballNumber) {
                        let alreadyHovered = game.balls.find(otherB => otherB.hovered)
                        if (alreadyHovered === undefined) {
                            b.hovered = true
                            const theBalls = game.balls
                            game.setBalls([...theBalls])
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
        if (game.gameState === "choose colors") chooseColorsHandler(ball)
        if (game.gameState === "change color") changeColorHandler(ball)
        if (game.gameState === "game started") gameStartedHandler(ball)
    }

    const chooseColorsHandler = (ball) => {
        game.players[game.activePlayer].color = ball.color;

        if (game.activePlayer >= game.players.length - 1) {
            game.setGameState("game started");
            game.setAction("Next player")
            game.setActivePlayer(0);
            game.setInfo(game.players[0].name + ", start the game");
            game.advance(game)
        }
        else {
            game.setAction("");
            const player = game.players[game.activePlayer + 1];
            game.setActivePlayer(game.activePlayer + 1);

            game.setInfo(player.name + ", choose color")
            game.advance(game)
        }
    }

    const changeColorHandler = (ball) => {
        if (ball.active) {
            game.players[game.activePlayer].color = ball.color;
            game.setGameState("game started");
            game.setAction("Next player")
            game.setInfo("Color has been changed, please continue");
            game.advance(game)
        } else {
            game.setInfo("Can't choose a ball that is gone")
        }
    }

    const gameStartedHandler = (ball) => {
        // Mark the selected ball as taken
        game.balls.forEach(b => {
            if (b.number === ball.number) {
                b.active = false
            }
        })

        var removePlayers = new Set()

        // Check if it was the last ball
        let count = 0
        game.balls.forEach(b => {
            if (b.color === ball.color && b.active) {
                count++
            }
        })
        if (count === 0) {
            // If ball is destroyed, check if any player had it
            const destroyedPlayers = game.players.filter(p => p.color === ball.color)

            if (destroyedPlayers.length === 1) {
                const player = destroyedPlayers[0]

                if (player.id === game.players[game.activePlayer].id) {
                    game.setInfo(player.name + " destroyed themselves. " + game.players[(game.activePlayer + 1) % game.players.length].name + ', your turn')
                } else {
                    game.setInfo(player.name + " has been destroyed. " + game.players[game.activePlayer].name + " may now change color.")
                    game.setGameState('change color')
                }
            } else if (destroyedPlayers.length >= 1) {
                // View all players that was destroyed
                let destroyedPlayersString = destroyedPlayers.map(dp => dp.name).join(', ')
                const destroyedItself = destroyedPlayers.find(dp => dp.id === game.players[game.activePlayer].id) !== undefined
                const endString = destroyedItself ? 'No color change' : (game.players[game.activePlayer].name + ' may now change color')
                game.setInfo(destroyedPlayersString + " were destroyed. " + endString)
                if (!destroyedItself) {
                    game.setGameState('change color')
                }
            }

            destroyedPlayers.forEach(dp => {
                removePlayers.add(dp.id);
            })
        }

        // Remove all players that were eliminated this round
        const activeLast = game.players[game.activePlayer]
        const filteredPlayers = game.players.filter(p => !removePlayers.has(p.id))
        game.setPlayers(filteredPlayers);

        // If there is only 1 players left, game is over
        if (filteredPlayers.length <= 1) {
            if (filteredPlayers.length === 1) {
                game.setInfo(filteredPlayers[0].name + " has won the game!")
            } else {
                game.setInfo(activeLast.name + " has won the game!")
            }

            game.setAction("Restart");
            game.setGameState("game over");
        }
        game.advance(game)
    }

    return (
        <div className={"balls-holder" + (!game.playersVisible ? ' hide' : '')}>
            {game.balls !== null ?
                game.balls.map(ball => {
                    return (<Ball clicked={ballClicked} key={ball.number} ball={ball} />)
                })
                : null
            }
        </div >)
}