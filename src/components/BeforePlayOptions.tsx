import { useContext, useEffect } from 'react';
import appCSS from '../css/app.module.css'
import GameContext from '../context/GameContext';
import { AiDifficulty } from '../classes/Constants';
import useEnumState from '../hooks/useEnumState';



interface IProps {
    setMainMenuPage: () => void;
}

const BeforePlayOptions = (props: IProps) => {

    const [difficulty, , setEasy, setMedium, setHard] = useEnumState(AiDifficulty.NO_DIFFICULTY, AiDifficulty.EASY, AiDifficulty.MEDIUM, AiDifficulty.HARD);
    const gameContext = useContext(GameContext);

    useEffect(() => {
        if (difficulty !== AiDifficulty.NO_DIFFICULTY) {
            gameContext.options.aiDifficulty = difficulty;
            gameContext.state.setPlay();
        }
    }, [difficulty]);

    return (
        <>
            <button className={appCSS.actionButton} onClick={setEasy}>Easy</button>
            <button className={appCSS.actionButton} onClick={setMedium}>Medium</button>
            <button className={appCSS.actionButton} onClick={setHard}>Hard</button>
            <button className={appCSS.actionButton} onClick={props.setMainMenuPage}>Back</button>
        </>
    )
};

export default BeforePlayOptions;