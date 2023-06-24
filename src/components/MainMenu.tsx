import appCSS from '../css/app.module.css'
import useEnumState from '../hooks/useEnumState';
import BeforePlayOptions from './BeforePlayOptions';

const FIRST_PAGE = 0;
const BEFORE_PLAY_OPTIONS_PAGE = 1;

const MainMenu = () => {

    const [page, setFirstPage, setBeforePlayOptionsPage] = useEnumState(FIRST_PAGE, BEFORE_PLAY_OPTIONS_PAGE);

    let htmlPage = <></>;
    if (page === FIRST_PAGE) {
        htmlPage = (
            <>
                <button className={appCSS.actionButton} onClick={setBeforePlayOptionsPage}>Play</button>
                <button className={appCSS.actionButton}>Options</button>
                <button className={appCSS.actionButton}>Leaderboard</button>
            </>
        );
    }
    else if (page === BEFORE_PLAY_OPTIONS_PAGE) {
        htmlPage = (
            <BeforePlayOptions setMainMenuPage={setFirstPage}></BeforePlayOptions>
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