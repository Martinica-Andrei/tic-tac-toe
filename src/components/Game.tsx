import React, { useRef, useState } from 'react';
import MainMenu from './MainMenu';
import GridManager from './GridManager';
import GameContext, { IGameContext } from '../context/GameContext';
import { AiDifficulty } from '../classes/Constants';

const IS_MAIN_MENU_STATE = 0;
const IS_PLAY_STATE = 1;

interface IOptions{
    aiDifficulty : number
}

const defaultOptions = {
    aiDifficulty : AiDifficulty.NO_DIFFICULTY
}

const Game = () => {

    const [gameState, setGameState] = useState(IS_MAIN_MENU_STATE);
    const options = useRef(defaultOptions);

    const setMainMenu = () => {
        setGameState(IS_MAIN_MENU_STATE);
    }

    const setPlay = () => {
        setGameState(IS_PLAY_STATE);
    }

    const gameContextValue: IGameContext = {
        state: {
            setMainMenu: setMainMenu,
            setPlay: setPlay
        }
    }

    return (
        <GameContext.Provider value={gameContextValue}>
            <div>
                {gameState === IS_MAIN_MENU_STATE && <MainMenu />}
                {gameState === IS_PLAY_STATE && <GridManager />}
            </div>
        </GameContext.Provider>
    );
};

export default Game;
