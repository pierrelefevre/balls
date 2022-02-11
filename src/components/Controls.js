import ActionButton from './ActionButton';
import InfoDisplay from './InfoDisplay';

export default function Controls(props) {
    return (
        <div className={!props.playersVisible ? "controls started" : "controls"}>
            <ActionButton

                balls={props.balls} setBalls={props.setBalls}
                players={props.players} setPlayers={props.setPlayers}
                action={props.action} setAction={props.setAction}
                info={props.info} setInfo={props.setInfo}
                activePlayer={props.activePlayer} setActivePlayer={props.setActivePlayer}
                gameState={props.gameState} setGameState={props.setGameState}
                playerInput={props.playerInput}
                actionButtonRef={props.actionButtonRef}
                setPlayersVisible={props.setPlayersVisible}
            />
            <InfoDisplay info={props.info} />
        </div>
    )
}