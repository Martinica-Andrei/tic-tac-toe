import { useContext, useEffect } from 'react';
import appCSS from '../css/app.module.css'
import GameContext from '../context/GameContext';
import { AiDifficulty } from '../classes/Constants';
import useEnumState from '../hooks/useEnumState';
import MainMenuContext from '../context/MainMenuContext';

const BeforePlayOptions = () => {

    const [difficulty, , setEasy, setMedium, setHard, setImpossible] = useEnumState(AiDifficulty.NO_DIFFICULTY, AiDifficulty.EASY,
        AiDifficulty.MEDIUM, AiDifficulty.HARD, AiDifficulty.IMPOSSIBLE);
    const gameContext = useContext(GameContext);
    const mainMenuContext = useContext(MainMenuContext);

    useEffect(() => {
        if (difficulty !== AiDifficulty.NO_DIFFICULTY) {
            mainMenuContext.setAnimClass(appCSS.playFade);
            mainMenuContext.setAnimEndCallback(() =>{
                gameContext.options.data.aiDifficulty = difficulty;
                gameContext.state.setPlay();
            });
        }
    }, [difficulty]);

    return (
        <>
            <button className={appCSS.actionButton} onClick={setEasy}>Easy</button>
            <button className={appCSS.actionButton} onClick={setMedium}>Medium</button>
            <button className={appCSS.actionButton} onClick={setHard}>Hard</button>
            <button className={appCSS.actionButton} onClick={setImpossible}>Impossible</button>
            <button className={appCSS.actionButton}onClick={() => {mainMenuContext.setMainMenuPage(); mainMenuContext.setAnimClass(appCSS.playFadeLeft)}}>Back</button>
        </>
    )
};

export default BeforePlayOptions;