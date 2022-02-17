import { Close, SupervisedUserCircle } from '@material-ui/icons';
import { GameContext } from '../App';
import { useContext } from 'react';

export default function Header() {
    const game = useContext(GameContext);

    return (
        <header className="App-header">
            <img src='/android-chrome-384x384.png' alt="Logo" className="logo" />
            <h1>Color Balls</h1>
            <h1 className="header-buttons">
                {game.playersVisible ? <Close onClick={() => game.setPlayersVisible(false)} /> : <SupervisedUserCircle onClick={() => game.setPlayersVisible(true)} />}
            </h1>
        </header>
    )
}