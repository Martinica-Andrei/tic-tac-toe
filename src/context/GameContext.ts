import React from "react";
import GameOptions from "../classes/GameOptions";
import AiScore from "../classes/AiScore";

export interface IGameContext {
    state: {
        setMainMenu: () => void;
        setPlay: () => void;
    };
    options : GameOptions;
    aiScore : AiScore;
}

const GameContext = React.createContext<IGameContext>(
    {
        state:
        {
            setMainMenu: () => { },
            setPlay: () => { }
        },
        options : new GameOptions(),
        aiScore : new AiScore()
    }
);

export default GameContext;