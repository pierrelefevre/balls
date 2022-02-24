import React, { useContext } from "react";
import { GameContext } from '../App';

export default function InfoDisplay() {
    const game = useContext(GameContext);

    return (
        <h1>{game.info}</h1>
    )
}