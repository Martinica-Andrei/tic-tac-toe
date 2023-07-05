import { useEffect, useState, useContext, SetStateAction } from 'react';
import appCSS from '../css/app.module.css'
import useEnumState from '../hooks/useEnumState';
import BeforePlayOptions from './BeforePlayOptions';
import GeneralOptions from './GeneralOptions';
import AiScore from './AiScore';
import MainMenuContext from '../context/MainMenuContext';
import type { IMainMenuContext } from '../context/MainMenuContext';
import GameContext from '../context/GameContext';

const FIRST_PAGE = 0;
const BEFORE_PLAY_OPTIONS_PAGE = 1;
const OPTIONS_PAGE = 2;
const SCORE_PAGE = 3;

const MainMenu = () => {
    const gameContext = useContext(GameContext);
    const [animClass, setAnimClass] = useState('');
    const [animEndCallback, setAnimEndCallback] = useState(() => () => { });
    const [page, setFirstPage, setBeforePlayOptionsPage, setOptionsPage, setScorePage] = useEnumState(FIRST_PAGE, BEFORE_PLAY_OPTIONS_PAGE, OPTIONS_PAGE,
        SCORE_PAGE);

    const setAnimClassWrapper = (className: string) => {
        if (gameContext.options.data.menuAnimationToggle === false) return;
        setAnimClass(className);
    };

    const setAnimEndCallbackWrapper = (callback: () => void) => {
        if (gameContext.options.data.menuAnimationToggle) {
            setAnimEndCallback(() => callback);
        }
        else {
            callback();
        }
    }

    const mainMenuContextValue: IMainMenuContext = {
        setMainMenuPage: () => setAnimEndCallbackWrapper(setFirstPage),
        setAnimEndCallback: setAnimEndCallbackWrapper,
        setAnimClass: setAnimClassWrapper
    }

    const btnPlayOnClick = () =>{
        setAnimEndCallbackWrapper(setBeforePlayOptionsPage); 
        setAnimClassWrapper(appCSS.playFadeRight);
    }

    const btnOptionsOnClick = () =>{
        setAnimEndCallbackWrapper(setOptionsPage); 
        setAnimClassWrapper(appCSS.playFadeLeft);
    }

    const btnScoreOnClick = () =>{
        setAnimEndCallbackWrapper(setScorePage); 
        setAnimClassWrapper(appCSS.playFadeLeft);
    }

    let htmlPage = <></>;
    if (page === FIRST_PAGE) {
        htmlPage = (
            <>
                {/* <button className={appCSS.actionButton} onClick={() => { gameContext.setIsOnline(true); setAnimClassWrapper(appCSS.playFadeRight) }}>Play Online</button> */}
                <button className={appCSS.actionButton} onClick={btnPlayOnClick}>Play</button>
                <button className={appCSS.actionButton} onClick={btnOptionsOnClick}>Options</button>
                <button className={appCSS.actionButton} onClick={btnScoreOnClick}>Score</button>
            </>
        );
    }
    else if (page === BEFORE_PLAY_OPTIONS_PAGE) {
        htmlPage = (
            <BeforePlayOptions></BeforePlayOptions>
        );
    }

    else if (page === OPTIONS_PAGE) {
        htmlPage = (
            <GeneralOptions></GeneralOptions>
        );
    }

    else if (page === SCORE_PAGE) {
        htmlPage = (
            <AiScore></AiScore>
        );
    }

    return (
        <MainMenuContext.Provider value={mainMenuContextValue}>
            <div>
                <h1 className={appCSS.title}>Tic Tac Toe</h1>
                <h1 className={appCSS.subTitle}>Offline</h1>
                <div className={`${appCSS.mainMenu} ${animClass}`} onAnimationEnd={() => { setAnimClass(''); animEndCallback(); }}>
                    {htmlPage}
                </div>
            </div>
        </MainMenuContext.Provider>
    );
};

export default MainMenu;