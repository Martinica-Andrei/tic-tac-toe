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
const LEADERBOARD_PAGE = 3;

const MainMenu = () => {
    const gameContext = useContext(GameContext);
    const [animClass, setAnimClass] = useState('');
    const [animEndCallback, setAnimEndCallback] = useState(() => () => { });
    const [page, setFirstPage, setBeforePlayOptionsPage, setOptionsPage, setLeaderboardPage] = useEnumState(FIRST_PAGE, BEFORE_PLAY_OPTIONS_PAGE, OPTIONS_PAGE,
        LEADERBOARD_PAGE);

    const [actualPage, setActualPage] = useState(page);

    const setAnimClassWrapper = (className : string ) => {
        if(gameContext.options.data.menuAnimationToggle === false) return;
        setAnimClass(className);
    };

    const setAnimEndCallbackWrapper = (callback : () => void) =>{
        if(gameContext.options.data.menuAnimationToggle){
            setAnimEndCallback(() => callback);
        }
        else{
            callback();
        }
    }

    const mainMenuContextValue: IMainMenuContext = {
        setMainMenuPage: setFirstPage,
        setAnimEndCallback: setAnimEndCallbackWrapper,
        setAnimClass: setAnimClassWrapper
    }

    let htmlPage = <></>;
    if (actualPage === FIRST_PAGE) {
        htmlPage = (
            <>

                <button className={appCSS.actionButton} onClick={() => { setBeforePlayOptionsPage(); setAnimClassWrapper(appCSS.playFadeRight) }}>Play</button>
                <button className={appCSS.actionButton} onClick={() => { setOptionsPage(); setAnimClassWrapper(appCSS.playFadeLeft) }}>Options</button>
                <button className={appCSS.actionButton} onClick={() => { setLeaderboardPage(); setAnimClassWrapper(appCSS.playFadeLeft) }}>Score AI</button>
            </>
        );
    }
    else if (actualPage === BEFORE_PLAY_OPTIONS_PAGE) {
        htmlPage = (
            <BeforePlayOptions></BeforePlayOptions>
        );
    }

    else if (actualPage === OPTIONS_PAGE) {
        htmlPage = (
            <GeneralOptions></GeneralOptions>
        );
    }

    else if (actualPage === LEADERBOARD_PAGE) {
        htmlPage = (
            <AiScore></AiScore>
        );
    }

    useEffect(() => {
        if (animClass.length === 0) {
            setActualPage(page);
        }
    }, [page, animClass])

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