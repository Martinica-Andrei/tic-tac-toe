import appCSS from '../css/app.module.css'
import useEnumState from '../hooks/useEnumState';
import BeforePlayOptions from './BeforePlayOptions';
import GeneralOptions from './GeneralOptions';

const FIRST_PAGE = 0;
const BEFORE_PLAY_OPTIONS_PAGE = 1;
const OPTIONS_PAGE = 2;

const MainMenu = () => {

    const [page, setFirstPage, setBeforePlayOptionsPage, setOptionsPage] = useEnumState(FIRST_PAGE, BEFORE_PLAY_OPTIONS_PAGE, OPTIONS_PAGE);

    let htmlPage = <></>;
    if (page === FIRST_PAGE) {
        htmlPage = (
            <>
                <button className={appCSS.actionButton} onClick={setBeforePlayOptionsPage}>Play</button>
                <button className={appCSS.actionButton} onClick={setOptionsPage}>Options</button>
                <button className={appCSS.actionButton}>Leaderboard</button>
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