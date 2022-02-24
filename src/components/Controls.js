import React, { useContext } from "react";
import { GameContext } from '../App';


import ActionButton from './ActionButton';
import InfoDisplay from './InfoDisplay';

export default function Controls() {

    const game = useContext(GameContext);
    return (
        <div className={!game.playersVisible ? "controls started" : "controls"}>
            <ActionButton />
            <InfoDisplay />
        </div>
    )
}