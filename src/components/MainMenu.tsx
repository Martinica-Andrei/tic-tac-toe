import { useEffect, useState } from 'react';
import appCSS from '../css/app.module.css'
import useEnumState from '../hooks/useEnumState';
import BeforePlayOptions from './BeforePlayOptions';
import GeneralOptions from './GeneralOptions';
import Leaderboard from './Leaderboard';

const FIRST_PAGE = 0;
const BEFORE_PLAY_OPTIONS_PAGE = 1;
const OPTIONS_PAGE = 2;
const LEADERBOARD_PAGE = 3;


const MainMenu = () => {

    const [animClasses, setAnimClasses] = useState('');

    const [page, setFirstPage, setBeforePlayOptionsPage, setOptionsPage, setLeaderboardPage] = useEnumState(FIRST_PAGE, BEFORE_PLAY_OPTIONS_PAGE, OPTIONS_PAGE,
        LEADERBOARD_PAGE);

    const [actualPage, setActualPage] = useState(page);

    const setFirstPageWrapper = () => {
        setFirstPage();
        setAnimClasses(appCSS.playFadeLeft)
    }

    let htmlPage = <></>;
    if (actualPage === FIRST_PAGE) {
        htmlPage = (
            <>
                {/* <button className={appCSS.actionButton} onClick={setBeforePlayOptionsPage}>Play</button> */}
                <button className={appCSS.actionButton} onClick={() => { setBeforePlayOptionsPage(); setAnimClasses(appCSS.playFadeRight) }}>Play</button>
                <button className={appCSS.actionButton} onClick={() => { setOptionsPage(); setAnimClasses(appCSS.playFadeRight) }}>Options</button>
                <button className={appCSS.actionButton} onClick={() => { setLeaderboardPage(); setAnimClasses(appCSS.playFadeRight) }}>Leaderboard</button>
            </>
        );
    }
    else if (actualPage === BEFORE_PLAY_OPTIONS_PAGE) {
        htmlPage = (
            <BeforePlayOptions setMainMenuPage={setFirstPageWrapper}></BeforePlayOptions>
        );
    }

    else if (actualPage === OPTIONS_PAGE) {
        htmlPage = (
            <GeneralOptions setMainMenuPage={setFirstPageWrapper}></GeneralOptions>
        );
    }

    else if (actualPage === LEADERBOARD_PAGE) {
        htmlPage = (
            <Leaderboard setMainMenuPage={setFirstPageWrapper}></Leaderboard>
        );
    }

    useEffect(() => {
        if (animClasses.length === 0) {
            setActualPage(page);
        }
    }, [page, animClasses])

    return (
        <div>
            <h1 className={appCSS.title}>Tic Tac Toe</h1>
            <div className={`${appCSS.mainMenu} ${animClasses}`} onAnimationEnd={() => { setAnimClasses(''); }}>
                {htmlPage}
            </div>
        </div>
    );
};

export default MainMenu;