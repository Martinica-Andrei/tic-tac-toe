import React, { useState } from 'react';
import MainMenu from './MainMenu';
import GridManager from './GridManager';
import GameContext, {IGameContext} from '../context/GameContext';

const IS_MAIN_MENU_STATE = 0;
const IS_PLAY_STATE = 1;

const Game = () => {

    const [gameState, setGameState] = useState(IS_MAIN_MENU_STATE);

    const setMainMenu = () =>{
        setGameState(IS_MAIN_MENU_STATE);
    }

    const setPlay = () =>{
        setGameState(IS_PLAY_STATE);
    }

    const gameContextValue : IGameContext = {
        state :{
            setMainMenu : setMainMenu,
            setPlay : setPlay
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
