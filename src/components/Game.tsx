import { useRef, useState } from 'react';
import MainMenu from './MainMenu';
import GridManager from './GridManager';
import GameContext, { IGameContext } from '../context/GameContext';
import useEnumState from '../hooks/useEnumState';
import GameOptions from '../classes/GameOptions';
import AiScore from '../classes/AiScore';
import useLocalStorageRef from '../hooks/useLocalStorageRef';

const IS_MAIN_MENU_STATE = 0;
const IS_PLAY_STATE = 1;

const Game = () => {
    const [gameState, setMainMenu, setPlay] = useEnumState(IS_MAIN_MENU_STATE, IS_PLAY_STATE);
    const [key, setKey] = useState(0);
    const options = useLocalStorageRef("Options", new GameOptions());
    const aiScore = useLocalStorageRef("AiScore", new AiScore());
    const gameContextValue: IGameContext = {
        state: {
            setMainMenu: setMainMenu,
            setPlay: () =>{
                setKey(prevKey => prevKey + 1);
                setPlay();
            }
        },
        options : options.current,
        aiScore : aiScore.current
    }

    return (
        <GameContext.Provider value={gameContextValue}>
            <>
                {gameState === IS_MAIN_MENU_STATE && <MainMenu />}
                {gameState === IS_PLAY_STATE && <GridManager key={key} aiDifficulty={options.current.data.aiDifficulty} />}
            </>
        </GameContext.Provider>
    );
};

export default Game;
