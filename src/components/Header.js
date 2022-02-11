import { Close, SupervisedUserCircle } from '@material-ui/icons';

export default function Header(props) {
    return (
        <header className="App-header">
            <img src='/android-chrome-384x384.png' alt="Logo" className="logo" />
            <h1>Color Balls</h1>
            <h1 className="header-buttons">
                {props.playersVisible ? <Close onClick={() => props.setPlayersVisible(false)} /> : <SupervisedUserCircle onClick={() => props.setPlayersVisible(true)} />}
            </h1>
        </header>
    )
}