import React from "react";

export interface IGameContext {
    state: {
        setMainMenu: () => void;
        setPlay: () => void;
    }
}

const GameContext = React.createContext<IGameContext>(
    {
        state:
        {
            setMainMenu: () => { },
            setPlay: () => { }
        }
    }
    );

export default GameContext;