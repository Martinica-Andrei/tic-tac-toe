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

    const [page, setFirstPage, setBeforePlayOptionsPage, setOptionsPage, setLeaderboardPage] = useEnumState(FIRST_PAGE, BEFORE_PLAY_OPTIONS_PAGE, OPTIONS_PAGE,
        LEADERBOARD_PAGE);

    let htmlPage = <></>;
    if (page === FIRST_PAGE) {
        htmlPage = (
            <>
                <button className={appCSS.actionButton} onClick={setBeforePlayOptionsPage}>Play</button>
                <button className={appCSS.actionButton} onClick={setOptionsPage}>Options</button>
                <button className={appCSS.actionButton} onClick={setLeaderboardPage}>Leaderboard</button>
            </>
        );
    }
    else if (page === BEFORE_PLAY_OPTIONS_PAGE) {
        htmlPage = (
            <BeforePlayOptions setMainMenuPage={setFirstPage}></BeforePlayOptions>
        );
    }

    else if (page === OPTIONS_PAGE) {
        htmlPage = (
            <GeneralOptions setMainMenuPage={setFirstPage}></GeneralOptions>
        );
    }

    else if(page === LEADERBOARD_PAGE){
        htmlPage = (
            <Leaderboard setMainMenuPage={setFirstPage}></Leaderboard>
        );
    }

    return (
        <div>
            <h1 className={appCSS.title}>Tic Tac Toe</h1>
            <div className={appCSS.mainMenu}>
                {htmlPage}
            </div>
        </div>
    );
};

export default MainMenu;