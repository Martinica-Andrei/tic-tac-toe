import React from "react";
import GameOptions from "../classes/GameOptions";
import AiScore from "../classes/AiScore";
import { DataWithUpdate } from "../hooks/useLocalStorageRef";

export interface IGameContext {
    readonly state: {
        readonly setMainMenu: () => void;
        readonly setPlay: () => void;
    };
    readonly options : DataWithUpdate<GameOptions>;
    readonly aiScore : DataWithUpdate<AiScore>;
}

const GameContext = React.createContext<IGameContext>(
    {
        state:
        {
            setMainMenu: () => { },
            setPlay: () => { }
        },
        options : new DataWithUpdate('', new GameOptions()),
        aiScore : new DataWithUpdate('', new AiScore())
    }
);

export default GameContext;