import { useContext } from 'react';
import appCSS from '../css/app.module.css'
import leaderboardCSS from '../css/leaderboard.module.css'
import GameContext from '../context/GameContext';
interface IProps {
    setMainMenuPage: () => void;
}

const Leaderboard = (props: IProps) => {

    const gameContext = useContext(GameContext);
    const difficulties = ["Easy", "Medium", "Hard", "Impossible"]
    const htmlRows = gameContext.aiScore.data.difficulties.map((difficulty, index) => (
        <tr className={leaderboardCSS.row} key={index}>
            <td>{difficulties[index]}</td>
            <td>{difficulty.wins}</td>
            <td>{difficulty.losses}</td>
            <td>{difficulty.ties}</td>
        </tr>
    ));

    return (
        <>
            <button className={appCSS.actionButton} onClick={props.setMainMenuPage}>Back</button>
            <table className={leaderboardCSS.table}>
                <thead>
                    <tr>
                        <th>Difficulty</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Ties</th>
                    </tr>
                </thead>
                <tbody>
                    {htmlRows}
                </tbody>
            </table>
        </>
    )

};

export default Leaderboard;