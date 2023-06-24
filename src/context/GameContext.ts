import React from "react";
import GameOptions from "../classes/GameOptions";

export interface IGameContext {
    state: {
        setMainMenu: () => void;
        setPlay: () => void;
    };
    options : GameOptions;
}

const GameContext = React.createContext<IGameContext>(
    {
        state:
        {
            setMainMenu: () => { },
            setPlay: () => { }
        },
        options : new GameOptions()
    }
);

export default GameContext;