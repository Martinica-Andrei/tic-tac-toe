import React, {useContext} from 'react';
import appCSS from '../css/app.module.css'
import GameContext from '../context/GameContext';

const MainMenu = () => {

    const gameContext = useContext(GameContext);

    return (
        <div>
            <h1 className={appCSS.title}>Tic Tac Toe</h1>
            <div className={appCSS.gameMenu}>
                <button className={appCSS.actionButton} onClick={gameContext.state.setPlay}>Play</button>
                <button className={appCSS.actionButton}>Options</button>
                <button className={appCSS.actionButton}>Leaderboard</button>
            </div>
        </div>
    );
};

export default MainMenu;