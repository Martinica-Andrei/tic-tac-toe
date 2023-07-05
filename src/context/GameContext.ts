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
    readonly setIsOnline : React.Dispatch<React.SetStateAction<boolean>>;
}

const GameContext = React.createContext<IGameContext>(
    {
        state:
        {
            setMainMenu: () => { },
            setPlay: () => { }
        },
        options : new DataWithUpdate('', new GameOptions()),
        aiScore : new DataWithUpdate('', new AiScore()),
        setIsOnline : () =>{}
    }
);

export default GameContext;