import { Close, SupervisedUserCircle } from '@material-ui/icons';
import { GameContext } from '../App';
import { useContext } from 'react';
import UndoButton from './UndoButton';

export default function Header() {
    const game = useContext(GameContext);

    return (
        <header className="App-header">

            {game.gameState === "game started" || game.gameState === "change color" || game.gameState === "choose colors" ?
                <h1 className='header-player-turn'> {game.players[game.activePlayer].name}'s turn {game.gameState === "change color" ? "to change color" : null} {game.gameState === "choose colors" ? "to pick color" : null}</h1>
                : null}

            <img src='/android-chrome-384x384.png' alt="Logo" className="logo" />
            <h1>Color Balls</h1>
            <h1 className="header-buttons">
                <UndoButton />
                {game.playersVisible ? <Close onClick={() => game.setPlayersVisible(false)} /> : <SupervisedUserCircle onClick={() => game.setPlayersVisible(true)} />}
            </h1>
        </header>
    )
}