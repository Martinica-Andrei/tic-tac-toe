import { useRef } from 'react';
import MainMenu from './MainMenu';
import GridManager from './GridManager';
import GameContext, { IGameContext } from '../context/GameContext';
import useEnumState from '../hooks/useEnumState';
import GameOptions from '../classes/GameOptions';

const IS_MAIN_MENU_STATE = 0;
const IS_PLAY_STATE = 1;

const Game = () => {

    const [gameState, setMainMenu, setPlay] = useEnumState(IS_MAIN_MENU_STATE, IS_PLAY_STATE);
    const options = useRef(new GameOptions());

    const gameContextValue: IGameContext = {
        state: {
            setMainMenu: setMainMenu,
            setPlay: setPlay
        },
        options : options.current

    }

    return (
        <GameContext.Provider value={gameContextValue}>
            <div>
                {gameState === IS_MAIN_MENU_STATE && <MainMenu />}
                {gameState === IS_PLAY_STATE && <GridManager aiDifficulty={options.current.aiDifficulty} />}
            </div>
        </GameContext.Provider>
    );
};

export default Game;
